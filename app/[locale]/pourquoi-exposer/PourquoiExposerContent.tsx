"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowUpRight,
  Users,
  Globe,
  Target,
  BarChart3,
  Eye,
  Flame,
  ChefHat,
  Utensils,
  Leaf,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Counter hook                                                       */
/* ------------------------------------------------------------------ */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(ease * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ------------------------------------------------------------------ */
/*  Media logos                                                        */
/* ------------------------------------------------------------------ */
const MEDIA_LOGOS = [
  { file: "601ceb6719_tf1.jpeg", alt: "TF1" },
  { file: "a432333a48_m6.jpeg", alt: "M6" },
  { file: "f56c29df25_tmc.jpeg", alt: "TMC" },
  { file: "36b048c175_bfmtv.jpeg", alt: "BFM TV" },
  { file: "573c7ca1c5_franceinfo.jpeg", alt: "France Info" },
  { file: "a7ee06bae4_franceinter.jpeg", alt: "France Inter" },
  { file: "c96cc6f02f_radiofrance.jpeg", alt: "Radio France" },
  { file: "a0e33f5345_europe2.jpeg", alt: "Europe 2" },
  { file: "8c90408a64_20min.jpeg", alt: "20 Minutes" },
  { file: "e244e9ccbf_habitat.jpeg", alt: "Habitat" },
  { file: "ed8659d918_france1.jpeg", alt: "France TV" },
];

/* ------------------------------------------------------------------ */
/*  Partner brand logos                                                */
/* ------------------------------------------------------------------ */
const BRAND_LOGOS = [
  "7a5907deca_napoleoin.png",
  "0710c00822_campingaz.png",
  "c03ec5ca0a_charbroil.png",
  "8dbe912df5_logo-weber-svg-1.png",
  "25eb4257c0_pitboss.png",
  "9ffc7e2043_kamado-joe.png",
  "d37c7b4e80_grillobois.png",
  "efa4b26c2c_barbecook.png",
  "fd46ad7c34_monolith.png",
  "ce441e7ae5_masterbuilt.png",
  "0ee44fae1e_traeger.png",
  "46a68bad93_ofyr2.png",
  "7a1e7585f5_oklahoma-joe-s.png",
  "0404b28de9_char-griller.png",
  "78c2396828_le-marquier.png",
  "c6aae8d21e_bastard.png",
  "406e7d7fe6_eno.png",
];

/* ------------------------------------------------------------------ */
/*  Icon helper                                                        */
/* ------------------------------------------------------------------ */
function getIcon(name: string, className: string) {
  const props = { className, strokeWidth: 1.5 };
  switch (name) {
    case "target": return <Target {...props} />;
    case "chart": return <BarChart3 {...props} />;
    case "sparkles": return <Sparkles {...props} />;
    case "globe": return <Globe {...props} />;
    case "eye": return <Eye {...props} />;
    case "flame": return <Flame {...props} />;
    case "utensils": return <Utensils {...props} />;
    case "leaf": return <Leaf {...props} />;
    case "chef": return <ChefHat {...props} />;
    case "bag": return <ShoppingBag {...props} />;
    default: return <Sparkles {...props} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Stat counter                                                       */
/* ------------------------------------------------------------------ */
function StatBlock({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div
        className="text-gold-500 text-5xl sm:text-6xl md:text-7xl font-bold leading-none"
        style={{ fontFamily: "SansPlomb-98, sans-serif" }}
      >
        {count.toLocaleString("fr-FR")}
        <span className="text-3xl sm:text-4xl md:text-5xl">{suffix}</span>
      </div>
      <div className="mt-2 text-cream-50/70 text-sm md:text-base uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  i18n content                                                       */
/* ------------------------------------------------------------------ */
const UI = {
  fr: {
    eyebrow: "Pour les marques · Édition 2027",
    heroTitle: { line1: "Pourquoi exposer", line2: "à Barbecue Expo ?" },
    heroSubtitle:
      "Le salon de référence en Europe pour développer vos ventes, votre réseau et votre notoriété.",
    statsEyebrow: "Édition 2026 — les chiffres",
    stats: [
      { value: 20000, suffix: " m²", label: "Exposition indoor & outdoor" },
      { value: 250, suffix: "", label: "Marques exposantes" },
      { value: 25896, suffix: "", label: "Visiteurs (dont 5 000 pro)" },
      { value: 9, suffix: " pays", label: "Acheteurs internationaux" },
    ],
    benefitsTitle: "En trois jours, accélérez votre croissance.",
    benefits: [
      { icon: "target", title: "Générer des leads qualifiés", desc: "Rencontrez vos futurs clients, prescripteurs et distributeurs lors de rendez-vous B2B pré-qualifiés." },
      { icon: "chart", title: "Vendre plus vite", desc: "Présentez vos nouveautés à un public expert prêt à acheter, tester et référencer." },
      { icon: "sparkles", title: "Lancer vos nouveautés", desc: "Le salon est la scène idéale pour créer l'événement autour de votre innovation." },
      { icon: "globe", title: "Accélérer à l'international", desc: "Acheteurs de 9 pays, distributeurs européens, HORECA — développez vos exports depuis un seul stand." },
      { icon: "eye", title: "Renforcer votre image de marque", desc: "Visibilité presse, cooking shows sponsorisés, masterclass — positionnez-vous comme leader." },
    ],
    reasonsTitle: "Cinq raisons concrètes d'exposer en 2027.",
    reasons: [
      {
        number: "01",
        title: "Une audience qui n'est pas en balade.",
        body: "Vingt-cinq mille huit cent quatre-vingt-seize visiteurs en 2026. Plus de la moitié sont des prescripteurs : journalistes spécialisés, chefs, pitmasters, revendeurs, distributeurs. Vos cibles sont déjà là.",
        image: "/photos-2026/bbq-expo-184.jpg",
      },
      {
        number: "02",
        title: "Le matchmaking B2B, vraiment.",
        body: "Trois mois avant le salon, vous recevez la liste complète des acheteurs présents : enseignes spécialisées, GMS, e-commerçants, distributeurs européens, HORECA. Vous demandez vos rendez-vous, nous bloquons les créneaux.",
        image: "/photos-2026/william-plin-jpc-120426-533a6497.jpg",
      },
      {
        number: "03",
        title: "L'Europe en trois jours.",
        body: "Quinze pays exposants. Vingt-cinq nationalités côté visiteurs. Le seul endroit en Europe où votre marque peut, depuis un seul stand, parler à un acheteur belge, à un distributeur allemand et à un e-commerçant espagnol.",
        image: "/photos-2026/bbq-expo-403.jpg",
      },
      {
        number: "04",
        title: "Les Awards 2027 distinguent les meilleurs.",
        body: "Première édition des Barbecue Expo Awards. Or, argent, bronze sur cinq catégories : Innovation, Accessoire, Design, Rapport qualité-prix, Marque émergente. Une médaille, c'est un argument de vente pendant un an.",
        image: "/photos-2026/bbq-expo-105.jpg",
      },
      {
        number: "05",
        title: "Votre présence presse multipliée.",
        body: "Médias gastronomiques, presse outdoor, podcasts BBQ, blogueurs — cinq communiqués envoyés par mois pendant les six mois précédant le salon. Photos HD de votre stand partagées avec la presse partenaire.",
        image: "/photos-2026/bbq-expo-720.jpg",
      },
    ],
    segmentTitle: "Tous les univers du barbecue.",
    segments: [
      { icon: "flame", title: "Fabricants BBQ", desc: "Barbecues charbon, gaz, pellets, kamados, électriques, hybrides." },
      { icon: "utensils", title: "Accessoires & équipements", desc: "Planches, thermomètres, ustensiles, housses, fumoirs, rotissoires." },
      { icon: "leaf", title: "Combustibles & innovations", desc: "Charbon, briquettes, pellets, allumage, bois de fumage." },
      { icon: "chef", title: "Cuisines d'extérieur", desc: "Îlots, planchas, fours à pizza, braseros, mobilier outdoor." },
      { icon: "bag", title: "Food & ingrédients", desc: "Rubs, sauces, marinades, épices, viandes premium, fumoirs alimentaires." },
      { icon: "sparkles", title: "Nouveaux entrants", desc: "Startups, marques D2C, innovations tech, IoT & smart grilling." },
    ],
    visitorsTitle: "Qui vient au salon ?",
    visitors: [
      "Retailers spécialisés",
      "Acheteurs GSA / GSB / GSS",
      "Distributeurs européens",
      "HORECA & CHR",
      "Prescripteurs & presse",
      "Pitmasters & chefs",
    ],
    b2bTitle: "Plateforme B2B intégrée.",
    b2bFeatures: [
      "Prise de rendez-vous en ligne avant le salon",
      "Profils acheteurs vérifiés et qualifiés",
      "Matchmaking intelligent marque ↔ acheteur",
      "Agenda partagé et rappels automatiques",
      "Suivi post-salon et analytics de contacts",
    ],
    visibilityTitle: "Quatre formats de visibilité.",
    visibilityFormats: [
      { title: "Cooking shows sponsorisés", desc: "Votre marque en scène devant 500 spectateurs par session." },
      { title: "Masterclass & démonstrations", desc: "Positionnez-vous comme expert avec des sessions dédiées." },
      { title: "Visibilité digitale", desc: "Site, newsletters, réseaux sociaux — 200 000 impressions garanties." },
      { title: "Branding zones", desc: "Entrées, allées, zones dégustation — votre marque partout." },
    ],
    mediaTitle: "Ils en ont parlé.",
    brandsTitle: "Ils nous font confiance.",
    brandsCta: "Voir tous les exposants",
    closingQuote:
      "Le bon salon, au bon moment, avec les bonnes personnes. Trois jours, et un an de retour sur investissement.",
    cta: { label: "Demander le dossier exposant", href: "/devenez-exposants" },
    ctaSecondary: { label: "Voir l'espace Pro & B2B", href: "/espace-pro-b2b" },
  },
  en: {
    eyebrow: "For brands · 2027 edition",
    heroTitle: { line1: "Why exhibit", line2: "at Barbecue Expo?" },
    heroSubtitle:
      "Europe's leading trade show to grow your sales, network and brand awareness.",
    statsEyebrow: "2026 edition — key figures",
    stats: [
      { value: 20000, suffix: " m²", label: "Indoor & outdoor exhibition" },
      { value: 250, suffix: "", label: "Exhibiting brands" },
      { value: 25896, suffix: "", label: "Visitors (incl. 5,000 trade)" },
      { value: 9, suffix: " countries", label: "International buyers" },
    ],
    benefitsTitle: "In three days, accelerate your growth.",
    benefits: [
      { icon: "target", title: "Generate qualified leads", desc: "Meet future clients, specifiers and distributors via pre-qualified B2B meetings." },
      { icon: "chart", title: "Sell faster", desc: "Present your new products to an expert audience ready to buy, test and stock." },
      { icon: "sparkles", title: "Launch your innovations", desc: "The show is the ideal stage to create buzz around your latest product." },
      { icon: "globe", title: "Accelerate internationally", desc: "Buyers from 9 countries, European distributors, HORECA — grow your exports from a single booth." },
      { icon: "eye", title: "Strengthen your brand", desc: "Press visibility, sponsored cooking shows, masterclass — position yourself as a leader." },
    ],
    reasonsTitle: "Five concrete reasons to exhibit in 2027.",
    reasons: [
      { number: "01", title: "An audience that isn't strolling.", body: "25,896 visitors in 2026. Over half are specifiers: specialist journalists, chefs, pitmasters, resellers, distributors. Your targets are already there.", image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "B2B matchmaking, for real.", body: "Three months before the show, you receive the complete list of attending buyers: specialty chains, mass retailers, e-commerce, European distributors, HORECA. You request meetings, we lock the slots.", image: "/photos-2026/william-plin-jpc-120426-533a6497.jpg" },
      { number: "03", title: "Europe in three days.", body: "Fifteen exhibiting countries. Twenty-five visitor nationalities. The only place in Europe where your brand can, from a single booth, talk to a Belgian buyer, German distributor, and Spanish e-retailer.", image: "/photos-2026/bbq-expo-403.jpg" },
      { number: "04", title: "The 2027 Awards distinguish the best.", body: "First edition of the Barbecue Expo Awards. Gold, silver, bronze in five categories: Innovation, Accessory, Design, Value, Emerging Brand. A medal is a selling argument for a full year.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "05", title: "Your press presence multiplied.", body: "Food media, outdoor press, BBQ podcasts, bloggers — five releases per month during the six months before the show. HD photos of your booth shared with press partners.", image: "/photos-2026/bbq-expo-720.jpg" },
    ],
    segmentTitle: "Every BBQ universe.",
    segments: [
      { icon: "flame", title: "BBQ Manufacturers", desc: "Charcoal, gas, pellet, kamado, electric, hybrid barbecues." },
      { icon: "utensils", title: "Accessories & equipment", desc: "Planks, thermometers, tools, covers, smokers, rotisseries." },
      { icon: "leaf", title: "Fuels & innovations", desc: "Charcoal, briquettes, pellets, firestarters, smoking wood." },
      { icon: "chef", title: "Outdoor kitchens", desc: "Islands, planchas, pizza ovens, fire pits, outdoor furniture." },
      { icon: "bag", title: "Food & ingredients", desc: "Rubs, sauces, marinades, spices, premium meats, food smokers." },
      { icon: "sparkles", title: "New entrants", desc: "Startups, D2C brands, tech innovations, IoT & smart grilling." },
    ],
    visitorsTitle: "Who visits the show?",
    visitors: [
      "Specialist retailers",
      "GSA / GSB / GSS buyers",
      "European distributors",
      "HORECA & CHR",
      "Specifiers & press",
      "Pitmasters & chefs",
    ],
    b2bTitle: "Integrated B2B platform.",
    b2bFeatures: [
      "Online meeting scheduling before the show",
      "Verified and qualified buyer profiles",
      "Smart brand ↔ buyer matchmaking",
      "Shared agenda and automatic reminders",
      "Post-show follow-up and contact analytics",
    ],
    visibilityTitle: "Four visibility formats.",
    visibilityFormats: [
      { title: "Sponsored cooking shows", desc: "Your brand on stage in front of 500 spectators per session." },
      { title: "Masterclass & demos", desc: "Position yourself as an expert with dedicated sessions." },
      { title: "Digital visibility", desc: "Website, newsletters, social media — 200,000 guaranteed impressions." },
      { title: "Branding zones", desc: "Entrances, aisles, tasting areas — your brand everywhere." },
    ],
    mediaTitle: "Featured in.",
    brandsTitle: "They trust us.",
    brandsCta: "See all exhibitors",
    closingQuote: "The right show, at the right time, with the right people. Three days, one full year of ROI.",
    cta: { label: "Request the exhibitor kit", href: "/devenez-exposants" },
    ctaSecondary: { label: "See Pro & B2B area", href: "/espace-pro-b2b" },
  },
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function PourquoiExposerContent({ locale }: { locale: string }) {
  const ui = (UI as Record<string, typeof UI.fr>)[locale] || UI.fr;

  return (
    <article className="bg-cream-50">
      {/* ── Hero ── */}
      <section className="relative w-full min-h-[100dvh] overflow-hidden bg-ink-950">
        <Image
          src="/photos-2026/bbq-expo-008.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-end min-h-[100dvh]">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10 md:mb-14">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>

          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.92] tracking-tight font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            <span className="block">{ui.heroTitle.line1}</span>
            <span className="block text-gold-500">{ui.heroTitle.line2}</span>
          </h1>

          <p className="mt-10 md:mt-14 text-cream-50/90 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl font-light">
            {ui.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ── Key figures ── */}
      <section className="bg-ink-950 py-12 md:py-16 border-t border-cream-50/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-12 justify-center">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.statsEyebrow}
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {ui.stats.map((s) => (
              <StatBlock key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits grid ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2
            className="text-ink-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-16 max-w-4xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ui.benefits.map((b) => (
              <div
                key={b.title}
                className="group bg-cream-100 border border-ink-900/10 rounded-sm p-8 hover:border-gold-500/40 hover:shadow-[0_8px_30px_-8px_rgba(244,173,60,0.2)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mb-6 group-hover:bg-gold-500/20 transition-colors">
                  {getIcon(b.icon, "w-6 h-6 text-gold-600")}
                </div>
                <h3 className="text-ink-900 text-lg md:text-xl font-bold mb-3" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
                  {b.title}
                </h3>
                <p className="text-ink-600 text-sm md:text-base leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 reasons — alternating photo/text ── */}
      <section className="bg-cream-100 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2
            className="text-ink-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-20 max-w-4xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.reasonsTitle}
          </h2>
          <div className="space-y-24 md:space-y-40">
            {ui.reasons.map((r, i) => {
              const reverse = i % 2 === 1;
              return (
                <div
                  key={r.number}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image src={r.image} alt="" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
                  </div>
                  <div className="lg:col-span-5">
                    <div
                      className="text-gold-600 text-sm md:text-base font-bold tabular-nums mb-4"
                      style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                    >
                      — {r.number}
                    </div>
                    <h3
                      className="text-ink-900 text-3xl md:text-4xl lg:text-5xl leading-tight font-bold mb-6"
                      style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                    >
                      {r.title}
                    </h3>
                    <p className="text-ink-600 text-base md:text-lg leading-relaxed">{r.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Product segmentation ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2
            className="text-ink-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-16 max-w-4xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.segmentTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ui.segments.map((s) => (
              <div
                key={s.title}
                className="flex items-start gap-5 bg-cream-100 border border-ink-900/10 rounded-sm p-6 hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-ink-950 flex items-center justify-center flex-shrink-0 mt-1">
                  {getIcon(s.icon, "w-5 h-5 text-gold-500")}
                </div>
                <div>
                  <h3 className="text-ink-900 text-base md:text-lg font-bold mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-ink-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visitor profiles + B2B platform ── */}
      <section className="bg-ink-950 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Visitors */}
            <div>
              <h2
                className="text-cream-50 text-3xl md:text-4xl lg:text-5xl leading-tight font-bold mb-10"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {ui.visitorsTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ui.visitors.map((v) => (
                  <div key={v} className="flex items-center gap-3 text-cream-50/80">
                    <Users className="w-5 h-5 text-gold-500 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-base md:text-lg">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* B2B platform */}
            <div>
              <h2
                className="text-cream-50 text-3xl md:text-4xl lg:text-5xl leading-tight font-bold mb-10"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {ui.b2bTitle}
              </h2>
              <div className="space-y-4">
                {ui.b2bFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-cream-50/80">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-base md:text-lg">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visibility formats ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2
            className="text-ink-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-16 max-w-4xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.visibilityTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {ui.visibilityFormats.map((f, i) => (
              <div
                key={f.title}
                className="relative overflow-hidden bg-cream-100 border border-ink-900/10 rounded-sm p-8 hover:border-gold-500/40 hover:shadow-[0_8px_30px_-8px_rgba(244,173,60,0.2)] transition-all duration-300"
              >
                <div
                  className="text-gold-500/20 text-7xl md:text-8xl font-bold absolute -top-2 -right-2 leading-none"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="relative text-ink-900 text-lg md:text-xl font-bold mb-3" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
                  {f.title}
                </h3>
                <p className="relative text-ink-600 text-sm md:text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media logos ── */}
      <section className="bg-cream-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.mediaTitle}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4 md:gap-6 items-center">
            {MEDIA_LOGOS.map((logo) => (
              <div
                key={logo.file}
                className="aspect-[3/2] flex items-center justify-center bg-white border border-ink-900/10 rounded-sm p-3 hover:border-gold-500/40 transition-all duration-300"
              >
                <Image
                  src={`/content/images/${logo.file}`}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="max-h-full max-w-full object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand logos ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.brandsTitle}
          </div>
          <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
            {BRAND_LOGOS.map((file) => (
              <li
                key={file}
                className="group aspect-[5/3] flex items-center justify-center bg-cream-100 border border-ink-900/10 rounded-sm p-3 md:p-4 hover:border-gold-500/40 hover:shadow-[0_4px_20px_-6px_rgba(244,173,60,0.25)] transition-all duration-300"
              >
                <Image
                  src={`/content/images/${file}`}
                  alt=""
                  width={140}
                  height={70}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/exposants"
              className="group inline-flex items-center gap-3 text-ink-900 hover:text-gold-700 text-sm md:text-base font-bold uppercase tracking-widest transition-colors"
            >
              <span>{ui.brandsCta}</span>
              <span aria-hidden="true" className="inline-block w-10 h-px bg-gold-600 origin-left transition-transform duration-300 group-hover:scale-x-[1.6]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Closing quote ── */}
      <section className="bg-ink-950 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <span
            className="block text-gold-500 text-5xl md:text-7xl leading-none mb-6"
            aria-hidden="true"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            &laquo;
          </span>
          <p
            className="text-cream-50 text-2xl md:text-3xl lg:text-4xl leading-snug italic"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.closingQuote}
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-cream-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row gap-4">
          <Link
            href={ui.cta.href}
            className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>{ui.cta.label}</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
          </Link>
          <Link
            href={ui.ctaSecondary.href}
            className="group inline-flex items-center gap-4 border border-ink-900/30 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>{ui.ctaSecondary.label}</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </article>
  );
}
