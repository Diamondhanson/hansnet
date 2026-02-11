"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type PostUpdateState = {
  error: string | null;
  success?: boolean;
};

function parseOccurredAt(value: string | null): string {
  if (!value || typeof value !== "string") return new Date().toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
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

  if (!status) {
    return { error: "Status is required." };
  }

  const { error: insertError } = await supabase.from("shipment_updates").insert({
    shipment_id: shipmentId,
    occurred_at: occurredAt,
    status,
    location,
    description,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  await supabase
    .from("shipments")
    .update({ status, updated_at: occurredAt })
    .eq("id", shipmentId);

  revalidatePath(`/admin/shipments/${shipmentId}`);
  revalidatePath("/admin");
  revalidatePath("/admin/shipments");
  return { error: null, success: true };
}
