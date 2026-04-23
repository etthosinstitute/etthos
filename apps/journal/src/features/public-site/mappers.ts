import type { Prisma } from "@repo/database";
import { fullName } from "@/shared/utils";
import type { JournalInfo, PublicArticle, PublicBoardMember, PublicIssue } from "./types";
import { EDITORIAL_IMAGE_OVERRIDES } from "./static-config";

export const articleInclude = {
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

export type ArticleRecord = Prisma.ArticleGetPayload<{
  include: typeof articleInclude;
}>;

export type BoardMemberRecord = Prisma.EditorialBoardMemberGetPayload<{
  include: {
    affiliation: {
      select: {
        institution: true;
      };
    };
  };
}>;

export type JournalRecord = {
  id: string;
  name: string;
  shortName: string;
  description: string | null;
  issn: string | null;
  eissn: string | null;
  publisher: string;
  frequency: string;
  language: string;
  country: string;
  websiteUrl: string;
  mainWebsiteUrl: string;
  contactEmail: string;
  infoEmail: string | null;
  contactPhone: string | null;
  subjectArea: string;
  subjectKeywords: string[];
  accessPolicy: string | null;
  reviewModel: string | null;
  license: string | null;
  establishedYear: number | null;
  registeredOfficeLabel: string | null;
  publisherAddress: string;
  publisherCity: string;
  publisherState: string;
  publisherZip: string;
  publisherCountry: string;
  corporateOfficeLabel: string | null;
  corporateOfficeAddress: string | null;
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

export function buildIssueSlug(volume: number, issue: number) {
  return `volume-${volume}-issue-${issue}`;
}

export function parseIssueSlug(slug: string) {
  const match = /^volume-(\d+)-issue-(\d+)$/i.exec(slug);
  if (!match) return null;
  return {
    volume: Number(match[1]),
    issue: Number(match[2]),
  };
}

export function createPersonSlug(firstName: string, lastName: string) {
  return `${firstName}-${lastName}`
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatAddress(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(", ");
}

export function mapArticle(article: ArticleRecord) {
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

export function mapBoardMember(member: BoardMemberRecord) {
  const slug = createPersonSlug(member.firstName, member.lastName);

  return {
    id: member.id,
    slug,
    name: fullName(member.firstName, member.lastName, member.email),
    title: member.title,
    role: formatBoardRole(member.role),
    designation: member.designation,
    department: member.department,
    institution: member.affiliation.institution,
    email: member.email,
    country: member.country,
    image: member.profileImageUrl || EDITORIAL_IMAGE_OVERRIDES[slug] || null,
    orcid: member.orcid,
    expertise: member.expertise,
    biography: member.biography,
    displayOrder: member.displayOrder,
  } satisfies PublicBoardMember;
}

export function mapJournalInfo(journal: JournalRecord) {
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
}

export function mapIssueSummary(issue: {
  number: number;
  title: string | null;
  description: string | null;
  published: boolean;
  publishedDate: Date | null;
  articles: { id: string }[];
  volume: { number: number; year: number };
}) {
  return {
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
  } satisfies PublicIssue;
}
