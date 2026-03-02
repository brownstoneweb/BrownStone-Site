import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserRoles } from "@/lib/supabase/auth";

function escapeCsvCell(value: string | null | undefined): string {
  if (value == null || value === "") return "";
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
  const source = searchParams.get("source") ?? "";
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  let query = supabase
    .from("leads")
    .select("email, phone, country_code, name, message, source, project, consent, created_at")
    .order("created_at", { ascending: false })
    .limit(10000);

  if (source) query = query.eq("source", source);
  if (from) query = query.gte("created_at", `${from}T00:00:00.000Z`);
  if (to) query = query.lte("created_at", `${to}T23:59:59.999Z`);

  const { data: leads, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const headers = ["Email", "Phone", "Name", "Source", "Project", "Message", "Consent", "Date"];
  const rows = (leads ?? []).map((lead) => [
    escapeCsvCell(lead.email),
    escapeCsvCell(lead.phone ? (lead.country_code ?? "") + lead.phone : null),
    escapeCsvCell(lead.name),
    escapeCsvCell(lead.source),
    escapeCsvCell(lead.project),
    escapeCsvCell(lead.message),
    escapeCsvCell(lead.consent != null ? (lead.consent ? "Yes" : "No") : null),
    escapeCsvCell(
      lead.created_at
        ? new Date(lead.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : null
    ),
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
  const bom = "\uFEFF";
  return new NextResponse(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-export-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
