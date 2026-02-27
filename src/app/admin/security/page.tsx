import { createClient } from "@/lib/supabase/server";
import { getUserRoles, isAdmin } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";
import { updateEmergencyLock } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSecurityPage() {
  const roles = await getUserRoles();
  if (!isAdmin(roles)) redirect("/admin/dashboard");

  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("emergency_lock_enabled, emergency_lock_message, updated_at")
    .eq("id", 1)
    .maybeSingle();

  const enabled = data?.emergency_lock_enabled === true;
  const message = (data?.emergency_lock_message as string | null) ?? "";
  const updatedAt = data?.updated_at ? new Date(data.updated_at as string) : null;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-earthy mb-2">Security</h1>
      <p className="text-grey mb-8">
        Emergency lock blocks all public pages with a full-screen notice. Admin routes remain accessible so you can disable it.
      </p>

      <div className={`rounded-2xl border p-6 bg-white ${enabled ? "border-red-200" : "border-slate-100"}`}>
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-lg font-bold text-earthy">Emergency lock</h2>
            <p className="text-sm text-grey mt-1 max-w-xl">
              When enabled, visitors will see the lock screen instead of the website content.
            </p>
            {updatedAt && (
              <p className="text-xs text-slate-400 mt-3">
                Last updated: {updatedAt.toLocaleString()}
              </p>
            )}
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${enabled ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
            {enabled ? "LOCKED" : "UNLOCKED"}
          </span>
        </div>

        <form action={(formData) => void updateEmergencyLock(formData)} className="mt-6 space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="enabled"
              defaultChecked={enabled}
              className="rounded border-slate-300"
            />
            <span className="font-medium text-earthy">Enable emergency lock</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-earthy mb-1">
              Lock screen message (optional)
            </label>
            <textarea
              name="message"
              defaultValue={message}
              rows={4}
              className="w-full border border-grey/20 rounded-lg px-3 py-2"
              placeholder="Example: This site is temporarily unavailable due to an emergency security lock. Please check back soon."
            />
            <p className="text-xs text-grey mt-2">
              Keep this neutral. This message is displayed to all visitors when locked.
            </p>
          </div>

          <button
            type="submit"
            className="bg-primary text-white font-bold px-5 py-2.5 rounded-lg hover:opacity-90"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

