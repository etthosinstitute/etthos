import { PrismaClient } from "@repo/database";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const editorPassword = await hash("Editor@123", 10);
  const reviewerPassword = await hash("Reviewer@123", 10);

  // 1. Create Editor
  const editorEmail = "editor@journal.com";
  const existingEditor = await prisma.user.findUnique({
    where: { email: editorEmail },
  });
  const editor = existingEditor
    ? await prisma.user.update({
        where: { email: editorEmail },
        data: {
          password: editorPassword,
          firstName: "Dr.",
          lastName: "Priyanka",
          role: "EDITOR",
          isActive: true,
        },
      })
    : await prisma.user.create({
        data: {
          email: editorEmail,
          password: editorPassword,
          firstName: "Dr.",
          lastName: "Priyanka",
          role: "EDITOR",
          isActive: true,
        },
      });

  const reviewerEmail = "reviewer@journal.com";
  const existingReviewer = await prisma.user.findUnique({
    where: { email: reviewerEmail },
  });
  const reviewer = existingReviewer
    ? await prisma.user.update({
        where: { email: reviewerEmail },
        data: {
          password: reviewerPassword,
          firstName: "Aarav",
          lastName: "Khanna",
          role: "REVIEWER",
          isActive: true,
        },
      })
    : await prisma.user.create({
        data: {
          email: reviewerEmail,
          password: reviewerPassword,
          firstName: "Aarav",
          lastName: "Khanna",
          role: "REVIEWER",
          isActive: true,
        },
      });

  console.log(`Editor ready: ${editor.email}`);
  console.log(`Reviewer ready: ${reviewer.email}`);

  // 2. Create Published Manuscripts (Articles)
  const articles = [
    {
      title: "Quantum Entanglement in Macroscopic Systems: A New Perspective",
      abstract:
        "This paper explores recent advancements in observing quantum entanglement at macroscopic scales, challenging traditional boundaries between quantum and classical mechanics. We propose a new experimental framework for detecting entanglement in biological systems...",
      status: "PUBLISHED" as const,
      fileUrl: "https://arxiv.org/pdf/quant-ph/0000000.pdf",
      keywords: ["quantum", "systems", "research"],
    },
    {
      title: "Sustainable Urban Planning: AI-Driven Models for Smart Cities",
      abstract:
        "Urbanization poses significant challenges to sustainability. This study presents an AI-driven model that optimizes energy consumption and traffic flow in smart cities, utilizing real-time data from IoT sensors to predict and mitigate congestion...",
      status: "PUBLISHED" as const,
      fileUrl: "https://example.com/urban-planning.pdf",
      keywords: ["urban planning", "ai", "smart cities"],
    },
    {
      title: "CRISPR-Cas9 Applications in Neurodegenerative Diseases",
      abstract:
        "The potential of CRISPR-Cas9 gene editing technology in treating neurodegenerative diseases such as Alzheimer's and Parkinson's is reviewed. We discuss current clinical trials, ethical considerations, and future directions for therapeutic interventions...",
      status: "PUBLISHED" as const,
      fileUrl: "https://example.com/crispr.pdf",
      keywords: ["crispr", "neuroscience", "genetics"],
    },
    {
      title: "Economic Impacts of Global Climate Change Policies",
      abstract:
        "An analysis of the economic repercussions of recent global climate change policies. This paper evaluates the trade-offs between economic growth and environmental sustainability, proposing a balanced approach for developing nations...",
      status: "PUBLISHED" as const,
      fileUrl: "https://example.com/climate-economy.pdf",
      keywords: ["climate", "economics", "policy"],
    },
    {
      title: "Machine Learning in Early Detection of Melanoma",
      abstract:
        "We present a convolutional neural network approach for the early detection of melanoma from dermoscopic images. The model achieves 98% accuracy in validation sets, outperforming traditional diagnostic methods...",
      status: "PUBLISHED" as const,
      fileUrl: "https://example.com/melanoma-ml.pdf",
      keywords: ["machine learning", "melanoma", "medical ai"],
    },
  ];

  for (const article of articles) {
    const existing = await prisma.manuscript.findFirst({
      where: { title: article.title },
    });

    if (!existing) {
      console.log(`Creating article: ${article.title}`);
      await prisma.manuscript.create({
        data: {
          ...article,
          authorId: editor.id,
          status: article.status,
        },
      });
    }
  }

  console.log("Seeding complete.");
  console.log("Login credentials:");
  console.log("  Editor: editor@journal.com / Editor@123");
  console.log("  Reviewer: reviewer@journal.com / Reviewer@123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
