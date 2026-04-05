import { NextRequest, NextResponse } from "next/server";
import { prisma, USER_SELECT } from "@/server/db/prisma";
import { requireAuth } from "@/server/auth";
import { handleRouteError } from "@/shared/utils";

export async function GET(req: NextRequest) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  try {
    const [pendingAssignments, submittedReviews] = await Promise.all([
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
    ]);

    return NextResponse.json({ pendingAssignments, submittedReviews });
  } catch (error) {
    console.error("Get reviews error:", error);
    return handleRouteError(error);
  }
}
