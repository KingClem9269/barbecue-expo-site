import {
  getAllPitmasters,
  getCountryName,
  getSessionDays,
  getSpecialties,
} from "@/lib/pitmasters";
import { buildMetadata } from "@/lib/seo";
import PitmastersList from "@/components/pitmasters/PitmastersList";

// Localized UI labels for this page
const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    all: string;
    country: string;
    specialty: string;
    day: string;
    zero: string;
    one: string;
    many: string; // must contain {count}
    empty: string;
  }
> = {
  fr: {
    eyebrow: "Édition 2027",
    title: "Les pitmasters",
    description:
      "20 pitmasters internationaux. 25 nationalités représentées dans le public. 12 masterclasses. 3 jours d'apprentissage intense autour du feu.",
    all: "Tous",
    country: "Pays",
    specialty: "Spécialité",
    day: "Jour",
    zero: "Aucun pitmaster trouvé",
    one: "1 pitmaster",
    many: "{count} pitmasters",
    empty: "Aucun pitmaster ne correspond aux filtres sélectionnés.",
  },
  en: {
    eyebrow: "2027 edition",
    title: "The pitmasters",
    description:
      "20 international pitmasters. 25 nationalities in the audience. 12 masterclasses. 3 days of intense fire-driven learning.",
    all: "All",
    country: "Country",
    specialty: "Specialty",
    day: "Day",
    zero: "No pitmaster found",
    one: "1 pitmaster",
    many: "{count} pitmasters",
    empty: "No pitmaster matches the selected filters.",
  },
  es: {
    eyebrow: "Edición 2027",
    title: "Los pitmasters",
    description:
      "20 pitmasters internacionales. 25 nacionalidades representadas. 12 masterclasses. 3 días de aprendizaje intenso alrededor del fuego.",
    all: "Todos",
    country: "País",
    specialty: "Especialidad",
    day: "Día",
    zero: "Ningún pitmaster encontrado",
    one: "1 pitmaster",
    many: "{count} pitmasters",
    empty: "Ningún pitmaster coincide con los filtros.",
  },
  de: {
    eyebrow: "Ausgabe 2027",
    title: "Die Pitmaster",
    description:
      "20 internationale Pitmaster. 25 vertretene Nationalitäten. 12 Masterclasses. 3 Tage intensives Lernen rund ums Feuer.",
    all: "Alle",
    country: "Land",
    specialty: "Spezialität",
    day: "Tag",
    zero: "Kein Pitmaster gefunden",
    one: "1 Pitmaster",
    many: "{count} Pitmaster",
    empty: "Kein Pitmaster entspricht den Filtern.",
  },
  nl: {
    eyebrow: "Editie 2027",
    title: "De pitmasters",
    description:
      "20 internationale pitmasters. 25 vertegenwoordigde nationaliteiten. 12 masterclasses. 3 dagen intensief leren rond het vuur.",
    all: "Alle",
    country: "Land",
    specialty: "Specialiteit",
    day: "Dag",
    zero: "Geen pitmaster gevonden",
    one: "1 pitmaster",
    many: "{count} pitmasters",
    empty: "Geen pitmaster voldoet aan de filters.",
  },
  pt: {
    eyebrow: "Edição 2027",
    title: "Os pitmasters",
    description:
      "20 pitmasters internacionais. 25 nacionalidades representadas. 12 masterclasses. 3 dias de aprendizagem intensa à volta do fogo.",
    all: "Todos",
    country: "País",
    specialty: "Especialidade",
    day: "Dia",
    zero: "Nenhum pitmaster encontrado",
    one: "1 pitmaster",
    many: "{count} pitmasters",
    empty: "Nenhum pitmaster corresponde aos filtros.",
  },
  it: {
    eyebrow: "Edizione 2027",
    title: "I pitmaster",
    description:
      "20 pitmaster internazionali. 25 nazionalità rappresentate. 12 masterclass. 3 giorni di apprendimento intenso attorno al fuoco.",
    all: "Tutti",
    country: "Paese",
    specialty: "Specialità",
    day: "Giorno",
    zero: "Nessun pitmaster trovato",
    one: "1 pitmaster",
    many: "{count} pitmaster",
    empty: "Nessun pitmaster corrisponde ai filtri.",
  },
};

const SPECIALTY_NAMES: Record<string, Record<string, string>> = {
  low_slow: {
    fr: "Low & Slow",
    en: "Low & Slow",
    es: "Low & Slow",
    de: "Low & Slow",
    nl: "Low & Slow",
    pt: "Low & Slow",
    it: "Low & Slow",
  },
  wood_fire: {
    fr: "Feu de bois",
    en: "Wood fire",
    es: "Fuego de leña",
    de: "Holzfeuer",
    nl: "Houtvuur",
    pt: "Fogo a lenha",
    it: "Fuoco di legna",
  },
  competition: {
    fr: "Compétition",
    en: "Competition",
    es: "Competición",
    de: "Wettkampf",
    nl: "Wedstrijd",
    pt: "Competição",
    it: "Competizione",
  },
  modern_french: {
    fr: "BBQ français",
    en: "Modern French BBQ",
    es: "BBQ francés",
    de: "Französisches BBQ",
    nl: "Franse BBQ",
    pt: "BBQ francês",
    it: "BBQ francese",
  },
  kamado: { fr: "Kamado", en: "Kamado", es: "Kamado", de: "Kamado", nl: "Kamado", pt: "Kamado", it: "Kamado" },
  smoking_charcuterie: {
    fr: "Charcuterie fumée",
    en: "Smoked charcuterie",
    es: "Charcutería ahumada",
    de: "Räucherware",
    nl: "Gerookte charcuterie",
    pt: "Charcutaria fumada",
    it: "Salumi affumicati",
  },
  mediterranean: {
    fr: "Méditerranéen",
    en: "Mediterranean",
    es: "Mediterráneo",
    de: "Mediterran",
    nl: "Mediterraan",
    pt: "Mediterrâneo",
    it: "Mediterraneo",
  },
  live_fire_plant: {
    fr: "Feu vif & légumes",
    en: "Live fire & plants",
    es: "Fuego vivo & vegetales",
    de: "Live Fire & Gemüse",
    nl: "Live fire & groenten",
    pt: "Fogo vivo & vegetais",
    it: "Fuoco vivo & vegetali",
  },
  steak_dry_aged: {
    fr: "Steak & dry-aged",
    en: "Steak & dry-aged",
    es: "Steak & dry-aged",
    de: "Steak & Dry Aged",
    nl: "Steak & dry-aged",
    pt: "Steak & dry-aged",
    it: "Steak & dry-aged",
  },
  asado: { fr: "Asado", en: "Asado", es: "Asado", de: "Asado", nl: "Asado", pt: "Asado", it: "Asado" },
  yakitori: { fr: "Yakitori", en: "Yakitori", es: "Yakitori", de: "Yakitori", nl: "Yakitori", pt: "Yakitori", it: "Yakitori" },
  korean_bbq: {
    fr: "BBQ coréen",
    en: "Korean BBQ",
    es: "BBQ coreano",
    de: "Koreanisches BBQ",
    nl: "Koreaanse BBQ",
    pt: "BBQ coreano",
    it: "BBQ coreano",
  },
  parrilla: { fr: "Parrilla", en: "Parrilla", es: "Parrilla", de: "Parrilla", nl: "Parrilla", pt: "Parrilla", it: "Parrilla" },
  smoking_fish: {
    fr: "Poisson fumé",
    en: "Smoked fish",
    es: "Pescado ahumado",
    de: "Räucherfisch",
    nl: "Gerookte vis",
    pt: "Peixe fumado",
    it: "Pesce affumicato",
  },
  churrasco: { fr: "Churrasco", en: "Churrasco", es: "Churrasco", de: "Churrasco", nl: "Churrasco", pt: "Churrasco", it: "Churrasco" },
  sausages: {
    fr: "Saucisses",
    en: "Sausages",
    es: "Embutidos",
    de: "Würste",
    nl: "Worsten",
    pt: "Salsichas",
    it: "Salsicce",
  },
  brace: { fr: "Brace", en: "Brace", es: "Brace", de: "Brace", nl: "Brace", pt: "Brace", it: "Brace" },
  nordic_smoke: {
    fr: "Fumage nordique",
    en: "Nordic smoke",
    es: "Ahumado nórdico",
    de: "Nordisches Räuchern",
    nl: "Noords roken",
    pt: "Fumagem nórdica",
    it: "Affumicatura nordica",
  },
  fusion: { fr: "Fusion", en: "Fusion", es: "Fusión", de: "Fusion", nl: "Fusion", pt: "Fusão", it: "Fusion" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.fr;
  return buildMetadata(locale, "/pitmasters", {
    title: `${ui.title} — Barbecue Expo 2026`,
    description: ui.description,
  });
}

export default async function PitmastersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.fr;

  const [pitmasters, specialties, days] = await Promise.all([
    getAllPitmasters(),
    getSpecialties(),
    getSessionDays(),
  ]);

  // Pre-compute country + specialty localized label maps (SSR, client-passed)
  const countryNames: Record<string, string> = {};
  for (const p of pitmasters) {
    countryNames[p.country] = getCountryName(p.country, locale);
  }
  const specialtyLabels: Record<string, string> = {};
  for (const key of specialties) {
    specialtyLabels[key] =
      SPECIALTY_NAMES[key]?.[locale] || SPECIALTY_NAMES[key]?.fr || key;
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Header hero */}
      <section className="relative bg-ink-950 pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-gold-500/15 via-transparent to-transparent blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-6">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.title}
          </h1>
          <p className="mt-8 text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed">
            {ui.description}
          </p>
        </div>
      </section>

      {/* Listing */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <PitmastersList
          pitmasters={pitmasters}
          locale={locale}
          countryNames={countryNames}
          specialtyNames={specialtyLabels}
          labels={{
            all: ui.all,
            country: ui.country,
            specialty: ui.specialty,
            day: ui.day,
            zero: ui.zero,
            one: ui.one,
            many: ui.many,
            empty: ui.empty,
          }}
          days={days}
        />
      </section>
    </div>
  );
}
