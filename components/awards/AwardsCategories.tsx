"use client";
import Image from "next/image";
import { useLocale } from "next-intl";

/**
 * AwardsCategories — les 6 catégories officielles (charte Awards 2027),
 * chacune illustrée par sa pastille Gold. Fond ink-950.
 */

type Loc = "fr" | "en" | "es" | "de" | "nl" | "pt" | "it";
type Bi = Record<Loc, string>;
const L = (v: Bi, loc: string) => v[loc as Loc] ?? v.fr;

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
  es: {
    eyebrow: "Las categorías",
    title: "Seis categorías, tres metales.",
    subtitle:
      "Cada marca expositora puede presentar su candidatura en una o varias categorías. La evaluación la realiza un jurado internacional que desconoce la identidad de las marcas que puntúa. Oro, plata y bronce por categoría.",
  },
  de: {
    eyebrow: "Die Kategorien",
    title: "Sechs Kategorien, drei Metalle.",
    subtitle:
      "Jede ausstellende Marke kann sich in einer oder mehreren Kategorien bewerben. Die Bewertung erfolgt durch eine internationale Jury, die die Identität der bewerteten Marken nicht kennt. Gold, Silber, Bronze pro Kategorie.",
  },
  nl: {
    eyebrow: "De categorieën",
    title: "Zes categorieën, drie metalen.",
    subtitle:
      "Elk exposerend merk kan zich inschrijven in één of meerdere categorieën. De beoordeling gebeurt door een internationale jury die de identiteit van de beoordeelde merken niet kent. Goud, zilver, brons per categorie.",
  },
  pt: {
    eyebrow: "As categorias",
    title: "Seis categorias, três metais.",
    subtitle:
      "Cada marca expositora pode candidatar-se a uma ou várias categorias. A avaliação é conduzida por um júri internacional que não conhece a identidade das marcas que avalia. Ouro, prata e bronze por categoria.",
  },
  it: {
    eyebrow: "Le categorie",
    title: "Sei categorie, tre metalli.",
    subtitle:
      "Ogni marchio espositore può candidarsi in una o più categorie. La valutazione è condotta da una giuria internazionale che non conosce l'identità dei marchi che valuta. Oro, argento, bronzo per categoria.",
  },
};

const CATS: { badge: string; title: string; who: Bi; body: Bi }[] = [
  {
    badge: "/awards/gold-innovation.png",
    title: "Best Innovation",
    who: {
      fr: "Toute marque lançant un produit inédit en 2027",
      en: "Any brand launching a new product in 2027",
      es: "Toda marca que lance un producto inédito en 2027",
      de: "Jede Marke, die 2027 ein neues Produkt auf den Markt bringt",
      nl: "Elk merk dat in 2027 een nieuw product lanceert",
      pt: "Qualquer marca que lance um produto inédito em 2027",
      it: "Ogni marchio che lancia un prodotto inedito nel 2027",
    },
    body: {
      fr: "Rupture technologique, fonctionnalité nouvelle, usage repensé — ce qui fait avancer la discipline.",
      en: "Technological breakthrough, new feature, rethought use — what moves the discipline forward.",
      es: "Ruptura tecnológica, nueva funcionalidad, uso repensado: lo que hace avanzar la disciplina.",
      de: "Technologischer Durchbruch, neue Funktion, neu gedachte Nutzung — was die Disziplin voranbringt.",
      nl: "Technologische doorbraak, nieuwe functie, herdacht gebruik — wat de discipline vooruithelpt.",
      pt: "Rutura tecnológica, nova funcionalidade, utilização repensada — o que faz avançar a disciplina.",
      it: "Svolta tecnologica, nuova funzionalità, uso ripensato — ciò che fa progredire la disciplina.",
    },
  },
  {
    badge: "/awards/gold-bbq.png",
    title: "Best BBQ",
    who: {
      fr: "Barbecues, fumoirs, planchas, braseros",
      en: "Grills, smokers, griddles, fire pits",
      es: "Barbacoas, ahumadores, planchas, braseros",
      de: "Grills, Smoker, Planchas, Feuerschalen",
      nl: "Barbecues, smokers, plancha's, vuurschalen",
      pt: "Grelhadores, defumadores, planchas, braseiros",
      it: "Barbecue, affumicatori, piastre, bracieri",
    },
    body: {
      fr: "L'appareil de cuisson lui-même : performance, maîtrise du feu, qualité de fabrication et plaisir d'usage.",
      en: "The cooking appliance itself: performance, fire control, build quality and sheer enjoyment.",
      es: "El aparato de cocción en sí: rendimiento, control del fuego, calidad de fabricación y placer de uso.",
      de: "Das Gargerät selbst: Leistung, Feuerkontrolle, Verarbeitungsqualität und Freude an der Nutzung.",
      nl: "Het kooktoestel zelf: prestaties, beheersing van het vuur, bouwkwaliteit en gebruiksplezier.",
      pt: "O próprio aparelho de cozedura: desempenho, domínio do fogo, qualidade de fabrico e prazer de utilização.",
      it: "L'apparecchio di cottura in sé: prestazioni, controllo del fuoco, qualità costruttiva e piacere d'uso.",
    },
  },
  {
    badge: "/awards/gold-accessory.png",
    title: "Best Accessory",
    who: {
      fr: "Accessoires, ustensiles, pièces détachées",
      en: "Accessories, utensils, spare parts",
      es: "Accesorios, utensilios, recambios",
      de: "Zubehör, Utensilien, Ersatzteile",
      nl: "Accessoires, gereedschap, onderdelen",
      pt: "Acessórios, utensílios, peças sobresselentes",
      it: "Accessori, utensili, ricambi",
    },
    body: {
      fr: "L'outil qu'on garde vingt ans. Fonctionnalité, ergonomie, durabilité, finition.",
      en: "The tool you keep for twenty years. Function, ergonomics, durability, finish.",
      es: "La herramienta que conservas veinte años. Funcionalidad, ergonomía, durabilidad, acabado.",
      de: "Das Werkzeug, das man zwanzig Jahre behält. Funktion, Ergonomie, Langlebigkeit, Verarbeitung.",
      nl: "Het gereedschap dat je twintig jaar houdt. Functionaliteit, ergonomie, duurzaamheid, afwerking.",
      pt: "A ferramenta que se guarda vinte anos. Funcionalidade, ergonomia, durabilidade, acabamento.",
      it: "Lo strumento che si tiene per vent'anni. Funzionalità, ergonomia, durata, finitura.",
    },
  },
  {
    badge: "/awards/gold-food-product.png",
    title: "Best Food Product",
    who: {
      fr: "Sauces, rubs, charbons, viandes, épicerie fine",
      en: "Sauces, rubs, charcoal, meats, fine food",
      es: "Salsas, rubs, carbones, carnes, gourmet",
      de: "Saucen, Rubs, Kohle, Fleisch, Feinkost",
      nl: "Sauzen, rubs, houtskool, vlees, delicatessen",
      pt: "Molhos, rubs, carvões, carnes, mercearia fina",
      it: "Salse, rub, carbonella, carni, gastronomia",
    },
    body: {
      fr: "Le produit qui change une grillade : goût, qualité, origine et régularité.",
      en: "The product that transforms a cook: taste, quality, origin and consistency.",
      es: "El producto que transforma una parrillada: sabor, calidad, origen y regularidad.",
      de: "Das Produkt, das ein Grillgericht verändert: Geschmack, Qualität, Herkunft und Beständigkeit.",
      nl: "Het product dat een grillgerecht verandert: smaak, kwaliteit, herkomst en constantheid.",
      pt: "O produto que transforma um grelhado: sabor, qualidade, origem e regularidade.",
      it: "Il prodotto che cambia una grigliata: gusto, qualità, origine e costanza.",
    },
  },
  {
    badge: "/awards/gold-stand-design.png",
    title: "Best Stand Design",
    who: {
      fr: "Tous les exposants du salon",
      en: "All show exhibitors",
      es: "Todos los expositores del salón",
      de: "Alle Aussteller der Messe",
      nl: "Alle exposanten van de beurs",
      pt: "Todos os expositores do salão",
      it: "Tutti gli espositori del salone",
    },
    body: {
      fr: "Le stand le plus abouti : scénographie, accueil, cohérence de marque et impact visuel.",
      en: "The most accomplished stand: scenography, welcome, brand coherence and visual impact.",
      es: "El stand más logrado: escenografía, acogida, coherencia de marca e impacto visual.",
      de: "Der gelungenste Stand: Szenografie, Empfang, Markenkohärenz und visuelle Wirkung.",
      nl: "De meest geslaagde stand: scenografie, ontvangst, merkcoherentie en visuele impact.",
      pt: "O stand mais bem conseguido: cenografia, acolhimento, coerência de marca e impacto visual.",
      it: "Lo stand più riuscito: scenografia, accoglienza, coerenza di marca e impatto visivo.",
    },
  },
  {
    badge: "/awards/gold-live-experience.png",
    title: "Best Live Experience",
    who: {
      fr: "Démonstrations, animations, shows",
      en: "Demos, shows, live acts",
      es: "Demostraciones, animaciones, shows",
      de: "Vorführungen, Animationen, Shows",
      nl: "Demonstraties, animaties, shows",
      pt: "Demonstrações, animações, shows",
      it: "Dimostrazioni, animazioni, show",
    },
    body: {
      fr: "L'expérience live la plus marquante pour le public : énergie, transmission, spectacle.",
      en: "The most memorable live experience for the public: energy, transmission, spectacle.",
      es: "La experiencia en directo más impactante para el público: energía, transmisión, espectáculo.",
      de: "Das eindrucksvollste Live-Erlebnis für das Publikum: Energie, Vermittlung, Spektakel.",
      nl: "De meest indrukwekkende live-ervaring voor het publiek: energie, overdracht, spektakel.",
      pt: "A experiência ao vivo mais marcante para o público: energia, transmissão, espetáculo.",
      it: "L'esperienza dal vivo più memorabile per il pubblico: energia, trasmissione, spettacolo.",
    },
  },
];

export default function AwardsCategories() {
  const locale = useLocale();
  const loc = locale;
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
