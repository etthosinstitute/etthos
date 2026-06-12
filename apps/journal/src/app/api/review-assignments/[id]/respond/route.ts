import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { requireAuth } from "@/server/auth";
import { fullName, handleRouteError } from "@/shared/utils";
import { sendReviewStatusEmail } from "@/server/mail";
import { trySendEmail } from "@/server/mailer";
import { enforceRateLimit } from "@/server/rate-limit";
import { createAuditLog } from "@/server/audit";
import type { Role } from "@repo/database";
import { z } from "zod";

const responseSchema = z.object({
  status: z.enum(["ACCEPTED", "DECLINED"]),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  const limited = enforceRateLimit(req, {
    bucket: "assignment:respond",
    key: user.userId,
    limit: 30,
    windowMs: 60 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();
    const { status } = responseSchema.parse(body);
    const { id } = await params;

    const assignment = await prisma.reviewAssignment.findUnique({
      where: { id },
      include: {
        manuscript: { select: { id: true, title: true } },
        reviewer: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
      },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 },
      );
    }

    if (assignment.reviewerId !== user.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const updatedAssignment = await prisma.reviewAssignment.update({
      where: { id },
      data: { status, respondedAt: new Date() },
      include: {
        manuscript: { select: { id: true, title: true, status: true } },
      },
    });

    if (status === "DECLINED") {
      await prisma.manuscript.update({
        where: { id: assignment.manuscriptId },
        data: { status: "SUBMITTED" },
      });
    }

    const { emailSent, emailError } = await trySendEmail(
      async () =>
        sendReviewStatusEmail({
          reviewerEmail: assignment.reviewer.email,
          reviewerName: fullName(
            assignment.reviewer.firstName,
            assignment.reviewer.lastName,
            assignment.reviewer.email,
          ),
          manuscriptTitle: assignment.manuscript.title,
          manuscriptId: assignment.manuscript.id,
          status,
        }),
      "Failed to send reviewer response",
      "Review response email error",
    );

    await createAuditLog({
      actorId: user.userId,
      actorRole: user.role as Role,
      action:
        status === "ACCEPTED"
          ? "REVIEW_INVITATION_ACCEPTED"
          : "REVIEW_INVITATION_DECLINED",
      entityType: "REVIEW_ASSIGNMENT",
      entityId: assignment.id,
      summary:
        status === "ACCEPTED"
          ? `Accepted review invitation for "${assignment.manuscript.title}".`
          : `Declined review invitation for "${assignment.manuscript.title}".`,
      metadata: {
        manuscriptId: assignment.manuscript.id,
        manuscriptTitle: assignment.manuscript.title,
        status,
      },
      req,
    });

    return NextResponse.json({
      assignment: updatedAssignment,
      emailSent,
      emailError,
    });
  } catch (error) {
    console.error("Assignment response error:", error);
    return handleRouteError(error);
  }
}
