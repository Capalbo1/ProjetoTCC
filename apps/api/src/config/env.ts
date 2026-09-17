import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  PORT: z.coerce.number().default(3333),
  WEB_ORIGIN: z.string().default("http://localhost:5173"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Variáveis de ambiente inválidas ou ausentes em apps/api/.env:");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Configuração de ambiente inválida. Copie apps/api/.env.example para apps/api/.env e preencha os valores.");
}

export const env = parsed.data;
