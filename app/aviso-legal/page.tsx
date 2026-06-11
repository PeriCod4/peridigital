import LegalPage from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  title: "Aviso Legal",
  description: "Aviso legal de PeriDigital.",
  ...pageMeta("/aviso-legal/"),
  robots: { index: false },
};

export default function Page() {
  return <LegalPage slug="aviso-legal" />;
}
