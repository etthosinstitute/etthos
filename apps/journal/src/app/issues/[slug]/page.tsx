import { PageHeader } from "@/components/PageHeader";
import { ArticleCard } from "@/components/ArticleCard";
import { issues, articles, journalInfo } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = issues.find((i) => i.slug === slug);
  if (!issue) return {};
  return {
    title: `Volume ${issue.volume}, Issue ${issue.issue} — ${issue.month} ${issue.year}`,
    description: `Browse articles from Volume ${issue.volume}, Issue ${issue.issue} of the ${journalInfo.name}, published ${issue.month} ${issue.year}.`,
  };
}

export default async function IssuePage({ params }: PageProps) {
  const { slug } = await params;
  const issue = issues.find((i) => i.slug === slug);

  if (!issue) {
    notFound();
  }

  // Filter articles for this issue
  const issueArticles = articles.filter(
    (a) => a.volume === issue.volume && a.issue === issue.issue
  );

  return (
    <>
      <PageHeader
        title={`Volume ${issue.volume}, Issue ${issue.issue}`}
        description={`${issue.title ? issue.title + " — " : ""}${issue.month} ${issue.year} | ${journalInfo.name}`}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Issue Info */}
          <div className="bg-card border border-border rounded-lg p-6 mb-12 flex flex-wrap gap-6 items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary block mb-1">
                {journalInfo.name}
              </span>
              <span className="text-sm text-muted-foreground">
                Volume {issue.volume}, Issue {issue.issue} — {issue.month} {issue.year}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="bg-muted px-3 py-1 rounded-full text-xs font-medium">
                {issueArticles.length} Articles
              </span>
            </div>
          </div>

          {/* Articles */}
          <h2 className="font-serif font-bold text-2xl mb-8 text-primary">
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
