import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import Spotlight from "@/components/fx/Spotlight";
import AuroraBackground from "@/components/fx/AuroraBackground";
import FinalCta from "@/components/FinalCta";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://camperodigital.com"),
  title: {
    default: "Campero Digital — Agencia de marketing digital 360",
    template: "%s | Campero Digital",
  },
  description:
    "Diseño web, ecommerce, software a medida, CRM y automatización, SEO y mantenimiento. Páginas web que venden y soluciones digitales para tu negocio.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Campero Digital",
    url: "https://camperodigital.com",
    title: "Campero Digital — Agencia digital 360",
    description:
      "Webs que venden, software a medida, CRM y automatización, SEO y mantenimiento.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campero Digital — Agencia digital 360",
    description:
      "Webs que venden, software a medida, CRM y automatización, SEO y mantenimiento.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white" suppressHydrationWarning>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <AuroraBackground />
        <Header />
        <div className="relative z-10 flex-1">{children}</div>
        <FinalCta />
        <Footer />
        <CookieConsent />
        <Analytics />
        <Spotlight />
      </body>
    </html>
  );
}
