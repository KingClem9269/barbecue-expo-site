"use client";
import Image from "next/image";
import YouTubeHeroBackground from "@/components/YouTubeHeroBackground";
import { useLocale } from "next-intl";
import type { HeroVideoBlok } from "@/types/storyblok";

// Slogans by locale (editorial, unforgettable — "Le feu. La braise. L'Europe.")
const SLOGANS: Record<string, { line1: string; line2: string; line3: string }> = {
  fr: { line1: "Le feu.", line2: "La braise.", line3: "L'Europe." },
  en: { line1: "The fire.", line2: "The ember.", line3: "Europe." },
  es: { line1: "El fuego.", line2: "La brasa.", line3: "Europa." },
  de: { line1: "Das Feuer.", line2: "Die Glut.", line3: "Europa." },
  nl: { line1: "Het vuur.", line2: "De gloed.", line3: "Europa." },
  pt: { line1: "O fogo.", line2: "A brasa.", line3: "Europa." },
  it: { line1: "Il fuoco.", line2: "La brace.", line3: "L'Europa." },
};

const SCROLL_LABEL: Record<string, string> = {
  fr: "Découvrir",
  en: "Discover",
  es: "Descubrir",
  de: "Entdecken",
  nl: "Ontdek",
  pt: "Descobrir",
  it: "Scopri",
};

const DATE_LINE: Record<string, string> = {
  fr: "12 · 13 · 14 Mars 2027",
  en: "12 · 13 · 14 March 2027",
  es: "12 · 13 · 14 Marzo 2027",
  de: "12 · 13 · 14 März 2027",
  nl: "12 · 13 · 14 Maart 2027",
  pt: "12 · 13 · 14 Março 2027",
  it: "12 · 13 · 14 Marzo 2027",
};

export function HeroVideo({ blok }: { blok: HeroVideoBlok }) {
  const locale = useLocale();
  const slogan = SLOGANS[locale] || SLOGANS.fr;
  const scrollLabel = SCROLL_LABEL[locale] || SCROLL_LABEL.fr;
  const dateLine = DATE_LINE[locale] || DATE_LINE.fr;

  return (
    <section
      className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden bg-ink-950"
      aria-label="Barbecue Expo 2027 hero"
    >
      {/* Background — YouTube video (muted, looped 0:00→0:44) */}
      <YouTubeHeroBackground poster={blok.media_background?.filename || undefined} />

      {/* Cinematic gradient — darker at top and bottom for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/30 to-ink-950/90 pointer-events-none"
        aria-hidden="true"
      />
      {/* Side vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(14,14,14,0.6)_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Monogramme « B » : en haut au centre sur mobile, en bas à gauche sur
          desktop (en haut à gauche, il passait sous la barre de navigation). */}
      {blok.media?.filename && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 md:top-auto md:bottom-10 md:left-12 md:translate-x-0">
          <Image
            src={blok.media.filename}
            alt={blok.media.alt || "Barbecue Expo"}
            width={80}
            height={150}
            className="h-16 md:h-24 w-auto"
          />
        </div>
      )}

      {/* Editorial slogan — oversize, 3 lines, staggered reveal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1
          className="text-cream-50 leading-[0.95] select-none"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          <span className="slogan-line slogan-reveal block text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]" style={{ animationDelay: "0.2s" }}>
            {slogan.line1}
          </span>
          <span className="slogan-line slogan-reveal block text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-gold-500" style={{ animationDelay: "0.4s" }}>
            {slogan.line2}
          </span>
          <span className="slogan-line slogan-reveal block text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]" style={{ animationDelay: "0.6s" }}>
            {slogan.line3}
          </span>
        </h1>

        {/* Date + location — under the title, prominent */}
        <div className="slogan-reveal mt-8 md:mt-12 flex flex-col items-center gap-3" style={{ animationDelay: "0.85s" }}>
          <div className="flex items-center gap-3 md:gap-4 text-cream-50">
            <span className="inline-block w-8 md:w-12 h-px bg-gold-500" aria-hidden="true" />
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide uppercase" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
              {dateLine}
            </span>
            <span className="inline-block w-8 md:w-12 h-px bg-gold-500" aria-hidden="true" />
          </div>
          <div className="text-cream-50/85 text-base sm:text-lg md:text-xl tracking-widest uppercase font-medium">
            Parc Floral de Paris
          </div>
        </div>
      </div>

      {/* Scroll cue — bottom right */}
      <button
        type="button"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
        className="absolute bottom-8 right-6 md:right-12 z-10 text-cream-50 text-xs md:text-sm tracking-widest uppercase font-medium flex flex-col items-center gap-2 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 rounded"
        aria-label={scrollLabel}
      >
        <span className="opacity-80 group-hover:opacity-100 transition-opacity">
          {scrollLabel}
        </span>
        <span
          className="relative block w-px h-12 bg-cream-50/40 overflow-hidden"
          aria-hidden="true"
        >
          <span className="absolute inset-0 bg-gold-500 animate-scroll-line" />
        </span>
      </button>
    </section>
  );
}
