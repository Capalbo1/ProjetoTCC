/**
 * Os três perfis de usuário do sistema. Espelha o enum `app_role`
 * definido em supabase/migrations — mantenha os dois em sincronia.
 */
export const ROLES = ["admin", "professor", "aluno"] as const;

export type Role = (typeof ROLES)[number];

export interface Profile {
  id: string; // igual a auth.users.id no Supabase
  role: Role;
  full_name: string | null;
  created_at: string;
}

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}
