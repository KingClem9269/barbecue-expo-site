import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";
import PourquoiExposerContent from "./PourquoiExposerContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/pourquoi-exposer", {
    title: "Pourquoi exposer — Barbecue Expo 2027",
    description:
      "Le salon de référence en Europe pour développer vos ventes, votre réseau et votre notoriété.",
  });
}

export default async function PourquoiExposerPage() {
  const locale = await getLocale();
  return <PourquoiExposerContent locale={locale} />;
}
