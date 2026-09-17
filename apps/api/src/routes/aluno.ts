import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";

export const alunoRouter = Router();

alunoRouter.use(requireAuth, requireRole("aluno", "admin"));

// Placeholder — próximos endpoints aqui: diagnóstico inicial,
// atividades de recomposição, prática gamificada.
alunoRouter.get("/aluno/ping", (_req, res) => {
  res.json({ ok: true, area: "aluno" });
});
