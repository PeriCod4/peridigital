import Link from "next/link";
import Container from "@/components/Container";

export const metadata = {
  title: "Gracias",
  description: "Hemos recibido tu mensaje.",
  robots: { index: false },
};

export default function Page() {
  return (
    <main className="bg-ink text-white">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-3xl text-ink">✓</div>
        <h1 className="mt-6 text-3xl font-extrabold">¡Gracias!</h1>
        <p className="mt-3 max-w-md text-white/70">
          Hemos recibido tu mensaje. Te responderemos lo antes posible.
        </p>
        <Link href="/" className="mt-8 rounded-full bg-brand px-6 py-3 font-semibold text-ink transition-transform hover:scale-105">
          Volver al inicio
        </Link>
      </Container>
    </main>
  );
}
