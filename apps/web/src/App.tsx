import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { HomeRedirect } from "./pages/HomeRedirect";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProfessorDashboard } from "./pages/professor/ProfessorDashboard";
import { AlunoDashboard } from "./pages/aluno/AlunoDashboard";
import { AdminDashboard } from "./pages/admin/AdminDashboard";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute allowedRoles={["professor"]} />}>
          <Route path="/professor" element={<ProfessorDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["aluno"]} />}>
          <Route path="/aluno" element={<AlunoDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
