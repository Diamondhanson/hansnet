-- Ensures status column exists on shipment_updates (required for post status update).
-- Safe to run multiple times (add column if not exists).

alter table public.shipment_updates
  add column if not exists status text;
