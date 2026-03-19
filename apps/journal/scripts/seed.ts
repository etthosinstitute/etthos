
import { PrismaClient } from '@repo/database';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Admin/Editor
  const editorEmail = 'editor@journal.com';
  let editor = await prisma.user.findUnique({ where: { email: editorEmail } });

  if (!editor) {
    // Note: In real app, password should be hashed. For seed/dev, we might use a simple string if reusing the same hashing logic is hard here without importing bcrypt (which might be ESM issue).
    // However, our Auth route hashes passwords.
    // For simplicity in this script, we'll assume we can use a raw string if we are just testing, 
    // BUT the login route compares bcrypt.hash.
    // So we MUST hash it. 
    // Since we are in a script, let's just create the user via the API or specific hash if possible.
    // Or just create a dummy "hashed" string that won't work for login but works for author linking.
    // OR we can import bcryptjs.
    
    // We will just create the user record for linking manuscripts. Login might happen via signup in verify script.
    console.log('Creating Editor user...');
    editor = await prisma.user.create({
      data: {
        email: editorEmail,
        password: '$2a$10$YourHashedPasswordHereOrJustRandom', // Placeholder
        firstName: 'Sarah',
        lastName: 'Mitchell',
        role: 'EDITOR',
      },
    });
  }

  // 2. Create Published Manuscripts (Articles)
  const articles = [
    {
      title: "Quantum Entanglement in Macroscopic Systems: A New Perspective",
      abstract: "This paper explores recent advancements in observing quantum entanglement at macroscopic scales, challenging traditional boundaries between quantum and classical mechanics. We propose a new experimental framework for detecting entanglement in biological systems...",
      status: "PUBLISHED",
      fileUrl: "https://arxiv.org/pdf/quant-ph/0000000.pdf",
    },
    {
      title: "Sustainable Urban Planning: AI-Driven Models for Smart Cities",
      abstract: "Urbanization poses significant challenges to sustainability. This study presents an AI-driven model that optimizes energy consumption and traffic flow in smart cities, utilizing real-time data from IoT sensors to predict and mitigate congestion...",
      status: "PUBLISHED",
      fileUrl: "https://example.com/urban-planning.pdf",
    },
    {
      title: "CRISPR-Cas9 Applications in Neurodegenerative Diseases",
      abstract: "The potential of CRISPR-Cas9 gene editing technology in treating neurodegenerative diseases such as Alzheimer's and Parkinson's is reviewed. We discuss current clinical trials, ethical considerations, and future directions for therapeutic interventions...",
      status: "PUBLISHED",
      fileUrl: "https://example.com/crispr.pdf",
    },
    {
      title: "Economic Impacts of Global Climate Change Policies",
      abstract: "An analysis of the economic repercussions of recent global climate change policies. This paper evaluates the trade-offs between economic growth and environmental sustainability, proposing a balanced approach for developing nations...",
      status: "PUBLISHED",
      fileUrl: "https://example.com/climate-economy.pdf",
    },
     {
      title: "Machine Learning in Early Detection of Melanoma",
      abstract: "We present a convolutional neural network approach for the early detection of melanoma from dermoscopic images. The model achieves 98% accuracy in validation sets, outperforming traditional diagnostic methods...",
      status: "PUBLISHED",
      fileUrl: "https://example.com/melanoma-ml.pdf",
    },
  ];

  for (const article of articles) {
    const existing = await prisma.manuscript.findFirst({
        where: { title: article.title }
    });

    if (!existing) {
        console.log(`Creating article: ${article.title}`);
        await prisma.manuscript.create({
            data: {
                ...article,
                authorId: editor.id,
                // We cast status to any because the enum might be strictly typed in generated client
                status: article.status as any 
            }
        });
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
