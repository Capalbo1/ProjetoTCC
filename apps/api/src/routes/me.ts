import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";

export const meRouter = Router();

/** Retorna quem é o usuário autenticado e qual o papel dele. */
meRouter.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});
