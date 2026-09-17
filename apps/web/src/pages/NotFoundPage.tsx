import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-paper text-center">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">
        Página não encontrada
      </h1>
      <Link to="/" className="text-pen-red underline">
        Voltar ao início
      </Link>
    </div>
  );
}
