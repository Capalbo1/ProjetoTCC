import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@tcc/shared";
import { DashboardLayout } from "../../components/DashboardLayout";
import { supabase } from "../../lib/supabaseClient";

export function AdminDashboard() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin", "profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, role, full_name, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Profile[];
    },
  });

  return (
    <DashboardLayout title="Painel do Administrador">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
        Usuários
      </h2>
      {isLoading && <p className="mt-4 text-ink-soft">Carregando…</p>}
      {users && (
        <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-white">
          {users.map((u) => (
            <li key={u.id} className="flex items-center justify-between px-4 py-3">
              <span className="text-ink">{u.full_name ?? u.id}</span>
              <span className="rounded-full bg-paper-2 px-3 py-1 text-xs uppercase tracking-wide text-ink-soft">
                {u.role}
              </span>
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  );
}
