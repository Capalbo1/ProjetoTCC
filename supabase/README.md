# Supabase

Este projeto ainda não está conectado a nenhum projeto Supabase — os arquivos
aqui são o ponto de partida do banco de dados.

## Estrutura

- `migrations/0001_init.sql` — cria o enum de papéis (`admin`, `professor`,
  `aluno`), a tabela `profiles` (um perfil por usuário autenticado), as
  políticas de RLS e as triggers que criam o perfil automaticamente no
  cadastro e impedem que um usuário se autopromova.

## Como conectar um projeto

1. Crie um projeto em [supabase.com](https://supabase.com) (ou peça pra eu
   criar um via MCP quando você quiser).
2. Copie a **Project URL** e a **anon/publishable key** em
   *Project Settings → API* e cole em `apps/web/.env` (veja
   `apps/web/.env.example`).
3. Copie também a **service_role key** (fica só no backend, nunca no
   frontend) para `apps/api/.env` (veja `apps/api/.env.example`).
4. Rode o SQL de `migrations/0001_init.sql` no **SQL Editor** do painel do
   Supabase (copiar e colar já resolve). Se preferir usar a CLI oficial:

   ```bash
   npx supabase login
   npx supabase link --project-ref <seu-project-ref>
   npx supabase db push
   ```

## Promovendo um usuário a professor ou admin

Por segurança, todo cadastro novo começa como `aluno` — ninguém pode se
autopromover (isso é bloqueado por uma trigger). Para promover alguém,
rode como admin no SQL Editor:

```sql
update public.profiles set role = 'professor' where id = '<uuid-do-usuário>';
```

Mais pra frente, isso vira uma ação dentro do painel de admin em vez de SQL manual.
