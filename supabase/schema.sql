-- Everday AI — Supabase schema
-- Paste this whole file into the Supabase SQL editor (Dashboard -> SQL Editor -> New query)
-- and click Run. Safe to re-run: it drops and recreates the Everday AI objects.

-- Clean up objects from any earlier version of this schema.
drop function if exists public.redeem_unlock_code(text);
drop table if exists public.unlock_code_redemptions;
drop table if exists public.unlock_codes;
drop table if exists public.profiles;
drop function if exists public.touch_updated_at();

-- ============ profiles ============
-- One row per learner: who they are and where they are in the course.
-- The whole course is free, so this is purely for cross-device progress.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  age int,
  gender text,
  industry text,
  custom_industry text,
  role text,
  company text,
  experience text,
  language text not null default 'en' check (language in ('en', 'vi')),
  current_tier text not null default 'starter'
    check (current_tier in ('starter', 'workflows', 'team', 'advanced')),
  current_module_index int not null default 0,
  completed_modules jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ============ Row Level Security ============
-- Each learner can see and edit only their own row.
alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
