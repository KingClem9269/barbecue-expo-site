/** Modèle de données d'une campagne d'assets sociaux (bilingue FR/EN). */
import type { Format, Loc, LocArr } from "./brand";

export interface HookSlide { kind: "hook"; eyebrow?: Loc; title: Loc; highlight?: LocArr; photo?: string; }
export interface StatSlide { kind: "stat"; value: string; unit?: Loc; label: Loc; sub?: Loc; photo?: string; }
export interface TextSlide { kind: "text"; title: Loc; body?: Loc; highlight?: LocArr; photo?: string; }
export interface CtaSlide { kind: "cta"; title: Loc; highlight?: LocArr; sub?: Loc; button?: Loc; url?: string; photo?: string; }

export interface StatsSlide { kind: "stats"; eyebrow?: Loc; title?: Loc; items: { value: string; label: Loc }[]; photo?: string; }

export interface FlagStatSlide { kind: "flagStat"; flag: string; value: string; label: Loc; photo?: string; }
export interface FlagRowsSlide { kind: "flagRows"; title?: Loc; rows: { flag: string; country: Loc; pct: string }[]; photo?: string; }

/** Grille de logos. `logos[].src` relatif à /public. `fade` = effet scroll infini. */
export interface LogosSlide { kind: "logos"; title: Loc; highlight?: LocArr; logos: { src: string; dark?: boolean }[]; faded?: string[]; photo?: string; }
export interface MediaWallSlide { kind: "mediaWall"; title: Loc; highlight?: LocArr; items: ({ logo: string } | { name: string })[]; photo?: string; }

/** « Et beaucoup d'autres pros » : lignes catégories + logos + logos floutés. */
export interface ProMixSlide { kind: "proMix"; title: Loc; highlight?: LocArr; lines: Loc[]; logos: string[]; faded?: string[]; photo?: string; }

/** Pastilles Awards (6 catégories). */
export interface AwardsSlide { kind: "awards"; title?: Loc; highlight?: LocArr; items: { category: Loc }[]; photo?: string; }

export interface PortraitSlide { kind: "portrait"; img: string; name: string; flag?: string; followers: Loc; }
export interface PortraitDuoSlide { kind: "portraitDuo"; left: PortraitHalf; right: PortraitHalf; }
export interface PortraitHalf { img: string; name: string; flag?: string; followers: string; }

export interface MedalsSlide { kind: "medals"; title?: Loc; sub?: Loc; photo?: string; }
export interface VsSlide { kind: "vs"; title: string; subtitle: Loc; hook1: Loc; hook2: Loc; photo?: string; }
export interface CategoryPairSlide { kind: "categoryPair"; items: { num: string; title: Loc; sub?: Loc }[]; photo?: string; }

export type Slide =
  | HookSlide | StatSlide | TextSlide | CtaSlide | StatsSlide
  | FlagStatSlide | FlagRowsSlide | LogosSlide | MediaWallSlide | ProMixSlide | AwardsSlide
  | PortraitSlide | PortraitDuoSlide | MedalsSlide | VsSlide | CategoryPairSlide;

/* ---- Animations ---- */
export interface CounterAnim { kind: "counter"; to: number; from?: number; unit?: string; label: Loc; frames?: number; fps?: number; photo?: string; formats?: Format[]; }
export interface CounterSequenceAnim {
  kind: "counterSequence";
  fps?: number;
  photo?: string;
  segments: { to: number; from?: number; unit?: string; label: Loc; seconds?: number }[];
  endCard?: { lines: Loc[] };
  formats?: Format[];
}
export interface GrillArenaAnim { kind: "grillArena"; fps?: number; photo?: string; title?: string; tagline?: Loc; formats?: Format[]; }

export type Animation = CounterAnim | CounterSequenceAnim | GrillArenaAnim;

export interface Campaign {
  slug: string;
  format?: Format; // déf "portrait"
  caption: Loc; // légende FR + EN
  slides?: Slide[];
  animated?: Animation;
}
