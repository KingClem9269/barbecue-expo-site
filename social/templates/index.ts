/**
 * Templates : assemblent un cadre (base) + un bloc (composant) selon le type
 * de slide. Carousel-slide / post-single / story partagent le même cadre, seules
 * les dimensions changent (gérées par le format de la campagne).
 */
import { frame } from "./base";
import { photo } from "../brand";
import { slideHook, giantStat, slideText, slideCTA, logoGrid } from "../components/blocks";
import type { Slide } from "../types";

/** Rend une slide en document HTML complet, prêt pour la capture. */
export function renderSlide(slide: Slide, ctx: { w: number; h: number; index: number; total: number }): string {
  const bg = slide.photo ? photo(slide.photo) : undefined;

  let content = "";
  switch (slide.kind) {
    case "hook":
      content = slideHook(slide);
      break;
    case "stat":
      content = giantStat(slide);
      break;
    case "text":
      content = slideText(slide);
      break;
    case "cta":
      content = slideCTA(slide);
      break;
    case "logos":
      content = logoGrid(slide);
      break;
  }

  return frame({ w: ctx.w, h: ctx.h, bg, content, index: ctx.index, total: ctx.total });
}
