import Container from "./Container";
import Reveal from "./motion/Reveal";

// Hero claro centrado, estilo home (badge + título grande). Aurora global de fondo.
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
      <Container className="py-20 text-center sm:py-28">
        <Reveal>
          {eyebrow && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-600">{eyebrow}</span>
            </div>
          )}
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 md:text-xl">{subtitle}</p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
