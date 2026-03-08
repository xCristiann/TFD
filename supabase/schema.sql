-- Supabase schema for TheFundedDiaries
-- Run in Supabase SQL editor or via migration tools.

create extension if not exists "uuid-ossp";

create type public.app_role as enum ('client', 'admin', 'support', 'risk_manager');
create type public.trading_account_phase as enum ('challenge', 'verification', 'funded');
create type public.trading_account_status as enum ('active', 'review', 'passed', 'failed', 'funded', 'locked');
create type public.payout_status as enum ('pending', 'approved', 'rejected', 'paid');
create type public.review_status as enum ('pending', 'in_review', 'approved', 'rejected');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  phone text,
  timezone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null default 'client',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create table if not exists public.challenge_templates (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  initial_balance numeric(14,2) not null check (initial_balance > 0),
  profit_target_percent numeric(6,2) not null check (profit_target_percent > 0),
  daily_drawdown_percent numeric(6,2) not null check (daily_drawdown_percent > 0),
  max_drawdown_percent numeric(6,2) not null check (max_drawdown_percent > 0),
  price_usd numeric(14,2) not null check (price_usd >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trading_accounts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  challenge_template_id uuid references public.challenge_templates(id) on delete set null,
  account_number text not null unique,
  phase public.trading_account_phase not null default 'challenge',
  status public.trading_account_status not null default 'active',
  balance numeric(14,2) not null default 0,
  equity numeric(14,2) not null default 0,
  profit_target numeric(14,2) not null,
  daily_drawdown numeric(14,2) not null,
  max_drawdown numeric(14,2) not null,
  started_at timestamptz,
  passed_at timestamptz,
  locked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists trading_accounts_user_id_idx on public.trading_accounts(user_id);
create index if not exists trading_accounts_status_idx on public.trading_accounts(status);

create table if not exists public.account_rules (
  id uuid primary key default uuid_generate_v4(),
  trading_account_id uuid not null references public.trading_accounts(id) on delete cascade,
  rule_name text not null,
  rule_value numeric(14,4),
  rule_unit text,
  is_breached boolean not null default false,
  breached_at timestamptz,
  created_at timestamptz not null default now(),
  unique (trading_account_id, rule_name)
);

create table if not exists public.account_metrics (
  id uuid primary key default uuid_generate_v4(),
  trading_account_id uuid not null references public.trading_accounts(id) on delete cascade,
  metric_timestamp timestamptz not null default now(),
  balance numeric(14,2) not null,
  equity numeric(14,2) not null,
  daily_pnl numeric(14,2) not null default 0,
  total_pnl numeric(14,2) not null default 0,
  drawdown numeric(14,2) not null default 0,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists account_metrics_account_timestamp_idx
  on public.account_metrics(trading_account_id, metric_timestamp desc);

create table if not exists public.payout_requests (
  id uuid primary key default uuid_generate_v4(),
  trading_account_id uuid not null references public.trading_accounts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(14,2) not null check (amount > 0),
  status public.payout_status not null default 'pending',
  requested_at timestamptz not null default now(),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  notes text
);

create index if not exists payout_requests_user_id_idx on public.payout_requests(user_id);
create index if not exists payout_requests_status_idx on public.payout_requests(status);

create table if not exists public.account_reviews (
  id uuid primary key default uuid_generate_v4(),
  trading_account_id uuid not null references public.trading_accounts(id) on delete cascade,
  requested_by uuid not null references public.profiles(id) on delete cascade,
  assigned_to uuid references public.profiles(id) on delete set null,
  review_status public.review_status not null default 'pending',
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists account_reviews_status_idx on public.account_reviews(review_status);

create table if not exists public.admin_notes (
  id uuid primary key default uuid_generate_v4(),
  account_review_id uuid references public.account_reviews(id) on delete cascade,
  trading_account_id uuid references public.trading_accounts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  note text not null,
  is_internal boolean not null default true,
  created_at timestamptz not null default now()
);

create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_challenge_templates_updated_at
before update on public.challenge_templates
for each row execute function public.set_updated_at();

create trigger set_trading_accounts_updated_at
before update on public.trading_accounts
for each row execute function public.set_updated_at();

create trigger set_account_reviews_updated_at
before update on public.account_reviews
for each row execute function public.set_updated_at();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'client')
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.trading_accounts enable row level security;
alter table public.account_rules enable row level security;
alter table public.account_metrics enable row level security;
alter table public.payout_requests enable row level security;
alter table public.account_reviews enable row level security;
alter table public.admin_notes enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can view own trading accounts"
  on public.trading_accounts for select
  using (auth.uid() = user_id);

create policy "Users can view own account metrics"
  on public.account_metrics for select
  using (
    exists (
      select 1 from public.trading_accounts ta
      where ta.id = account_metrics.trading_account_id
      and ta.user_id = auth.uid()
    )
  );

create policy "Users can create own payout requests"
  on public.payout_requests for insert
  with check (auth.uid() = user_id);

create policy "Users can view own payout requests"
  on public.payout_requests for select
  using (auth.uid() = user_id);
