"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

/**
 * VisitorHero — B2C-focused hero for /visiter.
 * Positions the event as THE show for BBQ connaisseurs, not generic family outing.
 * Dark cinematic + oversize editorial slogan + ticket CTA prominent.
 */

const SLOGAN: Record<
  string,
  { eyebrow: string; line1: string; line2: string; highlight: string; line3: string; subtitle: string; cta: string }
> = {
  fr: {
    eyebrow: "Grand public · Édition 2027",
    line1: "Le salon",
    line2: "des",
    highlight: "connaisseurs",
    line3: "BBQ.",
    subtitle:
      "20 pitmasters. 12 masterclasses. 250 marques. Un week-end au cœur de l'Europe pour tester, apprendre, déguster. Pour celles et ceux qui n'en sont pas à leur premier feu.",
    cta: "Réserver ma place",
  },
  en: {
    eyebrow: "General public · 2027 edition",
    line1: "The show",
    line2: "for BBQ",
    highlight: "tastemakers.",
    line3: "",
    subtitle:
      "20 pitmasters. 12 masterclasses. 250 brands. A weekend in the heart of Europe to test, learn, taste. For those who aren't at their first fire.",
    cta: "Book my ticket",
  },
  es: {
    eyebrow: "Gran público · Edición 2027",
    line1: "La feria",
    line2: "de los",
    highlight: "conocedores",
    line3: "BBQ.",
    subtitle:
      "20 pitmasters. 12 masterclasses. 250 marcas. Un fin de semana en el corazón de Europa para probar, aprender, degustar. Para los que no están en su primer fuego.",
    cta: "Reservar mi entrada",
  },
  de: {
    eyebrow: "Allgemeines Publikum · Ausgabe 2027",
    line1: "Die Messe",
    line2: "für BBQ-",
    highlight: "Kenner.",
    line3: "",
    subtitle:
      "20 Pitmaster. 12 Masterclasses. 250 Marken. Ein Wochenende im Herzen Europas zum Testen, Lernen, Genießen. Für alle, die nicht bei ihrem ersten Feuer sind.",
    cta: "Ticket buchen",
  },
  nl: {
    eyebrow: "Algemeen publiek · Editie 2027",
    line1: "De beurs",
    line2: "voor BBQ-",
    highlight: "kenners.",
    line3: "",
    subtitle:
      "20 pitmasters. 12 masterclasses. 250 merken. Een weekend in het hart van Europa om te testen, leren, proeven. Voor wie niet aan hun eerste vuur toe is.",
    cta: "Mijn ticket boeken",
  },
  pt: {
    eyebrow: "Grande público · Edição 2027",
    line1: "A feira",
    line2: "dos",
    highlight: "conhecedores",
    line3: "BBQ.",
    subtitle:
      "20 pitmasters. 12 masterclasses. 250 marcas. Um fim de semana no coração da Europa para testar, aprender, degustar. Para quem não está no seu primeiro fogo.",
    cta: "Reservar o meu bilhete",
  },
  it: {
    eyebrow: "Grande pubblico · Edizione 2027",
    line1: "La fiera",
    line2: "dei",
    highlight: "conoscitori",
    line3: "BBQ.",
    subtitle:
      "20 pitmaster. 12 masterclass. 250 marchi. Un fine settimana nel cuore dell'Europa per provare, imparare, degustare. Per chi non è al primo fuoco.",
    cta: "Prenota il mio biglietto",
  },
};

export default function VisitorHero() {
  const locale = useLocale();
  const s = SLOGAN[locale] || SLOGAN.fr;

  return (
    <section
      className="relative w-full min-h-[100dvh] overflow-hidden bg-ink-950 pt-24 md:pt-28"
      aria-label="Visiter Barbecue Expo"
    >
      {/* Cinematic bg video fallback to current teaser */}
      <video
        src="https://dicfw56ddakrzcwg.public.blob.vercel-storage.com/teaserbbqexpo"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        aria-hidden="true"
      />
      {/* Dark gradient for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/40 to-ink-950/90 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center min-h-[calc(100dvh-8rem)] py-20">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10 md:mb-14">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {s.eyebrow}
        </div>

        {/* Oversize slogan */}
        <h1
          className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.92] tracking-tight font-bold max-w-6xl"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          <span className="block">{s.line1}</span>
          <span className="block">
            {s.line2} <span className="text-gold-500">{s.highlight}</span>
          </span>
          {s.line3 && <span className="block">{s.line3}</span>}
        </h1>

        {/* Subtitle */}
        <p className="mt-10 md:mt-14 text-cream-50/90 text-lg md:text-xl max-w-3xl leading-relaxed">
          {s.subtitle}
        </p>

        {/* CTA */}
        <div className="mt-10 md:mt-12">
          <Link
            href="/billetterie/particulier"
            className="group inline-flex items-center gap-4 md:gap-6 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <span>{s.cta}</span>
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
