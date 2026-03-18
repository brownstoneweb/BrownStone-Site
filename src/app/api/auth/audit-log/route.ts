import { NextResponse } from "next/server";
import { logAuditFromRequest } from "@/lib/audit";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const bodySchema = z.object({
  action: z.enum(["login_failure"]),
  description: z.string().min(1).max(500),
  metadata: z.record(z.unknown()).optional(),
});

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_IP = 50;

/**
 * Unauthenticated endpoint to log login failures (and similar auth events).
 * Rate-limited by IP to prevent abuse.
 */
export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { allowed } = checkRateLimit(ip, "auth-audit-log", MAX_PER_IP, WINDOW_MS);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  await logAuditFromRequest(request, {
    userId: null,
    userEmail: (parsed.data.metadata?.email as string) ?? undefined,
    action: parsed.data.action,
    resourceType: "auth",
    description: parsed.data.description,
    metadata: parsed.data.metadata,
  });

  return NextResponse.json({ ok: true });
}
