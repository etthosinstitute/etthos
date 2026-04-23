import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/server/auth";
import { prisma } from "@/server/db/prisma";

export async function GET(req: NextRequest) {
  const authUser = await getAuthUser(req);

  if (!authUser) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = await prisma.user.findUnique({
    where: { id: authUser.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      isReviewer: true,
    },
  });

  return NextResponse.json({ user }, { status: 200 });
}
