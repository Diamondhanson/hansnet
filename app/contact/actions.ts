"use server";

import { sendEmail, getAdminEmail } from "@/lib/email";
import { contactFormReceived } from "@/lib/email-templates";

export type ContactState = {
  error: string | null;
  success?: boolean;
};

export async function submitContactForm(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const subject = (formData.get("subject") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || name.length < 2) {
    return { error: "Please enter your name." };
  }
  if (!email) {
    return { error: "Please enter your email." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!subject || subject.length < 2) {
    return { error: "Please enter a subject." };
  }
  if (!message || message.length < 10) {
    return { error: "Please enter a message (at least 10 characters)." };
  }

  const adminEmail = getAdminEmail();
  if (!adminEmail) {
    console.warn("Contact form: ADMIN_EMAIL not set; skipping send.");
    return { error: null, success: true };
  }

  const html = contactFormReceived({ name, email, subject, message });
  const result = await sendEmail({
    to: adminEmail,
    subject: `Contact: ${subject}`,
    html,
  });

  if (!result.success) {
    return { error: "Failed to send. Try again." };
  }
  return { error: null, success: true };
}
