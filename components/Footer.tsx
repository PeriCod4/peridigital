import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { SERVICES, SITE } from "@/lib/site";

const COMPANY_LINKS = [
  { href: "/proyectos-web/", label: "Proyectos" },
  { href: "/nosotros/", label: "Nosotros" },
  { href: "/blog/", label: "Blog" },
  { href: "/hablemos/", label: "Hablemos" },
];

const LEGAL_LINKS = [
  { href: "/aviso-legal/", label: "Aviso legal" },
  { href: "/politica-de-privacidad/", label: "Política de privacidad" },
  { href: "/politica-de-cookies/", label: "Política de cookies" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 bg-ink text-white/70">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/brand/icon_peridigital_blanco.webp" alt="PeriDigital" width={36} height={26} />
              <span className="text-lg font-extrabold text-white">
                Peri<span className="text-brand">Digital</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm">
              Agencia digital 360. Diseño web, ecommerce, software a medida, CRM y
              automatización.
            </p>
            <p className="mt-4 text-sm">
              SEO por{" "}
              <a href={SITE.periseo} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand hover:underline">
                PeriSEO
              </a>
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Servicios</h3>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}/`} className="hover:text-brand">{s.nav}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">PeriDigital</h3>
            <ul className="space-y-2 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Contacto y legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-brand">{SITE.phone}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a>
              </li>
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} PeriDigital. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}
