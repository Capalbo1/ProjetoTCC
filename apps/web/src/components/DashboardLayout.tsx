import type { ReactNode } from "react";
import { useAuth } from "../auth/AuthProvider";

const ROLE_LABEL: Record<string, string> = {
  admin: "Administrador",
  professor: "Professor",
  aluno: "Aluno",
};

export function DashboardLayout({ title, children }: { title: string; children: ReactNode }) {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between border-b border-line bg-chalk-bg-2 px-6 py-4 text-paper">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold">{title}</p>
          {profile && (
            <p className="text-xs uppercase tracking-wide text-chalk-yellow">
              {ROLE_LABEL[profile.role] ?? profile.role}
            </p>
          )}
        </div>
        <button
          onClick={() => signOut()}
          className="rounded-full border border-chalk-yellow px-4 py-1.5 text-sm text-paper transition hover:bg-chalk-yellow hover:text-chalk-bg-2"
        >
          Sair
        </button>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
