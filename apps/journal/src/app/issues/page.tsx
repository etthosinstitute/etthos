import { PageHeader } from "@/components/PageHeader";
import { PaginationNav } from "@/components/PaginationNav";
import { Calendar, FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import type { PublicIssue } from "@/features/public-site/queries";
import { getJournalInfo, getPublishedIssuesPage } from "@/features/public-site/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issues Archive",
  description: "Browse all published volumes and issues of the Etthos Journal of Health, Behavior and Applied Psychology.",
};

interface IssuesPageProps {
  searchParams?: Promise<{ page?: string }>;
}

// Group issues by year
function groupByYear(issueList: PublicIssue[]) {
  const grouped: Record<number, PublicIssue[]> = {};
  for (const issue of issueList) {
    if (!grouped[issue.year]) grouped[issue.year] = [];
    grouped[issue.year]!.push(issue);
  }
  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year: Number(year), issues: items }));
}

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const page = Number.parseInt(resolvedSearchParams?.page || "1", 10);
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;

  const [issuesPage, journalInfo] = await Promise.all([
    getPublishedIssuesPage({ page: safePage, pageSize: 12 }),
    getJournalInfo(),
  ]);
  const issues = issuesPage.items;
  const grouped = groupByYear(issues);

  return (
    <>
      <PageHeader
        title="Issues Archive"
        description={`Browse all published volumes and issues of the ${journalInfo.name}.`}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl space-y-12">
          {grouped.map((yearGroup) => (
            <section key={yearGroup.year}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className="journal-title text-3xl md:text-4xl">{yearGroup.year}</h2>
                <div className="h-px bg-border flex-1"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {yearGroup.issues.map((issue) => (
                  <Link
                    key={issue.slug}
                    href={`/issues/${issue.slug}`}
                    className="group journal-panel block p-6 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/25 hover:shadow-[0_24px_60px_-45px_rgba(19,34,56,0.32)]"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="journal-kicker tracking-[0.2em]">
                          Volume {issue.volume}
                        </span>
                        <h3 className="journal-title mt-2 text-xl group-hover:text-secondary transition-colors">
                          Issue {issue.issue}
                        </h3>
                      </div>
                      <BookOpen className="h-5 w-5 text-[hsl(var(--highlight))]" />
                    </div>
                    {issue.title && (
                      <p className="mb-2 text-[15px] leading-7 text-[hsl(var(--ink-soft))]">{issue.title}</p>
                    )}
                    <div className="journal-meta mb-4 flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      {issue.month} {issue.year}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-muted-foreground">
                        {issue.articleCount} Articles
                      </span>
                      <span className="text-xs text-secondary font-medium group-hover:underline">
                        View Issue →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {issues.length === 0 && (
            <div className="text-center py-16">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="journal-heading mb-2 text-xl font-bold">No Issues Published Yet</h3>
              <p className="text-muted-foreground text-sm">The first issue is currently in preparation.</p>
            </div>
          )}

          <PaginationNav
            basePath="/issues"
            page={issuesPage.page}
            totalPages={issuesPage.totalPages}
          />
        </div>
      </div>
    </>
  );
}
