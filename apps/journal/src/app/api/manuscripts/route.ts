import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { z } from "zod";

const manuscriptSchema = z.object({
  title: z.string().min(3),
  abstract: z.string().optional(),
  fileUrl: z.string().url().optional(), // In a real app, this would be a file upload result
});

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, abstract, fileUrl } = manuscriptSchema.parse(body);

    const manuscript = await prisma.manuscript.create({
      data: {
        title,
        abstract,
        fileUrl,
        authorId: user.userId,
        status: "SUBMITTED",
      },
    });

    return NextResponse.json({ manuscript }, { status: 201 });
  } catch (error) {
    console.error("Create manuscript error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter"); // 'my' or 'all' (admin/editor)

    let whereClause: any = {};

    if (filter === "my" || user.role === "AUTHOR") {
      whereClause = { authorId: user.userId };
    } else if (
      (filter === "all" || !filter) &&
      (user.role === "ADMIN" || user.role === "EDITOR")
    ) {
      // No extra filter, return all
    } else {
      // Default to own manuscripts for safety
      whereClause = { authorId: user.userId };
    }

    const manuscripts = await prisma.manuscript.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ manuscripts });
  } catch (error) {
    console.error("Get manuscripts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
