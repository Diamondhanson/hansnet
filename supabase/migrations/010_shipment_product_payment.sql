-- Product / payment fields for admin create-shipment and client email.

alter table public.shipments
  add column if not exists product_quantity integer,
  add column if not exists product_details text,
  add column if not exists payment_method text;
