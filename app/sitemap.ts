import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";
import pitmasters from "@/content/pitmasters/index.json";
import { PARTNERS } from "@/lib/partners";

/**
 * Pages du site (sans préfixe de locale). Chaque page est émise pour chaque
 * locale avec ses alternates hreflang (SEO multilingue).
 *
 * - MAIN_PATHS : pages principales (routes d'app + pages CMS).
 * - Pages de détail (pitmasters, BBQ Street Food) ajoutées dynamiquement.
 */
type Freq = "weekly" | "monthly";
type Entry = { path: string; priority: number; changeFrequency: Freq };

const MAIN_PATHS: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  // Agenda (page pilier — calendrier de l'écosystème)
  { path: "/agenda", priority: 0.85, changeFrequency: "weekly" },
  // Actualités
  { path: "/actualites/zip-feux-partenaire-officiel-2027", priority: 0.7, changeFrequency: "monthly" },
  // Billetterie
  { path: "/billetterie", priority: 0.95, changeFrequency: "weekly" },
  { path: "/billetterie/pro-b2b", priority: 0.7, changeFrequency: "monthly" },
  // Exposer / pro
  { path: "/devenez-exposants", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pourquoi-exposer", priority: 0.85, changeFrequency: "monthly" },
  { path: "/presentation-exposants", priority: 0.85, changeFrequency: "monthly" },
  { path: "/exposants", priority: 0.85, changeFrequency: "weekly" },
  { path: "/nos-partenaires", priority: 0.75, changeFrequency: "monthly" },
  { path: "/espace-pro-b2b", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pro", priority: 0.8, changeFrequency: "monthly" },
  // Le salon / programme
  { path: "/le-salon", priority: 0.85, changeFrequency: "monthly" },
  { path: "/programme", priority: 0.9, changeFrequency: "weekly" },
  { path: "/program/bbq-street-food", priority: 0.85, changeFrequency: "weekly" },
  { path: "/program/cooking-shows", priority: 0.8, changeFrequency: "weekly" },
  { path: "/program/masterclasses", priority: 0.85, changeFrequency: "weekly" },
  { path: "/grill-arena", priority: 0.8, changeFrequency: "weekly" },
  { path: "/pitmasters", priority: 0.85, changeFrequency: "weekly" },
  { path: "/awards", priority: 0.8, changeFrequency: "monthly" },
  // Visiter
  { path: "/pourquoi-visiter", priority: 0.8, changeFrequency: "monthly" },
  { path: "/visiter", priority: 0.85, changeFrequency: "monthly" },
  { path: "/infos-pratiques", priority: 0.8, changeFrequency: "monthly" },
  // Divers
  { path: "/presentation", priority: 0.5, changeFrequency: "monthly" },
  { path: "/gallery-press", priority: 0.6, changeFrequency: "monthly" },
];

// Fiches restaurateurs BBQ Street Food → /program/bbq-street-food/<slug>
const STREET_FOOD_SLUGS = [
  "a-feu-lent", "atelier-du-brasero", "au-feu-le-saumon", "chango",
  "h-o-m-steakhouse", "le-boukane", "le-cochon-voyageur", "marche-noir",
  "melt", "nicky-s-bbq", "pny", "selva", "soon-grill", "villa-marthe",
];

function localizedUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const detail: Entry[] = [
    ...(pitmasters as { slug: string }[]).map((p) => ({
      path: `/pitmasters/${p.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as Freq,
    })),
    ...STREET_FOOD_SLUGS.map((s) => ({
      path: `/program/bbq-street-food/${s}`,
      priority: 0.6,
      changeFrequency: "monthly" as Freq,
    })),
    ...PARTNERS.map((p) => ({
      path: `/nos-partenaires/${p.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as Freq,
    })),
  ];

  for (const { path, priority, changeFrequency } of [...MAIN_PATHS, ...detail]) {
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
        alternates: { languages },
      });
    }
  }

  return entries;
}
