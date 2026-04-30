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
      name: "Etthos Journal of Health, Behavior and Applied Psychology",
      shortName: "EJHBAP",
      description: "Etthos Journal of Health, Behavior and Applied Psychology (EJHBAP) is a peer-reviewed, open-access academic journal published by Etthos Journal of Health, Behavior and Applied Psychology pvt ltd, dedicated to advancing research across multidisciplinary fields including nutrition, environment, law, and communication.",
      publisher: "Etthos Journal of Health, Behavior and Applied Psychology pvt ltd",
      subjectArea: "Multidisciplinary",
      subjectKeywords: [
        "Dietetics & Applied Nutrition",
        "Environment",
        "Journalism",
        "Law",
        "Liberal Arts",
        "Linguistics",
        "Nursing",
        "Oceanography",
        "Media & Communication",
        "Ayurveda",
        "Yoga Science",
      ],
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
