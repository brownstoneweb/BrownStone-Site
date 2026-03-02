import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserRoles } from "@/lib/supabase/auth";
import { getContacts } from "@/lib/crm/contacts";

function escapeCsvCell(value: string | null | undefined | string[]): string {
  if (value == null) return "";
  if (Array.isArray(value)) return escapeCsvCell(value.join("; "));
  const s = String(value);
  if (s.includes('"') || s.includes(",") || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const roles = await getUserRoles();
  if (!roles.includes("admin") && !roles.includes("moderator")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") ?? "";
  const search = searchParams.get("search") ?? "";
  const tagsParam = searchParams.get("tags") ?? "";
  const tags = tagsParam ? tagsParam.split(",").filter(Boolean) : undefined;

  const contacts = await getContacts(supabase, {
    status: status || undefined,
    search: search || undefined,
    tags: tags?.length ? tags : undefined,
  }, 10000);

  const headers = ["Email", "Name", "Phone", "Country code", "Company", "Source", "Status", "Tags", "Created"];
  const rows = contacts.map((c) => [
    escapeCsvCell(c.email),
    escapeCsvCell(c.name),
    escapeCsvCell(c.phone),
    escapeCsvCell(c.country_code),
    escapeCsvCell(c.company),
    escapeCsvCell(c.source),
    escapeCsvCell(c.status),
    escapeCsvCell(c.tags),
    escapeCsvCell(c.created_at ? new Date(c.created_at).toLocaleDateString(undefined, { dateStyle: "medium" }) : null),
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
  const bom = "\uFEFF";
  return new NextResponse(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="contacts-export-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
