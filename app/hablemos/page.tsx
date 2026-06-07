import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Hablemos",
  description:
    "Cuéntanos tu proyecto. Diseño web, ecommerce, marketing digital y software a medida.",
};

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Hablemos"
        title="Cuéntanos tu proyecto"
        subtitle="Te respondemos rápido y sin compromiso."
      />
      <Container className="py-16">
        <div className="mx-auto max-w-xl">
          <ContactForm />
          {/* Reservas Cal.com: se integra en Fase 5 */}
        </div>
      </Container>
    </main>
  );
}
