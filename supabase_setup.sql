-- Run this in Supabase Dashboard → SQL Editor

-- 1. profiles table
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  avatar_url  text,
  provider    text,                         -- 'google' | 'linkedin_oidc'
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 2. Row-level security: users can only read/write their own row
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can upsert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 3. Auto-insert on new auth user (trigger)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, provider)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_app_meta_data->>'provider'
  )
  on conflict (id) do update set
    email      = excluded.email,
    full_name  = excluded.full_name,
    avatar_url = excluded.avatar_url,
    provider   = excluded.provider,
    updated_at = now();
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Onboarding preference columns (run this if profiles table already exists)
alter table public.profiles
  add column if not exists language        text    default null,
  add column if not exists region          text    default null,
  add column if not exists onboarding_done boolean default false not null;
