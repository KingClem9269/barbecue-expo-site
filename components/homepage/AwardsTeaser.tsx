"use client";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Medal } from "lucide-react";

/**
 * AwardsTeaser — B2B-focused signature section introducing the
 * Barbecue Expo Awards 2027. Positions the event as the industry
 * reference that distinguishes brands (not just showcases them).
 *
 * Cream background + medal podium visual — contrasts with Grill Arena
 * dark battle feel.
 */

interface AwardsBlok {
  _uid?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  categories?: string[];
  cta_label?: string;
  cta_href?: string;
}

const DEFAULTS: Record<
  string,
  Required<Omit<AwardsBlok, "_uid">>
> = {
  fr: {
    eyebrow: "Nouveauté 2027 — première édition",
    title: "Barbecue Expo Awards",
    subtitle:
      "Les awards qui distinguent les meilleures marques du secteur BBQ. Or, argent, bronze — remis par un jury international de pitmasters, chefs et experts.",
    categories: [
      "Meilleure innovation",
      "Meilleur accessoire",
      "Meilleur design",
      "Meilleur rapport qualité/prix",
      "Meilleure marque émergente",
    ],
    cta_label: "Voir les catégories",
    cta_href: "/awards",
  },
  en: {
    eyebrow: "New for 2027 — first edition",
    title: "Barbecue Expo Awards",
    subtitle:
      "The awards that distinguish the best brands in the BBQ industry. Gold, silver, bronze — awarded by an international jury of pitmasters, chefs and experts.",
    categories: [
      "Best Innovation",
      "Best Accessory",
      "Best Design",
      "Best Value",
      "Best Emerging Brand",
    ],
    cta_label: "See categories",
    cta_href: "/awards",
  },
  es: {
    eyebrow: "Novedad 2027 — primera edición",
    title: "Barbecue Expo Awards",
    subtitle:
      "Los premios que distinguen a las mejores marcas del sector BBQ. Oro, plata, bronce — otorgados por un jurado internacional de pitmasters, chefs y expertos.",
    categories: [
      "Mejor innovación",
      "Mejor accesorio",
      "Mejor diseño",
      "Mejor relación calidad-precio",
      "Mejor marca emergente",
    ],
    cta_label: "Ver categorías",
    cta_href: "/awards",
  },
  de: {
    eyebrow: "Neu 2027 — erste Ausgabe",
    title: "Barbecue Expo Awards",
    subtitle:
      "Die Auszeichnungen, die die besten Marken der BBQ-Branche würdigen. Gold, Silber, Bronze — verliehen von einer internationalen Jury aus Pitmastern, Köchen und Experten.",
    categories: [
      "Beste Innovation",
      "Bestes Zubehör",
      "Bestes Design",
      "Bestes Preis-Leistungs-Verhältnis",
      "Beste aufstrebende Marke",
    ],
    cta_label: "Kategorien ansehen",
    cta_href: "/awards",
  },
  nl: {
    eyebrow: "Nieuw in 2027 — eerste editie",
    title: "Barbecue Expo Awards",
    subtitle:
      "De prijzen die de beste merken van de BBQ-industrie onderscheiden. Goud, zilver, brons — uitgereikt door een internationale jury van pitmasters, chefs en experts.",
    categories: [
      "Beste innovatie",
      "Beste accessoire",
      "Beste design",
      "Beste prijs-kwaliteit",
      "Beste opkomend merk",
    ],
    cta_label: "Bekijk categorieën",
    cta_href: "/awards",
  },
  pt: {
    eyebrow: "Novidade 2027 — primeira edição",
    title: "Barbecue Expo Awards",
    subtitle:
      "Os prémios que distinguem as melhores marcas do setor BBQ. Ouro, prata, bronze — atribuídos por um júri internacional de pitmasters, chefs e especialistas.",
    categories: [
      "Melhor inovação",
      "Melhor acessório",
      "Melhor design",
      "Melhor relação qualidade-preço",
      "Melhor marca emergente",
    ],
    cta_label: "Ver categorias",
    cta_href: "/awards",
  },
  it: {
    eyebrow: "Novità 2027 — prima edizione",
    title: "Barbecue Expo Awards",
    subtitle:
      "I premi che distinguono i migliori marchi del settore BBQ. Oro, argento, bronzo — assegnati da una giuria internazionale di pitmaster, chef ed esperti.",
    categories: [
      "Migliore innovazione",
      "Miglior accessorio",
      "Miglior design",
      "Miglior rapporto qualità-prezzo",
      "Miglior marchio emergente",
    ],
    cta_label: "Vedi le categorie",
    cta_href: "/awards",
  },
};

const MEDAL_LABELS: Record<string, { gold: string; silver: string; bronze: string }> = {
  fr: { gold: "Or", silver: "Argent", bronze: "Bronze" },
  en: { gold: "Gold", silver: "Silver", bronze: "Bronze" },
  es: { gold: "Oro", silver: "Plata", bronze: "Bronce" },
  de: { gold: "Gold", silver: "Silber", bronze: "Bronze" },
  nl: { gold: "Goud", silver: "Zilver", bronze: "Brons" },
  pt: { gold: "Ouro", silver: "Prata", bronze: "Bronze" },
  it: { gold: "Oro", silver: "Argento", bronze: "Bronzo" },
};

export default function AwardsTeaser({ blok }: { blok: AwardsBlok }) {
  const locale = useLocale();
  const d = DEFAULTS[locale] || DEFAULTS.fr;
  const medalLabels = MEDAL_LABELS[locale] || MEDAL_LABELS.fr;
  const data = {
    eyebrow: blok.eyebrow || d.eyebrow,
    title: blok.title || d.title,
    subtitle: blok.subtitle || d.subtitle,
    categories: blok.categories && blok.categories.length ? blok.categories : d.categories,
    cta_label: blok.cta_label || d.cta_label,
    cta_href: blok.cta_href || d.cta_href,
  };

  return (
    <section
      className="relative w-full bg-cream-100 py-14 md:py-20 lg:py-24 overflow-hidden"
      aria-label="Barbecue Expo Awards"
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left column — content */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
              <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
              {data.eyebrow}
            </div>

            <h2
              className="text-ink-900 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-bold mb-8"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {data.title}
            </h2>

            <p className="text-ink-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              {data.subtitle}
            </p>

            {/* CTA */}
            <Link
              href={data.cta_href}
              className="group inline-flex items-center gap-3 text-ink-900 hover:text-gold-700 text-sm md:text-base font-semibold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
            >
              <span>{data.cta_label}</span>
              <span
                aria-hidden="true"
                className="inline-block w-8 h-px bg-gold-600 origin-left transition-transform duration-300 group-hover:scale-x-[1.6]"
              />
            </Link>
          </div>

          {/* Right column — medals + categories */}
          <div className="lg:col-span-5">
            {/* Three medals — horizontal, clean */}
            <div className="flex gap-4 md:gap-5 mb-10">
              {[
                { label: medalLabels.gold, color: "bg-gold-500", textColor: "text-ink-950", size: "text-3xl md:text-4xl" },
                { label: medalLabels.silver, color: "bg-ink-300", textColor: "text-ink-900", size: "text-2xl md:text-3xl" },
                { label: medalLabels.bronze, color: "bg-ember-600", textColor: "text-cream-50", size: "text-2xl md:text-3xl" },
              ].map((m) => (
                <div
                  key={m.label}
                  className={`flex-1 ${m.color} rounded-sm py-6 md:py-8 flex flex-col items-center justify-center gap-2`}
                >
                  <Medal
                    className={`w-8 h-8 md:w-10 md:h-10 ${m.textColor}`}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span
                    className={`${m.textColor} ${m.size} font-bold uppercase tracking-widest`}
                    style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Categories list */}
            <ul className="border-t border-ink-900/15">
              {data.categories.slice(0, 5).map((cat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 py-4 border-b border-ink-900/15 text-ink-900"
                >
                  <span
                    className="text-gold-600 text-xs font-bold tabular-nums w-6"
                    style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base md:text-lg font-medium">{cat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
