# Sistema — Defasagem em Matemática

Sistema de diagnóstico e recomposição de aprendizagem em matemática, com
três perfis de usuário: **aluno**, **professor** e **admin**. Este repositório
também guarda, na raiz (`index.html` + `assets/`), a página estática de
apresentação do projeto de TCC — ela é independente do sistema e não deve
ser movida (é o link já compartilhado com o grupo/orientador).

## Arquitetura

Monorepo com npm workspaces, pensado para depois receber um app mobile
(React Native) sem precisar reestruturar nada:

```
apps/
  web/       React + Vite + TypeScript + Tailwind — painel web (aluno/professor/admin)
  api/       Node.js + Express + TypeScript — regras de negócio e operações privilegiadas
packages/
  shared/    Tipos e constantes compartilhados (papéis de usuário, etc.)
supabase/
  migrations/  Schema do banco: papéis, tabela de perfis, RLS
index.html   Página de apresentação do TCC (não faz parte do sistema)
assets/      Imagens usadas pela página de apresentação
```

### Por que web fala com o Supabase diretamente **e** com uma API Node?

- **Supabase direto do frontend** (`apps/web`): autenticação, leitura/escrita
  de dados protegidos por Row Level Security (RLS) — cada usuário só vê o que
  a política do banco permite pro papel dele. Rápido de desenvolver, sem
  reinventar CRUD.
- **API Node** (`apps/api`): tudo que não deve rodar no navegador — chamadas
  a modelos de IA (classificação de erro, geração de exercícios sob
  demanda), agregações pesadas pra relatório de turma, e qualquer operação
  que precise da `service_role key` (que ignora RLS e nunca pode ir pro
  cliente).

### Os três perfis

Definidos em `supabase/migrations/0001_init.sql` (enum `app_role`) e
espelhados em `packages/shared/src/types.ts`. Todo cadastro novo começa como
`aluno` — ninguém se autopromove: só um admin muda o papel de alguém (uma
trigger no banco bloqueia a tentativa). Veja `supabase/README.md`.

## Configurando pela primeira vez

```bash
npm install
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

Preencha os dois `.env` com as chaves do seu projeto Supabase (veja
`supabase/README.md` — ainda não criamos um projeto, é só seguir o passo a
passo lá quando for a hora).

```bash
npm run dev:web   # http://localhost:5173
npm run dev:api   # http://localhost:3333
```

## Mobile (mais pra frente)

Quando chegar a hora, o plano é **React Native com Expo**: reaproveita o
mesmo React/TypeScript do time, compartilha os tipos de `packages/shared`
com o app mobile, e o Expo facilita gerar build pra Android/iOS sem
precisar mexer em código nativo direto. Nessa hora criamos `apps/mobile/`
do lado de `apps/web/`, sem afetar o que já existe.
