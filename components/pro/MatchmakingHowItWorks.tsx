"use client";
import Image from "next/image";
import { useLocale } from "next-intl";

/**
 * MatchmakingHowItWorks — 4-step explainer of how the platform works,
 * paired with a real photo (no icons, no cards).
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    headline: string;
    steps: { number: string; title: string; body: string }[];
  }
> = {
  fr: {
    eyebrow: "Comment ça marche",
    headline: "Quatre étapes, pas de bullshit.",
    steps: [
      { number: "01", title: "Validez votre stand 2027.", body: "L'accès au matchmaking est inclus pour tout exposant confirmé. Pas de surcoût." },
      { number: "02", title: "Recevez la liste des acheteurs.", body: "Trois mois avant le salon, nous vous envoyons l'annuaire complet : enseignes, distributeurs, e-commerce, HORECA présents." },
      { number: "03", title: "Demandez vos rendez-vous.", body: "Sur la plateforme, vous filtrez par enseigne, par pays, par catégorie. Vous demandez vos meetings en un clic." },
      { number: "04", title: "Arrivez avec un agenda.", body: "Vos rendez-vous sont confirmés et planifiés au stand. Plus de hasard, plus de course aux contacts." },
    ],
  },
  en: {
    eyebrow: "How it works",
    headline: "Four steps, no bullshit.",
    steps: [
      { number: "01", title: "Confirm your 2027 stand.", body: "Matchmaking access is included for any confirmed exhibitor. No extra fee." },
      { number: "02", title: "Receive the buyer list.", body: "Three months before the show, we send the full directory: chains, distributors, e-commerce, HORECA attending." },
      { number: "03", title: "Request your meetings.", body: "On the platform, you filter by chain, country, category. Request meetings in one click." },
      { number: "04", title: "Arrive with an agenda.", body: "Your meetings are confirmed and scheduled at your stand. No more chasing, no more luck." },
    ],
  },
  es: {
    eyebrow: "Cómo funciona",
    headline: "Cuatro pasos, sin bullshit.",
    steps: [
      { number: "01", title: "Valide su stand 2027.", body: "El acceso al matchmaking está incluido para todo expositor confirmado. Sin coste extra." },
      { number: "02", title: "Reciba la lista de compradores.", body: "Tres meses antes del salón, enviamos el directorio completo: cadenas, distribuidores, e-commerce, HORECA presentes." },
      { number: "03", title: "Solicite sus citas.", body: "En la plataforma, filtra por cadena, país, categoría. Solicite sus reuniones con un clic." },
      { number: "04", title: "Llegue con una agenda.", body: "Sus reuniones están confirmadas y planificadas en su stand. Sin azar, sin carrera." },
    ],
  },
  de: {
    eyebrow: "So funktioniert es",
    headline: "Vier Schritte, kein Bullshit.",
    steps: [
      { number: "01", title: "Bestätigen Sie Ihren Stand 2027.", body: "Matchmaking-Zugang ist für jeden bestätigten Aussteller inklusive. Keine Zusatzkosten." },
      { number: "02", title: "Erhalten Sie die Einkäuferliste.", body: "Drei Monate vor der Messe senden wir Ihnen das vollständige Verzeichnis: Ketten, Distributoren, E-Commerce, HORECA." },
      { number: "03", title: "Fordern Sie Ihre Termine an.", body: "Auf der Plattform filtern Sie nach Kette, Land, Kategorie. Termine in einem Klick anfragen." },
      { number: "04", title: "Kommen Sie mit einer Agenda.", body: "Ihre Meetings sind bestätigt und am Stand geplant. Kein Zufall mehr." },
    ],
  },
  nl: {
    eyebrow: "Hoe het werkt",
    headline: "Vier stappen, geen bullshit.",
    steps: [
      { number: "01", title: "Bevestig uw stand 2027.", body: "Matchmaking-toegang is inbegrepen voor elke bevestigde exposant. Geen extra kosten." },
      { number: "02", title: "Ontvang de kopersgids.", body: "Drie maanden voor de beurs sturen we de volledige gids: ketens, distributeurs, e-commerce, HORECA." },
      { number: "03", title: "Vraag uw afspraken aan.", body: "Op het platform filtert u op keten, land, categorie. Vraag meetings aan in één klik." },
      { number: "04", title: "Kom met een agenda.", body: "Uw meetings zijn bevestigd en gepland aan uw stand. Geen geluk meer nodig." },
    ],
  },
  pt: {
    eyebrow: "Como funciona",
    headline: "Quatro etapas, sem bullshit.",
    steps: [
      { number: "01", title: "Valide o seu stand 2027.", body: "Acesso matchmaking incluído para todo expositor confirmado. Sem custo extra." },
      { number: "02", title: "Receba a lista de compradores.", body: "Três meses antes da feira, enviamos o diretório completo: cadeias, distribuidores, e-commerce, HORECA." },
      { number: "03", title: "Peça as suas reuniões.", body: "Na plataforma, filtre por cadeia, país, categoria. Peça reuniões num clique." },
      { number: "04", title: "Chegue com uma agenda.", body: "As suas reuniões estão confirmadas e agendadas no seu stand. Sem acaso." },
    ],
  },
  it: {
    eyebrow: "Come funziona",
    headline: "Quattro passaggi, niente bullshit.",
    steps: [
      { number: "01", title: "Conferma il tuo stand 2027.", body: "L'accesso al matchmaking è incluso per ogni espositore confermato. Senza costi aggiuntivi." },
      { number: "02", title: "Ricevi la lista degli acquirenti.", body: "Tre mesi prima della fiera, ti inviamo la directory completa: catene, distributori, e-commerce, HORECA." },
      { number: "03", title: "Richiedi i tuoi appuntamenti.", body: "Sulla piattaforma, filtri per catena, paese, categoria. Richiedi gli appuntamenti con un clic." },
      { number: "04", title: "Arriva con un'agenda.", body: "I tuoi appuntamenti sono confermati e pianificati al tuo stand. Niente più fortuna." },
    ],
  },
};

export default function MatchmakingHowItWorks() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-ink-950 py-14 md:py-20" aria-label="How matchmaking works">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Sticky photo on left */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
            <Image
              src="/photos-2026/bbq-expo-008.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Steps */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>

          <h2
            className="text-cream-50 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold mb-12 md:mb-16"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.headline}
          </h2>

          <ol className="space-y-10 md:space-y-12">
            {ui.steps.map((s) => (
              <li key={s.number} className="border-t border-white/10 pt-6">
                <div className="text-gold-500 text-sm md:text-base font-bold tabular-nums mb-3" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
                  — {s.number}
                </div>
                <h3
                  className="text-cream-50 text-2xl md:text-3xl leading-tight font-bold mb-3"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-cream-50/75 text-base md:text-lg leading-relaxed max-w-xl">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
