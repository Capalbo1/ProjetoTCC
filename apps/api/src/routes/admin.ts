import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";
import { supabaseAdmin } from "../lib/supabaseAdmin.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("admin"));

adminRouter.get("/admin/users", async (_req, res) => {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("id, role, full_name, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ users: data });
});
