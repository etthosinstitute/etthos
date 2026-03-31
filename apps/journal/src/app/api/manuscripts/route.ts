import { NextRequest, NextResponse } from "next/server";
import { prisma, MANUSCRIPT_INCLUDE } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { sendManuscriptSubmissionEmail } from "@/lib/public-mail";
import { handleRouteError } from "@/lib/utils";
import { enforceRateLimit } from "@/lib/rate-limit";
import { createAuditLog } from "@/lib/audit";
import type { Prisma, Role } from "@repo/database";
import { z } from "zod";

const manuscriptSchema = z.object({
  title: z.string().min(3),
  abstract: z.string().optional(),
  keywords: z.array(z.string().min(1)).optional(),
  fileUrl: z
    .string()
    .refine((value) => value.startsWith("/") || z.string().url().safeParse(value).success, {
      message: "Invalid manuscript file URL",
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  const limited = enforceRateLimit(req, {
    bucket: "manuscript:create",
    key: user.userId,
    limit: 8,
    windowMs: 60 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();
    const { title, abstract, keywords, fileUrl } = manuscriptSchema.parse(body);

    const manuscript = await prisma.manuscript.create({
      data: {
        title,
        abstract,
        keywords: keywords || [],
        fileUrl,
        authorId: user.userId,
        status: "SUBMITTED",
      },
    });

    try {
      await sendManuscriptSubmissionEmail({
        authorEmail: user.email,
        manuscriptTitle: manuscript.title,
        manuscriptId: manuscript.id,
        dashboardUrl: `${new URL(req.url).origin}/dashboard`,
      });
    } catch (mailError) {
      console.error("Manuscript submission email error:", mailError);
    }

    await createAuditLog({
      actorId: user.userId,
      actorRole: user.role as Role,
      action: "MANUSCRIPT_SUBMITTED",
      entityType: "MANUSCRIPT",
      entityId: manuscript.id,
      summary: `Submitted manuscript "${manuscript.title}".`,
      metadata: {
        manuscriptTitle: manuscript.title,
      },
      req,
    });

    return NextResponse.json({ manuscript }, { status: 201 });
  } catch (error) {
    console.error("Create manuscript error:", error);
    return handleRouteError(error);
  }
}

export async function GET(req: NextRequest) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter");

    let whereClause: Prisma.ManuscriptWhereInput = {};

    if (filter === "my" || user.role === "AUTHOR") {
      whereClause = { authorId: user.userId };
    } else if (
      (filter === "all" || !filter) &&
      (user.role === "ADMIN" || user.role === "EDITOR")
    ) {
      // No extra filter — return all
    } else {
      whereClause = { authorId: user.userId };
    }

    const manuscripts = await prisma.manuscript.findMany({
      where: whereClause,
      include: MANUSCRIPT_INCLUDE,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ manuscripts });
  } catch (error) {
    console.error("Get manuscripts error:", error);
    return handleRouteError(error);
  }
}
