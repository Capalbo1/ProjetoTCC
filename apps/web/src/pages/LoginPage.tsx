import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export function LoginPage() {
  const { session, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (session) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) setError(error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-chalk-bg px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-paper p-8 shadow-xl"
      >
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          Entrar
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Sistema de diagnóstico e recomposição em matemática
        </p>

        <label className="mt-6 block text-sm font-medium text-ink">
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-ink outline-none focus:border-chalk-yellow"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-ink">
          Senha
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-ink outline-none focus:border-chalk-yellow"
          />
        </label>

        {error && <p className="mt-4 text-sm text-pen-red">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-chalk-bg py-2.5 font-medium text-paper transition hover:bg-chalk-bg-2 disabled:opacity-60"
        >
          {submitting ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
