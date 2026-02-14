import { Resend } from "resend";

const DEFAULT_FROM = "HANSNET LOGISTICS <onboarding@resend.dev>";

/** Resend requires `email@domain.com` or `Name <email@domain.com>`. Normalize env value. */
function normalizeFrom(raw: string | undefined): string {
  const s = raw?.trim();
  if (!s) return DEFAULT_FROM;
  if (/^[^\s<]+@[^\s>]+$/.test(s)) return `HANSNET LOGISTICS <${s}>`;
  const match = s.match(/^(.+?)\s*<([^>]+@[^>]+)>$/);
  if (match) return `${match[1].trim()} <${match[2].trim()}>`;
  const emailMatch = s.match(/([^\s<>]+@[^\s<>]+)/);
  if (emailMatch) return `HANSNET LOGISTICS <${emailMatch[1]}>`;
  return DEFAULT_FROM;
}

export type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({
  to,
  subject,
  html,
}: SendEmailOptions): Promise<{ success: true } | { success: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = normalizeFrom(process.env.EMAIL_FROM);

  if (!apiKey?.trim()) {
    console.warn("Resend: RESEND_API_KEY not set; skipping send.");
    return { success: false, error: "Email not configured." };
  }

  const resend = new Resend(apiKey.trim());

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    if (error) {
      const isDomainNotVerified =
        error.message?.toLowerCase().includes("domain is not verified") ?? false;
      if (isDomainNotVerified) {
        const fallbackFrom = "HANSNET LOGISTICS <onboarding@resend.dev>";
        const { error: retryError } = await resend.emails.send({
          from: fallbackFrom,
          to,
          subject,
          html,
        });
        if (!retryError) return { success: true };
        console.error("Resend send error (after domain fallback):", retryError);
        return { success: false, error: retryError.message };
      }
      console.error("Resend send error:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Resend send exception:", err);
    return { success: false, error: message };
  }
}

export function getAdminEmail(): string | null {
  const email = process.env.ADMIN_EMAIL?.trim();
  return email || null;
}
