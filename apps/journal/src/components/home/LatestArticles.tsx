import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { articles } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function LatestArticles() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-serif font-bold text-3xl mb-2 text-primary">Latest Articles</h2>
            <p className="text-muted-foreground">Browse the most recent research published in the Etthos Journal of Psychology.</p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex gap-2 text-secondary hover:text-secondary/80">
            <Link href="/issues">
              View All Issues <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.slice(0, 4).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
           <Button asChild variant="outline" className="w-full">
            <Link href="/issues">
              View All Issues
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
