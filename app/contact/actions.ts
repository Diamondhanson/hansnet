"use server";

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

  // Placeholder: no email send yet; ready for Resend/SendGrid etc.
  return { error: null, success: true };
}
