"use client";

/**
 * La présentation marketing du salon : histoire, édition 2027, visiteurs et
 * professionnels, plan de communication. Affichée par le catalogue exposant
 * (copie des commerciaux, /pres-exposants) et, en deuxième partie, par la page
 * des campagnes (/presentation-exposants).
 */

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { CHIFFRES, nombre } from "@/lib/chiffres";
import { Globe, MapPin, Play, Instagram, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import BrandLogoMarquee from "@/components/BrandLogoMarquee";
import PhotoMarquee from "@/components/PhotoMarquee";
import ExperienceZones from "@/components/visitor/ExperienceZones";
import pitmastersData from "@/content/pitmasters/index.json";
import { VISITOR_PROVENANCE, MAP_LEGEND, PRO_TYPES, PRODUCT_CATEGORIES, MEDIA_FEATURED, MEDIA_MENTIONS, AFFICHAGE, SOCIAL_REACH, SOCIAL_ACCOUNTS, SOCIAL_POSTS } from "./data";
import InstagramEmbed from "@/components/InstagramEmbed";
import { Link } from "@/i18n/navigation";
import { useT } from "./i18n";
import { Sec } from "./blocs";

const VisitorMap = dynamic(() => import("./VisitorMap"), { ssr: false });

/**
 * Ne monte son contenu (vidéo, bandeaux de photos ou de logos, carte) qu'à
 * l'approche de l'écran. La classe réserve la hauteur pour que rien ne bouge.
 */
function AuVoisinage({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [proche, setProche] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setProche(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={className}>{proche ? children : null}</div>;
}

/* Sous-titre dans une section sombre */
function SubLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-6 ${className}`}>
      <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
      {children}
    </div>
  );
}

/* Logo média — vrai logo si dispo, sinon wordmark texte (repli si échec de chargement) */
function MediaLogo({ name, logo }: { domain?: string; name: string; logo?: string | null }) {
  const [err, setErr] = useState(false);
  const [outlet, show] = name.split(" — ");
  if (logo && !err) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logo} alt={name} loading="lazy" decoding="async" onError={() => setErr(true)} className="max-h-[80%] max-w-[85%] object-contain" />
    );
  }
  return (
    <div className="flex flex-col items-center justify-center text-center px-3 leading-tight">
      <span className="text-ink-900 font-bold text-base md:text-lg" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{outlet}</span>
      {show && <span className="text-ink-400 text-[11px] font-medium mt-0.5">{show}</span>}
    </div>
  );
}

/* Carrousel de pitmasters (défilement horizontal) */
function PitmastersCarousel() {
  const { t } = useT();
  const chefs = (pitmastersData as { slug: string; name: string; portrait?: string; social?: { followers?: number } }[]);
  const fmt = (n?: number) => (n ? (n >= 1000 ? `${Math.round(n / 1000)}K` : String(n)) : null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative -mx-6 md:-mx-12">
      <div ref={scrollRef} className="px-6 md:px-12 overflow-x-auto pb-4 scroll-smooth">
        <div className="flex gap-4 w-max">
          {chefs.map((c) => (
            <div key={c.slug} className="w-44 md:w-52 shrink-0">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-ink-900">
                {c.portrait && <Image src={c.portrait} alt={c.name} fill sizes="208px" className="object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 inset-x-0 p-3">
                  <div className="text-cream-50 font-bold text-sm leading-tight" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{c.name}</div>
                  {fmt(c.social?.followers) && <div className="text-gold-500 text-xs font-semibold">{fmt(c.social?.followers)} {t("abonnés")}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label={t("Précédent")}
        onClick={() => scrollBy(-1)}
        disabled={!canLeft}
        className={`hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-lg transition-opacity ${canLeft ? "opacity-100 hover:bg-gold-300" : "opacity-0 pointer-events-none"}`}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
      </button>
      <button
        type="button"
        aria-label={t("Suivant")}
        onClick={() => scrollBy(1)}
        disabled={!canRight}
        className={`hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-lg transition-opacity ${canRight ? "opacity-100 hover:bg-gold-300" : "opacity-0 pointer-events-none"}`}
      >
        <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}

/* Sélecteur de types de professionnels + logos enseignes (placeholders) */
function ProTypesSelector() {
  const { t } = useT();
  const [active, setActive] = useState(PRO_TYPES[0].key);
  const cur = PRO_TYPES.find((p) => p.key === active) ?? PRO_TYPES[0];

  // Toutes les enseignes, dédoublonnées (une par logo).
  const allBrands = useMemo(() => {
    const seen = new Set<string>();
    const out: { name: string; src: string; dark?: boolean; cover?: boolean; cat: string }[] = [];
    for (const p of PRO_TYPES) {
      if (!p.brands) continue;
      for (const b of p.brands) {
        if (seen.has(b.src)) continue;
        seen.add(b.src);
        out.push({ ...b, cat: p.key });
      }
    }
    return out;
  }, []);

  // La catégorie active d'abord, le reste ensuite.
  const ordered = useMemo(() => {
    const act = allBrands.filter((b) => b.cat === active);
    const rest = allBrands.filter((b) => b.cat !== active);
    return [...act, ...rest];
  }, [allBrands, active]);

  return (
    <div>
      {/* Onglets — types de professionnels, en haut sur une ligne */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PRO_TYPES.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setActive(p.key)}
            aria-pressed={active === p.key}
            className={`rounded-full px-4 py-2.5 text-sm font-bold leading-tight transition-colors border ${
              active === p.key
                ? "bg-ink-950 border-ink-950 text-cream-50"
                : "bg-cream-100 border-ink-900/10 text-ink-800 hover:border-gold-500/50"
            }`}
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {t(p.title)}
          </button>
        ))}
      </div>

      {/* Description de la catégorie active */}
      <p className="text-ink-600 text-base md:text-lg leading-relaxed mb-6 max-w-3xl">{t(cur.desc)}</p>

      {/* Toutes les enseignes — la catégorie active en premier (liseré doré) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {ordered.map((b) => {
          const on = b.cat === active;
          return b.cover ? (
            <div key={b.src} className={`relative aspect-[5/3] rounded-sm overflow-hidden bg-ink-900 border transition-all ${on ? "border-gold-500 ring-2 ring-gold-500" : "border-ink-900/10"}`}>
              <Image src={b.src} alt={b.name} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 17vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" aria-hidden="true" />
              <span className="absolute bottom-1.5 left-2 right-2 text-cream-50 text-xs font-bold leading-tight" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{b.name}</span>
            </div>
          ) : (
            <div key={b.src} className={`aspect-[5/3] rounded-sm border flex items-center justify-center p-2 overflow-hidden transition-all ${b.dark ? "bg-ink-900 border-ink-900" : "bg-white border-ink-900/10"} ${on ? "ring-2 ring-gold-500 border-gold-500" : ""}`}>
              <div className="relative w-full h-full">
                <Image src={b.src} alt={b.name} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 17vw" className="object-contain" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Sélecteur de posts Instagram par catégorie */
function SocialPostsTabs() {
  const { t } = useT();
  const [active, setActive] = useState(SOCIAL_POSTS[0].category);
  const group = SOCIAL_POSTS.find((g) => g.category === active) ?? SOCIAL_POSTS[0];
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {SOCIAL_POSTS.map((g) => (
          <button
            key={g.category}
            type="button"
            onClick={() => setActive(g.category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              active === g.category
                ? "bg-gold-500 text-ink-950"
                : "border border-cream-50/20 text-cream-50/70 hover:border-gold-500/50 hover:text-cream-50"
            }`}
          >
            {t(g.category)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {group.urls.map((u) => (
          <div key={u} className="w-full">
            <InstagramEmbed url={u} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Chargement de Leaflet via CDN (côté navigateur), une seule fois */
let leafletPromise: Promise<unknown> | null = null;

function loadLeaflet(): Promise<unknown> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).L) return Promise.resolve((window as any).L);
  if (leafletPromise) return leafletPromise;
  leafletPromise = new Promise((resolve, reject) => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    const s = document.createElement("script");
    s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    s.async = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    s.onload = () => resolve((window as any).L);
    s.onerror = () => reject(new Error("leaflet load failed"));
    document.body.appendChild(s);
  });
  return leafletPromise;
}

/* Bouton « Voir la carte » + popup carte d'accès (Parc Floral, aéroports, gares) */
function VenueMapButton() {
  const { t } = useT();
  const tt = t;
  const [open, setOpen] = useState(false);
  const mapDivRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const lat = 48.837, lon = 2.4453; // Hall de la Pinède, Parc Floral de Paris

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let disposed = false;
    loadLeaflet().then((Lib) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = Lib as any;
      if (disposed || !mapDivRef.current || mapRef.current) return;
      const map = L.map(mapDivRef.current, { scrollWheelZoom: true });
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(map);

      const circle = (size: number, inner: string) =>
        `<div style="width:${size}px;height:${size}px;border-radius:50%;background:#f4ad3c;border:${size > 38 ? 3 : 2}px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center">${inner}</div>`;
      const planeSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="#0e0e0e"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>`;
      const trainSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="#0e0e0e"><path d="M12 2c-4 0-8 .5-8 4v9.5A3.5 3.5 0 0 0 7.5 19L6 20.5V21h12v-.5L16.5 19a3.5 3.5 0 0 0 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17A1.5 1.5 0 1 1 9 15.5 1.5 1.5 0 0 1 7.5 17zM11 10H6V6h5zm2 0V6h5v4zm3.5 7a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"/></svg>`;
      const icon = (size: number, inner: string) => L.divIcon({ className: "", html: circle(size, inner), iconSize: [size, size], iconAnchor: [size / 2, size / 2] });
      const bIcon = icon(42, `<img src="/logo_b_white.svg" style="width:22px;height:22px" alt="B"/>`);
      const planeIcon = icon(32, planeSvg);
      const trainIcon = icon(32, trainSvg);

      const pts: { ll: [number, number]; ic: unknown; label: string }[] = [
        { ll: [lat, lon], ic: bIcon, label: tt("Barbecue Expo — Hall de la Pinède") },
        { ll: [48.7262, 2.3652], ic: planeIcon, label: tt("Aéroport Paris-Orly") },
        { ll: [49.0097, 2.5479], ic: planeIcon, label: "Paris-Charles de Gaulle (Roissy)" },
        { ll: [48.8443, 2.3743], ic: trainIcon, label: "Gare de Lyon" },
        { ll: [48.842, 2.3655], ic: trainIcon, label: "Gare d'Austerlitz" },
      ];
      const markers = pts.map((p) => L.marker(p.ll, { icon: p.ic }).bindTooltip(p.label, { direction: "top", offset: [0, -16] }).addTo(map));
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.18));
      setTimeout(() => { try { map.invalidateSize(); } catch { /* noop */ } }, 150);
    }).catch(() => { /* leaflet indisponible */ });
    return () => {
      disposed = true;
      if (mapRef.current) { try { mapRef.current.remove(); } catch { /* noop */ } mapRef.current = null; }
    };
  }, [open, tt]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-gold-500 text-ink-950 px-4 py-2 rounded-full text-sm font-bold hover:bg-gold-300 transition-colors"
      >
        <MapPin className="w-4 h-4" strokeWidth={2.5} /> {t("Voir la carte")}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t("Carte d'accès au salon")}
        >
          <div className="relative w-full max-w-3xl bg-cream-50 rounded-sm overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 p-4 border-b border-ink-900/10">
              <div>
                <div className="text-ink-900 font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t("Espace événementiel — Hall de la Pinède")}</div>
                <div className="text-ink-600 text-sm">Parc Floral de Paris · Bois de Vincennes</div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label={t("Fermer")} className="shrink-0 w-9 h-9 rounded-full bg-ink-900/5 hover:bg-ink-900/10 text-ink-900 flex items-center justify-center text-lg">✕</button>
            </div>
            <div ref={mapDivRef} className="w-full h-[60vh] max-h-[480px] bg-ink-900/5" style={{ zIndex: 0 }} />
            <div className="flex items-center justify-between gap-3 p-3">
              <span className="text-ink-500 text-xs inline-flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full bg-gold-500" /> {t("Salon")}</span>
                <span>✈︎ Orly · Roissy</span>
                <span>🚆 Gare de Lyon · Austerlitz</span>
              </span>
              <a href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`} target="_blank" rel="noopener noreferrer" className="text-gold-700 text-xs font-semibold whitespace-nowrap inline-flex items-center gap-1">{t("Plein écran")} <ExternalLink className="w-3 h-3" /></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function PresentationSalon() {
  const { t, lang } = useT();
  return (
    <>
      <Sec id="expo" eyebrow="Partie 1" title="Barbecue Expo — histoire & écosystème">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Texte + métriques */}
          <div>
            <p className="text-ink-600 text-lg leading-relaxed mb-8">
              {t("Depuis 2020, Barbecue Expo réunit chaque année les passionnés et les professionnels de la cuisson au feu. En quelques éditions, l'événement s'est imposé comme le plus grand salon européen dédié au barbecue et à la cuisine en plein air — porté par un écosystème unique : le salon, des festivals, le magazine (Barbecue Mag & Smoked Magazine), des championnats, et bien plus encore.")}
            </p>

            <div className="text-gold-700 text-sm uppercase tracking-widest font-semibold mb-5">
              {t("Depuis 2020, Barbecue Expo c'est…")}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                ["5", "éditions"],
                ["93 000", "visiteurs"],
                ["650", "exposants"],
                ["85", "pitmasters & chefs"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-ink-900 text-3xl md:text-4xl font-bold leading-none" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{v}</div>
                  <div className="mt-1 text-ink-500 text-xs uppercase tracking-widest">{t(l)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vidéo (même que le hero du site, en boucle, muette) */}
          <div className="relative aspect-video w-full rounded-sm overflow-hidden bg-ink-950 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]">
            <AuVoisinage className="absolute inset-0">
              <YouTubeEmbed />
            </AuVoisinage>
          </div>
        </div>
      </Sec>

      <Sec id="salon" eyebrow="Partie 2" title="Le salon 2027" dark>
        <p className="text-cream-50/75 text-base md:text-lg max-w-2xl mb-10">
          {t("L'édition à venir, plus grande et plus internationale que jamais. Le salon 2027, c'est…")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 md:mb-20">
          {[
            [nombre(CHIFFRES.visiteursAttendus2027, lang), "visiteurs attendus"],
            [nombre(CHIFFRES.marques2027, lang), "marques internationales"],
            [nombre(CHIFFRES.pays2027, lang), "pays représentés"],
            ["20 000 m²", "indoor & outdoor"],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="text-gold-500 text-4xl md:text-5xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{v}</div>
              <div className="mt-1 text-cream-50/70 text-sm uppercase tracking-widest">{t(l)}</div>
            </div>
          ))}
        </div>
        {/* Galerie photo — slider défilant */}
        <div className="mb-14 md:mb-20">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="text-cream-50/70 text-xs uppercase tracking-widest">{t("En images")}</div>
            {/* Nouvel onglet : le prospect garde la présentation ouverte */}
            <Link
              href="/gallery-press"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 border border-gold-500/60 hover:border-gold-500 hover:bg-gold-500 text-gold-500 hover:text-ink-950 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors"
            >
              {t("Voir toute la galerie")}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </Link>
          </div>
          <div className="-mx-6 md:-mx-12">
            <AuVoisinage className="min-h-[244px] md:min-h-[329px]">
              <PhotoMarquee />
            </AuVoisinage>
          </div>
        </div>

        {/* Catégories (gauche) + Plan du salon (droite) */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Catégories de produits — gauche */}
          <div>
            <div className="text-cream-50/70 text-xs uppercase tracking-widest mb-6">{t("Les catégories de produits")}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRODUCT_CATEGORIES.map((c, i) => (
                <div key={c.name} className="bg-cream-50/[0.04] border border-cream-50/10 rounded-sm p-5 hover:border-gold-500/40 transition-colors">
                  <div className="text-gold-500 text-xs font-bold tabular-nums mb-2" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-cream-50 font-bold leading-tight mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(c.name)}</h3>
                  <p className="text-cream-50/60 text-sm leading-relaxed">{t(c.detail)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Plan du salon — droite */}
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3 mb-6">
              <span className="text-cream-50/70 text-xs uppercase tracking-widest">{t("Le plan du salon")}</span>
              <VenueMapButton />
            </div>
            <AuVoisinage className="relative aspect-square w-full">
              <Image
                src="/content/images/27866dc7c3_planbbq_hd.png"
                alt={t("Plan du salon Barbecue Expo 2027")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
              />
            </AuVoisinage>
          </div>
        </div>
      </Sec>

      {/* Les zones & rubriques — réutilise la section de la homepage */}
      <ExperienceZones />

      {/* Les marques présentes — slider 2 rangées (band sombre) */}
      <div className="bg-ink-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {t("Les marques présentes")}
          </div>
        </div>
        <AuVoisinage className="min-h-[220px] md:min-h-[256px]">
          <BrandLogoMarquee />
        </AuVoisinage>
      </div>

      <Sec id="visiteurs" eyebrow="Partie 3" title="Les visiteurs">
        {/* Carte + tableau de provenance */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-ink-700 text-sm md:text-base font-semibold mb-4">
              <MapPin className="w-5 h-5 text-gold-600" strokeWidth={2} />
              {t("Lieu de l'événement :")} <span className="italic font-normal">{t("Parc Floral de Paris")}</span>
              <VenueMapButton />
            </div>
            <div className="rounded-sm bg-white border border-ink-900/10 p-3 md:p-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]">
              <AuVoisinage className="aspect-[980/520]">
                <VisitorMap />
              </AuVoisinage>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
              {MAP_LEGEND.map((l) => (
                <span key={l.label} className="inline-flex items-center gap-2 text-ink-600 text-xs">
                  <span className="inline-block w-4 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                  {t(l.label)}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="text-ink-500 text-xs uppercase tracking-widest mb-4">{t("Provenance des visiteurs")}</div>
            <ul className="divide-y divide-ink-900/10 border-y border-ink-900/10">
              {VISITOR_PROVENANCE.map((c) => (
                <li key={c.name} className="flex items-center justify-between gap-3 py-3">
                  <span className="flex items-center gap-3 min-w-0">
                    {c.flag ? (
                      <Image src={`/flags/${c.flag}.svg`} alt="" width={22} height={16} className="w-5.5 h-4 rounded-sm object-cover shrink-0" />
                    ) : (
                      <Globe className="w-5 h-5 text-ink-400 shrink-0" strokeWidth={1.5} />
                    )}
                    <span className="text-ink-800 text-sm md:text-base truncate">{t(c.name)}</span>
                  </span>
                  <span className="text-ink-900 font-bold tabular-nums" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{c.pct}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Types de professionnels — sélecteur */}
        <div className="text-ink-500 text-xs uppercase tracking-widest mb-2">{t("Les professionnels que nous attirons")}</div>
        <p className="text-ink-600 text-base md:text-lg mb-8 max-w-2xl">{t("Sélectionnez un type de professionnel pour voir les enseignes correspondantes.")}</p>
        <ProTypesSelector />
      </Sec>

      <Sec id="communication" eyebrow="Partie 4" title="Le plan de communication" dark>
        {/* 4.1 — Pitmasters */}
        <SubLabel>{t("Les pitmasters internationaux")}</SubLabel>
        <p className="text-cream-50/75 text-base md:text-lg max-w-2xl mb-8">
          {t("Des stars du barbecue venues du monde entier, présentes en 2026 et lors des éditions précédentes.")}
        </p>
        <PitmastersCarousel />

        {/* 4.2 — Retombées médiatiques */}
        <SubLabel className="mt-20">{t("Les retombées médiatiques")}</SubLabel>
        <div className="flex flex-wrap gap-x-10 gap-y-3 mb-10">
          {[["500 M+", "contacts générés"], ["TV · Radio · Presse", "couverture nationale"]].map(([v, l]) => (
            <div key={l}>
              <div className="text-gold-500 text-2xl md:text-3xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(v)}</div>
              <div className="text-cream-50/60 text-xs uppercase tracking-widest mt-1">{t(l)}</div>
            </div>
          ))}
        </div>

        {/* Vidéos principales — encadrées */}
        <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-4">{t("Vidéos principales")}</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {MEDIA_FEATURED.map((m) => (
            <a key={m.show} href={m.url} target="_blank" rel="noopener noreferrer" className="group block rounded-sm overflow-hidden border-2 border-gold-500/60 hover:border-gold-500 transition-colors">
              <div className="relative aspect-video bg-ink-900 flex items-center justify-center overflow-hidden">
                <Image src={m.thumb} alt={`${m.outlet} — ${m.show}`} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-ink-950/30 group-hover:bg-ink-950/20 transition-colors" aria-hidden="true" />
                <span className="relative z-10 w-12 h-12 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" strokeWidth={0} />
                </span>
              </div>
              <div className="p-3 bg-ink-950">
                <div className="text-cream-50 font-bold text-sm" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{m.outlet}</div>
                <div className="text-cream-50/60 text-xs">{m.show}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Toutes les retombées */}
        <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-4">{t("Ils en ont parlé")}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {MEDIA_MENTIONS.map((m, i) => {
            const inner = (
              <div className="h-full flex flex-col items-center justify-center text-center gap-2 bg-cream-50/[0.04] border border-cream-50/10 rounded-sm p-4 hover:border-gold-500/40 transition-colors">
                <div className="w-full aspect-[5/2] rounded-sm bg-white flex items-center justify-center overflow-hidden">
                  <MediaLogo domain={m.domain} name={m.name} logo={m.logo} />
                </div>
                {m.url
                  ? <span className="text-gold-500 text-xs font-semibold flex items-center gap-1">{t("Voir le sujet")}<ExternalLink className="w-3 h-3" /></span>
                  : <span className="text-cream-50/40 text-xs font-medium">{t("Diffusé")}</span>}
              </div>
            );
            return m.url ? (
              <a key={i} href={m.url} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </div>

        {/* 4.3 — Affichage public */}
        <SubLabel className="mt-20">{t("L'affichage public massif")}</SubLabel>
        <div className="grid grid-cols-3 gap-8 mb-10 max-w-2xl">
          {AFFICHAGE.stats.map((s) => (
            <div key={s.label}>
              <div className="text-gold-500 text-3xl md:text-5xl font-bold leading-none" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{s.value}</div>
              <div className="text-cream-50/60 text-xs uppercase tracking-widest mt-2">{t(s.label)}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {AFFICHAGE.photos.map((p, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-sm overflow-hidden bg-ink-900">
              <Image src={p.src} alt={`${t("Affichage public Barbecue Expo")} ${i + 1}`} fill sizes="(max-width:768px) 50vw, 20vw" className="object-cover" style={{ objectPosition: p.pos ?? "center" }} />
            </div>
          ))}
        </div>

        {/* 4.4 — Réseaux sociaux & newsletter */}
        <SubLabel className="mt-20">{t("Les réseaux sociaux & la newsletter")}</SubLabel>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8 mb-8">
          <div>
            <span className="text-gold-500 text-5xl md:text-7xl font-bold leading-none" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{SOCIAL_REACH.headline}</span>
            <span className="text-cream-50 text-xl md:text-2xl font-bold ml-3" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(SOCIAL_REACH.unit)}</span>
          </div>
          <p className="text-cream-50/70 text-sm md:text-base max-w-md">{t(SOCIAL_REACH.sub)}</p>
        </div>

        {/* Comptes */}
        <div className="flex flex-wrap gap-2 mb-12">
          {SOCIAL_ACCOUNTS.map((a) => {
            const has = a.url && a.url !== "[À compléter]";
            const inner = (
              <span className="inline-flex items-center gap-2 border border-cream-50/15 rounded-full px-4 py-2 text-cream-50/90 text-sm hover:border-gold-500/50 transition-colors">
                <Instagram className="w-4 h-4 text-gold-500" strokeWidth={1.5} />{t(a.brand)}
              </span>
            );
            return has ? <a key={a.brand} href={a.url} target="_blank" rel="noopener noreferrer">{inner}</a> : <span key={a.brand}>{inner}</span>;
          })}
        </div>

        {/* Exemples de posts */}
        <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-6">{t("Exemples de posts")}</div>
        <SocialPostsTabs />
      </Sec>
    </>
  );
}
