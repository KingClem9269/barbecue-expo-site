import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Calendar, MapPin, Instagram, Users } from "lucide-react";
import {
  getAllPitmasters,
  getPitmasterBySlug,
  getCountryName,
  getBio,
} from "@/lib/pitmasters";
import { buildMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";

const UI: Record<
  string,
  {
    back: string;
    stand: string;
    sessions: string;
    noSessions: string;
    followers: string;
    otherPitmasters: string;
    ctaBook: string;
    ctaStand: string;
  }
> = {
  fr: {
    back: "Tous les pitmasters",
    stand: "Stand",
    sessions: "Programme",
    noSessions: "Programme à venir",
    followers: "abonnés",
    otherPitmasters: "D'autres pitmasters",
    ctaBook: "Réserver ma place",
    ctaStand: "Pros — demander une rencontre",
  },
  en: {
    back: "All pitmasters",
    stand: "Stand",
    sessions: "Schedule",
    noSessions: "Schedule coming soon",
    followers: "followers",
    otherPitmasters: "Other pitmasters",
    ctaBook: "Book my ticket",
    ctaStand: "Pros — request a meeting",
  },
  es: {
    back: "Todos los pitmasters",
    stand: "Stand",
    sessions: "Programa",
    noSessions: "Programa próximamente",
    followers: "seguidores",
    otherPitmasters: "Otros pitmasters",
    ctaBook: "Reservar mi entrada",
    ctaStand: "Pros — solicitar reunión",
  },
  de: {
    back: "Alle Pitmaster",
    stand: "Stand",
    sessions: "Programm",
    noSessions: "Programm folgt",
    followers: "Follower",
    otherPitmasters: "Weitere Pitmaster",
    ctaBook: "Ticket buchen",
    ctaStand: "Pros — Meeting anfragen",
  },
  nl: {
    back: "Alle pitmasters",
    stand: "Stand",
    sessions: "Programma",
    noSessions: "Programma volgt",
    followers: "volgers",
    otherPitmasters: "Andere pitmasters",
    ctaBook: "Mijn ticket boeken",
    ctaStand: "Pros — afspraak aanvragen",
  },
  pt: {
    back: "Todos os pitmasters",
    stand: "Stand",
    sessions: "Programa",
    noSessions: "Programa em breve",
    followers: "seguidores",
    otherPitmasters: "Outros pitmasters",
    ctaBook: "Reservar o meu bilhete",
    ctaStand: "Pros — solicitar reunião",
  },
  it: {
    back: "Tutti i pitmaster",
    stand: "Stand",
    sessions: "Programma",
    noSessions: "Programma in arrivo",
    followers: "follower",
    otherPitmasters: "Altri pitmaster",
    ctaBook: "Prenota il mio biglietto",
    ctaStand: "Pros — richiedere un incontro",
  },
};

export async function generateStaticParams() {
  const pitmasters = await getAllPitmasters();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const p of pitmasters) {
      params.push({ locale, slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const p = await getPitmasterBySlug(slug);
  if (!p) return buildMetadata(locale, `/pitmasters/${slug}`);
  const bio = getBio(p, locale);
  return buildMetadata(locale, `/pitmasters/${slug}`, {
    title: `${p.name} — Pitmaster ${getCountryName(p.country, locale)} · Barbecue Expo 2026`,
    description: bio.substring(0, 160),
  });
}

function formatFollowers(n: number | undefined): string | null {
  if (!n) return null;
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return String(n);
}

export default async function PitmasterDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const p = await getPitmasterBySlug(slug);
  if (!p) notFound();

  const ui = UI[locale] || UI.fr;
  const countryName = getCountryName(p.country, locale);
  const bio = getBio(p, locale);

  // Pick 3 other pitmasters for "related" section
  const all = await getAllPitmasters();
  const others = all
    .filter((x) => x.slug !== p.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const followersLabel = formatFollowers(p.social?.followers);

  return (
    <article className="bg-cream-50">
      {/* Back link */}
      <div className="bg-ink-950 pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6">
          <Link
            href="/pitmasters"
            className="inline-flex items-center gap-2 text-cream-50/80 hover:text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            {ui.back}
          </Link>
        </div>

        {/* Hero header */}
        <header className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Portrait */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-char-800 rounded-sm">
              {p.portrait && (
                <Image
                  src={p.portrait}
                  alt={p.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center"
                />
              )}
              {/* Signature char frame */}
              <div
                className="absolute inset-3 ring-1 ring-gold-500/40 pointer-events-none rounded-sm"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="flex items-center gap-3 mb-4 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold">
              <Image
                src={`/flags/${p.country}.svg`}
                alt=""
                width={16}
                height={16}
                className="w-4 h-4 rounded-full"
              />
              <span>{countryName}</span>
              <span aria-hidden="true" className="inline-block w-6 h-px bg-gold-500" />
              <span>{p.specialty}</span>
            </div>

            <h1
              className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {p.name}
            </h1>

            <p className="mt-6 md:mt-8 text-cream-50/85 text-lg md:text-xl leading-relaxed max-w-3xl">
              {bio}
            </p>

            {/* Quick facts */}
            <div className="mt-8 md:mt-10 flex flex-wrap gap-3">
              {p.stand && (
                <span className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2.5 rounded-sm text-cream-50 text-sm font-semibold uppercase tracking-widest">
                  <MapPin className="w-4 h-4 text-gold-500" strokeWidth={2} />
                  {ui.stand} {p.stand}
                </span>
              )}
              {followersLabel && p.social?.instagram && (
                <a
                  href={p.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:border-gold-500 hover:text-gold-500 px-4 py-2.5 rounded-sm text-cream-50 text-sm font-semibold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <Instagram className="w-4 h-4 text-gold-500" strokeWidth={2} />
                  {followersLabel} {ui.followers}
                </a>
              )}
              {followersLabel && !p.social?.instagram && (
                <span className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2.5 rounded-sm text-cream-50 text-sm font-semibold uppercase tracking-widest">
                  <Users className="w-4 h-4 text-gold-500" strokeWidth={2} />
                  {followersLabel} {ui.followers}
                </span>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* Sessions */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.sessions}
        </div>

        {p.sessions && p.sessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {p.sessions.map((s, i) => (
              <div
                key={i}
                className="bg-cream-100 border border-ink-900/10 rounded-sm p-5 md:p-6 hover:border-gold-500/60 transition-colors"
              >
                <div className="flex items-center gap-2 text-gold-700 text-xs font-bold uppercase tracking-widest mb-3">
                  <Calendar className="w-3.5 h-3.5" strokeWidth={2.5} />
                  {s.type}
                </div>
                <h3
                  className="text-ink-900 text-2xl md:text-3xl leading-tight font-bold mb-4"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {s.title}
                </h3>
                <div className="flex items-center gap-3 text-ink-600 text-sm font-medium">
                  <span>{s.day}</span>
                  <span aria-hidden="true" className="w-1 h-1 rounded-full bg-gold-500" />
                  <span>{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-ink-600 text-lg">{ui.noSessions}</p>
        )}

        {/* CTAs */}
        <div className="mt-14 md:mt-20 flex flex-col sm:flex-row gap-4">
          <Link
            href="/billetterie/particulier"
            className="group inline-flex items-center justify-between gap-6 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
          >
            {ui.ctaBook}
            <span aria-hidden="true" className="w-5 h-px bg-ink-950 origin-left transition-transform duration-300 group-hover:scale-x-[1.6]" />
          </Link>
          <Link
            href="/billetterie/pro-b2b"
            className="group inline-flex items-center justify-between gap-6 border border-ink-900/30 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
          >
            {ui.ctaStand}
            <span aria-hidden="true" className="w-5 h-px bg-gold-600 origin-left transition-transform duration-300 group-hover:scale-x-[1.6]" />
          </Link>
        </div>
      </section>

      {/* Related pitmasters */}
      {others.length > 0 && (
        <section className="bg-cream-100 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
              <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
              {ui.otherPitmasters}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/pitmasters/${o.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden bg-char-800 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  {o.portrait && (
                    <Image
                      src={o.portrait}
                      alt={o.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-cream-50">
                    <h3
                      className="text-2xl leading-tight font-bold"
                      style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                    >
                      {o.name}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-cream-50/70">
                      {getCountryName(o.country, locale)} · {o.specialty}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
