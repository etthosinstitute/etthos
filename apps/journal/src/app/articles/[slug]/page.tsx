import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { JournalInfo, PublicArticle } from "@/lib/public-site";
import { getJournalInfo, getPublishedArticleBySlug } from "@/lib/public-site";
import { Calendar, Download, Quote, Share2, User, BookOpen, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [article, journalInfo] = await Promise.all([
    getPublishedArticleBySlug(slug),
    getJournalInfo(),
  ]);

  if (!article) return {};

  return {
    title: article.title,
    description: article.abstract.slice(0, 200) + "...",
    openGraph: {
      title: article.title,
      description: article.abstract.slice(0, 200) + "...",
      type: "article",
      publishedTime: article.publishedDate,
      authors: article.authors.map((a) => a.name),
      url: `${journalInfo.websiteUrl}/articles/${article.slug}`,
    },
    other: {
      "citation_title": article.title,
      "citation_author": article.authors.map((a) => a.name).join("; "),
      "citation_publication_date": article.publishedDate,
      "citation_journal_title": journalInfo.name,
      "citation_volume": String(article.volume),
      "citation_issue": String(article.issue),
      "citation_pdf_url": article.pdfUrl || "",
      "citation_publisher": journalInfo.publisher,
      "citation_language": "en",
      ...(article.doi ? { "citation_doi": article.doi } : {}),
      ...(article.pageStart ? { "citation_firstpage": String(article.pageStart) } : {}),
      ...(article.pageEnd ? { "citation_lastpage": String(article.pageEnd) } : {}),
    },
  };
}

function generateCitationAPA(article: PublicArticle, journalInfo: JournalInfo): string {
  const authorStr = article.authors
    .map((a) => {
      const parts = a.name.replace(/^(Dr\.|Prof\.)\s*/i, "").split(" ");
      const last = parts[parts.length - 1];
      const initials = parts.slice(0, -1).map((p) => p[0] + ".").join(" ");
      return `${last}, ${initials}`;
    })
    .join(", ");
  const pageRange = article.pageStart && article.pageEnd ? `${article.pageStart}–${article.pageEnd}` : "Advance online publication";
  const doiSuffix = article.doi ? ` https://doi.org/${article.doi}` : "";
  return `${authorStr} (${new Date(article.publishedDate).getFullYear()}). ${article.title}. ${journalInfo.name}, ${article.volume}(${article.issue}), ${pageRange}.${doiSuffix}`;
}

function generateCitationMLA(article: PublicArticle, journalInfo: JournalInfo): string {
  const authorStr = article.authors.map((a) => a.name.replace(/^(Dr\.|Prof\.)\s*/i, "")).join(", ");
  const pages = article.pageStart && article.pageEnd ? `pp. ${article.pageStart}–${article.pageEnd}. ` : "";
  const doi = article.doi ? `DOI: ${article.doi}.` : "";
  return `${authorStr}. "${article.title}." ${journalInfo.name}, vol. ${article.volume}, no. ${article.issue}, ${new Date(article.publishedDate).getFullYear()}, ${pages}${doi}`.trim();
}

function ArticleJsonLd({ article, journalInfo }: { article: PublicArticle; journalInfo: JournalInfo }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: article.title,
    abstract: article.abstract,
    datePublished: article.publishedDate,
    author: article.authors.map((a) => ({
      "@type": "Person",
      name: a.name,
      affiliation: {
        "@type": "Organization",
        name: a.affiliation,
      },
    })),
    publisher: {
      "@type": "Organization",
      name: journalInfo.publisher,
      url: journalInfo.mainWebsiteUrl,
    },
    isPartOf: {
      "@type": "PublicationIssue",
      issueNumber: article.issue,
      isPartOf: {
        "@type": "PublicationVolume",
        volumeNumber: article.volume,
        isPartOf: {
          "@type": "Periodical",
          name: journalInfo.name,
          issn: journalInfo.issn,
          publisher: {
            "@type": "Organization",
            name: journalInfo.publisher,
          },
        },
      },
    },
    pageStart: article.pageStart,
    pageEnd: article.pageEnd,
    url: `${journalInfo.websiteUrl}/articles/${article.slug}`,
    mainEntityOfPage: `${journalInfo.websiteUrl}/articles/${article.slug}`,
    keywords: article.keywords,
    ...(article.doi ? { identifier: { "@type": "PropertyValue", propertyID: "DOI", value: article.doi } } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [article, journalInfo] = await Promise.all([
    getPublishedArticleBySlug(slug),
    getJournalInfo(),
  ]);

  if (!article) {
    notFound();
  }

  const apaStr = generateCitationAPA(article, journalInfo);
  const mlaStr = generateCitationMLA(article, journalInfo);
  const articleUrl = `${journalInfo.websiteUrl}/articles/${article.slug}`;
  const shareHref = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(articleUrl)}`;

  return (
    <>
      <ArticleJsonLd article={article} journalInfo={journalInfo} />

      {/* Header / Title Section */}
      <div className="border-b border-border bg-primary text-primary-foreground py-14 md:py-20">
         <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
               <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
                  <Badge className="rounded-full border-0 bg-secondary/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary-foreground">
                      {article.type}
                  </Badge>
                  <span className="text-sm text-primary-foreground/70">Vol {article.volume}, Issue {article.issue}</span>
                  <span className="w-1 h-1 bg-primary-foreground/50 rounded-full"></span>
                  <span className="flex items-center gap-1 text-sm text-primary-foreground/70">
                      <Calendar className="h-3.5 w-3.5" /> {article.date}
                  </span>
               </div>
               
               <h1 className="journal-title mb-7 text-3xl leading-[1.12] text-primary-foreground md:text-[3.5rem]">
                  {article.title}
               </h1>

               <div className="mb-7 space-y-2">
                  {article.authors.map((author, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[15px] text-primary-foreground/82">
                          <User className="h-3.5 w-3.5" />
                          <span className="font-medium text-primary-foreground">{author.name}</span>
                          <span className="text-primary-foreground/60">— {author.affiliation}, {author.country}</span>
                          {author.isCorresponding && (
                            <span className="ml-1 text-[hsl(var(--highlight))] text-xs">✉ Corresponding</span>
                          )}
                      </div>
                  ))}
               </div>

               {article.doi && (
                 <p className="mb-6 text-sm text-primary-foreground/60">
                   DOI:{" "}
                   <span className="font-mono text-xs text-[hsl(var(--highlight))]">{article.doi}</span>
                 </p>
               )}

               <div className="flex flex-wrap gap-3">
                  {article.pdfUrl ? (
                    <Button asChild className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" /> Download PDF
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="gap-2 bg-secondary text-secondary-foreground">
                      <Download className="h-4 w-4" /> PDF Unavailable
                    </Button>
                  )}
                  <Button asChild variant="outline" className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-white/10">
                    <a href="#citation-formats">
                      <Quote className="h-4 w-4" /> Cite
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="icon" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10">
                    <a href={shareHref}>
                      <Share2 className="h-4 w-4" />
                    </a>
                  </Button>
               </div>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              
              {/* Main Content */}
              <article className="lg:col-span-2 space-y-10">
                  {/* Abstract */}
                  <div className="journal-shell p-8">
                      <h2 className="journal-heading mb-4 flex items-center gap-2 text-[1.45rem] font-bold">
                        <BookOpen className="h-5 w-5 text-secondary" />
                        Abstract
                      </h2>
                      <p className="journal-body max-w-none">
                          {article.abstract}
                      </p>
                  </div>

                  {/* Keywords */}
                  {article.keywords.length > 0 && (
                    <div>
                      <h3 className="journal-kicker mb-3">Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {article.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="rounded-full bg-[hsl(var(--highlight)/0.12)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[hsl(var(--highlight))]"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Full text placeholder */}
                  <div className="journal-shell p-8 text-center">
                    <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <h3 className="journal-heading mb-2 text-xl font-bold">Full Article</h3>
                    <p className="mx-auto mb-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
                      {article.pdfUrl
                        ? "The full text of this article is available in PDF format."
                        : "A downloadable PDF has not been attached to this article yet."}
                    </p>
                    {article.pdfUrl ? (
                      <Button asChild className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                        <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" /> Download PDF
                        </a>
                      </Button>
                    ) : (
                      <Button disabled className="gap-2 bg-secondary text-secondary-foreground">
                        <Download className="h-4 w-4" /> PDF Unavailable
                      </Button>
                    )}
                  </div>

                  {/* References */}
                  {article.references && article.references.length > 0 && (
                    <div>
                      <h3 className="journal-heading mb-4 text-xl font-bold">References</h3>
                      <ol className="list-decimal space-y-4 pl-5 text-[15px] leading-8 text-[hsl(var(--ink-soft))]">
                        {article.references.map((ref, idx) => (
                          <li key={idx}>
                            {ref.text}
                            {ref.doi && (
                              <a
                                href={`https://doi.org/${ref.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-1 text-secondary hover:underline"
                              >
                                [{ref.doi}]
                              </a>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Citation Formats */}
                  <div id="citation-formats" className="border-t border-border pt-8">
                    <h3 className="journal-heading mb-4 text-xl font-bold">How to Cite</h3>
                    <div className="space-y-4">
                      <div className="journal-panel p-4">
                        <span className="journal-kicker mb-2 block tracking-[0.18em]">APA</span>
                        <p className="text-sm text-muted-foreground font-mono leading-relaxed wrap-break-word">
                          {apaStr}
                        </p>
                      </div>
                      <div className="journal-panel p-4">
                        <span className="journal-kicker mb-2 block tracking-[0.18em]">MLA</span>
                        <p className="text-sm text-muted-foreground font-mono leading-relaxed wrap-break-word">
                          {mlaStr}
                        </p>
                      </div>
                    </div>
                  </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-8">
                  <div className="journal-shell sticky top-24 p-6">
                      <h3 className="journal-heading mb-4 text-xl font-bold">Article Info</h3>
                      <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center border-b border-border/50 pb-2">
                              <span className="text-muted-foreground">Type</span>
                              <span className="font-medium">{article.type}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-border/50 pb-2">
                              <span className="text-muted-foreground">Published</span>
                              <span className="font-medium">{article.date}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-border/50 pb-2">
                              <span className="text-muted-foreground">Volume</span>
                              <span className="font-medium">{article.volume}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-border/50 pb-2">
                              <span className="text-muted-foreground">Issue</span>
                              <span className="font-medium">{article.issue}</span>
                          </div>
                          {article.pageStart && article.pageEnd && (
                            <div className="flex justify-between items-center border-b border-border/50 pb-2">
                              <span className="text-muted-foreground">Pages</span>
                              <span className="font-medium">{article.pageStart}–{article.pageEnd}</span>
                            </div>
                          )}
                          {article.doi && (
                            <div className="flex justify-between items-center pt-1">
                              <span className="text-muted-foreground">DOI</span>
                              <span className="font-medium text-secondary text-xs font-mono">{article.doi}</span>
                            </div>
                          )}
                      </div>

                      <div className="mt-8">
                        <h4 className="journal-kicker mb-3 tracking-[0.18em]">Authors</h4>
                        <ul className="space-y-3">
                          {article.authors.map((a, idx) => (
                            <li key={idx} className="text-sm">
                              <span className="font-medium text-foreground block">{a.name}</span>
                              <span className="text-xs text-muted-foreground">{a.affiliation}, {a.country}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                  </div>
              </aside>

          </div>
      </div>
    </>
  );
}
