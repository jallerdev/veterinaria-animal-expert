import type { MetadataRoute } from "next";
import { SITE } from "@/content";

// Web App Manifest (PWA): nombre, colores del tema e ícono real de la marca.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} · ${SITE.title}`,
    short_name: SITE.name,
    description: SITE.title,
    start_url: "/",
    display: "standalone",
    background_color: "#132428", // tinta del tema clínico
    theme_color: "#132428",
    icons: [
      {
        src: "/icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
