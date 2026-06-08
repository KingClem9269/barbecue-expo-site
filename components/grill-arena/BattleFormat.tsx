"use client";
import { useLocale } from "next-intl";
import { Clock, Package, Users, CalendarDays } from "lucide-react";

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
    eyebrow: "Le format",
    title: "16 pitmasters pour des shows spectaculaires.",
    subtitle:
      "Chaque session oppose des pitmasters internationaux pendant 60 minutes. Mystery box, jury d'experts, 16 sessions sur 3 jours. Du spectacle, du goût, de l'adrénaline.",
    rules: [
      { title: "60 minutes", body: "Le temps imparti pour cuire, dresser, servir. Pas une seconde de plus." },
      { title: "Mystery box", body: "Ingrédients surprise révélés au dernier moment. Créativité et maîtrise du feu à l'épreuve." },
      { title: "Jury d'experts", body: "Chefs, pitmasters, critiques gastronomiques. Notation à l'aveugle sur goût, cuisson, originalité." },
      { title: "16 sessions", body: "16 sessions réparties sur 3 jours. Du vendredi au dimanche, le feu ne s'éteint jamais." },
    ],
  },
  en: {
    eyebrow: "The format",
    title: "16 pitmasters for spectacular shows.",
    subtitle:
      "Each session features international pitmasters for 60 minutes. Mystery box, expert jury, 16 sessions over 3 days. Spectacle, flavour, adrenaline.",
    rules: [
      { title: "60 minutes", body: "The time to cook, plate, serve. Not a second more." },
      { title: "Mystery box", body: "Surprise ingredients revealed at the last moment. Creativity and fire mastery put to the test." },
      { title: "Expert jury", body: "Chefs, pitmasters, food critics. Blind scoring on taste, cook, originality." },
      { title: "16 sessions", body: "16 sessions spread over 3 days. From Friday to Sunday, the fire never goes out." },
    ],
  },
  es: {
    eyebrow: "El formato",
    title: "16 pitmasters para shows espectaculares.",
    subtitle:
      "Cada sesión enfrenta a pitmasters internacionales durante 60 minutos. Mystery box, jurado de expertos, 16 sesiones en 3 días. Espectáculo, sabor, adrenalina.",
    rules: [
      { title: "60 minutos", body: "El tiempo para cocinar, emplatar, servir. Ni un segundo más." },
      { title: "Mystery box", body: "Ingredientes sorpresa revelados en el último momento. Creatividad y dominio del fuego a prueba." },
      { title: "Jurado de expertos", body: "Chefs, pitmasters, críticos. Puntuación a ciegas sobre sabor, cocción, originalidad." },
      { title: "16 sesiones", body: "16 sesiones repartidas en 3 días. De viernes a domingo, el fuego nunca se apaga." },
    ],
  },
  de: {
    eyebrow: "Das Format",
    title: "16 Pitmaster für spektakuläre Shows.",
    subtitle:
      "Jede Session stellt internationale Pitmaster 60 Minuten lang gegenüber. Mystery Box, Experten-Jury, 16 Sessions an 3 Tagen. Spektakel, Geschmack, Adrenalin.",
    rules: [
      { title: "60 Minuten", body: "Die Zeit zum Kochen, Anrichten, Servieren. Keine Sekunde mehr." },
      { title: "Mystery Box", body: "Überraschungszutaten im letzten Moment enthüllt. Kreativität und Feuerbeherrschung auf dem Prüfstand." },
      { title: "Experten-Jury", body: "Köche, Pitmaster, Kritiker. Blindbewertung nach Geschmack, Garung, Originalität." },
      { title: "16 Sessions", body: "16 Sessions über 3 Tage verteilt. Von Freitag bis Sonntag, das Feuer erlischt nie." },
    ],
  },
  nl: {
    eyebrow: "Het formaat",
    title: "16 pitmasters voor spectaculaire shows.",
    subtitle:
      "Elke sessie zet internationale pitmasters 60 minuten tegenover elkaar. Mystery box, expertjury, 16 sessies over 3 dagen. Spektakel, smaak, adrenaline.",
    rules: [
      { title: "60 minuten", body: "De tijd om te koken, op te maken, te serveren. Geen seconde meer." },
      { title: "Mystery box", body: "Verrassingsingrediënten op het laatste moment onthuld. Creativiteit en vuurbeheersing op de proef." },
      { title: "Expertjury", body: "Chefs, pitmasters, critici. Blinde scoring op smaak, bereiding, originaliteit." },
      { title: "16 sessies", body: "16 sessies verdeeld over 3 dagen. Van vrijdag tot zondag, het vuur gaat nooit uit." },
    ],
  },
  pt: {
    eyebrow: "O formato",
    title: "16 pitmasters para shows espetaculares.",
    subtitle:
      "Cada sessão opõe pitmasters internacionais durante 60 minutos. Mystery box, júri de especialistas, 16 sessões em 3 dias. Espetáculo, sabor, adrenalina.",
    rules: [
      { title: "60 minutos", body: "O tempo para cozinhar, empratar, servir. Nem um segundo a mais." },
      { title: "Mystery box", body: "Ingredientes surpresa revelados no último momento. Criatividade e domínio do fogo à prova." },
      { title: "Júri de especialistas", body: "Chefs, pitmasters, críticos. Avaliação às cegas em sabor, cozedura, originalidade." },
      { title: "16 sessões", body: "16 sessões repartidas por 3 dias. De sexta a domingo, o fogo nunca se apaga." },
    ],
  },
  it: {
    eyebrow: "Il formato",
    title: "16 pitmaster per show spettacolari.",
    subtitle:
      "Ogni sessione vede pitmaster internazionali sfidarsi per 60 minuti. Mystery box, giuria di esperti, 16 sessioni in 3 giorni. Spettacolo, gusto, adrenalina.",
    rules: [
      { title: "60 minuti", body: "Il tempo per cucinare, impiattare, servire. Non un secondo di più." },
      { title: "Mystery box", body: "Ingredienti a sorpresa rivelati all'ultimo momento. Creatività e padronanza del fuoco alla prova." },
      { title: "Giuria di esperti", body: "Chef, pitmaster, critici. Valutazione alla cieca su gusto, cottura, originalità." },
      { title: "16 sessioni", body: "16 sessioni distribuite su 3 giorni. Dal venerdì alla domenica, il fuoco non si spegne mai." },
    ],
  },
};

const ICONS = [Clock, Package, Users, CalendarDays];

export default function BattleFormat() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-cream-50 py-14 md:py-20" aria-label="Battle format">
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
