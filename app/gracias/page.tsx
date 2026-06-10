import Container from "@/components/Container";
import Button from "@/components/Button";

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
        <div className="mt-8">
          <Button href="/" withArrow>
            Volver al inicio
          </Button>
        </div>
      </Container>
    </main>
  );
}
