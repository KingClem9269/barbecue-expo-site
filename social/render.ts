/**
 * Rendu HTML → PNG via Chrome headless (puppeteer-core, Chrome système).
 * Rendu en deviceScaleFactor 2 (2160px) puis ré-échantillonné à la dimension
 * cible (1080) pour un maximum de netteté (supersampling).
 */
import puppeteer, { type Browser } from "puppeteer-core";
import sharp from "sharp";

const CHROME_PATH =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

let browser: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
  if (browser) return browser;
  browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      "--no-sandbox",
      "--hide-scrollbars",
      "--force-color-profile=srgb",
      "--font-render-hinting=none",
    ],
  });
  return browser;
}

export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
  }
}

/**
 * Rend un document HTML (dimensions w×h en CSS px) et renvoie un PNG à la
 * dimension cible (outW×outH). Capture en ×2 puis downscale.
 */
export async function renderHtmlToPng(
  html: string,
  w: number,
  h: number,
  outW = w,
  outH = h,
): Promise<Buffer> {
  const b = await getBrowser();
  const page = await b.newPage();
  try {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "load", timeout: 30000 });
    // s'assurer que les polices (SansPlomb + Inter Tight) sont prêtes
    await page.evaluate(async () => {
      await (document as Document & { fonts: FontFaceSet }).fonts.ready;
    });
    const shot = (await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: w, height: h },
    })) as Buffer;
    // shot est en 2× → on ré-échantillonne à la dimension d'export
    return await sharp(shot).resize(outW, outH, { fit: "fill" }).png().toBuffer();
  } finally {
    await page.close();
  }
}
