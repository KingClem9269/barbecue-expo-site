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
    country: string;
    search: string;
    searchPlaceholder: string;
    newForExpo: string;
    seekingDistributor: string;
    seekingReseller: string;
    exports: string;
    newArrival: string;
    filters: string;
    clearFilters: string;
    advancedFilters: string;
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
      "200+ marques internationales sélectionnées. Barbecues, accessoires, combustibles, sauces, aménagement outdoor, gourmet, spiritueux, restaurateurs — toutes réunies à Paris du 10 au 12 avril 2027.",
    allCategories: "Toutes",
    allCountries: "Tous les pays",
    country: "Pays",
    search: "Rechercher",
    searchPlaceholder: "Nom de marque…",
    newForExpo: "Nouveau 2027",
    seekingDistributor: "Cherche distributeur",
    seekingReseller: "Cherche revendeur",
    exports: "Exporte",
    newArrival: "Nouveautés",
    filters: "Filtres",
    clearFilters: "Tout effacer",
    advancedFilters: "Filtres avancés",
    zero: "Aucune marque trouvée",
    one: "1 marque",
    many: "{count} marques sur 200+",
    empty: "Aucune marque ne correspond à vos filtres.",
    ctaStand: "Votre marque n'est pas là ? Devenir exposant 2027",
  },
  en: {
    eyebrow: "2027 edition",
    title: "The exhibitors",
    description:
      "200+ curated international brands. Grills, accessories, fuels, sauces, outdoor design, gourmet, spirits, restaurateurs — all gathered in Paris April 10-12, 2027.",
    allCategories: "All",
    allCountries: "All countries",
    country: "Country",
    search: "Search",
    searchPlaceholder: "Brand name…",
    newForExpo: "New 2027",
    seekingDistributor: "Seeking distributor",
    seekingReseller: "Seeking reseller",
    exports: "Exports",
    newArrival: "New",
    filters: "Filters",
    clearFilters: "Clear all",
    advancedFilters: "Advanced filters",
    zero: "No brand found",
    one: "1 brand",
    many: "{count} brands of 200+",
    empty: "No brand matches your filters.",
    ctaStand: "Your brand isn't here? Become a 2027 exhibitor",
  },
  es: {
    eyebrow: "Edición 2027",
    title: "Los expositores",
    description:
      "200+ marcas internacionales seleccionadas. Parrillas, accesorios, combustibles, salsas, diseño exterior, gourmet, licores, restauradores.",
    allCategories: "Todas",
    allCountries: "Todos los países",
    country: "País",
    search: "Buscar",
    searchPlaceholder: "Nombre de marca…",
    newForExpo: "Nuevo 2027",
    seekingDistributor: "Busca distribuidor",
    seekingReseller: "Busca revendedor",
    exports: "Exporta",
    newArrival: "Novedades",
    filters: "Filtros",
    clearFilters: "Borrar todo",
    advancedFilters: "Filtros avanzados",
    zero: "Ninguna marca encontrada",
    one: "1 marca",
    many: "{count} marcas de 200+",
    empty: "Ninguna marca coincide con los filtros.",
    ctaStand: "¿Su marca no está aquí? Sea expositor 2027",
  },
  de: {
    eyebrow: "Ausgabe 2027",
    title: "Die Aussteller",
    description:
      "200+ kuratierte internationale Marken. Grills, Zubehör, Brennstoffe, Saucen, Outdoor-Design, Feinkost, Spirituosen, Gastronomen.",
    allCategories: "Alle",
    allCountries: "Alle Länder",
    country: "Land",
    search: "Suchen",
    searchPlaceholder: "Markenname…",
    newForExpo: "Neu 2027",
    seekingDistributor: "Sucht Distributor",
    seekingReseller: "Sucht Wiederverkäufer",
    exports: "Exportiert",
    newArrival: "Neuheiten",
    filters: "Filter",
    clearFilters: "Alles zurücksetzen",
    advancedFilters: "Erweiterte Filter",
    zero: "Keine Marke gefunden",
    one: "1 Marke",
    many: "{count} Marken von 200+",
    empty: "Keine Marke entspricht den Filtern.",
    ctaStand: "Ihre Marke fehlt? Aussteller 2027 werden",
  },
  nl: {
    eyebrow: "Editie 2027",
    title: "De exposanten",
    description:
      "200+ geselecteerde internationale merken. Grills, accessoires, brandstoffen, sauzen, buitendesign, delicatessen, gedistilleerd, restauranthouders.",
    allCategories: "Alle",
    allCountries: "Alle landen",
    country: "Land",
    search: "Zoeken",
    searchPlaceholder: "Merknaam…",
    newForExpo: "Nieuw 2027",
    seekingDistributor: "Zoekt distributeur",
    seekingReseller: "Zoekt doorverkoper",
    exports: "Exporteert",
    newArrival: "Nieuw",
    filters: "Filters",
    clearFilters: "Alles wissen",
    advancedFilters: "Geavanceerde filters",
    zero: "Geen merk gevonden",
    one: "1 merk",
    many: "{count} merken van 200+",
    empty: "Geen merk voldoet aan de filters.",
    ctaStand: "Staat uw merk er niet bij? Word exposant 2027",
  },
  pt: {
    eyebrow: "Edição 2027",
    title: "Os expositores",
    description:
      "200+ marcas internacionais selecionadas. Grelhas, acessórios, combustíveis, molhos, design exterior, gourmet, destilados, restauradores.",
    allCategories: "Todas",
    allCountries: "Todos os países",
    country: "País",
    search: "Pesquisar",
    searchPlaceholder: "Nome da marca…",
    newForExpo: "Novo 2027",
    seekingDistributor: "Procura distribuidor",
    seekingReseller: "Procura revendedor",
    exports: "Exporta",
    newArrival: "Novidades",
    filters: "Filtros",
    clearFilters: "Limpar tudo",
    advancedFilters: "Filtros avançados",
    zero: "Nenhuma marca encontrada",
    one: "1 marca",
    many: "{count} marcas de 200+",
    empty: "Nenhuma marca corresponde aos filtros.",
    ctaStand: "A sua marca não está aqui? Seja expositor 2027",
  },
  it: {
    eyebrow: "Edizione 2027",
    title: "Gli espositori",
    description:
      "200+ marchi internazionali selezionati. Griglie, accessori, combustibili, salse, design outdoor, gastronomia, distillati, ristoratori.",
    allCategories: "Tutte",
    allCountries: "Tutti i paesi",
    country: "Paese",
    search: "Cercare",
    searchPlaceholder: "Nome del marchio…",
    newForExpo: "Nuovo 2027",
    seekingDistributor: "Cerca distributore",
    seekingReseller: "Cerca rivenditore",
    exports: "Esporta",
    newArrival: "Novità",
    filters: "Filtri",
    clearFilters: "Cancella tutto",
    advancedFilters: "Filtri avanzati",
    zero: "Nessun marchio trovato",
    one: "1 marchio",
    many: "{count} marchi su 200+",
    empty: "Nessun marchio corrisponde ai filtri.",
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
            country: ui.country,
            search: ui.search,
            searchPlaceholder: ui.searchPlaceholder,
            newForExpo: ui.newForExpo,
            seekingDistributor: ui.seekingDistributor,
            seekingReseller: ui.seekingReseller,
            exports: ui.exports,
            newArrival: ui.newArrival,
            filters: ui.filters,
            clearFilters: ui.clearFilters,
            advancedFilters: ui.advancedFilters,
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
