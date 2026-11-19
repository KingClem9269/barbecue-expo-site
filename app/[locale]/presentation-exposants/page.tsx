import { buildMetadata } from "@/lib/seo";
import CatalogueClient from "./CatalogueClient";

const META: Record<string, { title: string; description: string }> = {
  fr: {
    title: "Exposer — Présentation & catalogue exposant | Barbecue Expo 2027",
    description:
      "Présentation du salon Barbecue Expo et catalogue complet des options exposants : stands, communication, sponsoring. 12-14 mars 2027.",
  },
  en: {
    title: "Exhibit — Show overview & exhibitor catalogue | Barbecue Expo 2027",
    description:
      "Barbecue Expo show overview and full catalogue of exhibitor options: booths, communication, sponsorship. 12-14 March 2027.",
  },
  es: {
    title: "Exponer — Presentación y catálogo del expositor | Barbecue Expo 2027",
    description:
      "Presentación del salón Barbecue Expo y catálogo completo de opciones para expositores: stands, comunicación, patrocinio. 12-14 de marzo de 2027.",
  },
  de: {
    title: "Ausstellen — Messepräsentation & Ausstellerkatalog | Barbecue Expo 2027",
    description:
      "Präsentation der Barbecue Expo und vollständiger Katalog der Ausstelleroptionen: Stände, Kommunikation, Sponsoring. 12.-14. März 2027.",
  },
  nl: {
    title: "Exposeren — Beurspresentatie & exposantencatalogus | Barbecue Expo 2027",
    description:
      "Presentatie van de Barbecue Expo en volledige catalogus van opties voor exposanten: stands, communicatie, sponsoring. 12-14 maart 2027.",
  },
  pt: {
    title: "Expor — Apresentação e catálogo do expositor | Barbecue Expo 2027",
    description:
      "Apresentação do salão Barbecue Expo e catálogo completo de opções para expositores: stands, comunicação, patrocínio. 12-14 de março de 2027.",
  },
  it: {
    title: "Esporre — Presentazione e catalogo espositori | Barbecue Expo 2027",
    description:
      "Presentazione del salone Barbecue Expo e catalogo completo delle opzioni per gli espositori: stand, comunicazione, sponsorizzazione. 12-14 marzo 2027.",
  },
};

/**
 * Ouverture en haut de page à chaque arrivée (publicités Meta notamment) : le
 * navigateur ne restaure plus la position d'une visite précédente. Script dans
 * le HTML pour agir avant la restauration. Une ancre (#stand…) reste respectée,
 * et rien ne bouge une fois que le visiteur a commencé à faire défiler.
 */
const SCRIPT_HAUT_DE_PAGE = `(function(){try{
if('scrollRestoration' in history)history.scrollRestoration='manual';
var bouge=false;
function haut(){if(!bouge&&!location.hash&&location.pathname.indexOf('/presentation-exposants')>-1)window.scrollTo(0,0);}
['touchstart','wheel','keydown','mousedown'].forEach(function(e){addEventListener(e,function(){bouge=true;},{passive:true,once:true});});
haut();addEventListener('load',haut);
addEventListener('pageshow',function(e){if(e.persisted){bouge=false;haut();}});
}catch(e){}})();`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/presentation-exposants", META[locale] ?? META.fr);
}

export default function PresentationExposantsPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_HAUT_DE_PAGE }} />
      <CatalogueClient />
    </>
  );
}
