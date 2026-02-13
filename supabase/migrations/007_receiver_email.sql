-- Add receiver email for future email notifications (create and update).
alter table public.shipments
  add column if not exists receiver_email text;
