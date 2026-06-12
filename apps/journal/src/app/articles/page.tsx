import { PageHeader } from "@/components/PageHeader";
import { ArticleCard } from "@/components/ArticleCard";
import { PaginationNav } from "@/components/PaginationNav";
import {
  getJournalInfo,
  getPublishedArticlesPage,
} from "@/features/public-site/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Articles",
  description:
    "Browse all published articles in the Etthos Journal of Health, Behavior and Applied Psychology.",
};

interface ArticlesPageProps {
  searchParams?: Promise<{ page?: string }>;
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const page = Number.parseInt(resolvedSearchParams?.page || "1", 10);
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;

  const [articlePage, journalInfo] = await Promise.all([
    getPublishedArticlesPage({ page: safePage, pageSize: 12 }),
    getJournalInfo(),
  ]);
  const articles = articlePage.items;

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
            <h2 className="journal-heading text-3xl font-bold md:text-[2.35rem]">
              Published scholarship across issues and themes
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <PaginationNav
            basePath="/articles"
            page={articlePage.page}
            totalPages={articlePage.totalPages}
          />

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
