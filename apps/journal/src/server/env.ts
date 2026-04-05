import { z } from "zod";

const baseSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  APP_URL: z.string().url().optional(),
  EMAIL_HOST: z.string().default("smtp.gmail.com"),
  EMAIL_PORT: z.coerce.number().int().positive().default(465),
  EMAIL_SECURE: z
    .string()
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;
      return value === "true";
    }),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASS: z.string().optional(),
  REVIEW_INBOX_EMAIL: z.string().email().optional(),
  CONTACT_INBOX_EMAIL: z.string().email().optional(),
  UPLOAD_DIR: z.string().optional(),
  MAX_UPLOAD_MB: z.coerce.number().positive().default(10),
});

const parsed = baseSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  throw new Error(`Invalid journal environment configuration: ${issues}`);
}

export const env = {
  ...parsed.data,
  EMAIL_SECURE:
    parsed.data.EMAIL_SECURE !== undefined
      ? parsed.data.EMAIL_SECURE
      : parsed.data.EMAIL_PORT === 465,
  APP_URL: parsed.data.APP_URL || "http://localhost:3000",
  REVIEW_INBOX_EMAIL: parsed.data.REVIEW_INBOX_EMAIL || "spider20251@gmail.com",
  CONTACT_INBOX_EMAIL:
    parsed.data.CONTACT_INBOX_EMAIL ||
    parsed.data.REVIEW_INBOX_EMAIL ||
    "spider20251@gmail.com",
};

export function isProduction() {
  return env.NODE_ENV === "production";
}
