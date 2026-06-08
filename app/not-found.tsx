import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <main className="bg-ink text-white">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-7xl font-extrabold text-brand">404</p>
        <h1 className="mt-4 text-2xl font-bold">Esta página se nos ha escapado</h1>
        <p className="mt-3 max-w-md text-white/70">
          La URL que buscas no existe o se ha movido. Pero hay mucho que ver.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-full bg-brand px-6 py-3 font-semibold text-ink transition-transform hover:scale-105">
            Volver al inicio
          </Link>
          <Link href="/hablemos/" className="rounded-full border border-white/25 px-6 py-3 font-semibold text-white hover:border-brand">
            Hablemos
          </Link>
        </div>
      </Container>
    </main>
  );
}
