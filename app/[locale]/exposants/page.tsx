import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import ExposantsTabs from "./ExposantsTabs";
import EcosystemLinks from "@/components/ecosystem/EcosystemLinks";
import BrandsListing, { type BrandsListingProps } from "@/components/brands/BrandsListing";
import { getBrands } from "@/lib/brands";

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    tab2026: string;
    tab2027: string;
    message2027: string;
    metaDescription: string;
    ctaStand: string;
  }
> = {
  fr: {
    eyebrow: "Exposants",
    title: "Les exposants",
    tab2026: "Édition 2026",
    tab2027: "Édition 2027",
    message2027: "Bientôt disponible",
    metaDescription: "Les marques exposantes confirmées de Barbecue Expo 2027, du 12 au 14 mars au Parc Floral de Paris.",
    ctaStand: "Votre marque n'est pas là ? Devenir exposant 2027",
  },
  en: {
    eyebrow: "Exhibitors",
    title: "The exhibitors",
    tab2026: "2026 Edition",
    tab2027: "2027 Edition",
    message2027: "Coming soon",
    metaDescription: "The confirmed exhibiting brands of Barbecue Expo 2027, March 12-14 at the Parc Floral de Paris.",
    ctaStand: "Your brand isn't here? Become a 2027 exhibitor",
  },
  es: {
    eyebrow: "Expositores",
    title: "Los expositores",
    tab2026: "Edición 2026",
    tab2027: "Edición 2027",
    message2027: "Próximamente disponible",
    metaDescription: "Las marcas expositoras confirmadas de Barbecue Expo 2027, del 12 al 14 de marzo en el Parc Floral de París.",
    ctaStand: "¿Su marca no está aquí? Sea expositor 2027",
  },
  de: {
    eyebrow: "Aussteller",
    title: "Die Aussteller",
    tab2026: "Ausgabe 2026",
    tab2027: "Ausgabe 2027",
    message2027: "Bald verfügbar",
    metaDescription: "Die bestätigten Ausstellermarken der Barbecue Expo 2027, 12.–14. März im Parc Floral de Paris.",
    ctaStand: "Ihre Marke fehlt? Aussteller 2027 werden",
  },
  nl: {
    eyebrow: "Exposanten",
    title: "De exposanten",
    tab2026: "Editie 2026",
    tab2027: "Editie 2027",
    message2027: "Binnenkort beschikbaar",
    metaDescription: "De bevestigde exposerende merken van Barbecue Expo 2027, 12-14 maart in het Parc Floral de Paris.",
    ctaStand: "Staat uw merk er niet bij? Word exposant 2027",
  },
  pt: {
    eyebrow: "Expositores",
    title: "Os expositores",
    tab2026: "Edição 2026",
    tab2027: "Edição 2027",
    message2027: "Em breve disponível",
    metaDescription: "As marcas expositoras confirmadas da Barbecue Expo 2027, de 12 a 14 de março no Parc Floral de Paris.",
    ctaStand: "A sua marca não está aqui? Seja expositor 2027",
  },
  it: {
    eyebrow: "Espositori",
    title: "Gli espositori",
    tab2026: "Edizione 2026",
    tab2027: "Edizione 2027",
    message2027: "Presto disponibile",
    metaDescription: "I marchi espositori confermati di Barbecue Expo 2027, dal 12 al 14 marzo al Parc Floral de Paris.",
    ctaStand: "Il tuo marchio non c'è? Diventa espositore 2027",
  },
};

/** Labels of the 2027 brand directory (BrandsListing). */
const LIST: Record<string, BrandsListingProps["labels"]> = {
  fr: { allCategories: "Toutes", allCountries: "Tous les pays", country: "Pays", search: "Rechercher", searchPlaceholder: "Nom de marque…", newForExpo: "Nouveau 2027", seekingDistributor: "Cherche distributeur", seekingReseller: "Cherche revendeur", exports: "Exporte", newArrival: "Nouveautés", filters: "Filtres", clearFilters: "Tout effacer", advancedFilters: "Filtres avancés", zero: "Aucune marque trouvée", one: "1 marque", many: "{count} marques", empty: "Aucune marque ne correspond à votre recherche." },
  en: { allCategories: "All", allCountries: "All countries", country: "Country", search: "Search", searchPlaceholder: "Brand name…", newForExpo: "New 2027", seekingDistributor: "Seeking distributor", seekingReseller: "Seeking reseller", exports: "Exports", newArrival: "New", filters: "Filters", clearFilters: "Clear all", advancedFilters: "Advanced filters", zero: "No brand found", one: "1 brand", many: "{count} brands", empty: "No brand matches your search." },
  es: { allCategories: "Todas", allCountries: "Todos los países", country: "País", search: "Buscar", searchPlaceholder: "Nombre de marca…", newForExpo: "Nuevo 2027", seekingDistributor: "Busca distribuidor", seekingReseller: "Busca revendedor", exports: "Exporta", newArrival: "Novedades", filters: "Filtros", clearFilters: "Borrar todo", advancedFilters: "Filtros avanzados", zero: "Ninguna marca encontrada", one: "1 marca", many: "{count} marcas", empty: "Ninguna marca coincide con su búsqueda." },
  de: { allCategories: "Alle", allCountries: "Alle Länder", country: "Land", search: "Suchen", searchPlaceholder: "Markenname…", newForExpo: "Neu 2027", seekingDistributor: "Sucht Distributor", seekingReseller: "Sucht Wiederverkäufer", exports: "Exportiert", newArrival: "Neuheiten", filters: "Filter", clearFilters: "Alles zurücksetzen", advancedFilters: "Erweiterte Filter", zero: "Keine Marke gefunden", one: "1 Marke", many: "{count} Marken", empty: "Keine Marke entspricht Ihrer Suche." },
  nl: { allCategories: "Alle", allCountries: "Alle landen", country: "Land", search: "Zoeken", searchPlaceholder: "Merknaam…", newForExpo: "Nieuw 2027", seekingDistributor: "Zoekt distributeur", seekingReseller: "Zoekt doorverkoper", exports: "Exporteert", newArrival: "Nieuw", filters: "Filters", clearFilters: "Alles wissen", advancedFilters: "Geavanceerde filters", zero: "Geen merk gevonden", one: "1 merk", many: "{count} merken", empty: "Geen merk voldoet aan uw zoekopdracht." },
  pt: { allCategories: "Todas", allCountries: "Todos os países", country: "País", search: "Pesquisar", searchPlaceholder: "Nome da marca…", newForExpo: "Novo 2027", seekingDistributor: "Procura distribuidor", seekingReseller: "Procura revendedor", exports: "Exporta", newArrival: "Novidades", filters: "Filtros", clearFilters: "Limpar tudo", advancedFilters: "Filtros avançados", zero: "Nenhuma marca encontrada", one: "1 marca", many: "{count} marcas", empty: "Nenhuma marca corresponde à sua pesquisa." },
  it: { allCategories: "Tutte", allCountries: "Tutti i paesi", country: "Paese", search: "Cercare", searchPlaceholder: "Nome del marchio…", newForExpo: "Nuovo 2027", seekingDistributor: "Cerca distributore", seekingReseller: "Cerca rivenditore", exports: "Esporta", newArrival: "Novità", filters: "Filtri", clearFilters: "Cancella tutto", advancedFilters: "Filtri avanzati", zero: "Nessun marchio trovato", one: "1 marchio", many: "{count} marchi", empty: "Nessun marchio corrisponde alla ricerca." },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.fr;
  return buildMetadata(locale, "/exposants", {
    title: `${ui.title} — Barbecue Expo 2027`,
    description: ui.metaDescription,
  });
}

export default async function ExposantsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.fr;
  const brands = await getBrands(locale);

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Compact hero */}
      <section className="relative bg-ink-950 pt-28 md:pt-32 pb-10 md:pb-14 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-4">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl leading-[0.95] font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.title}
          </h1>
        </div>
      </section>

      {/* Tabs + content */}
      <ExposantsTabs
        tab2026={ui.tab2026}
        tab2027={ui.tab2027}
        message2027={ui.message2027}
        list2027={
          brands.length > 0 ? (
            <BrandsListing brands={brands} locale={locale} labels={LIST[locale] || LIST.fr} />
          ) : undefined
        }
      />

      {/* Maillage : ces marques dans l'écosystème (tests Mag, partenaires Fest) */}
      <section className="bg-cream-50 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <EcosystemLinks locale={locale} items={["mag", "fest"]} />
        </div>
      </section>

      {/* CTA exhibitor */}
      <section className="bg-ink-950 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <Link
            href="/presentation-exposants"
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
