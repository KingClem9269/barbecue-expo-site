import fs from "fs/promises";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function getPageContent(
  slug: string,
  locale: string
): Promise<any | null> {
  const safeSlug = slug.replace(/\//g, "--");
  const filePath = path.join(CONTENT_DIR, locale, `${safeSlug}.json`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function getConfig(locale: string): Promise<any | null> {
  const story = await getPageContent("config", locale);
  if (!story) return null;
  return { content: story.content };
}
