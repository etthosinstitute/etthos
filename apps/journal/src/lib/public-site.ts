import { cache } from "react";
import { z } from "zod";
import type { Prisma } from "@repo/database";
import { prisma } from "@/lib/prisma";
import { fullName } from "@/lib/utils";
import { editorialBoard as staticEditorialBoard } from "./data";
import { homeContent } from "../content/home";
import { aboutContent } from "../content/about";
import { aimsScopeContent } from "../content/aims-scope";
import { guidelinesContent } from "../content/guidelines";
import { policiesContent } from "../content/policies";
import { contactContent } from "../content/contact";
import { publisherContent } from "../content/publisher";

const homeContentSchema = z.object({
  eyebrow: z.string(),
  heroDescription: z.string(),
  heroNotice: z.string(),
  profileCards: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string(),
      icon: z.enum(["book-open", "shield", "globe", "brain"]),
    })
  ),
  features: z.array(
    z.object({
      eyebrow: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.enum(["book-open", "shield", "globe", "brain"]),
    })
  ),
});

const founderSchema = z.object({
  name: z.string(),
  role: z.string(),
  image: z.string(),
});

const aboutContentSchema = z.object({
  overviewParagraphs: z.array(z.string()),
  foundersTitle: z.string(),
  foundersDescription: z.string(),
  founders: z.array(founderSchema),
  aimsIntro: z.string(),
  publicationFrequencyText: z.string(),
  submitCtaTitle: z.string(),
  submitCtaDescription: z.string(),
});

const aimsScopeContentSchema = z.object({
  aimsParagraphs: z.array(z.string()),
  articleTypes: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
});

const guidelinesContentSchema = z.object({
  sections: z.array(
    z.object({
      title: z.string(),
      paragraphs: z.array(z.string()).default([]),
      listType: z.enum(["bullet", "numbered"]).optional(),
      items: z.array(z.string()).optional(),
    })
  ),
  resources: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.enum(["file-text", "check-circle"]),
      href: z.string(),
      ctaLabel: z.string(),
    })
  ),
});

const policiesContentSchema = z.object({
  sections: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      icon: z.enum(["check", "shield", "lock", "file-text"]),
      paragraphs: z.array(z.string()),
      bullets: z.array(z.string()).optional(),
    })
  ),
});

const contactContentSchema = z.object({
  formIntro: z.string(),
  subjects: z.array(z.string()),
  successMessage: z.string(),
});

const publisherContentSchema = z.object({
  introParagraphs: z.array(z.string()),
});

export type HomeContent = z.infer<typeof homeContentSchema>;
export type AboutContent = z.infer<typeof aboutContentSchema>;
export type AimsScopeContent = z.infer<typeof aimsScopeContentSchema>;
export type GuidelinesContent = z.infer<typeof guidelinesContentSchema>;
export type PoliciesContent = z.infer<typeof policiesContentSchema>;
export type ContactContent = z.infer<typeof contactContentSchema>;
export type PublisherContent = z.infer<typeof publisherContentSchema>;

export type JournalInfo = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  issn: string | null;
  eissn: string | null;
  publisher: string;
  frequency: string;
  language: string;
  country: string;
  websiteUrl: string;
  mainWebsiteUrl: string;
  contactEmail: string;
  infoEmail: string;
  phone: string | null;
  subjectArea: string;
  subjectAreas: string[];
  accessPolicy: string;
  reviewModel: string;
  license: string;
  establishedYear: number | null;
  registeredOffice: {
    label: string;
    address: string;
  };
  corporateOffice: {
    label: string;
    address: string;
  } | null;
};

export type PublicArticle = {
  id: string;
  slug: string;
  title: string;
  authors: {
    name: string;
    affiliation: string;
    country: string;
    isCorresponding?: boolean;
  }[];
  abstract: string;
  keywords: string[];
  date: string;
  publishedDate: string;
  type: string;
  volume: number;
  issue: number;
  doi: string | null;
  pdfUrl?: string | null;
  pageStart?: number | null;
  pageEnd?: number | null;
  references?: { text: string; doi?: string | null }[];
};

export type PublicIssue = {
  slug: string;
  volume: number;
  issue: number;
  title?: string | null;
  month: string;
  year: number;
  published: boolean;
  publishedDate?: string | null;
  articleCount: number;
  description?: string | null;
};

export type PublicBoardMember = {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  role: string;
  designation: string;
  department: string;
  institution: string;
  email: string;
  country: string;
  image: string | null;
  orcid?: string | null;
  expertise: string[];
  biography: string | null;
  displayOrder: number;
};

const articleInclude = {
  issue: {
    include: {
      volume: true,
    },
  },
  authors: {
    include: {
      author: {
        include: {
          affiliations: {
            include: {
              affiliation: true,
            },
          },
        },
      },
    },
    orderBy: {
      order: "asc" as const,
    },
  },
  keywords: {
    include: {
      keyword: true,
    },
  },
  references: {
    orderBy: {
      order: "asc" as const,
    },
  },
} as const;

type ArticleRecord = Prisma.ArticleGetPayload<{
  include: typeof articleInclude;
}>;

type BoardMemberRecord = Prisma.EditorialBoardMemberGetPayload<{
  include: {
    affiliation: {
      select: {
        institution: true;
      };
    };
  };
}>;



type JournalRecord = Awaited<ReturnType<typeof prisma.journal.findFirst>> & {
  infoEmail?: string | null;
  accessPolicy?: string | null;
  reviewModel?: string | null;
  license?: string | null;
  establishedYear?: number | null;
  registeredOfficeLabel?: string | null;
  corporateOfficeLabel?: string | null;
  corporateOfficeAddress?: string | null;
};

function formatMonthYear(value: Date | null | undefined) {
  if (!value) return "Unpublished";
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(value);
}

function formatArticleType(value: string) {
  return value
    .split("_")
    .map((part) => `${part.charAt(0)}${part.slice(1).toLowerCase()}`)
    .join(" ");
}

function formatBoardRole(value: string) {
  return value
    .split("_")
    .map((part) => `${part.charAt(0)}${part.slice(1).toLowerCase()}`)
    .join(" ");
}

function buildIssueSlug(volume: number, issue: number) {
  return `volume-${volume}-issue-${issue}`;
}

function parseIssueSlug(slug: string) {
  const match = /^volume-(\d+)-issue-(\d+)$/i.exec(slug);
  if (!match) return null;
  return {
    volume: Number(match[1]),
    issue: Number(match[2]),
  };
}

function createPersonSlug(firstName: string, lastName: string) {
  return `${firstName}-${lastName}`
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatAddress(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(", ");
}

function mapArticle(article: ArticleRecord) {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    authors: article.authors.map((entry: ArticleRecord["authors"][number]) => {
      const primaryAffiliation = entry.author.affiliations.find(
        (item: ArticleRecord["authors"][number]["author"]["affiliations"][number]) => item.isPrimary
      )?.affiliation;
      return {
        name: fullName(entry.author.firstName, entry.author.lastName, entry.author.email),
        affiliation:
          entry.affiliationAtPublication ||
          primaryAffiliation?.institution ||
          "Independent Scholar",
        country: primaryAffiliation?.country || "",
        isCorresponding: entry.isCorresponding,
      };
    }),
    abstract: article.abstract,
    keywords: article.keywords.map((entry: ArticleRecord["keywords"][number]) => entry.keyword.name),
    date: formatMonthYear(article.publishedDate),
    publishedDate: article.publishedDate?.toISOString() || article.createdAt.toISOString(),
    type: formatArticleType(article.type),
    volume: article.issue.volume.number,
    issue: article.issue.number,
    doi: article.doi,
    pdfUrl: article.pdfUrl,
    pageStart: article.pageStart,
    pageEnd: article.pageEnd,
    references: article.references.map((reference: ArticleRecord["references"][number]) => ({
      text: reference.text,
      doi: reference.doi,
    })),
  } satisfies PublicArticle;
}

function mapBoardMember(member: BoardMemberRecord) {
  return {
    id: member.id,
    slug: createPersonSlug(member.firstName, member.lastName),
    name: fullName(member.firstName, member.lastName, member.email),
    title: member.title,
    role: formatBoardRole(member.role),
    designation: member.designation,
    department: member.department,
    institution: member.affiliation.institution,
    email: member.email,
    country: member.country,
    image: member.profileImageUrl,
    orcid: member.orcid,
    expertise: member.expertise,
    biography: member.biography,
    displayOrder: member.displayOrder,
  } satisfies PublicBoardMember;
}

function mapStaticBoardMember(
  member: (typeof staticEditorialBoard)[number]
) {
  return {
    id: member.id,
    slug: createPersonSlug(
      member.name.replace(/^(Prof\.\s*\(Dr\.\)|Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "").split(" ")[0] || member.name,
      member.name.replace(/^(Prof\.\s*\(Dr\.\)|Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "").split(" ").slice(1).join(" ")
    ),
    name: member.name,
    title: member.title,
    role: member.role,
    designation: member.designation,
    department: member.department,
    institution: member.institution,
    email: member.email,
    country: member.country,
    image: member.image,
    orcid: member.orcid,
    expertise: member.expertise,
    biography: member.biography,
    displayOrder: member.displayOrder,
  } satisfies PublicBoardMember;
}



export const getJournalInfo = cache(async () => {
  const journal = (await prisma.journal.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  })) as JournalRecord;

  if (!journal) {
    throw new Error("Missing journal configuration");
  }

  return {
    id: journal.id,
    name: journal.name,
    shortName: journal.shortName,
    description:
      journal.description ||
      "A peer-reviewed, open-access journal dedicated to advancing research in psychology and behavioural sciences.",
    issn: journal.issn,
    eissn: journal.eissn,
    publisher: journal.publisher,
    frequency: journal.frequency,
    language: journal.language,
    country: journal.country,
    websiteUrl: journal.websiteUrl,
    mainWebsiteUrl: journal.mainWebsiteUrl,
    contactEmail: journal.contactEmail,
    infoEmail: journal.infoEmail || journal.contactEmail,
    phone: journal.contactPhone,
    subjectArea: journal.subjectArea,
    subjectAreas: journal.subjectKeywords,
    accessPolicy: journal.accessPolicy || "Open Access",
    reviewModel: journal.reviewModel || "Double-Blind Peer Review",
    license: journal.license || "CC BY 4.0",
    establishedYear: journal.establishedYear ?? null,
    registeredOffice: {
      label: journal.registeredOfficeLabel || "Registered Office",
      address: formatAddress([
        journal.publisherAddress,
        journal.publisherCity,
        journal.publisherState,
        journal.publisherZip,
        journal.publisherCountry,
      ]),
    },
    corporateOffice: journal.corporateOfficeAddress
      ? {
          label: journal.corporateOfficeLabel || "Corporate Office",
          address: journal.corporateOfficeAddress,
        }
      : null,
  } satisfies JournalInfo;
});

export const getHomeContent = cache(async () => {
  return {
    title: "Home",
    description: "Welcome to the Etthos Journal",
    content: homeContent,
  };
});

export const getAboutContent = cache(async () => {
  return {
    title: "About",
    description: "About the Etthos Journal",
    content: aboutContent,
  };
});

export const getAimsScopeContent = cache(async () => {
  return {
    title: "Aims & Scope",
    description: "Discover the aims and scope of our journal",
    content: aimsScopeContent,
  };
});

export const getGuidelinesContent = cache(async () => {
  return {
    title: "Guidelines",
    description: "Submission guidelines for authors",
    content: guidelinesContent,
  };
});

export const getPoliciesContent = cache(async () => {
  return {
    title: "Policies",
    description: "Editorial and publication policies",
    content: policiesContent,
  };
});

export const getContactContent = cache(async () => {
  return {
    title: "Contact",
    description: "Get in touch with us",
    content: contactContent,
  };
});

export const getPublisherContent = cache(async () => {
  return {
    title: "Publisher",
    description: "Information about the publisher",
    content: publisherContent,
  };
});

export const getPublishedArticles = cache(async (limit?: number) => {
  const articles = await prisma.article.findMany({
    where: { published: true },
    include: articleInclude,
    orderBy: [{ publishedDate: "desc" }, { createdAt: "desc" }],
    ...(limit ? { take: limit } : {}),
  });

  return articles.map((article) => mapArticle(article as ArticleRecord));
});

export const getPublishedArticleBySlug = cache(async (slug: string) => {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: articleInclude,
  });

  if (!article || !article.published) {
    return null;
  }

  return mapArticle(article as ArticleRecord);
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

  return issues.map((issue) => ({
    slug: buildIssueSlug(issue.volume.number, issue.number),
    volume: issue.volume.number,
    issue: issue.number,
    title: issue.title,
    month: new Intl.DateTimeFormat("en-IN", { month: "long" }).format(
      issue.publishedDate || new Date(issue.volume.year, 0, 1)
    ),
    year: issue.volume.year,
    published: issue.published,
    publishedDate: issue.publishedDate?.toISOString() || null,
    articleCount: issue.articles.length,
    description: issue.description,
  } satisfies PublicIssue));
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
    issue: {
      slug: buildIssueSlug(issue.volume.number, issue.number),
      volume: issue.volume.number,
      issue: issue.number,
      title: issue.title,
      month: new Intl.DateTimeFormat("en-IN", { month: "long" }).format(
        issue.publishedDate || new Date(issue.volume.year, 0, 1)
      ),
      year: issue.volume.year,
      published: issue.published,
      publishedDate: issue.publishedDate?.toISOString() || null,
      articleCount: issue.articles.length,
      description: issue.description,
    } satisfies PublicIssue,
    articles: issue.articles.map((article) => mapArticle(article as ArticleRecord)),
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
    (entry: BoardMemberRecord) => createPersonSlug(entry.firstName, entry.lastName) === slug
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
    articles: articles.map((article) => mapArticle(article as ArticleRecord)),
  };
});
