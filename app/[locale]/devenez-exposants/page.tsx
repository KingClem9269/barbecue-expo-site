import { redirect } from "@/i18n/navigation";

/**
 * L'ancienne page « Devenir exposant » (packs Découverte, Affirmation…) ne
 * correspond pas à l'offre réelle : l'offre exposant vit sur
 * /presentation-exposants. On redirige les anciens liens.
 */
export default async function DevenezExposantsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/presentation-exposants", locale });
}
