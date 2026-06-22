/**
 * Tokens de marque partagés — Barbecue Expo (assets sociaux).
 * Une seule source de vérité pour couleurs, polices, dimensions et assets.
 */
import { readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd(); // le build se lance depuis la racine du repo

/* ---- Couleurs (NE PAS mélanger l'or avec une autre nuance) ---- */
export const BRAND = {
  bg: "#0A0A0A",
  gold: "#F4AD3C",
  white: "#FFFFFF",
  grey: "#C9C9C9",
  /** marge de sécurité : rien d'important ne touche le bord */
  safe: 90,
  display: `"SansPlomb-98", sans-serif`, // titres condensés/gras (police du site)
  body: `"Inter Tight", sans-serif`,
};

/* ---- Dimensions Instagram ---- */
export const FORMATS = {
  portrait: { w: 1080, h: 1350 }, // carrousel & post 4:5
  square: { w: 1080, h: 1080 },
  story: { w: 1080, h: 1920 }, // story / animé
} as const;
export type Format = keyof typeof FORMATS;

/* ---- Constantes éditoriales ---- */
export const EVENT_DATE = "12 · 13 · 14 Mars 2027 — Parc Floral de Paris";
export const HANDLE = "@barbecue_expo";
export const SITE = "barbecue-expo.fr";

/* ---- Assets inlinés en base64 (rendu headless sans serveur) ---- */
function b64(rel: string): string {
  return readFileSync(path.join(ROOT, rel)).toString("base64");
}

export const FONT_SANSPLOMB = b64("public/SansPlomb-98.woff");
export const LOGO_JAUNE = `data:image/png;base64,${b64("public/content/images/506de08054_logojaune2.png")}`;

/** Photo de fond depuis /public/photos-2026/ → data URI JPEG. */
export function photo(name: string): string {
  return `data:image/jpeg;base64,${b64(`public/photos-2026/${name}`)}`;
}

/** Logo enseigne depuis /public (grilles de logos). */
export function asset(relFromPublic: string): string {
  const ext = path.extname(relFromPublic).slice(1).toLowerCase();
  const mime = ext === "svg" ? "image/svg+xml" : ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
  return `data:${mime};base64,${b64(path.join("public", relFromPublic))}`;
}
