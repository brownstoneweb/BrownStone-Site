import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserRoles } from "@/lib/supabase/auth";
import { SnippetsManager } from "./SnippetsManager";

export default async function AdminSnippetsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const roles = await getUserRoles();
  const canManage = roles.includes("admin") || roles.includes("moderator");
  if (!canManage && !roles.includes("author")) redirect("/admin/dashboard");

  const { data: snippets } = await supabase
    .from("snippets")
    .select("id, name, content, created_at, updated_at")
    .order("name");

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Snippets</h2>
        <p className="text-slate-500 mt-1">
          Reusable blocks (e.g. CTA, disclaimer) you can drop into posts.
        </p>
      </div>
      <SnippetsManager snippets={snippets ?? []} canManage={canManage} />
    </div>
  );
}
