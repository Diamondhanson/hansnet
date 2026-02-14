export const COMPANY_NAME = "HANSNET LOGISTICS";
export const SUPPORT_EMAIL = "hansnetlogistics@gmail.com";

// Used for email links (e.g. "View tracking"). On the server there is no window, so we need env.
// Set NEXT_PUBLIC_BASE_URL in production (e.g. https://yourdomain.com). Vercel injects VERCEL_URL as fallback.
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
