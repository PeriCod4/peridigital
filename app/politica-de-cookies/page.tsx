import LegalPage from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  title: "Política de Cookies",
  description: "Política de cookies de PeriDigital.",
  ...pageMeta("/politica-de-cookies/"),
  robots: { index: false },
};

export default function Page() {
  return <LegalPage slug="politica-de-cookies" />;
}
