"use client";
import { useLocale } from "next-intl";
import { Clock, Beef, Users, Trophy } from "lucide-react";

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    rules: { title: string; body: string }[];
  }
> = {
  fr: {
    eyebrow: "La mécanique",
    title: "16 pitmasters. 4 manches. Un champion.",
    subtitle:
      "Chaque battle oppose deux pitmasters pendant 90 minutes. Mêmes braises, même viande, même temps. Le jury note à l'aveugle sur goût, cuisson, originalité. Bracket à élimination directe.",
    rules: [
      { title: "90 minutes", body: "Le temps imparti pour cuire, dresser, servir. Pas une seconde de plus." },
      { title: "Viande imposée", body: "Une seule pièce, identique pour tous, révélée 60 secondes avant le top départ." },
      { title: "Jury de 6 experts", body: "Chefs, pitmasters, critiques. Notation à l'aveugle sur 30 points." },
      { title: "Bracket à 16", body: "Huit duels en huitièmes, puis quarts, demi-finales, finale. Trois jours, un seul champion." },
    ],
  },
  en: {
    eyebrow: "The format",
    title: "16 pitmasters. 4 rounds. One champion.",
    subtitle:
      "Each battle pairs two pitmasters for 90 minutes. Same embers, same meat, same time. The jury scores blind on taste, cook, originality. Single-elimination bracket.",
    rules: [
      { title: "90 minutes", body: "The time to cook, plate, serve. Not a second more." },
      { title: "Imposed cut", body: "One cut, identical for all, revealed 60 seconds before start." },
      { title: "6-expert jury", body: "Chefs, pitmasters, critics. Blind scoring out of 30 points." },
      { title: "16-bracket", body: "Eight round-of-16 duels, then quarters, semis, finals. Three days, one champion." },
    ],
  },
  es: {
    eyebrow: "La mecánica",
    title: "16 pitmasters. 4 rondas. Un campeón.",
    subtitle:
      "Cada battle enfrenta a dos pitmasters durante 90 minutos. Mismas brasas, misma carne, mismo tiempo. El jurado evalúa a ciegas sobre sabor, cocción, originalidad. Bracket de eliminación directa.",
    rules: [
      { title: "90 minutos", body: "El tiempo para cocinar, emplatar, servir. Ni un segundo más." },
      { title: "Carne impuesta", body: "Una sola pieza, idéntica para todos, revelada 60 segundos antes del inicio." },
      { title: "Jurado de 6 expertos", body: "Chefs, pitmasters, críticos. Puntuación a ciegas sobre 30 puntos." },
      { title: "Bracket de 16", body: "Ocho duelos en octavos, luego cuartos, semifinales, final. Tres días, un campeón." },
    ],
  },
  de: {
    eyebrow: "Die Mechanik",
    title: "16 Pitmaster. 4 Runden. Ein Champion.",
    subtitle:
      "Jede Battle stellt zwei Pitmaster 90 Minuten lang gegenüber. Gleiche Glut, gleiches Fleisch, gleiche Zeit. Die Jury bewertet blind nach Geschmack, Garung, Originalität. K.O.-System.",
    rules: [
      { title: "90 Minuten", body: "Die Zeit zum Kochen, Anrichten, Servieren. Keine Sekunde mehr." },
      { title: "Vorgegebenes Fleisch", body: "Ein Stück, identisch für alle, 60 Sekunden vor Start enthüllt." },
      { title: "Jury aus 6 Experten", body: "Köche, Pitmaster, Kritiker. Blindbewertung über 30 Punkte." },
      { title: "16er-Bracket", body: "Acht Achtelfinal-Duelle, dann Viertel-, Halbfinale, Finale. Drei Tage, ein Champion." },
    ],
  },
  nl: {
    eyebrow: "De mechaniek",
    title: "16 pitmasters. 4 rondes. Eén kampioen.",
    subtitle:
      "Elke battle zet twee pitmasters 90 minuten tegenover elkaar. Dezelfde gloed, hetzelfde vlees, dezelfde tijd. De jury scoort blind op smaak, bereiding, originaliteit. Knock-outsysteem.",
    rules: [
      { title: "90 minuten", body: "De tijd om te koken, op te maken, te serveren. Geen seconde meer." },
      { title: "Opgelegd stuk vlees", body: "Eén stuk, identiek voor iedereen, 60 seconden voor start onthuld." },
      { title: "Jury van 6 experts", body: "Chefs, pitmasters, critici. Blinde scoring op 30 punten." },
      { title: "16-bracket", body: "Acht achtste-finale-duels, dan kwart-, halve-, finale. Drie dagen, één kampioen." },
    ],
  },
  pt: {
    eyebrow: "A mecânica",
    title: "16 pitmasters. 4 rondas. Um campeão.",
    subtitle:
      "Cada battle opõe dois pitmasters durante 90 minutos. Mesmas brasas, mesma carne, mesmo tempo. O júri avalia às cegas em sabor, cozedura, originalidade. Eliminatória direta.",
    rules: [
      { title: "90 minutos", body: "O tempo para cozinhar, emprata, servir. Nem um segundo a mais." },
      { title: "Carne imposta", body: "Uma só peça, idêntica para todos, revelada 60 segundos antes do início." },
      { title: "Júri de 6 especialistas", body: "Chefs, pitmasters, críticos. Avaliação às cegas sobre 30 pontos." },
      { title: "Bracket de 16", body: "Oito duelos em oitavos, depois quartos, meias, final. Três dias, um campeão." },
    ],
  },
  it: {
    eyebrow: "La meccanica",
    title: "16 pitmaster. 4 round. Un campione.",
    subtitle:
      "Ogni battle oppone due pitmaster per 90 minuti. Stesse braci, stessa carne, stesso tempo. La giuria valuta alla cieca su gusto, cottura, originalità. Eliminazione diretta.",
    rules: [
      { title: "90 minuti", body: "Il tempo per cucinare, impiattare, servire. Non un secondo di più." },
      { title: "Carne imposta", body: "Un solo taglio, identico per tutti, rivelato 60 secondi prima del via." },
      { title: "Giuria di 6 esperti", body: "Chef, pitmaster, critici. Valutazione alla cieca su 30 punti." },
      { title: "Bracket a 16", body: "Otto duelli in ottavi, poi quarti, semifinali, finale. Tre giorni, un campione." },
    ],
  },
};

const ICONS = [Clock, Beef, Users, Trophy];

export default function BattleFormat() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-cream-50 py-24 md:py-32" aria-label="Battle format">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8 md:mb-12">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {ui.rules.map((r, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={i}
                className="border border-ink-900/15 bg-cream-100 rounded-sm p-6 md:p-8 hover:border-gold-500/50 transition-colors"
              >
                <Icon className="w-6 h-6 text-gold-600 mb-5" strokeWidth={2} />
                <h3
                  className="text-ink-900 text-xl md:text-2xl leading-tight font-bold mb-3"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {r.title}
                </h3>
                <p className="text-ink-600 text-sm md:text-base leading-relaxed">
                  {r.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
