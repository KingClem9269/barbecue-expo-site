import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";

const UI: Record<
  string,
  {
    eyebrow: string;
    heroTitle: string;
    heroParagraph: string;
    packsEyebrow: string;
    packsTitle: string;
    packsIntro: string;
    packs: { name: string; surface: string; price: string; priceNote: string; included: string[]; popular?: boolean }[];
    configuratorEyebrow: string;
    configuratorTitle: string;
    configuratorBody: string;
    configuratorCta: string;
    contactEyebrow: string;
    contactTitle: string;
    contactBody: string;
    contactCta: string;
    secondaryCta: string;
    pricesNote: string;
  }
> = {
  fr: {
    eyebrow: "Devenir exposant · Édition 2027",
    heroTitle: "Réservez votre place à l'Expo.",
    heroParagraph:
      "200+ marques exposeront en 2027. Le bon stand, la bonne place dans le salon, le bon dispositif média — c'est ce qu'on vous aide à construire. Trois packs pré-définis, ou un projet sur mesure via le configurateur.",
    packsEyebrow: "Packs 2027",
    packsTitle: "Trois formules. Tout est inclus.",
    packsIntro:
      "Chaque pack comprend la surface stand, l'aménagement de base, l'électricité, la connexion réseau, l'inscription au catalogue exposants, l'accès matchmaking et deux pass exposants par tranche de 9 m².",
    packs: [
      {
        name: "Pack Découverte",
        surface: "9 m² · 3×3",
        price: "À partir de 3 200 €",
        priceNote: "HT — Tarif early bird jusqu'au 31/01/2027",
        included: [
          "Stand 9 m² aménagé",
          "Mobilier basique (1 table, 4 chaises)",
          "Électricité + Wi-Fi",
          "2 pass exposants",
          "Catalogue + matchmaking",
        ],
      },
      {
        name: "Pack Affirmation",
        surface: "18 m² · 6×3",
        price: "À partir de 5 800 €",
        priceNote: "HT — Tarif early bird jusqu'au 31/01/2027",
        included: [
          "Stand 18 m² aménagé",
          "Mobilier confort (banc dégustation, étagères)",
          "Électricité renforcée + Wi-Fi",
          "4 pass exposants",
          "Logo dans la com pré-salon",
          "Mention dans 2 communiqués presse",
          "Catalogue + matchmaking",
        ],
        popular: true,
      },
      {
        name: "Pack Signature",
        surface: "36 m² · 6×6",
        price: "À partir de 11 500 €",
        priceNote: "HT — Tarif early bird jusqu'au 31/01/2027",
        included: [
          "Stand 36 m² personnalisable",
          "Mobilier premium + zone démonstration",
          "Électricité haute puissance + Wi-Fi",
          "8 pass exposants + 4 pass VIP invités",
          "Logo en gros sur tous supports salon",
          "1 masterclass animée par votre équipe",
          "Mention dans 5 communiqués presse",
          "Inscription gratuite aux Awards",
          "Catalogue + matchmaking VIP",
        ],
      },
    ],
    configuratorEyebrow: "Configurateur",
    configuratorTitle: "Votre stand sur mesure.",
    configuratorBody:
      "Pour un projet plus ambitieux : surface custom, design personnalisé, dispositifs presse renforcés. Notre équipe configure votre stand avec vous, en quelques clics.",
    configuratorCta: "Configurer mon stand",
    contactEyebrow: "Parlons-en",
    contactTitle: "Une question ? On vous rappelle.",
    contactBody:
      "L'équipe commerciale Barbecue Expo répond sous 48 heures. Visioconférence ou rendez-vous physique au choix. Toutes les questions méritent une vraie réponse — surtout celles sur les tarifs.",
    contactCta: "Demander un rappel",
    secondaryCta: "Télécharger le dossier exposant",
    pricesNote:
      "Tarifs 2026 indicatifs. Les conditions définitives 2027 sont communiquées dans le dossier exposant. Tarifs early bird valables jusqu'au 31 janvier 2027.",
  },
  en: {
    eyebrow: "Become an exhibitor · 2027 edition",
    heroTitle: "Reserve your place at the show.",
    heroParagraph:
      "200+ brands will exhibit in 2027. The right stand, the right floor placement, the right media setup — that's what we help you build. Three predefined packs, or a custom project via the configurator.",
    packsEyebrow: "2027 packs",
    packsTitle: "Three formulas. Everything included.",
    packsIntro:
      "Each pack includes the stand surface, basic setup, electricity, internet, exhibitor catalog, matchmaking access, and two exhibitor passes per 9 m².",
    packs: [
      { name: "Discovery", surface: "9 m² · 3×3", price: "From €3,200", priceNote: "Excl. VAT — Early bird until 31/01/2027", included: ["9 m² fitted stand", "Basic furniture (1 table, 4 chairs)", "Electricity + Wi-Fi", "2 exhibitor passes", "Catalog + matchmaking"] },
      { name: "Affirmation", surface: "18 m² · 6×3", price: "From €5,800", priceNote: "Excl. VAT — Early bird until 31/01/2027", included: ["18 m² fitted stand", "Comfort furniture (tasting bar, shelves)", "Reinforced electricity + Wi-Fi", "4 exhibitor passes", "Logo in pre-show comms", "Mention in 2 press releases", "Catalog + matchmaking"], popular: true },
      { name: "Signature", surface: "36 m² · 6×6", price: "From €11,500", priceNote: "Excl. VAT — Early bird until 31/01/2027", included: ["36 m² custom stand", "Premium furniture + demo area", "High power electricity + Wi-Fi", "8 exhibitor passes + 4 VIP guest passes", "Large logo on all show materials", "1 masterclass hosted by your team", "Mention in 5 press releases", "Free Awards entry", "Catalog + VIP matchmaking"] },
    ],
    configuratorEyebrow: "Configurator",
    configuratorTitle: "Your custom stand.",
    configuratorBody:
      "For more ambitious projects: custom surface, bespoke design, reinforced press setup. Our team configures your stand with you, in a few clicks.",
    configuratorCta: "Configure my stand",
    contactEyebrow: "Let's talk",
    contactTitle: "A question? We'll call you back.",
    contactBody:
      "The Barbecue Expo sales team replies within 48 hours. Video call or in-person, your choice. Every question deserves a real answer — especially those about pricing.",
    contactCta: "Request a callback",
    secondaryCta: "Download the exhibitor kit",
    pricesNote: "2026 indicative rates. Final 2027 conditions are detailed in the exhibitor kit. Early bird rates valid until 31 January 2027.",
  },
};

const CONTENT: Record<string, typeof UI.fr> = {
  fr: UI.fr,
  en: UI.en,
  es: UI.fr,
  de: UI.fr,
  nl: UI.fr,
  pt: UI.fr,
  it: UI.fr,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = CONTENT[locale] || CONTENT.fr;
  return buildMetadata(locale, "/devenez-exposants", {
    title: "Devenir exposant — Barbecue Expo 2027",
    description: ui.heroParagraph,
  });
}

export default async function DevenezExposantsPage() {
  const locale = await getLocale();
  const ui = CONTENT[locale] || CONTENT.fr;

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="relative w-full min-h-[80dvh] overflow-hidden bg-ink-950">
        <Image
          src="/photos-2026/bbq-expo-073.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-end min-h-[80dvh]">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.heroTitle}
          </h1>
          <p className="mt-10 md:mt-14 text-cream-50/90 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
            {ui.heroParagraph}
          </p>
        </div>
      </section>

      {/* Packs */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.packsEyebrow}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
          <h2
            className="lg:col-span-7 text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.packsTitle}
          </h2>
          <p className="lg:col-span-5 text-ink-600 text-base md:text-lg leading-relaxed">
            {ui.packsIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {ui.packs.map((p, i) => (
            <div
              key={i}
              className={`relative flex flex-col p-6 md:p-8 rounded-sm border ${
                p.popular
                  ? "border-gold-500/60 bg-gradient-to-b from-gold-100/60 to-cream-100 shadow-[0_0_60px_-20px_rgba(244,173,60,0.4)]"
                  : "border-ink-900/15 bg-cream-100"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-6 inline-flex items-center bg-gold-500 text-ink-950 text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-sm">
                  Le plus choisi
                </div>
              )}
              <div className="text-gold-700 text-xs uppercase tracking-widest font-semibold mb-3">
                {p.surface}
              </div>
              <h3
                className="text-ink-900 text-3xl md:text-4xl leading-tight font-bold mb-4"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {p.name}
              </h3>
              <div className="mb-2">
                <div
                  className="text-ink-900 text-2xl md:text-3xl leading-none font-bold"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {p.price}
                </div>
                <div className="text-ink-600 text-xs mt-1">{p.priceNote}</div>
              </div>
              <ul className="mt-6 space-y-2 mb-6 flex-1">
                {p.included.map((line, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-ink-900">
                    <Check className="w-4 h-4 text-gold-600 mt-0.5 shrink-0" strokeWidth={2.5} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#contact"
                className={`inline-flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                  p.popular
                    ? "bg-ink-950 text-cream-50 hover:bg-char-800"
                    : "border border-ink-900/30 text-ink-900 hover:border-gold-500 hover:text-gold-700"
                }`}
              >
                Réserver ce pack
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-ink-600 italic max-w-3xl">{ui.pricesNote}</p>
      </section>

      {/* Configurator */}
      <section className="bg-ink-950 py-24 md:py-32" aria-label="Configurateur">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-sm overflow-hidden">
            <Image
              src="/photos-2026/bbq-expo-066.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
              <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
              {ui.configuratorEyebrow}
            </div>
            <h2
              className="text-cream-50 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold mb-6"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.configuratorTitle}
            </h2>
            <p className="text-cream-50/85 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
              {ui.configuratorBody}
            </p>
            <a
              href="#"
              className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
            >
              <span>{ui.configuratorCta}</span>
              <ArrowUpRight
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={2.5}
              />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-cream-100 py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.contactEyebrow}
          </div>
          <h2
            className="text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold mb-6"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.contactTitle}
          </h2>
          <p className="text-ink-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10">
            {ui.contactBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:exposants@barbecue-expo.fr"
              className="group inline-flex items-center gap-4 bg-ink-950 hover:bg-char-800 text-cream-50 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
            >
              <span>{ui.contactCta}</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-4 border border-ink-900/30 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
            >
              <span>{ui.secondaryCta}</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
