/**
 * Template de base : document HTML brandé + cadre commun à toutes les slides.
 * Polices inlinées (SansPlomb base64 + Inter Tight via Google Fonts).
 */
import { BRAND, FONT_SANSPLOMB, LOGO_JAUNE } from "../brand";

/** Document HTML complet, dimensions fixes, prêt pour la capture. */
export function htmlDoc(w: number, h: number, inner: string): string {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;600;800&display=swap" rel="stylesheet" />
<style>
  @font-face{font-family:"SansPlomb-98";src:url(data:font/woff;base64,${FONT_SANSPLOMB}) format("woff");font-weight:400 900;font-display:block;}
  *{margin:0;padding:0;box-sizing:border-box;}
  html,body{width:${w}px;height:${h}px;}
  body{background:${BRAND.bg};color:${BRAND.white};font-family:${BRAND.body};overflow:hidden;position:relative;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;}
  .display{font-family:${BRAND.display};font-weight:900;line-height:.9;letter-spacing:-.015em;}
  .gold{color:${BRAND.gold};}
  .grey{color:${BRAND.grey};}
  .bgphoto{position:absolute;inset:0;background-size:cover;background-position:center;}
  .overlay{position:absolute;inset:0;background:rgba(0,0,0,.55);}
  .vignette{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 0%,transparent 40%,rgba(0,0,0,.45) 100%);}
  .safe{position:absolute;inset:0;padding:${BRAND.safe}px;display:flex;flex-direction:column;}
  .footer{position:absolute;left:${BRAND.safe}px;right:${BRAND.safe}px;bottom:${BRAND.safe}px;display:flex;align-items:center;justify-content:space-between;}
  .footer img{height:42px;width:auto;opacity:.92;display:block;}
  .pageno{font-family:${BRAND.display};font-weight:900;font-size:26px;color:${BRAND.gold};letter-spacing:.05em;}
  .eyebrow{display:inline-flex;align-items:center;gap:14px;color:${BRAND.gold};font-weight:800;text-transform:uppercase;letter-spacing:.28em;font-size:24px;}
  .eyebrow::before{content:"";width:54px;height:3px;background:${BRAND.gold};display:block;}
</style></head><body>${inner}</body></html>`;
}

/** Cadre commun : fond (photo + overlay) optionnel, contenu, footer logo + n° de page. */
export function frame(opts: {
  w: number;
  h: number;
  bg?: string; // data URI photo
  content: string; // HTML inséré dans .safe
  index?: number; // n° de slide (1-based)
  total?: number;
  showPageNo?: boolean;
  /** "flat" = voile 55% (déf) · "bottom" = dégradé bas (portraits) · "none" */
  overlay?: "flat" | "bottom" | "none";
  hideFooter?: boolean;
}): string {
  const { w, h, bg, content, index, total, showPageNo = true, overlay = "flat", hideFooter = false } = opts;
  const overlayDiv =
    overlay === "bottom"
      ? `<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.92) 0%,rgba(0,0,0,.45) 38%,rgba(0,0,0,.05) 70%);"></div>`
      : overlay === "none"
        ? ""
        : `<div class="overlay"></div>`;
  const bgLayer = bg
    ? `<div class="bgphoto" style="background-image:url('${bg}')"></div>${overlayDiv}<div class="vignette"></div>`
    : `<div class="vignette"></div>`;
  const pageNo =
    showPageNo && index && total
      ? `<span class="pageno">${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>`
      : `<span></span>`;
  const footer = hideFooter
    ? ""
    : `<div class="footer"><img src="${LOGO_JAUNE}" alt="Barbecue Expo" />${pageNo}</div>`;
  const inner = `
    ${bgLayer}
    <div class="safe">${content}</div>
    ${footer}`;
  return htmlDoc(w, h, inner);
}
