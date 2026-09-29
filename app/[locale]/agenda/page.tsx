import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import EcosystemLinks from "@/components/ecosystem/EcosystemLinks";

/**
 * Page pilier « Calendrier des événements barbecue ».
 * Hub de maillage n°1 : relie les 5 plateformes de l'écosystème par leurs dates.
 */

const UI: Record<string, { eyebrow: string; title: string; intro: string; internal: string; external: string; soon: string }> = {
  fr: {
    eyebrow: "Calendrier de l'écosystème",
    title: "Les événements barbecue\nen France",
    intro:
      "Salons, festivals et compétitions : tout l'agenda du feu, du grand public aux professionnels. Saison 2026-2027.",
    internal: "Billetterie & infos",
    external: "Voir l'événement",
    soon: "Bientôt",
  },
  en: {
    eyebrow: "Ecosystem calendar",
    title: "Barbecue events\nin France",
    intro:
      "Trade shows, festivals and competitions: the full fire agenda, from the public to professionals. 2026-2027 season.",
    internal: "Tickets & info",
    external: "View the event",
    soon: "Soon",
  },
};

type Ev = {
  key: string;
  badge: { fr: string; en: string };
  name: string;
  when: { fr: string; en: string };
  where: string;
  desc: { fr: string; en: string };
  href: string; // chemin interne ("/...") ou URL externe ("https://...")
  enabled?: boolean;
};

const EVENTS: Ev[] = [
  {
    key: "fest-paris",
    badge: { fr: "Festival", en: "Festival" },
    name: "Barbecue Fest — Paris",
    when: { fr: "4-5 juillet 2026", en: "July 4-5, 2026" },
    where: "Île des Impressionnistes, Chatou",
    desc: {
      fr: "Le festival grand public : street food au feu de bois, concerts live et chefs d'exception.",
      en: "The public festival: wood-fired street food, live concerts and top chefs.",
    },
    href: "https://www.barbecue-fest.com/paris/",
  },
  {
    key: "fest-normandie",
    badge: { fr: "Festival", en: "Festival" },
    name: "Barbecue Fest — Normandie",
    when: { fr: "Édition de printemps", en: "Spring edition" },
    where: "Normandie",
    desc: {
      fr: "L'édition normande du festival Food + Music.",
      en: "The Normandy edition of the Food + Music festival.",
    },
    href: "https://www.barbecue-fest.com/normandie/",
  },
  {
    key: "piment",
    badge: { fr: "Compétition", en: "Competition" },
    name: "Le Piment d'Or",
    when: { fr: "Aux éditions du Barbecue Fest", en: "At the Barbecue Fest editions" },
    where: "Normandie & Paris",
    desc: {
      fr: "Le championnat de sauces piquantes : candidats, épreuves et récompenses.",
      en: "The hot-sauce championship: contestants, challenges and awards.",
    },
    href: "https://lepimentdor.com/championnat",
  },
  {
    key: "expo",
    badge: { fr: "Salon pro & grand public", en: "Trade & public show" },
    name: "Barbecue Expo",
    when: { fr: "12-13-14 mars 2027", en: "March 12-13-14, 2027" },
    where: "Parc Floral de Paris",
    desc: {
      fr: "Le plus grand salon barbecue d'Europe : marques, exposants, innovations, Grill Arena et pitmasters.",
      en: "Europe's biggest BBQ show: brands, exhibitors, innovations, Grill Arena and pitmasters.",
    },
    href: "/billetterie",
  },
  {
    key: "coupe",
    badge: { fr: "Compétition", en: "Competition" },
    name: "Coupe de France de Barbecue",
    when: { fr: "Dates à venir", en: "Dates to come" },
    where: "France",
    desc: {
      fr: "La compétition nationale de barbecue : équipes, épreuves et jurys.",
      en: "The national BBQ competition: teams, challenges and judges.",
    },
    href: "https://www.coupe-de-france-barbecue.com",
    enabled: false, // site en cours de mise en ligne
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.en;
  return buildMetadata(locale, "/agenda", {
    title: `${locale === "fr" ? "Calendrier des événements barbecue 2026-2027" : "Barbecue events calendar 2026-2027"} — Barbecue Expo`,
    description: ui.intro,
  });
}

export default async function AgendaPage() {
  const locale = await getLocale();
  const ui = UI[locale] || UI.en;
  const t = (v: { fr: string; en: string }) => (locale === "fr" ? v.fr : v.en);

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero */}
      <section className="relative bg-ink-950 pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-gold-500/15 via-transparent to-transparent blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-5">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl leading-[0.95] font-bold whitespace-pre-line"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.title}
          </h1>
          <p className="mt-7 text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed">
            {ui.intro}
          </p>
        </div>
      </section>

      {/* Liste des événements */}
      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-5">
          {EVENTS.map((e) => {
            const internal = e.href.startsWith("/");
            const disabled = e.enabled === false;
            const Card = (
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-lg border border-ink-200 bg-white p-6 transition-colors group-hover:border-gold-500">
                <div className="sm:w-44 shrink-0">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-gold-600">
                    {t(e.badge)}
                  </span>
                  <p className="mt-1 text-ink-900 font-bold text-lg">{t(e.when)}</p>
                  <p className="text-ink-500 text-sm">{e.where}</p>
                </div>
                <div className="flex-1">
                  <h2
                    className="text-2xl text-ink-900 font-bold leading-tight"
                    style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                  >
                    {e.name}
                  </h2>
                  <p className="mt-1 text-ink-600 text-sm leading-snug">{t(e.desc)}</p>
                </div>
                <div className="shrink-0 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                  {disabled ? (
                    <span className="text-ink-400">{ui.soon}</span>
                  ) : (
                    <span className="text-ink-900 group-hover:text-gold-700 inline-flex items-center gap-2 transition-colors">
                      {internal ? ui.internal : ui.external}
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                    </span>
                  )}
                </div>
              </div>
            );

            if (disabled) {
              return (
                <div key={e.key} className="group opacity-70">
                  {Card}
                </div>
              );
            }
            return internal ? (
              <Link key={e.key} href={e.href} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg">
                {Card}
              </Link>
            ) : (
              <a
                key={e.key}
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg"
              >
                {Card}
              </a>
            );
          })}
        </div>
      </section>

      {/* Bloc écosystème (liens trackés) */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <EcosystemLinks
            locale={locale}
            items={["mag", "fest", "piment", "coupe"]}
            title={locale === "fr" ? "Découvrir tout l'écosystème" : "Explore the whole ecosystem"}
          />
        </div>
      </section>
    </div>
  );
}
