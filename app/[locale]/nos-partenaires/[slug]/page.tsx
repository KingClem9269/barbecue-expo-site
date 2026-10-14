import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { PARTNERS, getPartner, pText } from "@/lib/partners";
import EcosystemLinks from "@/components/ecosystem/EcosystemLinks";

const T: Record<string, { back: string; official: string; ctaTitle: string; ctaText: string; ctaExpo: string; more: string; partnerOf: string }> = {
  fr: {
    back: "Tous les partenaires",
    official: "Site officiel",
    ctaTitle: "Retrouvez-les à Barbecue Expo 2027",
    ctaText: "Les 12, 13 et 14 mars 2027 au Parc Floral de Paris.",
    ctaExpo: "Préparer ma visite",
    more: "Pour aller plus loin",
    partnerOf: "Partenaire Barbecue Expo 2027",
  },
  en: {
    back: "All partners",
    official: "Official website",
    ctaTitle: "Meet them at Barbecue Expo 2027",
    ctaText: "On 12, 13 and 14 March 2027 at Parc Floral de Paris.",
    ctaExpo: "Plan my visit",
    more: "Read more",
    partnerOf: "Barbecue Expo 2027 partner",
  },
  es: {
    back: "Todos los socios",
    official: "Sitio oficial",
    ctaTitle: "Encuéntrelos en Barbecue Expo 2027",
    ctaText: "Los días 12, 13 y 14 de marzo de 2027 en el Parc Floral de París.",
    ctaExpo: "Preparar mi visita",
    more: "Para saber más",
    partnerOf: "Socio de Barbecue Expo 2027",
  },
  de: {
    back: "Alle Partner",
    official: "Offizielle Website",
    ctaTitle: "Treffen Sie sie auf der Barbecue Expo 2027",
    ctaText: "Am 12., 13. und 14. März 2027 im Parc Floral de Paris.",
    ctaExpo: "Meinen Besuch planen",
    more: "Mehr erfahren",
    partnerOf: "Partner der Barbecue Expo 2027",
  },
  nl: {
    back: "Alle partners",
    official: "Officiële website",
    ctaTitle: "Ontmoet ze op Barbecue Expo 2027",
    ctaText: "Op 12, 13 en 14 maart 2027 in het Parc Floral de Paris.",
    ctaExpo: "Mijn bezoek voorbereiden",
    more: "Meer lezen",
    partnerOf: "Partner van Barbecue Expo 2027",
  },
  pt: {
    back: "Todos os parceiros",
    official: "Site oficial",
    ctaTitle: "Encontre-os na Barbecue Expo 2027",
    ctaText: "Nos dias 12, 13 e 14 de março de 2027 no Parc Floral de Paris.",
    ctaExpo: "Preparar a minha visita",
    more: "Para saber mais",
    partnerOf: "Parceiro da Barbecue Expo 2027",
  },
  it: {
    back: "Tutti i partner",
    official: "Sito ufficiale",
    ctaTitle: "Incontrateli a Barbecue Expo 2027",
    ctaText: "Il 12, 13 e 14 marzo 2027 al Parc Floral de Paris.",
    ctaExpo: "Preparare la mia visita",
    more: "Per saperne di più",
    partnerOf: "Partner di Barbecue Expo 2027",
  },
};

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) for (const p of PARTNERS) params.push({ locale, slug: p.slug });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const p = getPartner(slug);
  if (!p) return {};
  return buildMetadata(locale, `/nos-partenaires/${slug}`, {
    title: `${p.name} — ${(T[locale] || T.fr).partnerOf}`,
    description: pText(p.tagline, locale),
  });
}

export default async function PartnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPartner(slug);
  if (!p) notFound();
  const locale = await getLocale();
  const t = T[locale] || T.fr;

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-16 md:pb-24">
        <Link
          href="/nos-partenaires"
          className="inline-flex items-center gap-2 text-ink-500 hover:text-gold-700 text-sm font-semibold uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          {t.back}
        </Link>

        {/* En-tête partenaire */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="relative w-40 h-24 shrink-0 rounded-lg bg-white ring-1 ring-ink-100 overflow-hidden">
            <Image src={p.logo} alt={p.name} fill sizes="160px" className="object-contain p-3" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gold-600 font-semibold">
              {pText(p.category, locale)}
            </p>
            <h1
              className="text-ink-900 text-4xl md:text-5xl font-bold leading-none mt-1"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {p.name}
            </h1>
            <p className="text-ink-600 mt-2">{pText(p.tagline, locale)}</p>
          </div>
        </div>

        {p.badge && (
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-500/15 border border-gold-500/40 px-4 py-1.5 text-gold-700 text-xs font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" aria-hidden="true" />
            {pText(p.badge, locale)}
          </div>
        )}

        {/* Description */}
        <p className="mt-8 text-ink-700 text-lg leading-relaxed">{pText(p.description, locale)}</p>

        {/* Liens */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={p.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-ink-950 hover:bg-ink-800 text-cream-50 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
          >
            {t.official}
            <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
          </a>
          {p.internalHref && p.internalLabel && (
            <Link
              href={p.internalHref}
              className="group inline-flex items-center justify-center gap-2 border border-ink-300 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
            >
              {pText(p.internalLabel, locale)}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </Link>
          )}
        </div>

        {/* CTA visite */}
        <div className="mt-12 rounded-lg bg-ink-950 text-cream-50 p-7 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
              {t.ctaTitle}
            </h2>
            <p className="text-cream-50/75 text-sm mt-1">{t.ctaText}</p>
          </div>
          <Link
            href="/billetterie"
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 py-3.5 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
          >
            {t.ctaExpo}
            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Maillage écosystème */}
        <div className="mt-10">
          <EcosystemLinks locale={locale} items={["mag"]} title={t.more} />
        </div>
      </div>
    </div>
  );
}
