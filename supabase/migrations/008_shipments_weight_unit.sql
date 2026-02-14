-- Add weight_unit so we can store and display "10 kg" / "22 lb" in admin and emails.
alter table public.shipments
  add column if not exists weight_unit text default 'kg';
