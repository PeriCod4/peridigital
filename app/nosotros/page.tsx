import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import LeadCta from "@/components/LeadCta";

export const metadata = {
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

        <div className="mt-10 spotlight rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-600 shadow-sm">
          También potenciamos nuestras propias marcas, así que dominamos de verdad lo que ofrecemos.
        </div>
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
