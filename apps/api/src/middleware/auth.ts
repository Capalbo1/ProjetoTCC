import type { NextFunction, Request, Response } from "express";
import type { Role } from "@tcc/shared";
import { supabaseAdmin } from "../lib/supabaseAdmin.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string | null;
        role: Role;
      };
    }
  }
}

/**
 * Espera um header `Authorization: Bearer <access_token>` com o token
 * de sessão do Supabase (o frontend obtém isso via supabase.auth
 * .getSession()). Valida o token, busca o papel do usuário em
 * `profiles` e anexa tudo em `req.user`.
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;

  if (!token) {
    return res.status(401).json({ error: "Token de autenticação ausente." });
  }

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
  if (userError || !userData.user) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .single();

  if (profileError || !profile) {
    return res.status(403).json({ error: "Perfil de usuário não encontrado." });
  }

  req.user = {
    id: userData.user.id,
    email: userData.user.email ?? null,
    role: profile.role as Role,
  };

  next();
}
