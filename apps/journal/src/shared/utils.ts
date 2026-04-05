import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextResponse } from "next/server";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Joins first and last name, falling back to a provided string.
 */
export function fullName(
  first?: string | null,
  last?: string | null,
  fallback = "Unknown"
): string {
  return [first, last].filter(Boolean).join(" ") || fallback;
}

export function formatPersonName(person?: {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
} | null) {
  return fullName(person?.firstName, person?.lastName, person?.email || "Unknown");
}

export function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

/**
 * Shared API route error handler — returns the correct NextResponse for
 * ZodErrors (400) and all other errors (500).
 */
export function handleRouteError(error: unknown): NextResponse {
  console.error(error);
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: error.issues[0]?.message || "Invalid request payload",
        issues: error.issues,
      },
      { status: 400 }
    );
  }
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
