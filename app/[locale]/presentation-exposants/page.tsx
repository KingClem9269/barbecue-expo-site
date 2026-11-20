import { buildMetadata } from "@/lib/seo";
import exposants from "@/content/brands/exposants-2027.json";
import PageCampagnes, { type LogoExposant } from "./PageCampagnes";
import { scriptHautDePage } from "./haut-de-page";
import { META_CAMPAGNES } from "./meta";

/**
 * « Ils exposent en 2027 » : les marques inscrites dont on a le logo, dans
 * l'ordre de la liste des exposants (content/brands, `npm run exposants`).
 * Barbecue Mag est le magazine de la maison, pas un exposant à mettre en avant.
 */
const LOGOS: LogoExposant[] = (exposants as { slug: string; name: string; logo?: string }[])
  .filter((b) => b.logo && b.slug !== "barbecue-mag")
  .slice(0, 12)
  .map((b) => ({ nom: b.name, src: b.logo as string }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/presentation-exposants", META_CAMPAGNES[locale] ?? META_CAMPAGNES.fr);
}

export default function PresentationExposantsPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: scriptHautDePage("/presentation-exposants") }} />
      <PageCampagnes logos={LOGOS} />
    </>
  );
}
