import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Flame, Trophy, GraduationCap, Utensils } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";

type Slot = {
  time: string;
  title: string;
  type: "masterclass" | "cooking-show" | "grill-arena" | "street-food";
  who?: string;
  zone: string;
};

type Day = {
  label: string;
  date: string;
  slots: Slot[];
};

const FR_DAYS: Day[] = [
  {
    label: "Vendredi",
    date: "12 mars 2027",
    slots: [
      { time: "10:30", title: "Yakitori fondamentaux", type: "masterclass", who: "Takumi Ishida", zone: "Espace Masterclass" },
      { time: "11:00", title: "BBQ à la française", type: "cooking-show", who: "Le Barbecue de Rafa", zone: "Main Stage" },
      { time: "12:00", title: "Légumes au feu vif", type: "masterclass", who: "Genevieve Taylor", zone: "Espace Masterclass" },
      { time: "13:30", title: "Chuletón basque", type: "masterclass", who: "Carmen Sánchez", zone: "Espace Masterclass" },
      { time: "14:00", title: "L'art du brisket parfait", type: "masterclass", who: "David W. Olson", zone: "Espace Masterclass" },
      { time: "15:00", title: "Saumon fumé au genévrier", type: "masterclass", who: "Lars Andersen", zone: "Espace Masterclass" },
      { time: "15:30", title: "Kamado temperature mastery", type: "masterclass", who: "Eric Gephart", zone: "Espace Masterclass" },
      { time: "16:00", title: "Competition mindset", type: "masterclass", who: "Diva Q Bennett", zone: "Espace Masterclass" },
      { time: "17:00", title: "Churrasco completo", type: "cooking-show", who: "Rafael Costa", zone: "Main Stage" },
      { time: "18:00", title: "Bistecca alla Fiorentina", type: "cooking-show", who: "Alessandro Romano", zone: "Main Stage" },
      { time: "19:00", title: "Grill Arena · Round of 16", type: "grill-arena", zone: "Arena" },
    ],
  },
  {
    label: "Samedi",
    date: "13 mars 2027",
    slots: [
      { time: "10:00", title: "Brace siciliana", type: "cooking-show", who: "Isabella Rossi", zone: "Main Stage" },
      { time: "10:30", title: "Low & slow on kamado", type: "cooking-show", who: "Eric Gephart", zone: "Main Stage" },
      { time: "11:00", title: "Ribeye au feu ouvert", type: "cooking-show", who: "The Barbecue Dude", zone: "Main Stage" },
      { time: "11:30", title: "Maquereau fumé minute", type: "cooking-show", who: "Tom de Vries", zone: "Main Stage" },
      { time: "12:30", title: "Asado de tira", type: "masterclass", who: "Javier Herrera", zone: "Espace Masterclass" },
      { time: "13:30", title: "Charcuterie fumée en 48h", type: "masterclass", who: "Chef Carlos Bear", zone: "Espace Masterclass" },
      { time: "14:00", title: "Battle Amérique du Nord", type: "grill-arena", who: "Diva Q vs The Barbecue Dude", zone: "Arena" },
      { time: "15:00", title: "Dry-aged mastery", type: "masterclass", who: "Camillo Tomanek", zone: "Espace Masterclass" },
      { time: "16:00", title: "Korean BBQ live", type: "cooking-show", who: "Min-joon Park", zone: "Main Stage" },
      { time: "16:30", title: "Battle Texas vs Europe", type: "grill-arena", who: "David W. Olson vs Camillo Tomanek", zone: "Arena" },
      { time: "17:00", title: "Whole fish live-fire", type: "cooking-show", who: "Genevieve Taylor", zone: "Main Stage" },
      { time: "18:30", title: "Binchōtan démonstration", type: "cooking-show", who: "Takumi Ishida", zone: "Main Stage" },
      { time: "19:00", title: "Battle Amériques", type: "grill-arena", who: "Rafael Costa vs Javier Herrera", zone: "Arena" },
    ],
  },
  {
    label: "Dimanche",
    date: "14 mars 2027",
    slots: [
      { time: "10:30", title: "Saucisse artisanale", type: "masterclass", who: "Alex Mueller", zone: "Espace Masterclass" },
      { time: "11:30", title: "Souvlaki & feu de bois", type: "cooking-show", who: "Stefanos Koukas", zone: "Main Stage" },
      { time: "12:00", title: "Galbi & marinades", type: "masterclass", who: "Min-joon Park", zone: "Espace Masterclass" },
      { time: "13:00", title: "Viandes & marinades", type: "masterclass", who: "Le Barbecue de Rafa", zone: "Espace Masterclass" },
      { time: "13:30", title: "Fusion BBQ Europe", type: "cooking-show", who: "Mathilde Laurent", zone: "Main Stage" },
      { time: "14:30", title: "Battle steakhouse", type: "grill-arena", zone: "Arena" },
      { time: "15:00", title: "Wood selection & smoke control", type: "masterclass", who: "The Barbecue Dude", zone: "Espace Masterclass" },
      { time: "16:00", title: "Battle Amérique latine", type: "grill-arena", who: "Javier Herrera (titulaire)", zone: "Arena" },
      { time: "20:00", title: "Grand Final · Grill Arena", type: "grill-arena", zone: "Arena" },
    ],
  },
];

type Loc = "en" | "es" | "de" | "nl" | "pt" | "it";

/** Traductions des titres de sessions (clé = titre FR). Les titres déjà en
 *  anglais ou qui sont des noms propres / plats restent tels quels. */
const TITLE_T: Record<string, Record<Loc, string>> = {
  "Yakitori fondamentaux": { en: "Yakitori fundamentals", es: "Fundamentos del yakitori", de: "Yakitori-Grundlagen", nl: "Yakitori-basis", pt: "Fundamentos do yakitori", it: "Fondamenti dello yakitori" },
  "BBQ à la française": { en: "French-style BBQ", es: "BBQ a la francesa", de: "BBQ auf französische Art", nl: "BBQ op z'n Frans", pt: "BBQ à francesa", it: "BBQ alla francese" },
  "Légumes au feu vif": { en: "Vegetables over high heat", es: "Verduras a fuego vivo", de: "Gemüse über offener Flamme", nl: "Groenten op hoog vuur", pt: "Legumes em fogo vivo", it: "Verdure a fiamma viva" },
  "Chuletón basque": { en: "Basque chuletón", es: "Chuletón vasco", de: "Baskisches Chuletón", nl: "Baskische chuletón", pt: "Chuletón basco", it: "Chuletón basco" },
  "L'art du brisket parfait": { en: "The art of the perfect brisket", es: "El arte del brisket perfecto", de: "Die Kunst des perfekten Briskets", nl: "De kunst van de perfecte brisket", pt: "A arte do brisket perfeito", it: "L'arte del brisket perfetto" },
  "Saumon fumé au genévrier": { en: "Juniper-smoked salmon", es: "Salmón ahumado al enebro", de: "Mit Wacholder geräucherter Lachs", nl: "Met jeneverbes gerookte zalm", pt: "Salmão fumado com zimbro", it: "Salmone affumicato al ginepro" },
  "Ribeye au feu ouvert": { en: "Open-fire ribeye", es: "Ribeye a fuego abierto", de: "Ribeye über offenem Feuer", nl: "Ribeye op open vuur", pt: "Ribeye em fogo aberto", it: "Ribeye a fuoco aperto" },
  "Maquereau fumé minute": { en: "Quick-smoked mackerel", es: "Caballa ahumada al momento", de: "Schnell geräucherte Makrele", nl: "Snelgerookte makreel", pt: "Cavala fumada na hora", it: "Sgombro affumicato al momento" },
  "Charcuterie fumée en 48h": { en: "48-hour smoked charcuterie", es: "Embutidos ahumados en 48 h", de: "Geräucherte Wurstwaren in 48 Std.", nl: "Gerookte charcuterie in 48 uur", pt: "Charcutaria fumada em 48 h", it: "Salumi affumicati in 48 ore" },
  "Battle Amérique du Nord": { en: "North America battle", es: "Battle Norteamérica", de: "Battle Nordamerika", nl: "Battle Noord-Amerika", pt: "Battle América do Norte", it: "Battle Nord America" },
  "Binchōtan démonstration": { en: "Binchōtan demonstration", es: "Demostración de binchōtan", de: "Binchōtan-Vorführung", nl: "Binchōtan-demonstratie", pt: "Demonstração de binchōtan", it: "Dimostrazione di binchōtan" },
  "Battle Amériques": { en: "Americas battle", es: "Battle Américas", de: "Battle Amerikas", nl: "Battle Amerika's", pt: "Battle Américas", it: "Battle Americhe" },
  "Saucisse artisanale": { en: "Artisan sausage", es: "Salchicha artesanal", de: "Handwerkliche Wurst", nl: "Ambachtelijke worst", pt: "Salsicha artesanal", it: "Salsiccia artigianale" },
  "Souvlaki & feu de bois": { en: "Souvlaki & wood fire", es: "Souvlaki y fuego de leña", de: "Souvlaki & Holzfeuer", nl: "Souvlaki & houtvuur", pt: "Souvlaki e fogo de lenha", it: "Souvlaki e fuoco di legna" },
  "Galbi & marinades": { en: "Galbi & marinades", es: "Galbi y marinadas", de: "Galbi & Marinaden", nl: "Galbi & marinades", pt: "Galbi e marinadas", it: "Galbi e marinate" },
  "Viandes & marinades": { en: "Meats & marinades", es: "Carnes y marinadas", de: "Fleisch & Marinaden", nl: "Vlees & marinades", pt: "Carnes e marinadas", it: "Carni e marinate" },
  "Battle Amérique latine": { en: "Latin America battle", es: "Battle Latinoamérica", de: "Battle Lateinamerika", nl: "Battle Latijns-Amerika", pt: "Battle América Latina", it: "Battle America Latina" },
  "Javier Herrera (titulaire)": { en: "Javier Herrera (defending champion)", es: "Javier Herrera (campeón vigente)", de: "Javier Herrera (Titelverteidiger)", nl: "Javier Herrera (titelverdediger)", pt: "Javier Herrera (atual campeão)", it: "Javier Herrera (campione in carica)" },
  "Espace Masterclass": { en: "Masterclass Area", es: "Espacio Masterclass", de: "Masterclass-Bereich", nl: "Masterclass-ruimte", pt: "Espaço Masterclass", it: "Spazio Masterclass" },
};

function tr(text: string | undefined, locale: string): string | undefined {
  if (!text) return text;
  return TITLE_T[text]?.[locale as Loc] ?? text;
}

const UI: Record<string, {
  days: [string, string][];
  eyebrow: string; h1: string; intro: string; cta1: string; cta2: string;
  metaTitle: string; metaDesc: string;
}> = {
  fr: {
    days: [["Vendredi", "12 mars 2027"], ["Samedi", "13 mars 2027"], ["Dimanche", "14 mars 2027"]],
    eyebrow: "Édition 2027 · 12–14 mars",
    h1: "Le programme.",
    intro: "Trois jours, trois scènes, plus de trente sessions. Vingt pitmasters. Douze masterclasses limitées à vingt places. Soirées Grill Arena en battle live. Voici tout, à l'heure près.",
    cta1: "Réserver ma place",
    cta2: "Tout savoir sur Grill Arena",
    metaTitle: "Programme — Barbecue Expo 2027",
    metaDesc: "Le programme complet des trois jours : 12 masterclasses, cooking shows sur le main stage, Grill Arena en soirée, restauration street food.",
  },
  en: {
    days: [["Friday", "March 12, 2027"], ["Saturday", "March 13, 2027"], ["Sunday", "March 14, 2027"]],
    eyebrow: "2027 Edition · March 12–14",
    h1: "The programme.",
    intro: "Three days, three stages, more than thirty sessions. Twenty pitmasters. Twelve masterclasses limited to twenty places. Grill Arena evenings with live battles. Here's everything, down to the hour.",
    cta1: "Book my place",
    cta2: "All about Grill Arena",
    metaTitle: "Programme — Barbecue Expo 2027",
    metaDesc: "The full three-day programme: 12 masterclasses, cooking shows on the main stage, Grill Arena in the evening, street food.",
  },
  es: {
    days: [["Viernes", "12 de marzo de 2027"], ["Sábado", "13 de marzo de 2027"], ["Domingo", "14 de marzo de 2027"]],
    eyebrow: "Edición 2027 · 12–14 de marzo",
    h1: "El programa.",
    intro: "Tres días, tres escenarios, más de treinta sesiones. Veinte pitmasters. Doce masterclasses limitadas a veinte plazas. Noches de Grill Arena con battles en directo. Aquí lo tienes todo, hora a hora.",
    cta1: "Reservar mi plaza",
    cta2: "Todo sobre Grill Arena",
    metaTitle: "Programa — Barbecue Expo 2027",
    metaDesc: "El programa completo de los tres días: 12 masterclasses, cooking shows en el main stage, Grill Arena por la noche, street food.",
  },
  de: {
    days: [["Freitag", "12. März 2027"], ["Samstag", "13. März 2027"], ["Sonntag", "14. März 2027"]],
    eyebrow: "Ausgabe 2027 · 12.–14. März",
    h1: "Das Programm.",
    intro: "Drei Tage, drei Bühnen, über dreißig Sessions. Zwanzig Pitmaster. Zwölf Masterclasses mit je zwanzig Plätzen. Grill-Arena-Abende mit Live-Battles. Hier ist alles, auf die Stunde genau.",
    cta1: "Meinen Platz buchen",
    cta2: "Alles über die Grill Arena",
    metaTitle: "Programm — Barbecue Expo 2027",
    metaDesc: "Das komplette Programm der drei Tage: 12 Masterclasses, Cooking Shows auf der Main Stage, Grill Arena am Abend, Street Food.",
  },
  nl: {
    days: [["Vrijdag", "12 maart 2027"], ["Zaterdag", "13 maart 2027"], ["Zondag", "14 maart 2027"]],
    eyebrow: "Editie 2027 · 12–14 maart",
    h1: "Het programma.",
    intro: "Drie dagen, drie podia, meer dan dertig sessies. Twintig pitmasters. Twaalf masterclasses met elk twintig plaatsen. Grill Arena-avonden met live battles. Hier is alles, tot op het uur.",
    cta1: "Mijn plaats reserveren",
    cta2: "Alles over Grill Arena",
    metaTitle: "Programma — Barbecue Expo 2027",
    metaDesc: "Het volledige programma van de drie dagen: 12 masterclasses, cooking shows op de main stage, Grill Arena 's avonds, street food.",
  },
  pt: {
    days: [["Sexta-feira", "12 de março de 2027"], ["Sábado", "13 de março de 2027"], ["Domingo", "14 de março de 2027"]],
    eyebrow: "Edição 2027 · 12–14 de março",
    h1: "O programa.",
    intro: "Três dias, três palcos, mais de trinta sessões. Vinte pitmasters. Doze masterclasses limitadas a vinte lugares. Noites de Grill Arena com battles ao vivo. Aqui está tudo, hora a hora.",
    cta1: "Reservar o meu lugar",
    cta2: "Tudo sobre a Grill Arena",
    metaTitle: "Programa — Barbecue Expo 2027",
    metaDesc: "O programa completo dos três dias: 12 masterclasses, cooking shows no main stage, Grill Arena à noite, street food.",
  },
  it: {
    days: [["Venerdì", "12 marzo 2027"], ["Sabato", "13 marzo 2027"], ["Domenica", "14 marzo 2027"]],
    eyebrow: "Edizione 2027 · 12–14 marzo",
    h1: "Il programma.",
    intro: "Tre giorni, tre palchi, più di trenta sessioni. Venti pitmaster. Dodici masterclass limitate a venti posti. Serate Grill Arena con battle dal vivo. Ecco tutto, ora per ora.",
    cta1: "Prenota il mio posto",
    cta2: "Tutto sulla Grill Arena",
    metaTitle: "Programma — Barbecue Expo 2027",
    metaDesc: "Il programma completo dei tre giorni: 12 masterclass, cooking show sul main stage, Grill Arena la sera, street food.",
  },
};

const TYPE_LABELS = {
  masterclass: { label: "Masterclass", icon: GraduationCap, color: "text-gold-700" },
  "cooking-show": { label: "Cooking Show", icon: Flame, color: "text-ember-600" },
  "grill-arena": { label: "Grill Arena", icon: Trophy, color: "text-gold-500" },
  "street-food": { label: "Street Food", icon: Utensils, color: "text-char-700" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/programme", {
    title: (UI[locale] || UI.fr).metaTitle,
    description: (UI[locale] || UI.fr).metaDesc,
  });
}

export default async function ProgrammePage() {
  const locale = await getLocale();
  const t = UI[locale] || UI.fr;
  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="relative w-full min-h-[60dvh] overflow-hidden bg-ink-950">
        <Image
          src="/photos-2026/bbq-expo-105.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-end min-h-[60dvh]">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {t.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {t.h1}
          </h1>
          <p className="mt-8 text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Days timeline */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-20 md:space-y-28">
        {FR_DAYS.map((d, di) => (
          <div key={d.label}>
            <div className="flex items-baseline gap-4 mb-10 md:mb-14 border-b-2 border-gold-500 pb-6">
              <h2
                className="text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-none font-bold"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {t.days[di]?.[0] ?? d.label}
              </h2>
              <span className="text-ink-600 text-base md:text-lg uppercase tracking-widest">
                {t.days[di]?.[1] ?? d.date}
              </span>
            </div>

            <ul className="divide-y divide-ink-900/15 border-t border-b border-ink-900/15">
              {d.slots.map((s, i) => {
                const cfg = TYPE_LABELS[s.type];
                const Icon = cfg.icon;
                return (
                  <li key={i} className="grid grid-cols-12 gap-4 py-5 md:py-6 hover:bg-cream-100 transition-colors px-2 md:px-4 -mx-2 md:-mx-4">
                    <div
                      className="col-span-3 md:col-span-2 text-ink-900 text-xl md:text-2xl tabular-nums font-bold"
                      style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                    >
                      {s.time}
                    </div>
                    <div className="col-span-9 md:col-span-7">
                      <h3 className="text-ink-900 text-base md:text-lg font-bold leading-tight">
                        {tr(s.title, locale)}
                      </h3>
                      {s.who && (
                        <div className="text-ink-600 text-xs md:text-sm mt-1">{tr(s.who, locale)}</div>
                      )}
                      <div className="md:hidden mt-2 flex items-center gap-2 text-xs text-ink-600 uppercase tracking-widest">
                        <Icon className={`w-3 h-3 ${cfg.color}`} strokeWidth={2.5} />
                        <span>{cfg.label}</span>
                        <span>·</span>
                        <span>{tr(s.zone, locale)}</span>
                      </div>
                    </div>
                    <div className="hidden md:flex col-span-3 items-center gap-2 text-xs text-ink-600 uppercase tracking-widest justify-end">
                      <Icon className={`w-3.5 h-3.5 ${cfg.color}`} strokeWidth={2.5} />
                      <span className="font-semibold">{cfg.label}</span>
                      <span>·</span>
                      <span>{tr(s.zone, locale)}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-cream-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row gap-4">
          <Link
            href="/billetterie"
            className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>{t.cta1}</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
          </Link>
          <Link
            href="/grill-arena"
            className="group inline-flex items-center gap-4 border border-ink-900/30 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>{t.cta2}</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
