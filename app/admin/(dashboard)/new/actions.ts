"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { BASE_URL, SUPPORT_EMAIL } from "@/constants/config";
import { sendEmail } from "@/lib/email";
import { shipmentCreated } from "@/lib/email-templates";

function generateTrackingId(): string {
  const prefix = "SHIP";
  const part = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${part}-${rand}`;
}

function parseNum(value: FormDataEntryValue | null): number | null {
  if (value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function parseEstimatedDelivery(value: FormDataEntryValue | null): string | null {
  if (value === null || typeof value !== "string" || !value.trim()) return null;
  const d = new Date(value.trim());
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export type CreateShipmentState = {
  trackingId: string | null;
  error: string | null;
};

export async function createShipment(
  _prev: CreateShipmentState,
  formData: FormData
): Promise<CreateShipmentState> {
  const supabase = await createClient();
  if (!supabase) {
    return { trackingId: null, error: "Supabase not configured." };
  }

  const tracking_id = (formData.get("tracking_id") as string)?.trim();
  const sender_first_name = (formData.get("sender_first_name") as string)?.trim() || null;
  const sender_last_name = (formData.get("sender_last_name") as string)?.trim() || null;
  const receiver_first_name = (formData.get("receiver_first_name") as string)?.trim() || null;
  const receiver_last_name = (formData.get("receiver_last_name") as string)?.trim() || null;
  const sender_name = [sender_first_name, sender_last_name].filter(Boolean).join(" ") || null;
  const receiver_name = [receiver_first_name, receiver_last_name].filter(Boolean).join(" ") || null;
  const sender_address = (formData.get("sender_address") as string)?.trim() || null;
  const receiver_address = (formData.get("receiver_address") as string)?.trim() || null;
  const weight = parseNum(formData.get("weight"));
  const service_type = (formData.get("service_type") as string)?.trim() || null;
  const category = (formData.get("category") as string)?.trim() || null;
  const origin_lat = parseNum(formData.get("origin_lat"));
  const origin_lng = parseNum(formData.get("origin_lng"));
  const dest_lat = parseNum(formData.get("dest_lat"));
  const dest_lng = parseNum(formData.get("dest_lng"));
  const estimated_delivery_date = parseEstimatedDelivery(formData.get("estimated_delivery_date"));
  const receiver_email = (formData.get("receiver_email") as string)?.trim() || null;

  if (!tracking_id) {
    return { trackingId: null, error: "Shipment ID is required." };
  }

  const { data, error } = await supabase
    .from("shipments")
    .insert({
      tracking_id,
      status: "pending",
      sender_name,
      sender_address,
      receiver_name,
      receiver_address,
      sender_first_name,
      sender_last_name,
      receiver_first_name,
      receiver_last_name,
      category,
      origin_lat,
      origin_lng,
      dest_lat,
      dest_lng,
      weight,
      service_type: service_type || "land",
      estimated_delivery_date,
      receiver_email,
    })
    .select("tracking_id")
    .single();

  if (error) {
    return { trackingId: null, error: error.message };
  }

  if (receiver_email) {
    const trackingUrl = `${BASE_URL}/track/${data.tracking_id}`;
    const summary =
      [sender_address, receiver_address].filter(Boolean).join(" → ") || "Shipment created.";
    const estimatedDeliveryFormatted = estimated_delivery_date
      ? new Date(estimated_delivery_date).toLocaleDateString(undefined, {
          dateStyle: "medium",
          timeZone: "UTC",
        })
      : null;
    const html = shipmentCreated({
      trackingId: data.tracking_id,
      trackingUrl,
      receiverName: receiver_name,
      summary,
      category: category || null,
      serviceType: service_type || null,
      weight: weight != null ? String(weight) : null,
      estimatedDelivery: estimatedDeliveryFormatted,
      supportEmail: SUPPORT_EMAIL,
    });
    const result = await sendEmail({
      to: receiver_email,
      subject: `Shipment created: ${data.tracking_id}`,
      html,
    });
    if (!result.success) {
      console.error(
        "[createShipment] Client email failed. Ensure RESEND_API_KEY and EMAIL_FROM are set in production.",
        result.error
      );
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/shipments");
  return { trackingId: data.tracking_id, error: null };
}

export async function generateTrackingIdAction(): Promise<string> {
  return generateTrackingId();
}
