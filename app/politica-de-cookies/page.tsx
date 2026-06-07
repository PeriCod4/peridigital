import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Política de Cookies",
  description: "Política de cookies de Campero Digital.",
  alternates: { canonical: "/politica-de-cookies/" },
  robots: { index: false },
};

export default function Page() {
  return <LegalPage slug="politica-de-cookies" />;
}
