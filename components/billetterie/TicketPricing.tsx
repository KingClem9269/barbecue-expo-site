"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Check, Minus, Clock, Flame } from "lucide-react";
import WeezeventCTA, { openWeezevent } from "./WeezeventCTA";

/**
 * TicketPricing — 5-tier pass matrix with early-bird urgency strip.
 */

type Tier = {
  key: string;
  label: string;
  price: string;
  priceEarly?: string;
  audience: string;
  href: string;
  highlight?: boolean;
  features: boolean[]; // aligned with FEATURE_ROWS length
};

const FEATURE_KEYS = [
  "access",
  "allThreeDays",
  "masterclassIncluded",
  "grillArena",
  "vipLounge",
  "meetPitmasters",
  "goodieBag",
  "proMatchmaking",
  "pressKit",
] as const;
type FeatureKey = (typeof FEATURE_KEYS)[number];

const FEATURE_LABELS: Record<FeatureKey, Record<string, string>> = {
  access: { fr: "Accès général", en: "General access", es: "Acceso general", de: "Allgemeiner Zugang", nl: "Algemene toegang", pt: "Acesso geral", it: "Accesso generale" },
  allThreeDays: { fr: "3 jours d'accès", en: "3-day access", es: "Acceso 3 días", de: "3-Tage-Zugang", nl: "3-dagen-toegang", pt: "Acesso 3 dias", it: "Accesso 3 giorni" },
  masterclassIncluded: { fr: "1 masterclass incluse", en: "1 masterclass included", es: "1 masterclass incluida", de: "1 Masterclass inklusive", nl: "1 masterclass inbegrepen", pt: "1 masterclass incluída", it: "1 masterclass inclusa" },
  grillArena: { fr: "Soirée Grill Arena", en: "Grill Arena night", es: "Noche Grill Arena", de: "Grill-Arena-Abend", nl: "Grill Arena-avond", pt: "Noite Grill Arena", it: "Serata Grill Arena" },
  vipLounge: { fr: "Lounge VIP", en: "VIP lounge", es: "Lounge VIP", de: "VIP-Lounge", nl: "VIP-lounge", pt: "Lounge VIP", it: "Lounge VIP" },
  meetPitmasters: { fr: "Rencontre pitmasters", en: "Meet-the-pitmaster", es: "Encuentro pitmasters", de: "Pitmaster-Meet", nl: "Pitmaster-ontmoeting", pt: "Encontro pitmasters", it: "Incontro pitmaster" },
  goodieBag: { fr: "Goodie bag BBQ", en: "BBQ goodie bag", es: "Goodie bag BBQ", de: "BBQ Goodie-Bag", nl: "BBQ goodie bag", pt: "BBQ goodie bag", it: "BBQ goodie bag" },
  proMatchmaking: { fr: "Matchmaking B2B", en: "B2B matchmaking", es: "Matchmaking B2B", de: "B2B-Matchmaking", nl: "B2B-matchmaking", pt: "Matchmaking B2B", it: "Matchmaking B2B" },
  pressKit: { fr: "Kit presse", en: "Press kit", es: "Kit de prensa", de: "Pressemappe", nl: "Perskit", pt: "Kit de imprensa", it: "Cartella stampa" },
};

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    earlyBird: string;
    earlyBirdDeadline: string;
    tiers: {
      oneDay: string; threeDays: string; vip: string; pro: string; press: string;
      priceFree: string;
      audOneDay: string; audThreeDays: string; audVip: string; audPro: string; audPress: string;
      cta: string;
      ctaSoon: string;
      popular: string;
    };
  }
> = {
  fr: {
    eyebrow: "Billetterie 2027",
    title: "Cinq entrées. Choisissez la vôtre.",
    subtitle:
      "Tarifs early bird jusqu'au 31 décembre 2026, puis plein tarif. Tous les pass incluent l'accès général au salon pendant la durée choisie.",
    earlyBird: "Early bird — économisez 30%",
    earlyBirdDeadline: "Jusqu'au 31 décembre 2026",
    tiers: {
      oneDay: "Pass 1 jour", threeDays: "Pass 3 jours", vip: "Pass VIP", pro: "Pass Pro B2B", press: "Pass Presse",
      priceFree: "Gratuit sur invitation",
      audOneDay: "Pour tester",
      audThreeDays: "Le choix standard",
      audVip: "Pour les connaisseurs",
      audPro: "Distributeurs, acheteurs",
      audPress: "Médias, journalistes",
      cta: "Réserver",
      ctaSoon: "Bientôt disponible",
      popular: "Le plus choisi",
    },
  },
  en: {
    eyebrow: "2027 Tickets",
    title: "Five passes. Pick yours.",
    subtitle:
      "Early-bird pricing until December 31, 2026, then standard rate. All passes include general access for the chosen duration.",
    earlyBird: "Early bird — save 30%",
    earlyBirdDeadline: "Until December 31, 2026",
    tiers: {
      oneDay: "1-Day Pass", threeDays: "3-Day Pass", vip: "VIP Pass", pro: "B2B Pro Pass", press: "Press Pass",
      priceFree: "Free with invitation",
      audOneDay: "For a first taste",
      audThreeDays: "The standard choice",
      audVip: "For connoisseurs",
      audPro: "Buyers, distributors",
      audPress: "Media, journalists",
      cta: "Book",
      ctaSoon: "Coming soon",
      popular: "Most popular",
    },
  },
  es: {
    eyebrow: "Entradas 2027",
    title: "Cinco entradas. Elija la suya.",
    subtitle:
      "Tarifa early bird hasta el 31 de diciembre de 2026, luego tarifa normal.",
    earlyBird: "Early bird — ahorre 30%",
    earlyBirdDeadline: "Hasta el 31 de diciembre de 2026",
    tiers: {
      oneDay: "Pase 1 día", threeDays: "Pase 3 días", vip: "Pase VIP", pro: "Pase Pro B2B", press: "Pase Prensa",
      priceFree: "Gratis con invitación",
      audOneDay: "Para probar",
      audThreeDays: "La opción estándar",
      audVip: "Para conocedores",
      audPro: "Compradores, distribuidores",
      audPress: "Medios, periodistas",
      cta: "Reservar",
      ctaSoon: "Próximamente",
      popular: "Más elegido",
    },
  },
  de: {
    eyebrow: "Tickets 2027",
    title: "Fünf Pässe. Wählen Sie Ihren.",
    subtitle:
      "Early-Bird-Preis bis 31. Dezember 2026, danach regulärer Preis.",
    earlyBird: "Early bird — 30% sparen",
    earlyBirdDeadline: "Bis 31. Dezember 2026",
    tiers: {
      oneDay: "1-Tages-Pass", threeDays: "3-Tage-Pass", vip: "VIP-Pass", pro: "B2B-Pro-Pass", press: "Presse-Pass",
      priceFree: "Kostenlos mit Einladung",
      audOneDay: "Zum Testen",
      audThreeDays: "Die Standardwahl",
      audVip: "Für Kenner",
      audPro: "Einkäufer, Händler",
      audPress: "Medien, Journalisten",
      cta: "Buchen",
      ctaSoon: "Bald verfügbar",
      popular: "Am beliebtesten",
    },
  },
  nl: {
    eyebrow: "Tickets 2027",
    title: "Vijf passen. Kies de uwe.",
    subtitle: "Early-bird-tarief tot 31 december 2026, daarna standaardtarief.",
    earlyBird: "Early bird — bespaar 30%",
    earlyBirdDeadline: "Tot 31 december 2026",
    tiers: {
      oneDay: "1-dagpas", threeDays: "3-dagenpas", vip: "VIP-pas", pro: "B2B Pro-pas", press: "Perspas",
      priceFree: "Gratis met uitnodiging",
      audOneDay: "Om te proeven",
      audThreeDays: "De standaardkeuze",
      audVip: "Voor kenners",
      audPro: "Kopers, distributeurs",
      audPress: "Media, journalisten",
      cta: "Boeken",
      ctaSoon: "Binnenkort",
      popular: "Meest gekozen",
    },
  },
  pt: {
    eyebrow: "Bilhetes 2027",
    title: "Cinco passes. Escolha o seu.",
    subtitle: "Tarifa early bird até 31 de dezembro de 2026, depois tarifa normal.",
    earlyBird: "Early bird — poupe 30%",
    earlyBirdDeadline: "Até 31 de dezembro de 2026",
    tiers: {
      oneDay: "Passe 1 dia", threeDays: "Passe 3 dias", vip: "Passe VIP", pro: "Passe Pro B2B", press: "Passe Imprensa",
      priceFree: "Grátis por convite",
      audOneDay: "Para experimentar",
      audThreeDays: "A escolha padrão",
      audVip: "Para conhecedores",
      audPro: "Compradores, distribuidores",
      audPress: "Media, jornalistas",
      cta: "Reservar",
      ctaSoon: "Em breve",
      popular: "Mais escolhido",
    },
  },
  it: {
    eyebrow: "Biglietti 2027",
    title: "Cinque pass. Scegli il tuo.",
    subtitle: "Tariffa early bird fino al 31 dicembre 2026, poi tariffa standard.",
    earlyBird: "Early bird — risparmia 30%",
    earlyBirdDeadline: "Fino al 31 dicembre 2026",
    tiers: {
      oneDay: "Pass 1 giorno", threeDays: "Pass 3 giorni", vip: "Pass VIP", pro: "Pass Pro B2B", press: "Pass Stampa",
      priceFree: "Gratuito su invito",
      audOneDay: "Per provare",
      audThreeDays: "La scelta standard",
      audVip: "Per i conoscitori",
      audPro: "Acquirenti, distributori",
      audPress: "Media, giornalisti",
      cta: "Prenota",
      ctaSoon: "Prossimamente",
      popular: "Più scelto",
    },
  },
};

export default function TicketPricing() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  const tiers: Tier[] = [
    {
      key: "oneDay",
      label: ui.tiers.oneDay,
      price: "15 €",
      priceEarly: "10 €",
      audience: ui.tiers.audOneDay,
      href: "/billetterie/particulier",
      features: [true, false, false, false, false, false, false, false, false],
    },
    {
      key: "threeDays",
      label: ui.tiers.threeDays,
      price: "35 €",
      priceEarly: "25 €",
      audience: ui.tiers.audThreeDays,
      href: "/billetterie/particulier",
      highlight: true,
      features: [true, true, true, false, false, false, false, false, false],
    },
    {
      key: "vip",
      label: ui.tiers.vip,
      price: "95 €",
      priceEarly: "65 €",
      audience: ui.tiers.audVip,
      href: "/billetterie/particulier",
      features: [true, true, true, true, true, true, true, false, false],
    },
    {
      key: "pro",
      label: ui.tiers.pro,
      price: ui.tiers.priceFree,
      audience: ui.tiers.audPro,
      href: "/billetterie/pro-b2b",
      features: [true, true, false, false, false, false, false, true, false],
    },
    {
      key: "press",
      label: ui.tiers.press,
      price: ui.tiers.priceFree,
      audience: ui.tiers.audPress,
      href: "/billetterie/presse",
      features: [true, true, false, false, false, false, false, false, true],
    },
  ];

  return (
    <section className="relative w-full bg-cream-50 py-14 md:py-20" aria-label="Ticket pricing">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-10 md:mb-14">
          <div className="lg:col-span-8">
            <h2
              className="text-ink-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.title}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-ink-600 text-base md:text-lg leading-relaxed">
              {ui.subtitle}
            </p>
          </div>
        </div>

        {/* Early bird banner */}
        <div className="flex items-center gap-3 md:gap-4 bg-ink-950 text-cream-50 rounded-sm px-5 md:px-6 py-4 md:py-5 mb-10 md:mb-14">
          <Flame className="w-5 h-5 text-gold-500 shrink-0" strokeWidth={2} />
          <div className="flex-1">
            <span className="text-gold-500 text-sm md:text-base font-bold uppercase tracking-widest mr-3">
              {ui.earlyBird}
            </span>
            <span className="text-cream-50/80 text-xs md:text-sm">
              {ui.earlyBirdDeadline}
            </span>
          </div>
          <Clock className="w-5 h-5 text-gold-500 shrink-0 hidden sm:block" strokeWidth={2} />
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {tiers.map((t) => (
            <div
              key={t.key}
              className={`relative flex flex-col p-5 md:p-6 rounded-sm border transition-all duration-300 ${
                t.highlight
                  ? "border-gold-500/60 bg-gradient-to-b from-gold-100/60 to-cream-100 shadow-[0_0_60px_-20px_rgba(244,173,60,0.4)]"
                  : "border-ink-900/15 bg-cream-100 hover:border-gold-500/40"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-5 inline-flex items-center bg-gold-500 text-ink-950 text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-sm">
                  {ui.tiers.popular}
                </div>
              )}

              <h3
                className="text-ink-900 text-xl md:text-2xl leading-tight font-bold mb-1"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {t.label}
              </h3>
              <p className="text-ink-600 text-xs uppercase tracking-widest mb-5">
                {t.audience}
              </p>

              {/* Price */}
              <div className="mb-5">
                {t.priceEarly ? (
                  <>
                    <div
                      className="text-gold-700 text-3xl md:text-4xl leading-none font-bold tabular-nums"
                      style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                    >
                      {t.priceEarly}
                    </div>
                    <div className="text-ink-600 text-xs line-through tabular-nums mt-1">
                      {t.price}
                    </div>
                  </>
                ) : (
                  <div
                    className="text-ink-900 text-xl md:text-2xl leading-tight font-semibold"
                    style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                  >
                    {t.price}
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6 flex-1">
                {FEATURE_KEYS.map((k, i) => {
                  const included = t.features[i];
                  return (
                    <li
                      key={k}
                      className={`flex items-start gap-2 text-xs md:text-sm ${
                        included ? "text-ink-900" : "text-ink-400"
                      }`}
                    >
                      {included ? (
                        <Check className="w-3.5 h-3.5 text-gold-600 mt-0.5 shrink-0" strokeWidth={2.5} />
                      ) : (
                        <Minus className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={2} />
                      )}
                      <span className={included ? "" : "line-through"}>
                        {FEATURE_LABELS[k][locale] || FEATURE_LABELS[k].fr}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* CTA */}
              {t.key === "pro" ? (
                // Billetterie pro — à venir
                <span className="inline-flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-xs md:text-sm font-bold uppercase tracking-widest border border-ink-900/15 text-ink-400 cursor-default select-none">
                  <Clock className="w-3.5 h-3.5" strokeWidth={2} />
                  {ui.tiers.ctaSoon}
                </span>
              ) : t.key === "press" ? (
                <Link
                  href={t.href}
                  className="inline-flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-xs md:text-sm font-bold uppercase tracking-widest border border-ink-900/30 text-ink-900 hover:border-gold-500 hover:text-gold-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  {ui.tiers.cta}
                </Link>
              ) : (
                // Pass grand public → billetterie Weezevent (popup)
                <button
                  type="button"
                  onClick={openWeezevent}
                  className={`inline-flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                    t.highlight
                      ? "bg-ink-950 text-cream-50 hover:bg-char-800"
                      : "border border-ink-900/30 text-ink-900 hover:border-gold-500 hover:text-gold-700"
                  }`}
                >
                  {ui.tiers.cta}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Widget billetterie Weezevent — sous les cartes pass */}
        <div className="mt-10 md:mt-12 flex justify-center">
          <WeezeventCTA />
        </div>
      </div>
    </section>
  );
}
