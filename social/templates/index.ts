/**
 * Templates : assemblent un cadre (base) + un bloc (composant) selon le type
 * de slide, et résolvent les chemins d'assets en data URIs.
 */
import { frame } from "./base";
import { photo, asset } from "../brand";
import {
  slideHook, giantStat, slideText, slideCTA, statsBlock,
  flagStat, flagRows, logoGrid, mediaWall, portraitCaption, portraitDuo,
  medals, vsHero, categoryPair,
} from "../components/blocks";
import type { Slide } from "../types";

const flag = (iso: string) => asset(`flags/${iso}.svg`);
/** photo de fond : nom simple → /photos-2026, chemin avec "/" → /public. */
const resolveBg = (name?: string) => (!name ? undefined : name.includes("/") ? asset(name) : photo(name));

export function renderSlide(slide: Slide, ctx: { w: number; h: number; index: number; total: number }): string {
  const { w, h, index, total } = ctx;
  const base = (content: string, opts: Partial<Parameters<typeof frame>[0]> = {}) =>
    frame({ w, h, content, index, total, ...opts });
  const bg = "photo" in slide ? resolveBg(slide.photo) : undefined;

  switch (slide.kind) {
    case "hook":
      return base(slideHook(slide), { bg });
    case "stat":
      return base(giantStat(slide), { bg });
    case "text":
      return base(slideText(slide), { bg });
    case "cta":
      return base(slideCTA(slide), { bg });
    case "stats":
      return base(statsBlock(slide), { bg });
    case "flagStat":
      return base(flagStat({ flag: flag(slide.flag), value: slide.value, label: slide.label }), { bg });
    case "flagRows":
      return base(flagRows({ title: slide.title, rows: slide.rows.map((r) => ({ ...r, flag: flag(r.flag) })) }), { bg });
    case "logos":
      return base(logoGrid({ title: slide.title, highlight: slide.highlight, logos: slide.logos.map((l) => ({ src: asset(l.src), dark: l.dark })) }), { bg });
    case "mediaWall":
      return base(
        mediaWall({ title: slide.title, highlight: slide.highlight, items: slide.items.map((it) => ("logo" in it ? { logo: asset(it.logo) } : it)) }),
        { bg },
      );
    case "portrait":
      return base(portraitCaption({ name: slide.name, flag: slide.flag ? flag(slide.flag) : undefined, followers: slide.followers }), {
        bg: asset(slide.img),
        overlay: "bottom",
        hideFooter: true,
      });
    case "portraitDuo":
      return base(
        portraitDuo({
          left: { ...slide.left, img: asset(slide.left.img), flag: slide.left.flag ? flag(slide.left.flag) : undefined },
          right: { ...slide.right, img: asset(slide.right.img), flag: slide.right.flag ? flag(slide.right.flag) : undefined },
        }),
        { overlay: "none", hideFooter: true },
      );
    case "medals":
      return base(medals(slide), { bg });
    case "vs":
      return base(vsHero(slide), { bg, overlay: "flat" });
    case "categoryPair":
      return base(categoryPair(slide), { bg });
  }
}
