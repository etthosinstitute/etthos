import { PageHeader } from "@/components/PageHeader";
import { ArticleCard } from "@/components/ArticleCard";
import { getJournalInfo, getPublishedIssueBySlug } from "@/features/public-site/queries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [result, journalInfo] = await Promise.all([
    getPublishedIssueBySlug(slug),
    getJournalInfo(),
  ]);
  const issue = result?.issue;
  if (!issue) return {};
  return {
    title: `Volume ${issue.volume}, Issue ${issue.issue} — ${issue.month} ${issue.year}`,
    description: `Browse articles from Volume ${issue.volume}, Issue ${issue.issue} of the ${journalInfo.name}, published ${issue.month} ${issue.year}.`,
  };
}

export default async function IssuePage({ params }: PageProps) {
  const { slug } = await params;
  const [result, journalInfo] = await Promise.all([
    getPublishedIssueBySlug(slug),
    getJournalInfo(),
  ]);
  const issue = result?.issue;
  const issueArticles = result?.articles || [];

  if (!issue) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={`Volume ${issue.volume}, Issue ${issue.issue}`}
        description={`${issue.title ? issue.title + " — " : ""}${issue.month} ${issue.year} | ${journalInfo.name}`}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Issue Info */}
          <div className="journal-shell mb-12 flex flex-wrap items-center justify-between gap-6 p-7">
            <div>
              <span className="journal-kicker mb-2 block tracking-[0.24em]">
                {journalInfo.name}
              </span>
              <span className="text-[15px] text-[hsl(var(--ink-soft))]">
                Volume {issue.volume}, Issue {issue.issue} — {issue.month} {issue.year}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium">
                {issueArticles.length} Articles
              </span>
            </div>
          </div>

          {/* Articles */}
          <h2 className="journal-heading mb-8 text-2xl font-bold md:text-[2rem]">
            Articles in this Issue
          </h2>
          
          <div className="space-y-6">
            {issueArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {issueArticles.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p>No articles found for this issue.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
