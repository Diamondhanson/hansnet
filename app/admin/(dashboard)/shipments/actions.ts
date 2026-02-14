"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type DeleteShipmentResult = { success: true } | { success: false; error: string };

export async function deleteShipment(shipmentId: string): Promise<DeleteShipmentResult> {
  const supabase = await createClient();
  if (!supabase) {
    return { success: false, error: "Not configured." };
  }

  const { error } = await supabase
    .from("shipments")
    .delete()
    .eq("id", shipmentId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/shipments");
  revalidatePath("/admin");
  return { success: true };
}
