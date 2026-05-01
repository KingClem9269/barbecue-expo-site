"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

/**
 * PartnersStrip — humanized partner showcase replacing the legacy
 * "Nos partenaires" section with two MovingLogos rows.
 *
 * Editorial layout: small eyebrow, plain title, then a *quiet* logo grid
 * (no animation by default — animation is more spectacle than substance
 * for B2B trust-building). All 21 known partner logos shown in a
 * 4/6 column grid with subtle hover lift.
 */

const PARTNER_LOGOS = [
  "7a5907deca_napoleoin.png",
  "0710c00822_campingaz.png",
  "c03ec5ca0a_charbroil.png",
  "8dbe912df5_logo-weber-svg-1.png",
  "25eb4257c0_pitboss.png",
  "9ffc7e2043_kamado-joe.png",
  "d37c7b4e80_grillobois.png",
  "efa4b26c2c_barbecook.png",
  "fd46ad7c34_monolith.png",
  "e332600512_soler2.png",
  "be7506edc9_ma-bonne-viande-x-barbecue-expo.png",
  "805fc19129_the-barbecue-compagnie-x-barbecue-expo.jpg",
  "ce441e7ae5_masterbuilt.png",
  "0ee44fae1e_traeger.png",
  "46a68bad93_ofyr2.png",
  "7a1e7585f5_oklahoma-joe-s.png",
  "0404b28de9_char-griller.png",
  "78c2396828_le-marquier.png",
  "c6aae8d21e_bastard.png",
  "406e7d7fe6_eno.png",
  "d4a9d828f1_lake-montagnes-x-barbecue-expo.png",
];

const UI: Record<
  string,
  { eyebrow: string; title: string; subtitle: string; cta: string }
> = {
  fr: {
    eyebrow: "Avec nos partenaires",
    title: "Vingt-et-une marques. Et beaucoup d'autres.",
    subtitle:
      "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg, Napoleon, Monolith, Char-Broil — quelques-uns des partenaires qui nous accompagnent. Voir l'ensemble des deux cent cinquante exposants.",
    cta: "Voir tous les exposants",
  },
  en: {
    eyebrow: "With our partners",
    title: "Twenty-one brands. And many more.",
    subtitle:
      "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg, Napoleon, Monolith, Char-Broil — some of the partners standing with us. See all 250 exhibitors.",
    cta: "See all exhibitors",
  },
  es: {
    eyebrow: "Con nuestros socios",
    title: "Veintiuna marcas. Y muchas más.",
    subtitle:
      "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg, Napoleon, Monolith, Char-Broil — algunos de los socios que nos acompañan. Ver los 250 expositores.",
    cta: "Ver todos los expositores",
  },
  de: {
    eyebrow: "Mit unseren Partnern",
    title: "Einundzwanzig Marken. Und viele mehr.",
    subtitle:
      "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg, Napoleon, Monolith, Char-Broil — einige unserer Partner. Alle 250 Aussteller ansehen.",
    cta: "Alle Aussteller ansehen",
  },
  nl: {
    eyebrow: "Met onze partners",
    title: "Eenentwintig merken. En nog veel meer.",
    subtitle:
      "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg, Napoleon, Monolith, Char-Broil — enkele van onze partners. Bekijk alle 250 exposanten.",
    cta: "Alle exposanten bekijken",
  },
  pt: {
    eyebrow: "Com os nossos parceiros",
    title: "Vinte e uma marcas. E muitas mais.",
    subtitle:
      "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg, Napoleon, Monolith, Char-Broil — alguns dos parceiros que nos acompanham. Ver todos os 250 expositores.",
    cta: "Ver todos os expositores",
  },
  it: {
    eyebrow: "Con i nostri partner",
    title: "Ventuno marchi. E molti altri.",
    subtitle:
      "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg, Napoleon, Monolith, Char-Broil — alcuni dei partner che ci accompagnano. Vedi tutti i 250 espositori.",
    cta: "Vedi tutti gli espositori",
  },
};

export default function PartnersStrip() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section
      className="relative w-full bg-cream-50 py-24 md:py-32"
      aria-label="Partenaires"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
          <h2
            className="lg:col-span-7 text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.title}
          </h2>
          <p className="lg:col-span-5 text-ink-600 text-base md:text-lg leading-relaxed">
            {ui.subtitle}
          </p>
        </div>

        {/* Quiet, dignified grid (no animation) */}
        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4">
          {PARTNER_LOGOS.map((file) => (
            <li
              key={file}
              className="group aspect-[5/3] flex items-center justify-center bg-cream-100 border border-ink-900/10 rounded-sm p-3 md:p-4 hover:border-gold-500/40 hover:shadow-[0_4px_20px_-6px_rgba(244,173,60,0.25)] transition-all duration-300"
            >
              <Image
                src={`/content/images/${file}`}
                alt=""
                width={140}
                height={70}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 md:mt-14">
          <Link
            href="/exposants"
            className="group inline-flex items-center gap-3 text-ink-900 hover:text-gold-700 text-sm md:text-base font-bold uppercase tracking-widest transition-colors"
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
