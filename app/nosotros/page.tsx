import Container from "@/components/Container";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import LeadCta from "@/components/LeadCta";

export const metadata = {
  ...pageMeta("/nosotros/"),
  title: "Nosotros",
  description:
    "No somos una agencia más: somos tu equipo de marketing digital. Cercanía, claridad y resultados, sin tecnicismos ni mareos.",
};

const HOW = [
  ["Eficientes", "Sin mareos, sin mil reuniones que no llevan a nada, ni prometerte cielo y tierra y que luego pasen meses hasta ver una nube."],
  ["Con ganas", "Antes que profesionales, somos apasionados de lo que hacemos, y eso se traduce en resultados. No trabajamos para ti, sino contigo."],
  ["Sin mareos", "Las cosas claras. No estamos para contar cuentos: vamos a lo que necesitas, sin presentaciones eternas."],
  ["Una persona para ti", "Sin estructura piramidal. Tendrás a uno de nosotros que hará de comercial, diseñador, portavoz y todos los roles que necesites."],
];

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Nosotros"
        title="Lo que somos, sin trampas ni cartón"
        subtitle="Al igual que tú, somos personas."
      />
      <Container className="py-16">
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              Somos un grupo de jóvenes, cada uno especializado en un área del
              marketing digital, para abordarlas todas y ofrecer un servicio{" "}
              <strong className="text-ink">360</strong> que os facilite la vida:
              menos gestiones, menos reuniones innecesarias y menos historias.
            </p>
            <p>
              Venimos de un amplio recorrido en agencias de marketing digital, y
              lo que hemos sacado en común es <strong className="text-ink">cómo
              no queremos hacer las cosas</strong>: como las hacen muchas
              agencias.
            </p>
            <p>
              ¿Somos una agencia? No. No trabajamos para nadie:{" "}
              <strong className="text-ink">somos partners</strong>. Hacemos crecer
              negocios implicándonos en ellos como si fueran nuestros.
            </p>
            <p>
              Venimos del marketing digital y nos cansamos de lo mismo: informes
              que nadie aplica, reuniones eternas y agencias que prometen y no
              entregan. Así que montamos algo distinto, uniendo dos mitades que
              normalmente van por separado: un{" "}
              <strong className="text-ink">equipo que pone la estrategia y el
              criterio</strong>, y{" "}
              <strong className="text-ink">tecnología propia de IA y software a
              medida</strong>{" "}
              que ejecuta el trabajo repetitivo a una escala imposible para una
              agencia tradicional.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-gray-700">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Nuestra misión</h2>
            <p>
              Creemos que el buen marketing —y la buena tecnología— no deberían
              ser una caja negra ni un lujo reservado a quien puede pagar una gran
              agencia. Nuestra misión es{" "}
              <strong className="text-ink">democratizar lo que de verdad hace
              crecer un negocio</strong>: desde una pyme local hasta una startup
              en plena escala, que cualquiera pueda tener web, publicidad,
              software y automatización serios, bien ejecutados y a un precio
              justo.
            </p>
            <p>
              Usamos la IA y el desarrollo propio para hacer en minutos el trabajo
              manual que a otros les lleva días, y dedicamos el tiempo de las
              personas a lo que importa: estrategia, criterio y relación contigo.
              Medimos todo con <strong className="text-ink">datos reales, no con
              promesas</strong>, y trabajamos para que te quedes por los
              resultados, no por un contrato de permanencia.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {HOW.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="spotlight h-full rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                <h2 className="text-xl font-bold text-ink">{t}</h2>
                <p className="mt-3 text-gray-600">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 spotlight rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">No solo lo ofrecemos: lo construimos</h2>
            <p className="mt-3 text-gray-600">
              La mejor prueba de que dominamos lo que vendemos es que lo usamos en
              nuestras propias marcas y productos. No teorizamos sobre marketing y
              software: lo construimos, lo lanzamos y lo escalamos.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <h3 className="font-bold text-ink">PeriSEO</h3>
                <p className="mt-2 text-sm text-gray-600">Nuestro SaaS de SEO con IA: auditorías, contenido y seguimiento de posiciones en automático.</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <h3 className="font-bold text-ink">PeriCheck</h3>
                <p className="mt-2 text-sm text-gray-600">CRM con facturación legal VERI*FACTU y automatizaciones, todo en una plataforma.</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <h3 className="font-bold text-ink">Kelindas</h3>
                <p className="mt-2 text-sm text-gray-600">Marca propia de moda y ecommerce que creamos, posicionamos y gestionamos de principio a fin.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      <LeadCta
        title="¿Trabajamos juntos?"
        subtitle="Si buscas un partner que se implique como si tu negocio fuera suyo, hablemos. Sin tecnicismos ni mareos."
        context="Nosotros"
        submitLabel="Quiero conoceros"
        messagePlaceholder="Cuéntanos sobre ti y tu negocio…"
      />
    </main>
  );
}
