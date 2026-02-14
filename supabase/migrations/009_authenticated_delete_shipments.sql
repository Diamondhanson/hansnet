-- Allow authenticated users (admin) to delete shipments. shipment_updates cascade on delete.
create policy "Authenticated can delete shipments"
  on public.shipments for delete
  to authenticated
  using (true);
