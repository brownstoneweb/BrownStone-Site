import { ServerClient } from "postmark";
import { getPostmarkFrom } from "@/lib/emails/postmark-from";

export type LeadNotifyPayload = {
  source: string;
  email: string;
  name?: string | null;
  message?: string | null;
  project?: string | null;
};

/**
 * Send a "New lead" notification to the address in EMAIL_LEAD_NOTIFY (e.g. a moderator).
 * Call this after inserting a lead. If EMAIL_LEAD_NOTIFY or POSTMARK_API_KEY is missing, no email is sent.
 */
export async function notifyLeadModerator(_payload: LeadNotifyPayload): Promise<void> {
  const to = process.env.EMAIL_LEAD_NOTIFY?.trim();
  const apiKey = process.env.POSTMARK_API_KEY;
  if (!to || !apiKey) return;

  const client = new ServerClient(apiKey);
  const portalUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "https://brownstoneltd.com";
  const loginUrl = `${portalUrl}/admin/login`;
  const leadsUrl = `${portalUrl}/admin/leads`;

  const textBody = `You have a new lead.\n\nLog into your admin portal to view the details.\n\n${leadsUrl}`;
  const htmlBody = `<p>You have a new lead.</p><p>Log into your <a href="${loginUrl}">admin portal</a> to view the details.</p><p><a href="${leadsUrl}">View leads</a></p>`;

  await client.sendEmail({
    From: getPostmarkFrom("contact"),
    To: to,
    Subject: `New lead — Brownstone`,
    TextBody: textBody,
    HtmlBody: htmlBody,
  });
}
