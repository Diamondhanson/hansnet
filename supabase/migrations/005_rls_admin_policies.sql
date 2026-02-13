-- Ensures RLS policies exist so authenticated users can insert/update shipments and shipment_updates.
-- Safe to run: drops existing policies by name then recreates them.

drop policy if exists "Authenticated can insert shipments" on public.shipments;
drop policy if exists "Authenticated can update shipments" on public.shipments;
drop policy if exists "Authenticated can insert shipment_updates" on public.shipment_updates;
drop policy if exists "Authenticated can update shipment_updates" on public.shipment_updates;

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
