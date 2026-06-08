import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Campero Digital — Agencia digital 360";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#1b1f24",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#3ecccb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1b1f24",
              fontSize: 36,
              fontWeight: 800,
              marginRight: 16,
            }}
          >
            C
          </div>
          <div style={{ display: "flex", color: "white", fontSize: 30, fontWeight: 700 }}>
            Campero Digital
          </div>
        </div>
        <div style={{ display: "flex", color: "white", fontSize: 70, fontWeight: 800, marginTop: 44 }}>
          Convertimos lo digital
        </div>
        <div style={{ display: "flex", fontSize: 70, fontWeight: 800, marginTop: 4 }}>
          <span style={{ color: "white" }}>en&nbsp;</span>
          <span style={{ color: "#3ecccb" }}>resultados</span>
        </div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.7)", fontSize: 30, marginTop: 32 }}>
          Diseño web · Ecommerce · Software a medida · CRM · SEO
        </div>
      </div>
    ),
    { ...size },
  );
}
