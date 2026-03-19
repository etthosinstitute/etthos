import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { z } from "zod";

const reviewSchema = z.object({
  manuscriptId: z.string(),
  content: z.string().min(10),
  decision: z.enum(["ACCEPT", "MINOR_REVISIONS", "MAJOR_REVISIONS", "REJECT"]),
});

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { manuscriptId, content, decision } = reviewSchema.parse(body);

    const review = await prisma.review.create({
      data: {
        content,
        decision,
        reviewerId: user.userId,
        manuscriptId,
      },
    });

    // Optionally update manuscript status based on decision
    // For simplicity, if REJECT, set REJECTED. If ACCEPT, set ACCEPTED.
    // In real world, this needs Editor approval.
    let newStatus = undefined;
    if (decision === "REJECT") newStatus = "REJECTED";
    if (decision === "ACCEPT") newStatus = "ACCEPTED";

    if (newStatus) {
        await prisma.manuscript.update({
            where: { id: manuscriptId },
            data: { status: newStatus as any } 
        });
    }

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error("Submit review error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
