import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getContactReceivedHtml, getContactReceivedText } from "@/lib/emails/contact-received";
import { createAdminClient } from "@/lib/supabase/admin";
import { logger } from "@/lib/logger";
import { verifyRecaptchaV3, isHoneypotFilled } from "@/lib/recaptcha";

const log = logger.create("api:contact");

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const to = process.env.CONTACTFORMMAIL;
  if (!to) {
    return NextResponse.json(
      { error: "Contact recipient not configured (CONTACTFORMMAIL)." },
      { status: 503 }
    );
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service not configured (RESEND_API_KEY)." },
      { status: 503 }
    );
  }

  let body: {
    name?: string;
    email?: string;
    projectType?: string;
    message?: string;
    recaptchaToken?: string;
    [key: string]: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (isHoneypotFilled(body)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (process.env.RECAPTCHA_SECRET_KEY) {
    const token = body.recaptchaToken;
    const result = await verifyRecaptchaV3(token ?? "", "contact", 0.3);
    if (!result.success) {
      log.warn("Contact form reCAPTCHA failed (allowing submission)", result.error);
    }
  }

  const { name, email, projectType, message } = body;
  const emailTrimmed = email?.trim() ?? "";
  if (!name?.trim() || !emailTrimmed || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "https://brownstoneltd.com";

  // Store lead — requires SUPABASE_SERVICE_ROLE_KEY
  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = createAdminClient();
      const { error: insertError } = await supabase.from("leads").insert({
        email: emailTrimmed,
        name: name?.trim() ?? null,
        message: (message?.trim() ?? "").slice(0, 5000) || null,
        source: "contact",
        project: projectType?.trim() || null,
        consent: true,
      } as never);
      if (insertError) log.error("Lead insert failed", insertError);
    } catch (err) {
      log.error("Lead storage failed", err);
    }
  }

  try {
    // Send message to site owner
    await resend.emails.send({
      from: "creative@brownstoneltd.com",
      to,
      subject: `Website inquiry from ${name.trim()}${projectType ? ` — ${projectType}` : ""}`,
      html: `
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${emailTrimmed}</p>
        ${projectType ? `<p><strong>Project type:</strong> ${projectType}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.trim()}</p>
      `,
    });

    // Send auto-reply to user
    const brownstoneLogoUrl =
      typeof process.env.BROWNSTONE_LOGO_URL === "string" && process.env.BROWNSTONE_LOGO_URL.trim()
        ? process.env.BROWNSTONE_LOGO_URL.trim()
        : undefined;

    await resend.emails.send({
      from: "creative@brownstoneltd.com",
      to: emailTrimmed,
      subject: "We've received your message — Brownstone Construction",
      html: getContactReceivedHtml(baseUrl, brownstoneLogoUrl),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    log.error("Email send failed", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}