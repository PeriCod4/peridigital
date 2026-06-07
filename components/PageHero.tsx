import Container from "./Container";
import Aurora from "./Aurora";
import Reveal from "./motion/Reveal";

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
    <section className="relative overflow-hidden bg-ink text-white">
      <Aurora />
      <Container className="relative py-20 sm:py-24">
        <Reveal>
          {eyebrow && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg text-white/75">{subtitle}</p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
