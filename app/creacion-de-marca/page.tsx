import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ServiceLayout from "@/components/ServiceLayout";

const DESC =
  "Creación de marca: branding desde cero. Naming, logo, identidad visual y mensaje para que tu negocio empiece con fuerza y transmita confianza.";

export const metadata: Metadata = {
  title: "Creación de marca y branding",
  description: DESC,
  ...pageMeta("/creacion-de-marca/"),
};

export default function Page() {
  return (
    <ServiceLayout
      slug="creacion-de-marca"
      metaDescription={DESC}
      dashboard={{
        project: "Identidad de marca",
        progress: 50,
        metrics: [
          { label: "Conceptos", value: "3", tone: "brand" },
          { label: "Logo", value: "v2", tone: "accent" },
          { label: "Paleta", value: "OK", tone: "green" },
          { label: "Manual", value: "—" },
        ],
        phases: [
          { name: "Brief y estrategia", status: "done" },
          { name: "Concepto", status: "done" },
          { name: "Diseño de identidad", status: "current" },
          { name: "Manual de marca", status: "todo" },
          { name: "Entrega", status: "todo" },
        ],
      }}
      eyebrow="Creación de marca"
      title="Una marca con la que empezar con fuerza"
      subtitle="Definimos y construimos tu marca desde cero —logo, estilo visual y mensaje— para que tu negocio transmita confianza desde el primer día."
      intro={[
        "Tu marca es lo primero que siente alguien antes de conocerte. Una identidad coherente y cuidada genera confianza y te diferencia; una improvisada resta, aunque tu producto sea bueno.",
        "Creamos tu marca desde cero o la renovamos: definimos quién eres y cómo lo cuentas, diseñamos tu logo e identidad visual, y dejamos las reglas para que se aplique igual en tu web, tus redes y todo lo demás.",
      ]}
      stats={[
        { value: "1", label: "identidad coherente en todo" },
        { value: "100%", label: "a tu medida, no plantillas" },
        { value: "Web", label: "lista para aplicar tu marca" },
      ]}
      features={[
        { title: "Naming y concepto", desc: "Definimos el nombre y la idea central de tu marca cuando hace falta." },
        { title: "Diseño de logo", desc: "Un logotipo único, versátil y reconocible, con sus variantes de uso." },
        { title: "Identidad visual", desc: "Colores, tipografías y estilo gráfico coherentes para toda tu comunicación." },
        { title: "Mensaje y tono", desc: "Cómo habla tu marca: claim, propuesta de valor y tono de voz." },
        { title: "Manual de marca", desc: "Las reglas para aplicar tu identidad igual en cualquier sitio." },
        { title: "Aplicación", desc: "Llevamos tu marca a la web, redes y materiales con coherencia." },
      ]}
      benefits={[
        "Transmites confianza desde el inicio",
        "Te diferencias de la competencia",
        "Coherencia en web, redes y todo",
        "Marca a tu medida, no genérica",
        "Lista para crecer contigo",
        "Integrada con tu web y tu Paid",
      ]}
      useCases={[
        { title: "Negocio nuevo", desc: "Empezar con una marca sólida desde el primer día, no improvisada." },
        { title: "Rebranding", desc: "Renovar una imagen desfasada que ya no representa lo que eres." },
        { title: "Lanzar un producto", desc: "Crear la marca de una nueva línea o proyecto con identidad propia." },
      ]}
      faqs={[
        { q: "¿Solo hacéis el logo?", a: "No: el logo es una parte. Trabajamos la identidad completa (colores, tipografías, mensaje) para que todo sea coherente." },
        { q: "¿Y si ya tengo marca?", a: "La renovamos o la ordenamos con un manual, manteniendo lo que funciona y mejorando lo que no." },
        { q: "¿Incluye aplicarla a la web?", a: "Sí, podemos llevar tu nueva marca a tu web y materiales para que se vea coherente en todos lados." },
      ]}
      ctaLabel="Crear mi marca"
    />
  );
}
