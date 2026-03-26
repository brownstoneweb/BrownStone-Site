import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { logger } from "@/lib/logger";
import { verifyRecaptchaV3, isHoneypotFilled } from "@/lib/recaptcha";
import { getCelestiaBrochureHtml, getCelestiaBrochureText, type BrochureProject } from "@/lib/emails/celestia-brochure";

const log = logger.create("api:brochure");
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  let body: { email?: string; project?: string; consent?: boolean; recaptchaToken?: string; [key: string]: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (isHoneypotFilled(body)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (process.env.RECAPTCHA_SECRET_KEY) {
    const result = await verifyRecaptchaV3(body.recaptchaToken ?? "", "brochure", 0.3);
    if (!result.success) log.warn("Brochure form reCAPTCHA failed (allowing submission)", result.error);
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const project = (body.project === "townhouse" || body.project === "lakehouse" || body.project === "celestia"
    ? body.project
    : "celestia") as BrochureProject;
  const consent = body.consent === true;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!consent) {
    return NextResponse.json({ error: "Please accept the terms to receive the brochure." }, { status: 400 });
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "https://brownstoneltd.com";

  const brochurePdfUrl =
    typeof process.env.BROCHURE_PDF_URL === "string" && process.env.BROCHURE_PDF_URL.trim()
      ? process.env.BROCHURE_PDF_URL.trim()
      : null;

  // Store lead
  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = createAdminClient();
      const { error: insertErr } = await supabase.from("leads").insert({
        email,
        source: "brochure",
        project,
        consent: true,
      } as never);
      if (!insertErr) log.info("Lead stored successfully");
    } catch (err) {
      log.error("Lead storage failed", err);
    }
  }

  const html = getCelestiaBrochureHtml(baseUrl, project, brochurePdfUrl);
  const text = getCelestiaBrochureText(baseUrl, brochurePdfUrl, project);

  const subject =
    project === "townhouse"
      ? "Your Celestia Townhouses Brochure — Brownstone Construction"
      : "Your Celestia Property Brochure — Brownstone Construction";

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject,
      html,
      text,
    });
  } catch (err) {
    log.error("Brochure email send failed", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Email service error: ${errorMessage}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, brochurePdfUrl: brochurePdfUrl ?? undefined });
}