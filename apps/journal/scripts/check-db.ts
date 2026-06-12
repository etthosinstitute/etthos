import { PrismaClient } from "@repo/database";

const prisma = new PrismaClient();

async function main() {
  const volumes = await prisma.volume.findMany();
  const issues = await prisma.issue.findMany();
  const articles = await prisma.article.findMany();
  const manuscripts = await prisma.manuscript.findMany();
  const journals = await prisma.journal.findMany();

  console.log("Database Stats:");
  console.log("- Journals count:", journals.length);
  if (journals.length > 0) {
    console.log(
      "  Journals:",
      journals.map((j) => ({ id: j.id, name: j.name })),
    );
  }
  console.log("- Volumes count:", volumes.length);
  console.log("- Issues count:", issues.length);
  console.log("- Articles count:", articles.length);
  console.log("- Manuscripts count:", manuscripts.length);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
