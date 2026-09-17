import type { NextFunction, Request, Response } from "express";
import type { Role } from "@tcc/shared";

/** Use depois de `requireAuth`. Bloqueia quem não tem um dos papéis permitidos. */
export function requireRole(...allowed: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Não autenticado." });
    }
    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ error: "Você não tem permissão para acessar este recurso." });
    }
    next();
  };
}
