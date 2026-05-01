"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

/**
 * ProHero — humanized editorial hero for /pro.
 *
 * Full-bleed photo backdrop, large editorial slogan (not metrics),
 * one prose paragraph, two CTAs. Numbers are mentioned in flowing
 * text inside the paragraph rather than dashboard cards.
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    line1: string;
    line2_highlight: string;
    line3: string;
    paragraph: string;
    ctaStand: string;
    ctaPress: string;
  }
> = {
  fr: {
    eyebrow: "Pro & B2B · Édition 2027",
    line1: "Le rendez-vous",
    line2_highlight: "des marques",
    line3: "BBQ d'Europe.",
    paragraph:
      "Trois jours, un seul lieu, une audience choisie. Plus de vingt-cinq mille huit cents visiteurs en 2026, dont une part décisive de revendeurs, distributeurs et acheteurs. Plus de deux cents marques venues de quinze pays. Vingt-cinq nationalités dans le public. Pas un salon de plus — le carrefour annuel du métier.",
    ctaStand: "Devenir exposant",
    ctaPress: "Espace presse",
  },
  en: {
    eyebrow: "Pro & B2B · 2027 edition",
    line1: "The meeting place",
    line2_highlight: "of European",
    line3: "BBQ brands.",
    paragraph:
      "Three days, one place, a chosen audience. Over twenty-five thousand eight hundred visitors in 2026, with a decisive share of resellers, distributors and buyers. More than two hundred brands from fifteen countries. Twenty-five nationalities in the audience. Not just another show — the annual industry crossroads.",
    ctaStand: "Become an exhibitor",
    ctaPress: "Press room",
  },
  es: {
    eyebrow: "Pro & B2B · Edición 2027",
    line1: "El punto de encuentro",
    line2_highlight: "de las marcas",
    line3: "BBQ de Europa.",
    paragraph:
      "Tres días, un solo lugar, una audiencia elegida. Más de veinticinco mil ochocientos visitantes en 2026, con una parte decisiva de revendedores, distribuidores y compradores. Más de doscientas marcas de quince países. Veinticinco nacionalidades en el público.",
    ctaStand: "Ser expositor",
    ctaPress: "Sala de prensa",
  },
  de: {
    eyebrow: "Pro & B2B · Ausgabe 2027",
    line1: "Der Treffpunkt",
    line2_highlight: "der europäischen",
    line3: "BBQ-Marken.",
    paragraph:
      "Drei Tage, ein Ort, ein ausgewähltes Publikum. Über fünfundzwanzigtausendachthundert Besucher 2026, mit einem entscheidenden Anteil von Wiederverkäufern, Distributoren und Einkäufern. Mehr als zweihundert Marken aus fünfzehn Ländern. Fünfundzwanzig Nationalitäten im Publikum.",
    ctaStand: "Aussteller werden",
    ctaPress: "Pressebereich",
  },
  nl: {
    eyebrow: "Pro & B2B · Editie 2027",
    line1: "Het ontmoetingspunt",
    line2_highlight: "van Europese",
    line3: "BBQ-merken.",
    paragraph:
      "Drie dagen, één plek, een gekozen publiek. Meer dan vijfentwintigduizendachthonderd bezoekers in 2026, met een doorslaggevend aandeel doorverkopers, distributeurs en kopers. Meer dan tweehonderd merken uit vijftien landen. Vijfentwintig nationaliteiten in het publiek.",
    ctaStand: "Exposant worden",
    ctaPress: "Perszaal",
  },
  pt: {
    eyebrow: "Pro & B2B · Edição 2027",
    line1: "O ponto de encontro",
    line2_highlight: "das marcas",
    line3: "BBQ da Europa.",
    paragraph:
      "Três dias, um só lugar, uma audiência escolhida. Mais de vinte e cinco mil e oitocentos visitantes em 2026, com uma parte decisiva de revendedores, distribuidores e compradores. Mais de duzentas marcas de quinze países. Vinte e cinco nacionalidades no público.",
    ctaStand: "Ser expositor",
    ctaPress: "Sala de imprensa",
  },
  it: {
    eyebrow: "Pro & B2B · Edizione 2027",
    line1: "Il punto d'incontro",
    line2_highlight: "dei marchi",
    line3: "BBQ d'Europa.",
    paragraph:
      "Tre giorni, un solo luogo, un pubblico scelto. Oltre venticinquemilaottocento visitatori nel 2026, con una parte decisiva di rivenditori, distributori e acquirenti. Più di duecento marchi da quindici paesi. Venticinque nazionalità tra il pubblico.",
    ctaStand: "Diventare espositore",
    ctaPress: "Sala stampa",
  },
};

export default function ProHero() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section
      className="relative w-full min-h-[100dvh] overflow-hidden bg-ink-950"
      aria-label="Pro — Barbecue Expo"
    >
      {/* Full-bleed photo background — pig on rotisserie, smoke, fire */}
      <Image
        src="/photos-2026/william-plin-jpc-110426-533a3756.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Editorial gradient — strong on left for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-end min-h-[100dvh]">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10 md:mb-14">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        {/* Massive editorial slogan */}
        <h1
          className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.92] tracking-tight font-bold max-w-5xl"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          <span className="block">{ui.line1}</span>
          <span className="block text-gold-500">{ui.line2_highlight}</span>
          <span className="block">{ui.line3}</span>
        </h1>

        {/* One prose paragraph — numbers in flowing text */}
        <p className="mt-10 md:mt-14 text-cream-50/90 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl font-light">
          {ui.paragraph}
        </p>

        {/* CTAs */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4">
          <Link
            href="/devenez-exposants"
            className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <span>{ui.ctaStand}</span>
            <ArrowUpRight
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2.5}
            />
          </Link>
          <Link
            href="/billetterie/presse"
            className="group inline-flex items-center gap-4 border border-cream-50/30 hover:border-gold-500 text-cream-50 hover:text-gold-500 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <span>{ui.ctaPress}</span>
            <ArrowUpRight
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
