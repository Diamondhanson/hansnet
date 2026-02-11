-- Add status to shipment_updates so each update row stores the status at scan time.
alter table public.shipment_updates
  add column if not exists status text;
