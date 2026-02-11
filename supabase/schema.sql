-- Run this in your Supabase project: SQL Editor → New query → paste and run.

-- Shipments table (tracking_id is the public ID used in URLs, e.g. /track/ABC-123)
create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  tracking_id text unique not null,
  status text not null default 'pending',
  estimated_delivery_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Updates timeline (each row = one step on the vertical stepper)
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

-- Optional: enable RLS and allow anonymous read on these tables so the track page can fetch data
alter table public.shipments enable row level security;
alter table public.shipment_updates enable row level security;

create policy "Allow public read on shipments"
  on public.shipments for select
  using (true);

create policy "Allow public read on shipment_updates"
  on public.shipment_updates for select
  using (true);

-- Sample row (optional – remove or change tracking_id if you already have data)
insert into public.shipments (tracking_id, status, estimated_delivery_date)
values ('SAMPLE-001', 'in_transit', now() + interval '5 days')
on conflict (tracking_id) do nothing;

-- Sample updates for SAMPLE-001 (get shipment id first in a second run, or use known id)
do $$
declare
  sid uuid;
begin
  select id into sid from public.shipments where tracking_id = 'SAMPLE-001' limit 1;
  if sid is not null then
    insert into public.shipment_updates (shipment_id, occurred_at, location, description, latitude, longitude)
    values
      (sid, now() - interval '3 days', 'Origin Warehouse', 'Picked up', 40.7128, -74.0060),
      (sid, now() - interval '2 days', 'Sorting Facility A', 'Arrived at Sorting Facility', 40.7580, -73.9855),
      (sid, now() - interval '1 day',  'Distribution Center', 'Departed for final leg', 40.6782, -73.9442),
      (sid, now(),                     'Local Hub', 'Out for delivery', 40.7282, -73.7949);
  end if;
end $$;
