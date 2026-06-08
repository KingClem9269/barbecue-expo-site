"use client";
import { useLocale } from "next-intl";
import { Flame, Swords, Award } from "lucide-react";

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    days: {
      label: string;
      date: string;
      session: string;
      time: string;
      title: string;
      body: string;
      kind: "round" | "final";
    }[];
  }
> = {
  fr: {
    eyebrow: "Programme",
    title: "Trois soirs. Trois arènes. Un podium.",
    days: [
      {
        label: "Vendredi",
        date: "12 mars 2027",
        session: "Huitièmes de finale",
        time: "19:00 — 22:30",
        title: "Nuit des 16",
        body: "Huit duels à élimination directe. Huit pitmasters survivent.",
        kind: "round",
      },
      {
        label: "Samedi",
        date: "13 mars 2027",
        session: "Quarts & demi-finales",
        time: "19:00 — 22:30",
        title: "Nuit des éliminations",
        body: "Quatre duels en quarts, puis deux demi-finales. Deux finalistes se dégagent.",
        kind: "round",
      },
      {
        label: "Dimanche",
        date: "14 mars 2027",
        session: "Finale",
        time: "20:00 — 22:00",
        title: "Finale",
        body: "Le duel ultime. Un seul restera debout. Trophée, cérémonie, cristallisation du champion 2027.",
        kind: "final",
      },
    ],
  },
  en: {
    eyebrow: "Schedule",
    title: "Three nights. Three arenas. One podium.",
    days: [
      {
        label: "Friday",
        date: "March 12, 2027",
        session: "Round of 16",
        time: "19:00 — 22:30",
        title: "Night of the 16",
        body: "Eight single-elimination duels. Eight pitmasters survive.",
        kind: "round",
      },
      {
        label: "Saturday",
        date: "March 13, 2027",
        session: "Quarters & semis",
        time: "19:00 — 22:30",
        title: "Night of eliminations",
        body: "Four quarter-finals, then two semi-finals. Two finalists emerge.",
        kind: "round",
      },
      {
        label: "Sunday",
        date: "March 14, 2027",
        session: "Final",
        time: "20:00 — 22:00",
        title: "Final",
        body: "The ultimate duel. Only one stands. Trophy, ceremony, 2027 champion crowned.",
        kind: "final",
      },
    ],
  },
  es: {
    eyebrow: "Programa",
    title: "Tres noches. Tres arenas. Un podio.",
    days: [
      { label: "Viernes", date: "12 de marzo 2027", session: "Octavos de final", time: "19:00 — 22:30", title: "Noche de los 16", body: "Ocho duelos a eliminación directa. Ocho pitmasters sobreviven.", kind: "round" },
      { label: "Sábado", date: "13 de marzo 2027", session: "Cuartos & semifinales", time: "19:00 — 22:30", title: "Noche de las eliminaciones", body: "Cuatro cuartos, luego dos semifinales. Dos finalistas emergen.", kind: "round" },
      { label: "Domingo", date: "14 de marzo 2027", session: "Final", time: "20:00 — 22:00", title: "Final", body: "El duelo último. Solo uno queda. Trofeo, ceremonia, campeón 2027 coronado.", kind: "final" },
    ],
  },
  de: {
    eyebrow: "Programm",
    title: "Drei Abende. Drei Arenen. Ein Podium.",
    days: [
      { label: "Freitag", date: "12. März 2027", session: "Achtelfinale", time: "19:00 — 22:30", title: "Nacht der 16", body: "Acht K.O.-Duelle. Acht Pitmaster überleben.", kind: "round" },
      { label: "Samstag", date: "13. März 2027", session: "Viertel- & Halbfinale", time: "19:00 — 22:30", title: "Nacht der Eliminierungen", body: "Vier Viertelfinale, dann zwei Halbfinale. Zwei Finalisten bleiben.", kind: "round" },
      { label: "Sonntag", date: "14. März 2027", session: "Finale", time: "20:00 — 22:00", title: "Finale", body: "Das ultimative Duell. Nur einer bleibt. Trophäe, Zeremonie, Champion 2027 gekrönt.", kind: "final" },
    ],
  },
  nl: {
    eyebrow: "Programma",
    title: "Drie avonden. Drie arena's. Eén podium.",
    days: [
      { label: "Vrijdag", date: "12 maart 2027", session: "Achtste finale", time: "19:00 — 22:30", title: "Nacht van de 16", body: "Acht knock-outduels. Acht pitmasters overleven.", kind: "round" },
      { label: "Zaterdag", date: "13 maart 2027", session: "Kwart- & halve finales", time: "19:00 — 22:30", title: "Nacht van de eliminaties", body: "Vier kwartfinales, dan twee halve finales. Twee finalisten blijven over.", kind: "round" },
      { label: "Zondag", date: "14 maart 2027", session: "Finale", time: "20:00 — 22:00", title: "Finale", body: "Het ultieme duel. Slechts één blijft. Trofee, ceremonie, kampioen 2027.", kind: "final" },
    ],
  },
  pt: {
    eyebrow: "Programa",
    title: "Três noites. Três arenas. Um pódio.",
    days: [
      { label: "Sexta-feira", date: "12 de março 2027", session: "Oitavos de final", time: "19:00 — 22:30", title: "Noite dos 16", body: "Oito duelos de eliminação direta. Oito pitmasters sobrevivem.", kind: "round" },
      { label: "Sábado", date: "13 de março 2027", session: "Quartos & meias-finais", time: "19:00 — 22:30", title: "Noite das eliminações", body: "Quatro quartos, depois duas meias-finais. Dois finalistas emergem.", kind: "round" },
      { label: "Domingo", date: "14 de março 2027", session: "Final", time: "20:00 — 22:00", title: "Final", body: "O duelo supremo. Apenas um fica. Troféu, cerimónia, campeão 2027 coroado.", kind: "final" },
    ],
  },
  it: {
    eyebrow: "Programma",
    title: "Tre serate. Tre arene. Un podio.",
    days: [
      { label: "Venerdì", date: "12 marzo 2027", session: "Ottavi di finale", time: "19:00 — 22:30", title: "Notte dei 16", body: "Otto duelli a eliminazione diretta. Otto pitmaster sopravvivono.", kind: "round" },
      { label: "Sabato", date: "13 marzo 2027", session: "Quarti & semifinali", time: "19:00 — 22:30", title: "Notte delle eliminazioni", body: "Quattro quarti, poi due semifinali. Due finalisti emergono.", kind: "round" },
      { label: "Domenica", date: "14 marzo 2027", session: "Finale", time: "20:00 — 22:00", title: "Finale", body: "Il duello supremo. Ne resta uno. Trofeo, cerimonia, campione 2027 incoronato.", kind: "final" },
    ],
  },
};

export default function BattleSchedule() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-ink-950 py-14 md:py-20 overflow-hidden" aria-label="Battle schedule">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-ember-600/15 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8 md:mb-12">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <h2
          className="text-cream-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold mb-12 md:mb-16 max-w-5xl"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          {ui.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {ui.days.map((d, i) => (
            <div
              key={i}
              className={`relative border rounded-sm p-6 md:p-8 transition-all duration-300 ${
                d.kind === "final"
                  ? "border-gold-500/60 bg-gradient-to-br from-gold-700/20 to-ember-800/10 shadow-[0_0_60px_-20px_rgba(244,173,60,0.5)]"
                  : "border-white/15 bg-white/[0.02] hover:border-gold-500/40"
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                {d.kind === "final" ? (
                  <Award className="w-7 h-7 text-gold-500" strokeWidth={1.8} />
                ) : (
                  <Swords className="w-6 h-6 text-gold-500" strokeWidth={2} />
                )}
                <Flame className="w-5 h-5 text-gold-500/40" strokeWidth={2} />
              </div>

              <div className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-1">
                {d.label}
              </div>
              <div className="text-cream-50/70 text-xs uppercase tracking-widest mb-4">
                {d.date}
              </div>

              <h3
                className="text-cream-50 text-3xl md:text-4xl leading-tight font-bold mb-3"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {d.title}
              </h3>
              <div className="text-gold-500 text-sm font-semibold mb-2">
                {d.session}
              </div>
              <div className="text-cream-50/75 text-sm font-medium tabular-nums mb-5">
                {d.time}
              </div>
              <p className="text-cream-50/75 text-sm leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
