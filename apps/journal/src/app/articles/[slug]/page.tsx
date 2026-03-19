import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { articles, journalInfo } from "@/lib/data";
import { Calendar, Download, Quote, Share2, User, BookOpen, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
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
      url: `https://journal.etthos.com/articles/${article.slug}`,
    },
    other: {
      "citation_title": article.title,
      "citation_author": article.authors.map((a) => a.name).join("; "),
      "citation_publication_date": article.publishedDate,
      "citation_journal_title": journalInfo.name,
      "citation_volume": String(article.volume),
      "citation_issue": String(article.issue),
      "citation_doi": article.doi,
      "citation_pdf_url": article.pdfUrl || "",
      "citation_publisher": journalInfo.publisher,
      "citation_language": "en",
      ...(article.pageStart ? { "citation_firstpage": String(article.pageStart) } : {}),
      ...(article.pageEnd ? { "citation_lastpage": String(article.pageEnd) } : {}),
    },
  };
}

function generateCitationAPA(article: typeof articles[0]): string {
  const authorStr = article.authors
    .map((a) => {
      const parts = a.name.replace(/^(Dr\.|Prof\.)\s*/i, "").split(" ");
      const last = parts[parts.length - 1];
      const initials = parts.slice(0, -1).map((p) => p[0] + ".").join(" ");
      return `${last}, ${initials}`;
    })
    .join(", ");
  return `${authorStr} (${new Date(article.publishedDate).getFullYear()}). ${article.title}. ${journalInfo.name}, ${article.volume}(${article.issue}), ${article.pageStart || ""}–${article.pageEnd || ""}. https://doi.org/${article.doi}`;
}

function generateCitationMLA(article: typeof articles[0]): string {
  const authorStr = article.authors.map((a) => a.name.replace(/^(Dr\.|Prof\.)\s*/i, "")).join(", ");
  return `${authorStr}. "${article.title}." ${journalInfo.name}, vol. ${article.volume}, no. ${article.issue}, ${new Date(article.publishedDate).getFullYear()}, pp. ${article.pageStart || ""}–${article.pageEnd || ""}. DOI: ${article.doi}.`;
}

function ArticleJsonLd({ article }: { article: typeof articles[0] }) {
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
    url: `https://journal.etthos.com/articles/${article.slug}`,
    mainEntityOfPage: `https://journal.etthos.com/articles/${article.slug}`,
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
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const apaStr = generateCitationAPA(article);
  const mlaStr = generateCitationMLA(article);

  return (
    <>
      <ArticleJsonLd article={article} />

      {/* Header / Title Section */}
      <div className="bg-primary text-primary-foreground py-12 md:py-16">
         <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
               <div className="flex flex-wrap gap-3 mb-4 text-sm items-center">
                  <Badge className="bg-secondary text-secondary-foreground rounded-sm border-0">
                      {article.type}
                  </Badge>
                  <span className="text-primary-foreground/70">Vol {article.volume}, Issue {article.issue}</span>
                  <span className="w-1 h-1 bg-primary-foreground/50 rounded-full"></span>
                  <span className="flex items-center gap-1 text-primary-foreground/70">
                      <Calendar className="h-3.5 w-3.5" /> {article.date}
                  </span>
               </div>
               
               <h1 className="font-serif font-bold text-3xl md:text-5xl mb-6 leading-tight">
                  {article.title}
               </h1>

               <div className="space-y-2 mb-6">
                  {article.authors.map((author, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                          <User className="h-3.5 w-3.5" />
                          <span className="font-medium text-primary-foreground">{author.name}</span>
                          <span className="text-primary-foreground/60">— {author.affiliation}, {author.country}</span>
                          {author.isCorresponding && (
                            <span className="text-highlight text-xs ml-1">✉ Corresponding</span>
                          )}
                      </div>
                  ))}
               </div>

               {article.doi && (
                 <p className="text-sm text-primary-foreground/60 mb-6">
                   DOI:{" "}
                   <span className="text-highlight font-mono text-xs">{article.doi}</span>
                 </p>
               )}

               <div className="flex flex-wrap gap-3">
                  <Button className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      <Download className="h-4 w-4" /> Download PDF
                  </Button>
                  <Button variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-white/10 bg-transparent">
                      <Quote className="h-4 w-4" /> Cite
                  </Button>
                   <Button variant="ghost" size="icon" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10">
                      <Share2 className="h-4 w-4" />
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
                  <div className="bg-muted/50 p-6 rounded-lg border border-border">
                      <h2 className="font-serif font-bold text-lg mb-3 text-primary flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-secondary" />
                        Abstract
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                          {article.abstract}
                      </p>
                  </div>

                  {/* Keywords */}
                  {article.keywords.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm text-primary mb-3">Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {article.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Full text placeholder */}
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-serif font-bold text-lg text-primary mb-2">Full Article</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      The full text of this article is available in PDF format.
                    </p>
                    <Button className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      <Download className="h-4 w-4" /> Download PDF
                    </Button>
                  </div>

                  {/* References */}
                  {article.references && article.references.length > 0 && (
                    <div>
                      <h3 className="font-serif font-bold text-lg text-primary mb-4">References</h3>
                      <ol className="list-decimal pl-5 space-y-3 text-sm text-muted-foreground">
                        {article.references.map((ref, idx) => (
                          <li key={idx} className="leading-relaxed">
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
                  <div className="border-t border-border pt-8">
                    <h3 className="font-serif font-bold text-lg text-primary mb-4">How to Cite</h3>
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg border border-border">
                        <span className="text-xs font-semibold uppercase tracking-wider text-secondary block mb-2">APA</span>
                        <p className="text-sm text-muted-foreground font-mono leading-relaxed break-words">
                          {apaStr}
                        </p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg border border-border">
                        <span className="text-xs font-semibold uppercase tracking-wider text-secondary block mb-2">MLA</span>
                        <p className="text-sm text-muted-foreground font-mono leading-relaxed break-words">
                          {mlaStr}
                        </p>
                      </div>
                    </div>
                  </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-8">
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm sticky top-24">
                      <h3 className="font-serif font-bold text-lg mb-4 text-primary">Article Info</h3>
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
                          <div className="flex justify-between items-center pt-1">
                              <span className="text-muted-foreground">DOI</span>
                              <span className="font-medium text-secondary text-xs font-mono">{article.doi}</span>
                          </div>
                      </div>

                      <div className="mt-8">
                        <h4 className="font-medium text-sm mb-3">Authors</h4>
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
