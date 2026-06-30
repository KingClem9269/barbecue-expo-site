import GrillArenaHero from "@/components/grill-arena/GrillArenaHero";
import BattleFormat from "@/components/grill-arena/BattleFormat";
import CookingShowProgram from "@/components/grill-arena/CookingShowProgram";
import PitmastersGrid from "@/components/homepage/PitmastersGrid";
import FinalCTA from "@/components/homepage/FinalCTA";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";
import EcosystemLinks from "@/components/ecosystem/EcosystemLinks";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

const SPONSOR: Record<string, { eyebrow: string; title: string; text: string; cta: string }> = {
  fr: {
    eyebrow: "Sponsor officiel",
    title: "Zip Feux, sponsor de la Grill Arena",
    text: "Partenaire officiel de Barbecue Expo 2027 — depuis 80 ans dans le feu de l'action.",
    cta: "Lire l'article",
  },
  en: {
    eyebrow: "Official sponsor",
    title: "Zip Feux, Grill Arena sponsor",
    text: "Official partner of Barbecue Expo 2027 — 80 years in the heat of the action.",
    cta: "Read the article",
  },
};

const DESC: Record<string, string> = {
  fr: "Grill Arena — le seul format battle live du BBQ. 16 pitmasters, 4 manches, 1 champion. Parc Floral de Paris, 12-14 mars 2027.",
  en: "Grill Arena — the only live BBQ battle format. 16 pitmasters, 4 rounds, 1 champion. Parc Floral de Paris, March 12-14, 2027.",
  es: "Grill Arena — el único formato battle BBQ en directo. 16 pitmasters, 4 rondas, 1 campeón.",
  de: "Grill Arena — das einzige Live-BBQ-Battle-Format. 16 Pitmaster, 4 Runden, 1 Champion.",
  nl: "Grill Arena — het enige live BBQ-battle-formaat. 16 pitmasters, 4 rondes, 1 kampioen.",
  pt: "Grill Arena — o único formato battle BBQ ao vivo. 16 pitmasters, 4 rondas, 1 campeão.",
  it: "Grill Arena — l'unico formato battle BBQ dal vivo. 16 pitmaster, 4 round, 1 campione.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/grill-arena", {
    title: "Grill Arena 2027 — Barbecue Expo",
    description: DESC[locale] || DESC.fr,
  });
}

export default async function GrillArenaPage() {
  const locale = await getLocale();
  const sp = SPONSOR[locale] || SPONSOR.fr;

  return (
    <div className="bg-cream-50">
      <GrillArenaHero />
      <BattleFormat />

      {/* Encart sponsor officiel — Zip Feux */}
      <section className="bg-cream-50 pt-2 pb-10 md:pb-14">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <Link
            href="/actualites/zip-feux-partenaire-officiel-2027"
            className="group flex flex-col sm:flex-row sm:items-center gap-5 rounded-lg border border-ink-200 bg-white p-5 md:p-6 hover:border-gold-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <div className="relative w-24 h-24 shrink-0 rounded-md bg-white ring-1 ring-ink-100 overflow-hidden">
              <Image src="/partners/zip-feux/logo.png" alt="Zip Feux" fill sizes="96px" className="object-contain p-2" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gold-600">{sp.eyebrow}</p>
              <p className="text-ink-900 text-lg md:text-xl font-bold mt-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
                {sp.title}
              </p>
              <p className="text-ink-600 text-sm mt-1">{sp.text}</p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-2 text-ink-900 group-hover:text-gold-700 text-sm font-bold uppercase tracking-widest transition-colors">
              {sp.cta}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>
      <CookingShowProgram locale={locale} />
      <PitmastersGrid blok={{}} />
      <section className="bg-cream-50 pb-12 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <EcosystemLinks locale={locale} items={["coupe", "mag"]} />
        </div>
      </section>
      <FinalCTA blok={{}} />
    </div>
  );
}
