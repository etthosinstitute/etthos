import { unstable_cache } from "next/cache";
import { prisma } from "@/server/db/prisma";
import {
  articleInclude,
  createPersonSlug,
  mapArticle,
  mapBoardMember,
  mapIssueSummary,
  mapJournalInfo,
  parseIssueSlug,
  type BoardMemberRecord,
  type JournalRecord,
} from "./mappers";
import {
  getAboutContent,
  getAimsScopeContent,
  getContactContent,
  getGuidelinesContent,
  getHomeContent,
  getPoliciesContent,
  getPublisherContent,
} from "./content";
import { JOURNAL_INFO_DEFAULTS } from "./static-config";

export {
  getAboutContent,
  getAimsScopeContent,
  getContactContent,
  getGuidelinesContent,
  getHomeContent,
  getPoliciesContent,
  getPublisherContent,
};

export type {
  AboutContent,
  AimsScopeContent,
  ContactContent,
  GuidelinesContent,
  HomeContent,
  JournalInfo,
  PoliciesContent,
  PublicArticle,
  PublicBoardMember,
  PublicIssue,
  PublisherContent,
} from "./types";

const STATIC_REVALIDATE_SECONDS = 60 * 60;
const LIST_REVALIDATE_SECONDS = 60 * 5;
const MAX_PAGE_SIZE = 50;
const DEFAULT_ARTICLES_PAGE_SIZE = 12;
const DEFAULT_ISSUES_PAGE_SIZE = 12;

type PaginationOptions = {
  page?: number;
  pageSize?: number;
};

type PaginatedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

function normalizePagination(
  options: PaginationOptions | undefined,
  fallbackPageSize: number,
) {
  const page =
    typeof options?.page === "number" && Number.isFinite(options.page)
      ? Math.max(1, Math.floor(options.page))
      : 1;
  const rawPageSize =
    typeof options?.pageSize === "number" && Number.isFinite(options.pageSize)
      ? Math.floor(options.pageSize)
      : fallbackPageSize;
  const pageSize = Math.max(1, Math.min(MAX_PAGE_SIZE, rawPageSize));
  const skip = (page - 1) * pageSize;

  return {
    page,
    pageSize,
    skip,
    take: pageSize,
  };
}

export const getJournalInfo = unstable_cache(
  async () => {
    const journal = (await prisma.journal.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    })) as JournalRecord | null;

    if (!journal) {
      return JOURNAL_INFO_DEFAULTS;
    }

    const mapped = mapJournalInfo(journal);

    return {
      ...JOURNAL_INFO_DEFAULTS,
      ...mapped,
      subjectArea: mapped.subjectArea || JOURNAL_INFO_DEFAULTS.subjectArea,
      subjectAreas:
        mapped.subjectAreas.length > 0
          ? mapped.subjectAreas
          : JOURNAL_INFO_DEFAULTS.subjectAreas,
      description: mapped.description || JOURNAL_INFO_DEFAULTS.description,
    };
  },
  ["journal-info-v4"],
  { tags: ["journal-info"], revalidate: STATIC_REVALIDATE_SECONDS },
);

export async function getPublishedArticles(limit?: number) {
  const take =
    typeof limit === "number" && Number.isFinite(limit)
      ? Math.max(1, Math.min(MAX_PAGE_SIZE, Math.floor(limit)))
      : undefined;

  return unstable_cache(
    async () => {
      const articles = await prisma.article.findMany({
        where: { published: true },
        include: articleInclude,
        orderBy: [{ publishedDate: "desc" }, { createdAt: "desc" }],
        ...(take ? { take } : {}),
      });

      return articles.map((article) => mapArticle(article));
    },
    ["published-articles", `take:${take ?? "all"}`],
    { tags: ["articles"], revalidate: LIST_REVALIDATE_SECONDS },
  )();
}

export async function getPublishedArticlesPage(
  options?: PaginationOptions,
): Promise<
  PaginatedResult<Awaited<ReturnType<typeof getPublishedArticles>>[number]>
> {
  const { page, pageSize, skip, take } = normalizePagination(
    options,
    DEFAULT_ARTICLES_PAGE_SIZE,
  );

  return unstable_cache(
    async () => {
      const [total, articles] = await Promise.all([
        prisma.article.count({ where: { published: true } }),
        prisma.article.findMany({
          where: { published: true },
          include: articleInclude,
          orderBy: [{ publishedDate: "desc" }, { createdAt: "desc" }],
          skip,
          take,
        }),
      ]);

      return {
        items: articles.map((article) => mapArticle(article)),
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      };
    },
    ["published-articles-page", `page:${page}`, `size:${pageSize}`],
    { tags: ["articles"], revalidate: LIST_REVALIDATE_SECONDS },
  )();
}

export async function getPublishedArticleBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const article = await prisma.article.findUnique({
        where: { slug },
        include: articleInclude,
      });

      if (!article || !article.published) {
        return null;
      }

      return mapArticle(article);
    },
    ["published-article-by-slug", slug],
    { tags: ["articles"], revalidate: LIST_REVALIDATE_SECONDS },
  )();
}

export async function getPublishedIssues() {
  return unstable_cache(
    async () => {
      const issues = await prisma.issue.findMany({
        where: { published: true },
        include: {
          volume: true,
          articles: {
            where: { published: true },
            select: { id: true },
          },
        },
        orderBy: [{ volume: { year: "desc" } }, { number: "desc" }],
      });

      return issues.map((issue) => mapIssueSummary(issue));
    },
    ["published-issues"],
    { tags: ["issues"], revalidate: LIST_REVALIDATE_SECONDS },
  )();
}

export async function getPublishedIssuesPage(
  options?: PaginationOptions,
): Promise<
  PaginatedResult<Awaited<ReturnType<typeof getPublishedIssues>>[number]>
> {
  const { page, pageSize, skip, take } = normalizePagination(
    options,
    DEFAULT_ISSUES_PAGE_SIZE,
  );

  return unstable_cache(
    async () => {
      const [total, issues] = await Promise.all([
        prisma.issue.count({ where: { published: true } }),
        prisma.issue.findMany({
          where: { published: true },
          include: {
            volume: true,
            articles: {
              where: { published: true },
              select: { id: true },
            },
          },
          orderBy: [{ volume: { year: "desc" } }, { number: "desc" }],
          skip,
          take,
        }),
      ]);

      return {
        items: issues.map((issue) => mapIssueSummary(issue)),
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      };
    },
    ["published-issues-page", `page:${page}`, `size:${pageSize}`],
    { tags: ["issues"], revalidate: LIST_REVALIDATE_SECONDS },
  )();
}

export async function getLatestPublishedIssue() {
  const page = await getPublishedIssuesPage({ page: 1, pageSize: 1 });
  return page.items[0] || null;
}

export async function getPublishedIssueBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const parsed = parseIssueSlug(slug);
      if (!parsed) return null;

      const issue = await prisma.issue.findFirst({
        where: {
          published: true,
          number: parsed.issue,
          volume: {
            number: parsed.volume,
          },
        },
        include: {
          volume: true,
          articles: {
            where: { published: true },
            include: articleInclude,
            orderBy: [{ pageStart: "asc" }, { publishedDate: "desc" }],
          },
        },
      });

      if (!issue) return null;

      return {
        issue: mapIssueSummary(issue),
        articles: issue.articles.map((article) => mapArticle(article)),
      };
    },
    ["published-issue-by-slug", slug],
    { tags: ["issues", "articles"], revalidate: LIST_REVALIDATE_SECONDS },
  )();
}

export const getEditorialBoardMembers = unstable_cache(
  async () => {
    const members = await prisma.editorialBoardMember.findMany({
      where: { isActive: true },
      include: {
        affiliation: {
          select: {
            institution: true,
          },
        },
      },
      orderBy: { displayOrder: "asc" },
    });

    return members.map((member) => mapBoardMember(member as BoardMemberRecord));
  },
  ["editorial-board-members-v4"],
  { tags: ["editorial-board"], revalidate: STATIC_REVALIDATE_SECONDS },
);

export async function getAuthorProfileBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const members = await prisma.editorialBoardMember.findMany({
        where: { isActive: true },
        include: {
          affiliation: {
            select: {
              institution: true,
            },
          },
        },
      });

      const member = members.find(
        (entry) => createPersonSlug(entry.firstName, entry.lastName) === slug,
      );
      if (!member) return null;

      const articles = await prisma.article.findMany({
        where: {
          published: true,
          authors: {
            some: {
              author: {
                email: member.email,
              },
            },
          },
        },
        include: articleInclude,
        orderBy: [{ publishedDate: "desc" }, { createdAt: "desc" }],
      });

      return {
        member: mapBoardMember(member as BoardMemberRecord),
        articles: articles.map((article) => mapArticle(article)),
      };
    },
    ["author-profile-by-slug", slug],
    {
      tags: ["editorial-board", "articles"],
      revalidate: LIST_REVALIDATE_SECONDS,
    },
  )();
}
