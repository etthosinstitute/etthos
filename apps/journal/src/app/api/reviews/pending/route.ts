import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // fetching reviews submitted by this user
    const submittedReviews = await prisma.review.findMany({
        where: { reviewerId: user.userId },
        include: {
            manuscript: {
                select: { title: true }
            }
        }
    });

    // fetching manuscripts that *might* be assigned to this user??
    // As noted in the assignment route, we don't track assignments in a separate table yet.
    // So "Pending" reviews are hard to determine without schema changes.
    // For now, we return the reviews they HAVE done.
    
    return NextResponse.json({ submittedReviews });
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
