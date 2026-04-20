"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Users, TrendingUp, Globe2 } from "lucide-react";

/**
 * ProHero — B2B hero for /pro.
 * Institutional tone, data-driven. Four quick stats + dual CTA (stand + press).
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    statVisitors: string;
    statBrands: string;
    statNationalities: string;
    statGrowth: string;
    ctaStand: string;
    ctaPress: string;
  }
> = {
  fr: {
    eyebrow: "Pro & B2B · Édition 2027",
    title: "Le rendez-vous annuel du BBQ européen.",
    subtitle:
      "Trois jours, une audience qualifiée, les marques qui comptent. Devenez exposant 2027 ou rejoignez notre programme presse.",
    statVisitors: "Visiteurs 2026",
    statBrands: "Marques internationales",
    statNationalities: "Nationalités représentées",
    statGrowth: "Objectif 2027",
    ctaStand: "Devenir exposant",
    ctaPress: "Espace presse",
  },
  en: {
    eyebrow: "Pro & B2B · 2027 edition",
    title: "The annual rendezvous of European BBQ.",
    subtitle:
      "Three days, a qualified audience, the brands that matter. Become a 2027 exhibitor or join our press program.",
    statVisitors: "Visitors in 2026",
    statBrands: "International brands",
    statNationalities: "Nationalities represented",
    statGrowth: "2027 target",
    ctaStand: "Become an exhibitor",
    ctaPress: "Press room",
  },
  es: {
    eyebrow: "Pro & B2B · Edición 2027",
    title: "La cita anual del BBQ europeo.",
    subtitle:
      "Tres días, una audiencia cualificada, las marcas que importan. Conviértase en expositor 2027 o únase a nuestro programa de prensa.",
    statVisitors: "Visitantes 2026",
    statBrands: "Marcas internacionales",
    statNationalities: "Nacionalidades representadas",
    statGrowth: "Objetivo 2027",
    ctaStand: "Ser expositor",
    ctaPress: "Sala de prensa",
  },
  de: {
    eyebrow: "Pro & B2B · Ausgabe 2027",
    title: "Das jährliche Treffen des europäischen BBQ.",
    subtitle:
      "Drei Tage, ein qualifiziertes Publikum, die wichtigsten Marken. Werden Sie Aussteller 2027 oder treten Sie unserem Presseprogramm bei.",
    statVisitors: "Besucher 2026",
    statBrands: "Internationale Marken",
    statNationalities: "Vertretene Nationalitäten",
    statGrowth: "Ziel 2027",
    ctaStand: "Aussteller werden",
    ctaPress: "Pressebereich",
  },
  nl: {
    eyebrow: "Pro & B2B · Editie 2027",
    title: "De jaarlijkse ontmoeting van de Europese BBQ.",
    subtitle:
      "Drie dagen, een gekwalificeerd publiek, de merken die ertoe doen. Word exposant 2027 of sluit u aan bij ons persprogramma.",
    statVisitors: "Bezoekers 2026",
    statBrands: "Internationale merken",
    statNationalities: "Vertegenwoordigde nationaliteiten",
    statGrowth: "Doel 2027",
    ctaStand: "Exposant worden",
    ctaPress: "Perszaal",
  },
  pt: {
    eyebrow: "Pro & B2B · Edição 2027",
    title: "O encontro anual do BBQ europeu.",
    subtitle:
      "Três dias, um público qualificado, as marcas que importam. Torne-se expositor 2027 ou junte-se ao nosso programa de imprensa.",
    statVisitors: "Visitantes 2026",
    statBrands: "Marcas internacionais",
    statNationalities: "Nacionalidades representadas",
    statGrowth: "Meta 2027",
    ctaStand: "Ser expositor",
    ctaPress: "Sala de imprensa",
  },
  it: {
    eyebrow: "Pro & B2B · Edizione 2027",
    title: "L'appuntamento annuale del BBQ europeo.",
    subtitle:
      "Tre giorni, un pubblico qualificato, i marchi che contano. Diventa espositore 2027 o unisciti al nostro programma stampa.",
    statVisitors: "Visitatori 2026",
    statBrands: "Marchi internazionali",
    statNationalities: "Nazionalità rappresentate",
    statGrowth: "Obiettivo 2027",
    ctaStand: "Diventare espositore",
    ctaPress: "Sala stampa",
  },
};

export default function ProHero() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section
      className="relative w-full min-h-[100dvh] overflow-hidden bg-ink-950 pt-24 md:pt-28"
      aria-label="Professionnels — Barbecue Expo"
    >
      {/* Subtle radial glow, not full video — institutional */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-radial from-gold-500/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full bg-gradient-radial from-char-800/40 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col justify-center min-h-[calc(100dvh-8rem)]">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10 md:mb-14">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        {/* Title + subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-14 md:mb-20">
          <div className="lg:col-span-8">
            <h1
              className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.title}
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-2">
            <p className="text-cream-50/85 text-base md:text-lg leading-relaxed">
              {ui.subtitle}
            </p>
          </div>
        </div>

        {/* Stats dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <StatCell
            icon={<Users className="w-5 h-5 text-gold-500" strokeWidth={2} />}
            value="25 896"
            label={ui.statVisitors}
          />
          <StatCell
            icon={<Globe2 className="w-5 h-5 text-gold-500" strokeWidth={2} />}
            value="250"
            label={ui.statBrands}
          />
          <StatCell
            icon={<Globe2 className="w-5 h-5 text-gold-500" strokeWidth={2} />}
            value="25"
            label={ui.statNationalities}
          />
          <StatCell
            icon={<TrendingUp className="w-5 h-5 text-gold-500" strokeWidth={2} />}
            value="+30 000"
            label={ui.statGrowth}
          />
        </div>

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

function StatCell({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="border border-white/15 bg-white/[0.02] rounded-sm p-5 md:p-6 hover:border-gold-500/40 transition-colors">
      <div className="mb-3">{icon}</div>
      <div
        className="text-cream-50 text-3xl md:text-4xl lg:text-5xl leading-none font-bold tabular-nums mb-2"
        style={{ fontFamily: "SansPlomb-98, sans-serif" }}
      >
        {value}
      </div>
      <div className="text-cream-50/70 text-xs md:text-sm uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
}
