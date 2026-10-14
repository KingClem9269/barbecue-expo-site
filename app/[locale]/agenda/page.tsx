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
  es: {
    eyebrow: "Calendario del ecosistema",
    title: "Los eventos de barbacoa\nen Francia",
    intro: "Salones, festivales y competiciones: toda la agenda del fuego, del gran público a los profesionales. Temporada 2026-2027.",
    internal: "Entradas e información",
    external: "Ver el evento",
    soon: "Próximamente",
  },
  de: {
    eyebrow: "Kalender des Ökosystems",
    title: "Barbecue-Events\nin Frankreich",
    intro: "Messen, Festivals und Wettbewerbe: der komplette Feuer-Kalender, vom breiten Publikum bis zu den Profis. Saison 2026-2027.",
    internal: "Tickets & Infos",
    external: "Zum Event",
    soon: "Demnächst",
  },
  nl: {
    eyebrow: "Kalender van het ecosysteem",
    title: "Barbecue-evenementen\nin Frankrijk",
    intro: "Beurzen, festivals en wedstrijden: de volledige vuuragenda, van het grote publiek tot de professionals. Seizoen 2026-2027.",
    internal: "Tickets & info",
    external: "Bekijk het evenement",
    soon: "Binnenkort",
  },
  pt: {
    eyebrow: "Calendário do ecossistema",
    title: "Os eventos de barbecue\nem França",
    intro: "Salões, festivais e competições: toda a agenda do fogo, do grande público aos profissionais. Temporada 2026-2027.",
    internal: "Bilheteira e informações",
    external: "Ver o evento",
    soon: "Em breve",
  },
  it: {
    eyebrow: "Calendario dell'ecosistema",
    title: "Gli eventi barbecue\nin Francia",
    intro: "Fiere, festival e competizioni: tutta l'agenda del fuoco, dal grande pubblico ai professionisti. Stagione 2026-2027.",
    internal: "Biglietti e info",
    external: "Vedi l'evento",
    soon: "Prossimamente",
  },
};

type Tr = { fr: string; en: string; es?: string; de?: string; nl?: string; pt?: string; it?: string };

type Ev = {
  key: string;
  badge: Tr;
  name: string;
  when: Tr;
  where: string;
  desc: Tr;
  href: string; // chemin interne ("/...") ou URL externe ("https://...")
  enabled?: boolean;
};

const EVENTS: Ev[] = [
  {
    key: "fest-paris",
    badge: { fr: "Festival", en: "Festival", es: "Festival", de: "Festival", nl: "Festival", pt: "Festival", it: "Festival" },
    name: "Barbecue Fest — Paris",
    when: { fr: "4-5 juillet 2026", en: "July 4-5, 2026", es: "4-5 de julio de 2026", de: "4.-5. Juli 2026", nl: "4-5 juli 2026", pt: "4-5 de julho de 2026", it: "4-5 luglio 2026" },
    where: "Île des Impressionnistes, Chatou",
    desc: {
      fr: "Le festival grand public : street food au feu de bois, concerts live et chefs d'exception.",
      en: "The public festival: wood-fired street food, live concerts and top chefs.",
      es: "El festival para el gran público: street food a la leña, conciertos en directo y chefs excepcionales.",
      de: "Das Publikumsfestival: Street Food vom Holzfeuer, Live-Konzerte und herausragende Köche.",
      nl: "Het publieksfestival: street food op houtvuur, liveconcerten en uitzonderlijke chefs.",
      pt: "O festival para o grande público: street food em fogo de lenha, concertos ao vivo e chefs de exceção.",
      it: "Il festival per il grande pubblico: street food a legna, concerti dal vivo e chef d'eccezione.",
    },
    href: "https://www.barbecue-fest.com/paris/",
  },
  {
    key: "fest-normandie",
    badge: { fr: "Festival", en: "Festival", es: "Festival", de: "Festival", nl: "Festival", pt: "Festival", it: "Festival" },
    name: "Barbecue Fest — Normandie",
    when: { fr: "Édition de printemps", en: "Spring edition", es: "Edición de primavera", de: "Frühjahrsausgabe", nl: "Voorjaarseditie", pt: "Edição de primavera", it: "Edizione primaverile" },
    where: "Normandie",
    desc: {
      fr: "L'édition normande du festival Food + Music.",
      en: "The Normandy edition of the Food + Music festival.",
      es: "La edición normanda del festival Food + Music.",
      de: "Die normannische Ausgabe des Food + Music Festivals.",
      nl: "De Normandische editie van het Food + Music-festival.",
      pt: "A edição normanda do festival Food + Music.",
      it: "L'edizione normanna del festival Food + Music.",
    },
    href: "https://www.barbecue-fest.com/normandie/",
  },
  {
    key: "piment",
    badge: { fr: "Compétition", en: "Competition", es: "Competición", de: "Wettbewerb", nl: "Wedstrijd", pt: "Competição", it: "Competizione" },
    name: "Le Piment d'Or",
    when: { fr: "Aux éditions du Barbecue Fest", en: "At the Barbecue Fest editions", es: "En las ediciones del Barbecue Fest", de: "Bei den Ausgaben des Barbecue Fest", nl: "Tijdens de edities van Barbecue Fest", pt: "Nas edições do Barbecue Fest", it: "Alle edizioni del Barbecue Fest" },
    where: "Normandie & Paris",
    desc: {
      fr: "Le championnat de sauces piquantes : candidats, épreuves et récompenses.",
      en: "The hot-sauce championship: contestants, challenges and awards.",
      es: "El campeonato de salsas picantes: candidatos, pruebas y premios.",
      de: "Die Meisterschaft der scharfen Saucen: Teilnehmer, Prüfungen und Auszeichnungen.",
      nl: "Het kampioenschap pikante sauzen: deelnemers, proeven en prijzen.",
      pt: "O campeonato de molhos picantes: candidatos, provas e prémios.",
      it: "Il campionato delle salse piccanti: concorrenti, prove e premi.",
    },
    href: "https://lepimentdor.com/championnat",
  },
  {
    key: "expo",
    badge: { fr: "Salon pro & grand public", en: "Trade & public show", es: "Salón profesional y gran público", de: "Fach- & Publikumsmesse", nl: "Vak- & publieksbeurs", pt: "Salão profissional e grande público", it: "Fiera pro & grande pubblico" },
    name: "Barbecue Expo",
    when: { fr: "12-13-14 mars 2027", en: "March 12-13-14, 2027", es: "12-13-14 de marzo de 2027", de: "12.-13.-14. März 2027", nl: "12-13-14 maart 2027", pt: "12-13-14 de março de 2027", it: "12-13-14 marzo 2027" },
    where: "Parc Floral de Paris",
    desc: {
      fr: "Le plus grand salon barbecue d'Europe : marques, exposants, innovations, Grill Arena et pitmasters.",
      en: "Europe's biggest BBQ show: brands, exhibitors, innovations, Grill Arena and pitmasters.",
      es: "El mayor salón de barbacoa de Europa: marcas, expositores, innovaciones, Grill Arena y pitmasters.",
      de: "Die größte Barbecue-Messe Europas: Marken, Aussteller, Innovationen, Grill Arena und Pitmaster.",
      nl: "De grootste barbecuebeurs van Europa: merken, exposanten, innovaties, Grill Arena en pitmasters.",
      pt: "O maior salão de barbecue da Europa: marcas, expositores, inovações, Grill Arena e pitmasters.",
      it: "La più grande fiera del barbecue d'Europa: marchi, espositori, innovazioni, Grill Arena e pitmaster.",
    },
    href: "/billetterie",
  },
  {
    key: "coupe",
    badge: { fr: "Compétition", en: "Competition", es: "Competición", de: "Wettbewerb", nl: "Wedstrijd", pt: "Competição", it: "Competizione" },
    name: "Coupe de France de Barbecue",
    when: { fr: "Dates à venir", en: "Dates to come", es: "Fechas próximamente", de: "Termine folgen", nl: "Data volgen", pt: "Datas a anunciar", it: "Date in arrivo" },
    where: "France",
    desc: {
      fr: "La compétition nationale de barbecue : équipes, épreuves et jurys.",
      en: "The national BBQ competition: teams, challenges and judges.",
      es: "La competición nacional de barbacoa: equipos, pruebas y jurados.",
      de: "Der nationale Barbecue-Wettbewerb: Teams, Prüfungen und Jurys.",
      nl: "De nationale barbecuewedstrijd: teams, proeven en jury's.",
      pt: "A competição nacional de barbecue: equipas, provas e júris.",
      it: "La competizione nazionale di barbecue: squadre, prove e giurie.",
    },
    href: "https://www.coupe-de-france-barbecue.com",
    enabled: false, // site en cours de mise en ligne
  },
];

const META_TITLE: Record<string, string> = {
  fr: "Calendrier des événements barbecue 2026-2027",
  en: "Barbecue events calendar 2026-2027",
  es: "Calendario de eventos de barbacoa 2026-2027",
  de: "Kalender der Barbecue-Events 2026-2027",
  nl: "Kalender van barbecue-evenementen 2026-2027",
  pt: "Calendário de eventos de barbecue 2026-2027",
  it: "Calendario degli eventi barbecue 2026-2027",
};

const ECO_TITLE: Record<string, string> = {
  fr: "Découvrir tout l'écosystème",
  en: "Explore the whole ecosystem",
  es: "Descubrir todo el ecosistema",
  de: "Das ganze Ökosystem entdecken",
  nl: "Ontdek het hele ecosysteem",
  pt: "Descobrir todo o ecossistema",
  it: "Scopri tutto l'ecosistema",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.en;
  return buildMetadata(locale, "/agenda", {
    title: `${META_TITLE[locale] || META_TITLE.en} — Barbecue Expo`,
    description: ui.intro,
  });
}

export default async function AgendaPage() {
  const locale = await getLocale();
  const ui = UI[locale] || UI.en;
  const t = (v: Tr) => v[locale as keyof Tr] ?? v.en;

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
            title={ECO_TITLE[locale] || ECO_TITLE.en}
          />
        </div>
      </section>
    </div>
  );
}
