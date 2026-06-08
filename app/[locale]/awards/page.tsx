import AwardsHero from "@/components/awards/AwardsHero";
import AwardsMechanics from "@/components/awards/AwardsMechanics";
import AwardsCategories from "@/components/awards/AwardsCategories";
import AwardsJury from "@/components/awards/AwardsJury";
import AwardsTimeline from "@/components/awards/AwardsTimeline";
import AwardsApplicationCTA from "@/components/awards/AwardsApplicationCTA";
import { buildMetadata } from "@/lib/seo";

const DESC: Record<string, string> = {
  fr: "Première édition des Barbecue Expo Awards. Or, argent, bronze. 5 catégories. Jury international. Cérémonie à Paris le 13 mars 2027.",
  en: "First edition of the Barbecue Expo Awards. Gold, silver, bronze. 5 categories. International jury. Ceremony in Paris on March 13, 2027.",
  es: "Primera edición de los Barbecue Expo Awards. Oro, plata, bronce. 5 categorías. Jurado internacional. Ceremonia en París el 13 de marzo de 2027.",
  de: "Erste Ausgabe der Barbecue Expo Awards. Gold, Silber, Bronze. 5 Kategorien. Internationale Jury. Zeremonie in Paris am 13. März 2027.",
  nl: "Eerste editie van de Barbecue Expo Awards. Goud, zilver, brons. 5 categorieën. Internationale jury. Ceremonie in Parijs op 13 maart 2027.",
  pt: "Primeira edição dos Barbecue Expo Awards. Ouro, prata, bronze. 5 categorias. Júri internacional. Cerimónia em Paris a 13 de março de 2027.",
  it: "Prima edizione dei Barbecue Expo Awards. Oro, argento, bronzo. 5 categorie. Giuria internazionale. Cerimonia a Parigi il 13 marzo 2027.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/awards", {
    title: "Barbecue Expo Awards 2027 — Première édition",
    description: DESC[locale] || DESC.fr,
  });
}

export default function AwardsPage() {
  return (
    <div className="bg-cream-50">
      <AwardsHero />
      <AwardsMechanics />
      <AwardsCategories />
      <AwardsJury />
      <AwardsTimeline />
      <AwardsApplicationCTA />
    </div>
  );
}
