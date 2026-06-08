import type { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";

const TITLE = "Cómo recuperar carritos abandonados (y vender más)";
const DESC =
  "Guía para recuperar carritos abandonados en tu ecommerce con automatización: emails, SMS y CRM. Reduce el abandono y recupera ventas que hoy pierdes.";

export const metadata: Metadata = {
  title: "Recuperar carritos abandonados: guía práctica",
  description: DESC,
  alternates: { canonical: "/guias/recuperar-carrito-abandonado/" },
};

export default function Page() {
  return (
    <GuideLayout
      slug="recuperar-carrito-abandonado"
      title={TITLE}
      description={DESC}
      date="2026-06-08"
      intro={[
        "En la mayoría de tiendas online, alrededor de 7 de cada 10 carritos se abandonan: el cliente añade productos y se va sin comprar. Es dinero que ya estaba a punto de entrar y se queda por el camino.",
        "La buena noticia es que muchas de esas ventas se pueden recuperar de forma automática. En esta guía te explicamos por qué se abandonan los carritos y cómo montar un sistema que recupere ventas mientras tú haces otra cosa.",
      ]}
      sections={[
        {
          h2: "Por qué se abandonan los carritos",
          list: [
            "Gastos de envío inesperados o demasiado altos.",
            "Proceso de compra largo o que obliga a registrarse.",
            "Dudas de última hora (devoluciones, confianza, pago).",
            "Simplemente estaba comparando o se distrajo.",
          ],
        },
        {
          h2: "Primer paso: reducir el abandono en la propia web",
          paras: ["Antes de recuperar, conviene perder menos. Algunas mejoras que ayudan:"],
          list: [
            "Mostrar los gastos de envío cuanto antes.",
            "Permitir comprar sin crear cuenta (checkout invitado).",
            "Acortar el proceso de pago al mínimo de pasos.",
            "Mostrar sellos de confianza y opciones de pago claras.",
          ],
        },
        {
          h2: "La automatización que recupera ventas",
          paras: [
            "El núcleo es una secuencia automática que se dispara cuando alguien abandona el carrito. Un ejemplo que funciona muy bien:",
          ],
          list: [
            "1 hora después: email recordando lo que dejó, con foto del producto.",
            "24 horas después: segundo email, a veces con un pequeño incentivo o respondiendo dudas.",
            "48-72 horas: recordatorio final (puede ser SMS o WhatsApp si tienes consentimiento).",
          ],
        },
        {
          h2: "El papel del CRM",
          paras: [
            "Para que esto funcione bien necesitas conectar tu tienda con un CRM o herramienta de automatización. Así el sistema sabe qué dejó cada cliente, lo segmenta y le envía el mensaje correcto sin que tú muevas un dedo.",
            "Esa integración CRM + ecommerce es justo donde más se nota el retorno: cada flujo bien montado recupera ventas mes tras mes.",
          ],
        },
        {
          h2: "Buenas prácticas y normativa",
          list: [
            "Personaliza: nombre, producto concreto, tono de tu marca.",
            "No abuses: 2-3 mensajes bien hechos rinden más que 10 pesados.",
            "Respeta el RGPD y el consentimiento para email/SMS.",
            "Mide: tasa de apertura, clics y ventas recuperadas.",
          ],
        },
      ]}
      faqs={[
        { q: "¿Cuántos carritos se pueden recuperar?", a: "Depende del sector y del flujo, pero una secuencia bien montada recupera un porcentaje significativo de las ventas que hoy pierdes por completo." },
        { q: "¿Necesito un CRM para esto?", a: "Sí o una herramienta de automatización conectada a tu tienda. Es lo que permite saber qué dejó cada cliente y enviarle el mensaje adecuado." },
        { q: "¿Puedo usar SMS o WhatsApp?", a: "Sí, siempre que tengas el consentimiento del usuario conforme al RGPD. Suelen tener muy buena tasa de apertura." },
      ]}
      cta={{
        text: "¿Montamos tu sistema de recuperación de carritos y automatización?",
        label: "Ver CRM y automatización",
        href: "/crm-automatizacion/",
      }}
    />
  );
}
