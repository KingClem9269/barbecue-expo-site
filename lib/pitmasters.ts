import fs from "fs/promises";
import path from "path";
import type { Pitmaster } from "./pitmasters-shared";

export * from "./pitmasters-shared";

const DATA_PATH = path.join(
  process.cwd(),
  "content",
  "pitmasters",
  "index.json",
);

export async function getAllPitmasters(): Promise<Pitmaster[]> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function getPitmasterBySlug(
  slug: string,
): Promise<Pitmaster | null> {
  const all = await getAllPitmasters();
  return all.find((p) => p.slug === slug) || null;
}

/** All unique countries represented across the lineup. */
export async function getPitmasterCountries(): Promise<string[]> {
  const all = await getAllPitmasters();
  return Array.from(new Set(all.map((p) => p.country))).sort();
}

/** All unique specialty keys (for filter UI). */
export async function getSpecialties(): Promise<string[]> {
  const all = await getAllPitmasters();
  return Array.from(new Set(all.map((p) => p.specialtyKey))).sort();
}

/** All unique days across all sessions. */
export async function getSessionDays(): Promise<string[]> {
  const all = await getAllPitmasters();
  const days = new Set<string>();
  for (const p of all) {
    for (const s of p.sessions || []) days.add(s.day);
  }
  return Array.from(days);
}
