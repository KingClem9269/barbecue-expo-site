/**
 * Brand data loader — feeds the public exhibitor list (/exposants).
 *
 * Source of truth: Bunny Hunter (JPC Events) — a Supabase Edge Function that
 * returns the CONFIRMED/PAID exhibitors of Barbecue Expo 2027. Each exhibitor
 * is a *company* that can hold several *brands*; the public list shows one
 * card per BRAND (carrying the parent company's stand number / banner).
 *
 * Strategy: ISR with a DAILY revalidate (next: { revalidate: 86400 }).
 * Fallback: if the env keys are missing or the call fails, we serve the
 * static `content/brands/index.json` so the site never breaks.
 *
 * ── Required env vars (.env.local + Vercel) ──
 *   BUNNY_API_KEY            read-only API token
 *   BUNNY_SUPABASE_ANON_KEY  Supabase anon key (public frontend key)
 */

import type { Brand } from "./brands-shared";
import type { CategoryKey } from "./exhibitor-taxonomy";
import { TAXONOMY } from "./exhibitor-taxonomy";
import { translateMany } from "./translate";
import staticBrands from "@/content/brands/index.json";

const PROJECT_ID = "c31b9c2f-5e25-4dd1-b0b6-c05e3aabb88d"; // Barbecue Expo 2027 (fixed)
const ENDPOINT = `https://mfgounaqnyzwkkjthntq.supabase.co/functions/v1/public-exhibitors?project_id=${PROJECT_ID}`;
const REVALIDATE_SECONDS = 60 * 60 * 24; // 1×/day

/* ------------------------------------------------------------------ */
/*  Raw API shapes (Bunny Hunter)                                     */
/* ------------------------------------------------------------------ */

interface ApiSocials {
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  linkedin?: string | null;
}

interface ApiCategory {
  slug: string;
  label_fr: string | null;
  label_en: string | null;
  parent_label_fr: string | null;
}

interface ApiBrand {
  id: string;
  name: string;
  category: string | null;
  logo_url: string | null;
  description_fr: string | null;
  website: string | null;
  catalog_url: string | null;
  socials?: ApiSocials | null;
  categories?: ApiCategory[] | null;
}

interface ApiExhibitor {
  company_name: string | null;
  country: string | null;
  stand_number: string | null;
  stand_number_outdoor: string | null;
  company_banner_url: string | null;
  status: string;
  brands?: ApiBrand[] | null;
}

interface ApiResponse {
  exhibitors?: ApiExhibitor[];
}

/* ------------------------------------------------------------------ */
/*  Public entry point                                                */
/* ------------------------------------------------------------------ */

export async function getBrands(locale: string = "fr"): Promise<Brand[]> {
  const apiKey = process.env.BUNNY_API_KEY;
  const anonKey = process.env.BUNNY_SUPABASE_ANON_KEY;

  // Not configured → serve the local JSON (keeps the site working).
  if (!apiKey || !anonKey) {
    return localizeDescriptions(staticBrands as Brand[], locale);
  }

  try {
    const res = await fetch(ENDPOINT, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        apikey: anonKey,
        Accept: "application/json",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`[brands] Bunny API ${res.status} — falling back to static list`);
      return localizeDescriptions(staticBrands as Brand[], locale);
    }

    const payload = (await res.json()) as ApiResponse;
    const exhibitors = payload.exhibitors ?? [];

    // Flatten: one Brand card per company brand.
    const brands: Brand[] = [];
    for (const ex of exhibitors) {
      for (const b of ex.brands ?? []) {
        const mapped = mapBrand(b, ex);
        if (mapped) brands.push(mapped);
      }
    }

    // Safety: if nothing usable, keep the static list.
    const list = brands.length > 0 ? brands : (staticBrands as Brand[]);
    return localizeDescriptions(list, locale);
  } catch (err) {
    console.error("[brands] Bunny fetch failed — falling back to static list", err);
    return localizeDescriptions(staticBrands as Brand[], locale);
  }
}

/**
 * Translate each brand's description into `locale` (AI, batched + cached).
 * Source language is auto-detected by the model; already-in-locale text is
 * returned unchanged. Falls back to the original text on any failure.
 */
async function localizeDescriptions(brands: Brand[], locale: string): Promise<Brand[]> {
  const descriptions = brands.map((b) => b.description);
  const translated = await translateMany(descriptions, locale);
  return brands.map((b, i) => ({ ...b, description: translated[i] ?? b.description }));
}

/* ------------------------------------------------------------------ */
/*  Mapping: Bunny brand (+ parent company) → local Brand             */
/* ------------------------------------------------------------------ */

function mapBrand(b: ApiBrand, company: ApiExhibitor): Brand | null {
  const name = str(b.name);
  if (!name) return null; // need a public brand name

  const stand = [str(company.stand_number), str(company.stand_number_outdoor)]
    .filter(Boolean)
    .join(" / ");

  return {
    slug: b.id || slugify(name),
    name,
    country: normalizeCountry(company.country),
    category: deriveCategory(b),
    subCategories: undefined, // Bunny categories don't map to our sub-taxonomy
    tier: "bronze", // partnership level not exposed by the API

    // Flags not exposed by the API.
    newForExpo: false,
    seekingDistributor: false,
    seekingReseller: false,
    exportsAbroad: false,

    website: cleanUrl(b.website),
    logo: cleanUrl(b.logo_url),

    // Rich profile.
    coverImage: cleanUrl(company.company_banner_url),
    description: str(b.description_fr),
    stand: stand || undefined,
    social: {
      instagram: cleanUrl(b.socials?.instagram),
      facebook: cleanUrl(b.socials?.facebook),
      linkedin: cleanUrl(b.socials?.linkedin),
      youtube: cleanUrl(b.socials?.youtube),
      tiktok: cleanUrl(b.socials?.tiktok),
      // X/Twitter not provided by Bunny Hunter.
    },
    catalogUrl: cleanUrl(b.catalog_url),
    // appointmentUrl not exposed by the API.
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function str(v: unknown): string | undefined {
  if (v == null) return undefined;
  const s = String(v).trim();
  return s.length ? s : undefined;
}

function cleanUrl(v: unknown): string | undefined {
  const s = str(v);
  if (!s || s === "#") return undefined;
  return s;
}

/** Pick a primary category from the brand's category list (Bunny → our 8 keys). */
function deriveCategory(b: ApiBrand): CategoryKey {
  const candidates: string[] = [];
  for (const c of b.categories ?? []) {
    if (c.parent_label_fr) candidates.push(c.parent_label_fr);
    if (c.label_fr) candidates.push(c.label_fr);
    if (c.slug) candidates.push(c.slug);
  }
  if (b.category) candidates.push(b.category);

  for (const cand of candidates) {
    const key = matchCategory(cand);
    if (key) return key;
  }
  return "barbecue"; // sensible default
}

function matchCategory(text: string): CategoryKey | null {
  const s = text.toLowerCase();
  // Exact key match.
  const exact = TAXONOMY.find((c) => c.key === s);
  if (exact) return exact.key;
  // Bunny slug aliases.
  if (BUNNY_SLUG_TO_KEY[s]) return BUNNY_SLUG_TO_KEY[s];
  // Keyword heuristic on labels.
  for (const [key, words] of Object.entries(CATEGORY_KEYWORDS)) {
    if (words.some((w) => s.includes(w))) return key as CategoryKey;
  }
  return null;
}

/** Known Bunny Hunter category slugs → our taxonomy keys. Extend as needed. */
const BUNNY_SLUG_TO_KEY: Record<string, CategoryKey> = {
  "bbq-marques": "barbecue",
  "marques-de-barbecues": "barbecue",
  accessoires: "accessories",
  "accessoires-equipements": "accessories",
  combustibles: "fuels",
  sauces: "sauces",
  "sauces-epices": "sauces",
  "cuisine-exterieure": "outdoor-kitchen",
  gourmet: "gourmet",
  food: "gourmet",
  alcool: "alcohol",
  alcools: "alcohol",
  spiritueux: "alcohol",
  restaurants: "restaurants",
  restauration: "restaurants",
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  barbecue: ["barbecue", "bbq", "grill", "kamado", "smoker", "plancha", "brasero"],
  accessories: ["accessoire", "accessory", "ustensile", "équipement", "equipement", "equipment", "tool"],
  fuels: ["combustible", "fuel", "charbon", "charcoal", "pellet", "bois", "wood"],
  sauces: ["sauce", "rub", "marinade", "épice", "epice", "spice", "condiment"],
  "outdoor-kitchen": ["cuisine", "kitchen", "outdoor", "extérieur", "exterieur", "mobilier", "furniture"],
  gourmet: ["gourmet", "food", "viande", "meat", "ingrédient", "ingredient", "épicerie"],
  alcohol: ["alcool", "alcohol", "spirit", "spiritueux", "bière", "biere", "beer", "vin", "wine", "whisky"],
  restaurants: ["restaurant", "restaurateur", "street food", "traiteur", "restauration"],
};

/** Free-text country → ISO 3166-1 alpha-2 (lowercase) for flag + label. */
function normalizeCountry(v: unknown): string {
  const s = str(v)?.toLowerCase() ?? "";
  if (!s) return "fr"; // default per Bunny Hunter
  if (s.length === 2) return s;
  return COUNTRY_NAME_TO_CODE[s] ?? "fr";
}

const COUNTRY_NAME_TO_CODE: Record<string, string> = {
  france: "fr",
  "états-unis": "us", "etats-unis": "us", "united states": "us", usa: "us", "u.s.a.": "us",
  allemagne: "de", germany: "de", deutschland: "de",
  "royaume-uni": "gb", "united kingdom": "gb", uk: "gb", angleterre: "gb", england: "gb",
  espagne: "es", spain: "es", españa: "es",
  italie: "it", italy: "it", italia: "it",
  belgique: "be", belgium: "be", belgië: "be",
  "pays-bas": "nl", netherlands: "nl", "nederland": "nl", hollande: "nl",
  portugal: "pt",
  suisse: "ch", switzerland: "ch",
  autriche: "at", austria: "at",
  irlande: "ie", ireland: "ie",
  "canada": "ca",
  "grèce": "gr", grece: "gr", greece: "gr",
  danemark: "dk", denmark: "dk",
  suède: "se", suede: "se", sweden: "se",
  pologne: "pl", poland: "pl",
  argentine: "ar", argentina: "ar",
  brésil: "br", bresil: "br", brazil: "br",
  japon: "jp", japan: "jp",
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/[\u0300-\u036f]/g, "")
}
