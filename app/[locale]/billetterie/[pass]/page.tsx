import { notFound } from "next/navigation";
import { StoryRenderer } from "@/lib/StoryRenderer";
import { getPageContent } from "@/lib/content";
import PageBilletterie from "@/components/billetterie/pass/PageBilletterie";
import { contenu } from "@/components/billetterie/pass/contenu";
import { routing } from "@/i18n/routing";
import { ORDRE_PASS, type IdPass } from "@/lib/billets";
import { buildMetadata } from "@/lib/seo";
import { SALON, libelleBilletterie } from "@/lib/salon";

/**
 * Lien direct vers un pass (/billetterie/individuel, /groupes, /food) : la
 * même page que /billetterie, ce pass déjà choisi. Utile pour les campagnes
 * (le lien Groupes envoyé aux CSE, par exemple).
 */

export const revalidate = 3600;

function estPass(valeur: string): valeur is IdPass {
  return (ORDRE_PASS as readonly string[]).includes(valeur);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => ORDRE_PASS.map((pass) => ({ locale, pass })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; pass: string }> }) {
  const { locale, pass } = await params;
  if (!estPass(pass)) return {};
  const p = contenu(locale).pass[pass];
  return buildMetadata(locale, `/billetterie/${pass}`, {
    title: `${p.nom} — ${libelleBilletterie(locale)} Barbecue Expo ${SALON.annee}`,
    description: `${p.accroche} ${p.pourQui}`,
  });
}

export default async function PagePass({ params }: { params: Promise<{ locale: string; pass: string }> }) {
  const { locale, pass } = await params;
  if (!estPass(pass)) {
    // Autres pages CMS sous /billetterie (presse, pro-b2b…) : cette route
    // dynamique les masquerait, on les rend comme le catch-all.
    const story = await getPageContent(`billetterie/${pass}`, locale);
    if (!story?.content) notFound();
    return <StoryRenderer story={story} />;
  }
  return <PageBilletterie locale={locale} initial={pass} />;
}
