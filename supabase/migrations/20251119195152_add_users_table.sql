-- supabase/migrations/20251120_add_users_table.sql
create table public.users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique,
  password text
);
