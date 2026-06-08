import { buildMetadata } from "@/lib/seo";
import PresentationDeck from "./PresentationDeck";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/presentation", {
    title: "Barbecue Expo 2027 — Présentation du salon",
    description:
      "L'événement barbecue européen pour les pros et les passionnés. Parc Floral de Paris, 12-14 mars 2027.",
  });
}

export default function PresentationPage() {
  return <PresentationDeck />;
}
