import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";

type Restaurateur = {
  slug: string;
  name: string;
  country: string;
  region: string;
  cuisine: string;
  description: string;
  image: string;
  // Force le continent d'affichage (sinon déduit du pays). Utile pour les
  // cuisines de style américain portées par des restaurateurs FR.
  continent?: "americas" | "asia" | "europe";
};

const RESTAURATEURS: Restaurateur[] = [
  { slug: "selva", name: "Selva", country: "ar", region: "Argentine", cuisine: "Asado patagonien", description: "Côtes longues, sel gros, feu de bois patient. La tradition gauchista intacte.", image: "/photos-2026/bbq-expo-073.jpg" },
  { slug: "h-o-m-steakhouse", name: "H.O.M. Steakhouse", country: "us", region: "Texas", cuisine: "Brisket low & slow", description: "Smoker offset, bois de pecan, 14 heures de patience pour une seule pièce. Le Texas, vraiment.", image: "/photos-2026/bbq-expo-184.jpg" },
  { slug: "le-boukane", name: "Le Boukane", country: "fr", region: "Réunion", cuisine: "Carry péï", description: "Marinades créoles, viandes fumées au boucan. Le BBQ insulaire dans toute sa générosité.", image: "/photos-2026/bbq-expo-105.jpg", continent: "americas" },
  { slug: "nicky-s-bbq", name: "Nicky's BBQ", country: "us", region: "Caroline du Sud", cuisine: "Pulled pork & vinegar sauce", description: "Le sandwich qui a fait l'histoire du BBQ américain. Vinaigre, piment, brioche.", image: "/photos-2026/bbq-expo-403.jpg" },
  { slug: "villa-marthe", name: "Villa Marthe", country: "fr", region: "Provence", cuisine: "Méditerranée au feu de bois", description: "Côtelettes d'agneau, légumes braisés, herbes du jardin. Le Sud français à la flamme.", image: "/photos-2026/bbq-expo-688.jpg" },
  { slug: "le-cochon-voyageur", name: "Le Cochon Voyageur", country: "fr", region: "Toulouse", cuisine: "Cochon entier", description: "Bête entière, broche lente, sauce de cuisson. Une seule recette, perfectionnée.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg" },
  { slug: "atelier-du-brasero", name: "Atelier du Brasero", country: "fr", region: "Paris", cuisine: "Cuisson au brasero", description: "Cuisson sur feu vif sur OFYR. Légumes carbonisés, viande à la flamme directe. Showroom du brasero.", image: "/photos-2026/bbq-expo-073.jpg" },
  { slug: "chango", name: "Chango", country: "ar", region: "Buenos Aires", cuisine: "Empanadas & parrilla", description: "L'apéro porteño et l'asado des chefs. Une parenthèse argentine au cœur de Paris.", image: "/photos-2026/bbq-expo-403.jpg" },
  { slug: "melt", name: "Melt", country: "fr", region: "Paris", cuisine: "Smoked meats USA", description: "Brisket, ribs, sandwich pulled. La référence parisienne du BBQ américain.", image: "/photos-2026/bbq-expo-184.jpg", continent: "americas" },
  { slug: "au-feu-le-saumon", name: "Au Feu Le Saumon", country: "fr", region: "Bretagne", cuisine: "Saumon fumé minute", description: "Saumon labellisé, fumage à la flamme, marinade aux herbes bretonnes. La mer dans le feu.", image: "/photos-2026/bbq-expo-720.jpg" },
  { slug: "a-feu-lent", name: "A Feu Lent", country: "fr", region: "Lyon", cuisine: "Charcuterie fumée", description: "Saucisses fumées, pancetta maison, jambon de pays. La pâte qu'on prend.", image: "/photos-2026/bbq-expo-688.jpg" },
  { slug: "pny", name: "PNY", country: "fr", region: "Paris", cuisine: "Smashed burger", description: "Le burger de référence à Paris. Pain brioche, sauce maison, frites cuites au gras.", image: "/photos-2026/bbq-expo-105.jpg", continent: "americas" },
  { slug: "marche-noir", name: "Marché Noir", country: "fr", region: "Paris", cuisine: "Sandwich BBQ", description: "Sandwiches inspirés des Etats-Unis, viandes fumées, sauces maison.", image: "/photos-2026/bbq-expo-184.jpg", continent: "americas" },
  { slug: "soon-grill", name: "Soon Grill", country: "kr", region: "Séoul", cuisine: "Korean BBQ", description: "Bulgogi, galbi, samgyeopsal. La marinade soja-poire-sésame qui change tout.", image: "/photos-2026/bbq-expo-403.jpg" },
];

const REGIONS = [
  { slug: "all", label: "Tout voir", count: RESTAURATEURS.length },
  { slug: "americas", label: "Amériques", filter: ["us", "ar"] },
  { slug: "asia", label: "Asie", filter: ["kr", "jp"] },
  { slug: "europe", label: "Europe", filter: ["fr", "es", "it", "gb", "de"] },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/program/bbq-street-food", {
    title: "BBQ Street Food — Barbecue Expo 2027",
    description: "16 restaurateurs sélectionnés. Le BBQ du monde entier, en un seul lieu, pendant trois jours.",
  });
}

export default async function StreetFoodPage() {
  await getLocale();

  // Continent d'affichage : override explicite, sinon déduit du pays.
  const continentOf = (r: Restaurateur): "americas" | "asia" | "europe" =>
    r.continent ??
    (["us", "ar"].includes(r.country)
      ? "americas"
      : ["kr", "jp"].includes(r.country)
        ? "asia"
        : "europe");

  // Group by region
  const byRegion = {
    americas: RESTAURATEURS.filter((r) => continentOf(r) === "americas"),
    asia: RESTAURATEURS.filter((r) => continentOf(r) === "asia"),
    europe: RESTAURATEURS.filter((r) => continentOf(r) === "europe"),
  };

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="relative w-full min-h-[70dvh] overflow-hidden bg-ink-950">
        <Image
          src="/photos-2026/bbq-expo-720.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-end min-h-[70dvh]">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            BBQ Street Food · Édition 2027
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.92] tracking-tight font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            Le BBQ <span className="text-gold-500">du monde</span>, sous une seule tente.
          </h1>
          <p className="mt-10 text-cream-50/90 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
            Quatorze restaurateurs sélectionnés. Argentine, Texas, Corée, Provence, Bretagne, Caroline du Sud. Pas de chaîne, pas de food truck générique — uniquement des passionnés qui défendent leur région et leur tradition. Trois jours pour faire un tour du monde sans bouger.
          </p>
        </div>
      </section>

      {/* Regions */}
      {[
        { key: "americas", title: "Les Amériques", body: "L'asado argentin, le brisket texan, le pulled pork de Caroline. Le continent qui a élevé le BBQ au rang d'art national.", list: byRegion.americas },
        { key: "asia", title: "L'Asie", body: "Marinades complexes, cuissons rapides, côtés ciselés. Une autre philosophie du feu, qui se fait redécouvrir en Europe.", list: byRegion.asia },
        { key: "europe", title: "L'Europe", body: "Provence, Bretagne, Toulouse, Réunion, Lyon, Paris. Le BBQ français contemporain et ses voisins. Une scène qui a énormément évolué en cinq ans.", list: byRegion.europe },
      ].map((region) => (
        <section key={region.key} className="py-12 md:py-16 first:pt-0">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12">
              <h2
                className="lg:col-span-7 text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {region.title}
              </h2>
              <p className="lg:col-span-5 text-ink-600 text-base md:text-lg leading-relaxed">
                {region.body}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {region.list.map((r) => (
                <Link
                  key={r.slug}
                  href={`/program/bbq-street-food/${r.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden bg-char-800 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent opacity-90"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end text-cream-50">
                    <div className="flex items-center gap-2 mb-2 text-[11px] md:text-xs uppercase tracking-widest text-cream-50/80">
                      <Image
                        src={`/flags/${r.country}.svg`}
                        alt=""
                        width={12}
                        height={12}
                        className="w-3 h-3 rounded-full object-cover"
                      />
                      <span>{r.region}</span>
                    </div>
                    <h3
                      className="text-2xl md:text-3xl leading-tight font-bold mb-1"
                      style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                    >
                      {r.name}
                    </h3>
                    <p className="text-gold-500 text-xs md:text-sm font-semibold uppercase tracking-widest mb-2">
                      {r.cuisine}
                    </p>
                    <p className="text-cream-50/80 text-sm leading-relaxed line-clamp-2">
                      {r.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-cream-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row gap-4">
          <Link
            href="/billetterie/particulier"
            className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>Réserver ma place</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
          </Link>
          <Link
            href="/programme"
            className="group inline-flex items-center gap-4 border border-ink-900/30 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>Voir tout le programme</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
