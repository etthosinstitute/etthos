import { prisma } from "@repo/database";

export { prisma };

/** Shared user select — id, name, email. */
export const USER_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
} as const;

/** Shared reviewer select — includes role. */
export const REVIEWER_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  isReviewer: true,
} as const;

/** Shared manuscript include block used by dashboard and manuscripts routes. */
export const MANUSCRIPT_INCLUDE = {
  author: { select: USER_SELECT },
  assignments: {
    include: {
      reviewer: { select: REVIEWER_SELECT },
      editor: { select: USER_SELECT },
      review: {
        select: {
          id: true,
          decision: true,
          createdAt: true,
        },
      },
    },
    orderBy: { invitedAt: "desc" as const },
  },
  reviews: {
    include: {
      reviewer: { select: USER_SELECT },
    },
    orderBy: { createdAt: "desc" as const },
  },
} as const;
