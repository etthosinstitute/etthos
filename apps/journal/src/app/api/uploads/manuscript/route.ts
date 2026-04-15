import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/server/auth";
import { enforceRateLimit } from "@/server/rate-limit";
import { saveManuscriptFile } from "@/server/storage";
import { handleRouteError } from "@/shared/utils";

export async function POST(req: NextRequest) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  const limited = enforceRateLimit(req, {
    bucket: "manuscript:upload",
    key: user.userId,
    limit: 12,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const uploaded = await saveManuscriptFile(file);

    return NextResponse.json({ file: uploaded }, { status: 201 });
  } catch (error) {
    console.error("Manuscript upload error:", error);
    return handleRouteError(error);
  }
}
