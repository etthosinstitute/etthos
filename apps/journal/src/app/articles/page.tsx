import { PageHeader } from "@/components/PageHeader";
import { ArticleCard } from "@/components/ArticleCard";
import { articles, journalInfo } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Articles",
  description: `Browse all articles published in the ${journalInfo.name}.`,
};

export default function ArticlesPage() {
  return (
    <>
      <PageHeader
        title="All Articles"
        description={`Browse all published articles in the ${journalInfo.name}.`}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p>No articles published yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
