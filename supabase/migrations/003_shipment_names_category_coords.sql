-- Add split names, category, and origin/dest coordinates for shipments.
alter table public.shipments
  add column if not exists sender_first_name text,
  add column if not exists sender_last_name text,
  add column if not exists receiver_first_name text,
  add column if not exists receiver_last_name text,
  add column if not exists category text,
  add column if not exists origin_lat double precision,
  add column if not exists origin_lng double precision,
  add column if not exists dest_lat double precision,
  add column if not exists dest_lng double precision;
