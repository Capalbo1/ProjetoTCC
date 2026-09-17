import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { healthRouter } from "./routes/health.js";
import { meRouter } from "./routes/me.js";
import { professorRouter } from "./routes/professor.js";
import { alunoRouter } from "./routes/aluno.js";
import { adminRouter } from "./routes/admin.js";

export const app = express();

app.use(cors({ origin: env.WEB_ORIGIN }));
app.use(express.json());

app.use(healthRouter);
app.use(meRouter);
app.use(professorRouter);
app.use(alunoRouter);
app.use(adminRouter);
