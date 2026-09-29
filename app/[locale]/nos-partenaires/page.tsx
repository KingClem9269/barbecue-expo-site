import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { PARTNERS, pText } from "@/lib/partners";

const UI: Record<string, { eyebrow: string; title: string; intro: string }> = {
  fr: {
    eyebrow: "Nos partenaires",
    title: "Ils font Barbecue Expo",
    intro:
      "Marques, médias et maisons d'exception qui partagent notre passion du feu. Ensemble, ils donnent au salon 2027 toute sa dimension.",
  },
  en: {
    eyebrow: "Our partners",
    title: "They make Barbecue Expo",
    intro:
      "Brands, media and exceptional houses that share our passion for fire. Together, they give the 2027 show its full scale.",
  },
};
const ALIASES: Record<string, "fr" | "en"> = { es: "fr", de: "fr", nl: "fr", pt: "fr", it: "fr" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const ui = UI[locale] || UI[ALIASES[locale] || "fr"];
  return buildMetadata(locale, "/nos-partenaires", {
    title: `${ui.eyebrow} — Barbecue Expo 2027`,
    description: ui.intro,
  });
}

export default async function PartnersPage() {
  const locale = await getLocale();
  const ui = UI[locale] || UI[ALIASES[locale] || "fr"];

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero */}
      <section className="relative bg-ink-950 pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-gold-500/15 via-transparent to-transparent blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-5">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl leading-[0.95] font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.title}
          </h1>
          <p className="mt-7 text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed">{ui.intro}</p>
        </div>
      </section>

      {/* Grille — tous au même niveau */}
      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {PARTNERS.map((p) => (
              <Link
                key={p.slug}
                href={`/nos-partenaires/${p.slug}`}
                className="group flex flex-col rounded-lg border border-ink-200 bg-white overflow-hidden transition-all hover:border-gold-500 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                <div className="flex items-center justify-center h-32 md:h-40 px-6 bg-white">
                  <div className="relative w-full h-16 md:h-20">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 40vw, 240px"
                      className="object-contain object-center transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className="border-t border-ink-100 px-5 py-4 text-center">
                  <p
                    className="text-ink-900 font-bold text-base md:text-lg leading-tight"
                    style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                  >
                    {p.name}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-gold-600 font-semibold">
                    {pText(p.category, locale)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
