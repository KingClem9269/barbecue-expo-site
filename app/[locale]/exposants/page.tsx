import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import ExposantsTabs from "./ExposantsTabs";

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    tab2026: string;
    tab2027: string;
    message2027: string;
    ctaStand: string;
  }
> = {
  fr: {
    eyebrow: "Exposants",
    title: "Les exposants",
    tab2026: "Édition 2026",
    tab2027: "Édition 2027",
    message2027: "Bientôt disponible",
    ctaStand: "Votre marque n'est pas là ? Devenir exposant 2027",
  },
  en: {
    eyebrow: "Exhibitors",
    title: "The exhibitors",
    tab2026: "2026 Edition",
    tab2027: "2027 Edition",
    message2027: "Coming soon",
    ctaStand: "Your brand isn't here? Become a 2027 exhibitor",
  },
  es: {
    eyebrow: "Expositores",
    title: "Los expositores",
    tab2026: "Edición 2026",
    tab2027: "Edición 2027",
    message2027: "Próximamente disponible",
    ctaStand: "¿Su marca no está aquí? Sea expositor 2027",
  },
  de: {
    eyebrow: "Aussteller",
    title: "Die Aussteller",
    tab2026: "Ausgabe 2026",
    tab2027: "Ausgabe 2027",
    message2027: "Bald verfügbar",
    ctaStand: "Ihre Marke fehlt? Aussteller 2027 werden",
  },
  nl: {
    eyebrow: "Exposanten",
    title: "De exposanten",
    tab2026: "Editie 2026",
    tab2027: "Editie 2027",
    message2027: "Binnenkort beschikbaar",
    ctaStand: "Staat uw merk er niet bij? Word exposant 2027",
  },
  pt: {
    eyebrow: "Expositores",
    title: "Os expositores",
    tab2026: "Edição 2026",
    tab2027: "Edição 2027",
    message2027: "Em breve disponível",
    ctaStand: "A sua marca não está aqui? Seja expositor 2027",
  },
  it: {
    eyebrow: "Espositori",
    title: "Gli espositori",
    tab2026: "Edizione 2026",
    tab2027: "Edizione 2027",
    message2027: "Presto disponibile",
    ctaStand: "Il tuo marchio non c'è? Diventa espositore 2027",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.fr;
  return buildMetadata(locale, "/exposants", {
    title: `${ui.title} — Barbecue Expo 2027`,
    description: ui.message2027,
  });
}

export default async function ExposantsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.fr;

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Compact hero */}
      <section className="relative bg-ink-950 pt-28 md:pt-32 pb-10 md:pb-14 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-4">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.title}
          </h1>
        </div>
      </section>

      {/* Tabs + content */}
      <ExposantsTabs
        tab2026={ui.tab2026}
        tab2027={ui.tab2027}
        message2027={ui.message2027}
      />

      {/* CTA exhibitor */}
      <section className="bg-ink-950 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <Link
            href="/devenez-exposants"
            className="group inline-flex items-center gap-4 text-cream-50 hover:text-gold-500 text-lg md:text-xl font-bold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          >
            <span>{ui.ctaStand}</span>
            <ArrowUpRight
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2}
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
