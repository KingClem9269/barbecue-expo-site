import BrandsListing from "@/components/brands/BrandsListing";
import WorldCount from "@/components/brands/WorldCount";
import { buildMetadata } from "@/lib/seo";
import brandsData from "@/content/brands/index.json";
import type { Brand } from "@/lib/brands-shared";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    allCategories: string;
    allCountries: string;
    category: string;
    country: string;
    search: string;
    newForExpo: string;
    zero: string;
    one: string;
    many: string;
    empty: string;
    ctaStand: string;
  }
> = {
  fr: {
    eyebrow: "Édition 2027",
    title: "Les exposants",
    description:
      "250 marques internationales sélectionnées. Grills, accessoires, charbon, viande, sauces — des références mondiales aux pépites émergentes. Toutes réunies à Paris du 10 au 12 avril 2027.",
    allCategories: "Toutes catégories",
    allCountries: "Tous les pays",
    category: "Catégorie",
    country: "Pays",
    search: "Rechercher",
    newForExpo: "Nouveau 2027",
    zero: "Aucune marque trouvée",
    one: "1 marque",
    many: "{count} marques sur 250",
    empty: "Aucune marque ne correspond à votre recherche.",
    ctaStand: "Votre marque n'est pas là ? Devenir exposant 2027",
  },
  en: {
    eyebrow: "2027 edition",
    title: "The exhibitors",
    description:
      "250 curated international brands. Grills, accessories, charcoal, meat, sauces — from world references to emerging gems. All gathered in Paris, April 10–12, 2027.",
    allCategories: "All categories",
    allCountries: "All countries",
    category: "Category",
    country: "Country",
    search: "Search",
    newForExpo: "New 2027",
    zero: "No brand found",
    one: "1 brand",
    many: "{count} brands of 250",
    empty: "No brand matches your search.",
    ctaStand: "Your brand isn't here? Become a 2027 exhibitor",
  },
  es: {
    eyebrow: "Edición 2027",
    title: "Los expositores",
    description:
      "250 marcas internacionales seleccionadas. Parrillas, accesorios, carbón, carne, salsas — desde referentes mundiales hasta joyas emergentes.",
    allCategories: "Todas las categorías",
    allCountries: "Todos los países",
    category: "Categoría",
    country: "País",
    search: "Buscar",
    newForExpo: "Nuevo 2027",
    zero: "Ninguna marca encontrada",
    one: "1 marca",
    many: "{count} marcas de 250",
    empty: "Ninguna marca coincide con su búsqueda.",
    ctaStand: "¿Su marca no está aquí? Sea expositor 2027",
  },
  de: {
    eyebrow: "Ausgabe 2027",
    title: "Die Aussteller",
    description:
      "250 kuratierte internationale Marken. Grills, Zubehör, Holzkohle, Fleisch, Saucen — von Weltreferenzen bis zu aufstrebenden Perlen.",
    allCategories: "Alle Kategorien",
    allCountries: "Alle Länder",
    category: "Kategorie",
    country: "Land",
    search: "Suchen",
    newForExpo: "Neu 2027",
    zero: "Keine Marke gefunden",
    one: "1 Marke",
    many: "{count} Marken von 250",
    empty: "Keine Marke entspricht Ihrer Suche.",
    ctaStand: "Ihre Marke fehlt? Aussteller 2027 werden",
  },
  nl: {
    eyebrow: "Editie 2027",
    title: "De exposanten",
    description:
      "250 geselecteerde internationale merken. Grills, accessoires, houtskool, vlees, sauzen — van wereldreferenties tot opkomende parels.",
    allCategories: "Alle categorieën",
    allCountries: "Alle landen",
    category: "Categorie",
    country: "Land",
    search: "Zoeken",
    newForExpo: "Nieuw 2027",
    zero: "Geen merk gevonden",
    one: "1 merk",
    many: "{count} merken van 250",
    empty: "Geen merk komt overeen met uw zoekopdracht.",
    ctaStand: "Staat uw merk er niet bij? Word exposant 2027",
  },
  pt: {
    eyebrow: "Edição 2027",
    title: "Os expositores",
    description:
      "250 marcas internacionais selecionadas. Grelhas, acessórios, carvão, carne, molhos — das referências mundiais às joias emergentes.",
    allCategories: "Todas as categorias",
    allCountries: "Todos os países",
    category: "Categoria",
    country: "País",
    search: "Pesquisar",
    newForExpo: "Novo 2027",
    zero: "Nenhuma marca encontrada",
    one: "1 marca",
    many: "{count} marcas de 250",
    empty: "Nenhuma marca corresponde à sua pesquisa.",
    ctaStand: "A sua marca não está aqui? Seja expositor 2027",
  },
  it: {
    eyebrow: "Edizione 2027",
    title: "Gli espositori",
    description:
      "250 marchi internazionali selezionati. Griglie, accessori, carbone, carne, salse — dai riferimenti mondiali alle gemme emergenti.",
    allCategories: "Tutte le categorie",
    allCountries: "Tutti i paesi",
    category: "Categoria",
    country: "Paese",
    search: "Cercare",
    newForExpo: "Nuovo 2027",
    zero: "Nessun marchio trovato",
    one: "1 marchio",
    many: "{count} marchi su 250",
    empty: "Nessun marchio corrisponde alla tua ricerca.",
    ctaStand: "Il tuo marchio non c'è? Diventa espositore 2027",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.fr;
  return buildMetadata(locale, "/exposants", {
    title: `${ui.title} — Barbecue Expo 2026`,
    description: ui.description,
  });
}

export default async function ExposantsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.fr;
  const brands = brandsData as Brand[];

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero */}
      <section className="relative bg-ink-950 pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-gold-500/15 via-transparent to-transparent blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-6">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.title}
          </h1>
          <p className="mt-8 text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed">
            {ui.description}
          </p>
        </div>
      </section>

      {/* World count */}
      <WorldCount brands={brands} />

      {/* Brand listing */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <BrandsListing
          brands={brands}
          locale={locale}
          labels={{
            allCategories: ui.allCategories,
            allCountries: ui.allCountries,
            category: ui.category,
            country: ui.country,
            search: ui.search,
            newForExpo: ui.newForExpo,
            zero: ui.zero,
            one: ui.one,
            many: ui.many,
            empty: ui.empty,
          }}
        />
      </section>

      {/* CTA exhibitor */}
      <section className="bg-ink-950 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <Link
            href="/devenez-exposants"
            className="group inline-flex items-center gap-4 text-cream-50 hover:text-gold-500 text-lg md:text-xl font-bold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          >
            <span>{ui.ctaStand}</span>
            <ArrowUpRight
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2}
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
