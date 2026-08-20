import type { MetadataRoute } from "next";
import { SEO, BLOG } from "@/content";

// Mapa del sitio para buscadores: home + cada artículo del blog.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SEO.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SEO.url}/blog`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...BLOG.posts.map((post) => ({
      url: `${SEO.url}/blog/${post.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
