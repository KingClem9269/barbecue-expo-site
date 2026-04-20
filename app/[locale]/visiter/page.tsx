import VisitorHero from "@/components/visitor/VisitorHero";
import ExperienceZones from "@/components/visitor/ExperienceZones";
import GrillArenaTeaser from "@/components/homepage/GrillArenaTeaser";
import PitmastersGrid from "@/components/homepage/PitmastersGrid";
import FinalCTA from "@/components/homepage/FinalCTA";
import { buildMetadata } from "@/lib/seo";

const DESC: Record<string, string> = {
  fr: "Le salon des connaisseurs BBQ. 20 pitmasters, 12 masterclasses, 250 marques. Trois jours au cœur de l'Europe pour tester, apprendre, déguster.",
  en: "The show for BBQ tastemakers. 20 pitmasters, 12 masterclasses, 250 brands. Three days in the heart of Europe to test, learn, and taste.",
  es: "La feria de los conocedores BBQ. 20 pitmasters, 12 masterclasses, 250 marcas. Tres días en el corazón de Europa.",
  de: "Die Messe für BBQ-Kenner. 20 Pitmaster, 12 Masterclasses, 250 Marken. Drei Tage im Herzen Europas.",
  nl: "De beurs voor BBQ-kenners. 20 pitmasters, 12 masterclasses, 250 merken. Drie dagen in het hart van Europa.",
  pt: "A feira dos conhecedores BBQ. 20 pitmasters, 12 masterclasses, 250 marcas. Três dias no coração da Europa.",
  it: "La fiera dei conoscitori BBQ. 20 pitmaster, 12 masterclass, 250 marchi. Tre giorni nel cuore dell'Europa.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/visiter", {
    title: `Visiter Barbecue Expo 2026 — Le salon des connaisseurs BBQ`,
    description: DESC[locale] || DESC.fr,
  });
}

export default function VisiterPage() {
  return (
    <div className="bg-cream-50">
      <VisitorHero />
      <ExperienceZones />
      <GrillArenaTeaser blok={{}} />
      <PitmastersGrid blok={{}} />
      <FinalCTA blok={{}} />
    </div>
  );
}
