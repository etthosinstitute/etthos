import { PrismaClient } from "@repo/database";
import { slugify } from "../src/shared/utils";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Volume 1, Issue 1...");

  // 1. Get or create journal
  let journal = await prisma.journal.findFirst({
    where: { isActive: true },
  });

  if (!journal) {
    console.log("No active journal found, creating journal-singleton...");
    journal = await prisma.journal.create({
      data: {
        id: "journal-singleton",
        name: "Etthos Journal of Health, Behavior and Applied Psychology",
        shortName: "EJHBAP",
        publisher:
          "Etthos Institute of Behavioral Research and Training Pvt Ltd.",
        publisherAddress: "A/107, Sardar Patel Nagar, Mahuli",
        publisherCity: "Patna",
        publisherState: "Bihar",
        publisherCountry: "India",
        publisherZip: "804453",
        contactEmail: "info@etthos.com",
      },
    });
  }

  // 2. Create Volume 1
  const volume = await prisma.volume.upsert({
    where: {
      journalId_number: {
        journalId: journal.id,
        number: 1,
      },
    },
    update: {},
    create: {
      journalId: journal.id,
      number: 1,
      year: 2026,
      description: "Volume 1 (2026)",
    },
  });

  // 3. Create Issue 1
  const issue = await prisma.issue.upsert({
    where: {
      volumeId_number: {
        volumeId: volume.id,
        number: 1,
      },
    },
    update: {
      published: true,
      publishedDate: new Date(),
    },
    create: {
      volumeId: volume.id,
      number: 1,
      title: "Inaugural Issue",
      description: "Welcome to the first official issue of the journal.",
      published: true,
      publishedDate: new Date(),
    },
  });

  // 4. Fetch manuscripts
  const manuscripts = await prisma.manuscript.findMany({
    include: { author: true },
  });

  console.log(`Found ${manuscripts.length} manuscripts to link.`);

  for (const manuscript of manuscripts) {
    // Check if already has an article
    if (manuscript.publishedArticleId) {
      console.log(`Manuscript "${manuscript.title}" already published.`);
      continue;
    }

    const baseSlug = slugify(manuscript.title) || "article";
    let slug = baseSlug;
    let counter = 2;
    while (await prisma.article.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    console.log(`Publishing "${manuscript.title}" with slug: ${slug}`);

    // Create public Author record
    const author = await prisma.author.upsert({
      where: { email: manuscript.author.email },
      update: {},
      create: {
        firstName: manuscript.author.firstName || "Dr.",
        lastName: manuscript.author.lastName || "Priyanka",
        email: manuscript.author.email,
      },
    });

    // Create Article
    const article = await prisma.article.create({
      data: {
        title: manuscript.title,
        slug,
        abstract: manuscript.abstract || "Abstract of the study.",
        type: "RESEARCH_ARTICLE",
        published: true,
        publishedDate: new Date(),
        submittedDate: manuscript.submittedAt,
        acceptedDate: new Date(),
        issueId: issue.id,
        pdfUrl: manuscript.fileUrl,
        authors: {
          create: {
            authorId: author.id,
            order: 1,
            isCorresponding: true,
            correspondingEmail: manuscript.author.email,
          },
        },
        keywords: {
          create: manuscript.keywords.map((kw) => ({
            keyword: {
              connectOrCreate: {
                where: { name: kw },
                create: { name: kw },
              },
            },
          })),
        },
      },
    });

    // Link Manuscript to Article and Issue
    await prisma.manuscript.update({
      where: { id: manuscript.id },
      data: {
        status: "PUBLISHED",
        issueId: issue.id,
        publishedArticleId: article.id,
      },
    });
  }

  console.log("Successfully populated Volume 1, Issue 1!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
