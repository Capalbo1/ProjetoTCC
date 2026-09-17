import { Navigate, Outlet } from "react-router-dom";
import type { Role } from "@tcc/shared";
import { useAuth } from "./AuthProvider";

export function ProtectedRoute({ allowedRoles }: { allowedRoles: Role[] }) {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-ink-soft">
        Carregando…
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!profile || !allowedRoles.includes(profile.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
