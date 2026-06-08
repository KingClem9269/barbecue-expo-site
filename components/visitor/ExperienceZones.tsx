"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Flame, Utensils, GraduationCap, ShoppingBag, Trophy, ArrowUpRight } from "lucide-react";

/**
 * ExperienceZones — what you actually do on site.
 * B2C-focused. 5 zones of the expo presented with icon + short copy + background photo.
 */

const ZONE_LINKS = [
  "/grill-arena",
  "/exposants",
  "/program/masterclasses",
  "/program/bbq-street-food",
  "/programme",
];

const ZONE_IMAGES = [
  "/photos-2026/zone-grill-arena-2026.jpg",
  "/photos-2026/zone-exposants.jpg",
  "/photos-2026/zone-masterclasses.jpg",
  "/photos-2026/zone-street-food.jpg",
  "/photos-2026/zone-cooking-shows.jpg",
];

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
        title: "Zone Exposants",
        body: "200+ marques internationales. Testez le matériel en conditions réelles. Achat direct possible.",
      },
      {
        title: "Masterclasses",
        body: "12 sessions limitées à 20 places. Immersion intime avec un pitmaster. Il faut s'inscrire tôt.",
      },
      {
        title: "Street Food",
        body: "16 restaurants de rue sélectionnés. La meilleure street food BBQ de Paris concentrée en un lieu.",
      },
      {
        title: "BBQ Libre-Service",
        body: "Allumez votre propre feu. Des postes de cuisson en libre accès pour griller vos produits et tester le matériel sur place.",
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
        title: "Exhibitor Zone",
        body: "200+ international brands. Test the gear in real conditions. Direct purchase possible.",
      },
      {
        title: "Masterclasses",
        body: "12 sessions limited to 20 seats each. Intimate immersion with a pitmaster. Book early.",
      },
      {
        title: "Street Food",
        body: "16 curated street food stands. The best BBQ street food in Paris, concentrated in one place.",
      },
      {
        title: "Self-Service BBQ",
        body: "Fire up your own grill. Self-service cooking stations to grill your products and try the gear on site.",
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
      { title: "Zona Expositores", body: "200+ marcas internacionales. Pruebe el material en condiciones reales. Compra directa posible." },
      { title: "Masterclasses", body: "12 sesiones de 20 plazas. Inmersión íntima con un pitmaster. Reserve temprano." },
      { title: "Street Food", body: "16 puestos de comida callejera seleccionados. Lo mejor del BBQ street food en un solo lugar." },
      { title: "BBQ Autoservicio", body: "Encienda su propio fuego. Puestos de cocción de libre acceso para asar sus productos y probar el material in situ." },
    ],
  },
  de: {
    eyebrow: "Was Sie erleben werden",
    title: "Fünf Zonen, drei Tage, eine Messe.",
    subtitle:
      "Eine Reise für Kenner. Testen, lernen, genießen, kämpfen — und verändert nach Hause gehen.",
    zones: [
      { title: "Grill Arena", body: "Internationale Pitmaster treten in Live-Battles gegeneinander an. Jeden Abend ein Champion." },
      { title: "Aussteller-Zone", body: "200+ internationale Marken. Testen Sie die Ausrüstung unter realen Bedingungen." },
      { title: "Masterclasses", body: "12 Sessions mit je 20 Plätzen. Intime Immersion mit einem Pitmaster. Früh buchen." },
      { title: "Street Food", body: "16 ausgewählte Street-Food-Stände. Das beste BBQ-Street-Food in Paris, an einem Ort." },
      { title: "Self-Service-BBQ", body: "Entfachen Sie Ihr eigenes Feuer. Frei zugängliche Grillstationen, um Ihre Produkte zu grillen und die Ausrüstung vor Ort zu testen." },
    ],
  },
  nl: {
    eyebrow: "Wat u gaat beleven",
    title: "Vijf zones, drie dagen, één beurs.",
    subtitle:
      "Een parcours ontworpen voor kenners. Test, leer, proef, strijd — en ga veranderd naar huis.",
    zones: [
      { title: "Grill Arena", body: "Internationale pitmasters strijden live tegen elkaar. Elke avond een kampioen." },
      { title: "Exposantenzone", body: "200+ internationale merken. Test het materiaal onder echte omstandigheden. Directe aankoop mogelijk." },
      { title: "Masterclasses", body: "12 sessies met 20 plaatsen. Intieme onderdompeling met een pitmaster. Boek vroeg." },
      { title: "Street Food", body: "16 geselecteerde street food-kraampjes. De beste BBQ-street-food van Parijs op één plek." },
      { title: "Zelfbedienings-BBQ", body: "Steek je eigen vuur aan. Vrij toegankelijke kookposten om je producten te grillen en het materiaal ter plaatse te testen." },
    ],
  },
  pt: {
    eyebrow: "O que vai viver",
    title: "Cinco zonas, três dias, uma só feira.",
    subtitle:
      "Um percurso pensado para os conhecedores. Teste, aprenda, deguste, compita e saia transformado.",
    zones: [
      { title: "Grill Arena", body: "Pitmasters internacionais enfrentam-se em battles em direto. Um campeão cada noite." },
      { title: "Zona Expositores", body: "200+ marcas internacionais. Teste o material em condições reais. Compra direta possível." },
      { title: "Masterclasses", body: "12 sessões com 20 lugares cada. Imersão íntima com um pitmaster. Reserve cedo." },
      { title: "Street Food", body: "16 bancas selecionadas. A melhor street food BBQ de Paris num só lugar." },
      { title: "BBQ Self-Service", body: "Acenda o seu próprio fogo. Postos de cozedura de livre acesso para grelhar os seus produtos e testar o material no local." },
    ],
  },
  it: {
    eyebrow: "Cosa vivrai",
    title: "Cinque zone, tre giorni, una sola fiera.",
    subtitle:
      "Un percorso pensato per i conoscitori. Provate, imparate, degustate, sfidatevi — e uscite cambiati.",
    zones: [
      { title: "Grill Arena", body: "Pitmaster internazionali si sfidano in battle dal vivo. Un campione ogni sera." },
      { title: "Zona Espositori", body: "200+ marchi internazionali. Testate il materiale in condizioni reali. Acquisto diretto possibile." },
      { title: "Masterclasses", body: "12 sessioni da 20 posti. Immersione intima con un pitmaster. Prenotate presto." },
      { title: "Street Food", body: "16 bancarelle selezionate. Il meglio del BBQ street food di Parigi in un solo posto." },
      { title: "BBQ Self-Service", body: "Accendi il tuo fuoco. Postazioni di cottura ad accesso libero per grigliare i tuoi prodotti e provare l'attrezzatura sul posto." },
    ],
  },
};

const ICONS = [Trophy, ShoppingBag, GraduationCap, Utensils, Flame];

export default function ExperienceZones() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-cream-50 py-14 md:py-20 lg:py-24" aria-label="Experience zones">
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
              <Link
                key={i}
                href={ZONE_LINKS[i]}
                className={`${span} group relative overflow-hidden text-cream-50 rounded-sm min-h-[280px] md:min-h-[320px] flex flex-col justify-end`}
              >
                {/* Background photo */}
                <Image
                  src={ZONE_IMAGES[i]}
                  alt=""
                  fill
                  sizes={i < 2 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 33vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" aria-hidden="true" />

                {/* Content */}
                <div className="relative p-6 md:p-8 lg:p-10 flex flex-col gap-3">
                  <div className="flex items-center justify-between mb-1">
                    <Icon className="w-7 h-7 text-gold-500" strokeWidth={1.8} />
                    <ArrowUpRight
                      className="w-5 h-5 text-cream-50/40 group-hover:text-gold-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </div>
                  <h3
                    className="text-2xl md:text-3xl lg:text-4xl leading-tight font-bold"
                    style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                  >
                    {z.title}
                  </h3>
                  <p className="text-cream-50/85 text-base leading-relaxed">
                    {z.body}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
