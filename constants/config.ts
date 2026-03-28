export const COMPANY_NAME = "HANSNET LOGISTICS";
export const SUPPORT_EMAIL = "hansnetlogistics@gmail.com";
/** Display format for the main support line */
export const SUPPORT_PHONE = "+1 (213) 849-3854";
/** E.164-style value for tel: links */
export const SUPPORT_PHONE_TEL = "+12138493854";

function ensureProtocol(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "http://localhost:3000";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
}

// Used for email links (e.g. "View tracking"). On the server there is no window, so we need env.
// Set NEXT_PUBLIC_BASE_URL in production (e.g. https://yourdomain.com). Vercel injects VERCEL_URL as fallback.
// URLs without protocol (e.g. hansnetlogistics.com) are normalized to https://.
const rawBase =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

export const BASE_URL = ensureProtocol(String(rawBase ?? "http://localhost:3000"));
