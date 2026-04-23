import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/server/db/prisma";
import { requireAuth } from "@/server/auth";
import { handleRouteError, slugify } from "@/shared/utils";
import { enforceRateLimit } from "@/server/rate-limit";
import { createAuditLog } from "@/server/audit";
import type { Role } from "@repo/database";
import { z } from "zod";

const publishSchema = z.object({
  articleTitle: z.string().min(3),
  articleType: z.enum([
    "RESEARCH_ARTICLE",
    "REVIEW_ARTICLE",
    "CASE_STUDY",
    "SHORT_COMMUNICATION",
    "EDITORIAL",
    "LETTER_TO_EDITOR",
    "BOOK_REVIEW",
  ]),
  volumeNumber: z.coerce.number().int().positive(),
  volumeYear: z.coerce.number().int().min(1900).max(3000),
  issueNumber: z.coerce.number().int().positive(),
  issueTitle: z.string().optional(),
  issueDescription: z.string().optional(),
  publishedDate: z.string().datetime(),
  doi: z.string().optional(),
  pageStart: z.coerce.number().int().positive().optional(),
  pageEnd: z.coerce.number().int().positive().optional(),
});

async function createUniqueArticleSlug(title: string) {
  const base = slugify(title) || "article";
  let candidate = base;
  let counter = 2;

  while (await prisma.article.findUnique({ where: { slug: candidate }, select: { id: true } })) {
    candidate = `${base}-${counter}`;
    counter += 1;
  }

  return candidate;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  if (!["EDITOR", "ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const limited = enforceRateLimit(req, {
    bucket: "manuscript:publish",
    key: user.userId,
    limit: 20,
    windowMs: 60 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const { id } = await params;
    const body = await req.json();
    const payload = publishSchema.parse(body);

    const manuscript = await prisma.manuscript.findUnique({
      where: { id },
      include: {
        author: true,
        reviews: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!manuscript) {
      return NextResponse.json({ error: "Manuscript not found" }, { status: 404 });
    }

    if (manuscript.publishedArticleId) {
      return NextResponse.json({ error: "This manuscript is already published." }, { status: 409 });
    }

    if (manuscript.status !== "ACCEPTED") {
      return NextResponse.json(
        { error: "Only accepted manuscripts can be published." },
        { status: 400 }
      );
    }

    if (!manuscript.fileUrl) {
      return NextResponse.json(
        { error: "Attach a manuscript file before publishing." },
        { status: 400 }
      );
    }

    const journal = await prisma.journal.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
      select: { id: true, name: true },
    });

    if (!journal) {
      return NextResponse.json({ error: "Journal configuration is missing." }, { status: 500 });
    }

    const publishedAt = new Date(payload.publishedDate);
    const issueTitle =
      payload.issueTitle?.trim() ||
      `Volume ${payload.volumeNumber}, Issue ${payload.issueNumber}`;
    const issueDescription = payload.issueDescription?.trim() || undefined;

    const slug = await createUniqueArticleSlug(payload.articleTitle);

    const result = await prisma.$transaction(async (tx) => {
      const volume = await tx.volume.upsert({
        where: {
          journalId_number: {
            journalId: journal.id,
            number: payload.volumeNumber,
          },
        },
        update: {
          year: payload.volumeYear,
          description: `Volume ${payload.volumeNumber} (${payload.volumeYear})`,
        },
        create: {
          journalId: journal.id,
          number: payload.volumeNumber,
          year: payload.volumeYear,
          description: `Volume ${payload.volumeNumber} (${payload.volumeYear})`,
        },
      });

      const issue = await tx.issue.upsert({
        where: {
          volumeId_number: {
            volumeId: volume.id,
            number: payload.issueNumber,
          },
        },
        update: {
          title: issueTitle,
          description: issueDescription,
          published: true,
          publishedDate: publishedAt,
        },
        create: {
          volumeId: volume.id,
          number: payload.issueNumber,
          title: issueTitle,
          description: issueDescription,
          published: true,
          publishedDate: publishedAt,
        },
      });

      const author = await tx.author.upsert({
        where: { email: manuscript.author.email },
        update: {
          firstName: manuscript.author.firstName || "Author",
          lastName: manuscript.author.lastName || "Etthos",
        },
        create: {
          firstName: manuscript.author.firstName || "Author",
          lastName: manuscript.author.lastName || "Etthos",
          email: manuscript.author.email,
        },
      });

      const article = await tx.article.create({
        data: {
          title: payload.articleTitle,
          slug,
          abstract: manuscript.abstract || "Abstract will be updated by the editorial office.",
          type: payload.articleType,
          published: true,
          publishedDate: publishedAt,
          submittedDate: manuscript.submittedAt,
          acceptedDate: manuscript.decidedAt || publishedAt,
          issueId: issue.id,
          doi: payload.doi?.trim() || undefined,
          pdfUrl: manuscript.fileUrl,
          pageStart: payload.pageStart,
          pageEnd: payload.pageEnd,
          authors: {
            create: {
              authorId: author.id,
              order: 1,
              isCorresponding: true,
              correspondingEmail: manuscript.author.email,
            },
          },
          keywords: {
            create: manuscript.keywords.map((keyword) => ({
              keyword: {
                connectOrCreate: {
                  where: { name: keyword },
                  create: { name: keyword },
                },
              },
            })),
          },
        },
      });

      await tx.manuscript.update({
        where: { id: manuscript.id },
        data: {
          status: "PUBLISHED",
          issueId: issue.id,
          publishedArticleId: article.id,
          decidedAt: manuscript.decidedAt || publishedAt,
        },
      });

      return { volume, issue, article };
    });

    revalidatePath("/");
    revalidatePath("/issues");
    revalidatePath(`/issues/volume-${result.volume.number}-issue-${result.issue.number}`);
    revalidatePath("/articles");
    revalidatePath(`/articles/${result.article.slug}`);
    revalidatePath("/dashboard");
    revalidateTag("articles");
    revalidateTag("issues");

    await createAuditLog({
      actorId: user.userId,
      actorRole: user.role as Role,
      action: "MANUSCRIPT_PUBLISHED",
      entityType: "ARTICLE",
      entityId: result.article.id,
      summary: `Published "${result.article.title}" in Volume ${result.volume.number}, Issue ${result.issue.number}.`,
      metadata: {
        manuscriptId: manuscript.id,
        articleSlug: result.article.slug,
        volume: result.volume.number,
        issue: result.issue.number,
      },
      req,
    });

    return NextResponse.json(
      {
        message: "Manuscript published successfully.",
        article: {
          id: result.article.id,
          slug: result.article.slug,
          title: result.article.title,
        },
        issue: {
          volume: result.volume.number,
          issue: result.issue.number,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}
