import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";
import PourquoiExposerContent from "./PourquoiExposerContent";

const META: Record<string, { title: string; description: string }> = {
  fr: { title: "Pourquoi exposer — Barbecue Expo 2027", description: "Le salon de référence en Europe pour développer vos ventes, votre réseau et votre notoriété." },
  en: { title: "Why exhibit — Barbecue Expo 2027", description: "Europe's leading show to grow your sales, your network and your brand awareness." },
  es: { title: "Por qué exponer — Barbecue Expo 2027", description: "La feria de referencia en Europa para impulsar sus ventas, su red y su notoriedad." },
  de: { title: "Warum ausstellen — Barbecue Expo 2027", description: "Die führende Messe Europas, um Ihren Umsatz, Ihr Netzwerk und Ihre Bekanntheit zu steigern." },
  nl: { title: "Waarom exposeren — Barbecue Expo 2027", description: "Dé referentiebeurs in Europa om uw verkoop, uw netwerk en uw naamsbekendheid te laten groeien." },
  pt: { title: "Porquê expor — Barbecue Expo 2027", description: "A feira de referência na Europa para aumentar as suas vendas, a sua rede e a sua notoriedade." },
  it: { title: "Perché esporre — Barbecue Expo 2027", description: "La fiera di riferimento in Europa per sviluppare vendite, rete di contatti e notorietà." },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const meta = META[locale] || META.fr;
  return buildMetadata(locale, "/pourquoi-exposer", meta);
}

export default async function PourquoiExposerPage() {
  const locale = await getLocale();
  return <PourquoiExposerContent locale={locale} />;
}
