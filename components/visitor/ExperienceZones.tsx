"use client";
import { useLocale } from "next-intl";
import { Flame, Utensils, GraduationCap, ShoppingBag, Trophy } from "lucide-react";

/**
 * ExperienceZones — what you actually do on site.
 * B2C-focused. 5 zones of the expo presented with icon + short copy.
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    zones: { title: string; body: string }[];
  }
> = {
  fr: {
    eyebrow: "Ce que vous y ferez",
    title: "Cinq zones, trois jours, un seul salon.",
    subtitle:
      "Un parcours pensé pour les connaisseurs. Testez, apprenez, dégustez, affrontez-vous et repartez changés.",
    zones: [
      {
        title: "Grill Arena",
        body: "Des pitmasters internationaux s'affrontent en battles live. Un champion couronné chaque soir.",
      },
      {
        title: "Cooking Shows",
        body: "Démonstrations sur grande scène. Techniques, gestes, recettes signature — par les meilleurs.",
      },
      {
        title: "Masterclasses",
        body: "12 sessions limitées à 20 places. Immersion intime avec un pitmaster. Il faut s'inscrire tôt.",
      },
      {
        title: "Street Food",
        body: "14 restaurants de rue sélectionnés. La meilleure street food BBQ de Paris concentrée en un lieu.",
      },
      {
        title: "Zone Exposants",
        body: "250 marques internationales. Testez le matériel en conditions réelles. Achat direct possible.",
      },
    ],
  },
  en: {
    eyebrow: "What you'll experience",
    title: "Five zones, three days, one show.",
    subtitle:
      "A journey designed for tastemakers. Test, learn, taste, compete, and leave changed.",
    zones: [
      {
        title: "Grill Arena",
        body: "International pitmasters face off in live battles. One champion crowned each night.",
      },
      {
        title: "Cooking Shows",
        body: "Main stage demonstrations. Techniques, moves, signature recipes — by the very best.",
      },
      {
        title: "Masterclasses",
        body: "12 sessions limited to 20 seats each. Intimate immersion with a pitmaster. Book early.",
      },
      {
        title: "Street Food",
        body: "14 curated street food stands. The best BBQ street food in Paris, concentrated in one place.",
      },
      {
        title: "Exhibitor Zone",
        body: "250 international brands. Test the gear in real conditions. Direct purchase possible.",
      },
    ],
  },
  es: {
    eyebrow: "Lo que vivirá",
    title: "Cinco zonas, tres días, una sola feria.",
    subtitle:
      "Un recorrido pensado para los conocedores. Pruebe, aprenda, deguste, compita y salga transformado.",
    zones: [
      { title: "Grill Arena", body: "Pitmasters internacionales se enfrentan en battles en directo. Un campeón cada noche." },
      { title: "Cooking Shows", body: "Demos en gran escena. Técnicas, gestos, recetas firma — por los mejores." },
      { title: "Masterclasses", body: "12 sesiones de 20 plazas. Inmersión íntima con un pitmaster. Reserve temprano." },
      { title: "Street Food", body: "14 puestos de comida callejera seleccionados. Lo mejor del BBQ street food en un solo lugar." },
      { title: "Zona Expositores", body: "250 marcas internacionales. Pruebe el material en condiciones reales. Compra directa posible." },
    ],
  },
  de: {
    eyebrow: "Was Sie erleben werden",
    title: "Fünf Zonen, drei Tage, eine Messe.",
    subtitle:
      "Eine Reise für Kenner. Testen, lernen, genießen, kämpfen — und verändert nach Hause gehen.",
    zones: [
      { title: "Grill Arena", body: "Internationale Pitmaster treten in Live-Battles gegeneinander an. Jeden Abend ein Champion." },
      { title: "Cooking Shows", body: "Demos auf der großen Bühne. Techniken, Handgriffe, Signature-Rezepte — von den Besten." },
      { title: "Masterclasses", body: "12 Sessions mit je 20 Plätzen. Intime Immersion mit einem Pitmaster. Früh buchen." },
      { title: "Street Food", body: "14 ausgewählte Street-Food-Stände. Das beste BBQ-Street-Food in Paris, an einem Ort." },
      { title: "Aussteller-Zone", body: "250 internationale Marken. Testen Sie die Ausrüstung unter realen Bedingungen." },
    ],
  },
  nl: {
    eyebrow: "Wat u gaat beleven",
    title: "Vijf zones, drie dagen, één beurs.",
    subtitle:
      "Een parcours ontworpen voor kenners. Test, leer, proef, strijd — en ga veranderd naar huis.",
    zones: [
      { title: "Grill Arena", body: "Internationale pitmasters strijden live tegen elkaar. Elke avond een kampioen." },
      { title: "Cooking Shows", body: "Demonstraties op het hoofdpodium. Technieken, gebaren, signature-recepten — van de besten." },
      { title: "Masterclasses", body: "12 sessies met 20 plaatsen. Intieme onderdompeling met een pitmaster. Boek vroeg." },
      { title: "Street Food", body: "14 geselecteerde street food-kraampjes. De beste BBQ-street-food van Parijs op één plek." },
      { title: "Exposantenzone", body: "250 internationale merken. Test het materiaal onder echte omstandigheden. Directe aankoop mogelijk." },
    ],
  },
  pt: {
    eyebrow: "O que vai viver",
    title: "Cinco zonas, três dias, uma só feira.",
    subtitle:
      "Um percurso pensado para os conhecedores. Teste, aprenda, deguste, compita e saia transformado.",
    zones: [
      { title: "Grill Arena", body: "Pitmasters internacionais enfrentam-se em battles em direto. Um campeão cada noite." },
      { title: "Cooking Shows", body: "Demos em grande palco. Técnicas, gestos, receitas assinatura — pelos melhores." },
      { title: "Masterclasses", body: "12 sessões com 20 lugares cada. Imersão íntima com um pitmaster. Reserve cedo." },
      { title: "Street Food", body: "14 bancas selecionadas. A melhor street food BBQ de Paris num só lugar." },
      { title: "Zona Expositores", body: "250 marcas internacionais. Teste o material em condições reais. Compra direta possível." },
    ],
  },
  it: {
    eyebrow: "Cosa vivrai",
    title: "Cinque zone, tre giorni, una sola fiera.",
    subtitle:
      "Un percorso pensato per i conoscitori. Provate, imparate, degustate, sfidatevi — e uscite cambiati.",
    zones: [
      { title: "Grill Arena", body: "Pitmaster internazionali si sfidano in battle dal vivo. Un campione ogni sera." },
      { title: "Cooking Shows", body: "Demo sul grande palco. Tecniche, gesti, ricette signature — dai migliori." },
      { title: "Masterclasses", body: "12 sessioni da 20 posti. Immersione intima con un pitmaster. Prenotate presto." },
      { title: "Street Food", body: "14 bancarelle selezionate. Il meglio del BBQ street food di Parigi in un solo posto." },
      { title: "Zona Espositori", body: "250 marchi internazionali. Testate il materiale in condizioni reali. Acquisto diretto possibile." },
    ],
  },
};

const ICONS = [Trophy, Flame, GraduationCap, Utensils, ShoppingBag];

export default function ExperienceZones() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-cream-50 py-24 md:py-32 lg:py-40" aria-label="Experience zones">
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

        {/* 5-zone grid: 2 cols on md, 3 on lg (last one spans 2 on lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6">
          {ui.zones.map((z, i) => {
            const Icon = ICONS[i % ICONS.length];
            // First two cards span 3 cols on lg, last three span 2
            const span = i < 2 ? "lg:col-span-3" : "lg:col-span-2";
            return (
              <div
                key={i}
                className={`${span} bg-ink-950 text-cream-50 rounded-sm p-6 md:p-8 lg:p-10 flex flex-col gap-4 hover:bg-char-900 transition-colors`}
              >
                <Icon className="w-7 h-7 text-gold-500" strokeWidth={1.8} />
                <h3
                  className="text-2xl md:text-3xl lg:text-4xl leading-tight font-bold"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {z.title}
                </h3>
                <p className="text-cream-50/80 text-base leading-relaxed">
                  {z.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
