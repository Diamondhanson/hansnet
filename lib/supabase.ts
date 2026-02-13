import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  client = createClient(url, key);
  return client;
}

export type Shipment = {
  id: string;
  tracking_id: string;
  status: string;
  estimated_delivery_date: string | null;
  created_at: string;
  updated_at: string;
  sender_name: string | null;
  sender_address: string | null;
  receiver_name: string | null;
  receiver_address: string | null;
  receiver_email: string | null;
  sender_first_name: string | null;
  sender_last_name: string | null;
  receiver_first_name: string | null;
  receiver_last_name: string | null;
  category: string | null;
  origin_lat: number | null;
  origin_lng: number | null;
  dest_lat: number | null;
  dest_lng: number | null;
  weight: number | null;
  service_type: string | null;
};

export type ShipmentUpdate = {
  id: string;
  shipment_id: string;
  occurred_at: string;
  status: string | null;
  location: string | null;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
};
