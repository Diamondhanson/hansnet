"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function generateTrackingId(): string {
  const prefix = "SHIP";
  const part = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${part}-${rand}`;
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
  const sender_name = (formData.get("sender_name") as string)?.trim() || null;
  const sender_address =
    (formData.get("sender_address") as string)?.trim() || null;
  const receiver_name =
    (formData.get("receiver_name") as string)?.trim() || null;
  const receiver_address =
    (formData.get("receiver_address") as string)?.trim() || null;
  const weightRaw = formData.get("weight");
  const weight =
    weightRaw !== null && weightRaw !== ""
      ? Number(weightRaw)
      : null;
  const service_type = (formData.get("service_type") as string)?.trim() || null;

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
      weight,
      service_type: service_type || "land",
    })
    .select("tracking_id")
    .single();

  if (error) {
    return { trackingId: null, error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/shipments");
  return { trackingId: data.tracking_id, error: null };
}

export async function generateTrackingIdAction(): Promise<string> {
  return generateTrackingId();
}
