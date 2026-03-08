-- Extensions
create extension if not exists "pgcrypto";

-- Enums
create type public.account_phase as enum ('phase_1', 'phase_2', 'evaluation', 'funded');
create type public.account_status as enum ('active', 'review', 'passed', 'failed', 'funded', 'suspended', 'locked');
create type public.role_key as enum ('client', 'support', 'risk_admin', 'admin', 'super_admin');
create type public.payout_status as enum ('requested', 'under_review', 'approved', 'rejected', 'paid', 'cancelled');
create type public.review_status as enum ('queued', 'in_review', 'approved', 'rejected', 'needs_changes');
create type public.task_status as enum ('todo', 'in_progress', 'blocked', 'done');
create type public.payment_event_type as enum ('challenge_purchase', 'payout', 'refund', 'chargeback');

-- Common trigger for updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  phone text,
  country text,
  timezone text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- user_roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.role_key not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

-- challenge_templates
create table public.challenge_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  starting_balance numeric(14,2) not null check (starting_balance > 0),
  profit_target_pct numeric(8,4) not null check (profit_target_pct > 0),
  daily_drawdown_pct numeric(8,4) not null check (daily_drawdown_pct > 0),
  max_drawdown_pct numeric(8,4) not null check (max_drawdown_pct > 0),
  max_lot_size numeric(12,4),
  max_open_positions integer,
  phase_count integer not null default 1 check (phase_count > 0),
  fee_amount numeric(14,2) not null default 0,
  currency text not null default 'USD',
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_challenge_templates_updated_at
before update on public.challenge_templates
for each row execute function public.set_updated_at();

-- challenge_purchases
create table public.challenge_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  challenge_template_id uuid not null references public.challenge_templates(id),
  stripe_payment_intent_id text,
  amount numeric(14,2) not null,
  currency text not null default 'USD',
  status text not null default 'pending',
  purchased_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_challenge_purchases_updated_at
before update on public.challenge_purchases
for each row execute function public.set_updated_at();

-- trading_accounts
create table public.trading_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  challenge_purchase_id uuid references public.challenge_purchases(id) on delete set null,
  challenge_template_id uuid not null references public.challenge_templates(id),
  account_number text not null unique,
  broker_name text,
  platform_name text,
  balance numeric(16,2) not null,
  equity numeric(16,2) not null,
  phase public.account_phase not null default 'phase_1',
  status public.account_status not null default 'active',
  profit_target numeric(16,2) not null,
  daily_drawdown numeric(16,2) not null,
  max_drawdown numeric(16,2) not null,
  locked_reason text,
  passed_at timestamptz,
  funded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_trading_accounts_user_id on public.trading_accounts(user_id);
create index idx_trading_accounts_status on public.trading_accounts(status);

create trigger trg_trading_accounts_updated_at
before update on public.trading_accounts
for each row execute function public.set_updated_at();

-- account_rules
create table public.account_rules (
  id uuid primary key default gen_random_uuid(),
  trading_account_id uuid not null references public.trading_accounts(id) on delete cascade,
  max_daily_loss numeric(16,2) not null,
  max_total_loss numeric(16,2) not null,
  profit_target numeric(16,2) not null,
  min_trading_days integer,
  max_position_size numeric(14,4),
  max_open_positions integer,
  allow_weekend_holding boolean not null default false,
  allow_news_trading boolean not null default true,
  effective_from timestamptz not null default now(),
  effective_to timestamptz,
  created_at timestamptz not null default now(),
  unique (trading_account_id, effective_from)
);

-- account_metrics
create table public.account_metrics (
  id uuid primary key default gen_random_uuid(),
  trading_account_id uuid not null references public.trading_accounts(id) on delete cascade,
  as_of timestamptz not null default now(),
  realized_pnl numeric(16,2) not null default 0,
  unrealized_pnl numeric(16,2) not null default 0,
  total_return_pct numeric(10,4) not null default 0,
  daily_return_pct numeric(10,4) not null default 0,
  win_rate_pct numeric(10,4),
  profit_factor numeric(10,4),
  expectancy numeric(12,4),
  max_consecutive_losses integer,
  consistency_score numeric(10,4),
  created_at timestamptz not null default now(),
  unique (trading_account_id, as_of)
);

create index idx_account_metrics_account_as_of on public.account_metrics(trading_account_id, as_of desc);

-- daily_snapshots
create table public.daily_snapshots (
  id uuid primary key default gen_random_uuid(),
  trading_account_id uuid not null references public.trading_accounts(id) on delete cascade,
  snapshot_date date not null,
  balance numeric(16,2) not null,
  equity numeric(16,2) not null,
  daily_pnl numeric(16,2) not null default 0,
  drawdown numeric(16,2) not null default 0,
  open_positions integer not null default 0,
  closed_trades integer not null default 0,
  created_at timestamptz not null default now(),
  unique (trading_account_id, snapshot_date)
);

-- trade_events
create table public.trade_events (
  id uuid primary key default gen_random_uuid(),
  trading_account_id uuid not null references public.trading_accounts(id) on delete cascade,
  external_trade_id text,
  symbol text not null,
  side text not null,
  quantity numeric(14,4) not null,
  entry_price numeric(16,6) not null,
  exit_price numeric(16,6),
  pnl numeric(16,2),
  commission numeric(16,2),
  swap numeric(16,2),
  opened_at timestamptz not null,
  closed_at timestamptz,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_trade_events_account_opened_at on public.trade_events(trading_account_id, opened_at desc);

-- open_positions
create table public.open_positions (
  id uuid primary key default gen_random_uuid(),
  trading_account_id uuid not null references public.trading_accounts(id) on delete cascade,
  trade_event_id uuid references public.trade_events(id) on delete set null,
  symbol text not null,
  side text not null,
  quantity numeric(14,4) not null,
  average_entry_price numeric(16,6) not null,
  mark_price numeric(16,6),
  unrealized_pnl numeric(16,2),
  opened_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_open_positions_updated_at
before update on public.open_positions
for each row execute function public.set_updated_at();

-- payout_requests
create table public.payout_requests (
  id uuid primary key default gen_random_uuid(),
  trading_account_id uuid not null references public.trading_accounts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(16,2) not null check (amount > 0),
  currency text not null default 'USD',
  status public.payout_status not null default 'requested',
  requested_at timestamptz not null default now(),
  processed_at timestamptz,
  payout_method text,
  payout_reference text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_payout_requests_user_status on public.payout_requests(user_id, status);

create trigger trg_payout_requests_updated_at
before update on public.payout_requests
for each row execute function public.set_updated_at();

-- payout_reviews
create table public.payout_reviews (
  id uuid primary key default gen_random_uuid(),
  payout_request_id uuid not null unique references public.payout_requests(id) on delete cascade,
  reviewer_id uuid references public.profiles(id) on delete set null,
  status public.review_status not null default 'queued',
  reviewed_at timestamptz,
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_payout_reviews_updated_at
before update on public.payout_reviews
for each row execute function public.set_updated_at();

-- account_reviews
create table public.account_reviews (
  id uuid primary key default gen_random_uuid(),
  trading_account_id uuid not null references public.trading_accounts(id) on delete cascade,
  reviewer_id uuid references public.profiles(id) on delete set null,
  status public.review_status not null default 'queued',
  reason text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_account_reviews_status on public.account_reviews(status);

create trigger trg_account_reviews_updated_at
before update on public.account_reviews
for each row execute function public.set_updated_at();

-- admin_notes
create table public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  user_id uuid references public.profiles(id) on delete set null,
  trading_account_id uuid references public.trading_accounts(id) on delete cascade,
  payout_request_id uuid references public.payout_requests(id) on delete cascade,
  note text not null,
  is_internal boolean not null default true,
  created_at timestamptz not null default now()
);

-- crm_contacts
create table public.crm_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  owner_id uuid references public.profiles(id) on delete set null,
  lifecycle_stage text not null default 'lead',
  source text,
  risk_score integer,
  tags text[] not null default '{}',
  last_contact_at timestamptz,
  next_follow_up_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create trigger trg_crm_contacts_updated_at
before update on public.crm_contacts
for each row execute function public.set_updated_at();

-- crm_tasks
create table public.crm_tasks (
  id uuid primary key default gen_random_uuid(),
  crm_contact_id uuid not null references public.crm_contacts(id) on delete cascade,
  assigned_to uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  due_at timestamptz,
  status public.task_status not null default 'todo',
  priority smallint not null default 3 check (priority between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_crm_tasks_updated_at
before update on public.crm_tasks
for each row execute function public.set_updated_at();

-- account_status_history
create table public.account_status_history (
  id uuid primary key default gen_random_uuid(),
  trading_account_id uuid not null references public.trading_accounts(id) on delete cascade,
  from_status public.account_status,
  to_status public.account_status not null,
  reason text,
  changed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index idx_account_status_history_account_created_at
on public.account_status_history(trading_account_id, created_at desc);

-- payment_events
create table public.payment_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  challenge_purchase_id uuid references public.challenge_purchases(id) on delete set null,
  payout_request_id uuid references public.payout_requests(id) on delete set null,
  event_type public.payment_event_type not null,
  provider text not null default 'stripe',
  provider_event_id text,
  amount numeric(16,2) not null,
  currency text not null default 'USD',
  status text not null,
  payload jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index idx_payment_events_user_occurred_at
on public.payment_events(user_id, occurred_at desc);

-- Auto-create profile on auth user insert
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'client')
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.challenge_templates enable row level security;
alter table public.challenge_purchases enable row level security;
alter table public.trading_accounts enable row level security;
alter table public.account_rules enable row level security;
alter table public.account_metrics enable row level security;
alter table public.daily_snapshots enable row level security;
alter table public.trade_events enable row level security;
alter table public.open_positions enable row level security;
alter table public.payout_requests enable row level security;
alter table public.payout_reviews enable row level security;
alter table public.account_reviews enable row level security;
alter table public.admin_notes enable row level security;
alter table public.crm_contacts enable row level security;
alter table public.crm_tasks enable row level security;
alter table public.account_status_history enable row level security;
alter table public.payment_events enable row level security;

-- Basic self-service policies
create policy "profiles_select_own" on public.profiles
for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
for update using (auth.uid() = id);

create policy "challenge_templates_read_all" on public.challenge_templates
for select using (true);

create policy "challenge_purchases_own" on public.challenge_purchases
for all using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "trading_accounts_own" on public.trading_accounts
for select using (auth.uid() = user_id);

create policy "account_rules_own" on public.account_rules
for select using (
  exists (
    select 1 from public.trading_accounts ta
    where ta.id = account_rules.trading_account_id and ta.user_id = auth.uid()
  )
);

create policy "account_metrics_own" on public.account_metrics
for select using (
  exists (
    select 1 from public.trading_accounts ta
    where ta.id = account_metrics.trading_account_id and ta.user_id = auth.uid()
  )
);

create policy "daily_snapshots_own" on public.daily_snapshots
for select using (
  exists (
    select 1 from public.trading_accounts ta
    where ta.id = daily_snapshots.trading_account_id and ta.user_id = auth.uid()
  )
);

create policy "trade_events_own" on public.trade_events
for select using (
  exists (
    select 1 from public.trading_accounts ta
    where ta.id = trade_events.trading_account_id and ta.user_id = auth.uid()
  )
);

create policy "open_positions_own" on public.open_positions
for select using (
  exists (
    select 1 from public.trading_accounts ta
    where ta.id = open_positions.trading_account_id and ta.user_id = auth.uid()
  )
);

create policy "payout_requests_own" on public.payout_requests
for all using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "payout_reviews_related_own" on public.payout_reviews
for select using (
  exists (
    select 1
    from public.payout_requests pr
    where pr.id = payout_reviews.payout_request_id and pr.user_id = auth.uid()
  )
);

create policy "account_reviews_related_own" on public.account_reviews
for select using (
  exists (
    select 1
    from public.trading_accounts ta
    where ta.id = account_reviews.trading_account_id and ta.user_id = auth.uid()
  )
);

create policy "admin_notes_related_own" on public.admin_notes
for select using (
  (user_id = auth.uid())
  or exists (
    select 1 from public.trading_accounts ta
    where ta.id = admin_notes.trading_account_id and ta.user_id = auth.uid()
  )
);

create policy "crm_contacts_own" on public.crm_contacts
for select using (auth.uid() = user_id);

create policy "crm_tasks_own" on public.crm_tasks
for select using (
  exists (
    select 1 from public.crm_contacts cc
    where cc.id = crm_tasks.crm_contact_id and cc.user_id = auth.uid()
  )
);

create policy "account_status_history_own" on public.account_status_history
for select using (
  exists (
    select 1 from public.trading_accounts ta
    where ta.id = account_status_history.trading_account_id and ta.user_id = auth.uid()
  )
);

create policy "payment_events_own" on public.payment_events
for select using (auth.uid() = user_id);
