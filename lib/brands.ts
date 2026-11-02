/**
 * Brand data loader — feeds the public exhibitor list (/exposants).
 *
 * Source: `content/brands/exposants-2027.json`, generated from the shared
 * Drive of exhibitor sheets by `npm run exposants`
 * (scripts/import-exposants-drive.ts). To update the list: re-run the
 * import, then redeploy.
 */

import type { Brand } from "./brands-shared";
import { translateMany } from "./translate";
import exposants from "@/content/brands/exposants-2027.json";

export async function getBrands(locale: string = "fr"): Promise<Brand[]> {
  return localizeDescriptions(exposants as Brand[], locale);
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
