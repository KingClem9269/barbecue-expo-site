"use client";
import { useLocale } from "next-intl";
import { Flame } from "lucide-react";

const UI: Record<
  string,
  { eyebrow: string; title: string; subtitle: string; tagline: string }
> = {
  fr: {
    eyebrow: "Exclusif 2027 · Format battle",
    title: "Grill Arena",
    subtitle:
      "Le seul format battle live du secteur. Des pitmasters internationaux s'affrontent en duel, devant le public, avec 90 minutes, un jury, et une pièce de viande identique pour tous.",
    tagline: "Seize entrants. Un champion. Tout le monde regarde.",
  },
  en: {
    eyebrow: "Exclusive 2027 · Battle format",
    title: "Grill Arena",
    subtitle:
      "The only live battle format in the industry. International pitmasters go head-to-head, in front of the audience, with 90 minutes, one jury, and an identical cut of meat for everyone.",
    tagline: "Sixteen entrants. One champion. Everyone watching.",
  },
  es: {
    eyebrow: "Exclusivo 2027 · Formato battle",
    title: "Grill Arena",
    subtitle:
      "El único formato battle en directo del sector. Pitmasters internacionales se enfrentan en duelo, ante el público, con 90 minutos, un jurado y una pieza de carne idéntica para todos.",
    tagline: "Dieciséis participantes. Un campeón. Todo el mundo mira.",
  },
  de: {
    eyebrow: "Exklusiv 2027 · Battle-Format",
    title: "Grill Arena",
    subtitle:
      "Das einzige Live-Battle-Format der Branche. Internationale Pitmaster treten im Duell gegeneinander an, vor Publikum, mit 90 Minuten, einer Jury und identischem Fleisch für alle.",
    tagline: "Sechzehn Teilnehmer. Ein Champion. Alle schauen zu.",
  },
  nl: {
    eyebrow: "Exclusief 2027 · Battle-formaat",
    title: "Grill Arena",
    subtitle:
      "Het enige live-battle-formaat van de sector. Internationale pitmasters nemen het tegen elkaar op, voor het publiek, met 90 minuten, één jury en een identiek stuk vlees voor iedereen.",
    tagline: "Zestien deelnemers. Eén kampioen. Iedereen kijkt.",
  },
  pt: {
    eyebrow: "Exclusivo 2027 · Formato battle",
    title: "Grill Arena",
    subtitle:
      "O único formato battle ao vivo do setor. Pitmasters internacionais enfrentam-se em duelo, perante o público, com 90 minutos, um júri e uma peça de carne idêntica para todos.",
    tagline: "Dezasseis concorrentes. Um campeão. Toda a gente a ver.",
  },
  it: {
    eyebrow: "Esclusiva 2027 · Formato battle",
    title: "Grill Arena",
    subtitle:
      "L'unico formato battle dal vivo del settore. Pitmaster internazionali si sfidano in duello, davanti al pubblico, con 90 minuti, una giuria e un taglio di carne identico per tutti.",
    tagline: "Sedici concorrenti. Un campione. Tutti a guardare.",
  },
};

export default function GrillArenaHero() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-ink-950 pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
      {/* Dramatic ember glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full bg-gradient-radial from-ember-600/25 via-gold-500/8 to-transparent blur-3xl" />
      </div>

      {/* Flame pattern bg */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="ga-flame" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M40 20 Q 35 35, 40 50 Q 45 35, 40 20"
              stroke="#F4AD3C"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ga-flame)" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10 md:mb-14">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="flex items-start gap-6 md:gap-12 mb-10">
          <h1
            className="text-cream-50 text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[12rem] leading-[0.85] tracking-tight font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.title}
          </h1>
          <div
            className="hidden md:flex flex-col items-center gap-2 pt-6 lg:pt-10 text-gold-500 shrink-0"
            aria-hidden="true"
          >
            <span
              className="text-5xl md:text-6xl lg:text-8xl leading-none font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              VS
            </span>
            <span className="w-px h-16 lg:h-24 bg-gold-500/50" />
            <Flame className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={1.5} />
          </div>
        </div>

        <p className="text-cream-50/85 text-lg md:text-xl lg:text-2xl leading-snug max-w-3xl mb-8">
          {ui.subtitle}
        </p>

        <p
          className="text-gold-500 text-xl md:text-2xl lg:text-3xl italic max-w-3xl leading-snug"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          « {ui.tagline} »
        </p>
      </div>
    </section>
  );
}
