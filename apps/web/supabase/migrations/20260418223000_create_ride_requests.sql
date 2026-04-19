create table if not exists public.ride_requests (
  id uuid primary key default gen_random_uuid(),
  created_by_user_id uuid not null references auth.users(id) on delete cascade,
  requested_by_role text not null check (requested_by_role in ('patron', 'concierge')),
  pickup_latitude double precision not null,
  pickup_longitude double precision not null,
  pickup_label text,
  notes text,
  status text not null default 'open' check (status in ('open', 'matched', 'cancelled', 'completed')),
  matched_driver_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.ride_requests enable row level security;

drop policy if exists "authenticated users can read ride requests" on public.ride_requests;
create policy "authenticated users can read ride requests"
on public.ride_requests
for select
to authenticated
using (true);

drop policy if exists "users can insert own ride requests" on public.ride_requests;
create policy "users can insert own ride requests"
on public.ride_requests
for insert
to authenticated
with check (auth.uid() = created_by_user_id);

drop policy if exists "users can update own ride requests" on public.ride_requests;
create policy "users can update own ride requests"
on public.ride_requests
for update
to authenticated
using (auth.uid() = created_by_user_id)
with check (auth.uid() = created_by_user_id);
