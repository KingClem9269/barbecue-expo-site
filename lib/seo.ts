import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/**
 * Site-wide SEO constants.
 * Update SITE_URL once the production domain is live.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.barbecue-expo.fr";

export const SITE_NAME = "Barbecue Expo 2027";

/** Localized meta content (title, description, keywords) per locale. */
type Locale = (typeof routing.locales)[number];

type LocaleMeta = {
  title: string;
  description: string;
  keywords: string[];
};

const META: Record<Locale, LocaleMeta> = {
  fr: {
    title: "Barbecue Expo 2027 — Le rendez-vous européen du BBQ",
    description:
      "Le salon n°1 du BBQ en Europe — 12, 13 et 14 mars 2027 au Parc Floral de Paris. Masterclasses, cooking shows, pitmasters internationaux, exposants et expériences autour du feu.",
    keywords: [
      "barbecue",
      "BBQ",
      "salon",
      "Paris",
      "pitmaster",
      "cuisson extérieure",
      "fumage",
      "outdoor cooking",
      "mars 2027",
    ],
  },
  en: {
    title: "Barbecue Expo 2027 — Europe's BBQ gathering",
    description:
      "Europe's #1 BBQ trade show — 12, 13 & 14 March 2027 at Parc Floral de Paris. Masterclasses, cooking shows, international pitmasters, exhibitors and fire-driven experiences.",
    keywords: [
      "barbecue",
      "BBQ",
      "trade show",
      "Paris",
      "pitmaster",
      "outdoor cooking",
      "smoking",
      "March 2027",
    ],
  },
  es: {
    title: "Barbecue Expo 2027 — La cita europea del BBQ",
    description:
      "La feria N.º 1 del BBQ en Europa — 12, 13 y 14 de marzo de 2027 en el Parc Floral de París. Masterclasses, cooking shows, pitmasters internacionales, expositores.",
    keywords: ["barbacoa", "BBQ", "feria", "París", "pitmaster", "cocina exterior", "marzo 2027"],
  },
  de: {
    title: "Barbecue Expo 2027 — Das europäische BBQ-Treffen",
    description:
      "Die BBQ-Messe Nr. 1 in Europa — 12., 13. und 14. März 2027 im Parc Floral de Paris. Masterclasses, Cooking Shows, internationale Pitmaster, Aussteller.",
    keywords: [
      "Grillen",
      "BBQ",
      "Messe",
      "Paris",
      "Pitmaster",
      "Outdoor-Küche",
      "Räuchern",
      "März 2027",
    ],
  },
  nl: {
    title: "Barbecue Expo 2027 — De Europese BBQ-ontmoeting",
    description:
      "De nummer 1 BBQ-beurs van Europa — 12, 13 en 14 maart 2027 in het Parc Floral de Paris. Masterclasses, cooking shows, internationale pitmasters, exposanten.",
    keywords: [
      "barbecue",
      "BBQ",
      "beurs",
      "Parijs",
      "pitmaster",
      "buitenkoken",
      "roken",
      "maart 2027",
    ],
  },
  pt: {
    title: "Barbecue Expo 2027 — O encontro europeu do BBQ",
    description:
      "A feira n.º 1 de BBQ na Europa — 12, 13 e 14 de março de 2027 no Parc Floral de Paris. Masterclasses, cooking shows, pitmasters internacionais, expositores.",
    keywords: [
      "churrasco",
      "BBQ",
      "feira",
      "Paris",
      "pitmaster",
      "cozinha ao ar livre",
      "março 2027",
    ],
  },
  it: {
    title: "Barbecue Expo 2027 — L'appuntamento europeo del BBQ",
    description:
      "La fiera N.1 del BBQ in Europa — 12, 13 e 14 marzo 2027 al Parc Floral di Parigi. Masterclass, cooking show, pitmaster internazionali, espositori.",
    keywords: [
      "barbecue",
      "BBQ",
      "fiera",
      "Parigi",
      "pitmaster",
      "cottura outdoor",
      "affumicatura",
      "marzo 2027",
    ],
  },
};

/** Build hreflang alternates for a given path (without locale prefix). */
export function buildAlternates(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    const prefix =
      locale === routing.defaultLocale ? "" : `/${locale}`;
    languages[locale] = `${SITE_URL}${prefix}${cleanPath === "/" ? "" : cleanPath}`;
  }
  // x-default points to the default locale version
  languages["x-default"] = `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
  return languages;
}

/** Build locale-aware Metadata for a page (homepage by default). */
export function buildMetadata(
  locale: string,
  path = "/",
  overrides: Partial<Metadata> = {},
): Metadata {
  const meta = META[locale as Locale] || META.fr;
  const languages = buildAlternates(path);
  const canonical =
    locale === routing.defaultLocale
      ? `${SITE_URL}${path === "/" ? "" : path}`
      : `${SITE_URL}/${locale}${path === "/" ? "" : path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      url: canonical,
      locale: locale === "en" ? "en_US" : locale === "pt" ? "pt_PT" : `${locale}_${locale.toUpperCase()}`,
      alternateLocale: Object.keys(languages).filter((l) => l !== locale && l !== "x-default"),
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.jpg"],
    },
    // Favicons gérés par les fichiers app/icon.png, app/apple-icon.png et
    // app/favicon.ico (monogramme « B »). Pas d'override ici.
    ...overrides,
  };
}
