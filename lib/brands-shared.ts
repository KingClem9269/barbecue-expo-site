/**
 * Shared types & labels for the brand system — safe to import in client code.
 */

export type BrandCategory =
  | "charcoal"
  | "gas"
  | "pellet"
  | "kamado"
  | "smoker"
  | "wood-fire"
  | "accessories"
  | "meat"
  | "sauce"
  | "charcoal-fuel"
  | "wood-fuel";

export type BrandTier = "gold" | "silver" | "bronze";

export type Brand = {
  slug: string;
  name: string;
  country: string;
  category: BrandCategory;
  tier: BrandTier;
  newForExpo: boolean;
  website?: string;
};

/** Localized label for a category. */
export const CATEGORY_LABELS: Record<BrandCategory, Record<string, string>> = {
  charcoal: {
    fr: "Charbon",
    en: "Charcoal",
    es: "Carbón",
    de: "Holzkohle",
    nl: "Houtskool",
    pt: "Carvão",
    it: "Carbone",
  },
  gas: {
    fr: "Gaz",
    en: "Gas",
    es: "Gas",
    de: "Gas",
    nl: "Gas",
    pt: "Gás",
    it: "Gas",
  },
  pellet: {
    fr: "Pellet",
    en: "Pellet",
    es: "Pellet",
    de: "Pellet",
    nl: "Pellet",
    pt: "Pellet",
    it: "Pellet",
  },
  kamado: {
    fr: "Kamado",
    en: "Kamado",
    es: "Kamado",
    de: "Kamado",
    nl: "Kamado",
    pt: "Kamado",
    it: "Kamado",
  },
  smoker: {
    fr: "Fumoir",
    en: "Smoker",
    es: "Ahumador",
    de: "Smoker",
    nl: "Smoker",
    pt: "Fumador",
    it: "Smoker",
  },
  "wood-fire": {
    fr: "Feu de bois",
    en: "Wood fire",
    es: "Fuego de leña",
    de: "Holzfeuer",
    nl: "Houtvuur",
    pt: "Fogo a lenha",
    it: "Fuoco di legna",
  },
  accessories: {
    fr: "Accessoires",
    en: "Accessories",
    es: "Accesorios",
    de: "Zubehör",
    nl: "Accessoires",
    pt: "Acessórios",
    it: "Accessori",
  },
  meat: {
    fr: "Viande",
    en: "Meat",
    es: "Carne",
    de: "Fleisch",
    nl: "Vlees",
    pt: "Carne",
    it: "Carne",
  },
  sauce: {
    fr: "Sauces & Rubs",
    en: "Sauces & Rubs",
    es: "Salsas & Rubs",
    de: "Saucen & Rubs",
    nl: "Sauzen & Rubs",
    pt: "Molhos & Rubs",
    it: "Salse & Rubs",
  },
  "charcoal-fuel": {
    fr: "Charbon & combustible",
    en: "Charcoal & fuel",
    es: "Carbón & combustible",
    de: "Kohle & Brennstoff",
    nl: "Houtskool & brandstof",
    pt: "Carvão & combustível",
    it: "Carbone & combustibile",
  },
  "wood-fuel": {
    fr: "Bois & essences",
    en: "Wood & species",
    es: "Madera & especies",
    de: "Holz & Arten",
    nl: "Hout & soorten",
    pt: "Madeira & espécies",
    it: "Legno & essenze",
  },
};

export function getCategoryLabel(cat: BrandCategory, locale: string): string {
  return CATEGORY_LABELS[cat]?.[locale] || CATEGORY_LABELS[cat]?.fr || cat;
}

/** Tier label. */
export const TIER_LABELS: Record<BrandTier, Record<string, string>> = {
  gold: { fr: "Or", en: "Gold", es: "Oro", de: "Gold", nl: "Goud", pt: "Ouro", it: "Oro" },
  silver: { fr: "Argent", en: "Silver", es: "Plata", de: "Silber", nl: "Zilver", pt: "Prata", it: "Argento" },
  bronze: { fr: "Bronze", en: "Bronze", es: "Bronce", de: "Bronze", nl: "Brons", pt: "Bronze", it: "Bronzo" },
};

export function getTierLabel(tier: BrandTier, locale: string): string {
  return TIER_LABELS[tier]?.[locale] || TIER_LABELS[tier]?.fr || tier;
}
