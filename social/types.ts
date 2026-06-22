/** Modèle de données d'une campagne d'assets sociaux. */
import type { Format } from "./brand";

type Highlight = string[];

export interface HookSlide { kind: "hook"; eyebrow?: string; title: string; highlight?: Highlight; photo?: string; }
export interface StatSlide { kind: "stat"; value: string; unit?: string; label: string; sub?: string; photo?: string; }
export interface TextSlide { kind: "text"; title: string; body?: string; highlight?: Highlight; photo?: string; }
export interface CtaSlide { kind: "cta"; title: string; highlight?: Highlight; sub?: string; button?: string; url?: string; photo?: string; }

/** Multi-stats (titre + plusieurs chiffres). */
export interface StatsSlide { kind: "stats"; eyebrow?: string; title?: string; items: { value: string; label: string }[]; photo?: string; }

/** Drapeau + % géant. `flag` = code ISO (ex "fr"). */
export interface FlagStatSlide { kind: "flagStat"; flag: string; value: string; label: string; photo?: string; }
/** Lignes pays + %. */
export interface FlagRowsSlide { kind: "flagRows"; title?: string; rows: { flag: string; country: string; pct: string }[]; photo?: string; }

/** Grille de logos d'enseignes. `logos[].src` relatif à /public. */
export interface LogosSlide { kind: "logos"; title: string; highlight?: Highlight; logos: { src: string; dark?: boolean }[]; photo?: string; }
/** Mur média : logos (path /public) et/ou noms en or. */
export interface MediaWallSlide { kind: "mediaWall"; title: string; highlight?: Highlight; items: ({ logo: string } | { name: string })[]; photo?: string; }

/** Portrait plein cadre. `img` relatif à /public. `flag` = code ISO optionnel. */
export interface PortraitSlide { kind: "portrait"; img: string; name: string; flag?: string; followers: string; }
export interface PortraitDuoSlide { kind: "portraitDuo"; left: PortraitHalf; right: PortraitHalf; }
export interface PortraitHalf { img: string; name: string; flag?: string; followers: string; }

export interface MedalsSlide { kind: "medals"; title?: string; sub?: string; photo?: string; }
export interface VsSlide { kind: "vs"; title: string; subtitle: string; hook1: string; hook2: string; photo?: string; }
export interface CategoryPairSlide { kind: "categoryPair"; items: { num: string; title: string; sub?: string }[]; photo?: string; }

export type Slide =
  | HookSlide | StatSlide | TextSlide | CtaSlide | StatsSlide
  | FlagStatSlide | FlagRowsSlide | LogosSlide | MediaWallSlide
  | PortraitSlide | PortraitDuoSlide | MedalsSlide | VsSlide | CategoryPairSlide;

/* ---- Animations ---- */

/** Compteur unique 0→to. */
export interface CounterAnim { kind: "counter"; to: number; from?: number; unit?: string; label: string; frames?: number; fps?: number; photo?: string; }

/** Séquence de compteurs + carte finale. */
export interface CounterSequenceAnim {
  kind: "counterSequence";
  fps?: number;
  photo?: string;
  segments: { to: number; from?: number; unit?: string; label: string; seconds?: number }[];
  /** carte finale : lignes affichées sous le logo */
  endCard?: { lines: string[] };
  /** formats à exporter (déf : story + portrait) */
  formats?: Format[];
}

/** Animation custom Grill Arena (VS). */
export interface GrillArenaAnim { kind: "grillArena"; fps?: number; photo?: string; title?: string; subtitle?: string; formats?: Format[]; }

export type Animation = CounterAnim | CounterSequenceAnim | GrillArenaAnim;

export interface Campaign {
  slug: string;
  format?: Format; // déf "portrait"
  caption: string;
  slides?: Slide[];
  animated?: Animation;
}
