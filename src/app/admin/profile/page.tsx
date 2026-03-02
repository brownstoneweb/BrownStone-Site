import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import { getUserRoles } from "@/lib/supabase/auth";
import { ProfileForm } from "@/components/admin/ProfileForm";

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const roles = await getUserRoles();

  let lastSignInAt: string | null = null;
  try {
    const admin = createAdminClient();
    const { data } = await admin.auth.admin.getUserById(user.id);
    lastSignInAt = data?.user?.last_sign_in_at ?? null;
  } catch {
    // ignore
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-earthy mb-6">Profile</h1>
      {lastSignInAt && (
        <p className="text-sm text-slate-500 mb-4">
          Last login: {new Date(lastSignInAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
        </p>
      )}
      <ProfileForm
        userId={user.id}
        email={user.email ?? ""}
        initialFullName={profile?.full_name ?? ""}
        initialBio={profile?.bio ?? ""}
        initialAvatarUrl={profile?.avatar_url ?? ""}
        roles={roles}
      />
    </div>
  );
}
