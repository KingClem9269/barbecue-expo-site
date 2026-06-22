/**
 * Templates : assemblent un cadre (base) + un bloc (composant) selon le type
 * de slide, résolvent les chemins d'assets et la langue (FR/EN).
 */
import { frame } from "./base";
import { photo, asset, L, LA, type Lang } from "../brand";
import {
  slideHook, giantStat, slideText, slideCTA, statsBlock,
  flagStat, flagRows, logoGrid, mediaWall, proMix, awardGrid,
  portraitCaption, portraitDuo, medals, vsHero, categoryPair,
} from "../components/blocks";
import type { Slide } from "../types";

const flag = (iso: string) => asset(`flags/${iso}.svg`);
const resolveBg = (name?: string) => (!name ? undefined : name.includes("/") ? asset(name) : photo(name));

export function renderSlide(slide: Slide, ctx: { w: number; h: number; lang: Lang }): string {
  const { w, h, lang } = ctx;
  const t = (v: Parameters<typeof L>[0]) => L(v, lang);
  const ta = (v: Parameters<typeof LA>[0]) => LA(v, lang);
  const base = (content: string, opts: Partial<Parameters<typeof frame>[0]> = {}) => frame({ w, h, content, ...opts });
  const bg = "photo" in slide ? resolveBg(slide.photo) : undefined;

  switch (slide.kind) {
    case "hook":
      return base(slideHook({ eyebrow: t(slide.eyebrow), title: t(slide.title), highlight: ta(slide.highlight) }), { bg });
    case "stat":
      return base(giantStat({ value: slide.value, unit: t(slide.unit), label: t(slide.label), sub: t(slide.sub) }), { bg });
    case "text":
      return base(slideText({ title: t(slide.title), body: t(slide.body), highlight: ta(slide.highlight) }), { bg });
    case "cta":
      return base(slideCTA({ title: t(slide.title), highlight: ta(slide.highlight), sub: t(slide.sub), button: t(slide.button) || undefined, url: slide.url, lang }), { bg });
    case "stats":
      return base(statsBlock({ eyebrow: t(slide.eyebrow), title: t(slide.title), items: slide.items.map((it) => ({ value: it.value, label: t(it.label) })) }), { bg });
    case "flagStat":
      return base(flagStat({ flag: flag(slide.flag), value: slide.value, label: t(slide.label) }), { bg });
    case "flagRows":
      return base(flagRows({ title: t(slide.title), rows: slide.rows.map((r) => ({ flag: flag(r.flag), country: t(r.country), pct: r.pct })) }), { bg });
    case "logos":
      return base(logoGrid({ title: t(slide.title), highlight: ta(slide.highlight), logos: slide.logos.map((l) => ({ src: asset(l.src), dark: l.dark })), faded: slide.faded?.map((s) => asset(s)) }), { bg });
    case "mediaWall":
      return base(mediaWall({ title: t(slide.title), highlight: ta(slide.highlight), items: slide.items.map((it) => ("logo" in it ? { logo: asset(it.logo) } : it)) }), { bg });
    case "proMix":
      return base(proMix({ title: t(slide.title), highlight: ta(slide.highlight), lines: slide.lines.map((l) => t(l)), logos: slide.logos.map((s) => asset(s)), faded: slide.faded?.map((s) => asset(s)) }), { bg });
    case "awards":
      return base(awardGrid({ title: t(slide.title), highlight: ta(slide.highlight), items: slide.items.map((it) => ({ category: t(it.category) })) }), { bg });
    case "portrait":
      return base(portraitCaption({ name: slide.name, flag: slide.flag ? flag(slide.flag) : undefined, followers: t(slide.followers) }), { bg: asset(slide.img), overlay: "bottom", hideFooter: true });
    case "portraitDuo":
      return base(
        portraitDuo({
          left: { ...slide.left, img: asset(slide.left.img), flag: slide.left.flag ? flag(slide.left.flag) : undefined },
          right: { ...slide.right, img: asset(slide.right.img), flag: slide.right.flag ? flag(slide.right.flag) : undefined },
        }),
        { overlay: "none", hideFooter: true },
      );
    case "medals":
      return base(medals({ title: t(slide.title), sub: t(slide.sub) }), { bg });
    case "vs":
      return base(vsHero({ title: slide.title, subtitle: t(slide.subtitle), hook1: t(slide.hook1), hook2: t(slide.hook2) }), { bg, overlay: "flat" });
    case "categoryPair":
      return base(categoryPair({ items: slide.items.map((it) => ({ num: it.num, title: t(it.title), sub: t(it.sub) })) }), { bg });
  }
}
