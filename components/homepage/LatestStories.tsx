"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";

/**
 * LatestStories — editorial homepage closer.
 *
 * Replaces the legacy "Actualités" Storyblok blog-preview (which was
 * Lorem Ipsum placeholder articles). Instead, surface the rich content
 * we actually have on the site: pitmasters, awards, masterclasses,
 * Grill Arena. Acts like a magazine "Read more" section.
 */

interface Story {
  kicker: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

const UI: Record<string, { eyebrow: string; title: string; cta: string; stories: Story[] }> = {
  fr: {
    eyebrow: "À lire avant de venir",
    title: "Quatre histoires pour comprendre 2027.",
    cta: "Lire la suite",
    stories: [
      {
        kicker: "Format inédit",
        title: "Grill Arena, le seul battle BBQ live en Europe.",
        excerpt: "Seize pitmasters, 90 minutes par duel, un seul champion couronné le dimanche soir. Ni Spoga Gafa ni BBQ Expo Italy ne l'ont. Voici comment ça marche.",
        image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg",
        href: "/grill-arena",
      },
      {
        kicker: "Première édition",
        title: "Les Awards qui distinguent les meilleures marques.",
        excerpt: "Or, argent, bronze sur cinq catégories. Jury international, évaluation à l'aveugle, cérémonie au Parc Floral. Une médaille devient un argument de vente pour un an.",
        image: "/photos-2026/bbq-expo-105.jpg",
        href: "/awards",
      },
      {
        kicker: "Vingt portraits",
        title: "Les pitmasters de 2027, un par un.",
        excerpt: "Du Texas au Japon, de Buenos Aires à Florence. Vingt invités internationaux, vingt manières différentes de cuisiner au feu. Filtres par pays, spécialité, jour de présence.",
        image: "/photos-2026/william-plin-jpc-110426-533a4856.jpg",
        href: "/pitmasters",
      },
      {
        kicker: "Douze sessions",
        title: "Les masterclasses qui se remplissent en deux semaines.",
        excerpt: "Vingt places maximum par session. Un pitmaster international vous montre, vous corrige, vous fait goûter. Brisket, kamado, asado, charcuterie, dry-aged… réservez vite.",
        image: "/photos-2026/bbq-expo-720.jpg",
        href: "/program/masterclasses",
      },
    ],
  },
  en: {
    eyebrow: "Read before you come",
    title: "Four stories to understand 2027.",
    cta: "Read more",
    stories: [
      { kicker: "New format", title: "Grill Arena, the only live BBQ battle in Europe.", excerpt: "Sixteen pitmasters, 90 minutes per duel, one champion crowned Sunday night. Neither Spoga Gafa nor BBQ Expo Italy has it. Here's how it works.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg", href: "/grill-arena" },
      { kicker: "First edition", title: "The Awards that distinguish the best brands.", excerpt: "Gold, silver, bronze in five categories. International jury, blind evaluation, ceremony at Parc Floral. A medal becomes a year-long selling argument.", image: "/photos-2026/bbq-expo-105.jpg", href: "/awards" },
      { kicker: "Twenty portraits", title: "The 2027 pitmasters, one by one.", excerpt: "From Texas to Japan, Buenos Aires to Florence. Twenty international guests, twenty different ways of cooking with fire. Filter by country, specialty, day.", image: "/photos-2026/william-plin-jpc-110426-533a4856.jpg", href: "/pitmasters" },
      { kicker: "Twelve sessions", title: "Masterclasses that fill up in two weeks.", excerpt: "Twenty seats max per session. An international pitmaster shows you, corrects you, makes you taste. Brisket, kamado, asado, charcuterie, dry-aged… book fast.", image: "/photos-2026/bbq-expo-720.jpg", href: "/program/masterclasses" },
    ],
  },
};

const ALIASES: Record<string, "fr" | "en"> = { es: "fr", de: "fr", nl: "fr", pt: "fr", it: "fr" };

export default function LatestStories() {
  const locale = useLocale();
  const ui = UI[locale] || UI[ALIASES[locale] || "fr"];

  return (
    <section
      className="relative w-full bg-ink-950 py-14 md:py-20 overflow-hidden"
      aria-label="À la une"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-gold-500/15 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <h2
          className="text-cream-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold mb-12 md:mb-16 max-w-4xl"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          {ui.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {ui.stories.map((s, i) => (
            <Link
              key={i}
              href={s.href}
              className="group relative block aspect-[16/10] overflow-hidden rounded-sm bg-char-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              <Image
                src={s.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent opacity-90"
                aria-hidden="true"
              />
              <div
                className="absolute inset-3 ring-1 ring-gold-500/0 group-hover:ring-gold-500/60 transition-all duration-500 pointer-events-none rounded-sm"
                aria-hidden="true"
              />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-cream-50">
                <div className="text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-3">
                  {s.kicker}
                </div>
                <h3
                  className="text-2xl md:text-3xl lg:text-4xl leading-tight font-bold mb-3"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-cream-50/80 text-sm md:text-base leading-relaxed line-clamp-3 mb-4">
                  {s.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-cream-50 text-xs md:text-sm font-bold uppercase tracking-widest">
                  <span>{ui.cta}</span>
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={2.5}
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
