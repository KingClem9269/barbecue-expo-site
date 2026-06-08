"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import pitmastersData from "@/content/pitmasters/index.json";
import { getCountryName, type Pitmaster } from "@/lib/pitmasters-shared";

/**
 * AwardsJury — international jury showcase. Reuses pitmaster data for
 * visual coverage (a real jury will replace this data once confirmed).
 * Shows 6 profiles in a grid with role labels.
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    roles: string[]; // 6 role labels
  }
> = {
  fr: {
    eyebrow: "Le jury 2027",
    title: "Six experts. Six continents. Une seule table.",
    subtitle:
      "Le jury est composé de pitmasters reconnus, de chefs étoilés et d'analystes du secteur. Tous indépendants. Leur identité est connue, leurs votes restent confidentiels.",
    roles: [
      "Président du jury",
      "Pitmaster champion du monde",
      "Chef étoilé Michelin",
      "Directrice éditoriale presse BBQ",
      "Consultante produits outdoor",
      "Critique gastronomique",
    ],
  },
  en: {
    eyebrow: "The 2027 jury",
    title: "Six experts. Six continents. One table.",
    subtitle:
      "The jury includes recognized pitmasters, Michelin-starred chefs and industry analysts. All independent. Identities are public, votes remain confidential.",
    roles: [
      "Jury chair",
      "World-champion pitmaster",
      "Michelin-starred chef",
      "BBQ media editor-in-chief",
      "Outdoor product consultant",
      "Food critic",
    ],
  },
  es: {
    eyebrow: "El jurado 2027",
    title: "Seis expertos. Seis continentes. Una sola mesa.",
    subtitle:
      "El jurado está compuesto por pitmasters reconocidos, chefs estrella Michelin y analistas del sector. Todos independientes. Sus identidades son públicas, sus votos permanecen confidenciales.",
    roles: [
      "Presidente del jurado",
      "Pitmaster campeón mundial",
      "Chef con estrella Michelin",
      "Directora editorial prensa BBQ",
      "Consultora productos exterior",
      "Crítico gastronómico",
    ],
  },
  de: {
    eyebrow: "Die Jury 2027",
    title: "Sechs Experten. Sechs Kontinente. Ein Tisch.",
    subtitle:
      "Die Jury besteht aus anerkannten Pitmastern, Michelin-Sterneköchen und Branchenanalysten. Alle unabhängig. Identitäten öffentlich, Stimmen vertraulich.",
    roles: [
      "Jury-Vorsitz",
      "Weltmeister-Pitmaster",
      "Michelin-Sternekoch",
      "BBQ-Chefredakteurin",
      "Outdoor-Produkt-Beraterin",
      "Gastronomiekritiker",
    ],
  },
  nl: {
    eyebrow: "De jury 2027",
    title: "Zes experts. Zes continenten. Eén tafel.",
    subtitle:
      "De jury bestaat uit erkende pitmasters, Michelin-sterrenchefs en sectoranalisten. Allen onafhankelijk. Identiteiten openbaar, stemmen vertrouwelijk.",
    roles: [
      "Juryvoorzitter",
      "Wereldkampioen pitmaster",
      "Michelin-sterrenchef",
      "Hoofdredacteur BBQ-media",
      "Outdoor-product consultant",
      "Gastronomiecriticus",
    ],
  },
  pt: {
    eyebrow: "O júri 2027",
    title: "Seis especialistas. Seis continentes. Uma só mesa.",
    subtitle:
      "O júri é composto por pitmasters reconhecidos, chefs com estrela Michelin e analistas do setor. Todos independentes. Identidades públicas, votos confidenciais.",
    roles: [
      "Presidente do júri",
      "Pitmaster campeão mundial",
      "Chef com estrela Michelin",
      "Diretora editorial imprensa BBQ",
      "Consultora produtos outdoor",
      "Crítico gastronómico",
    ],
  },
  it: {
    eyebrow: "La giuria 2027",
    title: "Sei esperti. Sei continenti. Un solo tavolo.",
    subtitle:
      "La giuria è composta da pitmaster riconosciuti, chef stellati Michelin e analisti del settore. Tutti indipendenti. Identità pubbliche, voti confidenziali.",
    roles: [
      "Presidente di giuria",
      "Pitmaster campione del mondo",
      "Chef stellato Michelin",
      "Direttrice stampa BBQ",
      "Consulente prodotti outdoor",
      "Critico gastronomico",
    ],
  },
};

export default function AwardsJury() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;
  const pitmasters = pitmastersData as Pitmaster[];
  // 6 profiles with rotated portraits for visual variety
  const members = pitmasters.slice(0, 6).map((p, i) => ({
    name: p.name,
    country: p.country,
    portrait: p.portrait,
    role: ui.roles[i] || ui.roles[0],
  }));

  return (
    <section className="relative w-full bg-cream-50 py-14 md:py-20" aria-label="Jury">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8 md:mb-12">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
          <div className="lg:col-span-8">
            <h2
              className="text-ink-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.title}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-ink-600 text-base md:text-lg leading-relaxed">
              {ui.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {members.map((m, i) => (
            <div key={i} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-char-800 rounded-sm mb-4">
                {m.portrait && (
                  <Image
                    src={m.portrait}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover object-center grayscale contrast-[1.05] transition-all duration-500 group-hover:grayscale-0"
                  />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-80"
                  aria-hidden="true"
                />
                <div className="absolute inset-3 ring-1 ring-gold-500/0 group-hover:ring-gold-500/60 transition-all duration-500 pointer-events-none rounded-sm" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <Image
                  src={`/flags/${m.country}.svg`}
                  alt=""
                  width={12}
                  height={12}
                  className="w-3 h-3 rounded-full object-cover"
                />
                <span className="text-xs text-ink-600 uppercase tracking-widest">
                  {getCountryName(m.country, locale)}
                </span>
              </div>
              <h3
                className="text-ink-900 text-xl md:text-2xl leading-tight font-bold mb-1"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {m.name}
              </h3>
              <p className="text-gold-700 text-xs md:text-sm uppercase tracking-widest font-semibold">
                {m.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
