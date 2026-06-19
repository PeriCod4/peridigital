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
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ChatWidget from "@/components/ChatWidget";
import { MotionConfig } from "motion/react";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peridigital.es"),
  title: {
    default: "PeriDigital — Agencia de marketing digital 360",
    template: "%s | PeriDigital",
  },
  description:
    "Diseño web, ecommerce, software a medida, CRM y automatización, SEO y mantenimiento. Páginas web que venden y soluciones digitales para tu negocio.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "PeriDigital",
    url: "https://peridigital.es",
    title: "PeriDigital — Agencia digital 360",
    description:
      "Webs que venden, software a medida, CRM y automatización, SEO y mantenimiento.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PeriDigital — Agencia digital 360",
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
        {/* reducedMotion="user": respeta prefers-reduced-motion en todas las animaciones */}
        <MotionConfig reducedMotion="user">
          <AuroraBackground />
          <Header />
          <div className="relative z-10 flex-1">{children}</div>
          <Footer />
          <CookieConsent />
          <Analytics />
          <Spotlight />
          <WhatsAppFloat />
          <ChatWidget />
        </MotionConfig>
      </body>
    </html>
  );
}
