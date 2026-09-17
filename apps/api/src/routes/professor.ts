import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";

export const professorRouter = Router();

professorRouter.use(requireAuth, requireRole("professor", "admin"));

// Placeholder — próximos endpoints aqui: painel de padrões de erro da
// turma, geração de exercícios sob demanda a partir da descrição do
// professor, relatórios de turma, etc.
professorRouter.get("/professor/ping", (_req, res) => {
  res.json({ ok: true, area: "professor" });
});
