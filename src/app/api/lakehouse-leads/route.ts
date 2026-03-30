import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getCelestiaBrochureHtml, getCelestiaBrochureText } from "@/lib/emails/celestia-brochure";
import { logger } from "@/lib/logger";

const log = logger.create("api:lakehouse-leads");

export async function POST(request: Request) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
  }

  const resend = new Resend(resendKey);

  let body: { email?: string; consent?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const consent = body.consent === true;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!consent) {
    return NextResponse.json({ error: "Please accept the terms to receive your exclusive details." }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brownstoneltd.com";
  const brochurePdfUrl = process.env.BROCHURE_PDF_URL?.trim() || null;

  const subject = "Your Celestia Property Brochure — Brownstone Construction";
  const html = getCelestiaBrochureHtml(baseUrl, "lakehouse", brochurePdfUrl);
  const text = getCelestiaBrochureText(baseUrl, brochurePdfUrl, "lakehouse");

  try {
    await resend.emails.send({
      from: "creative@brownstoneltd.com",
      to: email,
      subject,
      html,
      text,
    });
  } catch (err) {
    log.error("Email send failed", err);
    return NextResponse.json({ error: "We could not send the email. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ success: true, brochurePdfUrl: brochurePdfUrl || undefined });
}