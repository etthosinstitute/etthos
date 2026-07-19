import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { getPublishedArticles } from "@/features/public-site/queries";
import { ArrowRight } from "lucide-react";

export async function LatestArticles() {
  const articles = await getPublishedArticles(4);

  return (
    <section className="border-t border-border/60 bg-[hsl(var(--paper)/0.46)] py-24">
      <div className="container mx-auto px-4">
        <div className="mb-14 flex items-center justify-between gap-6">
          <div>
            <p className="mb-3 journal-kicker">Current Scholarship</p>
            <h2 className="mb-2 font-serif text-4xl font-semibold text-primary">
              Latest Articles
            </h2>
            <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Browse the most recent research published in the Etthos Journal{" "}
              <span className="lowercase text-[0.9em]">of</span> Health,
              Behavior and Applied Psychology.
            </p>
          </div>
          {articles.length > 0 && (
            <Button
              asChild
              variant="ghost"
              className="hidden gap-2 text-secondary hover:text-secondary/80 md:flex"
            >
              <Link href="/issues">
                View All Issues <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {articles.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-border bg-card p-12 text-center shadow-[0_15px_40px_-32px_rgba(19,34,56,0.3)]">
            <p className="font-serif text-lg italic text-muted-foreground mb-6">
              No articles published yet. EJHBAP is currently open for submissions to its inaugural issue.
            </p>
            <Button asChild variant="outline" className="gap-2 text-secondary border-secondary/20 hover:bg-secondary/5">
              <Link href="/guidelines">
                View Call for Papers <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {articles.slice(0, 4).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <Button asChild variant="outline" className="w-full">
                <Link href="/issues">View All Issues</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
