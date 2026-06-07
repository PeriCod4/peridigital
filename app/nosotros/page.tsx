import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Nosotros",
  description:
    "Somos Campero Digital, una agencia de marketing digital 360 que también potencia sus propias marcas.",
};

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Nosotros"
        title="Una agencia digital 360"
        subtitle="Diseñamos, desarrollamos y hacemos crecer proyectos digitales — incluidos los nuestros."
      />
      <Container className="py-20">
        <div className="mx-auto max-w-3xl space-y-6 text-lg text-gray-700">
          <p>
            En Campero Digital ayudamos a empresas a vender más online: desde la
            web y el ecommerce hasta las campañas, el SEO y el software a medida.
          </p>
          <p>
            No solo trabajamos para clientes:{" "}
            <strong className="text-ink">también potenciamos nuestras propias marcas</strong>,
            lo que nos obliga a dominar de verdad lo que ofrecemos.
          </p>
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/hablemos/"
            className="inline-block rounded-full bg-brand px-7 py-3 font-semibold text-ink hover:bg-brand-dark"
          >
            Trabajemos juntos
          </Link>
        </div>
      </Container>
    </main>
  );
}
