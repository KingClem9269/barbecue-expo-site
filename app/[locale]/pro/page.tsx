import ProHero from "@/components/pro/ProHero";
import ExhibitorBenefits from "@/components/pro/ExhibitorBenefits";
import AwardsTeaser from "@/components/homepage/AwardsTeaser";
import PressRoom from "@/components/pro/PressRoom";
import FinalCTA from "@/components/homepage/FinalCTA";
import { buildMetadata } from "@/lib/seo";
import { CHIFFRES, nombre } from "@/lib/chiffres";

const DESC: Record<string, string> = {
  fr: `Le rendez-vous annuel du BBQ européen. ${nombre(CHIFFRES.visiteurs2026, "fr")} visiteurs en 2026 ; ${CHIFFRES.marques2027} marques internationales et ${CHIFFRES.pays2027} pays représentés en 2027. Devenez exposant 2027 ou rejoignez notre programme presse.`,
  en: `The annual rendezvous of European BBQ. ${nombre(CHIFFRES.visiteurs2026, "en")} visitors in 2026; ${CHIFFRES.marques2027} international brands and ${CHIFFRES.pays2027} countries represented in 2027. Become a 2027 exhibitor or join our press program.`,
  es: `La cita anual del BBQ europeo. ${nombre(CHIFFRES.visiteurs2026, "es")} visitantes en 2026; ${CHIFFRES.marques2027} marcas internacionales y ${CHIFFRES.pays2027} países representados en 2027. Sea expositor 2027 o únase al programa de prensa.`,
  de: `Das jährliche Treffen des europäischen BBQ. ${nombre(CHIFFRES.visiteurs2026, "de")} Besucher 2026; ${CHIFFRES.marques2027} internationale Marken und ${CHIFFRES.pays2027} vertretene Länder 2027.`,
  nl: `De jaarlijkse ontmoeting van de Europese BBQ. ${nombre(CHIFFRES.visiteurs2026, "nl")} bezoekers in 2026; ${CHIFFRES.marques2027} internationale merken en ${CHIFFRES.pays2027} vertegenwoordigde landen in 2027.`,
  pt: `O encontro anual do BBQ europeu. ${nombre(CHIFFRES.visiteurs2026, "pt")} visitantes em 2026; ${CHIFFRES.marques2027} marcas internacionais e ${CHIFFRES.pays2027} países representados em 2027.`,
  it: `L'appuntamento annuale del BBQ europeo. ${nombre(CHIFFRES.visiteurs2026, "it")} visitatori nel 2026; ${CHIFFRES.marques2027} marchi internazionali e ${CHIFFRES.pays2027} paesi rappresentati nel 2027.`,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/pro", {
    title: `Pro & B2B — Barbecue Expo 2027`,
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
