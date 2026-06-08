import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";

// Message "en préparation" par locale
const MESSAGES: Record<string, string> = {
  fr: "Les masterclasses sont en cours de préparation. Reviens bientôt pour les découvrir !",
  en: "The masterclasses are being prepared. Come back soon to discover them!",
  es: "Las masterclasses están en preparación. ¡Vuelve pronto para descubrirlas!",
  de: "Die Masterclasses werden gerade vorbereitet. Schau bald wieder vorbei!",
  nl: "De masterclasses worden voorbereid. Kom binnenkort terug om ze te ontdekken!",
  pt: "As masterclasses estão em preparação. Volta em breve para descobri-las!",
  it: "Le masterclass sono in preparazione. Torna presto per scoprirle!",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/program/masterclasses", {
    title: "Masterclasses — Barbecue Expo 2027",
    description: MESSAGES[locale] || MESSAGES.fr,
  });
}

export default async function MasterclassesPage() {
  const locale = await getLocale();
  const message = MESSAGES[locale] || MESSAGES.fr;
  return (
    <div className="bg-cream-50">
      <section className="relative w-full min-h-[78dvh] flex items-center justify-center overflow-hidden bg-ink-950">
        <Image
          src="/photos-2026/bbq-expo-105.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-ink-950/70" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-6 text-center pt-32 pb-20">
          <div className="flex items-center justify-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            Masterclasses
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          </div>
          <h1
            className="text-cream-50 text-3xl md:text-4xl lg:text-5xl leading-snug font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {message}
          </h1>
        </div>
      </section>
    </div>
  );
}
