import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserRoles } from "@/lib/supabase/auth";
import { logger } from "@/lib/logger";

const log = logger.create("api:crm:segment-members");

const MAX_IDS = 500;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(s: string): boolean {
  return UUID_REGEX.test(s);
}

/**
 * GET /api/crm/contacts/segment-members?contact_ids=id1,id2,...
 * Returns { [contactId]: segment_id[] } for all given contact IDs in one query.
 * Use this instead of N requests to /api/crm/contacts/[id]/segments.
 */
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const roles = await getUserRoles();
  if (!roles.includes("admin") && !roles.includes("moderator")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const contactIdsParam = searchParams.get("contact_ids");
  if (!contactIdsParam?.trim()) {
    return NextResponse.json({ error: "contact_ids query parameter required (comma-separated)" }, { status: 400 });
  }

  const ids = contactIdsParam
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter(isUuid);
  if (ids.length > MAX_IDS) {
    return NextResponse.json({ error: `Maximum ${MAX_IDS} contact IDs allowed` }, { status: 400 });
  }

  if (ids.length === 0) {
    return NextResponse.json({});
  }

  try {
    const { data, error } = await supabase
      .from("contact_segment_members")
      .select("contact_id, segment_id")
      .in("contact_id", ids);

    if (error) throw error;

    const map: Record<string, string[]> = {};
    for (const id of ids) map[id] = [];
    for (const row of data ?? []) {
      const contactId = (row as { contact_id: string }).contact_id;
      const segmentId = (row as { segment_id: string }).segment_id;
      if (map[contactId]) map[contactId].push(segmentId);
    }

    return NextResponse.json(map);
  } catch (err) {
    log.error("Segment members fetch failed", err);
    return NextResponse.json({ error: "Failed to fetch segment membership" }, { status: 500 });
  }
}
