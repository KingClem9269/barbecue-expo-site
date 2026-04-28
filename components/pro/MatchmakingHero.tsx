"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

const UI: Record<
  string,
  {
    eyebrow: string;
    line1: string;
    line2: string;
    line3_highlight: string;
    paragraph: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }
> = {
  fr: {
    eyebrow: "Plateforme matchmaking · Édition 2027",
    line1: "Rejoignez-nous",
    line2: "en tant qu'exposant",
    line3_highlight: "et accédez à la plateforme de rendez-vous.",
    paragraph:
      "Des milliers d'acheteurs à quelques clics de vous. Distributeurs européens, enseignes spécialisées, e-commerçants, GMS, HORECA. Réservez vos rendez-vous avant le salon, arrivez avec un agenda complet.",
    ctaPrimary: "Devenir exposant",
    ctaSecondary: "Voir la plateforme",
  },
  en: {
    eyebrow: "Matchmaking platform · 2027 edition",
    line1: "Join us",
    line2: "as an exhibitor",
    line3_highlight: "and access the meeting platform.",
    paragraph:
      "Thousands of buyers a few clicks away. European distributors, specialty chains, e-commerce, mass retailers, HORECA. Book your meetings before the show, arrive with a full agenda.",
    ctaPrimary: "Become an exhibitor",
    ctaSecondary: "See the platform",
  },
  es: {
    eyebrow: "Plataforma matchmaking · Edición 2027",
    line1: "Únase a nosotros",
    line2: "como expositor",
    line3_highlight: "y acceda a la plataforma de citas.",
    paragraph:
      "Miles de compradores a unos clics. Distribuidores europeos, cadenas especializadas, e-commerce, gran distribución, HORECA. Reserve sus citas antes del salón, llegue con una agenda completa.",
    ctaPrimary: "Ser expositor",
    ctaSecondary: "Ver la plataforma",
  },
  de: {
    eyebrow: "Matchmaking-Plattform · Ausgabe 2027",
    line1: "Werden Sie",
    line2: "Aussteller",
    line3_highlight: "und nutzen Sie die Termin-Plattform.",
    paragraph:
      "Tausende Einkäufer wenige Klicks entfernt. Europäische Distributoren, Fachketten, E-Commerce, Großhandel, HORECA. Buchen Sie Ihre Meetings vor der Messe, kommen Sie mit vollem Terminkalender.",
    ctaPrimary: "Aussteller werden",
    ctaSecondary: "Plattform ansehen",
  },
  nl: {
    eyebrow: "Matchmaking-platform · Editie 2027",
    line1: "Sluit u aan",
    line2: "als exposant",
    line3_highlight: "en krijg toegang tot het afspraak-platform.",
    paragraph:
      "Duizenden kopers binnen handbereik. Europese distributeurs, gespecialiseerde ketens, e-commerce, retail, HORECA. Reserveer uw afspraken vóór de beurs, kom met een volle agenda.",
    ctaPrimary: "Exposant worden",
    ctaSecondary: "Platform bekijken",
  },
  pt: {
    eyebrow: "Plataforma matchmaking · Edição 2027",
    line1: "Junte-se a nós",
    line2: "como expositor",
    line3_highlight: "e aceda à plataforma de reuniões.",
    paragraph:
      "Milhares de compradores a alguns cliques de si. Distribuidores europeus, cadeias especializadas, e-commerce, retalho, HORECA. Reserve as suas reuniões antes da feira, chegue com uma agenda completa.",
    ctaPrimary: "Ser expositor",
    ctaSecondary: "Ver a plataforma",
  },
  it: {
    eyebrow: "Piattaforma matchmaking · Edizione 2027",
    line1: "Unisciti a noi",
    line2: "come espositore",
    line3_highlight: "e accedi alla piattaforma di appuntamenti.",
    paragraph:
      "Migliaia di acquirenti a pochi clic da te. Distributori europei, catene specializzate, e-commerce, GDO, HORECA. Prenota i tuoi appuntamenti prima della fiera, arriva con un'agenda completa.",
    ctaPrimary: "Diventare espositore",
    ctaSecondary: "Vedi la piattaforma",
  },
};

export default function MatchmakingHero() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section
      className="relative w-full bg-ink-950 overflow-hidden"
      aria-label="Espace Pro & B2B — Matchmaking"
    >
      {/* Photo backdrop — Kamado Joe stand with people interacting */}
      <Image
        src="/photos-2026/bbq-expo-184.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/75 to-ink-950/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-end min-h-[100dvh]">
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10 md:mb-14">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <h1
          className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight font-bold max-w-5xl"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          <span className="block">{ui.line1}</span>
          <span className="block">{ui.line2}</span>
          <span className="block text-gold-500">{ui.line3_highlight}</span>
        </h1>

        <p className="mt-10 md:mt-14 text-cream-50/90 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl font-light">
          {ui.paragraph}
        </p>

        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4">
          <Link
            href="/devenez-exposants"
            className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <span>{ui.ctaPrimary}</span>
            <ArrowUpRight
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2.5}
            />
          </Link>
          <a
            href="#"
            className="group inline-flex items-center gap-4 border border-cream-50/30 hover:border-gold-500 text-cream-50 hover:text-gold-500 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <span>{ui.ctaSecondary}</span>
            <ArrowUpRight
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2.5}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
