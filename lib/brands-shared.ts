/**
 * Brand types — used on server (data loading) and client (rendering).
 * Keep file free of fs/server imports.
 */

import type { CategoryKey, SubCategoryKey } from "./exhibitor-taxonomy";

export type BrandTier = "gold" | "silver" | "bronze";

export type Brand = {
  slug: string;
  name: string;
  /** ISO 3166-1 alpha-2, lowercase. */
  country: string;
  /** Top-level category key (from TAXONOMY). */
  category: CategoryKey;
  /** Optional sub-category keys — a brand can belong to several. */
  subCategories?: SubCategoryKey[];
  tier: BrandTier;
  /** Marketing flags. */
  newForExpo?: boolean;
  seekingDistributor?: boolean;
  seekingReseller?: boolean;
  exportsAbroad?: boolean;
  /** Optional public URLs. */
  website?: string;
  /** Path in /public/brands/logos/<slug>.svg (or .png). Fallback to name if missing. */
  logo?: string;
};

/** Pretty label for the Tier (localized). */
export const TIER_LABELS: Record<BrandTier, Record<string, string>> = {
  gold: { fr: "Or", en: "Gold", es: "Oro", de: "Gold", nl: "Goud", pt: "Ouro", it: "Oro" },
  silver: { fr: "Argent", en: "Silver", es: "Plata", de: "Silber", nl: "Zilver", pt: "Prata", it: "Argento" },
  bronze: { fr: "Bronze", en: "Bronze", es: "Bronce", de: "Bronze", nl: "Brons", pt: "Bronze", it: "Bronzo" },
};
export function getTierLabel(tier: BrandTier, locale: string): string {
  return TIER_LABELS[tier]?.[locale] || TIER_LABELS[tier]?.fr || tier;
}
