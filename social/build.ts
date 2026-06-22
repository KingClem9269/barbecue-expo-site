/**
 * Build d'une campagne d'assets sociaux.
 *
 *   tsx social/build.ts <slug>
 *
 * Lit social/campaigns/<slug>.ts, rend chaque slide via Chrome headless,
 * exporte les PNG (1080×…), caption.txt, contact-sheet.png, et — si la
 * campagne est animée — un GIF + MP4 (story 1080×1920 et feed 1080×1350).
 */
import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { FORMATS, type Format } from "./brand";
import { renderSlide } from "./templates";
import { frame } from "./templates/base";
import { giantStat } from "./components/blocks";
import { photo } from "./brand";
import { renderHtmlToPng, closeBrowser } from "./render";
import { buildContactSheet } from "./contactSheet";
import { encodeAnimation } from "./anim";
import type { Campaign, AnimatedSpec } from "./types";

const fmtNum = (n: number) => Math.round(n).toLocaleString("fr-FR").replace(/ | /g, " ");
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

async function loadCampaign(slug: string): Promise<Campaign> {
  const file = path.resolve(process.cwd(), "social/campaigns", `${slug}.ts`);
  const mod = await import(pathToFileURL(file).href);
  return (mod.default ?? mod.campaign) as Campaign;
}

/** Rend les frames d'un compteur animé pour un format donné. */
async function renderCounterFrames(a: AnimatedSpec, fmt: Format): Promise<Buffer[]> {
  const { w, h } = FORMATS[fmt];
  const n = a.frames ?? 30;
  const from = a.from ?? 0;
  const bg = a.photo ? photo(a.photo) : undefined;
  const frames: Buffer[] = [];
  for (let i = 0; i < n; i++) {
    const t = easeOutCubic(i / (n - 1));
    const value = from + (a.to - from) * t;
    const content = giantStat({ value: fmtNum(value), unit: a.unit, label: a.label });
    const html = frame({ w, h, bg, content, showPageNo: false });
    frames.push(await renderHtmlToPng(html, w, h, w, h));
    process.stdout.write(`\r   frame ${i + 1}/${n}`);
  }
  process.stdout.write("\n");
  return frames;
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage : tsx social/build.ts <slug>");
    process.exit(1);
  }

  const campaign = await loadCampaign(slug);
  const fmt: Format = campaign.format ?? "portrait";
  const { w, h } = FORMATS[fmt];
  const outDir = path.resolve(process.cwd(), "public/exports/instagram", slug);
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  console.log(`\n▸ Campagne « ${slug} » — format ${fmt} (${w}×${h})`);

  // 1) Slides PNG
  const total = campaign.slides.length;
  const slideBuffers: Buffer[] = [];
  for (let i = 0; i < total; i++) {
    const html = renderSlide(campaign.slides[i], { w, h, index: i + 1, total });
    const buf = await renderHtmlToPng(html, w, h, w, h);
    const name = `slide-${String(i + 1).padStart(2, "0")}.png`;
    await writeFile(path.join(outDir, name), buf);
    slideBuffers.push(buf);
    console.log(`   ✓ ${name}`);
  }

  // 2) Légende
  await writeFile(path.join(outDir, "caption.txt"), campaign.caption.trim() + "\n", "utf8");
  console.log("   ✓ caption.txt");

  // 3) Contact-sheet
  const sheet = await buildContactSheet(slideBuffers);
  await writeFile(path.join(outDir, "contact-sheet.png"), sheet);
  console.log("   ✓ contact-sheet.png");

  // 4) Animé (GIF + MP4) — story 1080×1920 + feed 1080×1350
  if (campaign.animated) {
    const fps = campaign.animated.fps ?? 30;
    for (const animFmt of ["story", "portrait"] as Format[]) {
      console.log(`   ⏵ animation ${animFmt}…`);
      const frames = await renderCounterFrames(campaign.animated, animFmt);
      const base = path.join(outDir, `anim-${animFmt}`);
      const { mp4, gif } = await encodeAnimation(frames, base, { fps });
      console.log(`   ✓ ${path.basename(mp4)} + ${path.basename(gif)}`);
    }
  }

  await closeBrowser();
  console.log(`\n✅ Export → public/exports/instagram/${slug}/\n`);
}

main().catch(async (e) => {
  console.error(e);
  await closeBrowser();
  process.exit(1);
});
