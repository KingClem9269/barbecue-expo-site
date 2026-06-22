/** Modèle de données d'une campagne d'assets sociaux. */
import type { Format } from "./brand";

/** Mots/segments à mettre en or dans un titre. */
type Highlight = string[];

export interface HookSlide {
  kind: "hook";
  eyebrow?: string;
  /** retours à la ligne avec \n */
  title: string;
  highlight?: Highlight;
  photo?: string; // nom de fichier dans /photos-2026
}

export interface StatSlide {
  kind: "stat";
  value: string; // chiffre énorme (ex "93 000")
  unit?: string; // suffixe discret (ex "visiteurs", "m²")
  label: string; // ligne explicative
  sub?: string;
  photo?: string;
}

export interface TextSlide {
  kind: "text";
  title: string;
  body?: string;
  highlight?: Highlight;
  photo?: string;
}

export interface CtaSlide {
  kind: "cta";
  title: string;
  highlight?: Highlight;
  sub?: string;
  photo?: string;
}

/** Grille de logos (enseignes) — chemins relatifs à /public. */
export interface LogosSlide {
  kind: "logos";
  title: string;
  highlight?: Highlight;
  logos: { src: string; dark?: boolean }[];
  photo?: string;
}

export type Slide = HookSlide | StatSlide | TextSlide | CtaSlide | LogosSlide;

/** Campagne animée (GIF + MP4). */
export interface AnimatedSpec {
  /** type d'animation supporté */
  kind: "counter";
  /** valeur finale du compteur (ex 93000) */
  to: number;
  from?: number;
  unit?: string;
  label: string;
  frames?: number; // nb d'images (def 30)
  fps?: number; // def 30
  photo?: string;
}

export interface Campaign {
  slug: string;
  format?: Format; // def "portrait"
  caption: string; // légende FR + hashtags
  slides: Slide[];
  animated?: AnimatedSpec;
}
