import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import { issues, journalInfo } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issues Archive",
  description: "Browse all published volumes and issues of the Etthos Journal of Psychology.",
};

// Group issues by year
function groupByYear(issueList: typeof issues) {
  const grouped: Record<number, typeof issues> = {};
  for (const issue of issueList) {
    if (!grouped[issue.year]) grouped[issue.year] = [];
    grouped[issue.year]!.push(issue);
  }
  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year: Number(year), issues: items }));
}

export default function IssuesPage() {
  const grouped = groupByYear(issues);

  return (
    <>
      <PageHeader
        title="Issues Archive"
        description={`Browse all published volumes and issues of the ${journalInfo.name}.`}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {grouped.map((yearGroup) => (
            <section key={yearGroup.year}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl font-serif font-bold text-primary">{yearGroup.year}</h2>
                <div className="h-px bg-border flex-1"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {yearGroup.issues.map((issue) => (
                  <Link
                    key={issue.slug}
                    href={`/issues/${issue.slug}`}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow group block"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                          Volume {issue.volume}
                        </span>
                        <h3 className="font-serif font-bold text-xl text-primary group-hover:text-secondary transition-colors">
                          Issue {issue.issue}
                        </h3>
                      </div>
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                    </div>
                    {issue.title && (
                      <p className="text-sm font-medium text-foreground mb-2">{issue.title}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Calendar className="h-3.5 w-3.5" />
                      {issue.month} {issue.year}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
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
              <h3 className="font-serif font-bold text-xl text-primary mb-2">No Issues Published Yet</h3>
              <p className="text-muted-foreground text-sm">The first issue is currently in preparation.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
