import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Proyectos",
  description: "Algunos de los proyectos web y digitales que hemos desarrollado.",
};

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Proyectos"
        title="Trabajo del que estamos orgullosos"
        subtitle="Webs, tiendas y soluciones digitales para empresas que han confiado en nosotros."
      />
      <Container className="py-20">
        <div className="rounded-2xl bg-brand/10 p-10 text-center">
          <p className="text-lg text-ink">
            Estamos preparando el portfolio en la nueva web. ¿Quieres ver casos
            concretos de tu sector?
          </p>
          <Link
            href="/hablemos/"
            className="mt-6 inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white hover:bg-ink-soft"
          >
            Pídenos ejemplos
          </Link>
        </div>
      </Container>
    </main>
  );
}
