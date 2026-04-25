import { PrismaClient } from "@repo/database";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating Journal name in database...");

  const journal = await prisma.journal.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });

  if (!journal) {
    console.log("No active journal found in database to update.");
    return;
  }

  const updated = await prisma.journal.update({
    where: { id: journal.id },
    data: {
      name: "Etthos Journal Of Health, Behavior and Applied Psychology",
      description: "Etthos Journal Of Health, Behavior and Applied Psychology (EJHBAP) is a peer-reviewed, open-access academic journal dedicated to advancing research in psychology and behavioural sciences.",
      publisher: "Etthos Journal Of Health, Behavior and Applied Psychology pvt ltd",
    },
  });

  console.log(`Successfully updated journal name to: ${updated.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
