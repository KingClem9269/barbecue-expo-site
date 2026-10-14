import { buildMetadata } from "@/lib/seo";
import PresentationDeck from "./PresentationDeck";

const META: Record<string, { title: string; description: string }> = {
  fr: {
    title: "Barbecue Expo 2027 — Présentation du salon",
    description:
      "L'événement barbecue européen pour les pros et les passionnés. Parc Floral de Paris, 12-14 mars 2027.",
  },
  en: {
    title: "Barbecue Expo 2027 — Show presentation",
    description:
      "The European barbecue event for professionals and enthusiasts. Parc Floral de Paris, 12-14 March 2027.",
  },
  es: {
    title: "Barbecue Expo 2027 — Presentación del salón",
    description:
      "El evento europeo de la barbacoa para profesionales y apasionados. Parc Floral de París, 12-14 de marzo de 2027.",
  },
  de: {
    title: "Barbecue Expo 2027 — Präsentation der Messe",
    description:
      "Das europäische Barbecue-Event für Profis und Leidenschaftliche. Parc Floral de Paris, 12.–14. März 2027.",
  },
  nl: {
    title: "Barbecue Expo 2027 — Presentatie van de beurs",
    description:
      "Hét Europese barbecue-evenement voor professionals en liefhebbers. Parc Floral de Paris, 12-14 maart 2027.",
  },
  pt: {
    title: "Barbecue Expo 2027 — Apresentação do salão",
    description:
      "O evento europeu de barbecue para profissionais e apaixonados. Parc Floral de Paris, 12-14 de março de 2027.",
  },
  it: {
    title: "Barbecue Expo 2027 — Presentazione del salone",
    description:
      "L'evento europeo del barbecue per professionisti e appassionati. Parc Floral di Parigi, 12-14 marzo 2027.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const meta = META[locale] || META.fr;
  return buildMetadata(locale, "/presentation", meta);
}

export default function PresentationPage() {
  return <PresentationDeck />;
}
