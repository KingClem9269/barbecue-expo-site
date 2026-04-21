"use client";
import { useLocale } from "next-intl";
import { Medal } from "lucide-react";

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    tagline: string;
  }
> = {
  fr: {
    eyebrow: "Première édition · 2027",
    title: "Barbecue Expo Awards",
    subtitle:
      "Pour la première fois en Europe, un jury international distingue les meilleures marques du secteur BBQ. Or, argent, bronze — trois médailles, cinq catégories, une seule référence.",
    tagline: "La distinction qui fait de vous une marque à suivre.",
  },
  en: {
    eyebrow: "First edition · 2027",
    title: "Barbecue Expo Awards",
    subtitle:
      "For the first time in Europe, an international jury distinguishes the best brands of the BBQ industry. Gold, silver, bronze — three medals, five categories, one reference.",
    tagline: "The distinction that makes you a brand to follow.",
  },
  es: {
    eyebrow: "Primera edición · 2027",
    title: "Barbecue Expo Awards",
    subtitle:
      "Por primera vez en Europa, un jurado internacional distingue a las mejores marcas del sector BBQ. Oro, plata, bronce — tres medallas, cinco categorías, una sola referencia.",
    tagline: "La distinción que lo convierte en una marca que seguir.",
  },
  de: {
    eyebrow: "Erste Ausgabe · 2027",
    title: "Barbecue Expo Awards",
    subtitle:
      "Zum ersten Mal in Europa würdigt eine internationale Jury die besten Marken der BBQ-Branche. Gold, Silber, Bronze — drei Medaillen, fünf Kategorien, eine Referenz.",
    tagline: "Die Auszeichnung, die Sie zur Marke macht, der man folgen sollte.",
  },
  nl: {
    eyebrow: "Eerste editie · 2027",
    title: "Barbecue Expo Awards",
    subtitle:
      "Voor het eerst in Europa onderscheidt een internationale jury de beste merken van de BBQ-industrie. Goud, zilver, brons — drie medailles, vijf categorieën, één referentie.",
    tagline: "De onderscheiding die u tot een merk maakt dat gevolgd moet worden.",
  },
  pt: {
    eyebrow: "Primeira edição · 2027",
    title: "Barbecue Expo Awards",
    subtitle:
      "Pela primeira vez na Europa, um júri internacional distingue as melhores marcas do setor BBQ. Ouro, prata, bronze — três medalhas, cinco categorias, uma só referência.",
    tagline: "A distinção que faz de si uma marca a seguir.",
  },
  it: {
    eyebrow: "Prima edizione · 2027",
    title: "Barbecue Expo Awards",
    subtitle:
      "Per la prima volta in Europa, una giuria internazionale distingue i migliori marchi del settore BBQ. Oro, argento, bronzo — tre medaglie, cinque categorie, un solo riferimento.",
    tagline: "La distinzione che fa di te un marchio da seguire.",
  },
};

export default function AwardsHero() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-ink-950 pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      {/* Ember glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-radial from-gold-500/20 via-ember-600/8 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="flex items-start gap-6 md:gap-10 mb-10">
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.92] tracking-tight font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.title}
          </h1>
          <Medal
            className="hidden md:block w-20 h-20 lg:w-28 lg:h-28 text-gold-500 mt-2 shrink-0"
            strokeWidth={1.4}
            aria-hidden="true"
          />
        </div>

        <p className="text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
          {ui.subtitle}
        </p>

        <p
          className="text-gold-500 text-xl md:text-2xl italic max-w-3xl leading-snug"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          « {ui.tagline} »
        </p>
      </div>
    </section>
  );
}
