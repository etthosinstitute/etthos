import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { env } from "@/server/env";

const ALLOWED_FILE_TYPES = new Map<string, string>([
  ["application/pdf", ".pdf"],
  ["application/msword", ".doc"],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".docx",
  ],
]);

function sanitizeBaseName(fileName: string) {
  return fileName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function getUploadRoot() {
  return env.UPLOAD_DIR
    ? path.resolve(env.UPLOAD_DIR)
    : path.join(process.cwd(), "public", "uploads", "manuscripts");
}

export async function saveManuscriptFile(file: File) {
  const extension =
    ALLOWED_FILE_TYPES.get(file.type) ||
    path.extname(file.name || "").toLowerCase();

  if (!extension || ![".pdf", ".doc", ".docx"].includes(extension)) {
    throw new Error("Only PDF, DOC, and DOCX files are allowed");
  }

  const maxBytes = env.MAX_UPLOAD_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`File size must be ${env.MAX_UPLOAD_MB}MB or less`);
  }

  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const folder = path.join(getUploadRoot(), year, month);
  await mkdir(folder, { recursive: true });

  const safeName = sanitizeBaseName(file.name || "manuscript");
  const fileName = `${safeName || "manuscript"}-${randomUUID()}${extension}`;
  const absolutePath = path.join(folder, fileName);
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(absolutePath, bytes);

  const relativeUrl = `/uploads/manuscripts/${year}/${month}/${fileName}`;

  return {
    fileName,
    originalName: file.name,
    fileSize: file.size,
    mimeType: file.type,
    url: relativeUrl,
  };
}
