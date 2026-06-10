import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import CalendlyButton from "@/components/CalendlyButton";
import { buttonClasses } from "@/components/Button";
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
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-lg font-semibold text-ink hover:text-brand-text">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <span className="block text-sm text-gray-400">Email</span>
                <a href={`mailto:${SITE.email}`} className="text-lg font-semibold text-ink hover:text-brand-text">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink">O déjanos un mensaje</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Reservas Calendly (popup) */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-ink text-white">
          <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">
                Primera toma de contacto
              </p>
              <h2 className="mt-3 text-3xl font-extrabold">Agenda una reunión de 30 min</h2>
              <p className="mt-4 text-white/75">
                Sin compromiso. Nos cuentas qué buscas y te decimos cómo te podemos
                ayudar. Por videollamada, el día y la hora que mejor te venga.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2"><span className="text-brand">✓</span> 30 minutos, videollamada</li>
                <li className="flex items-center gap-2"><span className="text-brand">✓</span> Sin compromiso ni venta agresiva</li>
                <li className="flex items-center gap-2"><span className="text-brand">✓</span> Confirmación y recordatorio automáticos</li>
              </ul>
              <CalendlyButton className={`mt-8 ${buttonClasses("primary", "md")}`} />
            </div>
            <div className="hidden justify-center lg:flex">
              <div className="flex h-44 w-44 items-center justify-center rounded-full bg-brand/15">
                <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#3ecccb" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
