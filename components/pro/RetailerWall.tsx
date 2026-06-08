"use client";
import { useLocale } from "next-intl";
import { Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";

/**
 * RetailerWall — visualizes the retailer/buyer ecosystem.
 *
 * 4 tiles fully visible at top (signature retailers we can name),
 * then ~16 tiles blurred/masked below with a "Visible aux exposants"
 * overlay + lock icon. Accompanied by a teaser headline.
 *
 * Real logos drop into /public/retailers/<slug>.svg or .png. Until then,
 * a typographic placeholder shows the name (still credible).
 */

type Retailer = {
  slug: string;
  name: string;
  visible: boolean;
};

const RETAILERS: Retailer[] = [
  // Visible (4 — signature names you authorize to show)
  { slug: "barbecue-co", name: "Barbecue & Co", visible: true },
  { slug: "esprit-barbecue", name: "Esprit Barbecue", visible: true },
  { slug: "leroy-merlin", name: "Leroy Merlin", visible: true },
  { slug: "castorama", name: "Castorama", visible: true },
  // Blurred (the rest — placeholder names so the count looks dense)
  { slug: "mr-bricolage", name: "Mr Bricolage", visible: false },
  { slug: "botanic", name: "Botanic", visible: false },
  { slug: "bricomarche", name: "Bricomarché", visible: false },
  { slug: "weldom", name: "Weldom", visible: false },
  { slug: "boulanger", name: "Boulanger", visible: false },
  { slug: "darty", name: "Darty", visible: false },
  { slug: "but", name: "BUT", visible: false },
  { slug: "conforama", name: "Conforama", visible: false },
  { slug: "carrefour", name: "Carrefour", visible: false },
  { slug: "auchan", name: "Auchan", visible: false },
  { slug: "intermarche", name: "Intermarché", visible: false },
  { slug: "amazon", name: "Amazon", visible: false },
  { slug: "cdiscount", name: "Cdiscount", visible: false },
  { slug: "fnac", name: "Fnac", visible: false },
  { slug: "obi", name: "OBI", visible: false },
  { slug: "bauhaus", name: "Bauhaus", visible: false },
  { slug: "hornbach", name: "Hornbach", visible: false },
  { slug: "leroy-merlin-es", name: "Leroy Merlin ES", visible: false },
  { slug: "el-corte-ingles", name: "El Corte Inglés", visible: false },
  { slug: "praxis", name: "Praxis", visible: false },
];

const UI: Record<
  string,
  {
    eyebrow: string;
    headline: string;
    teaser: string;
    overlayLine1: string;
    overlayLine2: string;
    cta: string;
  }
> = {
  fr: {
    eyebrow: "Acheteurs présents en 2026",
    headline: "Plus de 80 enseignes acheteuses en 2026.",
    teaser:
      "Quatre noms parmi des dizaines. Le reste est réservé aux exposants : connectez-vous à la plateforme matchmaking pour voir l'ensemble des acheteurs présents et planifier vos rendez-vous.",
    overlayLine1: "Visible aux exposants",
    overlayLine2: "Rejoignez le salon pour accéder",
    cta: "Devenir exposant 2027",
  },
  en: {
    eyebrow: "Buyers attending in 2026",
    headline: "Over 80 retail buyers attended in 2026.",
    teaser:
      "Four names out of dozens. The rest is reserved for exhibitors: log in to the matchmaking platform to see all attending buyers and plan your meetings.",
    overlayLine1: "Visible to exhibitors",
    overlayLine2: "Join the show to access",
    cta: "Become a 2027 exhibitor",
  },
  es: {
    eyebrow: "Compradores presentes en 2026",
    headline: "Más de 80 enseñas compradoras en 2026.",
    teaser:
      "Cuatro nombres entre decenas. El resto está reservado a expositores: conéctese a la plataforma matchmaking para ver todos los compradores y planificar sus citas.",
    overlayLine1: "Visible para expositores",
    overlayLine2: "Únase al salón para acceder",
    cta: "Sea expositor 2027",
  },
  de: {
    eyebrow: "Einkäufer 2026",
    headline: "Über 80 einkaufende Marken in 2026.",
    teaser:
      "Vier Namen von Dutzenden. Der Rest ist Ausstellern vorbehalten: Loggen Sie sich in die Matchmaking-Plattform ein, um alle anwesenden Einkäufer zu sehen.",
    overlayLine1: "Für Aussteller sichtbar",
    overlayLine2: "Treten Sie der Messe bei",
    cta: "Aussteller 2027 werden",
  },
  nl: {
    eyebrow: "Aanwezige kopers in 2026",
    headline: "Meer dan 80 retailers in 2026.",
    teaser:
      "Vier namen van tientallen. De rest is voorbehouden aan exposanten: log in op het matchmaking-platform om alle aanwezige kopers te zien.",
    overlayLine1: "Zichtbaar voor exposanten",
    overlayLine2: "Sluit aan bij de beurs",
    cta: "Exposant 2027 worden",
  },
  pt: {
    eyebrow: "Compradores presentes em 2026",
    headline: "Mais de 80 marcas compradoras em 2026.",
    teaser:
      "Quatro nomes entre dezenas. O resto está reservado aos expositores: inicie sessão na plataforma matchmaking para ver todos os compradores presentes.",
    overlayLine1: "Visível para expositores",
    overlayLine2: "Junte-se à feira para aceder",
    cta: "Seja expositor 2027",
  },
  it: {
    eyebrow: "Acquirenti presenti nel 2026",
    headline: "Oltre 80 insegne acquirenti nel 2026.",
    teaser:
      "Quattro nomi tra decine. Il resto è riservato agli espositori: accedi alla piattaforma matchmaking per vedere tutti gli acquirenti e pianificare i tuoi appuntamenti.",
    overlayLine1: "Visibile agli espositori",
    overlayLine2: "Unisciti alla fiera per accedere",
    cta: "Diventa espositore 2027",
  },
};

export default function RetailerWall() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-cream-50 py-14 md:py-20" aria-label="Retailers">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8 md:mb-12">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <h2
              className="text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.headline}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-ink-600 text-base md:text-lg leading-relaxed">
              {ui.teaser}
            </p>
          </div>
        </div>

        {/* The wall */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {RETAILERS.map((r) => (
              <RetailerTile key={r.slug} retailer={r} />
            ))}
          </div>

          {/* Overlay sweeping across blurred portion */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-t from-cream-50 via-cream-50/85 to-transparent flex items-end justify-center pb-12 md:pb-16"
            aria-hidden="true"
          >
            <div className="pointer-events-auto bg-ink-950 text-cream-50 rounded-sm px-6 md:px-8 py-5 md:py-6 max-w-md mx-6 text-center shadow-2xl">
              <Lock className="w-5 h-5 text-gold-500 mx-auto mb-3" strokeWidth={2} />
              <div className="text-gold-500 text-xs md:text-sm uppercase tracking-widest font-bold mb-2">
                {ui.overlayLine1}
              </div>
              <div className="text-cream-50/85 text-sm md:text-base mb-5">
                {ui.overlayLine2}
              </div>
              <Link
                href="/devenez-exposants"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-300 text-ink-950 px-4 py-2.5 rounded-sm text-xs md:text-sm font-bold uppercase tracking-widest transition-colors"
              >
                {ui.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RetailerTile({ retailer }: { retailer: Retailer }) {
  // Logo path convention: /retailers/<slug>.svg
  // For now: typographic placeholder always (real logos to be added later)
  return (
    <div
      className={`relative aspect-[3/2] flex items-center justify-center bg-cream-100 border border-ink-900/10 rounded-sm p-4 ${
        !retailer.visible ? "select-none" : ""
      }`}
    >
      <span
        className={`text-ink-900 text-sm md:text-base font-bold text-center leading-tight tracking-tight ${
          !retailer.visible ? "blur-md opacity-60" : ""
        }`}
        style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        aria-hidden={!retailer.visible}
      >
        {retailer.name}
      </span>
    </div>
  );
}
