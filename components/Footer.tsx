import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { NAV_LINKS } from "./nav";

const LEGAL_LINKS = [
  { href: "/aviso-legal/", label: "Aviso legal" },
  { href: "/politica-de-privacidad/", label: "Política de privacidad" },
  { href: "/politica-de-cookies/", label: "Política de cookies" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white/70">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Image
                src="/brand/icon_campero_digital_blanco.webp"
                alt="Campero Digital"
                width={36}
                height={26}
              />
              <span className="text-lg font-extrabold text-white">
                Campero<span className="text-brand">Digital</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm">
              Agencia de marketing digital 360. Diseño web, ecommerce, paid media,
              SEO y software a medida.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Navegación</h3>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} Campero Digital. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}
