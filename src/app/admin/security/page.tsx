import { createClient } from "@/lib/supabase/server";
import { getUserRoles, isAdmin } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";
import { SecurityForm } from "./SecurityForm";

export const dynamic = "force-dynamic";

export default async function AdminSecurityPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const roles = await getUserRoles();
  if (!isAdmin(roles)) redirect("/admin/dashboard");

  const { error: errorParam } = await searchParams;

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

      {errorParam && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
          {decodeURIComponent(errorParam)}
        </div>
      )}

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

        <SecurityForm initialEnabled={enabled} initialMessage={message} />
      </div>
    </div>
  );
}

