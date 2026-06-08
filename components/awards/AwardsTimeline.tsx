"use client";
import { useLocale } from "next-intl";
import { Calendar, FileCheck, Eye, Trophy } from "lucide-react";

/**
 * AwardsTimeline — the process from application to ceremony.
 * 4 steps with dates + icons. Dark ink-950 bg.
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    steps: { date: string; title: string; body: string }[];
  }
> = {
  fr: {
    eyebrow: "Calendrier",
    title: "De la candidature au podium.",
    steps: [
      {
        date: "15 septembre 2026",
        title: "Ouverture des candidatures",
        body: "Les marques exposantes 2027 peuvent soumettre leur dossier via le portail dédié. Frais de candidature : 250 € par catégorie.",
      },
      {
        date: "15 février 2027",
        title: "Clôture des candidatures",
        body: "Date limite de soumission des dossiers. Les pièces manquantes invalident l'inscription.",
      },
      {
        date: "1er mars 2027",
        title: "Délibération du jury",
        body: "Évaluation à l'aveugle sur trois critères : innovation, qualité d'exécution, impact marché. Notes sur 100.",
      },
      {
        date: "13 mars 2027",
        title: "Cérémonie & remise des prix",
        body: "Grande soirée de remise des awards au Parc Floral de Paris. Diffusion en direct sur les médias partenaires.",
      },
    ],
  },
  en: {
    eyebrow: "Timeline",
    title: "From application to podium.",
    steps: [
      {
        date: "September 15, 2026",
        title: "Applications open",
        body: "2027 exhibiting brands can submit their file through the dedicated portal. Entry fee: €250 per category.",
      },
      {
        date: "February 15, 2027",
        title: "Applications close",
        body: "Submission deadline. Missing documents invalidate the entry.",
      },
      {
        date: "March 1, 2027",
        title: "Jury deliberation",
        body: "Blind evaluation on three criteria: innovation, execution quality, market impact. Scores out of 100.",
      },
      {
        date: "March 13, 2027",
        title: "Awards ceremony",
        body: "Grand awards ceremony at Parc Floral de Paris. Live coverage on partner media.",
      },
    ],
  },
  es: {
    eyebrow: "Calendario",
    title: "De la candidatura al podio.",
    steps: [
      { date: "15 de septiembre 2026", title: "Apertura de candidaturas", body: "Las marcas expositoras 2027 pueden presentar su dossier. Tasa: 250 € por categoría." },
      { date: "15 de febrero 2027", title: "Cierre de candidaturas", body: "Fecha límite de presentación. Documentos faltantes invalidan la inscripción." },
      { date: "1 de marzo 2027", title: "Deliberación del jurado", body: "Evaluación a ciegas sobre tres criterios. Puntuaciones sobre 100." },
      { date: "13 de marzo 2027", title: "Ceremonia de premios", body: "Gran ceremonia en el Parc Floral de París. Transmisión en directo." },
    ],
  },
  de: {
    eyebrow: "Zeitplan",
    title: "Von der Bewerbung zum Podium.",
    steps: [
      { date: "15. September 2026", title: "Bewerbungen öffnen", body: "Ausstellermarken 2027 können ihre Unterlagen einreichen. Gebühr: 250 € pro Kategorie." },
      { date: "15. Februar 2027", title: "Bewerbungen schließen", body: "Einreichungsfrist. Fehlende Dokumente führen zur Ungültigkeit." },
      { date: "1. März 2027", title: "Jury-Beratung", body: "Blindbewertung nach drei Kriterien. Noten von 100." },
      { date: "13. März 2027", title: "Preisverleihung", body: "Große Preisverleihung im Parc Floral de Paris. Live-Übertragung bei Partnermedien." },
    ],
  },
  nl: {
    eyebrow: "Tijdlijn",
    title: "Van kandidaatstelling tot podium.",
    steps: [
      { date: "15 september 2026", title: "Inschrijving open", body: "Exposerende merken 2027 kunnen hun dossier indienen. Kosten: € 250 per categorie." },
      { date: "15 februari 2027", title: "Inschrijving gesloten", body: "Deadline voor inzending. Ontbrekende documenten maken de inschrijving ongeldig." },
      { date: "1 maart 2027", title: "Jury-beraadslaging", body: "Blinde evaluatie op drie criteria. Scores op 100." },
      { date: "13 maart 2027", title: "Prijsuitreiking", body: "Grote avondceremonie in Parc Floral de Paris. Live bij mediapartners." },
    ],
  },
  pt: {
    eyebrow: "Calendário",
    title: "Da candidatura ao pódio.",
    steps: [
      { date: "15 de setembro 2026", title: "Abertura de candidaturas", body: "Marcas expositoras 2027 podem submeter o dossier. Taxa: 250 € por categoria." },
      { date: "15 de fevereiro 2027", title: "Encerramento de candidaturas", body: "Prazo limite. Documentos em falta invalidam a inscrição." },
      { date: "1 de março 2027", title: "Deliberação do júri", body: "Avaliação às cegas em três critérios. Notas em 100." },
      { date: "13 de março 2027", title: "Cerimónia de entrega", body: "Grande cerimónia no Parc Floral de Paris. Transmissão em direto." },
    ],
  },
  it: {
    eyebrow: "Calendario",
    title: "Dalla candidatura al podio.",
    steps: [
      { date: "15 settembre 2026", title: "Apertura candidature", body: "I marchi espositori 2027 possono presentare il dossier. Tassa: 250 € per categoria." },
      { date: "15 febbraio 2027", title: "Chiusura candidature", body: "Scadenza. I documenti mancanti invalidano l'iscrizione." },
      { date: "1 marzo 2027", title: "Deliberazione giuria", body: "Valutazione alla cieca su tre criteri. Voti su 100." },
      { date: "13 marzo 2027", title: "Cerimonia di premiazione", body: "Grande serata al Parc Floral di Parigi. Diretta sui media partner." },
    ],
  },
};

const ICONS = [Calendar, FileCheck, Eye, Trophy];

export default function AwardsTimeline() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-ink-950 py-14 md:py-20 overflow-hidden" aria-label="Awards timeline">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-ember-600/20 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8 md:mb-12">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <h2
          className="text-cream-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold mb-12 md:mb-16 max-w-4xl"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          {ui.title}
        </h2>

        {/* Timeline steps */}
        <ol className="relative">
          {ui.steps.map((step, i) => {
            const Icon = ICONS[i % ICONS.length];
            const isLast = i === ui.steps.length - 1;
            return (
              <li key={i} className="relative flex gap-6 md:gap-10 pb-10 md:pb-14 last:pb-0">
                {/* Connector line */}
                {!isLast && (
                  <span
                    className="absolute left-6 md:left-7 top-14 bottom-0 w-px bg-gold-500/25"
                    aria-hidden="true"
                  />
                )}
                {/* Icon */}
                <div className="shrink-0 relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-gold-500/50 bg-ink-950 text-gold-500">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 pt-1 md:pt-2">
                  <div className="text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-2">
                    {step.date}
                  </div>
                  <h3
                    className="text-cream-50 text-2xl md:text-3xl leading-tight font-bold mb-3"
                    style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-cream-50/75 text-base leading-relaxed max-w-2xl">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
