import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Train, Car, Bike, Accessibility, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";

const FR = {
  eyebrow: "Édition 2027",
  heroTitle: "Tout pour préparer votre venue.",
  heroParagraph:
    "Trois jours au Parc Floral de Paris, du vendredi 10 au dimanche 12 avril 2027. Voici comment y arriver, à quelle heure, où dormir, où se garer, et tout ce qui aide à passer un bon week-end.",
  daysTitle: "Horaires d'ouverture",
  days: [
    { day: "Vendredi 10 avril", hours: "10h00 — 22h00", note: "Soirée Grill Arena · Round of 16" },
    { day: "Samedi 11 avril", hours: "10h00 — 22h00", note: "Soirée Grill Arena · Quarts & demi-finales" },
    { day: "Dimanche 12 avril", hours: "10h00 — 19h00", note: "Finale Grill Arena en après-midi" },
  ],
  accessTitle: "Comment venir.",
  accessIntro: "Le Parc Floral est au bout de la ligne 1 du métro parisien. Tous les modes sont prévus, y compris en autonomie réduite.",
  modes: [
    {
      icon: "metro",
      title: "Métro",
      detail: "Ligne 1 — station Château de Vincennes (terminus). Sortie 6, suivre la signalétique du Parc Floral. Compter 10 minutes à pied jusqu'à l'entrée.",
    },
    {
      icon: "car",
      title: "Voiture",
      detail: "Parkings du Parc Floral (entrée par la Route de la Pyramide). 2 000 places + 800 places en parking-relais signalé. Tarif 5 € la journée. Recharge VE disponible (12 bornes).",
    },
    {
      icon: "bike",
      title: "Vélo & trottinette",
      detail: "1 200 places de stationnement gratuit à l'entrée principale. Vélib' Métropole : 3 stations à moins de 5 minutes à pied. Pistes cyclables sécurisées depuis Vincennes et Saint-Mandé.",
    },
    {
      icon: "rer",
      title: "RER & Transilien",
      detail: "RER A — station Vincennes (puis bus 56 ou 10 minutes à pied). RER E pour les visiteurs venant de l'Est parisien. Train direct depuis la Gare de l'Est en 25 minutes.",
    },
    {
      icon: "pmr",
      title: "Accessibilité PMR",
      detail: "Entrée et parcours intégralement accessibles. Parking PMR dédié à l'entrée principale (50 places). Borne d'accueil PMR à l'entrée. Fauteuils en prêt sur demande gratuite.",
    },
  ],
  hotelsTitle: "Où dormir.",
  hotelsBody:
    "Notre partenaire hôtellerie Revolugo négocie des tarifs préférentiels pour les visiteurs Barbecue Expo. Hôtels à 10-30 minutes du Parc Floral, en métro direct.",
  hotelsCta: "Voir les hôtels partenaires",
  faqTitle: "Questions fréquentes.",
  faq: [
    {
      q: "Y a-t-il des restaurants sur place ?",
      a: "Oui. 14 restaurateurs de street food BBQ sélectionnés sont présents tout au long du salon, ainsi qu'une zone de restauration assise et un food truck café. Tous les régimes sont pris en compte (végétarien, sans gluten).",
    },
    {
      q: "Puis-je venir avec mes enfants ?",
      a: "Oui. L'entrée est gratuite jusqu'à 12 ans accompagné d'un adulte. Une zone d'animation famille est prévue le samedi et dimanche après-midi.",
    },
    {
      q: "Peut-on acheter du matériel directement sur les stands ?",
      a: "Oui. La plupart des marques exposantes vendent leur matériel sur place aux tarifs salon. Livraison à domicile possible pour les pièces volumineuses.",
    },
    {
      q: "Y a-t-il un vestiaire ?",
      a: "Oui, vestiaire gratuit à l'entrée, ouvert pendant toute la durée d'ouverture. Des consignes sécurisées pour bagages volumineux sont disponibles à proximité de l'entrée principale.",
    },
    {
      q: "Et si je veux fumer / vapoter ?",
      a: "Le salon est non-fumeur en intérieur. Des zones fumeurs en plein air sont signalées dans le parc.",
    },
    {
      q: "Y a-t-il un dress code ?",
      a: "Aucun. Venez confortable — une bonne paire de chaussures pour marcher, et de quoi vous changer si vous comptez participer à une masterclass de fumage.",
    },
  ],
};

const CONTENT: Record<string, typeof FR> = {
  fr: FR,
  en: FR,
  es: FR,
  de: FR,
  nl: FR,
  pt: FR,
  it: FR,
};

function ModeIcon({ name }: { name: string }) {
  const cls = "w-6 h-6 text-gold-600";
  if (name === "metro" || name === "rer") return <Train className={cls} strokeWidth={2} />;
  if (name === "car") return <Car className={cls} strokeWidth={2} />;
  if (name === "bike") return <Bike className={cls} strokeWidth={2} />;
  if (name === "pmr") return <Accessibility className={cls} strokeWidth={2} />;
  return <MapPin className={cls} strokeWidth={2} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = CONTENT[locale] || CONTENT.fr;
  return buildMetadata(locale, "/infos-pratiques", {
    title: "Infos pratiques — Barbecue Expo 2027",
    description: ui.heroParagraph,
  });
}

export default async function InfosPratiquesPage() {
  const locale = await getLocale();
  const ui = CONTENT[locale] || CONTENT.fr;

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="relative w-full min-h-[60dvh] overflow-hidden bg-ink-950">
        <Image
          src="/photos-2026/bbq-expo-403.jpg"
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
            {ui.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.heroTitle}
          </h1>
          <p className="mt-8 text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
            {ui.heroParagraph}
          </p>
        </div>
      </section>

      {/* Hours */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
          <Clock className="w-4 h-4 text-gold-500" strokeWidth={2} />
          {ui.daysTitle}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {ui.days.map((d, i) => (
            <div key={i} className="border-t-2 border-gold-500 pt-6">
              <h3
                className="text-ink-900 text-2xl md:text-3xl leading-tight font-bold mb-2"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {d.day}
              </h3>
              <div
                className="text-gold-700 text-xl md:text-2xl tabular-nums mb-3"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {d.hours}
              </div>
              <p className="text-ink-600 text-sm leading-relaxed">{d.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Access modes */}
      <section className="bg-ink-950 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            Accès
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
            <h2
              className="lg:col-span-7 text-cream-50 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.accessTitle}
            </h2>
            <p className="lg:col-span-5 text-cream-50/85 text-base md:text-lg leading-relaxed">
              {ui.accessIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-x-16 md:gap-y-12">
            {ui.modes.map((m, i) => (
              <div key={i} className="flex gap-5">
                <div className="shrink-0 mt-1">
                  <ModeIcon name={m.icon} />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-cream-50 text-xl md:text-2xl leading-tight font-bold mb-2"
                    style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                  >
                    {m.title}
                  </h3>
                  <p className="text-cream-50/75 text-sm md:text-base leading-relaxed">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative aspect-[4/3] rounded-sm overflow-hidden">
          <Image
            src="/photos-2026/bbq-expo-073.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-7">
          <h2
            className="text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold mb-6"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.hotelsTitle}
          </h2>
          <p className="text-ink-600 text-base md:text-lg leading-relaxed mb-10">
            {ui.hotelsBody}
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>{ui.hotelsCta}</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-100 py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h2
            className="text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold mb-12"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.faqTitle}
          </h2>
          <ul className="divide-y divide-ink-900/15">
            {ui.faq.map((item, i) => (
              <li key={i} className="py-6">
                <h3 className="text-ink-900 text-lg md:text-xl font-bold mb-2">{item.q}</h3>
                <p className="text-ink-600 text-base leading-relaxed">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
