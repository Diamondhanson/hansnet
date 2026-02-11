-- Run in Supabase SQL Editor after base schema. Adds admin form fields and RLS for authenticated users.

alter table public.shipments
  add column if not exists sender_name text,
  add column if not exists sender_address text,
  add column if not exists receiver_name text,
  add column if not exists receiver_address text,
  add column if not exists weight numeric,
  add column if not exists service_type text;

create policy "Authenticated can insert shipments"
  on public.shipments for insert
  to authenticated
  with check (true);

create policy "Authenticated can update shipments"
  on public.shipments for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can insert shipment_updates"
  on public.shipment_updates for insert
  to authenticated
  with check (true);

create policy "Authenticated can update shipment_updates"
  on public.shipment_updates for update
  to authenticated
  using (true)
  with check (true);
