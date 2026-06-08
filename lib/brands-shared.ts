/**
 * Brand types — used on server (data loading) and client (rendering).
 * Keep file free of fs/server imports.
 */

import type { CategoryKey, SubCategoryKey } from "./exhibitor-taxonomy";

export type BrandTier = "gold" | "silver" | "bronze";

/** Social links — all optional, filled by the exhibitor on Bunny Hunter. */
export type BrandSocial = {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  x?: string;
};

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

  /* ---- Rich profile (filled by the exhibitor on Bunny Hunter) ---- */
  /** Cover/banner image — /public/brands/covers/<slug>.jpg. */
  coverImage?: string;
  /** Brand description (single text, written by the exhibitor). */
  description?: string;
  /** Booth number on the floor plan. */
  stand?: string;
  /** Social media links. */
  social?: BrandSocial;
  /** Downloadable catalog (PDF) URL. */
  catalogUrl?: string;
  /** "Book a meeting" link (B2B matchmaking). */
  appointmentUrl?: string;
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
