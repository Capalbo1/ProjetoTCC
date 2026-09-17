import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";

/**
 * Cliente Supabase com a service_role key: ignora RLS.
 * Use apenas em operações do backend que realmente precisam de
 * privilégio total (ex: promover um usuário, gerar relatórios
 * agregados da turma). Nunca envie esse client/chave para o frontend.
 */
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
