create extension if not exists pgcrypto;

create table if not exists public.driver_availability (
  id uuid primary key default gen_random_uuid(),
  driver_user_id uuid not null unique references auth.users(id) on delete cascade,
  is_available boolean not null default false,
  latitude double precision,
  longitude double precision,
  radius_miles integer not null default 10,
  last_location_at timestamptz,
  available_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.driver_availability enable row level security;

drop policy if exists "drivers can read own availability" on public.driver_availability;
create policy "drivers can read own availability"
on public.driver_availability
for select
using (auth.uid() = driver_user_id);

drop policy if exists "drivers can insert own availability" on public.driver_availability;
create policy "drivers can insert own availability"
on public.driver_availability
for insert
with check (auth.uid() = driver_user_id);

drop policy if exists "drivers can update own availability" on public.driver_availability;
create policy "drivers can update own availability"
on public.driver_availability
for update
using (auth.uid() = driver_user_id)
with check (auth.uid() = driver_user_id);
