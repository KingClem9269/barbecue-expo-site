"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

/**
 * ExhibitorBenefits — long-form editorial.
 *
 * Replaces the previous 4-card grid with alternating photo/text rows.
 * Each row tells one reason in flowing prose, with an evocative photo.
 * Warm, slow rhythm, no icons. Acts like the inside spread of a magazine.
 */

interface Block {
  number: string;
  title: string;
  body: string;
  image: string;
}

const UI: Record<
  string,
  {
    eyebrow: string;
    headline: string;
    intro: string;
    blocks: Block[];
    cta: string;
  }
> = {
  fr: {
    eyebrow: "Pourquoi exposer",
    headline: "Quatre raisons d'y être.",
    intro:
      "Pas de speech corporate, pas de slides. Voici comment, concrètement, Barbecue Expo travaille pour ses exposants — vu de l'intérieur.",
    blocks: [
      {
        number: "01",
        title: "Une audience qui sait pourquoi elle vient.",
        body: "Le visiteur Barbecue Expo n'est pas en balade. Il vient acheter un grill, comparer des charbons, rencontrer une marque qu'il suit depuis trois ans. Plus de la moitié du public est composé de prescripteurs, revendeurs ou pros — un mix rare, qu'on construit avec exigence depuis la première édition.",
        image: "/photos-2026/bbq-expo-184.jpg",
      },
      {
        number: "02",
        title: "La presse vous lit, vous regarde, vous cite.",
        body: "Médias gastronomiques, presse outdoor, blogueurs spécialisés, podcasts métier, presse régionale. Cinq dossiers de presse envoyés par mois pendant six mois. Et, pour la première fois en 2027, les Awards Barbecue Expo : or, argent, bronze sur cinq catégories — pour distinguer les marques que le marché doit suivre.",
        image: "/photos-2026/bbq-expo-105.jpg",
      },
      {
        number: "03",
        title: "Le matchmaking B2B, vraiment.",
        body: "Avant le salon, vous recevez la liste des acheteurs présents — distributeurs européens, enseignes spécialisées, e-commerçants, GMS, HORECA. Vous demandez vos rendez-vous. Nous bloquons les créneaux. Vous arrivez avec un agenda, pas avec l'espoir de croiser quelqu'un.",
        image: "/photos-2026/bbq-expo-008.jpg",
      },
      {
        number: "04",
        title: "L'Europe en trois jours.",
        body: "Quinze pays côté exposants, vingt-cinq nationalités côté visiteurs. Le seul endroit en Europe où votre marque peut, depuis un seul stand, parler à un acheteur belge, à un distributeur allemand, à un e-commerçant espagnol et à un caviste italien. Vous gagnez un trimestre de roadshow.",
        image: "/photos-2026/bbq-expo-403.jpg",
      },
    ],
    cta: "Demander le dossier exposant",
  },
  en: {
    eyebrow: "Why exhibit",
    headline: "Four reasons to be there.",
    intro:
      "No corporate speech, no slides. Here is how, concretely, Barbecue Expo works for its exhibitors — seen from inside.",
    blocks: [
      {
        number: "01",
        title: "An audience that knows why it came.",
        body: "Our visitor isn't strolling. They come to buy a grill, compare charcoals, meet a brand they've been following for three years. More than half of the audience is made up of tastemakers, resellers and professionals — a rare mix we've been crafting since day one.",
        image: "/photos-2026/bbq-expo-184.jpg",
      },
      {
        number: "02",
        title: "The press reads you, watches you, quotes you.",
        body: "Food media, outdoor press, specialist bloggers, industry podcasts, regional press. Five press releases sent per month for six months. And for the first time in 2027, the Barbecue Expo Awards: gold, silver, bronze across five categories — to distinguish the brands the market should follow.",
        image: "/photos-2026/bbq-expo-105.jpg",
      },
      {
        number: "03",
        title: "B2B matchmaking, for real.",
        body: "Before the show, you receive the list of buyers attending — European distributors, specialty chains, e-commerce, mass retailers, HORECA. You request your meetings. We lock the slots. You arrive with an agenda, not with the hope of bumping into someone.",
        image: "/photos-2026/bbq-expo-008.jpg",
      },
      {
        number: "04",
        title: "Europe in three days.",
        body: "Fifteen exhibiting countries, twenty-five visitor nationalities. The only place in Europe where, from a single stand, you can talk to a Belgian buyer, a German distributor, a Spanish e-commerce and an Italian wine seller. You save a quarter of roadshow.",
        image: "/photos-2026/bbq-expo-403.jpg",
      },
    ],
    cta: "Request the exhibitor kit",
  },
  es: {
    eyebrow: "Por qué exponer",
    headline: "Cuatro razones para estar.",
    intro:
      "Sin discurso corporativo, sin diapositivas. Así es como, concretamente, Barbecue Expo trabaja para sus expositores — visto desde dentro.",
    blocks: [
      { number: "01", title: "Una audiencia que sabe por qué viene.", body: "Nuestro visitante no pasea. Viene a comprar un grill, comparar carbones, conocer una marca que sigue desde hace años. Más de la mitad del público son prescriptores, revendedores o profesionales.", image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "La prensa le lee, le mira, le cita.", body: "Medios gastronómicos, prensa outdoor, blogueros especializados, podcasts profesionales. Y por primera vez en 2027, los Premios Barbecue Expo: oro, plata, bronce sobre cinco categorías.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "03", title: "El matchmaking B2B, de verdad.", body: "Antes del salón, recibe la lista de compradores presentes — distribuidores europeos, cadenas especializadas, e-commerce, gran distribución, HORECA. Pide sus citas. Bloqueamos las franjas. Llega con una agenda.", image: "/photos-2026/bbq-expo-008.jpg" },
      { number: "04", title: "Europa en tres días.", body: "Quince países expositores, veinticinco nacionalidades de visitantes. El único lugar de Europa donde, desde un solo stand, puede hablar con un comprador belga, un distribuidor alemán, un e-commerce español y un sumiller italiano.", image: "/photos-2026/bbq-expo-403.jpg" },
    ],
    cta: "Pedir el dossier de expositor",
  },
  de: {
    eyebrow: "Warum ausstellen",
    headline: "Vier Gründe, dabei zu sein.",
    intro:
      "Keine Konzern-Reden, keine Folien. So arbeitet Barbecue Expo konkret für seine Aussteller — von innen gesehen.",
    blocks: [
      { number: "01", title: "Ein Publikum, das weiß, warum es kommt.", body: "Unser Besucher schlendert nicht. Er kommt, um einen Grill zu kaufen, Holzkohle zu vergleichen, eine Marke zu treffen, der er seit drei Jahren folgt. Mehr als die Hälfte des Publikums sind Meinungsführer, Wiederverkäufer oder Profis.", image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "Die Presse liest, beobachtet und zitiert Sie.", body: "Gastronomie-Medien, Outdoor-Presse, Fach-Blogger, Branchen-Podcasts. Und 2027 zum ersten Mal die Barbecue Expo Awards: Gold, Silber, Bronze in fünf Kategorien.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "03", title: "B2B-Matchmaking, wirklich.", body: "Vor der Messe erhalten Sie die Liste der anwesenden Einkäufer — europäische Distributoren, Fachketten, E-Commerce, Großhandel, HORECA. Sie fordern Ihre Termine an. Wir blockieren die Slots. Sie kommen mit einer Agenda, nicht mit Hoffnung.", image: "/photos-2026/bbq-expo-008.jpg" },
      { number: "04", title: "Europa in drei Tagen.", body: "Fünfzehn ausstellende Länder, fünfundzwanzig Besucher-Nationalitäten. Der einzige Ort in Europa, an dem Sie von einem einzigen Stand aus mit einem belgischen Käufer, einem deutschen Distributor, einem spanischen E-Händler und einem italienischen Weinhändler sprechen können.", image: "/photos-2026/bbq-expo-403.jpg" },
    ],
    cta: "Ausstellerunterlagen anfordern",
  },
  nl: {
    eyebrow: "Waarom exposeren",
    headline: "Vier redenen om erbij te zijn.",
    intro:
      "Geen corporate speech, geen slides. Zo werkt Barbecue Expo concreet voor zijn exposanten — van binnenuit gezien.",
    blocks: [
      { number: "01", title: "Een publiek dat weet waarom het komt.", body: "Onze bezoeker wandelt niet rond. Hij komt om een grill te kopen, houtskool te vergelijken, een merk te ontmoeten dat hij al drie jaar volgt. Meer dan de helft bestaat uit toonaangevers, doorverkopers of professionals.", image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "De pers leest u, kijkt naar u, citeert u.", body: "Gastronomische media, outdoor-pers, gespecialiseerde bloggers, vak-podcasts. En in 2027 voor het eerst de Barbecue Expo Awards: goud, zilver, brons in vijf categorieën.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "03", title: "B2B-matchmaking, echt.", body: "Vóór de beurs ontvangt u de lijst met aanwezige kopers — Europese distributeurs, gespecialiseerde ketens, e-commerce, retail, HORECA. U vraagt uw afspraken aan. Wij blokkeren de slots. U komt met een agenda.", image: "/photos-2026/bbq-expo-008.jpg" },
      { number: "04", title: "Europa in drie dagen.", body: "Vijftien deelnemende landen, vijfentwintig bezoekersnationaliteiten. De enige plek in Europa waar u vanaf één stand kunt praten met een Belgische koper, een Duitse distributeur, een Spaanse e-commerce en een Italiaanse wijnhandelaar.", image: "/photos-2026/bbq-expo-403.jpg" },
    ],
    cta: "Exposant-dossier aanvragen",
  },
  pt: {
    eyebrow: "Porquê expor",
    headline: "Quatro razões para estar.",
    intro:
      "Sem discurso corporativo, sem slides. É assim que, concretamente, Barbecue Expo trabalha para os seus expositores — visto de dentro.",
    blocks: [
      { number: "01", title: "Um público que sabe porque vem.", body: "O nosso visitante não passeia. Vem comprar uma grelha, comparar carvões, conhecer uma marca que segue há três anos. Mais de metade do público são prescritores, revendedores ou profissionais.", image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "A imprensa lê-o, observa-o, cita-o.", body: "Media gastronómicos, imprensa outdoor, bloggers especializados, podcasts profissionais. E pela primeira vez em 2027, os Prémios Barbecue Expo: ouro, prata, bronze em cinco categorias.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "03", title: "Matchmaking B2B, a sério.", body: "Antes da feira, recebe a lista de compradores presentes — distribuidores europeus, cadeias especializadas, e-commerce, retalho, HORECA. Pede as suas reuniões. Bloqueamos os slots. Chega com uma agenda.", image: "/photos-2026/bbq-expo-008.jpg" },
      { number: "04", title: "A Europa em três dias.", body: "Quinze países expositores, vinte e cinco nacionalidades de visitantes. O único lugar na Europa onde, a partir de um só stand, pode falar com um comprador belga, um distribuidor alemão, um e-commerce espanhol e um comerciante italiano.", image: "/photos-2026/bbq-expo-403.jpg" },
    ],
    cta: "Pedir o dossier expositor",
  },
  it: {
    eyebrow: "Perché esporre",
    headline: "Quattro ragioni per esserci.",
    intro:
      "Niente discorsi corporate, niente slide. Ecco come, concretamente, Barbecue Expo lavora per i suoi espositori — visto dall'interno.",
    blocks: [
      { number: "01", title: "Un pubblico che sa perché viene.", body: "Il nostro visitatore non passeggia. Viene per comprare un grill, confrontare carboni, incontrare un marchio che segue da tre anni. Più della metà del pubblico è composto da prescrittori, rivenditori o professionisti.", image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "La stampa ti legge, ti osserva, ti cita.", body: "Media gastronomici, stampa outdoor, blogger specializzati, podcast di settore. E per la prima volta nel 2027, i Premi Barbecue Expo: oro, argento, bronzo su cinque categorie.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "03", title: "Matchmaking B2B, sul serio.", body: "Prima della fiera, ricevi la lista degli acquirenti presenti — distributori europei, catene specializzate, e-commerce, GDO, HORECA. Richiedi i tuoi appuntamenti. Blocchiamo gli slot. Arrivi con un'agenda.", image: "/photos-2026/bbq-expo-008.jpg" },
      { number: "04", title: "L'Europa in tre giorni.", body: "Quindici paesi espositori, venticinque nazionalità di visitatori. L'unico posto in Europa dove, da un solo stand, puoi parlare con un acquirente belga, un distributore tedesco, un e-commerce spagnolo e un sommelier italiano.", image: "/photos-2026/bbq-expo-403.jpg" },
    ],
    cta: "Richiedere il dossier espositore",
  },
};

export default function ExhibitorBenefits() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-cream-50" aria-label="Why exhibit">
      {/* Top intro */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <h2
              className="text-ink-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.headline}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-ink-600 text-base md:text-lg leading-relaxed">
              {ui.intro}
            </p>
          </div>
        </div>
      </div>

      {/* Editorial blocks — alternating layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32 space-y-20 md:space-y-32">
        {ui.blocks.map((b, i) => {
          const reverse = i % 2 === 1;
          return (
            <div
              key={b.number}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Photo */}
              <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={b.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              {/* Text */}
              <div className="lg:col-span-5">
                <div
                  className="text-gold-600 text-sm md:text-base font-bold tabular-nums mb-4"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  — {b.number}
                </div>
                <h3
                  className="text-ink-900 text-3xl md:text-4xl lg:text-5xl leading-tight font-bold mb-6"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {b.title}
                </h3>
                <p className="text-ink-600 text-base md:text-lg leading-relaxed">
                  {b.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="bg-cream-100 py-16 md:py-20 border-t border-ink-900/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Link
            href="/devenez-exposants"
            className="group inline-flex items-center gap-4 text-ink-900 hover:text-gold-700 text-base md:text-lg font-bold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          >
            <span>{ui.cta}</span>
            <ArrowUpRight
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
