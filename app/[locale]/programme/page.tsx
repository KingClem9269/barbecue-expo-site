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
    title: "Programme — Barbecue Expo 2027",
    description: "Le programme complet des trois jours : 12 masterclasses, cooking shows sur le main stage, Grill Arena en soirée, restauration street food.",
  });
}

export default async function ProgrammePage() {
  await getLocale();
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
            Édition 2027 · 12–14 mars
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            Le programme.
          </h1>
          <p className="mt-8 text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
            Trois jours, trois scènes, plus de trente sessions. Vingt pitmasters. Douze masterclasses limitées à vingt places. Soirées Grill Arena en battle live. Voici tout, à l'heure près.
          </p>
        </div>
      </section>

      {/* Days timeline */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-20 md:space-y-28">
        {FR_DAYS.map((d) => (
          <div key={d.label}>
            <div className="flex items-baseline gap-4 mb-10 md:mb-14 border-b-2 border-gold-500 pb-6">
              <h2
                className="text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-none tracking-tight font-bold"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {d.label}
              </h2>
              <span className="text-ink-600 text-base md:text-lg uppercase tracking-widest">
                {d.date}
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
                        {s.title}
                      </h3>
                      {s.who && (
                        <div className="text-ink-600 text-xs md:text-sm mt-1">{s.who}</div>
                      )}
                      <div className="md:hidden mt-2 flex items-center gap-2 text-xs text-ink-600 uppercase tracking-widest">
                        <Icon className={`w-3 h-3 ${cfg.color}`} strokeWidth={2.5} />
                        <span>{cfg.label}</span>
                        <span>·</span>
                        <span>{s.zone}</span>
                      </div>
                    </div>
                    <div className="hidden md:flex col-span-3 items-center gap-2 text-xs text-ink-600 uppercase tracking-widest justify-end">
                      <Icon className={`w-3.5 h-3.5 ${cfg.color}`} strokeWidth={2.5} />
                      <span className="font-semibold">{cfg.label}</span>
                      <span>·</span>
                      <span>{s.zone}</span>
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
            href="/billetterie/particulier"
            className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>Réserver ma place</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
          </Link>
          <Link
            href="/grill-arena"
            className="group inline-flex items-center gap-4 border border-ink-900/30 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>Tout savoir sur Grill Arena</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
