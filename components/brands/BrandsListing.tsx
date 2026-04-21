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
      {/* Category tabs (horizontal scroll on mobile) */}
      <div className="mb-6 -mx-6 md:mx-0">
        <div className="flex gap-2 overflow-x-auto px-6 md:px-0 pb-2 snap-x snap-mandatory">
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
        <div className="mb-6 -mx-6 md:mx-0">
          <div className="flex gap-2 overflow-x-auto px-6 md:px-0 pb-2">
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

      {/* Transverse toggles */}
      <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
        <TransverseToggle
          icon={<Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />}
          label={labels.newArrival}
          active={onlyNew}
          onToggle={() => setOnlyNew(!onlyNew)}
        />
        <TransverseToggle
          icon={<HandshakeIcon className="w-3.5 h-3.5" strokeWidth={2} />}
          label={labels.seekingDistributor}
          active={onlyDistributor}
          onToggle={() => setOnlyDistributor(!onlyDistributor)}
        />
        <TransverseToggle
          icon={<Store className="w-3.5 h-3.5" strokeWidth={2} />}
          label={labels.seekingReseller}
          active={onlyReseller}
          onToggle={() => setOnlyReseller(!onlyReseller)}
        />
        <TransverseToggle
          icon={<Plane className="w-3.5 h-3.5" strokeWidth={2} />}
          label={labels.exports}
          active={onlyExports}
          onToggle={() => setOnlyExports(!onlyExports)}
        />
      </div>

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

function TransverseToggle({
  icon,
  label,
  active,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
        active
          ? "bg-ember-600 text-cream-50"
          : "border border-ink-900/20 text-ink-600 hover:text-ink-900 hover:border-gold-500"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function BrandCard({
  brand,
  locale,
  labels,
}: {
  brand: Brand;
  locale: string;
  labels: {
    newForExpo: string;
    seekingDistributor: string;
    seekingReseller: string;
    exports: string;
  };
}) {
  const href = brand.website && brand.website !== "#" ? brand.website : null;
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  // Logo resolution: explicit logo field OR /brands/logos/<slug>.svg convention
  const logoPath = brand.logo || `/brands/logos/${brand.slug}.svg`;

  const [logoOk, setLogoOk] = useState(true);

  return (
    <Wrapper
      {...(wrapperProps as Record<string, string>)}
      className={`group relative block bg-cream-50 border border-ink-900/10 rounded-sm transition-all duration-300 ${
        href
          ? "hover:border-gold-500/50 hover:shadow-[0_0_0_1px_rgba(244,173,60,0.25)] cursor-pointer"
          : ""
      } ${brand.tier === "gold" ? "ring-1 ring-gold-500/20" : ""}`}
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

      {href && (
        <ExternalLink
          className="absolute bottom-3 right-3 w-4 h-4 text-ink-400 opacity-0 group-hover:opacity-100 transition-opacity"
          strokeWidth={2}
        />
      )}
    </Wrapper>
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
