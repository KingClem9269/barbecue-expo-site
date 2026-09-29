"use client";
import Image from "next/image";
import { useLocale } from "next-intl";

/**
 * AwardsCategories — les 6 catégories officielles (charte Awards 2027),
 * chacune illustrée par sa pastille Gold. Fond ink-950.
 */

type Bi = { fr: string; en: string };
const ALIASES: Record<string, "fr" | "en"> = { es: "fr", de: "fr", nl: "fr", pt: "fr", it: "fr" };
const L = (v: Bi, loc: string) => v[loc === "en" ? "en" : "fr"];

const UI: Record<string, { eyebrow: string; title: string; subtitle: string }> = {
  fr: {
    eyebrow: "Les catégories",
    title: "Six catégories, trois métaux.",
    subtitle:
      "Chaque marque exposante peut candidater dans une ou plusieurs catégories. L'évaluation est conduite par un jury international qui ne connaît pas l'identité des marques qu'il note. Or, argent, bronze par catégorie.",
  },
  en: {
    eyebrow: "The categories",
    title: "Six categories, three metals.",
    subtitle:
      "Any exhibiting brand can apply in one or several categories. Evaluation is led by an international jury that does not know the identity of the brands they score. Gold, silver, bronze per category.",
  },
};

const CATS: { badge: string; title: string; who: Bi; body: Bi }[] = [
  {
    badge: "/awards/gold-innovation.png",
    title: "Best Innovation",
    who: { fr: "Toute marque lançant un produit inédit en 2027", en: "Any brand launching a new product in 2027" },
    body: {
      fr: "Rupture technologique, fonctionnalité nouvelle, usage repensé — ce qui fait avancer la discipline.",
      en: "Technological breakthrough, new feature, rethought use — what moves the discipline forward.",
    },
  },
  {
    badge: "/awards/gold-bbq.png",
    title: "Best BBQ",
    who: { fr: "Barbecues, fumoirs, planchas, braseros", en: "Grills, smokers, griddles, fire pits" },
    body: {
      fr: "L'appareil de cuisson lui-même : performance, maîtrise du feu, qualité de fabrication et plaisir d'usage.",
      en: "The cooking appliance itself: performance, fire control, build quality and sheer enjoyment.",
    },
  },
  {
    badge: "/awards/gold-accessory.png",
    title: "Best Accessory",
    who: { fr: "Accessoires, ustensiles, pièces détachées", en: "Accessories, utensils, spare parts" },
    body: {
      fr: "L'outil qu'on garde vingt ans. Fonctionnalité, ergonomie, durabilité, finition.",
      en: "The tool you keep for twenty years. Function, ergonomics, durability, finish.",
    },
  },
  {
    badge: "/awards/gold-food-product.png",
    title: "Best Food Product",
    who: { fr: "Sauces, rubs, charbons, viandes, épicerie fine", en: "Sauces, rubs, charcoal, meats, fine food" },
    body: {
      fr: "Le produit qui change une grillade : goût, qualité, origine et régularité.",
      en: "The product that transforms a cook: taste, quality, origin and consistency.",
    },
  },
  {
    badge: "/awards/gold-stand-design.png",
    title: "Best Stand Design",
    who: { fr: "Tous les exposants du salon", en: "All show exhibitors" },
    body: {
      fr: "Le stand le plus abouti : scénographie, accueil, cohérence de marque et impact visuel.",
      en: "The most accomplished stand: scenography, welcome, brand coherence and visual impact.",
    },
  },
  {
    badge: "/awards/gold-live-experience.png",
    title: "Best Live Experience",
    who: { fr: "Démonstrations, animations, shows", en: "Demos, shows, live acts" },
    body: {
      fr: "L'expérience live la plus marquante pour le public : énergie, transmission, spectacle.",
      en: "The most memorable live experience for the public: energy, transmission, spectacle.",
    },
  },
];

export default function AwardsCategories() {
  const locale = useLocale();
  const loc = locale === "en" ? "en" : ALIASES[locale] || (locale === "fr" ? "fr" : "fr");
  const ui = UI[loc] || UI.fr;

  return (
    <section className="relative w-full bg-ink-950 py-14 md:py-20 overflow-hidden" aria-label="Award categories">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-gold-500/15 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8 md:mb-12">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
          <div className="lg:col-span-8">
            <h2
              className="text-cream-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.title}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-cream-50/80 text-base md:text-lg leading-relaxed">{ui.subtitle}</p>
          </div>
        </div>

        {/* Category cards — chacune avec sa pastille Gold */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CATS.map((cat, i) => (
            <div
              key={i}
              className="relative border border-white/15 bg-white/[0.02] hover:border-gold-500/50 rounded-sm p-6 md:p-7 transition-colors"
            >
              <div className="relative w-full h-40 mb-5">
                <Image
                  src={cat.badge}
                  alt={`${cat.title} — Barbecue Expo Award`}
                  fill
                  sizes="(max-width: 768px) 90vw, 360px"
                  className="object-contain"
                />
              </div>
              <h3
                className="text-cream-50 text-xl md:text-2xl leading-tight font-bold mb-2"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {cat.title}
              </h3>
              <p className="text-gold-500 text-xs uppercase tracking-widest font-semibold mb-3">
                {L(cat.who, loc)}
              </p>
              <p className="text-cream-50/75 text-sm md:text-base leading-relaxed">{L(cat.body, loc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
