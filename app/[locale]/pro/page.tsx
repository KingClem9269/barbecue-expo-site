import ProHero from "@/components/pro/ProHero";
import ExhibitorBenefits from "@/components/pro/ExhibitorBenefits";
import AwardsTeaser from "@/components/homepage/AwardsTeaser";
import PressRoom from "@/components/pro/PressRoom";
import FinalCTA from "@/components/homepage/FinalCTA";
import { buildMetadata } from "@/lib/seo";

const DESC: Record<string, string> = {
  fr: "Le rendez-vous annuel du BBQ européen. 25 896 visiteurs, 250 marques, 25 nationalités. Devenez exposant 2027 ou rejoignez notre programme presse.",
  en: "The annual rendezvous of European BBQ. 25,896 visitors, 250 brands, 25 nationalities. Become a 2027 exhibitor or join our press program.",
  es: "La cita anual del BBQ europeo. 25.896 visitantes, 250 marcas, 25 nacionalidades. Sea expositor 2027 o únase al programa de prensa.",
  de: "Das jährliche Treffen des europäischen BBQ. 25.896 Besucher, 250 Marken, 25 Nationalitäten.",
  nl: "De jaarlijkse ontmoeting van de Europese BBQ. 25.896 bezoekers, 250 merken, 25 nationaliteiten.",
  pt: "O encontro anual do BBQ europeu. 25.896 visitantes, 250 marcas, 25 nacionalidades.",
  it: "L'appuntamento annuale del BBQ europeo. 25.896 visitatori, 250 marchi, 25 nazionalità.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/pro", {
    title: `Pro & B2B — Barbecue Expo 2026`,
    description: DESC[locale] || DESC.fr,
  });
}

export default function ProPage() {
  return (
    <div className="bg-cream-50">
      <ProHero />
      <ExhibitorBenefits />
      <AwardsTeaser blok={{}} />
      <PressRoom />
      <FinalCTA blok={{}} />
    </div>
  );
}
