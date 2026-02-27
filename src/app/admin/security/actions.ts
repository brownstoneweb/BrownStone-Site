"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getUserRoles, isAdmin } from "@/lib/supabase/auth";
import { logAuditFromAction } from "@/lib/audit";

export async function updateEmergencyLock(formData: FormData): Promise<{ ok?: boolean; error?: string }> {
  const supabase = await createClient();
  const roles = await getUserRoles();
  if (!isAdmin(roles)) return { error: "Forbidden" };

  const enabled = formData.get("enabled") === "on";
  const messageRaw = (formData.get("message") as string | null) ?? "";
  const message = messageRaw.trim() || null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase.from("site_settings").upsert({
    id: 1,
    emergency_lock_enabled: enabled,
    emergency_lock_message: message,
    updated_by: user.id,
    updated_at: new Date().toISOString(),
  });
  if (error) return { error: error.message };

  logAuditFromAction({
    userId: user.id,
    userEmail: user.email,
    action: "update",
    resourceType: "settings",
    resourceId: "emergency_lock",
    description: enabled ? "Enabled emergency lock" : "Disabled emergency lock",
    metadata: {
      enabled,
      message_preview: message ? message.slice(0, 140) : null,
    },
  }).catch(() => {});

  revalidatePath("/", "layout");
  revalidatePath("/admin/security");
  return { ok: true };
}

