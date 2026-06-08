import GrillArenaHero from "@/components/grill-arena/GrillArenaHero";
import BattleFormat from "@/components/grill-arena/BattleFormat";
import CookingShowProgram from "@/components/grill-arena/CookingShowProgram";
import PitmastersGrid from "@/components/homepage/PitmastersGrid";
import FinalCTA from "@/components/homepage/FinalCTA";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";

const DESC: Record<string, string> = {
  fr: "Grill Arena — le seul format battle live du BBQ. 16 pitmasters, 4 manches, 1 champion. Parc Floral de Paris, 12-14 mars 2027.",
  en: "Grill Arena — the only live BBQ battle format. 16 pitmasters, 4 rounds, 1 champion. Parc Floral de Paris, March 12-14, 2027.",
  es: "Grill Arena — el único formato battle BBQ en directo. 16 pitmasters, 4 rondas, 1 campeón.",
  de: "Grill Arena — das einzige Live-BBQ-Battle-Format. 16 Pitmaster, 4 Runden, 1 Champion.",
  nl: "Grill Arena — het enige live BBQ-battle-formaat. 16 pitmasters, 4 rondes, 1 kampioen.",
  pt: "Grill Arena — o único formato battle BBQ ao vivo. 16 pitmasters, 4 rondas, 1 campeão.",
  it: "Grill Arena — l'unico formato battle BBQ dal vivo. 16 pitmaster, 4 round, 1 campione.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/grill-arena", {
    title: "Grill Arena 2027 — Barbecue Expo",
    description: DESC[locale] || DESC.fr,
  });
}

export default async function GrillArenaPage() {
  const locale = await getLocale();

  return (
    <div className="bg-cream-50">
      <GrillArenaHero />
      <BattleFormat />
      <CookingShowProgram locale={locale} />
      <PitmastersGrid blok={{}} />
      <FinalCTA blok={{}} />
    </div>
  );
}
