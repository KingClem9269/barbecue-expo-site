"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Flame,
  Users,
  Globe,
  Trophy,
  ChefHat,
  Utensils,
  Megaphone,
  MapPin,
  Calendar,
  Building2,
  Tv,
  ArrowUpRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Bilingual content (FR / EN) — official deck, updated for 2027      */
/* ------------------------------------------------------------------ */

type Lang = "fr" | "en";

const C = {
  fr: {
    switchTo: "EN",
    // Cover
    edition: "6ᵉ édition",
    coverTitle: "L'événement barbecue européen pour les pros et les passionnés.",
    coverDate: "12 · 13 · 14 Mars 2027",
    coverVenue: "Parc Floral de Paris",
    // What
    whatEyebrow: "Le salon",
    whatTitle: "Un événement B2B & B2C au cœur d'un écosystème puissant.",
    whatBody:
      "Du 12 au 14 mars 2027, le Parc Floral de Paris accueille la 6ᵉ édition de Barbecue Expo — le plus grand salon européen dédié au barbecue et à la cuisine en plein air. En quelques années, l'événement s'est imposé comme le rendez-vous incontournable d'un secteur en pleine transformation : grand public passionné le week-end, professionnels et acheteurs en quête d'innovations et de business.",
    // Figures
    figuresEyebrow: "Les chiffres",
    figures: [
      { value: "25 800", label: "visiteurs en 2026" },
      { value: "200+", label: "marques internationales" },
      { value: "15", label: "pays exposants" },
      { value: "20 000 m²", label: "indoor & outdoor" },
      { value: "85", label: "pitmasters & chefs" },
      { value: "3 jours", label: "d'expérience" },
    ],
    // Zones
    zonesEyebrow: "L'expérience",
    zonesTitle: "Vivez le barbecue sous toutes ses saveurs.",
    zones: [
      { icon: "flame", title: "Grill Arena", body: "Le seul format battle live d'Europe : des pitmasters internationaux s'affrontent devant le public." },
      { icon: "chef", title: "Cooking Shows", body: "Trois jours de démonstrations live par les plus grands experts du secteur." },
      { icon: "grad", title: "Masterclasses", body: "Sessions intimistes pour apprendre les techniques des meilleurs." },
      { icon: "utensils", title: "BBQ Street Food", body: "Le meilleur de la street food barbecue, sélectionné pour le salon." },
      { icon: "trophy", title: "Barbecue Expo Awards", body: "Les récompenses qui distinguent les meilleures marques du secteur." },
      { icon: "building", title: "Zone Exposants", body: "200+ marques à tester en conditions réelles, achat direct possible." },
    ],
    // Pros
    proEyebrow: "Les visiteurs professionnels",
    proTitle: "Le rendez-vous business de la cuisson outdoor.",
    proBody:
      "Barbecue Expo réunit tous les acteurs de la filière : distributeurs spécialisés, enseignes GSA & GSB, réseaux de jardinerie, acheteurs CHR, prescripteurs et marques. Trois jours pour découvrir les innovations, développer son offre et capter les tendances du marché.",
    proTags: [
      "Distributeurs spécialisés",
      "Enseignes GSA / GSB",
      "Réseaux de jardinerie",
      "Acheteurs CHR / HORECA",
      "Prescripteurs & presse",
      "Marques internationales",
    ],
    // Media
    mediaEyebrow: "Force de frappe média",
    mediaTitle: "Une visibilité à l'échelle européenne.",
    mediaBody:
      "Plus de 500 millions de contacts générés en 2025. Une communauté de 132 000+ abonnés, un affichage public massif et une présence média TV, radio et presse spécialisée.",
    mediaStats: [
      { value: "500 M+", label: "contacts média 2025" },
      { value: "132 000+", label: "communauté réseaux sociaux" },
      { value: "17 000", label: "inscrits newsletter" },
    ],
    chefsLabel: "Quelques chefs de renom",
    // Practical
    practicalEyebrow: "Infos pratiques",
    practicalTitle: "Tout pour préparer votre venue.",
    days: [
      { day: "Vendredi 12 mars", hours: "9h30 — 19h00" },
      { day: "Samedi 13 mars", hours: "9h30 — 19h00" },
      { day: "Dimanche 14 mars", hours: "9h30 — 18h00" },
    ],
    venueLabel: "Lieu",
    venueValue: "Parc Floral de Paris — 26 Route du Champ de Manœuvre, 75012 Paris",
    accessLabel: "Accès",
    accessValue: "Métro ligne 1 (Château de Vincennes) · 5 min du périphérique · Parking 500 places",
    // CTA
    ctaTitle: "En 2027, toutes les flammes mènent à Paris.",
    ctaBody: "Vous souhaitez exposer ou devenir partenaire ?",
    ctaPrimary: "Devenir exposant",
    ctaSecondary: "Nous contacter",
  },
  en: {
    switchTo: "FR",
    edition: "6th edition",
    coverTitle: "The European barbecue event for professionals and enthusiasts.",
    coverDate: "March 12 · 13 · 14, 2027",
    coverVenue: "Parc Floral de Paris",
    whatEyebrow: "The show",
    whatTitle: "A B2B & B2C event at the heart of a powerful ecosystem.",
    whatBody:
      "From March 12 to 14, 2027, the Parc Floral de Paris hosts the 6th edition of Barbecue Expo — the largest European trade show dedicated to barbecue and outdoor cooking. In just a few years, the event has become the must-attend gathering of an industry undergoing major transformation: a passionate general public on the weekend, professionals and buyers looking for innovation and business.",
    figuresEyebrow: "Key figures",
    figures: [
      { value: "25,800", label: "visitors in 2026" },
      { value: "200+", label: "international brands" },
      { value: "15", label: "exhibiting countries" },
      { value: "20,000 m²", label: "indoor & outdoor" },
      { value: "85", label: "pitmasters & chefs" },
      { value: "3 days", label: "of experience" },
    ],
    zonesEyebrow: "The experience",
    zonesTitle: "Experience barbecue in all its flavors.",
    zones: [
      { icon: "flame", title: "Grill Arena", body: "Europe's only live battle format: international pitmasters compete in front of the audience." },
      { icon: "chef", title: "Cooking Shows", body: "Three days of live demonstrations by the industry's top experts." },
      { icon: "grad", title: "Masterclasses", body: "Intimate sessions to learn the techniques of the very best." },
      { icon: "utensils", title: "BBQ Street Food", body: "The best of barbecue street food, curated for the show." },
      { icon: "trophy", title: "Barbecue Expo Awards", body: "The awards that distinguish the best brands in the industry." },
      { icon: "building", title: "Exhibitor Zone", body: "200+ brands to test in real conditions, with direct purchase." },
    ],
    proEyebrow: "Professional visitors",
    proTitle: "The business hub of outdoor cooking.",
    proBody:
      "Barbecue Expo brings together every player in the industry: specialized distributors, grocery & DIY chains, garden-center networks, hospitality buyers, influencers and brands. Three days to discover innovations, expand offerings and capture market trends.",
    proTags: [
      "Specialized distributors",
      "Grocery & DIY chains",
      "Garden-center networks",
      "Hospitality / HORECA buyers",
      "Influencers & press",
      "International brands",
    ],
    mediaEyebrow: "Media reach",
    mediaTitle: "Visibility on a European scale.",
    mediaBody:
      "Over 500 million contacts generated in 2025. A community of 132,000+ followers, massive outdoor advertising and a TV, radio and trade-press presence.",
    mediaStats: [
      { value: "500 M+", label: "media contacts 2025" },
      { value: "132,000+", label: "social media community" },
      { value: "17,000", label: "newsletter subscribers" },
    ],
    chefsLabel: "Some renowned chefs",
    practicalEyebrow: "Useful information",
    practicalTitle: "Everything to plan your visit.",
    days: [
      { day: "Friday, March 12", hours: "9:30 AM — 7:00 PM" },
      { day: "Saturday, March 13", hours: "9:30 AM — 7:00 PM" },
      { day: "Sunday, March 14", hours: "9:30 AM — 6:00 PM" },
    ],
    venueLabel: "Venue",
    venueValue: "Parc Floral de Paris — 26 Route du Champ de Manœuvre, 75012 Paris",
    accessLabel: "Access",
    accessValue: "Metro line 1 (Château de Vincennes) · 5 min from the ring road · 500-space car park",
    ctaTitle: "In 2027, all flames lead to Paris.",
    ctaBody: "Would you like to exhibit or become a partner?",
    ctaPrimary: "Become an exhibitor",
    ctaSecondary: "Contact us",
  },
};

const CHEFS = [
  { name: "David W. Olson", followers: "345K", img: "/content/images/pm-david-w-olson.jpg" },
  { name: "The Barbecue Dude", followers: "271K", img: "/content/images/9c60fdfdd8_bbq_dude.jpeg" },
  { name: "Le Barbecue de Rafa", followers: "200K", img: "/content/images/pm-le-barbecue-de-rafa.jpg" },
  { name: "Diva Q", followers: "111K", img: "/content/images/pm-danielle-bennett.jpg" },
];

function zoneIcon(key: string) {
  const p = { className: "w-6 h-6 text-gold-500", strokeWidth: 1.5 };
  switch (key) {
    case "flame": return <Flame {...p} />;
    case "chef": return <ChefHat {...p} />;
    case "grad": return <Users {...p} />;
    case "utensils": return <Utensils {...p} />;
    case "trophy": return <Trophy {...p} />;
    case "building": return <Building2 {...p} />;
    default: return <Flame {...p} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PresentationDeck() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = C[lang];

  return (
    <article className="bg-cream-50">
      {/* Language switcher — sticky */}
      <div className="sticky top-0 z-50 flex justify-end px-6 md:px-12 py-3 bg-ink-950/80 backdrop-blur-sm border-b border-cream-50/10">
        <div className="inline-flex items-center rounded-full border border-cream-50/20 overflow-hidden text-xs font-bold uppercase tracking-widest">
          <button
            type="button"
            onClick={() => setLang("fr")}
            className={`px-4 py-1.5 transition-colors ${lang === "fr" ? "bg-gold-500 text-ink-950" : "text-cream-50/70 hover:text-cream-50"}`}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-4 py-1.5 transition-colors ${lang === "en" ? "bg-gold-500 text-ink-950" : "text-cream-50/70 hover:text-cream-50"}`}
          >
            EN
          </button>
        </div>
      </div>

      {/* ── Cover ── */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-ink-950">
        <Image src="/photos-2026/bbq-expo-008.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {t.edition}
          </div>
          <h1 className="text-cream-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold max-w-4xl" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t.coverTitle}
          </h1>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
            <span className="text-cream-50 text-2xl md:text-3xl font-bold tracking-wide uppercase" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
              {t.coverDate}
            </span>
            <span className="text-cream-50/80 text-base md:text-lg uppercase tracking-widest">{t.coverVenue}</span>
          </div>
        </div>
      </section>

      {/* ── What ── */}
      <Section eyebrow={t.whatEyebrow}>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <h2 className="lg:col-span-6 text-ink-900 text-3xl sm:text-4xl md:text-5xl leading-tight font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t.whatTitle}
          </h2>
          <p className="lg:col-span-6 text-ink-600 text-lg md:text-xl leading-relaxed">{t.whatBody}</p>
        </div>
      </Section>

      {/* ── Figures ── */}
      <section className="bg-ink-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Eyebrow light>{t.figuresEyebrow}</Eyebrow>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 mt-10">
            {t.figures.map((f) => (
              <div key={f.label}>
                <div className="text-gold-500 text-4xl sm:text-5xl md:text-6xl font-bold leading-none" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
                  {f.value}
                </div>
                <div className="mt-2 text-cream-50/70 text-sm md:text-base uppercase tracking-widest">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Zones ── */}
      <Section eyebrow={t.zonesEyebrow}>
        <h2 className="text-ink-900 text-3xl sm:text-4xl md:text-5xl leading-tight font-bold mb-12 max-w-3xl" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
          {t.zonesTitle}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.zones.map((z) => (
            <div key={z.title} className="bg-cream-100 border border-ink-900/10 rounded-sm p-7 hover:border-gold-500/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mb-5">{zoneIcon(z.icon)}</div>
              <h3 className="text-ink-900 text-xl font-bold mb-2" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{z.title}</h3>
              <p className="text-ink-600 text-base leading-relaxed">{z.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Pros ── */}
      <section className="relative bg-ink-950 py-16 md:py-24 overflow-hidden">
        <Image src="/photos-2026/william-plin-jpc-120426-533a6497.jpg" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-ink-950/70" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <Eyebrow light>{t.proEyebrow}</Eyebrow>
          <h2 className="text-cream-50 text-3xl sm:text-4xl md:text-5xl leading-tight font-bold mt-6 mb-6 max-w-3xl" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t.proTitle}
          </h2>
          <p className="text-cream-50/85 text-lg md:text-xl leading-relaxed max-w-3xl mb-10">{t.proBody}</p>
          <div className="flex flex-wrap gap-3">
            {t.proTags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-2 border border-cream-50/20 rounded-full px-4 py-2 text-cream-50/90 text-sm">
                <Users className="w-4 h-4 text-gold-500" strokeWidth={1.5} />{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media ── */}
      <Section eyebrow={t.mediaEyebrow}>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12">
          <h2 className="lg:col-span-5 text-ink-900 text-3xl sm:text-4xl md:text-5xl leading-tight font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t.mediaTitle}
          </h2>
          <div className="lg:col-span-7">
            <p className="text-ink-600 text-lg md:text-xl leading-relaxed mb-8">{t.mediaBody}</p>
            <div className="grid grid-cols-3 gap-6">
              {t.mediaStats.map((s) => (
                <div key={s.label}>
                  <div className="text-ink-900 text-2xl md:text-4xl font-bold leading-none" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{s.value}</div>
                  <div className="mt-1 text-ink-500 text-xs md:text-sm uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Chefs */}
        <div className="text-ink-500 text-xs uppercase tracking-widest font-semibold mb-5">{t.chefsLabel}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CHEFS.map((c) => (
            <div key={c.name} className="relative aspect-[4/5] rounded-sm overflow-hidden bg-ink-900">
              <Image src={c.img} alt={c.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <div className="text-cream-50 font-bold text-sm md:text-base leading-tight" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{c.name}</div>
                <div className="text-gold-500 text-xs font-semibold">{c.followers}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Practical ── */}
      <section className="bg-cream-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Eyebrow>{t.practicalEyebrow}</Eyebrow>
          <h2 className="text-ink-900 text-3xl sm:text-4xl md:text-5xl leading-tight font-bold mt-6 mb-12" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t.practicalTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-gold-700 text-sm font-semibold uppercase tracking-widest mb-4">
                <Calendar className="w-4 h-4" strokeWidth={2} /> {t.coverDate}
              </div>
              <ul className="space-y-2">
                {t.days.map((d) => (
                  <li key={d.day} className="flex justify-between gap-4 text-ink-700 border-b border-ink-900/10 py-2">
                    <span className="font-medium">{d.day}</span><span className="text-ink-500">{d.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gold-700 text-sm font-semibold uppercase tracking-widest mb-4">
                <MapPin className="w-4 h-4" strokeWidth={2} /> {t.venueLabel}
              </div>
              <p className="text-ink-700 leading-relaxed">{t.venueValue}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gold-700 text-sm font-semibold uppercase tracking-widest mb-4">
                <Tv className="w-4 h-4" strokeWidth={2} /> {t.accessLabel}
              </div>
              <p className="text-ink-700 leading-relaxed">{t.accessValue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-ink-950 py-20 md:py-28 text-center">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Megaphone className="w-10 h-10 text-gold-500 mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="text-cream-50 text-3xl sm:text-4xl md:text-5xl leading-tight font-bold mb-4" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t.ctaTitle}
          </h2>
          <p className="text-cream-50/80 text-lg mb-10">{t.ctaBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/devenez-exposants" className="group inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-300 text-ink-950 px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors">
              {t.ctaPrimary}
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
            </a>
            <a href="/infos-pratiques#contact" className="inline-flex items-center justify-center gap-3 border border-cream-50/30 hover:border-gold-500 text-cream-50 hover:text-gold-500 px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors">
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

/* ---- small helpers ---- */
function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest font-semibold ${light ? "text-gold-500" : "text-ink-900"}`}>
      <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
      {children}
    </div>
  );
}

function Section({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="bg-cream-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10"><Eyebrow>{eyebrow}</Eyebrow></div>
        {children}
      </div>
    </section>
  );
}
