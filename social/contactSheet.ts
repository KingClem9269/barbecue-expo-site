/** Contact-sheet : mosaïque de toutes les slides pour validation rapide. */
import sharp from "sharp";
import { BRAND } from "./brand";

export async function buildContactSheet(
  slides: Buffer[],
  opts: { cols?: number; thumbW?: number; gap?: number; pad?: number } = {},
): Promise<Buffer> {
  const cols = opts.cols ?? (slides.length <= 4 ? slides.length : 3);
  const thumbW = opts.thumbW ?? 540;
  const gap = opts.gap ?? 28;
  const pad = opts.pad ?? 40;

  // Redimensionne chaque slide à la même largeur, hauteur déduite du ratio réel.
  const thumbs = await Promise.all(
    slides.map(async (buf) => {
      const resized = await sharp(buf).resize({ width: thumbW }).png().toBuffer();
      const meta = await sharp(resized).metadata();
      return { buf: resized, w: meta.width ?? thumbW, h: meta.height ?? thumbW };
    }),
  );

  const rows = Math.ceil(thumbs.length / cols);
  const rowH = Math.max(...thumbs.map((t) => t.h));
  const sheetW = pad * 2 + cols * thumbW + (cols - 1) * gap;
  const sheetH = pad * 2 + rows * rowH + (rows - 1) * gap;

  const composites = thumbs.map((t, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    return {
      input: t.buf,
      left: pad + c * (thumbW + gap),
      top: pad + r * (rowH + gap),
    };
  });

  return sharp({
    create: {
      width: sheetW,
      height: sheetH,
      channels: 3,
      background: BRAND.bg,
    },
  })
    .composite(composites)
    .png()
    .toBuffer();
}
