/**
 * Blocs réutilisables — contenu HTML inséré dans `.safe`.
 * Chaque bloc applique les règles de compo : une idée par slide,
 * chiffres énormes, accent or sur les mots-clés.
 */
import { BRAND, eventDate, SITE, LOGO_JAUNE, type Lang } from "../brand";

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

/** Dernière slide — CTA : titre + bouton d'action (gros) + dates (grosses). */
export function slideCTA(o: { title: string; highlight?: string[]; sub?: string; button?: string; url?: string; lang: Lang }): string {
  const button = o.button ?? SITE;
  return `
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
      <h2 class="display" style="font-size:108px;">${rich(o.title, o.highlight)}</h2>
      ${o.sub ? `<p class="grey" style="font-size:38px;margin-top:26px;max-width:840px;line-height:1.35;">${escapeHtml(o.sub)}</p>` : ""}
      <div style="margin-top:60px;display:inline-flex;align-self:flex-start;background:${BRAND.gold};color:${BRAND.bg};font-family:${BRAND.display};font-weight:900;font-size:58px;padding:30px 56px;border-radius:12px;letter-spacing:.02em;">
        ${escapeHtml(button)}
      </div>
      <div class="gold" style="font-family:${BRAND.display};font-weight:900;font-size:56px;margin-top:60px;line-height:1.05;">${eventDate(o.lang)}</div>
    </div>`;
}

/* ============================ blocs additionnels ============================ */

/** Multi-stats : un titre + plusieurs chiffres (chiffres énormes, valeur en or). */
export function statsBlock(o: { eyebrow?: string; title?: string; items: { value: string; label: string }[] }): string {
  const n = o.items.length;
  const vSize = n <= 2 ? 184 : n === 3 ? 150 : 124;
  const lSize = n <= 2 ? 40 : 34;
  const rows = o.items
    .map(
      (it) => `<div>
        <div class="display gold" style="font-size:${vSize}px;line-height:.95;">${escapeHtml(it.value)}</div>
        <div class="grey" style="font-size:${lSize}px;margin-top:6px;">${escapeHtml(it.label)}</div>
      </div>`,
    )
    .join(`<div style="height:${n <= 2 ? 56 : 34}px;"></div>`);
  return `
    ${o.eyebrow ? `<div class="eyebrow">${escapeHtml(o.eyebrow)}</div>` : ""}
    ${o.title ? `<h2 class="display" style="font-size:84px;margin-top:${o.eyebrow ? 28 : 0}px;">${rich(o.title)}</h2>` : ""}
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">${rows}</div>`;
}

/** Grand drapeau + % géant + pays. */
export function flagStat(o: { flag: string; value: string; label: string }): string {
  return `
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
      <img src="${o.flag}" style="width:200px;height:auto;border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,.5);" />
      <div class="display gold" style="font-size:300px;line-height:.9;margin-top:36px;">${escapeHtml(o.value)}</div>
      <div class="display" style="font-size:72px;">${escapeHtml(o.label)}</div>
    </div>`;
}

/** Lignes drapeau + pays + %. */
export function flagRows(o: { title?: string; rows: { flag: string; country: string; pct: string }[] }): string {
  const rows = o.rows
    .map(
      (r) => `<div style="display:flex;align-items:center;gap:34px;padding:34px 0;border-top:2px solid rgba(255,255,255,.12);">
        <img src="${r.flag}" style="width:120px;height:auto;border-radius:6px;" />
        <div class="display" style="font-size:58px;flex:1;">${escapeHtml(r.country)}</div>
        <div class="display gold" style="font-size:96px;">${escapeHtml(r.pct)}</div>
      </div>`,
    )
    .join("");
  return `
    ${o.title ? `<h2 class="display" style="font-size:76px;margin-bottom:20px;">${rich(o.title)}</h2>` : ""}
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">${rows}</div>`;
}

/** Mur média : tuiles logos (sur blanc) et/ou noms en or (sur sombre). */
export function mediaWall(o: { title: string; highlight?: string[]; items: ({ logo: string } | { name: string })[] }): string {
  const cols = o.items.length <= 4 ? 2 : o.items.length <= 6 ? 2 : 3;
  const cells = o.items
    .map((it) =>
      "logo" in it
        ? `<div style="aspect-ratio:16/9;border-radius:14px;background:${BRAND.white};display:flex;align-items:center;justify-content:center;padding:26px;overflow:hidden;"><img src="${it.logo}" style="max-width:100%;max-height:100%;object-fit:contain;" /></div>`
        : `<div style="aspect-ratio:16/9;border-radius:14px;background:#161616;border:2px solid rgba(244,173,60,.25);display:flex;align-items:center;justify-content:center;padding:20px;text-align:center;"><span class="display gold" style="font-size:54px;line-height:.95;">${escapeHtml(it.name)}</span></div>`,
    )
    .join("");
  return `
    <h2 class="display" style="font-size:82px;margin-bottom:44px;">${rich(o.title, o.highlight)}</h2>
    <div style="flex:1;display:grid;grid-template-columns:repeat(${cols},1fr);gap:26px;align-content:center;">${cells}</div>`;
}

/** Légende d'un portrait plein cadre (bas de slide). */
export function portraitCaption(o: { name: string; flag?: string; followers: string }): string {
  return `
    <div style="flex:1;"></div>
    <div style="display:flex;align-items:flex-end;gap:24px;">
      ${o.flag ? `<img src="${o.flag}" style="width:96px;height:auto;border-radius:6px;margin-bottom:16px;" />` : ""}
      <div>
        <div class="display" style="font-size:84px;line-height:.95;">${escapeHtml(o.name)}</div>
        <div class="display gold" style="font-size:60px;margin-top:8px;">${escapeHtml(o.followers)}</div>
      </div>
    </div>`;
}

/** Deux portraits côte à côte (chacun nom + abonnés). */
export function portraitDuo(o: { left: { img: string; name: string; flag?: string; followers: string }; right: { img: string; name: string; flag?: string; followers: string } }): string {
  const half = (p: { img: string; name: string; flag?: string; followers: string }) => `
    <div style="position:relative;flex:1;border-radius:18px;overflow:hidden;">
      <div style="position:absolute;inset:0;background-image:url('${p.img}');background-size:cover;background-position:center;"></div>
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.9),rgba(0,0,0,.1) 55%);"></div>
      <div style="position:absolute;left:28px;right:20px;bottom:28px;">
        ${p.flag ? `<img src="${p.flag}" style="width:64px;height:auto;border-radius:4px;margin-bottom:10px;" />` : ""}
        <div class="display" style="font-size:48px;line-height:.95;">${escapeHtml(p.name)}</div>
        <div class="display gold" style="font-size:44px;margin-top:4px;">${escapeHtml(p.followers)}</div>
      </div>
    </div>`;
  return `<div style="flex:1;display:flex;gap:24px;">${half(o.left)}${half(o.right)}</div>`;
}

/** Médailles stylisées (or/argent/bronze) + texte. */
export function medals(o: { title?: string; sub?: string }): string {
  const disc = (grad: string, ring: string) =>
    `<div style="width:220px;height:220px;border-radius:50%;background:${grad};border:7px solid ${ring};box-shadow:0 16px 44px rgba(0,0,0,.55),inset 0 5px 16px rgba(255,255,255,.4),inset 0 -8px 20px rgba(0,0,0,.25);"></div>`;
  return `
    ${o.title ? `<h2 class="display" style="font-size:80px;margin-bottom:8px;">${rich(o.title)}</h2>` : ""}
    <div style="flex:1;display:flex;align-items:center;justify-content:center;gap:56px;">
      ${disc("radial-gradient(circle at 35% 30%,#F0D592,#B4862B 58%,#7C5A18)", "#D8B25E")}
      ${disc("radial-gradient(circle at 35% 30%,#D6D6D9,#7D7D80 58%,#525255)", "#B5B5B8")}
      ${disc("radial-gradient(circle at 35% 30%,#DBA887,#A86A52 58%,#724333)", "#C18A70")}
    </div>
    ${o.sub ? `<div class="display" style="font-size:64px;text-align:center;">${rich(o.sub)}</div>` : ""}`;
}

/** Hero « VS » — Grill Arena. */
export function vsHero(o: { title: string; subtitle: string; hook1: string; hook2: string }): string {
  return `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <div class="display" style="font-size:300px;line-height:.85;background:linear-gradient(90deg,#fff 0 49%,${BRAND.gold} 51% 100%);-webkit-background-clip:text;background-clip:text;color:transparent;">VS</div>
      <h1 class="display gold" style="font-size:104px;margin-top:8px;letter-spacing:.02em;">${escapeHtml(o.title)}</h1>
      <div class="display" style="font-size:52px;margin-top:10px;">${escapeHtml(o.subtitle)}</div>
    </div>
    <div style="text-align:center;">
      <div class="grey" style="font-size:36px;">${escapeHtml(o.hook1)}</div>
      <div class="display gold" style="font-size:48px;margin-top:10px;">${escapeHtml(o.hook2)}</div>
    </div>`;
}

/** Deux familles de produits (numéro or + titre + détail), sur fond photo. */
export function categoryPair(o: { items: { num: string; title: string; sub?: string }[] }): string {
  const cell = (it: { num: string; title: string; sub?: string }) => `
    <div>
      <div class="display gold" style="font-size:110px;line-height:.9;">${escapeHtml(it.num)}</div>
      <div class="display" style="font-size:72px;margin-top:8px;">${escapeHtml(it.title)}</div>
      ${it.sub ? `<div class="grey" style="font-size:34px;margin-top:10px;max-width:840px;line-height:1.3;">${escapeHtml(it.sub)}</div>` : ""}
    </div>`;
  return `<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:64px;">${o.items.map(cell).join("")}</div>`;
}

/** Bandeau logo (gros logo centré, ex. ouverture/fermeture). */
export function logoBanner(o: { caption?: string } = {}): string {
  return `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <img src="${LOGO_JAUNE}" alt="Barbecue Expo" style="height:240px;width:auto;" />
      ${o.caption ? `<div class="grey" style="font-size:38px;margin-top:40px;">${escapeHtml(o.caption)}</div>` : ""}
    </div>`;
}

// Tuile logo — taille normalisée par la HAUTEUR (poids visuel homogène).
function logoTile(l: { src: string; dark?: boolean }): string {
  return `<div style="flex:0 0 calc((100% - 48px) / 3);aspect-ratio:5/3;border-radius:12px;display:flex;align-items:center;justify-content:center;padding:30px 34px;overflow:hidden;background:${l.dark ? "#161616" : BRAND.white};">
    <img src="${l.src}" alt="" style="max-width:82%;max-height:54%;object-fit:contain;" /></div>`;
}
const gridWrap = (cells: string) => `<div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;">${cells}</div>`;

/** Grille de logos d'enseignes (+ option `faded` = logos qui s'effacent → scroll infini). */
export function logoGrid(o: { title: string; highlight?: string[]; logos: { src: string; dark?: boolean }[]; faded?: string[] }): string {
  const cells = o.logos.map((l) => logoTile(l)).join("");
  const fadedCells = (o.faded ?? []).map((src) => logoTile({ src })).join("");
  const fadedRow = fadedCells
    ? `<div style="margin-top:24px;-webkit-mask-image:linear-gradient(to bottom,#000 0%,transparent 88%);mask-image:linear-gradient(to bottom,#000 0%,transparent 88%);filter:grayscale(1) blur(1px);opacity:.45;">${gridWrap(fadedCells)}</div>`
    : "";
  return `
    <h2 class="display" style="font-size:84px;margin-bottom:44px;">${rich(o.title, o.highlight)}</h2>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
      ${gridWrap(cells)}
      ${fadedRow}
    </div>`;
}

/** « Et beaucoup d'autres pros » : titre + lignes catégories + logos + logos floutés. */
export function proMix(o: { title: string; highlight?: string[]; lines: string[]; logos: string[]; faded?: string[] }): string {
  const lineEls = o.lines
    .map((l) => `<div class="display" style="font-size:46px;display:flex;align-items:center;gap:18px;"><span class="gold">·</span>${escapeHtml(l)}</div>`)
    .join("");
  const cells = o.logos.map((src) => logoTile({ src })).join("");
  const fadedCells = (o.faded ?? []).map((src) => logoTile({ src })).join("");
  const fadedRow = fadedCells
    ? `<div style="margin-top:22px;-webkit-mask-image:linear-gradient(to bottom,#000 0%,transparent 90%);mask-image:linear-gradient(to bottom,#000 0%,transparent 90%);filter:grayscale(1) blur(1.5px);opacity:.4;">${gridWrap(fadedCells)}</div>`
    : "";
  return `
    <h2 class="display" style="font-size:80px;">${rich(o.title, o.highlight)}</h2>
    <div style="display:flex;flex-direction:column;gap:14px;margin:28px 0 36px;">${lineEls}</div>
    ${gridWrap(cells)}
    ${fadedRow}`;
}

/** Pastille Award (style PDF : carré ivoire, monogramme B, AWARD, BEST <catégorie>). */
function awardBadge(category: string): string {
  return `<div style="flex:0 0 calc((100% - 52px) / 3);aspect-ratio:1/1;border-radius:18px;background:#F4EAD2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:26px;text-align:center;box-shadow:0 12px 36px rgba(0,0,0,.45);">
    <img src="${LOGO_JAUNE}" style="height:104px;width:auto;filter:saturate(1.05);" />
    <div class="display" style="font-size:40px;color:#7A5E1E;letter-spacing:.04em;line-height:1;">AWARD</div>
    <div style="color:#B4862B;font-weight:800;font-size:26px;text-transform:uppercase;letter-spacing:.05em;line-height:1.05;">${escapeHtml(category)}</div>
  </div>`;
}

/** Grille des pastilles Awards. */
export function awardGrid(o: { title?: string; highlight?: string[]; items: { category: string }[] }): string {
  const cells = o.items.map((it) => awardBadge(it.category)).join("");
  return `
    ${o.title ? `<h2 class="display" style="font-size:78px;margin-bottom:44px;">${rich(o.title, o.highlight)}</h2>` : ""}
    <div style="flex:1;display:flex;flex-wrap:wrap;gap:26px;justify-content:center;align-content:center;">${cells}</div>`;
}
