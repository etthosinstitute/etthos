import { PrismaClient } from "@repo/database";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  const sqlPath = path.join(__dirname, "sync-production-content.sql");
  console.log("Reading SQL from:", sqlPath);
  const sql = fs.readFileSync(sqlPath, "utf-8");

  console.log("Executing SQL...");
  // Split statements by semicolon if needed, but since it has a transaction block,
  // we can try executing it as a single block or statement.
  // PostgreSQL handles BEGIN...COMMIT in a single execution raw block.
  await prisma.$executeRawUnsafe(sql);
  console.log("SQL executed successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
