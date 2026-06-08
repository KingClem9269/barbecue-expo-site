"use client";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  ExternalLink,
  Search,
  X,
  HandshakeIcon,
  Store,
  Plane,
  Globe,
  Download,
  CalendarCheck,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MapPin,
} from "lucide-react";
import type { Brand } from "@/lib/brands-shared";
import type { CategoryKey, SubCategoryKey } from "@/lib/exhibitor-taxonomy";
import {
  TAXONOMY,
  getCategoryLabel,
  getSubCategoryLabel,
} from "@/lib/exhibitor-taxonomy";
import { getCountryName } from "@/lib/pitmasters-shared";

export type BrandsListingProps = {
  brands: Brand[];
  locale: string;
  labels: {
    allCategories: string;
    allCountries: string;
    country: string;
    search: string;
    searchPlaceholder: string;
    newForExpo: string;
    seekingDistributor: string;
    seekingReseller: string;
    exports: string;
    newArrival: string;
    filters: string;
    clearFilters: string;
    zero: string;
    one: string;
    many: string;
    empty: string;
    advancedFilters: string;
  };
};

export default function BrandsListing({
  brands,
  locale,
  labels,
}: BrandsListingProps) {
  const [category, setCategory] = useState<CategoryKey | "all">("all");
  const [subCategory, setSubCategory] = useState<SubCategoryKey | "all">("all");
  const [country, setCountry] = useState<string>("all");
  const [query, setQuery] = useState("");
  // Transverse toggles
  const [onlyDistributor, setOnlyDistributor] = useState(false);
  const [onlyReseller, setOnlyReseller] = useState(false);
  const [onlyExports, setOnlyExports] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  // Modal
  const [selected, setSelected] = useState<Brand | null>(null);

  // Reset sub-category when top category changes
  useEffect(() => {
    setSubCategory("all");
  }, [category]);

  const countries = useMemo(
    () =>
      Array.from(new Set(brands.map((b) => b.country))).sort((a, b) =>
        getCountryName(a, locale).localeCompare(getCountryName(b, locale)),
      ),
    [brands, locale],
  );

  const currentCategoryConfig = useMemo(
    () => TAXONOMY.find((c) => c.key === category),
    [category],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return brands.filter((b) => {
      if (category !== "all" && b.category !== category) return false;
      if (subCategory !== "all") {
        if (!b.subCategories?.includes(subCategory)) return false;
      }
      if (country !== "all" && b.country !== country) return false;
      if (q && !b.name.toLowerCase().includes(q)) return false;
      if (onlyDistributor && !b.seekingDistributor) return false;
      if (onlyReseller && !b.seekingReseller) return false;
      if (onlyExports && !b.exportsAbroad) return false;
      if (onlyNew && !b.newForExpo) return false;
      return true;
    });
  }, [
    brands,
    category,
    subCategory,
    country,
    query,
    onlyDistributor,
    onlyReseller,
    onlyExports,
    onlyNew,
  ]);

  const hasActiveFilter =
    category !== "all" ||
    subCategory !== "all" ||
    country !== "all" ||
    query !== "" ||
    onlyDistributor ||
    onlyReseller ||
    onlyExports ||
    onlyNew;

  const clearAll = () => {
    setCategory("all");
    setSubCategory("all");
    setCountry("all");
    setQuery("");
    setOnlyDistributor(false);
    setOnlyReseller(false);
    setOnlyExports(false);
    setOnlyNew(false);
  };

  return (
    <div>
      {/* Category tabs (wrap onto multiple lines — no horizontal scroll) */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <CategoryChip
            label={labels.allCategories}
            active={category === "all"}
            onClick={() => setCategory("all")}
          />
          {TAXONOMY.map((c) => (
            <CategoryChip
              key={c.key}
              label={getCategoryLabel(c.key, locale)}
              active={category === c.key}
              onClick={() => setCategory(c.key)}
            />
          ))}
        </div>
      </div>

      {/* Sub-category pills (shown only when a category is selected and has subs) */}
      {currentCategoryConfig && currentCategoryConfig.sub.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <SubChip
              label={labels.allCategories}
              active={subCategory === "all"}
              onClick={() => setSubCategory("all")}
            />
            {currentCategoryConfig.sub.map((s) => (
              <SubChip
                key={s.key}
                label={getSubCategoryLabel(currentCategoryConfig.key, s.key, locale)}
                active={subCategory === s.key}
                onClick={() => setSubCategory(s.key)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search + country + transverse filters */}
      <div className="flex flex-wrap gap-3 md:gap-4 items-stretch mb-6 md:mb-8">
        {/* Search */}
        <label className="relative flex-1 min-w-[200px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
            strokeWidth={2}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full bg-cream-50 border border-ink-900/20 rounded-sm pl-9 pr-3 py-2.5 text-sm text-ink-900 font-medium focus:outline-none focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-500/30 placeholder-ink-400"
          />
        </label>

        {/* Country select */}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          aria-label={labels.country}
          className="appearance-none bg-cream-50 border border-ink-900/20 rounded-sm px-3 py-2.5 text-sm text-ink-900 font-medium focus:outline-none focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-500/30 cursor-pointer min-w-[160px]"
        >
          <option value="all">{labels.allCountries}</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {getCountryName(c, locale)}
            </option>
          ))}
        </select>
      </div>

      {/* Transverse toggles — hidden for now (flags not provided by the API) */}

      {/* Count + clear */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="text-sm uppercase tracking-widest text-ink-600">
          {filtered.length === 0
            ? labels.zero
            : filtered.length === 1
              ? labels.one
              : labels.many.replace("{count}", String(filtered.length))}
        </div>
        {hasActiveFilter && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-gold-700 hover:text-ink-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded px-2 py-1"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
            {labels.clearFilters}
          </button>
        )}
      </div>

      {/* Brand grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((b) => (
            <BrandCard
              key={b.slug}
              brand={b}
              locale={locale}
              onOpen={() => setSelected(b)}
              labels={{
                newForExpo: labels.newForExpo,
                seekingDistributor: labels.seekingDistributor,
                seekingReseller: labels.seekingReseller,
                exports: labels.exports,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-ink-600">{labels.empty}</div>
      )}

      {/* Brand detail modal */}
      {selected && (
        <BrandModal
          brand={selected}
          locale={locale}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`snap-start shrink-0 px-4 py-2.5 rounded-sm text-xs md:text-sm uppercase tracking-widest font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
        active
          ? "bg-ink-950 text-cream-50"
          : "bg-cream-100 text-ink-600 hover:text-ink-900 hover:bg-cream-200"
      }`}
    >
      {label}
    </button>
  );
}

function SubChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
        active
          ? "bg-gold-500 text-ink-950"
          : "border border-ink-900/20 text-ink-600 hover:text-ink-900 hover:border-gold-500"
      }`}
    >
      {label}
    </button>
  );
}


function BrandCard({
  brand,
  locale,
  onOpen,
  labels,
}: {
  brand: Brand;
  locale: string;
  onOpen: () => void;
  labels: {
    newForExpo: string;
    seekingDistributor: string;
    seekingReseller: string;
    exports: string;
  };
}) {
  // Logo resolution: explicit logo field OR /brands/logos/<slug>.svg convention
  const logoPath = brand.logo || `/brands/logos/${brand.slug}.svg`;

  const [logoOk, setLogoOk] = useState(true);

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative block w-full text-left bg-cream-50 border border-ink-900/10 rounded-sm transition-all duration-300 hover:border-gold-500/50 hover:shadow-[0_0_0_1px_rgba(244,173,60,0.25)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
        brand.tier === "gold" ? "ring-1 ring-gold-500/20" : ""
      }`}
    >
      {/* Tier accent strip */}
      {brand.tier === "gold" && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gold-500 rounded-t-sm"
          aria-hidden="true"
        />
      )}

      {/* Badges row top-right */}
      <div className="absolute top-3 right-3 flex flex-col items-end gap-1 z-10">
        {brand.newForExpo && (
          <span className="inline-flex items-center gap-1 bg-ember-600 text-cream-50 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-sm">
            <Sparkles className="w-3 h-3" strokeWidth={2.5} />
            {labels.newForExpo}
          </span>
        )}
      </div>

      {/* Logo area (square, centered) */}
      <div className="aspect-[5/3] flex items-center justify-center p-6 border-b border-ink-900/5">
        {logoOk ? (
          <Image
            src={logoPath}
            alt={`${brand.name} logo`}
            width={180}
            height={72}
            onError={() => setLogoOk(false)}
            className="max-h-full max-w-full object-contain"
            unoptimized
          />
        ) : (
          /* Fallback: big stylized name */
          <span
            className="text-ink-900 text-2xl md:text-3xl font-bold text-center tracking-tight leading-tight"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {brand.name}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Image
            src={`/flags/${brand.country}.svg`}
            alt=""
            width={14}
            height={14}
            className="w-3.5 h-3.5 rounded-full object-cover"
          />
          <span className="text-xs text-ink-600 uppercase tracking-widest truncate">
            {getCountryName(brand.country, locale)}
          </span>
        </div>

        <h3
          className="text-ink-900 text-base md:text-lg leading-tight font-bold mb-2 truncate"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          {brand.name}
        </h3>

        {/* Transverse pills inline */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {brand.seekingDistributor && (
            <InlinePill label={labels.seekingDistributor} icon="handshake" />
          )}
          {brand.seekingReseller && (
            <InlinePill label={labels.seekingReseller} icon="store" />
          )}
          {brand.exportsAbroad && (
            <InlinePill label={labels.exports} icon="plane" />
          )}
        </div>
      </div>

      <ExternalLink
        className="absolute bottom-3 right-3 w-4 h-4 text-ink-400 opacity-0 group-hover:opacity-100 transition-opacity"
        strokeWidth={2}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand detail modal — professional pop-up                          */
/* ------------------------------------------------------------------ */

const MODAL_LABELS: Record<
  string,
  {
    visit: string;
    catalog: string;
    appointment: string;
    about: string;
    stand: string;
    close: string;
    newForExpo: string;
    seekingDistributor: string;
    seekingReseller: string;
    exports: string;
  }
> = {
  fr: { visit: "Site internet", catalog: "Télécharger le catalogue", appointment: "Prendre rendez-vous", about: "À propos", stand: "Stand", close: "Fermer", newForExpo: "Nouveau 2027", seekingDistributor: "Cherche distributeur", seekingReseller: "Cherche revendeur", exports: "Exporte" },
  en: { visit: "Website", catalog: "Download catalog", appointment: "Book a meeting", about: "About", stand: "Booth", close: "Close", newForExpo: "New 2027", seekingDistributor: "Seeking distributor", seekingReseller: "Seeking reseller", exports: "Exports" },
  es: { visit: "Sitio web", catalog: "Descargar catálogo", appointment: "Reservar una cita", about: "Acerca de", stand: "Stand", close: "Cerrar", newForExpo: "Nuevo 2027", seekingDistributor: "Busca distribuidor", seekingReseller: "Busca revendedor", exports: "Exporta" },
  de: { visit: "Webseite", catalog: "Katalog herunterladen", appointment: "Termin vereinbaren", about: "Über uns", stand: "Stand", close: "Schließen", newForExpo: "Neu 2027", seekingDistributor: "Sucht Distributor", seekingReseller: "Sucht Wiederverkäufer", exports: "Exportiert" },
  nl: { visit: "Website", catalog: "Catalogus downloaden", appointment: "Afspraak maken", about: "Over ons", stand: "Stand", close: "Sluiten", newForExpo: "Nieuw 2027", seekingDistributor: "Zoekt distributeur", seekingReseller: "Zoekt doorverkoper", exports: "Exporteert" },
  pt: { visit: "Site", catalog: "Descarregar catálogo", appointment: "Marcar reunião", about: "Sobre", stand: "Stand", close: "Fechar", newForExpo: "Novo 2027", seekingDistributor: "Procura distribuidor", seekingReseller: "Procura revendedor", exports: "Exporta" },
  it: { visit: "Sito web", catalog: "Scarica il catalogo", appointment: "Prenota un incontro", about: "Chi siamo", stand: "Stand", close: "Chiudi", newForExpo: "Nuovo 2027", seekingDistributor: "Cerca distributore", seekingReseller: "Cerca rivenditore", exports: "Esporta" },
};

function BrandModal({
  brand,
  locale,
  onClose,
}: {
  brand: Brand;
  locale: string;
  onClose: () => void;
}) {
  const t = MODAL_LABELS[locale] || MODAL_LABELS.fr;
  const logoPath = brand.logo || `/brands/logos/${brand.slug}.svg`;
  const [logoOk, setLogoOk] = useState(true);
  const website = brand.website && brand.website !== "#" ? brand.website : null;

  // Close on Escape + lock scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const socials: { key: string; href?: string; Icon: typeof Instagram }[] = [
    { key: "instagram", href: brand.social?.instagram, Icon: Instagram },
    { key: "facebook", href: brand.social?.facebook, Icon: Facebook },
    { key: "linkedin", href: brand.social?.linkedin, Icon: Linkedin },
    { key: "youtube", href: brand.social?.youtube, Icon: Youtube },
  ];
  const activeSocials = socials.filter((s) => s.href);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={brand.name}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-cream-50 rounded-lg shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-ink-950/60 text-cream-50 hover:bg-ink-950 transition-colors backdrop-blur-sm"
        >
          <X className="w-5 h-5" strokeWidth={2.5} />
        </button>

        {/* Cover */}
        <div className="relative h-44 md:h-56 bg-ink-900 overflow-hidden">
          {brand.coverImage ? (
            <Image
              src={brand.coverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-char-900 to-ink-950" aria-hidden="true" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-cream-50 via-transparent to-transparent" aria-hidden="true" />
        </div>

        {/* Logo + header */}
        <div className="px-6 md:px-10 -mt-12 relative">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg bg-cream-50 border border-ink-900/10 shadow-lg flex items-center justify-center p-3 shrink-0">
              {logoOk ? (
                <Image
                  src={logoPath}
                  alt={`${brand.name} logo`}
                  width={120}
                  height={120}
                  onError={() => setLogoOk(false)}
                  className="max-h-full max-w-full object-contain"
                  unoptimized
                />
              ) : (
                <span
                  className="text-ink-900 text-lg font-bold text-center leading-tight"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {brand.name}
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2
              className="text-ink-900 text-3xl md:text-4xl font-bold leading-none"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {brand.name}
            </h2>
          </div>

          {/* Meta row */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-600">
            <span className="inline-flex items-center gap-1.5">
              <Image
                src={`/flags/${brand.country}.svg`}
                alt=""
                width={16}
                height={16}
                className="w-4 h-4 rounded-full object-cover"
              />
              {getCountryName(brand.country, locale)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-ink-300">·</span>
              {getCategoryLabel(brand.category, locale)}
            </span>
            {brand.stand && (
              <span className="inline-flex items-center gap-1.5 text-gold-700 font-semibold">
                <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                {t.stand} {brand.stand}
              </span>
            )}
          </div>

          {/* Flags / pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {brand.newForExpo && <ModalPill label={t.newForExpo} tone="ember" />}
            {brand.seekingDistributor && <ModalPill label={t.seekingDistributor} tone="gold" />}
            {brand.seekingReseller && <ModalPill label={t.seekingReseller} tone="gold" />}
            {brand.exportsAbroad && <ModalPill label={t.exports} tone="gold" />}
          </div>
        </div>

        {/* Description */}
        {brand.description && (
          <div className="px-6 md:px-10 mt-6">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-ink-500 mb-2">
              {t.about}
            </h3>
            <p className="text-ink-700 text-base leading-relaxed">
              {brand.description}
            </p>
          </div>
        )}

        {/* Socials */}
        {activeSocials.length > 0 && (
          <div className="px-6 md:px-10 mt-6 flex gap-2">
            {activeSocials.map(({ key, href, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={key}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-ink-900/15 text-ink-700 hover:bg-ink-950 hover:text-cream-50 hover:border-ink-950 transition-colors"
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
              </a>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="px-6 md:px-10 py-8 mt-4 flex flex-col sm:flex-row flex-wrap gap-3">
          {brand.appointmentUrl && (
            <a
              href={brand.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 py-3.5 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
            >
              <CalendarCheck className="w-4 h-4" strokeWidth={2.5} />
              {t.appointment}
            </a>
          )}
          {brand.catalogUrl && (
            <a
              href={brand.catalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-ink-900/25 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 py-3.5 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
            >
              <Download className="w-4 h-4" strokeWidth={2.5} />
              {t.catalog}
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-ink-900/25 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 py-3.5 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
            >
              <Globe className="w-4 h-4" strokeWidth={2.5} />
              {t.visit}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ModalPill({ label, tone }: { label: string; tone: "ember" | "gold" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm ${
        tone === "ember"
          ? "bg-ember-600 text-cream-50"
          : "bg-gold-100 text-gold-900"
      }`}
    >
      {label}
    </span>
  );
}

function InlinePill({
  label,
  icon,
}: {
  label: string;
  icon: "handshake" | "store" | "plane";
}) {
  const Icon = icon === "handshake" ? HandshakeIcon : icon === "store" ? Store : Plane;
  return (
    <span className="inline-flex items-center gap-1 bg-gold-100 text-gold-900 text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded-sm">
      <Icon className="w-2.5 h-2.5" strokeWidth={2.5} />
      {label}
    </span>
  );
}
