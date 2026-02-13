export const COMPANY_NAME = "HANSNET LOGISTICS";
export const SUPPORT_EMAIL = "support@hansnet.com";
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
