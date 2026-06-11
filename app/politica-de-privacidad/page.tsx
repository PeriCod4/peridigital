import LegalPage from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de PeriDigital.",
  ...pageMeta("/politica-de-privacidad/"),
  robots: { index: false },
};

export default function Page() {
  return <LegalPage slug="politica-de-privacidad" />;
}
