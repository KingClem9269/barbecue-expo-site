/**
 * Pure shared helpers and types for pitmasters, usable both client and server.
 * Server-only file (lib/pitmasters.ts) handles fs-based loading.
 */

export type PitmasterSession = {
  day: string;
  time: string;
  type: "Masterclass" | "Cooking Show" | "Grill Arena";
  title: string;
};

export type PitmasterSocial = {
  instagram?: string;
  youtube?: string;
  website?: string;
  followers?: number;
};

export type Pitmaster = {
  slug: string;
  name: string;
  country: string;
  specialty: string;
  specialtyKey: string;
  stand?: string;
  bio_fr: string;
  bio_en: string;
  sessions?: PitmasterSession[];
  social?: PitmasterSocial;
  portrait?: string;
};

/** Get the localized bio with a fallback to EN, then FR. */
export function getBio(p: Pitmaster, locale: string): string {
  const localized = (p as unknown as Record<string, string>)[`bio_${locale}`];
  return localized || p.bio_en || p.bio_fr || "";
}

const COUNTRY_NAMES: Record<string, Record<string, string>> = {
  us: { fr: "États-Unis", en: "United States", es: "Estados Unidos", de: "USA", nl: "Verenigde Staten", pt: "Estados Unidos", it: "Stati Uniti" },
  de: { fr: "Allemagne", en: "Germany", es: "Alemania", de: "Deutschland", nl: "Duitsland", pt: "Alemanha", it: "Germania" },
  fr: { fr: "France", en: "France", es: "Francia", de: "Frankreich", nl: "Frankrijk", pt: "França", it: "Francia" },
  gb: { fr: "Royaume-Uni", en: "United Kingdom", es: "Reino Unido", de: "Vereinigtes Königreich", nl: "Verenigd Koninkrijk", pt: "Reino Unido", it: "Regno Unito" },
  ca: { fr: "Canada", en: "Canada", es: "Canadá", de: "Kanada", nl: "Canada", pt: "Canadá", it: "Canada" },
  gr: { fr: "Grèce", en: "Greece", es: "Grecia", de: "Griechenland", nl: "Griekenland", pt: "Grécia", it: "Grecia" },
  it: { fr: "Italie", en: "Italy", es: "Italia", de: "Italien", nl: "Italië", pt: "Itália", it: "Italia" },
  es: { fr: "Espagne", en: "Spain", es: "España", de: "Spanien", nl: "Spanje", pt: "Espanha", it: "Spagna" },
  nl: { fr: "Pays-Bas", en: "Netherlands", es: "Países Bajos", de: "Niederlande", nl: "Nederland", pt: "Países Baixos", it: "Paesi Bassi" },
  br: { fr: "Brésil", en: "Brazil", es: "Brasil", de: "Brasilien", nl: "Brazilië", pt: "Brasil", it: "Brasile" },
  ar: { fr: "Argentine", en: "Argentina", es: "Argentina", de: "Argentinien", nl: "Argentinië", pt: "Argentina", it: "Argentina" },
  jp: { fr: "Japon", en: "Japan", es: "Japón", de: "Japan", nl: "Japan", pt: "Japão", it: "Giappone" },
  kr: { fr: "Corée du Sud", en: "South Korea", es: "Corea del Sur", de: "Südkorea", nl: "Zuid-Korea", pt: "Coreia do Sul", it: "Corea del Sud" },
  ch: { fr: "Suisse", en: "Switzerland", es: "Suiza", de: "Schweiz", nl: "Zwitserland", pt: "Suíça", it: "Svizzera" },
  dk: { fr: "Danemark", en: "Denmark", es: "Dinamarca", de: "Dänemark", nl: "Denemarken", pt: "Dinamarca", it: "Danimarca" },
  be: { fr: "Belgique", en: "Belgium", es: "Bélgica", de: "Belgien", nl: "België", pt: "Bélgica", it: "Belgio" },
};

export function getCountryName(code: string, locale: string): string {
  return (
    COUNTRY_NAMES[code]?.[locale] ||
    COUNTRY_NAMES[code]?.fr ||
    code.toUpperCase()
  );
}
