import TicketPricing from "@/components/billetterie/TicketPricing";
import FinalCTA from "@/components/homepage/FinalCTA";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";

const UI: Record<
  string,
  { eyebrow: string; title: string; description: string }
> = {
  fr: {
    eyebrow: "Édition 2027",
    title: "Billetterie",
    description:
      "Cinq types de pass pour cinq profils de visiteurs. Early bird jusqu'au 31 décembre 2026 — jusqu'à 30 % d'économie.",
  },
  en: {
    eyebrow: "2027 edition",
    title: "Tickets",
    description:
      "Five pass types for five visitor profiles. Early bird until December 31, 2026 — save up to 30%.",
  },
  es: {
    eyebrow: "Edición 2027",
    title: "Entradas",
    description:
      "Cinco tipos de pase para cinco perfiles. Early bird hasta el 31 de diciembre de 2026 — ahorre hasta 30%.",
  },
  de: {
    eyebrow: "Ausgabe 2027",
    title: "Tickets",
    description:
      "Fünf Pass-Typen für fünf Profile. Early Bird bis 31. Dezember 2026 — bis zu 30% sparen.",
  },
  nl: {
    eyebrow: "Editie 2027",
    title: "Tickets",
    description:
      "Vijf passoorten voor vijf profielen. Early bird tot 31 december 2026 — tot 30% besparen.",
  },
  pt: {
    eyebrow: "Edição 2027",
    title: "Bilhetes",
    description:
      "Cinco tipos de passe para cinco perfis. Early bird até 31 de dezembro de 2026 — poupe até 30%.",
  },
  it: {
    eyebrow: "Edizione 2027",
    title: "Biglietti",
    description:
      "Cinque tipi di pass per cinque profili. Early bird fino al 31 dicembre 2026 — risparmia fino al 30%.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.fr;
  return buildMetadata(locale, "/billetterie", {
    title: `${ui.title} — Barbecue Expo 2026`,
    description: ui.description,
  });
}

export default async function BilletteriePage() {
  const locale = await getLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <div className="bg-cream-50">
      <section className="relative bg-ink-950 pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-gold-500/15 via-transparent to-transparent blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-6">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.title}
          </h1>
          <p className="mt-8 text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed">
            {ui.description}
          </p>
        </div>
      </section>

      <TicketPricing />
      <FinalCTA blok={{}} />
    </div>
  );
}
