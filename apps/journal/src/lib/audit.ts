import { prisma } from "@/lib/prisma";
import type { AuditAction, AuditEntityType, Prisma, Role } from "@repo/database";
import { NextRequest } from "next/server";

type AuditPayload = {
  actorId?: string | null;
  actorRole?: Role | null;
  action: AuditAction;
  entityType: AuditEntityType;
  entityId?: string | null;
  summary: string;
  metadata?: Prisma.InputJsonValue | null;
  req?: NextRequest;
};

function extractIp(req?: NextRequest) {
  if (!req) return null;
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || null;
  }
  return req.headers.get("x-real-ip");
}

export async function createAuditLog(payload: AuditPayload) {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: payload.actorId || undefined,
        actorRole: payload.actorRole || undefined,
        action: payload.action,
        entityType: payload.entityType,
        entityId: payload.entityId || undefined,
        summary: payload.summary,
        metadata: payload.metadata ?? undefined,
        ipAddress: extractIp(payload.req) || undefined,
        userAgent: payload.req?.headers.get("user-agent") || undefined,
      },
    });
  } catch (error) {
    console.error("Audit log error:", error);
  }
}
