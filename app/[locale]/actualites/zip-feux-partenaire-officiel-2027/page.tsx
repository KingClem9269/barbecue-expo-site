import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import EcosystemLinks from "@/components/ecosystem/EcosystemLinks";

const PATH = "/actualites/zip-feux-partenaire-officiel-2027";

type Section = { h: string; p: string[]; list?: string[] };
type Article = {
  kicker: string;
  title: string;
  lead: string;
  badge: string;
  sections: Section[];
  productsCaption: string;
  quote: string;
  quoteAuthor: string;
  ctaTitle: string;
  ctaText: string;
  ctaArena: string;
  ctaExpo: string;
  more: string;
};

const ARTICLE: Record<string, Article> = {
  fr: {
    kicker: "Partenaire officiel 2027",
    title: "Zip Feux, partenaire officiel de Barbecue Expo et sponsor de la Grill Arena",
    lead: "Après trois éditions passées à nos côtés, la marque d'allume-feux à l'héritage irlandais franchit un cap : elle devient partenaire officiel du salon et sponsor de la Grill Arena, le cœur battant de la compétition. Portrait d'un acteur qui maîtrise le feu depuis près d'un siècle.",
    badge: "Partenaire officiel · Sponsor de la Grill Arena",
    sections: [
      {
        h: "Trois ans de présence, un partenariat qui s'impose",
        p: [
          "Il y a des marques qui passent, et d'autres qui s'installent. Depuis trois ans, Zip Feux fait partie du paysage de Barbecue Expo : un stand fidèle, une équipe passionnée et un produit que tout barbecuist connaît, même sans toujours le nommer — l'allume-feu, ce petit geste qui transforme une pile de charbon en braise prête à cuire.",
          "En 2027, cette présence devient une véritable alliance. Zip Feux rejoint le cercle des partenaires officiels du salon et appose son nom sur l'événement le plus spectaculaire du Parc Floral : la Grill Arena, où s'affrontent en direct les meilleurs pitmasters. Un symbole limpide — car avant chaque battle, avant chaque braise, il y a une étincelle. Et cette étincelle, c'est précisément le métier de Zip.",
        ],
      },
      {
        h: "Plus de 80 ans à maîtriser le feu",
        p: [
          "Derrière Zip Feux se cache Zip®, une marque à l'héritage irlandais revendiqué, éditée par Standard Brands au sein du groupe SHS. Son slogan dit tout : « Zip®, dans le feu de l'action depuis 80 ans ». Une longévité rare, née d'une invention fondatrice — l'allume-feu au kérosène — qui a lancé une longue tradition d'innovation et de fiabilité.",
          "De son site historique de Castlebellingham, en Irlande, la marque rayonne aujourd'hui sur de nombreux marchés : Royaume-Uni, Irlande, France, Belgique, Canada et États-Unis. Un acteur international, mais qui a gardé l'exigence d'un fabricant attaché à son savoir-faire, attentif à ses responsabilités en matière de santé-sécurité, d'environnement et de contrôle qualité.",
        ],
      },
      {
        h: "Une gamme pensée pour tous les feux",
        p: ["Si Zip est née de l'allume-feu, sa gamme couvre aujourd'hui l'ensemble du rituel du feu :"],
        list: [
          "Allume-feux au kérosène — l'original, gage d'allumage rapide et fiable ;",
          "Allume-feux naturels — la gamme écologique, qui représente déjà 25 % des ventes de la marque ;",
          "Charbon de bois pour barbecue — pour passer de l'étincelle à la cuisson ;",
          "Combustibles d'hiver — pour la cheminée, le poêle et le brasero.",
        ],
      },
      {
        h: "Un partenaire engagé pour un feu plus responsable",
        p: [
          "C'est sans doute là que Zip Feux surprend le plus. Loin de l'image parfois polluante des produits d'allumage, la marque mène un programme de développement durable sur cinq ans aux résultats très concrets :",
        ],
        list: [
          "Énergie : le site de Castlebellingham fonctionne désormais 100 % à l'énergie renouvelable (contre 10 % avant mars 2022) ;",
          "Eau : 9,5 millions de litres économisés sur cinq ans, soit −50 % de consommation sur la fabrication ;",
          "Déchets : zéro enfouissement, tout est valorisé énergétiquement ;",
          "Emballages : refonte en 2023 avec des matériaux renouvelables (comme la canne à sucre), soit l'équivalent de 1 430 arbres préservés. Produits certifiés FSC®.",
        ],
      },
      {
        h: "Sponsor de la Grill Arena : au cœur du feu de l'action",
        p: [
          "En s'associant à la Grill Arena, Zip Feux ne choisit pas n'importe quelle zone du salon. C'est le théâtre du salon : seize pitmasters, des duels en direct, un champion couronné devant le public. Et tout commence par un allumage. Difficile d'imaginer association plus naturelle entre une marque dont le métier est de déclencher le feu et un format dont l'ADN est l'intensité du feu vif.",
          "Pour les visiteurs comme pour les exposants, ce partenariat envoie un signal fort : Barbecue Expo 2027 s'entoure d'acteurs historiques, fiables et engagés, qui partagent une même passion — celle du feu bien maîtrisé.",
        ],
      },
    ],
    productsCaption: "La gamme Zip Feux : allume-feux, charbon et combustibles.",
    quote:
      "Après trois éditions, devenir partenaire officiel de Barbecue Expo et sponsor de la Grill Arena était une évidence. C'est l'événement qui rassemble toute notre communauté autour de ce que nous faisons depuis 80 ans : allumer le feu.",
    quoteAuthor: "Laurene Parkin — Zip Feux",
    ctaTitle: "Retrouvez Zip Feux à Barbecue Expo 2027",
    ctaText:
      "Rendez-vous les 12, 13 et 14 mars 2027 au Parc Floral de Paris pour découvrir Zip Feux et assister aux affrontements de la Grill Arena qu'ils sponsorisent.",
    ctaArena: "Découvrir la Grill Arena",
    ctaExpo: "Devenir partenaire / exposant",
    more: "Pour aller plus loin",
  },
  en: {
    kicker: "Official partner 2027",
    title: "Zip Feux, official partner of Barbecue Expo and Grill Arena sponsor",
    lead: "After three editions by our side, the firelighter brand with Irish heritage steps up: it becomes an official partner of the show and sponsor of the Grill Arena, the beating heart of the competition. Portrait of a company that has mastered fire for nearly a century.",
    badge: "Official partner · Grill Arena sponsor",
    sections: [
      {
        h: "Three years of presence, a partnership that became obvious",
        p: [
          "Some brands pass through; others put down roots. For three years, Zip Feux has been part of the Barbecue Expo landscape: a loyal stand, a passionate team and a product every barbecue lover knows — the firelighter, the small gesture that turns a pile of charcoal into cooking-ready embers.",
          "In 2027, that presence becomes a true alliance. Zip Feux joins the circle of official partners and puts its name on the show's most spectacular event: the Grill Arena, where the best pitmasters go head-to-head live. A clear symbol — because before every battle, before every ember, there is a spark. And that spark is exactly Zip's craft.",
        ],
      },
      {
        h: "Over 80 years mastering fire",
        p: [
          "Behind Zip Feux is Zip®, a brand with proud Irish heritage, made by Standard Brands within the SHS Group. Its tagline says it all: “Zip®, in the heat of the action for 80 years.” A rare longevity, born of a founding invention — the kerosene firelighter — that launched a long tradition of innovation and reliability.",
          "From its historic Castlebellingham site in Ireland, the brand now reaches many markets: the UK, Ireland, France, Belgium, Canada and the United States. An international player that has kept the standards of a maker attached to its craft, attentive to its responsibilities in health & safety, the environment and quality control.",
        ],
      },
      {
        h: "A range for every fire",
        p: ["Born from the firelighter, Zip's range now covers the whole fire ritual:"],
        list: [
          "Kerosene firelighters — the original, for fast, reliable lighting;",
          "Natural firelighters — the eco range, already 25% of the brand's sales;",
          "Barbecue charcoal — from spark to cooking;",
          "Winter fuels — for the fireplace, stove and fire pit.",
        ],
      },
      {
        h: "A partner committed to more responsible fire",
        p: [
          "This is perhaps where Zip Feux surprises most. Far from the sometimes-polluting image of lighting products, the brand runs a five-year sustainability programme with very concrete results:",
        ],
        list: [
          "Energy: the Castlebellingham site now runs on 100% renewable energy (vs 10% before March 2022);",
          "Water: 9.5 million litres saved over five years, i.e. −50% manufacturing consumption;",
          "Waste: zero landfill, everything recovered for energy;",
          "Packaging: redesigned in 2023 with renewable materials (such as sugarcane), saving the equivalent of 1,430 trees. FSC® certified products.",
        ],
      },
      {
        h: "Grill Arena sponsor: at the heart of the action",
        p: [
          "By backing the Grill Arena, Zip Feux doesn't pick just any zone. It's the show's main stage: sixteen pitmasters, live duels, a champion crowned in front of the crowd. And it all starts with a light. Hard to imagine a more natural match between a brand whose job is to start the fire and a format whose DNA is the intensity of live flame.",
          "For visitors and exhibitors alike, this partnership sends a strong signal: Barbecue Expo 2027 surrounds itself with established, reliable and committed players who share one passion — fire, well mastered.",
        ],
      },
    ],
    productsCaption: "The Zip Feux range: firelighters, charcoal and fuels.",
    quote:
      "After three editions, becoming an official partner of Barbecue Expo and sponsor of the Grill Arena was obvious. It's the event that brings our whole community together around what we've been doing for 80 years: lighting the fire.",
    quoteAuthor: "Laurene Parkin — Zip Feux",
    ctaTitle: "Meet Zip Feux at Barbecue Expo 2027",
    ctaText:
      "Join us on 12, 13 and 14 March 2027 at Parc Floral de Paris to discover Zip Feux and watch the Grill Arena battles they sponsor.",
    ctaArena: "Discover the Grill Arena",
    ctaExpo: "Become a partner / exhibitor",
    more: "Read more",
  },
};

const ALIASES: Record<string, "fr" | "en"> = { es: "fr", de: "fr", nl: "fr", pt: "fr", it: "fr" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const a = ARTICLE[locale] || ARTICLE[ALIASES[locale] || "fr"];
  return buildMetadata(locale, PATH, {
    title: `${a.title} — Barbecue Expo`,
    description: a.lead,
  });
}

export default async function ZipFeuxArticle() {
  const locale = await getLocale();
  const a = ARTICLE[locale] || ARTICLE[ALIASES[locale] || "fr"];

  return (
    <article className="bg-cream-50">
      {/* Hero */}
      <header className="relative w-full min-h-[60dvh] md:min-h-[70dvh] overflow-hidden bg-ink-950 flex items-end">
        <Image
          src="/partners/zip-feux/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/20" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto w-full px-6 md:px-12 pb-12 md:pb-16">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-5">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {a.kicker}
          </div>
          <h1
            className="text-cream-50 text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {a.title}
          </h1>
        </div>
      </header>

      {/* Corps */}
      <div className="max-w-2xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Badge partenaire + logo */}
        <div className="flex items-center gap-4 rounded-lg border border-ink-200 bg-white p-4 mb-10">
          <div className="relative w-20 h-20 shrink-0 rounded-md bg-white ring-1 ring-ink-100 overflow-hidden">
            <Image src="/partners/zip-feux/logo.png" alt="Zip Feux" fill sizes="80px" className="object-contain p-1.5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gold-600">Zip Feux</p>
            <p className="text-ink-700 text-sm">{a.badge}</p>
          </div>
        </div>

        <p className="text-ink-800 text-lg md:text-xl leading-relaxed font-medium mb-10">{a.lead}</p>

        {a.sections.map((s, i) => (
          <section key={i} className="mb-10">
            <h2
              className="text-ink-900 text-2xl md:text-3xl font-bold leading-tight mb-4"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {s.h}
            </h2>
            {s.p.map((para, j) => (
              <p key={j} className="text-ink-700 leading-relaxed mb-4">
                {para}
              </p>
            ))}
            {s.list && (
              <ul className="flex flex-col gap-2 mt-2">
                {s.list.map((li, k) => (
                  <li key={k} className="flex gap-3 text-ink-700 leading-relaxed">
                    <span className="mt-2 inline-block w-1.5 h-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Visuel gamme après la section "gamme" (index 2) */}
            {i === 2 && (
              <figure className="mt-8">
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-white ring-1 ring-ink-100">
                  <Image
                    src="/partners/zip-feux/produits.png"
                    alt={a.productsCaption}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-contain p-4"
                  />
                </div>
                <figcaption className="mt-2 text-center text-ink-500 text-sm">{a.productsCaption}</figcaption>
              </figure>
            )}
          </section>
        ))}

        {/* Citation */}
        <blockquote className="my-12 border-l-4 border-gold-500 pl-6">
          <p
            className="text-ink-900 text-xl md:text-2xl leading-snug italic"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            « {a.quote} »
          </p>
          <footer className="mt-3 text-sm font-bold uppercase tracking-widest text-gold-700">
            {a.quoteAuthor}
          </footer>
        </blockquote>

        {/* CTA */}
        <div className="rounded-lg bg-ink-950 text-cream-50 p-7 md:p-9">
          <h2
            className="text-2xl md:text-3xl font-bold leading-tight"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {a.ctaTitle}
          </h2>
          <p className="mt-3 text-cream-50/80 leading-relaxed">{a.ctaText}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/grill-arena"
              className="group inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
            >
              {a.ctaArena}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </Link>
            <Link
              href="/devenez-exposants"
              className="group inline-flex items-center justify-center gap-2 border border-cream-50/30 hover:border-gold-500 text-cream-50 hover:text-gold-500 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
            >
              {a.ctaExpo}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* Maillage écosystème */}
        <div className="mt-10">
          <EcosystemLinks locale={locale} items={["mag"]} title={a.more} />
        </div>
      </div>
    </article>
  );
}
