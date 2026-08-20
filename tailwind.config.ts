import type { Config } from "tailwindcss";

/**
 * Sistema de diseño — Plantilla "Salud & Confianza"
 * Paleta derivada del logo: turquesa #4BC2C8 y oro #D4A951 del isotipo,
 * oscurecidos hasta cumplir contraste AA (acento #19797B, oro texto #9E6D18).
 * Tipografía: Playfair Display (títulos, serif elegante) + Inter (cuerpo).
 * Nota: el script de re-tematizado cambia estos tokens por otra personalidad.
 * La clave `gold` es el color de acento del tema (aquí: teal clínico).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#132428", // verde muy oscuro — texto principal / secciones oscuras
        "ink-soft": "#1E353A", // texto secundario fuerte
        muted: "#46686D", // texto secundario
        faint: "#789A9E", // notas, captions
        paper: "#FFFFFF", // superficie base
        ivory: "#EAF7F7", // secciones alternas (clínico suave)
        "ivory-deep": "#CFEAEA", // clínico más profundo
        line: "#BFE2E3", // bordes
        brand: "#D4A951", // oro del logo Animal Expert (uso decorativo)
        "brand-deep": "#9E6D18", // oro oscuro para TEXTO pequeño (AA sobre blanco)
        gold: {
          DEFAULT: "#19797B", // teal clínico (acento principal)
          deep: "#146466", // teal oscuro para TEXTO pequeño (AA sobre blanco)
          soft: "#9ADADB", // teal suave (bordes, fondos)
          tint: "#E6F7F7", // tinte teal muy claro (fondos)
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(19,36,40,.06)",
        card: "0 18px 50px rgba(19,36,40,.08)",
        lift: "0 28px 70px rgba(19,36,40,.16)",
        gold: "0 14px 34px rgba(25,121,123,.40)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp .8s cubic-bezier(.2,.7,.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
