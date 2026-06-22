/**
 * Build d'une campagne d'assets sociaux — FR + EN.
 *
 *   tsx social/build.ts <slug>
 *
 * Sortie : public/exports/instagram/<slug>/{fr,en}/ avec slides PNG,
 * caption.txt, contact-sheet.png et (si animé) GIF + MP4 (story + feed).
 */
import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { FORMATS, type Format, type Lang, L } from "./brand";
import { renderSlide } from "./templates";
import { renderHtmlToPng, closeBrowser } from "./render";
import { buildContactSheet } from "./contactSheet";
import { encodeAnimation } from "./anim";
import { renderAnimationFrames, animationFormats, animationFps } from "./animations";
import type { Campaign } from "./types";

const LANGS: Lang[] = ["fr", "en"];

async function loadCampaign(slug: string): Promise<Campaign> {
  const file = path.resolve(process.cwd(), "social/campaigns", `${slug}.ts`);
  const mod = await import(pathToFileURL(file).href);
  return (mod.default ?? mod.campaign) as Campaign;
}

async function buildLang(campaign: Campaign, lang: Lang, fmt: Format, baseDir: string) {
  const { w, h } = FORMATS[fmt];
  const outDir = path.join(baseDir, lang);
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  console.log(`  · ${lang.toUpperCase()}`);

  const slides = campaign.slides ?? [];
  if (slides.length) {
    const buffers: Buffer[] = [];
    for (let i = 0; i < slides.length; i++) {
      const buf = await renderHtmlToPng(renderSlide(slides[i], { w, h, lang }), w, h, w, h);
      await writeFile(path.join(outDir, `slide-${String(i + 1).padStart(2, "0")}.png`), buf);
      buffers.push(buf);
    }
    await writeFile(path.join(outDir, "contact-sheet.png"), await buildContactSheet(buffers));
    console.log(`    ✓ ${slides.length} slides + contact-sheet`);
  }

  await writeFile(path.join(outDir, "caption.txt"), L(campaign.caption, lang).trim() + "\n", "utf8");

  if (campaign.animated) {
    const anim = campaign.animated;
    const fps = animationFps(anim);
    for (const animFmt of animationFormats(anim)) {
      const frames = await renderAnimationFrames(anim, animFmt, lang);
      await encodeAnimation(frames, path.join(outDir, `anim-${animFmt}`), { fps });
      console.log(`    ✓ anim-${animFmt} (${frames.length} frames)`);
    }
  }
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage : tsx social/build.ts <slug>");
    process.exit(1);
  }
  const campaign = await loadCampaign(slug);
  const fmt: Format = campaign.format ?? "portrait";
  const baseDir = path.resolve(process.cwd(), "public/exports/instagram", slug);
  console.log(`\n▸ Campagne « ${slug} » — format ${fmt} (${FORMATS[fmt].w}×${FORMATS[fmt].h})`);
  for (const lang of LANGS) await buildLang(campaign, lang, fmt, baseDir);
  await closeBrowser();
  console.log(`\n✅ Export → public/exports/instagram/${slug}/{fr,en}/\n`);
}

main().catch(async (e) => {
  console.error(e);
  await closeBrowser();
  process.exit(1);
});
