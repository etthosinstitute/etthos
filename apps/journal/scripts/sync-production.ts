import { PrismaClient } from "@repo/database";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  const sqlPath = path.join(__dirname, "sync-production-content.sql");
  console.log("Reading SQL from:", sqlPath);
  const rawSql = fs.readFileSync(sqlPath, "utf-8");

  // Robust parser to split SQL by semicolons, ignoring semicolons inside single-quoted strings
  const statements: string[] = [];
  let current = "";
  let inString = false;

  for (let i = 0; i < rawSql.length; i++) {
    const char = rawSql[i];
    const nextChar = rawSql[i + 1];

    if (char === "'") {
      if (inString && nextChar === "'") {
        current += "''";
        i++;
      } else {
        inString = !inString;
        current += char;
      }
    } else if (char === ";" && !inString) {
      statements.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    statements.push(current.trim());
  }

  const filteredStatements = statements.filter((statement) => {
    if (!statement) return false;
    const upper = statement.toUpperCase();
    return (
      !upper.startsWith("BEGIN") &&
      !upper.startsWith("COMMIT") &&
      !upper.startsWith("ROLLBACK")
    );
  });

  console.log(`Executing ${filteredStatements.length} SQL statements...`);

  await prisma.$transaction(async (tx) => {
    for (let i = 0; i < filteredStatements.length; i++) {
      const stmt = filteredStatements[i];
      console.log(
        `Executing statement ${i + 1}/${filteredStatements.length}...`,
      );
      await tx.$executeRawUnsafe(stmt);
    }
  });

  console.log("Database successfully seeded with production content!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
