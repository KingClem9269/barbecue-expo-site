import { buildMetadata } from "@/lib/seo";
import CatalogueClient from "../presentation-exposants/CatalogueClient";
import { scriptHautDePage } from "../presentation-exposants/haut-de-page";
import { META_EXPOSANTS } from "../presentation-exposants/meta";

/**
 * Copie de /presentation-exposants pour les commerciaux : la présentation du
 * salon et le catalogue exposant complets, à montrer en rendez-vous ou à
 * envoyer à un prospect. Sans demande d'e-mail et sans événement de mesure
 * (voir ../presentation-exposants/variante.tsx). Hors moteurs de recherche et
 * hors plan du site : seule /presentation-exposants est référencée.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/pres-exposants", {
    ...(META_EXPOSANTS[locale] ?? META_EXPOSANTS.fr),
    robots: { index: false, follow: false },
  });
}

export default function PresExposantsPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: scriptHautDePage("/pres-exposants") }} />
      <CatalogueClient />
    </>
  );
}
