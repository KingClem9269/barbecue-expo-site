/**
 * Blocs réutilisables — contenu HTML inséré dans `.safe`.
 * Chaque bloc applique les règles de compo : une idée par slide,
 * chiffres énormes, accent or sur les mots-clés.
 */
import { BRAND, EVENT_DATE, HANDLE, SITE, LOGO_JAUNE } from "../brand";

/** Met en or les segments listés et convertit \n en <br>. */
export function rich(text: string, highlight: string[] = []): string {
  let html = escapeHtml(text);
  for (const term of highlight) {
    const t = escapeHtml(term);
    html = html.split(t).join(`<span class="gold">${t}</span>`);
  }
  return html.replace(/\n/g, "<br>");
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Slide 1 — accroche forte. */
export function slideHook(o: { eyebrow?: string; title: string; highlight?: string[] }): string {
  return `
    ${o.eyebrow ? `<div class="eyebrow">${escapeHtml(o.eyebrow)}</div>` : ""}
    <div style="flex:1;display:flex;align-items:flex-end;">
      <h1 class="display" style="font-size:128px;">${rich(o.title, o.highlight)}</h1>
    </div>`;
}

/** Stat géante. */
export function giantStat(o: { value: string; unit?: string; label: string; sub?: string }): string {
  return `
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
      <div class="display gold" style="font-size:300px;display:flex;align-items:baseline;gap:18px;">
        ${escapeHtml(o.value)}${o.unit ? `<span style="font-size:84px;color:${BRAND.white};">${escapeHtml(o.unit)}</span>` : ""}
      </div>
      <div class="display" style="font-size:64px;margin-top:18px;max-width:860px;">${escapeHtml(o.label)}</div>
      ${o.sub ? `<p class="grey" style="font-size:34px;margin-top:24px;max-width:820px;line-height:1.3;">${escapeHtml(o.sub)}</p>` : ""}
    </div>`;
}

/** Texte — une idée + corps. */
export function slideText(o: { title: string; body?: string; highlight?: string[] }): string {
  return `
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
      <h2 class="display" style="font-size:104px;">${rich(o.title, o.highlight)}</h2>
      ${o.body ? `<p class="grey" style="font-size:40px;margin-top:32px;max-width:860px;line-height:1.35;">${rich(o.body, o.highlight)}</p>` : ""}
    </div>`;
}

/** Dernière slide — CTA + date + handle + site + logo. */
export function slideCTA(o: { title: string; highlight?: string[]; sub?: string }): string {
  return `
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
      <h2 class="display" style="font-size:112px;">${rich(o.title, o.highlight)}</h2>
      ${o.sub ? `<p class="grey" style="font-size:38px;margin-top:26px;max-width:840px;line-height:1.35;">${escapeHtml(o.sub)}</p>` : ""}
      <div style="margin-top:56px;display:inline-flex;align-self:flex-start;background:${BRAND.gold};color:${BRAND.bg};font-family:${BRAND.display};font-weight:900;font-size:46px;padding:26px 46px;border-radius:10px;letter-spacing:.02em;">
        ${SITE}
      </div>
      <div class="gold" style="font-family:${BRAND.display};font-weight:900;font-size:40px;margin-top:64px;">${EVENT_DATE}</div>
      <div class="grey" style="font-size:34px;margin-top:12px;">${HANDLE} · ${SITE}</div>
    </div>`;
}

/** Bandeau logo (gros logo centré, ex. ouverture/fermeture). */
export function logoBanner(o: { caption?: string } = {}): string {
  return `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <img src="${LOGO_JAUNE}" alt="Barbecue Expo" style="height:240px;width:auto;" />
      ${o.caption ? `<div class="grey" style="font-size:38px;margin-top:40px;">${escapeHtml(o.caption)}</div>` : ""}
    </div>`;
}

/** Grille de logos d'enseignes. */
export function logoGrid(o: { title: string; highlight?: string[]; logos: { src: string; dark?: boolean }[] }): string {
  const cells = o.logos
    .map(
      (l) => `<div style="aspect-ratio:5/3;border-radius:12px;display:flex;align-items:center;justify-content:center;padding:24px;overflow:hidden;background:${l.dark ? "#161616" : BRAND.white};">
        <img src="${l.src}" alt="" style="max-width:100%;max-height:100%;object-fit:contain;" /></div>`,
    )
    .join("");
  return `
    <h2 class="display" style="font-size:88px;margin-bottom:48px;">${rich(o.title, o.highlight)}</h2>
    <div style="flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-content:center;">${cells}</div>`;
}
