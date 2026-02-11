export const COMPANY_NAME = "FASTNEST";
export const SUPPORT_EMAIL = "support@fastnest.com";
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
