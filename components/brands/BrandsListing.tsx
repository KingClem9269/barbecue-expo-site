"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { Sparkles, ExternalLink } from "lucide-react";
import {
  type Brand,
  type BrandCategory,
  getCategoryLabel,
} from "@/lib/brands-shared";
import { getCountryName } from "@/lib/pitmasters-shared";

export type BrandsListingProps = {
  brands: Brand[];
  locale: string;
  labels: {
    allCategories: string;
    allCountries: string;
    category: string;
    country: string;
    search: string;
    newForExpo: string;
    zero: string;
    one: string;
    many: string;
    empty: string;
  };
};

export default function BrandsListing({
  brands,
  locale,
  labels,
}: BrandsListingProps) {
  const [category, setCategory] = useState<BrandCategory | "all">("all");
  const [country, setCountry] = useState<string>("all");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(brands.map((b) => b.category))).sort(),
    [brands],
  );
  const countries = useMemo(
    () =>
      Array.from(new Set(brands.map((b) => b.country))).sort((a, b) =>
        getCountryName(a, locale).localeCompare(getCountryName(b, locale)),
      ),
    [brands, locale],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return brands.filter((b) => {
      if (category !== "all" && b.category !== category) return false;
      if (country !== "all" && b.country !== country) return false;
      if (q && !b.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [brands, category, country, query]);

  return (
    <div>
      {/* Filters row */}
      <div className="flex flex-wrap gap-3 md:gap-4 items-end mb-10 md:mb-14">
        {/* Category select */}
        <label className="inline-flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-600">
            {labels.category}
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as BrandCategory | "all")}
            className="appearance-none bg-cream-50 border border-ink-900/20 rounded-sm px-3 py-2 text-sm text-ink-900 font-medium focus:outline-none focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-500/30 cursor-pointer min-w-[180px]"
          >
            <option value="all">{labels.allCategories}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {getCategoryLabel(c, locale)}
              </option>
            ))}
          </select>
        </label>

        {/* Country select */}
        <label className="inline-flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-600">
            {labels.country}
          </span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="appearance-none bg-cream-50 border border-ink-900/20 rounded-sm px-3 py-2 text-sm text-ink-900 font-medium focus:outline-none focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-500/30 cursor-pointer min-w-[180px]"
          >
            <option value="all">{labels.allCountries}</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {getCountryName(c, locale)}
              </option>
            ))}
          </select>
        </label>

        {/* Search input */}
        <label className="inline-flex flex-col gap-1.5 flex-1 min-w-[200px]">
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-600">
            {labels.search}
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            className="bg-cream-50 border border-ink-900/20 rounded-sm px-3 py-2 text-sm text-ink-900 font-medium focus:outline-none focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-500/30"
          />
        </label>
      </div>

      {/* Count */}
      <div className="mb-8 text-sm uppercase tracking-widest text-ink-600">
        {filtered.length === 0
          ? labels.zero
          : filtered.length === 1
            ? labels.one
            : labels.many.replace("{count}", String(filtered.length))}
      </div>

      {/* Brand grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((b) => (
            <BrandCard
              key={b.slug}
              brand={b}
              locale={locale}
              newLabel={labels.newForExpo}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-ink-600">{labels.empty}</div>
      )}
    </div>
  );
}

function BrandCard({
  brand,
  locale,
  newLabel,
}: {
  brand: Brand;
  locale: string;
  newLabel: string;
}) {
  const href = brand.website && brand.website !== "#" ? brand.website : null;
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as Record<string, string>)}
      className={`group relative block bg-cream-50 border border-ink-900/10 rounded-sm p-5 md:p-6 transition-all duration-300 ${
        href
          ? "hover:border-gold-500/50 hover:shadow-[0_0_0_1px_rgba(244,173,60,0.25)] cursor-pointer"
          : ""
      } ${brand.tier === "gold" ? "ring-1 ring-gold-500/20" : ""}`}
    >
      {/* Tier accent strip */}
      {brand.tier === "gold" && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gold-500"
          aria-hidden="true"
        />
      )}

      {/* New badge */}
      {brand.newForExpo && (
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-ember-600 text-cream-50 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-sm">
          <Sparkles className="w-3 h-3" strokeWidth={2.5} />
          {newLabel}
        </div>
      )}

      {/* Flag + country */}
      <div className="flex items-center gap-2 mb-4">
        <Image
          src={`/flags/${brand.country}.svg`}
          alt=""
          width={14}
          height={14}
          className="w-3.5 h-3.5 rounded-full object-cover"
        />
        <span className="text-xs text-ink-600 uppercase tracking-widest">
          {getCountryName(brand.country, locale)}
        </span>
      </div>

      {/* Name */}
      <h3
        className="text-ink-900 text-xl md:text-2xl leading-tight font-bold mb-2"
        style={{ fontFamily: "SansPlomb-98, sans-serif" }}
      >
        {brand.name}
      </h3>

      {/* Category */}
      <div className="text-gold-700 text-xs uppercase tracking-widest font-semibold">
        {getCategoryLabel(brand.category, locale)}
      </div>

      {/* External link icon */}
      {href && (
        <ExternalLink
          className="absolute bottom-3 right-3 w-4 h-4 text-ink-400 opacity-0 group-hover:opacity-100 transition-opacity"
          strokeWidth={2}
        />
      )}
    </Wrapper>
  );
}
