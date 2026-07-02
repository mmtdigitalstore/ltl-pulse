alter table public.profiles
  add column if not exists is_team_admin boolean not null default false;

comment on column public.profiles.is_team_admin is
  'When true, user can preview unreleased podcast episodes on-site (team review mode).';
