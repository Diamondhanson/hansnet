"use server";

import { redirect } from "next/navigation";
import { sendEmail, getAdminEmail } from "@/lib/email";
import { quoteRequestReceived } from "@/lib/email-templates";

export type QuoteSubmitState = { error: string | null };

export async function submitQuoteRequest(
  _prev: QuoteSubmitState,
  formData: FormData
): Promise<QuoteSubmitState> {
  const origin = (formData.get("origin") as string)?.trim() ?? "";
  const destination = (formData.get("destination") as string)?.trim() ?? "";
  const weight = (formData.get("weight") as string)?.trim() ?? "";
  const type = (formData.get("type") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const adminEmail = getAdminEmail();
  if (!adminEmail) {
    redirect("/quote");
  }

  const html = quoteRequestReceived({ origin, destination, weight, type, email });
  const result = await sendEmail({
    to: adminEmail,
    subject: "New freight quote request (website)",
    html,
  });

  if (!result.success) {
    return { error: "Failed to send. Try again." };
  }
  redirect("/quote");
}
