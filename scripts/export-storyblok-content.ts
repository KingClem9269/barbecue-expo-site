import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs/promises";
import path from "path";
import https from "https";
import http from "http";

const TOKEN = process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN;
if (!TOKEN) {
  console.error("Missing NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN in .env.local");
  process.exit(1);
}

const LOCALES = ["fr", "en"];
const BASE_URL = "https://api.storyblok.com/v2";
const CONTENT_DIR = path.join(process.cwd(), "content");
const IMAGES_DIR = path.join(process.cwd(), "public", "content", "images");

// Relations to resolve per slug pattern
const RELATION_MAP: Record<string, string> = {
  home: "blog-preview.articles",
  "program/bbq-street-food": "bbq-street-food.bbq-cards",
};

function getResolveRelations(slug: string): string | undefined {
  for (const [pattern, relations] of Object.entries(RELATION_MAP)) {
    if (slug === pattern) return relations;
  }
  return undefined;
}

async function fetchJson(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${url}`);
  }
  return response.json();
}

async function fetchAllStories(locale: string): Promise<any[]> {
  const stories: any[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = `${BASE_URL}/cdn/stories?token=${TOKEN}&version=draft&language=${locale}&per_page=${perPage}&page=${page}`;
    console.log(`  Fetching page ${page} for locale "${locale}"...`);
    const data = await fetchJson(url);
    stories.push(...data.stories);
    if (data.stories.length < perPage) break;
    page++;
  }

  return stories;
}

async function fetchStoryWithRelations(slug: string, locale: string): Promise<any> {
  const resolveRelations = getResolveRelations(slug);
  let url = `${BASE_URL}/cdn/stories/${slug}?token=${TOKEN}&version=draft&language=${locale}&resolve_links=url`;
  if (resolveRelations) {
    url += `&resolve_relations=${encodeURIComponent(resolveRelations)}`;
  }
  const data = await fetchJson(url);
  return data.story;
}

// Collect all image URLs from a JSON object
function collectImageUrls(obj: any, urls: Set<string>): void {
  if (!obj || typeof obj !== "object") return;
  if (Array.isArray(obj)) {
    for (const item of obj) collectImageUrls(item, urls);
    return;
  }
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string" && value.includes("a.storyblok.com")) {
      urls.add(value);
    } else if (typeof value === "object") {
      collectImageUrls(value, urls);
    }
  }
}

// Replace image URLs in a JSON object
function replaceImageUrls(obj: any, urlMap: Map<string, string>): any {
  if (!obj) return obj;
  if (typeof obj === "string") {
    for (const [oldUrl, newPath] of urlMap) {
      if (obj === oldUrl) return newPath;
      if (obj.includes(oldUrl)) return obj.replace(oldUrl, newPath);
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => replaceImageUrls(item, urlMap));
  }
  if (typeof obj === "object") {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = replaceImageUrls(value, urlMap);
    }
    return result;
  }
  return obj;
}

// Remove _editable fields recursively
function stripEditable(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(stripEditable);
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === "_editable") continue;
    result[key] = stripEditable(value);
  }
  return result;
}

async function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location!, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      const chunks: Buffer[] = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", async () => {
        await fs.writeFile(dest, Buffer.concat(chunks));
        resolve();
      });
      response.on("error", reject);
    }).on("error", reject);
  });
}

function extractFilename(url: string): string {
  // Storyblok URLs: https://a.storyblok.com/f/SPACE_ID/HASH/filename.ext
  const urlObj = new URL(url);
  const parts = urlObj.pathname.split("/");
  // Use last 2 parts (hash + filename) to avoid collisions
  const hash = parts[parts.length - 2] || "";
  const filename = parts[parts.length - 1] || "unknown";
  return `${hash}_${filename}`;
}

async function main() {
  console.log("=== Storyblok Content Export ===\n");

  // Create directories
  for (const locale of LOCALES) {
    await fs.mkdir(path.join(CONTENT_DIR, locale), { recursive: true });
  }
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  // Step 1: Fetch all stories for each locale
  const allStories: Map<string, Map<string, any>> = new Map();
  const imageUrls = new Set<string>();

  for (const locale of LOCALES) {
    console.log(`\n📦 Fetching stories for locale "${locale}"...`);
    const stories = await fetchAllStories(locale);
    console.log(`  Found ${stories.length} stories`);

    const storyMap = new Map<string, any>();

    for (const story of stories) {
      const rawSlug = story.full_slug.replace(/\/$/, ""); // Remove trailing slash
      // Storyblok prefixes non-default locale slugs with the locale code
      // but the API expects slugs WITHOUT the locale prefix when using language param
      const slug = rawSlug.replace(new RegExp(`^${locale}/`), "");
      console.log(`  Re-fetching "${slug}" with relations...`);
      try {
        const fullStory = await fetchStoryWithRelations(slug, locale);
        storyMap.set(slug, fullStory);
      } catch (e: any) {
        console.warn(`  ⚠️ Failed to fetch "${slug}": ${e.message}`);
        storyMap.set(slug, story);
      }
    }

    allStories.set(locale, storyMap);
  }

  // Step 2: Collect all image URLs
  console.log("\n🖼️  Collecting image URLs...");
  for (const [, storyMap] of allStories) {
    for (const [, story] of storyMap) {
      collectImageUrls(story, imageUrls);
    }
  }
  console.log(`  Found ${imageUrls.size} unique images`);

  // Step 3: Download images
  console.log("\n⬇️  Downloading images...");
  const urlMap = new Map<string, string>();

  for (const url of imageUrls) {
    const filename = extractFilename(url);
    const destPath = path.join(IMAGES_DIR, filename);
    const publicPath = `/content/images/${filename}`;
    urlMap.set(url, publicPath);

    try {
      await fs.access(destPath);
      console.log(`  ✓ Already exists: ${filename}`);
    } catch {
      try {
        console.log(`  ⬇ Downloading: ${filename}`);
        await downloadFile(url, destPath);
      } catch (e: any) {
        console.warn(`  ⚠️ Failed to download ${url}: ${e.message}`);
      }
    }
  }

  // Step 4: Save stories as JSON with replaced URLs
  console.log("\n💾 Saving stories...");
  for (const [locale, storyMap] of allStories) {
    for (const [slug, story] of storyMap) {
      // Replace image URLs
      let processed = replaceImageUrls(story, urlMap);
      // Strip _editable fields
      processed = stripEditable(processed);

      // Determine file path: use -- for path separators
      const safeSlug = slug.replace(/\//g, "--");
      const filePath = path.join(CONTENT_DIR, locale, `${safeSlug}.json`);

      await fs.writeFile(filePath, JSON.stringify(processed, null, 2), "utf-8");
      console.log(`  ✓ ${locale}/${safeSlug}.json`);
    }
  }

  console.log("\n✅ Export complete!");
  console.log(`  Content: ${CONTENT_DIR}`);
  console.log(`  Images: ${IMAGES_DIR}`);
}

main().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
