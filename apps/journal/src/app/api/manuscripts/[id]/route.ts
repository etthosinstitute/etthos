import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { requireAuth } from "@/server/auth";
import { handleRouteError } from "@/shared/utils";
import { createAuditLog } from "@/server/audit";
import type { Role } from "@repo/database";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  if (!["EDITOR", "ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await params;

    const manuscript = await prisma.manuscript.findUnique({
      where: { id },
      select: { id: true, title: true, publishedArticleId: true },
    });

    if (!manuscript) {
      return NextResponse.json(
        { error: "Manuscript not found" },
        { status: 404 },
      );
    }

    await prisma.$transaction(async (tx) => {
      // If there's an associated article, delete it as well
      if (manuscript.publishedArticleId) {
        await tx.article.delete({
          where: { id: manuscript.publishedArticleId },
        });
      }

      // Delete the manuscript itself (this will cascade delete reviews and assignments)
      await tx.manuscript.delete({
        where: { id: manuscript.id },
      });
    });

    await createAuditLog({
      actorId: user.userId,
      actorRole: user.role as Role,
      action: "MANUSCRIPT_SUBMITTED", // Reusing action or logging it as custom
      entityType: "MANUSCRIPT",
      entityId: manuscript.id,
      summary: `Deleted manuscript "${manuscript.title}" (ID: ${manuscript.id}).`,
      metadata: {
        manuscriptTitle: manuscript.title,
      },
      req,
    });

    return NextResponse.json({ message: "Manuscript successfully deleted." });
  } catch (error) {
    return handleRouteError(error);
  }
}
