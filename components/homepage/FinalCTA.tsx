"use client";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";

/**
 * FinalCTA — bold closing section for the homepage.
 * Oversize editorial slogan + double CTA (B2C primary / B2B secondary) + date/venue.
 *
 * JSON blok (all optional — falls back to locale defaults):
 * {
 *   "_uid": "...",
 *   "component": "final-cta",
 *   "eyebrow": "Avril 2026",
 *   "headline": "Rendez-vous...",
 *   "primary": { "label": "Réserver", "href": "/billetterie/particulier" },
 *   "secondary": { "label": "Espace Pro", "href": "/billetterie/pro-b2b" }
 * }
 */

interface CtaLink {
  label: string;
  href: string;
}

interface FinalCTABlok {
  _uid?: string;
  eyebrow?: string;
  headline?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
}

const DEFAULTS: Record<
  string,
  Required<Omit<FinalCTABlok, "_uid">>
> = {
  fr: {
    eyebrow: "10 · 11 · 12 Avril 2026 — Parc Floral, Paris",
    headline: "Rejoignez le plus grand rassemblement BBQ d'Europe.",
    primary: { label: "Réserver ma place", href: "/billetterie/particulier" },
    secondary: { label: "Espace Pro & B2B", href: "/billetterie/pro-b2b" },
  },
  en: {
    eyebrow: "April 10 · 11 · 12, 2026 — Parc Floral, Paris",
    headline: "Join Europe's largest BBQ gathering.",
    primary: { label: "Book my ticket", href: "/billetterie/particulier" },
    secondary: { label: "Pro & B2B area", href: "/billetterie/pro-b2b" },
  },
  es: {
    eyebrow: "10 · 11 · 12 de Abril 2026 — Parc Floral, París",
    headline: "Únase a la mayor reunión de BBQ de Europa.",
    primary: { label: "Reservar mi entrada", href: "/billetterie/particulier" },
    secondary: { label: "Área Pro & B2B", href: "/billetterie/pro-b2b" },
  },
  de: {
    eyebrow: "10. · 11. · 12. April 2026 — Parc Floral, Paris",
    headline: "Seien Sie Teil des größten BBQ-Treffens Europas.",
    primary: { label: "Ticket buchen", href: "/billetterie/particulier" },
    secondary: { label: "Pro & B2B-Bereich", href: "/billetterie/pro-b2b" },
  },
  nl: {
    eyebrow: "10 · 11 · 12 April 2026 — Parc Floral, Parijs",
    headline: "Sluit u aan bij de grootste BBQ-bijeenkomst van Europa.",
    primary: { label: "Mijn ticket boeken", href: "/billetterie/particulier" },
    secondary: { label: "Pro & B2B-ruimte", href: "/billetterie/pro-b2b" },
  },
  pt: {
    eyebrow: "10 · 11 · 12 de Abril de 2026 — Parc Floral, Paris",
    headline: "Junte-se ao maior encontro de BBQ da Europa.",
    primary: { label: "Reservar o meu bilhete", href: "/billetterie/particulier" },
    secondary: { label: "Área Pro & B2B", href: "/billetterie/pro-b2b" },
  },
  it: {
    eyebrow: "10 · 11 · 12 Aprile 2026 — Parc Floral, Parigi",
    headline: "Unitevi al più grande raduno BBQ d'Europa.",
    primary: { label: "Prenota il mio biglietto", href: "/billetterie/particulier" },
    secondary: { label: "Area Pro & B2B", href: "/billetterie/pro-b2b" },
  },
};

export default function FinalCTA({ blok }: { blok: FinalCTABlok }) {
  const locale = useLocale();
  const d = DEFAULTS[locale] || DEFAULTS.fr;
  const data = {
    eyebrow: blok.eyebrow || d.eyebrow,
    headline: blok.headline || d.headline,
    primary: { ...d.primary, ...blok.primary },
    secondary: { ...d.secondary, ...blok.secondary },
  };

  return (
    <section
      className="relative w-full bg-ink-950 py-24 md:py-32 lg:py-40 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Subtle radial ember glow in the background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gold-500/20 via-ember-600/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-ember-600/15 via-gold-500/5 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow — date + location */}
        <div className="mb-10 md:mb-14 flex items-center gap-3 text-cream-50/80 text-xs md:text-sm uppercase tracking-widest font-medium">
          <span
            className="inline-block w-10 h-px bg-gold-500"
            aria-hidden="true"
          />
          {data.eyebrow}
        </div>

        {/* Headline */}
        <h2
          className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-bold max-w-5xl"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          {data.headline}
        </h2>

        {/* CTAs */}
        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link
            href={data.primary.href}
            className="group inline-flex items-center justify-between gap-4 sm:gap-8 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <span>{data.primary.label}</span>
            <ArrowUpRight
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2.5}
            />
          </Link>
          <Link
            href={data.secondary.href}
            className="group inline-flex items-center justify-between gap-4 sm:gap-8 border border-cream-50/30 hover:border-gold-500 text-cream-50 hover:text-gold-500 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <span>{data.secondary.label}</span>
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
