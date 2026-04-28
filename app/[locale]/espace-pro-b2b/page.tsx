import MatchmakingHero from "@/components/pro/MatchmakingHero";
import RetailerWall from "@/components/pro/RetailerWall";
import MatchmakingHowItWorks from "@/components/pro/MatchmakingHowItWorks";
import FinalCTA from "@/components/homepage/FinalCTA";
import { buildMetadata } from "@/lib/seo";

const DESC: Record<string, string> = {
  fr: "Plateforme matchmaking Barbecue Expo 2027. Distributeurs, enseignes, e-commerçants — réservez vos rendez-vous d'affaires avant le salon.",
  en: "Barbecue Expo 2027 matchmaking platform. Distributors, retail chains, e-commerce — book your B2B meetings before the show.",
  es: "Plataforma matchmaking Barbecue Expo 2027. Distribuidores, cadenas, e-commerce — reserve sus citas B2B antes del salón.",
  de: "Barbecue Expo 2027 Matchmaking-Plattform. Distributoren, Handelsketten, E-Commerce — buchen Sie Ihre B2B-Termine vor der Messe.",
  nl: "Barbecue Expo 2027 matchmaking-platform. Distributeurs, ketens, e-commerce — reserveer uw B2B-afspraken vóór de beurs.",
  pt: "Plataforma matchmaking Barbecue Expo 2027. Distribuidores, cadeias, e-commerce — reserve as suas reuniões B2B antes da feira.",
  it: "Piattaforma matchmaking Barbecue Expo 2027. Distributori, catene, e-commerce — prenota i tuoi incontri B2B prima della fiera.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/espace-pro-b2b", {
    title: "Espace Pro & B2B — Barbecue Expo 2027",
    description: DESC[locale] || DESC.fr,
  });
}

export default function EspaceProB2BPage() {
  return (
    <div className="bg-cream-50">
      <MatchmakingHero />
      <RetailerWall />
      <MatchmakingHowItWorks />
      <FinalCTA blok={{}} />
    </div>
  );
}
