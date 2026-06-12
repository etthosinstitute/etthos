import { NextRequest, NextResponse } from "next/server";
import { prisma, USER_SELECT, REVIEWER_SELECT } from "@/server/db/prisma";
import { requireAuth } from "@/server/auth";
import { fullName, handleRouteError } from "@/shared/utils";
import { sendReviewSubmissionEmail } from "@/server/mail";
import { trySendEmail } from "@/server/mailer";
import { enforceRateLimit } from "@/server/rate-limit";
import { createAuditLog } from "@/server/audit";
import type { Role } from "@repo/database";
import { z } from "zod";

const reviewSchema = z
  .object({
    manuscriptId: z.preprocess((value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    }, z.string().optional()),
    assignmentId: z.preprocess((value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    }, z.string().optional()),
    content: z.preprocess(
      (value) => {
        if (typeof value !== "string") return value;
        return value.trim();
      },
      z
        .string()
        .min(10, "Review comments must be at least 10 characters long."),
    ),
    confidentialComments: z.preprocess((value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    }, z.string().max(5000).optional()),
    decision: z.enum([
      "ACCEPT",
      "MINOR_REVISIONS",
      "MAJOR_REVISIONS",
      "REJECT",
    ]),
  })
  .refine((v) => v.manuscriptId || v.assignmentId, {
    message: "assignmentId or manuscriptId is required",
    path: ["assignmentId"],
  });

const assignmentInclude = {
  manuscript: {
    include: { author: { select: USER_SELECT } },
  },
  reviewer: { select: USER_SELECT },
  review: {
    select: {
      id: true,
    },
  },
} as const;

export async function POST(req: NextRequest) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  const limited = enforceRateLimit(req, {
    bucket: "review:submit",
    key: user.userId,
    limit: 20,
    windowMs: 60 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();
    const {
      manuscriptId,
      assignmentId,
      content,
      confidentialComments,
      decision,
    } = reviewSchema.parse(body);

    const assignment = assignmentId
      ? await prisma.reviewAssignment.findUnique({
          where: { id: assignmentId },
          include: assignmentInclude,
        })
      : await prisma.reviewAssignment.findFirst({
          where: {
            manuscriptId,
            reviewerId: user.userId,
            status: { in: ["ASSIGNED", "ACCEPTED"] },
          },
          include: assignmentInclude,
          orderBy: { invitedAt: "desc" },
        });

    const effectiveManuscriptId = assignment?.manuscriptId || manuscriptId;

    const manuscript = effectiveManuscriptId
      ? await prisma.manuscript.findUnique({
          where: { id: effectiveManuscriptId },
          include: { author: { select: USER_SELECT } },
        })
      : null;

    if (!manuscript) {
      return NextResponse.json(
        { error: "Manuscript not found" },
        { status: 404 },
      );
    }

    const canModerateReviews =
      user.role === "EDITOR" ||
      user.role === "ADMIN" ||
      user.role === "SUPER_ADMIN";

    if (
      assignment &&
      assignment.reviewerId !== user.userId &&
      !canModerateReviews
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (assignment && assignment.status === "ASSIGNED") {
      return NextResponse.json(
        {
          error:
            "Please accept the review invitation before submitting your review.",
        },
        { status: 400 },
      );
    }

    if (assignment && assignment.status === "DECLINED") {
      return NextResponse.json(
        {
          error:
            "This review invitation has been declined and cannot be submitted.",
        },
        { status: 400 },
      );
    }

    const reviewer = await prisma.user.findUnique({
      where: { id: user.userId },
      select: REVIEWER_SELECT,
    });

    const review = assignment?.review?.id
      ? await prisma.review.update({
          where: { id: assignment.review.id },
          data: {
            content,
            confidentialComments,
            decision,
          },
        })
      : await prisma.review.create({
          data: {
            content,
            confidentialComments,
            decision,
            reviewerId: user.userId,
            manuscriptId: manuscript.id,
            assignmentId: assignment?.id,
          },
        });

    let newStatus: "REJECTED" | "ACCEPTED" | undefined;
    if (decision === "REJECT") newStatus = "REJECTED";
    if (decision === "ACCEPT") newStatus = "ACCEPTED";

    if (newStatus) {
      await prisma.manuscript.update({
        where: { id: manuscript.id },
        data: { status: newStatus, decidedAt: new Date() },
      });
    } else {
      await prisma.manuscript.update({
        where: { id: manuscript.id },
        data: { status: "REVISION_REQUESTED" },
      });
    }

    if (assignment) {
      await prisma.reviewAssignment.update({
        where: { id: assignment.id },
        data: {
          status: "SUBMITTED",
          submittedAt: new Date(),
          review: { connect: { id: review.id } },
        },
      });
    }

    const { emailSent, emailError } = await trySendEmail(
      async () =>
        sendReviewSubmissionEmail({
          reviewerEmail: reviewer?.email || user.email,
          reviewerName: fullName(reviewer?.firstName, reviewer?.lastName, ""),
          manuscriptTitle: manuscript.title,
          manuscriptId: manuscript.id,
          decision,
          content,
        }),
      "Failed to send review email",
      "Review email send error",
    );

    await createAuditLog({
      actorId: user.userId,
      actorRole: user.role as Role,
      action: "REVIEW_SUBMITTED",
      entityType: "REVIEW",
      entityId: review.id,
      summary: `Submitted review for "${manuscript.title}" with decision ${decision.replaceAll("_", " ").toLowerCase()}.`,
      metadata: {
        manuscriptId: manuscript.id,
        manuscriptTitle: manuscript.title,
        assignmentId: assignment?.id,
        decision,
      },
      req,
    });

    return NextResponse.json(
      { review, emailSent, emailError },
      { status: 201 },
    );
  } catch (error) {
    console.error("Submit review error:", error);
    return handleRouteError(error);
  }
}
