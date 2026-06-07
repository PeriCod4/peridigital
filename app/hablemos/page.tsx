import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Hablemos",
  description:
    "Cuéntanos tu proyecto: diseño web, ecommerce, software a medida, CRM o automatización. Te respondemos rápido y sin compromiso.",
};

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Hablemos"
        title="El siguiente paso te toca a ti"
        subtitle="Agenda una primera reunión para contarnos qué buscas y qué necesitas. ¡Nos vemos!"
      />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-ink">Escríbenos</h2>
            <p className="mt-3 text-gray-600">
              Te dejamos varias formas de contacto directo:
            </p>
            <ul className="mt-6 space-y-4">
              <li>
                <span className="block text-sm text-gray-400">Teléfono / WhatsApp</span>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-lg font-semibold text-ink hover:text-brand-dark">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <span className="block text-sm text-gray-400">Email</span>
                <a href={`mailto:${SITE.email}`} className="text-lg font-semibold text-ink hover:text-brand-dark">
                  {SITE.email}
                </a>
              </li>
            </ul>
            {/* Reservas Cal.com: se integra en Fase 5 */}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink">O déjanos un mensaje</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
