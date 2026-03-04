/**
 * reCAPTCHA v3 server-side verification.
 * Verify the token with Google and optionally enforce a minimum score.
 */

const SITEVERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export interface VerifyResult {
  success: boolean;
  score?: number;
  action?: string;
  error?: string;
}

/**
 * Verify a reCAPTCHA v3 token with Google.
 * @param token - The token from the client (grecaptcha.execute)
 * @param _expectedAction - Optional action name (not enforced; avoids false failures from action mismatch)
 * @param minScore - Optional minimum score (0.0–1.0). Default 0.3 so legitimate users pass.
 */
export async function verifyRecaptchaV3(
  token: string,
  _expectedAction?: string,
  minScore = 0.3
): Promise<VerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret?.trim()) {
    return { success: true, error: "RECAPTCHA_SECRET_KEY not set (verification skipped)" };
  }

  // No token (e.g. site key not set, script blocked, or ad blocker): skip verification so forms still work
  if (!token?.trim()) {
    return { success: true, error: "No token (verification skipped)" };
  }

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secret.trim(),
        response: token.trim(),
      }),
    });
    const data = (await res.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    };

    if (!data.success) {
      return {
        success: false,
        score: data.score,
        action: data.action,
        error: data["error-codes"]?.join(", ") ?? "Verification failed",
      };
    }

    // Do not enforce action match — avoids false failures when reCAPTCHA returns a different action string
    const score = data.score ?? 0;
    if (score < minScore) {
      return { success: false, score, action: data.action, error: `Score ${score} below threshold ${minScore}` };
    }

    return { success: true, score: data.score, action: data.action };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Verification request failed" };
  }
}

/** Honeypot field name: if the client sends this and it's non-empty, treat as bot. */
export const HONEYPOT_FIELD = "company_website";

/**
 * Check request body for honeypot. Returns true if bot-like (honeypot filled).
 */
export function isHoneypotFilled(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" ? value.trim().length > 0 : false;
}
