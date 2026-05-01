"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { getCountryName } from "@/lib/pitmasters-shared";
import type { Brand } from "@/lib/brands-shared";

/**
 * WorldCount — a visual representation of brand/country presence.
 *
 * Shows each represented country as a chip with flag + name + brand count.
 * Mentions the total (25 nationalities) for the visitor audience.
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    brandsCount: string;
  }
> = {
  fr: {
    eyebrow: "Provenance des marques",
    title: "15 pays. 4 continents. Un seul salon.",
    subtitle:
      "Les 200+ marques présentes viennent de 15 pays différents. Ajoutez à cela les 25 nationalités représentées côté visiteurs — Barbecue Expo est le carrefour européen du BBQ international.",
    brandsCount: "marques",
  },
  en: {
    eyebrow: "Brand origins",
    title: "15 countries. 4 continents. One show.",
    subtitle:
      "The 200+ brands present come from 15 different countries. Add to that the 25 nationalities in the audience — Barbecue Expo is the European crossroads of international BBQ.",
    brandsCount: "brands",
  },
  es: {
    eyebrow: "Origen de las marcas",
    title: "15 países. 4 continentes. Una sola feria.",
    subtitle:
      "Las 200+ marcas presentes provienen de 15 países diferentes. Añádale las 25 nacionalidades entre los visitantes.",
    brandsCount: "marcas",
  },
  de: {
    eyebrow: "Herkunft der Marken",
    title: "15 Länder. 4 Kontinente. Eine Messe.",
    subtitle:
      "Die 200+ anwesenden Marken kommen aus 15 verschiedenen Ländern. Dazu kommen 25 vertretene Nationalitäten im Publikum.",
    brandsCount: "Marken",
  },
  nl: {
    eyebrow: "Herkomst van merken",
    title: "15 landen. 4 continenten. Eén beurs.",
    subtitle:
      "De 200+ aanwezige merken komen uit 15 verschillende landen. Daarbij komen nog 25 nationaliteiten in het publiek.",
    brandsCount: "merken",
  },
  pt: {
    eyebrow: "Origem das marcas",
    title: "15 países. 4 continentes. Uma só feira.",
    subtitle:
      "As 200+ marcas presentes vêm de 15 países diferentes. Acrescente as 25 nacionalidades entre os visitantes.",
    brandsCount: "marcas",
  },
  it: {
    eyebrow: "Origine dei marchi",
    title: "15 paesi. 4 continenti. Una sola fiera.",
    subtitle:
      "I 200+ marchi presenti provengono da 15 paesi diversi. Aggiungete le 25 nazionalità rappresentate dal pubblico.",
    brandsCount: "marchi",
  },
};

export default function WorldCount({ brands }: { brands: Brand[] }) {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  // Aggregate by country
  const countries: Record<string, number> = {};
  for (const b of brands) {
    countries[b.country] = (countries[b.country] || 0) + 1;
  }
  const sorted = Object.entries(countries).sort((a, b) => b[1] - a[1]);

  return (
    <section className="relative w-full bg-ink-950 py-24 md:py-32 overflow-hidden" aria-label="World count">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-gold-500/15 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8 md:mb-12">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
          <div className="lg:col-span-8">
            <h2
              className="text-cream-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.title}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-cream-50/85 text-base md:text-lg leading-relaxed">
              {ui.subtitle}
            </p>
          </div>
        </div>

        {/* Country chip grid */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {sorted.map(([code, count]) => (
            <div
              key={code}
              className="inline-flex items-center gap-2.5 border border-white/15 bg-white/[0.03] hover:border-gold-500/50 px-4 py-2.5 rounded-full transition-colors"
            >
              <Image
                src={`/flags/${code}.svg`}
                alt=""
                width={16}
                height={16}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="text-cream-50 text-sm font-medium">
                {getCountryName(code, locale)}
              </span>
              <span className="text-gold-500 text-xs tabular-nums font-bold ml-1">
                {count} {ui.brandsCount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
