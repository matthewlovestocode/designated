alter table public.ride_requests
add column if not exists claimed_at timestamptz,
add column if not exists completed_at timestamptz,
add column if not exists cancelled_at timestamptz;
