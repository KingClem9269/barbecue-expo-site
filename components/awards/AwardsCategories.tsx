"use client";
import { useLocale } from "next-intl";
import { Lightbulb, Wrench, Palette, Scale, Sparkles } from "lucide-react";

/**
 * AwardsCategories — the 5 award categories, detailed with eligibility + judging.
 * Dark ink-950 background with rich cards.
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; who: string; body: string }[];
  }
> = {
  fr: {
    eyebrow: "Les catégories",
    title: "Cinq terrains, un seul critère : l'excellence.",
    subtitle:
      "Chaque marque exposante peut candidater dans une ou plusieurs catégories. L'évaluation est conduite par un jury international qui ne connaît pas l'identité des marques qu'il note.",
    items: [
      {
        title: "Meilleure innovation",
        who: "Pour toute marque lançant un produit inédit en 2027",
        body: "Rupture technologique, fonctionnalité nouvelle, usage repensé. Ce qui fait avancer la discipline.",
      },
      {
        title: "Meilleur accessoire",
        who: "Accessoires, ustensiles, pièces détachées",
        body: "L'outil qu'on garde vingt ans. Fonctionnalité, ergonomie, durabilité, finition.",
      },
      {
        title: "Meilleur design",
        who: "Tout produit remarquable esthétiquement",
        body: "Proposition visuelle forte, intégration harmonieuse à l'espace de vie, identité de marque assumée.",
      },
      {
        title: "Meilleur rapport qualité/prix",
        who: "Produits dans la tranche grand public",
        body: "Démocratiser le BBQ haut de gamme sans compromettre la qualité. La marque qui rend le feu accessible.",
      },
      {
        title: "Meilleure marque émergente",
        who: "Marques fondées après 2022",
        body: "La nouvelle génération. Une jeune pousse qui apporte un angle neuf et prometteur sur un marché établi.",
      },
    ],
  },
  en: {
    eyebrow: "The categories",
    title: "Five arenas, one standard: excellence.",
    subtitle:
      "Any exhibiting brand can apply in one or several categories. Evaluation is led by an international jury that does not know the identity of the brands they score.",
    items: [
      {
        title: "Best Innovation",
        who: "For any brand launching a new product in 2027",
        body: "Technological breakthrough, new feature, rethought use. What moves the discipline forward.",
      },
      {
        title: "Best Accessory",
        who: "Accessories, utensils, spare parts",
        body: "The tool you keep for twenty years. Function, ergonomics, durability, finish.",
      },
      {
        title: "Best Design",
        who: "Any product visually remarkable",
        body: "Strong visual proposition, harmonious integration into living spaces, clear brand identity.",
      },
      {
        title: "Best Value",
        who: "Products in the mainstream price range",
        body: "Democratize high-end BBQ without compromising quality. The brand making fire accessible.",
      },
      {
        title: "Best Emerging Brand",
        who: "Brands founded after 2022",
        body: "The new generation. A young brand bringing a fresh, promising angle to an established market.",
      },
    ],
  },
  es: {
    eyebrow: "Las categorías",
    title: "Cinco terrenos, un solo criterio: la excelencia.",
    subtitle:
      "Cualquier marca expositora puede postularse en una o varias categorías. La evaluación es realizada por un jurado internacional que no conoce la identidad de las marcas que puntúa.",
    items: [
      { title: "Mejor innovación", who: "Para toda marca que lance un producto inédito en 2027", body: "Ruptura tecnológica, funcionalidad nueva, uso replanteado. Lo que hace avanzar la disciplina." },
      { title: "Mejor accesorio", who: "Accesorios, utensilios, piezas de repuesto", body: "La herramienta que se guarda veinte años. Funcionalidad, ergonomía, durabilidad, acabado." },
      { title: "Mejor diseño", who: "Todo producto destacable estéticamente", body: "Propuesta visual fuerte, integración armoniosa al espacio vital, identidad de marca asumida." },
      { title: "Mejor relación calidad-precio", who: "Productos en el rango de gran público", body: "Democratizar el BBQ de alta gama sin comprometer la calidad." },
      { title: "Mejor marca emergente", who: "Marcas fundadas después de 2022", body: "La nueva generación. Una marca joven con un ángulo fresco y prometedor." },
    ],
  },
  de: {
    eyebrow: "Die Kategorien",
    title: "Fünf Arenen, ein Standard: Exzellenz.",
    subtitle:
      "Jede ausstellende Marke kann sich in einer oder mehreren Kategorien bewerben. Die Bewertung erfolgt durch eine internationale Jury, die die Identität der Marken nicht kennt.",
    items: [
      { title: "Beste Innovation", who: "Für jede Marke, die 2027 ein neues Produkt auf den Markt bringt", body: "Technologischer Durchbruch, neue Funktion, neu gedachter Einsatz." },
      { title: "Bestes Zubehör", who: "Zubehör, Werkzeuge, Ersatzteile", body: "Das Werkzeug, das man zwanzig Jahre behält. Funktion, Ergonomie, Haltbarkeit." },
      { title: "Bestes Design", who: "Jedes optisch bemerkenswerte Produkt", body: "Starkes visuelles Statement, harmonische Integration, klare Markenidentität." },
      { title: "Bestes Preis-Leistungs-Verhältnis", who: "Produkte im Mainstream-Preissegment", body: "Hochwertiges BBQ demokratisieren ohne Qualitätsverlust." },
      { title: "Beste aufstrebende Marke", who: "Marken, gegründet nach 2022", body: "Die neue Generation. Ein junger Anbieter mit einem frischen, vielversprechenden Ansatz." },
    ],
  },
  nl: {
    eyebrow: "De categorieën",
    title: "Vijf arena's, één standaard: excellentie.",
    subtitle:
      "Elk deelnemend merk kan in een of meerdere categorieën inschrijven. De evaluatie wordt uitgevoerd door een internationale jury die de identiteit van de merken niet kent.",
    items: [
      { title: "Beste innovatie", who: "Voor elk merk dat in 2027 een nieuw product lanceert", body: "Technologische doorbraak, nieuwe functie, heroverwogen gebruik." },
      { title: "Beste accessoire", who: "Accessoires, gereedschappen, reserveonderdelen", body: "Het gereedschap dat je twintig jaar bewaart. Functie, ergonomie, duurzaamheid." },
      { title: "Beste design", who: "Elk visueel opvallend product", body: "Sterke visuele propositie, harmonieuze integratie, heldere merkidentiteit." },
      { title: "Beste prijs-kwaliteit", who: "Producten in het middensegment", body: "High-end BBQ democratiseren zonder op kwaliteit in te boeten." },
      { title: "Beste opkomend merk", who: "Merken opgericht na 2022", body: "De nieuwe generatie. Een jong merk met een frisse, veelbelovende invalshoek." },
    ],
  },
  pt: {
    eyebrow: "As categorias",
    title: "Cinco arenas, um só critério: a excelência.",
    subtitle:
      "Qualquer marca expositora pode candidatar-se numa ou várias categorias. A avaliação é conduzida por um júri internacional que não conhece a identidade das marcas que classifica.",
    items: [
      { title: "Melhor inovação", who: "Para qualquer marca que lance um produto inédito em 2027", body: "Rutura tecnológica, funcionalidade nova, uso repensado." },
      { title: "Melhor acessório", who: "Acessórios, utensílios, peças de substituição", body: "A ferramenta que se guarda vinte anos. Funcionalidade, ergonomia, durabilidade." },
      { title: "Melhor design", who: "Qualquer produto esteticamente notável", body: "Proposta visual forte, integração harmoniosa, identidade de marca assumida." },
      { title: "Melhor relação qualidade-preço", who: "Produtos na faixa de grande público", body: "Democratizar o BBQ premium sem comprometer a qualidade." },
      { title: "Melhor marca emergente", who: "Marcas fundadas após 2022", body: "A nova geração. Uma marca jovem com um ângulo fresco e promissor." },
    ],
  },
  it: {
    eyebrow: "Le categorie",
    title: "Cinque arene, un solo criterio: l'eccellenza.",
    subtitle:
      "Ogni marchio espositore può candidarsi in una o più categorie. La valutazione è condotta da una giuria internazionale che non conosce l'identità dei marchi che valuta.",
    items: [
      { title: "Migliore innovazione", who: "Per ogni marchio che lancia un prodotto inedito nel 2027", body: "Rottura tecnologica, funzionalità nuova, uso ripensato." },
      { title: "Miglior accessorio", who: "Accessori, utensili, pezzi di ricambio", body: "Lo strumento che si tiene vent'anni. Funzionalità, ergonomia, durata." },
      { title: "Miglior design", who: "Ogni prodotto esteticamente notevole", body: "Proposta visiva forte, integrazione armoniosa, identità di marca assunta." },
      { title: "Miglior rapporto qualità-prezzo", who: "Prodotti nella fascia mainstream", body: "Democratizzare il BBQ di alta gamma senza compromessi sulla qualità." },
      { title: "Miglior marchio emergente", who: "Marchi fondati dopo il 2022", body: "La nuova generazione. Un giovane marchio con un angolo fresco e promettente." },
    ],
  },
};

const ICONS = [Lightbulb, Wrench, Palette, Scale, Sparkles];

export default function AwardsCategories() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

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
              className="text-cream-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.title}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-cream-50/80 text-base md:text-lg leading-relaxed">
              {ui.subtitle}
            </p>
          </div>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {ui.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={i}
                className="relative border border-white/15 bg-white/[0.02] hover:border-gold-500/50 rounded-sm p-6 md:p-8 transition-colors"
              >
                <div className="flex items-center justify-between mb-5">
                  <Icon className="w-6 h-6 text-gold-500" strokeWidth={2} />
                  <span className="text-xs text-gold-500 uppercase tracking-widest font-bold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="text-cream-50 text-xl md:text-2xl leading-tight font-bold mb-3"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gold-500 text-xs uppercase tracking-widest font-semibold mb-4">
                  {item.who}
                </p>
                <p className="text-cream-50/75 text-sm md:text-base leading-relaxed">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
