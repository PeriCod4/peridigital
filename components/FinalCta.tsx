import Container from "./Container";
import CtaButtons from "./CtaButtons";

// Bloque CTA final (dos botones como en la home), antes del footer en todas las páginas.
export default function FinalCta() {
  return (
    <section className="relative z-10 py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/10 to-accent/10 p-10 text-center sm:p-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-ink sm:text-4xl">
            ¿Hablamos de tu proyecto?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Somos partners, no una agencia más. Cuéntanos qué necesitas y te decimos cómo te ayudamos.
          </p>
          <div className="mt-8">
            <CtaButtons />
          </div>
        </div>
      </Container>
    </section>
  );
}
