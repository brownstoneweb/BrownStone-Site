import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserRoles } from "@/lib/supabase/auth";
import { getSendLimitStatus } from "@/lib/crm/campaigns";
import { MAX_EMAILS_PER_HOUR, MAX_EMAILS_PER_DAY } from "@/lib/crm/safety";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const roles = await getUserRoles();
  if (!roles.includes("admin") && !roles.includes("moderator")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const status = await getSendLimitStatus(supabase);
  return NextResponse.json({
    ...status,
    maxPerHour: MAX_EMAILS_PER_HOUR,
    maxPerDay: MAX_EMAILS_PER_DAY,
  });
}
