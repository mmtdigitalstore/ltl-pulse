create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  lead_magnet text not null,
  tag text not null default 'waitlist',
  source text not null default 'homepage',
  created_at timestamptz not null default now(),
  constraint leads_email_lead_magnet_key unique (email, lead_magnet)
);

create index if not exists leads_lead_magnet_created_at_idx
  on public.leads (lead_magnet, created_at desc);

alter table public.leads enable row level security;
