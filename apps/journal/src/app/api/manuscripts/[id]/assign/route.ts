import { NextRequest, NextResponse } from "next/server";
import { prisma, USER_SELECT } from "@/server/db/prisma";
import { requireAuth } from "@/server/auth";
import { fullName, handleRouteError } from "@/shared/utils";
import { sendReviewAssignmentEmail } from "@/server/mail";
import { trySendEmail } from "@/server/mailer";
import { enforceRateLimit } from "@/server/rate-limit";
import { createAuditLog } from "@/server/audit";
import { z } from "zod";

const assignSchema = z.object({
  reviewerId: z.string(),
  dueDate: z.string().datetime().optional(),
  editorNotes: z.string().max(2000).optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  if (user.role !== "ADMIN" && user.role !== "EDITOR" && user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const limited = enforceRateLimit(req, {
    bucket: "assignment:create",
    key: user.userId,
    limit: 30,
    windowMs: 60 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();
    const { reviewerId, dueDate, editorNotes } = assignSchema.parse(body);
    const { id } = await params;

    const [reviewer, editor, manuscript] = await Promise.all([
      prisma.user.findUnique({ where: { id: reviewerId } }),
      prisma.user.findUnique({ where: { id: user.userId }, select: USER_SELECT }),
      prisma.manuscript.findUnique({
        where: { id },
        include: {
          author: { select: USER_SELECT },
          assignments: {
            where: { reviewerId, status: { in: ["ASSIGNED", "ACCEPTED"] } },
          },
        },
      }),
    ]);

    if (!manuscript) {
      return NextResponse.json({ error: "Manuscript not found" }, { status: 404 });
    }

    if (
      !reviewer ||
      (!reviewer.isReviewer &&
        reviewer.role !== "REVIEWER" &&
        reviewer.role !== "EDITOR" &&
        reviewer.role !== "ADMIN" &&
        reviewer.role !== "SUPER_ADMIN")
    ) {
      return NextResponse.json({ error: "Reviewer not found" }, { status: 404 });
    }

    if (manuscript.assignments.length > 0) {
      return NextResponse.json(
        { error: "This reviewer already has an active assignment for the manuscript" },
        { status: 409 }
      );
    }

    const assignment = await prisma.reviewAssignment.create({
      data: {
        manuscriptId: id,
        reviewerId,
        editorId: user.userId,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        editorNotes,
        status: "ASSIGNED",
      },
      include: {
        reviewer: { select: { ...USER_SELECT, role: true } },
        editor: { select: USER_SELECT },
      },
    });

    const updatedManuscript = await prisma.manuscript.update({
      where: { id },
      data: { status: "UNDER_REVIEW", editorNotes: editorNotes || manuscript.editorNotes },
      include: {
        author: { select: USER_SELECT },
        assignments: {
          include: {
            reviewer: { select: { ...USER_SELECT, role: true } },
          },
          orderBy: { invitedAt: "desc" },
        },
      },
    });

    const { emailSent, emailError } = await trySendEmail(
      async () =>
        sendReviewAssignmentEmail({
          reviewerEmail: assignment.reviewer.email,
          reviewerName: fullName(assignment.reviewer.firstName, assignment.reviewer.lastName, assignment.reviewer.email),
          editorName: fullName(editor?.firstName, editor?.lastName, editor?.email),
          manuscriptTitle: manuscript.title,
          manuscriptId: manuscript.id,
          dueDate: assignment.dueDate?.toISOString() || null,
          dashboardUrl: `${req.nextUrl.origin}/dashboard`,
        }),
      "Failed to send assignment email",
      "Assign reviewer email error"
    );

    await createAuditLog({
      actorId: user.userId,
      actorRole: user.role,
      action: "REVIEWER_ASSIGNED",
      entityType: "REVIEW_ASSIGNMENT",
      entityId: assignment.id,
      summary: `Assigned ${fullName(assignment.reviewer.firstName, assignment.reviewer.lastName, assignment.reviewer.email)} to review "${manuscript.title}".`,
      metadata: {
        manuscriptId: manuscript.id,
        manuscriptTitle: manuscript.title,
        reviewerId: assignment.reviewer.id,
        reviewerEmail: assignment.reviewer.email,
      },
      req,
    });

    return NextResponse.json({
      message: "Reviewer assigned",
      assignment,
      manuscript: updatedManuscript,
      emailSent,
      emailError,
    });
  } catch (error) {
    console.error("Assign reviewer error:", error);
    return handleRouteError(error);
  }
}
