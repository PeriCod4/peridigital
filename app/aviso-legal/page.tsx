import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Aviso Legal",
  description: "Aviso legal de Campero Digital.",
  alternates: { canonical: "/aviso-legal/" },
  robots: { index: false },
};

export default function Page() {
  return <LegalPage slug="aviso-legal" />;
}
