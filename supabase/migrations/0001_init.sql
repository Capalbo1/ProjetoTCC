-- Perfis de usuário: admin, professor, aluno.
-- Toda a autorização por papel se apoia nesta tabela + RLS.

create type public.app_role as enum ('admin', 'professor', 'aluno');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.app_role not null default 'aluno',
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Um usuário sempre pode ver e atualizar o próprio perfil.
create policy "profiles: usuário lê o próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: usuário atualiza o próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- A policy acima permite ao usuário atualizar sua própria linha, mas
-- SEM restringir quais colunas — sozinha, ela deixaria qualquer um se
-- autopromover a admin. A trigger abaixo bloqueia qualquer mudança de
-- role feita por quem não é admin, não importa qual policy liberou o UPDATE.
create function public.protect_profile_role()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.role <> old.role and not exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ) then
    raise exception 'Apenas administradores podem alterar o papel (role) de um usuário.';
  end if;
  return new;
end;
$$;

create trigger protect_profile_role_trigger
  before update on public.profiles
  for each row execute procedure public.protect_profile_role();

-- Admins enxergam e administram todos os perfis.
create policy "profiles: admin lê todos os perfis"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "profiles: admin atualiza todos os perfis"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Cria o perfil automaticamente quando um novo usuário se cadastra.
-- O papel NUNCA vem do metadata informado pelo próprio usuário no signup
-- (isso permitiria um usuário se autopromover a admin) — todo mundo
-- começa como "aluno" e é promovido depois por um admin (via painel
-- de admin ou diretamente no banco).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    'aluno',
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
