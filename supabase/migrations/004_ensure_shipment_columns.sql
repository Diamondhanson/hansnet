-- Ensures all columns required by the admin create-shipment form exist on public.shipments.
-- Safe to run multiple times (add column if not exists).

alter table public.shipments
  add column if not exists sender_name text,
  add column if not exists sender_address text,
  add column if not exists receiver_name text,
  add column if not exists receiver_address text,
  add column if not exists weight numeric,
  add column if not exists service_type text,
  add column if not exists sender_first_name text,
  add column if not exists sender_last_name text,
  add column if not exists receiver_first_name text,
  add column if not exists receiver_last_name text,
  add column if not exists category text,
  add column if not exists origin_lat double precision,
  add column if not exists origin_lng double precision,
  add column if not exists dest_lat double precision,
  add column if not exists dest_lng double precision;
