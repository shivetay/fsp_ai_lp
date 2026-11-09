import type { MetadataRoute } from "next";
import { industryPages, servicePages } from "@/content/pages";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/uslugi`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...servicePages.map((p) => ({ url: `${siteUrl}/uslugi/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${siteUrl}/branze`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...industryPages.map((p) => ({ url: `${siteUrl}/branze/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${siteUrl}/polityka-prywatnosci`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
