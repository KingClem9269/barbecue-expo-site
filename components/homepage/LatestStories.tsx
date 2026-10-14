"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";

/**
 * LatestStories — editorial homepage closer.
 *
 * Replaces the legacy "Actualités" Storyblok blog-preview (which was
 * Lorem Ipsum placeholder articles). Instead, surface the rich content
 * we actually have on the site: pitmasters, awards, masterclasses,
 * Grill Arena. Acts like a magazine "Read more" section.
 */

interface Story {
  kicker: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

const UI: Record<string, { eyebrow: string; title: string; cta: string; stories: Story[] }> = {
  fr: {
    eyebrow: "À lire avant de venir",
    title: "Cinq histoires pour comprendre 2027.",
    cta: "Lire la suite",
    stories: [
      {
        kicker: "Format inédit",
        title: "Grill Arena, le seul battle BBQ live en Europe.",
        excerpt: "Seize pitmasters, 90 minutes par duel, un seul champion couronné le dimanche soir. Ni Spoga Gafa ni BBQ Expo Italy ne l'ont. Voici comment ça marche.",
        image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg",
        href: "/grill-arena",
      },
      {
        kicker: "Première édition",
        title: "Les Awards qui distinguent les meilleures marques.",
        excerpt: "Or, argent, bronze sur six catégories. Jury international, évaluation à l'aveugle, cérémonie au Parc Floral. Une médaille devient un argument de vente pour un an.",
        image: "/photos-2026/bbq-expo-105.jpg",
        href: "/awards",
      },
      {
        kicker: "Vingt portraits",
        title: "Les pitmasters de 2027, un par un.",
        excerpt: "Du Texas au Japon, de Buenos Aires à Florence. Vingt invités internationaux, vingt manières différentes de cuisiner au feu. Filtres par pays, spécialité, jour de présence.",
        image: "/photos-2026/william-plin-jpc-110426-533a4856.jpg",
        href: "/pitmasters",
      },
      {
        kicker: "Douze sessions",
        title: "Les masterclasses qui se remplissent en deux semaines.",
        excerpt: "Vingt places maximum par session. Un pitmaster international vous montre, vous corrige, vous fait goûter. Brisket, kamado, asado, charcuterie, dry-aged… réservez vite.",
        image: "/photos-2026/bbq-expo-720.jpg",
        href: "/program/masterclasses",
      },
      {
        kicker: "Partenaire officiel",
        title: "Zip Feux, sponsor de la Grill Arena.",
        excerpt: "Après trois éditions, la marque d'allume-feux à l'héritage irlandais devient partenaire officiel 2027 et sponsor de la Grill Arena. Histoire, gamme et engagements durables.",
        image: "/partners/zip-feux/hero.jpg",
        href: "/actualites/zip-feux-partenaire-officiel-2027",
      },
    ],
  },
  en: {
    eyebrow: "Read before you come",
    title: "Five stories to understand 2027.",
    cta: "Read more",
    stories: [
      { kicker: "New format", title: "Grill Arena, the only live BBQ battle in Europe.", excerpt: "Sixteen pitmasters, 90 minutes per duel, one champion crowned Sunday night. Neither Spoga Gafa nor BBQ Expo Italy has it. Here's how it works.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg", href: "/grill-arena" },
      { kicker: "First edition", title: "The Awards that distinguish the best brands.", excerpt: "Gold, silver, bronze in six categories. International jury, blind evaluation, ceremony at Parc Floral. A medal becomes a year-long selling argument.", image: "/photos-2026/bbq-expo-105.jpg", href: "/awards" },
      { kicker: "Twenty portraits", title: "The 2027 pitmasters, one by one.", excerpt: "From Texas to Japan, Buenos Aires to Florence. Twenty international guests, twenty different ways of cooking with fire. Filter by country, specialty, day.", image: "/photos-2026/william-plin-jpc-110426-533a4856.jpg", href: "/pitmasters" },
      { kicker: "Twelve sessions", title: "Masterclasses that fill up in two weeks.", excerpt: "Twenty seats max per session. An international pitmaster shows you, corrects you, makes you taste. Brisket, kamado, asado, charcuterie, dry-aged… book fast.", image: "/photos-2026/bbq-expo-720.jpg", href: "/program/masterclasses" },
      { kicker: "Official partner", title: "Zip Feux, Grill Arena sponsor.", excerpt: "After three editions, the Irish-heritage firelighter brand becomes a 2027 official partner and Grill Arena sponsor. Story, range and sustainability commitments.", image: "/partners/zip-feux/hero.jpg", href: "/actualites/zip-feux-partenaire-officiel-2027" },
    ],
  },
  es: {
    eyebrow: "Para leer antes de venir",
    title: "Cinco historias para entender 2027.",
    cta: "Leer más",
    stories: [
      { kicker: "Formato inédito", title: "Grill Arena, la única battle BBQ en directo de Europa.", excerpt: "Dieciséis pitmasters, 90 minutos por duelo, un solo campeón coronado el domingo por la noche. Ni Spoga Gafa ni BBQ Expo Italy lo tienen. Así funciona.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg", href: "/grill-arena" },
      { kicker: "Primera edición", title: "Los Awards que distinguen a las mejores marcas.", excerpt: "Oro, plata y bronce en seis categorías. Jurado internacional, evaluación a ciegas, ceremonia en el Parc Floral. Una medalla se convierte en un argumento de venta durante un año.", image: "/photos-2026/bbq-expo-105.jpg", href: "/awards" },
      { kicker: "Veinte retratos", title: "Los pitmasters de 2027, uno a uno.", excerpt: "De Texas a Japón, de Buenos Aires a Florencia. Veinte invitados internacionales, veinte maneras distintas de cocinar con fuego. Filtros por país, especialidad y día de presencia.", image: "/photos-2026/william-plin-jpc-110426-533a4856.jpg", href: "/pitmasters" },
      { kicker: "Doce sesiones", title: "Las masterclasses que se llenan en dos semanas.", excerpt: "Veinte plazas como máximo por sesión. Un pitmaster internacional te enseña, te corrige y te hace probar. Brisket, kamado, asado, embutidos, dry-aged… reserva rápido.", image: "/photos-2026/bbq-expo-720.jpg", href: "/program/masterclasses" },
      { kicker: "Socio oficial", title: "Zip Feux, patrocinador de la Grill Arena.", excerpt: "Tras tres ediciones, la marca de pastillas de encendido de herencia irlandesa se convierte en socio oficial 2027 y patrocinador de la Grill Arena. Historia, gama y compromisos sostenibles.", image: "/partners/zip-feux/hero.jpg", href: "/actualites/zip-feux-partenaire-officiel-2027" },
    ],
  },
  de: {
    eyebrow: "Vor dem Besuch lesen",
    title: "Fünf Geschichten, um 2027 zu verstehen.",
    cta: "Weiterlesen",
    stories: [
      { kicker: "Neues Format", title: "Grill Arena, das einzige Live-BBQ-Battle in Europa.", excerpt: "Sechzehn Pitmaster, 90 Minuten pro Duell, ein einziger Champion, gekürt am Sonntagabend. Weder Spoga Gafa noch BBQ Expo Italy haben das. So funktioniert es.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg", href: "/grill-arena" },
      { kicker: "Erste Ausgabe", title: "Die Awards, die die besten Marken auszeichnen.", excerpt: "Gold, Silber, Bronze in sechs Kategorien. Internationale Jury, Blindbewertung, Zeremonie im Parc Floral. Eine Medaille wird ein Jahr lang zum Verkaufsargument.", image: "/photos-2026/bbq-expo-105.jpg", href: "/awards" },
      { kicker: "Zwanzig Porträts", title: "Die Pitmaster 2027, einer nach dem anderen.", excerpt: "Von Texas bis Japan, von Buenos Aires bis Florenz. Zwanzig internationale Gäste, zwanzig verschiedene Arten, mit Feuer zu kochen. Filter nach Land, Spezialität, Anwesenheitstag.", image: "/photos-2026/william-plin-jpc-110426-533a4856.jpg", href: "/pitmasters" },
      { kicker: "Zwölf Sessions", title: "Die Masterclasses, die in zwei Wochen ausgebucht sind.", excerpt: "Maximal zwanzig Plätze pro Session. Ein internationaler Pitmaster zeigt es Ihnen, korrigiert Sie, lässt Sie probieren. Brisket, Kamado, Asado, Wurstwaren, Dry-Aged… schnell buchen.", image: "/photos-2026/bbq-expo-720.jpg", href: "/program/masterclasses" },
      { kicker: "Offizieller Partner", title: "Zip Feux, Sponsor der Grill Arena.", excerpt: "Nach drei Ausgaben wird die Anzündermarke mit irischen Wurzeln offizieller Partner 2027 und Sponsor der Grill Arena. Geschichte, Sortiment und Nachhaltigkeitsversprechen.", image: "/partners/zip-feux/hero.jpg", href: "/actualites/zip-feux-partenaire-officiel-2027" },
    ],
  },
  nl: {
    eyebrow: "Lees dit voor je komt",
    title: "Vijf verhalen om 2027 te begrijpen.",
    cta: "Lees verder",
    stories: [
      { kicker: "Nieuw format", title: "Grill Arena, de enige live BBQ-battle in Europa.", excerpt: "Zestien pitmasters, 90 minuten per duel, één kampioen gekroond op zondagavond. Spoga Gafa noch BBQ Expo Italy heeft het. Zo werkt het.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg", href: "/grill-arena" },
      { kicker: "Eerste editie", title: "De Awards die de beste merken onderscheiden.", excerpt: "Goud, zilver, brons in zes categorieën. Internationale jury, blinde beoordeling, ceremonie in het Parc Floral. Een medaille wordt een jaar lang een verkoopargument.", image: "/photos-2026/bbq-expo-105.jpg", href: "/awards" },
      { kicker: "Twintig portretten", title: "De pitmasters van 2027, één voor één.", excerpt: "Van Texas tot Japan, van Buenos Aires tot Florence. Twintig internationale gasten, twintig verschillende manieren om met vuur te koken. Filter op land, specialiteit, aanwezigheidsdag.", image: "/photos-2026/william-plin-jpc-110426-533a4856.jpg", href: "/pitmasters" },
      { kicker: "Twaalf sessies", title: "De masterclasses die in twee weken vol zitten.", excerpt: "Maximaal twintig plaatsen per sessie. Een internationale pitmaster laat het je zien, corrigeert je, laat je proeven. Brisket, kamado, asado, charcuterie, dry-aged… boek snel.", image: "/photos-2026/bbq-expo-720.jpg", href: "/program/masterclasses" },
      { kicker: "Officiële partner", title: "Zip Feux, sponsor van de Grill Arena.", excerpt: "Na drie edities wordt het aanmaakblokjesmerk met Ierse wortels officiële partner 2027 en sponsor van de Grill Arena. Geschiedenis, assortiment en duurzame engagementen.", image: "/partners/zip-feux/hero.jpg", href: "/actualites/zip-feux-partenaire-officiel-2027" },
    ],
  },
  pt: {
    eyebrow: "Para ler antes de vir",
    title: "Cinco histórias para compreender 2027.",
    cta: "Ler mais",
    stories: [
      { kicker: "Formato inédito", title: "Grill Arena, a única battle BBQ ao vivo na Europa.", excerpt: "Dezasseis pitmasters, 90 minutos por duelo, um só campeão coroado no domingo à noite. Nem a Spoga Gafa nem a BBQ Expo Italy o têm. Eis como funciona.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg", href: "/grill-arena" },
      { kicker: "Primeira edição", title: "Os Awards que distinguem as melhores marcas.", excerpt: "Ouro, prata e bronze em seis categorias. Júri internacional, avaliação às cegas, cerimónia no Parc Floral. Uma medalha torna-se um argumento de venda durante um ano.", image: "/photos-2026/bbq-expo-105.jpg", href: "/awards" },
      { kicker: "Vinte retratos", title: "Os pitmasters de 2027, um a um.", excerpt: "Do Texas ao Japão, de Buenos Aires a Florença. Vinte convidados internacionais, vinte maneiras diferentes de cozinhar com fogo. Filtros por país, especialidade e dia de presença.", image: "/photos-2026/william-plin-jpc-110426-533a4856.jpg", href: "/pitmasters" },
      { kicker: "Doze sessões", title: "As masterclasses que esgotam em duas semanas.", excerpt: "Vinte lugares no máximo por sessão. Um pitmaster internacional mostra, corrige e dá a provar. Brisket, kamado, asado, charcutaria, dry-aged… reserve depressa.", image: "/photos-2026/bbq-expo-720.jpg", href: "/program/masterclasses" },
      { kicker: "Parceiro oficial", title: "Zip Feux, patrocinador da Grill Arena.", excerpt: "Após três edições, a marca de acendalhas de herança irlandesa torna-se parceiro oficial 2027 e patrocinador da Grill Arena. História, gama e compromissos sustentáveis.", image: "/partners/zip-feux/hero.jpg", href: "/actualites/zip-feux-partenaire-officiel-2027" },
    ],
  },
  it: {
    eyebrow: "Da leggere prima di venire",
    title: "Cinque storie per capire il 2027.",
    cta: "Leggi di più",
    stories: [
      { kicker: "Formato inedito", title: "Grill Arena, l'unica battle BBQ dal vivo in Europa.", excerpt: "Sedici pitmaster, 90 minuti per duello, un solo campione incoronato la domenica sera. Né Spoga Gafa né BBQ Expo Italy ce l'hanno. Ecco come funziona.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg", href: "/grill-arena" },
      { kicker: "Prima edizione", title: "Gli Awards che premiano i migliori marchi.", excerpt: "Oro, argento, bronzo in sei categorie. Giuria internazionale, valutazione alla cieca, cerimonia al Parc Floral. Una medaglia diventa un argomento di vendita per un anno.", image: "/photos-2026/bbq-expo-105.jpg", href: "/awards" },
      { kicker: "Venti ritratti", title: "I pitmaster del 2027, uno per uno.", excerpt: "Dal Texas al Giappone, da Buenos Aires a Firenze. Venti ospiti internazionali, venti modi diversi di cucinare con il fuoco. Filtri per paese, specialità, giorno di presenza.", image: "/photos-2026/william-plin-jpc-110426-533a4856.jpg", href: "/pitmasters" },
      { kicker: "Dodici sessioni", title: "Le masterclass che si riempiono in due settimane.", excerpt: "Venti posti al massimo per sessione. Un pitmaster internazionale ti mostra, ti corregge, ti fa assaggiare. Brisket, kamado, asado, salumi, dry-aged… prenota in fretta.", image: "/photos-2026/bbq-expo-720.jpg", href: "/program/masterclasses" },
      { kicker: "Partner ufficiale", title: "Zip Feux, sponsor della Grill Arena.", excerpt: "Dopo tre edizioni, il marchio di accendifuoco dalle radici irlandesi diventa partner ufficiale 2027 e sponsor della Grill Arena. Storia, gamma e impegni sostenibili.", image: "/partners/zip-feux/hero.jpg", href: "/actualites/zip-feux-partenaire-officiel-2027" },
    ],
  },
};

const ARIA: Record<string, string> = {
  fr: "À la une", en: "Featured", es: "Destacados", de: "Im Fokus", nl: "Uitgelicht", pt: "Em destaque", it: "In evidenza",
};

export default function LatestStories() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section
      className="relative w-full bg-ink-950 py-14 md:py-20 overflow-hidden"
      aria-label={ARIA[locale] || ARIA.fr}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-gold-500/15 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <h2
          className="text-cream-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] font-bold mb-12 md:mb-16 max-w-4xl"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          {ui.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {ui.stories.map((s, i) => (
            <Link
              key={i}
              href={s.href}
              className="group relative block aspect-[16/10] overflow-hidden rounded-sm bg-char-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              <Image
                src={s.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent opacity-90"
                aria-hidden="true"
              />
              <div
                className="absolute inset-3 ring-1 ring-gold-500/0 group-hover:ring-gold-500/60 transition-all duration-500 pointer-events-none rounded-sm"
                aria-hidden="true"
              />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-cream-50">
                <div className="text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-3">
                  {s.kicker}
                </div>
                <h3
                  className="text-2xl md:text-3xl lg:text-4xl leading-tight font-bold mb-3"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-cream-50/80 text-sm md:text-base leading-relaxed line-clamp-3 mb-4">
                  {s.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-cream-50 text-xs md:text-sm font-bold uppercase tracking-widest">
                  <span>{ui.cta}</span>
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={2.5}
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
