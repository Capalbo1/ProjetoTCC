import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

/** "/" nunca renderiza conteúdo — só decide pra onde mandar o usuário. */
export function HomeRedirect() {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-ink-soft">
        Carregando…
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;
  if (!profile) return <Navigate to="/login" replace />;

  return <Navigate to={`/${profile.role}`} replace />;
}
