import { PrismaClient } from "@repo/database";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating Editor name in database...");

  const user = await prisma.user.findUnique({
    where: { email: "editor@journal.com" },
  });

  if (!user) {
    console.log(
      "No editor account with email 'editor@journal.com' found in database.",
    );
    return;
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      firstName: "Dr.",
      lastName: "Priyanka",
    },
  });

  console.log(
    `Successfully updated editor name to: ${updated.firstName} ${updated.lastName}`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
