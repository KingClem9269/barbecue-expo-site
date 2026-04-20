"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "next-intl";
import pitmastersData from "@/content/pitmasters/index.json";
import { getCountryName, type Pitmaster } from "@/lib/pitmasters-shared";

/**
 * PitmastersGrid — homepage teaser showing 8 pitmasters in a premium grid,
 * with a CTA to see all 20. Client component, JSON imported statically.
 *
 * JSON blok:
 * {
 *   "_uid": "...",
 *   "component": "pitmasters-grid",
 *   "headline": "...",  // optional override
 *   "subtitle": "..."   // optional override
 * }
 */

interface PitmastersGridBlok {
  _uid?: string;
  headline?: string;
  subtitle?: string;
}

const UI: Record<
  string,
  { eyebrow: string; headline: string; subtitle: string; cta: string }
> = {
  fr: {
    eyebrow: "Édition 2027",
    headline: "Les pitmasters",
    subtitle:
      "20 pitmasters venus de 16 pays. Des compétiteurs mondiaux, des chefs techniciens, des ambassadeurs régionaux. Tous sur scène, en démonstration, en masterclass.",
    cta: "Voir les 20 pitmasters",
  },
  en: {
    eyebrow: "2027 edition",
    headline: "The pitmasters",
    subtitle:
      "20 pitmasters from 16 countries. World competitors, technical chefs, regional ambassadors. All on stage, in demos, in masterclasses.",
    cta: "See all 20 pitmasters",
  },
  es: {
    eyebrow: "Edición 2027",
    headline: "Los pitmasters",
    subtitle:
      "20 pitmasters de 16 países. Competidores mundiales, chefs técnicos, embajadores regionales. Todos en escena, demos, masterclasses.",
    cta: "Ver los 20 pitmasters",
  },
  de: {
    eyebrow: "Ausgabe 2027",
    headline: "Die Pitmaster",
    subtitle:
      "20 Pitmaster aus 16 Ländern. Weltmeister, technische Köche, regionale Botschafter. Alle auf der Bühne, in Demos, in Masterclasses.",
    cta: "Alle 20 Pitmaster ansehen",
  },
  nl: {
    eyebrow: "Editie 2027",
    headline: "De pitmasters",
    subtitle:
      "20 pitmasters uit 16 landen. Wereldcompetitors, technische chefs, regionale ambassadeurs. Allen op het podium, in demo's, in masterclasses.",
    cta: "Bekijk alle 20 pitmasters",
  },
  pt: {
    eyebrow: "Edição 2027",
    headline: "Os pitmasters",
    subtitle:
      "20 pitmasters de 16 países. Competidores mundiais, chefs técnicos, embaixadores regionais. Todos em palco, em demos, em masterclasses.",
    cta: "Ver todos os 20 pitmasters",
  },
  it: {
    eyebrow: "Edizione 2027",
    headline: "I pitmaster",
    subtitle:
      "20 pitmaster da 16 paesi. Competitor mondiali, chef tecnici, ambasciatori regionali. Tutti sul palco, in demo, in masterclass.",
    cta: "Vedi tutti i 20 pitmaster",
  },
};

export default function PitmastersGrid({ blok }: { blok: PitmastersGridBlok }) {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;
  const pitmasters = pitmastersData as Pitmaster[];
  const displayed = pitmasters.slice(0, 8);
  const data = {
    headline: blok.headline || ui.headline,
    subtitle: blok.subtitle || ui.subtitle,
  };

  return (
    <section className="relative w-full bg-cream-50 py-24 md:py-32 lg:py-40 overflow-hidden" aria-label="Pitmasters">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12 md:mb-16 items-end">
          <div className="lg:col-span-8">
            <h2
              className="text-ink-900 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {data.headline}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-ink-600 text-base md:text-lg leading-relaxed">
              {data.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {displayed.map((p) => (
            <Link
              key={p.slug}
              href={`/pitmasters/${p.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-char-800 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
            >
              {p.portrait && (
                <Image
                  src={p.portrait}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent transition-opacity duration-500 opacity-80 group-hover:opacity-95"
                aria-hidden="true"
              />
              <div
                className="absolute inset-3 ring-1 ring-gold-500/0 group-hover:ring-gold-500/60 transition-all duration-500 pointer-events-none rounded-sm"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex flex-col gap-1.5 text-cream-50">
                <span
                  className="inline-block w-6 h-px bg-gold-500 origin-left transition-transform duration-500 ease-out group-hover:scale-x-[2]"
                  aria-hidden="true"
                />
                <h3
                  className="text-lg md:text-xl leading-tight font-bold tracking-tight"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {p.name}
                </h3>
                <div className="flex items-center justify-between gap-2 text-[11px] md:text-xs text-cream-50/80 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5 min-w-0">
                    <Image
                      src={`/flags/${p.country}.svg`}
                      alt=""
                      width={12}
                      height={12}
                      className="w-3 h-3 rounded-full object-cover"
                    />
                    <span className="truncate">{getCountryName(p.country, locale)}</span>
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                    strokeWidth={2}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <Link
            href="/pitmasters"
            className="group inline-flex items-center gap-3 text-ink-900 hover:text-gold-700 text-sm md:text-base font-semibold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          >
            <span>{ui.cta}</span>
            <span
              aria-hidden="true"
              className="inline-block w-10 h-px bg-gold-600 origin-left transition-transform duration-300 group-hover:scale-x-[1.6]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
