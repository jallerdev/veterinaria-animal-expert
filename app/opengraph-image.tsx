import { ImageResponse } from "next/og";
import { SITE, GOOGLE } from "@/content";

// Imagen para compartir el enlace (WhatsApp, Facebook, etc.).
export const alt = `${SITE.name} · ${SITE.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#132428",
          fontFamily: "Arial, sans-serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: "#19797B",
            lineHeight: 1.05,
            textAlign: "center",
            letterSpacing: "-1px",
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#FFFFFF",
            marginTop: 36,
            textAlign: "center",
          }}
        >
          {`${SITE.title} · ${SITE.tagline}`}
        </div>
        {GOOGLE.reviewCount > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 34,
              fontWeight: 700,
              color: "#19797B",
              marginTop: 28,
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#19797B">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" />
            </svg>
            {`${GOOGLE.rating.toFixed(1)} · ${GOOGLE.reviewCount} reseñas en Google`}
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
