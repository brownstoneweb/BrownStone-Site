import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCelestiaBrochureHtml, getCelestiaBrochureText } from "@/lib/emails/celestia-brochure";
import { logger } from "@/lib/logger";
import { verifyRecaptchaV3, isHoneypotFilled } from "@/lib/recaptcha";
import { notifyLeadModerator } from "@/lib/emails/lead-notify";

const log = logger.create("api:lakehouse-leads");

// --- Supabase table types ---
interface LakehouseLead {
  email: string;
  consent: boolean;
  created_at?: string;
}

interface Lead {
  email: string;
  source: string;
  project: string;
  consent: boolean;
  created_at?: string;
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  let body: {
    email?: string;
    consent?: boolean;
    source?: string;
    recaptchaToken?: string;
    [key: string]: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (isHoneypotFilled(body)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const action = body.source === "exit_intent" ? "exit_intent" : "lakehouse";

  if (process.env.RECAPTCHA_SECRET_KEY) {
    const result = await verifyRecaptchaV3(body.recaptchaToken ?? "", action, 0.3);
    if (!result.success) {
      log.warn("Lakehouse/exit_intent form reCAPTCHA failed (allowing submission)", result.error);
    }
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const consent = body.consent === true;
  const source = body.source === "exit_intent" ? "exit_intent" : "lakehouse";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!consent) {
    return NextResponse.json({ error: "Please accept the terms to receive your exclusive details." }, { status: 400 });
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "https://brownstoneltd.com";

  // --- Store lead in Supabase ---
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createAdminClient();

      // Insert into lakehouse_leads
      const { error: lakehouseErr } = await supabase
        .from<LakehouseLead, { email: string; consent: boolean }>("lakehouse_leads")
        .insert({ email, consent });
      if (lakehouseErr) log.error("Lakehouse leads insert failed", lakehouseErr);

      // Insert into unified leads table
      const { error: leadsErr } = await supabase
        .from<Lead, { email: string; source: string; project: string; consent: boolean }>("leads")
        .insert({ email, source, project: "lakehouse", consent });
      if (leadsErr) log.error("Unified leads insert failed", leadsErr);
      else {
        notifyLeadModerator({ source, email, project: "lakehouse" }).catch((e) =>
          log.error("Lead notification failed", e)
        );
      }
    } else {
      log.warn("Leads not saved: SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL not configured");
    }
  } catch (dbErr) {
    log.error("Database write failed", dbErr);
  }

  const brochurePdfUrl =
    typeof process.env.BROCHURE_PDF_URL === "string" && process.env.BROCHURE_PDF_URL.trim()
      ? process.env.BROCHURE_PDF_URL.trim()
      : null;

  const subject = "Your Celestia Property Brochure — Brownstone Construction";
  const html = getCelestiaBrochureHtml(baseUrl, "lakehouse", brochurePdfUrl);
  const text = getCelestiaBrochureText(baseUrl, brochurePdfUrl, "lakehouse");

  // --- Send brochure email via Resend ---
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // replace with your verified Resend sender
      to: email,
      subject,
      html,
      text,
      // Optional: reply_to: "creative@brownstoneltd.com"
    });
  } catch (err) {
    log.error("Brochure email send failed", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Email service error: ${errorMessage}` }, { status: 502 });
  }

  return NextResponse.json({ success: true, brochurePdfUrl: brochurePdfUrl ?? undefined });
}