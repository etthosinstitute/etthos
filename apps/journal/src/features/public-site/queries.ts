import { cache } from "react";
import { prisma } from "@/server/db/prisma";
import { editorialBoard as staticEditorialBoard } from "./fallback-data";
import {
  articleInclude,
  createPersonSlug,
  mapArticle,
  mapBoardMember,
  mapIssueSummary,
  mapJournalInfo,
  mapStaticBoardMember,
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

export const getJournalInfo = cache(async () => {
  const journal = (await prisma.journal.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  })) as JournalRecord | null;

  if (!journal) {
    throw new Error("Missing journal configuration");
  }

  return mapJournalInfo(journal);
});

export const getPublishedArticles = cache(async (limit?: number) => {
  const articles = await prisma.article.findMany({
    where: { published: true },
    include: articleInclude,
    orderBy: [{ publishedDate: "desc" }, { createdAt: "desc" }],
    ...(limit ? { take: limit } : {}),
  });

  return articles.map((article) => mapArticle(article));
});

export const getPublishedArticleBySlug = cache(async (slug: string) => {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: articleInclude,
  });

  if (!article || !article.published) {
    return null;
  }

  return mapArticle(article);
});

export const getPublishedIssues = cache(async () => {
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
});

export const getLatestPublishedIssue = cache(async () => {
  const issues = await getPublishedIssues();
  return issues[0] || null;
});

export const getPublishedIssueBySlug = cache(async (slug: string) => {
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
});

export const getEditorialBoardMembers = cache(async () => {
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

  if (members.length === 0) {
    return [...staticEditorialBoard]
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((member) => mapStaticBoardMember(member));
  }

  return members.map((member) => mapBoardMember(member as BoardMemberRecord));
});

export const getAuthorProfileBySlug = cache(async (slug: string) => {
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
    (entry) => createPersonSlug(entry.firstName, entry.lastName) === slug
  );
  if (!member) return null;

  const articles = await prisma.article.findMany({
    where: {
      published: true,
      authors: {
        some: {
          author: {
            OR: [
              { email: member.email },
              {
                AND: [
                  { firstName: member.firstName },
                  { lastName: member.lastName },
                ],
              },
            ],
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
});
