/**
 * Écosystème éditorial Barbecue — configuration centrale du maillage inter-sites.
 *
 * Source unique de vérité pour les liens sortants vers les 4 sites frères.
 * Pour activer/désactiver un site (ex. mise en ligne de la Coupe de France),
 * il suffit de basculer `enabled`. Les composants filtrent les sites désactivés.
 */

export type EcoKey = "fest" | "coupe" | "mag" | "piment";

export type Bi = { fr: string; en: string };

export interface EcoSite {
  key: EcoKey;
  name: string; // nom de marque (universel, sert d'ancre)
  url: string; // URL de destination
  enabled: boolean; // false => jamais rendu (site hors-ligne, etc.)
  blurb: Bi; // courte description contextuelle
}

export const ECOSYSTEM: Record<EcoKey, EcoSite> = {
  fest: {
    key: "fest",
    name: "Barbecue Fest",
    url: "https://www.barbecue-fest.com/paris/",
    enabled: true,
    blurb: {
      fr: "Le festival barbecue grand public — street food, concerts & chefs (Paris & Normandie).",
      en: "The public BBQ festival — street food, live music & chefs (Paris & Normandy).",
    },
  },
  coupe: {
    key: "coupe",
    name: "Coupe de France de Barbecue",
    url: "https://www.coupe-de-france-barbecue.com",
    // ⚠️ Site injoignable à l'audit (HTTP 000). Passer à `true` une fois en ligne.
    enabled: false,
    blurb: {
      fr: "La compétition nationale de barbecue : équipes, épreuves, jurys.",
      en: "The national BBQ competition: teams, challenges, judges.",
    },
  },
  mag: {
    key: "mag",
    name: "Barbecue Mag",
    url: "https://www.barbecue-mag.fr",
    enabled: true,
    blurb: {
      fr: "Le média barbecue : tests produits, recettes, interviews & tendances.",
      en: "The BBQ magazine: product tests, recipes, interviews & trends.",
    },
  },
  piment: {
    key: "piment",
    name: "Le Piment d'Or",
    url: "https://lepimentdor.com/championnat",
    enabled: true,
    blurb: {
      fr: "Le championnat de sauces piquantes de l'écosystème.",
      en: "The ecosystem's hot-sauce championship.",
    },
  },
};

export const ECO_BLOCK_TITLE: Bi = {
  fr: "Les autres rendez-vous du feu",
  en: "More fire-fuelled events",
};

/** Résout une chaîne bilingue selon la locale (fallback EN hors FR). */
export function ecoText(v: Bi, locale: string): string {
  return locale === "fr" ? v.fr : v.en;
}

/** Résout une liste de clés en sites ACTIVÉS, en conservant l'ordre. */
export function ecoSites(keys: EcoKey[]): EcoSite[] {
  return keys.map((k) => ECOSYSTEM[k]).filter((s): s is EcoSite => Boolean(s?.enabled));
}
