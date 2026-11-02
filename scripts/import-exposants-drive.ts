/**
 * Importe la liste des exposants 2027 depuis le drive partagé des fiches
 * exposant (export du portail exposant, dossier public « 2027 »).
 *
 * Structure lue : 2027 / <exposant> / <marque> / Description, Logo, Photos, Catalogue
 *   - Description : « <marque> - fiche description.docx » (texte, liens, catégories)
 *   - Logo, Photos : images (redimensionnées ici) ; Catalogue : PDF (lien drive)
 * Un exposant sans sous-dossier de marque est affiché sous son propre nom.
 *
 * Produit :
 *   - content/brands/exposants-2027.json   liste lue par /exposants
 *   - public/exposants-2027/logos|photos/  images
 *
 * Lancement (macOS : utilise unzip et sips) :  npm run exposants
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { Brand, BrandSocial } from "../lib/brands-shared";
import { TAXONOMY, type CategoryKey, type SubCategoryKey } from "../lib/exhibitor-taxonomy";

const DOSSIER_2027 = "1tRnoYodq6HP5Bb6egNhk3OJku8WT9egU";
const SORTIE_JSON = path.join(process.cwd(), "content/brands/exposants-2027.json");
const SORTIE_IMAGES = path.join(process.cwd(), "public/exposants-2027");

/** Dossiers d'essai du portail (et l'organisateur), jamais publiés. */
const EXCLUS = [/^test\b/i, /^hoho$/i, /^jpc$/i, /^social pay$/i];

/**
 * Fiche à lire à la place d'une autre (exposant/marque). Barbecue Mag : la
 * fiche officielle porte un logo d'essai, la bonne est dans « Smoked Mag ».
 * À retirer quand la fiche sera corrigée dans le portail.
 */
const REMPLACEMENTS: Record<string, [exposant: string, marque: string]> = {
  "Barbecue mag/Barbecue Mag": ["Barbecue mag", "Smoked Mag"],
};

/**
 * Catégories fixées à la main, par nom de fiche, prioritaires sur la fiche :
 * pour les exposants qui n'en ont pas choisi dans le portail. {} = aucune.
 */
const CATEGORIES_FIXEES: Record<string, Brand["categories"]> = JSON.parse(
  readFileSync(path.join(process.cwd(), "content/brands/categories-2027.json"), "utf8"),
);

const IMAGE = /\.(png|jpe?g|webp)$/i;

type Entree = { id: string; titre: string; dossier: boolean };

type Fiche = {
  nom?: string;
  societe?: string;
  description?: string;
  liens: Record<string, string>;
  categories: string[];
};

/* ------------------------------------------------------------------ */
/*  Drive (dossiers publics : pas de clé)                             */
/* ------------------------------------------------------------------ */

async function lister(id: string): Promise<Entree[]> {
  const res = await fetch(`https://drive.google.com/embeddedfolderview?id=${id}`);
  if (!res.ok) throw new Error(`Drive ${res.status} sur le dossier ${id}`);
  const html = await res.text();
  const re =
    /<div class="flip-entry" id="entry-([^"]+)"[\s\S]*?<a href="([^"]+)"[\s\S]*?<div class="flip-entry-title">([\s\S]*?)<\/div>/g;
  return [...html.matchAll(re)].map((m) => ({
    id: m[1],
    titre: decoder(m[3]).trim(),
    dossier: m[2].includes("/folders/"),
  }));
}

async function telecharger(id: string): Promise<Buffer | null> {
  const res = await fetch(`https://drive.google.com/uc?export=download&id=${id}`);
  // Page HTML = fichier trop lourd pour le téléchargement direct : ignoré.
  if (!res.ok || res.headers.get("content-type")?.includes("text/html")) return null;
  return Buffer.from(await res.arrayBuffer());
}

/** Sous-dossiers d'une marque, par nom (Description, Logo, Photos…). */
async function contenu(id: string): Promise<Record<string, Entree[]>> {
  const out: Record<string, Entree[]> = {};
  for (const e of await lister(id)) {
    if (e.dossier) out[e.titre] = (await lister(e.id)).filter((f) => !f.dossier);
  }
  return out;
}

function decoder(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/* ------------------------------------------------------------------ */
/*  Fiche description (.docx)                                          */
/* ------------------------------------------------------------------ */

const SECTIONS = ["Description", "Liens", "Catégories de produits"];

async function lireFiche(docx: Buffer): Promise<Fiche> {
  const tmp = path.join(os.tmpdir(), `fiche-${process.pid}-${Math.random().toString(36).slice(2)}.docx`);
  await fs.writeFile(tmp, docx);
  const xml = execFileSync("unzip", ["-p", tmp, "word/document.xml"]).toString("utf8");
  await fs.rm(tmp);

  const lignes = [...xml.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)]
    .map((p) => decoder([...p[0].matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map((t) => t[1]).join("")).trim())
    .filter(Boolean);

  const fiche: Fiche = { nom: lignes[0], liens: {}, categories: [] };
  let section = "";
  const description: string[] = [];
  for (let i = 1; i < lignes.length; i++) {
    const l = lignes[i];
    if (l.startsWith("Société :")) fiche.societe = l.slice(9).trim();
    else if (SECTIONS.includes(l)) section = l;
    else if (section === "Description") description.push(l);
    else if (section === "Liens") fiche.liens[l] = lignes[++i] ?? "";
    else if (section === "Catégories de produits" && l !== "Barbecue Expo") fiche.categories.push(l);
  }
  const texte = description.join("\n").trim();
  // Texte d'essai (« ohodajoda ») : au moins trois mots pour être publié.
  if (texte.split(/\s+/).length >= 3) fiche.description = texte;
  return fiche;
}

/** « Marques de barbecues » Gaz, Charbon » → { barbecue: ["gas", "charcoal"] }. */
function categories(lignes: string[]): Brand["categories"] {
  const out: Partial<Record<CategoryKey, SubCategoryKey[]>> = {};
  const cle = (s: string) => s.trim().toLowerCase().replace(/’/g, "'");
  for (const ligne of lignes) {
    const [parent, subs = ""] = ligne.split("»");
    const cat = TAXONOMY.find((c) => cle(c.labels.fr) === cle(parent));
    if (!cat) continue;
    out[cat.key] = subs
      .split(",")
      .map((s) => cat.sub.find((x) => cle(x.labels.fr) === cle(s))?.key)
      .filter((k): k is SubCategoryKey => Boolean(k));
  }
  return Object.keys(out).length ? out : undefined;
}

/* ------------------------------------------------------------------ */
/*  Liens saisis par l'exposant (URL ou simple « @compte »)            */
/* ------------------------------------------------------------------ */

function site(v?: string): string | undefined {
  const s = v?.trim();
  if (!s) return undefined;
  if (/^https?:\/\//i.test(s)) return s;
  return /^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(s) ? `https://${s}` : undefined;
}

function reseau(v: string | undefined, prefixe?: string): string | undefined {
  const s = v?.trim();
  if (!s) return undefined;
  if (/^https?:\/\//i.test(s)) return s;
  if (/^[\w.]+\.[a-z]{2,}\//i.test(s)) return `https://${s}`;
  const compte = s.replace(/^@/, "");
  return prefixe && /^[\w.]+$/.test(compte) ? `${prefixe}${compte}` : undefined;
}

function reseaux(liens: Record<string, string>): BrandSocial | undefined {
  const social: BrandSocial = {
    instagram: reseau(liens.Instagram, "https://www.instagram.com/"),
    facebook: reseau(liens.Facebook),
    linkedin: reseau(liens.LinkedIn),
    youtube: reseau(liens.YouTube),
    tiktok: reseau(liens.TikTok, "https://www.tiktok.com/@"),
  };
  return Object.values(social).some(Boolean) ? social : undefined;
}

/* ------------------------------------------------------------------ */
/*  Images                                                             */
/* ------------------------------------------------------------------ */

async function image(fichier: Entree, dossier: "logos" | "photos", slug: string): Promise<string | undefined> {
  const data = await telecharger(fichier.id);
  if (!data) return undefined;
  const source = path.join(os.tmpdir(), `${slug}-${fichier.id}${path.extname(fichier.titre).toLowerCase()}`);
  await fs.writeFile(source, data);
  const ext = dossier === "photos" ? "jpg" : path.extname(fichier.titre).slice(1).toLowerCase().replace("jpeg", "jpg");
  const nom = `${slug}.${ext}`;
  const args =
    dossier === "photos"
      ? ["-s", "format", "jpeg", "-s", "formatOptions", "75", "-Z", "1400"]
      : ["-Z", "600"];
  execFileSync("sips", [...args, source, "--out", path.join(SORTIE_IMAGES, dossier, nom)], { stdio: "ignore" });
  await fs.rm(source);
  return `/exposants-2027/${dossier}/${nom}`;
}

/* ------------------------------------------------------------------ */
/*  Import                                                             */
/* ------------------------------------------------------------------ */

function nomExposant(titre: string): string {
  return titre
    .replace(/\s+[–-]\s+Stand\s+\S+$/i, "")
    .replace(/\s+·\s+EXH-\w+$/i, "")
    .trim();
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function marque(
  exposant: string,
  dossierMarque: string,
  dossiers: Record<string, Entree[]>,
  remplacement: boolean,
): Promise<Brand | null> {
  const docx = (dossiers.Description ?? []).find((f) => f.titre.endsWith(".docx"));
  const data = docx && (await telecharger(docx.id));
  const fiche: Fiche = data ? await lireFiche(data) : { liens: {}, categories: [] };
  // Marque créée par un compte d'essai du portail.
  if (!remplacement && fiche.societe && /^test\b/i.test(fiche.societe)) return null;

  const name = fiche.nom || dossierMarque;
  const slug = slugify(name);
  const logos = (dossiers.Logo ?? []).filter((f) => IMAGE.test(f.titre));
  const logo = logos.find((f) => / - logo\./i.test(f.titre)) ?? logos[0];
  const photo = (dossiers.Photos ?? []).find((f) => IMAGE.test(f.titre) && !/logo/i.test(f.titre));
  const catalogue = (dossiers.Catalogue ?? []).find((f) => /\.pdf$/i.test(f.titre));

  return {
    slug,
    name,
    company: slugify(exposant) === slug ? undefined : exposant,
    categories: categories(fiche.categories),
    tier: "bronze",
    logo: logo && (await image(logo, "logos", slug)),
    coverImage: photo && (await image(photo, "photos", slug)),
    description: fiche.description,
    website: site(fiche.liens["Site web"]),
    social: reseaux(fiche.liens),
    catalogUrl: catalogue && `https://drive.google.com/file/d/${catalogue.id}/view`,
  };
}

async function main() {
  await fs.rm(SORTIE_IMAGES, { recursive: true, force: true });
  await fs.mkdir(path.join(SORTIE_IMAGES, "logos"), { recursive: true });
  await fs.mkdir(path.join(SORTIE_IMAGES, "photos"), { recursive: true });

  const racine = (await lister(DOSSIER_2027)).filter((e) => e.dossier);
  const exposants = racine.filter((e) => !EXCLUS.some((re) => re.test(e.titre)));
  const ignores = racine.filter((e) => !exposants.includes(e)).map((e) => e.titre);

  // Dossiers de marque de chaque exposant (aussi utilisés par les REMPLACEMENTS).
  const sousDossiers = new Map<string, Entree[]>();
  for (const e of racine) sousDossiers.set(e.titre, (await lister(e.id)).filter((m) => m.dossier));
  const sources = new Set(Object.values(REMPLACEMENTS).map((r) => r.join("/")));

  // Un même exposant peut avoir plusieurs dossiers (« X », « X – Stand A1 »…).
  const parExposant = new Map<string, { nom: string; brands: Brand[] }>();
  for (const e of exposants) {
    const nom = nomExposant(e.titre);
    const entree = parExposant.get(nom.toLowerCase()) ?? { nom, brands: [] };
    parExposant.set(nom.toLowerCase(), entree);
    for (const m of sousDossiers.get(e.titre) ?? []) {
      const chemin = `${e.titre}/${m.titre}`;
      if (sources.has(chemin)) continue; // lue à la place d'une autre fiche
      const [dossierExposant, dossierMarque] = REMPLACEMENTS[chemin] ?? [e.titre, m.titre];
      const source = sousDossiers.get(dossierExposant)?.find((x) => x.titre === dossierMarque);
      if (!source) continue;
      const b = await marque(nom, m.titre, await contenu(source.id), chemin in REMPLACEMENTS);
      if (b && !entree.brands.some((x) => x.slug === b.slug)) entree.brands.push(b);
    }
    process.stdout.write(".");
  }

  const liste: Brand[] = [...parExposant.values()].flatMap(({ nom, brands }) =>
    brands.length ? brands : [{ slug: slugify(nom), name: nom, tier: "bronze" as const }],
  );
  for (const b of liste) {
    const fixees = CATEGORIES_FIXEES[b.name];
    if (fixees) b.categories = Object.keys(fixees).length ? fixees : undefined;
  }
  liste.sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));

  await fs.writeFile(SORTIE_JSON, JSON.stringify(liste, null, 2) + "\n");
  console.log(
    `\n${parExposant.size} exposants, ${liste.length} fiches (${liste.filter((b) => b.logo).length} avec logo, ` +
      `${liste.filter((b) => b.description).length} avec description, ` +
      `${liste.filter((b) => b.categories).length} avec catégorie).`,
  );
  const sansCategorie = liste.filter((b) => !b.categories).map((b) => b.name);
  if (sansCategorie.length) console.log(`Sans catégorie : ${sansCategorie.join(", ")}`);
  console.log(`Dossiers ignorés : ${ignores.join(", ") || "aucun"}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
