import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const from = process.env.EMAIL_FROM ?? "HANSNET LOGISTICS <onboarding@resend.dev>";

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
  if (!resend) {
    console.warn("Resend: RESEND_API_KEY not set; skipping send.");
    return { success: false, error: "Email not configured." };
  }
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
