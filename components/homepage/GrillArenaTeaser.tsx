"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Flame, Users, Trophy } from "lucide-react";

/**
 * GrillArenaTeaser — signature section showcasing the Grill Arena,
 * the live battle format between pitmasters that's unique to Barbecue Expo
 * (no direct competitor has this).
 *
 * Dark cinematic layout with "VS" typography and 3 feature pills.
 */

interface GrillArenaBlok {
  _uid?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta_label?: string;
  cta_href?: string;
}

const DEFAULTS: Record<
  string,
  Required<Omit<GrillArenaBlok, "_uid">>
> = {
  fr: {
    eyebrow: "Exclusif 2027 — format battle",
    title: "Grill Arena",
    subtitle:
      "Des pitmasters internationaux s'affrontent en direct, devant le public, pendant 3 jours. Un jury, un titre, une seule arène.",
    cta_label: "Découvrir le format",
    cta_href: "/grill-arena",
  },
  en: {
    eyebrow: "Exclusive 2027 — battle format",
    title: "Grill Arena",
    subtitle:
      "International pitmasters go head-to-head live, in front of the audience, for 3 days. One jury, one title, one arena.",
    cta_label: "Discover the format",
    cta_href: "/grill-arena",
  },
  es: {
    eyebrow: "Exclusivo 2027 — formato battle",
    title: "Grill Arena",
    subtitle:
      "Pitmasters internacionales se enfrentan en directo, ante el público, durante 3 días. Un jurado, un título, una sola arena.",
    cta_label: "Descubrir el formato",
    cta_href: "/grill-arena",
  },
  de: {
    eyebrow: "Exklusiv 2027 — Battle-Format",
    title: "Grill Arena",
    subtitle:
      "Internationale Pitmaster treten live vor Publikum gegeneinander an — 3 Tage lang. Eine Jury, ein Titel, eine Arena.",
    cta_label: "Format entdecken",
    cta_href: "/grill-arena",
  },
  nl: {
    eyebrow: "Exclusief 2027 — battle-formaat",
    title: "Grill Arena",
    subtitle:
      "Internationale pitmasters nemen het live tegen elkaar op, voor het publiek, 3 dagen lang. Eén jury, één titel, één arena.",
    cta_label: "Ontdek het formaat",
    cta_href: "/grill-arena",
  },
  pt: {
    eyebrow: "Exclusivo 2027 — formato battle",
    title: "Grill Arena",
    subtitle:
      "Pitmasters internacionais enfrentam-se em direto, perante o público, durante 3 dias. Um júri, um título, uma só arena.",
    cta_label: "Descobrir o formato",
    cta_href: "/grill-arena",
  },
  it: {
    eyebrow: "Esclusiva 2027 — formato battle",
    title: "Grill Arena",
    subtitle:
      "Pitmaster internazionali si sfidano dal vivo, davanti al pubblico, per 3 giorni. Una giuria, un titolo, una sola arena.",
    cta_label: "Scopri il formato",
    cta_href: "/grill-arena",
  },
};

const PILL_LABELS: Record<
  string,
  { vs: string; live: string; crown: string }
> = {
  fr: { vs: "Duels en direct", live: "Jury d'experts", crown: "1 champion" },
  en: { vs: "Live duels", live: "Expert jury", crown: "1 champion" },
  es: { vs: "Duelos en directo", live: "Jurado experto", crown: "1 campeón" },
  de: { vs: "Live-Duelle", live: "Experten-Jury", crown: "1 Champion" },
  nl: { vs: "Live duels", live: "Expertjury", crown: "1 kampioen" },
  pt: { vs: "Duelos em direto", live: "Júri de especialistas", crown: "1 campeão" },
  it: { vs: "Duelli dal vivo", live: "Giuria di esperti", crown: "1 campione" },
};

export default function GrillArenaTeaser({ blok }: { blok: GrillArenaBlok }) {
  const locale = useLocale();
  const d = DEFAULTS[locale] || DEFAULTS.fr;
  const pills = PILL_LABELS[locale] || PILL_LABELS.fr;
  const data = {
    eyebrow: blok.eyebrow || d.eyebrow,
    title: blok.title || d.title,
    subtitle: blok.subtitle || d.subtitle,
    cta_label: blok.cta_label || d.cta_label,
    cta_href: blok.cta_href || d.cta_href,
  };

  return (
    <section
      className="relative w-full bg-ink-950 py-14 md:py-20 lg:py-24 overflow-hidden"
      aria-label="Grill Arena"
    >
      {/* Background photo — Live Fire Republic pitmaster in action */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src="/photos-2026/zone-grill-arena.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
        {/* Lighter overlays — let the photo show, keep text legible on the left */}
        <div className="absolute inset-0 bg-ink-950/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/55 to-ink-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-ink-950/30" />
      </div>

      {/* Ember glow background - stronger than other sections, signaling "this is the show" */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-radial from-ember-600/25 via-gold-500/10 to-transparent blur-3xl" />
      </div>

      {/* Subtle animated flame SVG pattern */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="flame-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M40 20 Q 35 35, 40 50 Q 45 35, 40 20"
              stroke="#F4AD3C"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#flame-grid)" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8 md:mb-12">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {data.eyebrow}
        </div>

        {/* Massive "VS" treatment */}
        <div className="flex items-start gap-6 md:gap-12 mb-8 md:mb-12">
          <h2
            className="text-cream-50 text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight font-bold flex-shrink"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {data.title}
          </h2>
          {/* "VS" stacked block — signature visual */}
          <div
            className="hidden md:flex flex-col items-center gap-1 pt-4 lg:pt-6 text-gold-500"
            aria-hidden="true"
          >
            <span
              className="text-4xl md:text-5xl lg:text-6xl leading-none font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              VS
            </span>
            <span className="w-px h-12 md:h-16 bg-gold-500/50" />
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="text-cream-50/90 text-xl md:text-2xl lg:text-3xl leading-snug max-w-3xl"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          {data.subtitle}
        </p>

        {/* Feature pills */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-3xl">
          <div className="flex items-center gap-3 border border-white/15 rounded-sm px-4 py-4 bg-white/[0.02] hover:border-gold-500/40 transition-colors">
            <Flame className="w-5 h-5 text-gold-500 shrink-0" strokeWidth={2} />
            <span className="text-cream-50 text-sm font-semibold uppercase tracking-wide">
              {pills.vs}
            </span>
          </div>
          <div className="flex items-center gap-3 border border-white/15 rounded-sm px-4 py-4 bg-white/[0.02] hover:border-gold-500/40 transition-colors">
            <Users className="w-5 h-5 text-gold-500 shrink-0" strokeWidth={2} />
            <span className="text-cream-50 text-sm font-semibold uppercase tracking-wide">
              {pills.live}
            </span>
          </div>
          <div className="flex items-center gap-3 border border-white/15 rounded-sm px-4 py-4 bg-white/[0.02] hover:border-gold-500/40 transition-colors">
            <Trophy className="w-5 h-5 text-gold-500 shrink-0" strokeWidth={2} />
            <span className="text-cream-50 text-sm font-semibold uppercase tracking-wide">
              {pills.crown}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 md:mt-12">
          <Link
            href={data.cta_href}
            className="group inline-flex items-center gap-3 text-cream-50 hover:text-gold-500 text-sm md:text-base font-semibold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          >
            <span>{data.cta_label}</span>
            <span
              aria-hidden="true"
              className="inline-block w-8 h-px bg-gold-500 origin-left transition-transform duration-300 group-hover:scale-x-[1.6]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
