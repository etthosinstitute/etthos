import { PageHeader } from "@/components/PageHeader";
import { ArticleCard } from "@/components/ArticleCard";
import { getJournalInfo, getPublishedArticles } from "@/features/public-site/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Articles",
  description: "Browse all published articles in the Etthos Journal of Psychology.",
};

export default async function ArticlesPage() {
  const [articles, journalInfo] = await Promise.all([
    getPublishedArticles(),
    getJournalInfo(),
  ]);

  return (
    <>
      <PageHeader
        title="All Articles"
        description={`Browse all published articles in the ${journalInfo.name}.`}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <p className="journal-kicker mb-3">Research Archive</p>
            <h2 className="journal-heading text-3xl font-bold md:text-[2.35rem]">Published scholarship across issues and themes</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
