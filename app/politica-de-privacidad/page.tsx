import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de Campero Digital.",
  alternates: { canonical: "/politica-de-privacidad/" },
  robots: { index: false },
};

export default function Page() {
  return <LegalPage slug="politica-de-privacidad" />;
}
