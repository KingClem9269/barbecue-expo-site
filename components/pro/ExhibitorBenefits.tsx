"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Target, Eye, HandshakeIcon, Zap } from "lucide-react";

/**
 * ExhibitorBenefits — what a brand gets by becoming an exhibitor.
 * Cream-100 background (contrasts with dark ProHero). 4 benefits in grid.
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    benefits: { title: string; body: string }[];
    cta: string;
  }
> = {
  fr: {
    eyebrow: "Pourquoi exposer",
    title: "Le bon salon, au bon moment.",
    subtitle:
      "Barbecue Expo n'est pas un salon généraliste. C'est le seul événement européen entièrement dédié au BBQ, aux pitmasters, et à la cuisine outdoor.",
    benefits: [
      {
        title: "Audience hyper qualifiée",
        body: "25 896 visiteurs dont une large part de pros, prescripteurs, acheteurs. Pas de curieux — des gens qui achètent.",
      },
      {
        title: "Visibilité presse",
        body: "Partenaires médias dédiés BBQ et gastronomie. Couverture presse internationale. Awards 2027 pour distinguer les innovations.",
      },
      {
        title: "Matchmaking B2B",
        body: "Programme de rencontres pré-qualifiées avec distributeurs européens. Agenda rendez-vous facilité avant l'événement.",
      },
      {
        title: "Lancement de produits",
        body: "25 nationalités représentées côté public. Un accès immédiat à l'ensemble des marchés européens depuis un seul stand.",
      },
    ],
    cta: "Télécharger le dossier exposant",
  },
  en: {
    eyebrow: "Why exhibit",
    title: "The right show, at the right time.",
    subtitle:
      "Barbecue Expo is not a generalist show. It's the only European event entirely dedicated to BBQ, pitmasters, and outdoor cooking.",
    benefits: [
      {
        title: "Hyper-qualified audience",
        body: "25,896 visitors with a large share of pros, tastemakers, buyers. No casuals — people who buy.",
      },
      {
        title: "Press visibility",
        body: "Dedicated BBQ and food media partners. International press coverage. 2027 Awards to distinguish innovations.",
      },
      {
        title: "B2B matchmaking",
        body: "Pre-qualified meeting program with European distributors. Streamlined pre-event booking.",
      },
      {
        title: "Product launches",
        body: "25 nationalities in the audience. Immediate access to all European markets from a single stand.",
      },
    ],
    cta: "Download the exhibitor kit",
  },
  es: {
    eyebrow: "Por qué exponer",
    title: "La feria correcta, en el momento correcto.",
    subtitle:
      "Barbecue Expo no es una feria generalista. Es el único evento europeo dedicado al BBQ, a los pitmasters y a la cocina al aire libre.",
    benefits: [
      {
        title: "Audiencia hiper cualificada",
        body: "25.896 visitantes, una gran parte profesionales, prescriptores, compradores. Nada de curiosos — gente que compra.",
      },
      {
        title: "Visibilidad de prensa",
        body: "Socios mediáticos dedicados al BBQ y la gastronomía. Cobertura de prensa internacional. Premios 2027 para distinguir las innovaciones.",
      },
      {
        title: "Matchmaking B2B",
        body: "Programa de reuniones pre-cualificadas con distribuidores europeos. Agenda pre-evento simplificada.",
      },
      {
        title: "Lanzamientos de producto",
        body: "25 nacionalidades representadas. Acceso inmediato a todos los mercados europeos desde un único stand.",
      },
    ],
    cta: "Descargar el dossier expositor",
  },
  de: {
    eyebrow: "Warum ausstellen",
    title: "Die richtige Messe, zur richtigen Zeit.",
    subtitle:
      "Barbecue Expo ist keine Generalisten-Messe. Es ist die einzige europäische Veranstaltung, die sich vollständig dem BBQ, den Pitmastern und dem Outdoor-Kochen widmet.",
    benefits: [
      {
        title: "Hochqualifiziertes Publikum",
        body: "25.896 Besucher, davon ein großer Anteil Profis, Meinungsbildner, Einkäufer. Keine Schaulustigen — Menschen, die kaufen.",
      },
      {
        title: "Pressearbeit",
        body: "Dedizierte Medienpartner für BBQ und Gastronomie. Internationale Pressearbeit. Awards 2027 zur Auszeichnung von Innovationen.",
      },
      {
        title: "B2B-Matchmaking",
        body: "Vorqualifiziertes Meeting-Programm mit europäischen Distributoren. Vereinfachte Terminplanung vor dem Event.",
      },
      {
        title: "Produkt-Launches",
        body: "25 vertretene Nationalitäten. Unmittelbarer Zugang zu allen europäischen Märkten von einem einzigen Stand aus.",
      },
    ],
    cta: "Ausstellerunterlagen herunterladen",
  },
  nl: {
    eyebrow: "Waarom exposeren",
    title: "De juiste beurs, op het juiste moment.",
    subtitle:
      "Barbecue Expo is geen generalistische beurs. Het is het enige Europese evenement volledig gewijd aan BBQ, pitmasters en buitenkoken.",
    benefits: [
      {
        title: "Hypergekwalificeerd publiek",
        body: "25.896 bezoekers, waarvan een groot deel pros, toonaangevers, kopers. Geen nieuwsgierigen — mensen die kopen.",
      },
      {
        title: "Persaandacht",
        body: "Speciale BBQ- en gastronomie-mediapartners. Internationale perskaart. 2027 Awards om innovaties te onderscheiden.",
      },
      {
        title: "B2B-matchmaking",
        body: "Vooraf gekwalificeerd meetingprogramma met Europese distributeurs. Gestroomlijnde planning voor het event.",
      },
      {
        title: "Productlanceringen",
        body: "25 nationaliteiten vertegenwoordigd. Directe toegang tot alle Europese markten vanaf één stand.",
      },
    ],
    cta: "Exposant-dossier downloaden",
  },
  pt: {
    eyebrow: "Porquê expor",
    title: "A feira certa, no momento certo.",
    subtitle:
      "Barbecue Expo não é uma feira generalista. É o único evento europeu totalmente dedicado ao BBQ, aos pitmasters e à cozinha ao ar livre.",
    benefits: [
      {
        title: "Audiência hiper qualificada",
        body: "25.896 visitantes com uma grande parcela de profissionais, prescritores, compradores. Nada de curiosos — pessoas que compram.",
      },
      {
        title: "Visibilidade na imprensa",
        body: "Parceiros de media dedicados ao BBQ e à gastronomia. Cobertura de imprensa internacional. Prémios 2027 para distinguir as inovações.",
      },
      {
        title: "Matchmaking B2B",
        body: "Programa de reuniões pré-qualificadas com distribuidores europeus. Agendamento pré-evento simplificado.",
      },
      {
        title: "Lançamentos de produto",
        body: "25 nacionalidades representadas. Acesso imediato a todos os mercados europeus a partir de um único stand.",
      },
    ],
    cta: "Descarregar o dossier expositor",
  },
  it: {
    eyebrow: "Perché esporre",
    title: "La fiera giusta, al momento giusto.",
    subtitle:
      "Barbecue Expo non è una fiera generalista. È l'unico evento europeo interamente dedicato al BBQ, ai pitmaster e alla cucina outdoor.",
    benefits: [
      {
        title: "Pubblico iper qualificato",
        body: "25.896 visitatori, in gran parte professionisti, prescrittori, acquirenti. Niente curiosi — persone che acquistano.",
      },
      {
        title: "Visibilità stampa",
        body: "Partner media dedicati al BBQ e alla gastronomia. Copertura stampa internazionale. Premi 2027 per distinguere le innovazioni.",
      },
      {
        title: "Matchmaking B2B",
        body: "Programma di incontri pre-qualificati con distributori europei. Pianificazione pre-evento semplificata.",
      },
      {
        title: "Lanci di prodotto",
        body: "25 nazionalità rappresentate. Accesso immediato a tutti i mercati europei da un unico stand.",
      },
    ],
    cta: "Scaricare il dossier espositore",
  },
};

const ICONS = [Target, Eye, HandshakeIcon, Zap];

export default function ExhibitorBenefits() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-cream-100 py-24 md:py-32 lg:py-40" aria-label="Why exhibit">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8 md:mb-12">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 md:mb-16">
          <div className="lg:col-span-8">
            <h2
              className="text-ink-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.title}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <p className="text-ink-600 text-base md:text-lg leading-relaxed">
              {ui.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {ui.benefits.map((b, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={i}
                className="border border-ink-900/15 bg-cream-50 rounded-sm p-6 md:p-8 hover:border-gold-500/50 transition-colors"
              >
                <div className="mb-5">
                  <Icon className="w-6 h-6 text-gold-600" strokeWidth={2} />
                </div>
                <h3
                  className="text-ink-900 text-2xl md:text-3xl leading-tight font-bold mb-3"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {b.title}
                </h3>
                <p className="text-ink-600 text-base leading-relaxed">{b.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16">
          <Link
            href="/devenez-exposants"
            className="group inline-flex items-center gap-3 text-ink-900 hover:text-gold-700 text-sm md:text-base font-semibold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          >
            <span>{ui.cta}</span>
            <span
              aria-hidden="true"
              className="inline-block w-10 h-px bg-gold-600 origin-left transition-transform duration-300 group-hover:scale-x-[1.6]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
