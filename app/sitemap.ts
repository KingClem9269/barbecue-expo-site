import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

/**
 * Core site paths (without locale prefix). Each is emitted per locale
 * with hreflang alternates for proper multilingual SEO.
 *
 * Slug file naming: "--" represents "/" nesting.
 */
const PATHS: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/le-salon", priority: 0.9, changeFrequency: "monthly" },
  { path: "/programme", priority: 0.9, changeFrequency: "weekly" },
  { path: "/program/bbq-street-food", priority: 0.85, changeFrequency: "weekly" },
  { path: "/program/cooking-shows", priority: 0.85, changeFrequency: "weekly" },
  { path: "/program/masterclasses", priority: 0.85, changeFrequency: "weekly" },
  { path: "/exposants", priority: 0.85, changeFrequency: "weekly" },
  { path: "/pourquoi-visiter", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pourquoi-exposer", priority: 0.8, changeFrequency: "monthly" },
  { path: "/devenez-exposants", priority: 0.8, changeFrequency: "monthly" },
  { path: "/espace-pro-b2b", priority: 0.75, changeFrequency: "monthly" },
  { path: "/infos-pratiques", priority: 0.8, changeFrequency: "monthly" },
  { path: "/billetterie/particulier", priority: 0.95, changeFrequency: "weekly" },
  { path: "/billetterie/pro-b2b", priority: 0.85, changeFrequency: "weekly" },
  { path: "/billetterie/presse", priority: 0.75, changeFrequency: "monthly" },
  { path: "/gallery-press", priority: 0.6, changeFrequency: "monthly" },
];

function localizedUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of PATHS) {
    // Build hreflang map for this path
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = localizedUrl(locale, path);
    }

    // Emit one sitemap entry per locale
    for (const locale of routing.locales) {
      entries.push({
        url: localizedUrl(locale, path),
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
