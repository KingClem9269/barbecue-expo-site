import { buildMetadata } from "@/lib/seo";
import CatalogueClient from "./CatalogueClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/presentation-exposants", {
    title: "Exposer — Présentation & catalogue exposant | Barbecue Expo 2027",
    description:
      "Présentation du salon Barbecue Expo et catalogue complet des options exposants : stands, communication, sponsoring. 12-14 mars 2027.",
  });
}

export default function PresentationExposantsPage() {
  return <CatalogueClient />;
}
