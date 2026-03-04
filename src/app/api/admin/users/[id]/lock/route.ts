import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUserRoles, isAdmin } from "@/lib/supabase/auth";
import { logAuditFromRequest } from "@/lib/audit";

/**
 * PATCH /api/admin/users/[id]/lock
 * Body: { lock: boolean }
 * Lock: bans user so they cannot sign in. Unlock: clears ban.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user: me },
  } = await supabase.auth.getUser();
  if (!me) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const roles = await getUserRoles();
  if (!isAdmin(roles)) {
    return NextResponse.json({ error: "Only admins can lock or unlock users" }, { status: 403 });
  }

  const { id: targetUserId } = await params;
  if (targetUserId === me.id) {
    return NextResponse.json({ error: "You cannot lock your own account" }, { status: 400 });
  }

  let body: { lock?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const lock = body.lock === true;

  const admin = createAdminClient();
  // ban_duration: long duration = locked; "none" = unlocked (GoTrue requires "none" to clear ban)
  const { error } = await admin.auth.admin.updateUserById(targetUserId, {
    ban_duration: lock ? "876000h" : "none",
  });

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "Failed to update user" },
      { status: 400 }
    );
  }

  await logAuditFromRequest(request, {
    userId: me.id,
    userEmail: me.email ?? undefined,
    action: lock ? "lock_user" : "unlock_user",
    resourceType: "user",
    resourceId: targetUserId,
    description: lock ? `Locked user ${targetUserId}` : `Unlocked user ${targetUserId}`,
  }).catch(() => {});

  return NextResponse.json({ success: true, locked: lock });
}
