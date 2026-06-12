import type { JournalInfo, PublicArticle } from "./types";

type CitationStyle = "APA" | "MLA" | "CHICAGO";

function normalizeAuthorName(name: string) {
  return name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s*/i, "").trim();
}

function getYear(article: PublicArticle) {
  return new Date(article.publishedDate).getFullYear();
}

function getPageRange(article: PublicArticle) {
  if (article.pageStart && article.pageEnd) {
    return `${article.pageStart}-${article.pageEnd}`;
  }
  return null;
}

function getDoiUrl(article: PublicArticle) {
  return article.doi ? `https://doi.org/${article.doi}` : null;
}

function formatApaAuthors(article: PublicArticle) {
  return article.authors
    .map((author) => {
      const cleaned = normalizeAuthorName(author.name);
      const parts = cleaned.split(/\s+/);
      const last = parts[parts.length - 1] || cleaned;
      const initials = parts
        .slice(0, -1)
        .map((part) => `${part.charAt(0)}.`)
        .join(" ");
      return initials ? `${last}, ${initials}` : last;
    })
    .join(", ");
}

function formatDisplayAuthors(article: PublicArticle) {
  return article.authors
    .map((author) => normalizeAuthorName(author.name))
    .join(", ");
}

function generateApa(article: PublicArticle, journalInfo: JournalInfo) {
  const authors = formatApaAuthors(article);
  const year = getYear(article);
  const pages = getPageRange(article);
  const doiUrl = getDoiUrl(article);
  const issuePart = article.issue ? `(${article.issue})` : "";
  const pagesPart = pages ? `, ${pages}` : "";
  const doiPart = doiUrl ? ` ${doiUrl}` : "";

  return `${authors} (${year}). ${article.title}. ${journalInfo.name}, ${article.volume}${issuePart}${pagesPart}.${doiPart}`;
}

function generateMla(article: PublicArticle, journalInfo: JournalInfo) {
  const authors = formatDisplayAuthors(article);
  const year = getYear(article);
  const pages = getPageRange(article);
  const doiUrl = getDoiUrl(article);
  const pagesPart = pages ? `pp. ${pages}. ` : "";
  const doiPart = doiUrl ? `${doiUrl}.` : "";

  return `${authors}. "${article.title}." ${journalInfo.name}, vol. ${article.volume}, no. ${article.issue}, ${year}, ${pagesPart}${doiPart}`.trim();
}

function generateChicago(article: PublicArticle, journalInfo: JournalInfo) {
  const authors = formatDisplayAuthors(article);
  const year = getYear(article);
  const pages = getPageRange(article);
  const doiUrl = getDoiUrl(article);
  const pagesPart = pages ? `: ${pages}` : "";
  const doiPart = doiUrl ? `. ${doiUrl}` : "";

  return `${authors}. "${article.title}." ${journalInfo.name} ${article.volume}, no. ${article.issue} (${year})${pagesPart}${doiPart}.`;
}

export function generateCitation(
  style: CitationStyle,
  article: PublicArticle,
  journalInfo: JournalInfo,
) {
  switch (style) {
    case "APA":
      return generateApa(article, journalInfo);
    case "MLA":
      return generateMla(article, journalInfo);
    case "CHICAGO":
      return generateChicago(article, journalInfo);
    default:
      return generateApa(article, journalInfo);
  }
}

export function getRecommendedCitation(
  article: PublicArticle,
  journalInfo: JournalInfo,
) {
  return generateCitation("APA", article, journalInfo);
}
