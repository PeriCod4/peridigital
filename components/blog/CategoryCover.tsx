// Portada generada para artículos sin imagen destacada (solo en el grid).
// Color en consonancia con la marca (teal/azul Campero Digital + PeriSEO),
// elegido de forma determinista según la categoría/tema.

const PALETTE: [string, string][] = [
  ["#3ecccb", "#0f7e7c"], // teal
  ["#02bdff", "#0a6ea8"], // azul
  ["#0f7e7c", "#1b1f24"], // teal oscuro -> ink
  ["#3ecccb", "#02bdff"], // teal -> azul
  ["#2a2f36", "#0f7e7c"], // slate -> teal
  ["#1b1f24", "#2bb3b2"], // ink -> teal
];

function pickGradient(seed: string): [string, string] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

export default function CategoryCover({
  category,
  seed,
}: {
  category?: string;
  seed: string;
}) {
  const label = category || "Campero Digital";
  const [a, b] = pickGradient(category || seed);
  return (
    <div
      className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden p-4"
      style={{ background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)` }}
      aria-hidden="true"
    >
      {/* trama sutil */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,.6) 0, transparent 35%), radial-gradient(circle at 80% 80%, rgba(255,255,255,.35) 0, transparent 30%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/icon_campero_digital_blanco.webp"
        alt=""
        className="absolute left-3 top-3 h-5 w-auto opacity-80"
      />
      <span className="relative text-center text-lg font-extrabold leading-tight text-white drop-shadow-sm sm:text-xl">
        {label}
      </span>
    </div>
  );
}
