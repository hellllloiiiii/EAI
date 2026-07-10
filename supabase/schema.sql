-- Everday AI — Supabase schema
-- Paste this whole file into the Supabase SQL editor (Dashboard -> SQL Editor -> New query)
-- and click Run. Safe to re-run: it drops and recreates the Everday AI objects.

drop function if exists public.redeem_unlock_code(text);
drop table if exists public.unlock_code_redemptions;
drop table if exists public.unlock_codes;
drop table if exists public.profiles;
drop function if exists public.touch_updated_at();

-- ============ profiles ============
-- One row per authenticated learner. unlocked_tiers is entitlement data and is
-- only ever written by the redeem_unlock_code function (see column grants below).
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
  unlocked_tiers text[] not null default array['starter']::text[],
  current_tier text not null default 'starter'
    check (current_tier in ('starter', 'workflows', 'team', 'advanced')),
  current_module_index int not null default 0,
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

-- ============ unlock_codes ============
-- A company (or tester) code that up to max_redemptions learners can redeem.
-- Codes are stored lowercase; redemption normalizes input the same way.
create table public.unlock_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text,
  company text,
  unlocks text[] not null default array['workflows', 'team', 'advanced']::text[],
  max_redemptions int not null default 1 check (max_redemptions > 0),
  redemptions_count int not null default 0 check (redemptions_count >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  expires_at timestamptz,
  constraint redemptions_within_max check (redemptions_count <= max_redemptions)
);

-- Audit trail; the unique constraint makes redemption idempotent per user.
create table public.unlock_code_redemptions (
  id uuid primary key default gen_random_uuid(),
  code_id uuid not null references public.unlock_codes(id),
  user_id uuid not null references auth.users(id) on delete cascade,
  redeemed_at timestamptz not null default now(),
  unique (code_id, user_id)
);

-- ============ Row Level Security ============
alter table public.profiles enable row level security;
alter table public.unlock_codes enable row level security;
alter table public.unlock_code_redemptions enable row level security;

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

-- unlock_codes: no policies for clients at all (default deny).
-- Codes are only touched by the SECURITY DEFINER function and the dashboard.

create policy "redemptions_select_own"
  on public.unlock_code_redemptions for select
  using (auth.uid() = user_id);

-- ============ Column-level lockdown ============
-- unlocked_tiers is deliberately missing from the update grant: even though the
-- RLS policy above allows a user to update their own row, Postgres rejects any
-- UPDATE that touches unlocked_tiers with permission denied. Entitlements can
-- only change through redeem_unlock_code below.
revoke insert, update on public.profiles from authenticated, anon;
grant select on public.profiles to authenticated;
grant insert (id, age, gender, industry, custom_industry, role, company,
              experience, language, current_tier, current_module_index)
  on public.profiles to authenticated;
grant update (age, gender, industry, custom_industry, role, company,
              experience, language, current_tier, current_module_index)
  on public.profiles to authenticated;
revoke all on public.unlock_codes from authenticated, anon;
revoke insert, update, delete on public.unlock_code_redemptions from authenticated, anon;
grant select on public.unlock_code_redemptions to authenticated;

-- ============ Redemption RPC ============
create function public.redeem_unlock_code(p_code text)
returns table (unlocked_tiers text[])
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code_row public.unlock_codes%rowtype;
  v_uid uuid := auth.uid();
  v_new_tiers text[];
begin
  if v_uid is null then
    raise exception 'not_authenticated';
  end if;

  p_code := lower(trim(p_code));

  -- Row lock serializes concurrent redemptions of the same code, so a
  -- near-exhausted code can never be redeemed past max_redemptions.
  select * into v_code_row
  from public.unlock_codes
  where code = p_code
  for update;

  if not found then
    raise exception 'invalid_code';
  end if;

  if not v_code_row.active then
    raise exception 'code_inactive';
  end if;

  if v_code_row.expires_at is not null and v_code_row.expires_at < now() then
    raise exception 'code_expired';
  end if;

  -- Make sure the caller has a profile row to grant tiers onto.
  insert into public.profiles (id)
  values (v_uid)
  on conflict (id) do nothing;

  -- Idempotent: re-submitting a code you already redeemed returns your
  -- current tiers without consuming another redemption.
  if exists (
    select 1 from public.unlock_code_redemptions
    where code_id = v_code_row.id and user_id = v_uid
  ) then
    select p.unlocked_tiers into v_new_tiers
    from public.profiles p where p.id = v_uid;
    return query select v_new_tiers;
    return;
  end if;

  if v_code_row.redemptions_count >= v_code_row.max_redemptions then
    raise exception 'code_exhausted';
  end if;

  update public.unlock_codes
  set redemptions_count = redemptions_count + 1
  where id = v_code_row.id
    and redemptions_count < max_redemptions;

  if not found then
    raise exception 'code_exhausted';
  end if;

  insert into public.unlock_code_redemptions (code_id, user_id)
  values (v_code_row.id, v_uid);

  update public.profiles
  set unlocked_tiers = (
        select array_agg(distinct t)
        from unnest(
          coalesce(profiles.unlocked_tiers, array['starter']::text[]) || v_code_row.unlocks
        ) as t
      )
  where id = v_uid
  returning profiles.unlocked_tiers into v_new_tiers;

  return query select v_new_tiers;
end;
$$;

revoke all on function public.redeem_unlock_code(text) from public, anon;
grant execute on function public.redeem_unlock_code(text) to authenticated;

-- ============ Seed data ============
-- Tester code carried over from the prototype: unlocks everything, 100 uses.
insert into public.unlock_codes (code, label, unlocks, max_redemptions)
values ('pham2026', 'Tester access', array['workflows', 'team', 'advanced'], 100);
