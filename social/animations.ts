/**
 * Générateurs de frames pour les campagnes animées.
 * Chaque fonction renvoie un tableau de Buffers PNG (une frame par image).
 */
import { FORMATS, type Format, photo, LOGO_JAUNE, EVENT_DATE, SITE, BRAND } from "./brand";
import { frame } from "./templates/base";
import { giantStat } from "./components/blocks";
import { renderHtmlToPng } from "./render";
import type { Animation, CounterAnim, CounterSequenceAnim, GrillArenaAnim } from "./types";

const fmtNum = (n: number) => Math.round(n).toLocaleString("fr-FR").replace(/ | /g, " ");
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));

/** Voile or radial (étincelle) d'opacité variable. */
function spark(op: number): string {
  if (op <= 0.01) return "";
  return `<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 42%,rgba(244,173,60,${op.toFixed(3)}) 0%,transparent 55%);pointer-events:none;"></div>`;
}

/* ---------------- compteur simple ---------------- */
async function counterFrames(a: CounterAnim, fmt: Format): Promise<Buffer[]> {
  const { w, h } = FORMATS[fmt];
  const n = a.frames ?? 30;
  const from = a.from ?? 0;
  const bg = a.photo ? photo(a.photo) : undefined;
  const out: Buffer[] = [];
  for (let i = 0; i < n; i++) {
    const t = easeOutCubic(i / (n - 1));
    const content = giantStat({ value: fmtNum(from + (a.to - from) * t), unit: a.unit, label: a.label });
    out.push(await renderHtmlToPng(frame({ w, h, bg, content, showPageNo: false }), w, h, w, h));
  }
  return out;
}

/* ---------------- séquence de compteurs + carte finale ---------------- */
async function counterSequenceFrames(a: CounterSequenceAnim, fmt: Format): Promise<Buffer[]> {
  const { w, h } = FORMATS[fmt];
  const fps = a.fps ?? 24;
  const bg = a.photo ? photo(a.photo) : undefined;
  const out: Buffer[] = [];

  for (const seg of a.segments) {
    const frames = Math.max(8, Math.round((seg.seconds ?? 1.1) * fps));
    const from = seg.from ?? 0;
    for (let i = 0; i < frames; i++) {
      const p = i / (frames - 1);
      const t = easeOutCubic(p);
      const value = `${fmtNum(from + (seg.to - from) * t)}${seg.unit ? ` ${seg.unit}` : ""}`;
      const sparkOp = clamp((p - 0.82) / 0.18) * 0.55; // flash en fin de palier
      const content = `${giantStat({ value, label: seg.label })}${spark(sparkOp)}`;
      out.push(await renderHtmlToPng(frame({ w, h, bg, content, showPageNo: false }), w, h, w, h));
    }
  }

  // carte finale
  if (a.endCard) {
    const lines = a.endCard.lines
      .map((l, i) => `<div class="${i === 0 ? "display gold" : "grey"}" style="font-size:${i === 0 ? 56 : 38}px;margin-top:${i === 0 ? 0 : 8}px;">${l}</div>`)
      .join("");
    const card = `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
        <img src="${LOGO_JAUNE}" style="height:200px;width:auto;margin-bottom:48px;" />
        ${lines}
      </div>`;
    const hold = Math.round(1.3 * fps);
    const html = frame({ w, h, bg, content: card, showPageNo: false });
    const buf = await renderHtmlToPng(html, w, h, w, h);
    for (let i = 0; i < hold; i++) out.push(buf);
  }
  return out;
}

/* ---------------- Grill Arena (VS) ---------------- */
function grillArenaContent(t: number): string {
  // phases : VS slam (0-.3) → titre (.3-.55) → sous-texte (.55-.85) → hold
  const vsP = clamp(t / 0.3);
  const vsScale = 1 + (1 - easeOutCubic(vsP)) * 0.8; // 1.8 → 1
  const vsOp = easeOutCubic(vsP);
  const sparkOp = clamp(1 - Math.abs(t - 0.26) / 0.12) * 0.6;
  const titleP = clamp((t - 0.32) / 0.22);
  const subP = clamp((t - 0.56) / 0.24);
  const titleY = (1 - easeOutCubic(titleP)) * 60;
  const subY = (1 - easeOutCubic(subP)) * 50;
  return `
    ${spark(sparkOp)}
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <div class="display" style="font-size:320px;line-height:.85;opacity:${vsOp.toFixed(3)};transform:scale(${vsScale.toFixed(3)});background:linear-gradient(90deg,#fff 0 49%,${BRAND.gold} 51% 100%);-webkit-background-clip:text;background-clip:text;color:transparent;">VS</div>
      <h1 class="display gold" style="font-size:120px;margin-top:6px;opacity:${easeOutCubic(titleP).toFixed(3)};transform:translateY(${titleY.toFixed(1)}px);">GRILL ARENA</h1>
      <div class="display" style="font-size:56px;margin-top:14px;opacity:${easeOutCubic(subP).toFixed(3)};transform:translateY(${subY.toFixed(1)}px);">3 jours · 1 champion</div>
    </div>
    <div style="text-align:center;opacity:${easeOutCubic(subP).toFixed(3)};">
      <div class="display gold" style="font-size:44px;">${EVENT_DATE}</div>
      <div class="grey" style="font-size:32px;margin-top:8px;">${SITE}</div>
    </div>`;
}

async function grillArenaFrames(a: GrillArenaAnim, fmt: Format): Promise<Buffer[]> {
  const { w, h } = FORMATS[fmt];
  const fps = a.fps ?? 24;
  const n = Math.round(2 * fps); // ~2s
  const bg = a.photo ? photo(a.photo) : undefined;
  const out: Buffer[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    out.push(await renderHtmlToPng(frame({ w, h, bg, content: grillArenaContent(t), showPageNo: false }), w, h, w, h));
  }
  return out;
}

export async function renderAnimationFrames(anim: Animation, fmt: Format): Promise<Buffer[]> {
  if (anim.kind === "counter") return counterFrames(anim, fmt);
  if (anim.kind === "counterSequence") return counterSequenceFrames(anim, fmt);
  return grillArenaFrames(anim, fmt);
}

export function animationFormats(anim: Animation): Format[] {
  if ("formats" in anim && anim.formats) return anim.formats;
  return ["story", "portrait"];
}

export function animationFps(anim: Animation): number {
  return anim.fps ?? (anim.kind === "counter" ? 30 : 24);
}
