export const MAX_EMAILS_PER_DAY = parseInt(
  process.env.CRM_MAX_EMAILS_PER_DAY ?? "50",
  10
);
// Hourly limit: default 20, minimum 20 so "Send batch (up to 20)" can send 20 per hour
export const MAX_EMAILS_PER_HOUR = Math.max(
  20,
  parseInt(process.env.CRM_MAX_EMAILS_PER_HOUR ?? "20", 10)
);

export function getSendingLimits() {
  return {
    perDay: MAX_EMAILS_PER_DAY,
    perHour: MAX_EMAILS_PER_HOUR,
  };
}
