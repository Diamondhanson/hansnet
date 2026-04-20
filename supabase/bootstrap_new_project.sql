

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  tracking_id text unique not null,
  status text not null default 'pending',
  estimated_delivery_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.shipment_updates (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid not null references public.shipments(id) on delete cascade,
  occurred_at timestamptz not null,
  location text,
  description text,
  latitude double precision,
  longitude double precision,
  created_at timestamptz default now()
);

create index if not exists idx_shipment_updates_shipment_id
  on public.shipment_updates(shipment_id);
create index if not exists idx_shipment_updates_occurred_at
  on public.shipment_updates(occurred_at);

-- ---------------------------------------------------------------------------
-- Columns (admin + tracking + emails)
-- ---------------------------------------------------------------------------

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
  add column if not exists dest_lng double precision,
  add column if not exists receiver_email text,
  add column if not exists weight_unit text default 'kg',
  add column if not exists product_quantity integer,
  add column if not exists product_details text,
  add column if not exists payment_method text;

alter table public.shipment_updates
  add column if not exists status text;

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.shipments enable row level security;
alter table public.shipment_updates enable row level security;

drop policy if exists "Allow public read on shipments" on public.shipments;
drop policy if exists "Allow public read on shipment_updates" on public.shipment_updates;
drop policy if exists "Authenticated can insert shipments" on public.shipments;
drop policy if exists "Authenticated can update shipments" on public.shipments;
drop policy if exists "Authenticated can delete shipments" on public.shipments;
drop policy if exists "Authenticated can insert shipment_updates" on public.shipment_updates;
drop policy if exists "Authenticated can update shipment_updates" on public.shipment_updates;

create policy "Allow public read on shipments"
  on public.shipments for select
  using (true);

create policy "Allow public read on shipment_updates"
  on public.shipment_updates for select
  using (true);

create policy "Authenticated can insert shipments"
  on public.shipments for insert
  to authenticated
  with check (true);

create policy "Authenticated can update shipments"
  on public.shipments for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete shipments"
  on public.shipments for delete
  to authenticated
  using (true);

create policy "Authenticated can insert shipment_updates"
  on public.shipment_updates for insert
  to authenticated
  with check (true);

create policy "Authenticated can update shipment_updates"
  on public.shipment_updates for update
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- Optional demo shipment (comment out if you do not want sample data)
-- ---------------------------------------------------------------------------

insert into public.shipments (tracking_id, status, estimated_delivery_date)
values ('SAMPLE-001', 'in_transit', now() + interval '5 days')
on conflict (tracking_id) do nothing;

do $$
declare
  sid uuid;
begin
  select id into sid from public.shipments where tracking_id = 'SAMPLE-001' limit 1;
  if sid is not null and not exists (select 1 from public.shipment_updates where shipment_id = sid) then
    insert into public.shipment_updates (shipment_id, occurred_at, location, description, latitude, longitude, status)
    values
      (sid, now() - interval '3 days', 'Origin Warehouse', 'Picked up', 40.7128, -74.0060, 'in_transit'),
      (sid, now() - interval '2 days', 'Sorting Facility A', 'Arrived at Sorting Facility', 40.7580, -73.9855, 'in_transit'),
      (sid, now() - interval '1 day',  'Distribution Center', 'Departed for final leg', 40.6782, -73.9442, 'in_transit'),
      (sid, now(),                     'Local Hub', 'Out for delivery', 40.7282, -73.7949, 'out_for_delivery');
  end if;
end $$;
