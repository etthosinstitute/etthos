import { NextRequest, NextResponse } from "next/server";
import { prisma, MANUSCRIPT_INCLUDE, USER_SELECT, REVIEWER_SELECT } from "@/server/db/prisma";
import { requireAuth } from "@/server/auth";
import { handleRouteError } from "@/shared/utils";
import type { Role } from "@repo/database";

export async function GET(req: NextRequest) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  try {
    const account = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    if (!account) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const reviewerRoles: Role[] = ["REVIEWER", "EDITOR", "ADMIN"];
    const isEditor = user.role === "EDITOR" || user.role === "ADMIN";

    const [myManuscripts, pendingAssignments, submittedReviews, reviewerDirectory, editorManuscripts, auditLogs] =
      await Promise.all([
        prisma.manuscript.findMany({
          where: { authorId: user.userId },
          include: MANUSCRIPT_INCLUDE,
          orderBy: { createdAt: "desc" },
        }),
        prisma.reviewAssignment.findMany({
          where: {
            reviewerId: user.userId,
            status: { in: ["ASSIGNED", "ACCEPTED"] },
          },
          include: {
            manuscript: {
              select: {
                id: true,
                title: true,
                status: true,
                fileUrl: true,
                updatedAt: true,
                author: { select: USER_SELECT },
              },
            },
            editor: { select: USER_SELECT },
          },
          orderBy: { invitedAt: "desc" },
        }),
        prisma.review.findMany({
          where: { reviewerId: user.userId },
          include: {
            manuscript: { select: { id: true, title: true, status: true } },
            assignment: { select: { id: true, status: true, submittedAt: true } },
          },
          orderBy: { createdAt: "desc" },
        }),
        isEditor
          ? prisma.user.findMany({
              where: { role: { in: reviewerRoles }, isActive: true },
              select: REVIEWER_SELECT,
              orderBy: [{ role: "asc" }, { firstName: "asc" }],
            })
          : Promise.resolve([]),
        isEditor
          ? prisma.manuscript.findMany({
              include: MANUSCRIPT_INCLUDE,
              orderBy: { createdAt: "desc" },
            })
          : Promise.resolve([]),
        isEditor
          ? prisma.auditLog.findMany({
              take: 12,
              orderBy: { createdAt: "desc" },
              include: {
                actor: { select: USER_SELECT },
              },
            })
          : Promise.resolve([]),
      ]);

    return NextResponse.json({
      user: account,
      author: { manuscripts: myManuscripts },
      reviewer: { pendingAssignments, submittedReviews },
      editor: { manuscripts: editorManuscripts, reviewers: reviewerDirectory, auditLogs },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return handleRouteError(error);
  }
}
