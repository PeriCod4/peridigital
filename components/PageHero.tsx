import Container from "./Container";
import Reveal from "./motion/Reveal";

// Hero claro: el fondo aurora es global (layout), aquí solo el contenido.
export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative text-ink">
      <Container className="py-20 sm:py-24">
        <Reveal>
          {eyebrow && (
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-text">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg text-gray-600">{subtitle}</p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
