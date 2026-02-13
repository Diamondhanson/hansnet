"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { BASE_URL } from "@/constants/config";
import { sendEmail } from "@/lib/email";
import { shipmentUpdated } from "@/lib/email-templates";

export type PostUpdateState = {
  error: string | null;
  success?: boolean;
};

function parseOccurredAt(value: string | null): string {
  if (!value || typeof value !== "string") return new Date().toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function parseEstimatedDelivery(value: FormDataEntryValue | null): string | null {
  if (value === null || typeof value !== "string" || !value.trim()) return null;
  const d = new Date(value.trim());
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function parseNum(value: FormDataEntryValue | null): number | null {
  if (value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export async function postStatusUpdate(
  _prev: PostUpdateState,
  formData: FormData,
  shipmentId: string
): Promise<PostUpdateState> {
  const supabase = await createClient();
  if (!supabase) {
    return { error: "Supabase not configured." };
  }

  const status = (formData.get("status") as string)?.trim();
  const location = (formData.get("location") as string)?.trim() || null;
  const description = (formData.get("description") as string)?.trim() || null;
  const occurredAt = parseOccurredAt(formData.get("occurred_at") as string | null);
  const latitude = parseNum(formData.get("latitude"));
  const longitude = parseNum(formData.get("longitude"));
  const estimated_delivery_date = parseEstimatedDelivery(formData.get("estimated_delivery_date"));

  if (!status) {
    return { error: "Status is required." };
  }

  const { error: insertError } = await supabase.from("shipment_updates").insert({
    shipment_id: shipmentId,
    occurred_at: occurredAt,
    status,
    location,
    description,
    latitude,
    longitude,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  await supabase
    .from("shipments")
    .update({
      status,
      updated_at: occurredAt,
      estimated_delivery_date: estimated_delivery_date ?? null,
    })
    .eq("id", shipmentId);

  const { data: shipment } = await supabase
    .from("shipments")
    .select("receiver_email, tracking_id")
    .eq("id", shipmentId)
    .single();

  if (shipment?.receiver_email && shipment?.tracking_id) {
    const trackingUrl = `${BASE_URL}/track/${shipment.tracking_id}`;
    const html = shipmentUpdated({
      trackingId: shipment.tracking_id,
      trackingUrl,
      status,
      location,
      description,
      occurredAt,
    });
    sendEmail({
      to: shipment.receiver_email,
      subject: `Shipment update: ${shipment.tracking_id} – ${status}`,
      html,
    }).then((r) => {
      if (!r.success) console.error("Shipment updated email failed:", r.error);
    });
  }

  revalidatePath(`/admin/shipments/${shipmentId}`);
  revalidatePath("/admin");
  revalidatePath("/admin/shipments");
  return { error: null, success: true };
}
