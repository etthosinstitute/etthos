import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookie, getAuthUser } from "@/server/auth";
import { createAuditLog } from "@/server/audit";
import type { Role } from "@repo/database";

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);

  if (user) {
    await createAuditLog({
      actorId: user.userId,
      actorRole: user.role as Role,
      action: "LOGOUT",
      entityType: "USER",
      entityId: user.userId,
      summary: "User logged out of the journal dashboard.",
      req,
    });
  }

  const response = NextResponse.json({ success: true }, { status: 200 });
  clearAuthCookie(response, req);

  return response;
}
