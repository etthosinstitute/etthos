import { PrismaClient } from "@repo/database";

const prisma = new PrismaClient();

async function main() {
  console.log(
    "Cleaning up seeded volumes, issues, and articles from the database...",
  );

  // Reset manuscripts back to SUBMITTED status and detach issue/articles
  await prisma.manuscript.updateMany({
    data: {
      status: "SUBMITTED",
      issueId: null,
      publishedArticleId: null,
    },
  });

  // Delete all Articles (this will cascade delete authors, keywords, etc.)
  const deletedArticles = await prisma.article.deleteMany({});
  console.log(`Deleted ${deletedArticles.count} articles.`);

  // Delete all Issues
  const deletedIssues = await prisma.issue.deleteMany({});
  console.log(`Deleted ${deletedIssues.count} issues.`);

  // Delete all Volumes
  const deletedVolumes = await prisma.volume.deleteMany({});
  console.log(`Deleted ${deletedVolumes.count} volumes.`);

  console.log("Database clean-up complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
