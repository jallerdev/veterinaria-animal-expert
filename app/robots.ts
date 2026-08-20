import type { MetadataRoute } from "next";
import { SEO } from "@/content";

// Permite a los buscadores rastrear todo y apunta al sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SEO.url}/sitemap.xml`,
  };
}
