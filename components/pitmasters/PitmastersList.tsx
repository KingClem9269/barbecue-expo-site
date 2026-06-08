"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import type { Pitmaster } from "@/lib/pitmasters-shared";

export type PitmastersListProps = {
  pitmasters: Pitmaster[];
  locale: string;
  countryNames: Record<string, string>;
  labels: {
    all: string;
    country: string;
    specialty: string;
    day: string;
    zero: string;
    one: string;
    many: string; // must include {count}
    empty: string;
  };
  specialtyNames: Record<string, string>;
  days: string[];
};

export default function PitmastersList({
  pitmasters,
  countryNames,
  labels,
  days,
}: PitmastersListProps) {
  const [country, setCountry] = useState<string>("all");
  const [day, setDay] = useState<string>("all");

  const countries = useMemo(
    () =>
      Array.from(new Set(pitmasters.map((p) => p.country))).sort((a, b) =>
        (countryNames[a] || a).localeCompare(countryNames[b] || b),
      ),
    [pitmasters, countryNames],
  );

  const filtered = useMemo(() => {
    return pitmasters.filter((p) => {
      if (country !== "all" && p.country !== country) return false;
      if (day !== "all") {
        const hasDay = (p.sessions || []).some((s) => s.day === day);
        if (!hasDay) return false;
      }
      return true;
    });
  }, [pitmasters, country, day]);

  const resetAll = () => {
    setCountry("all");
    setDay("all");
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 md:gap-4 mb-10 md:mb-14">
        <FilterSelect
          label={labels.country}
          value={country}
          onChange={setCountry}
          options={[
            { value: "all", label: labels.all },
            ...countries.map((c) => ({
              value: c,
              label: countryNames[c] || c.toUpperCase(),
            })),
          ]}
        />
        <FilterSelect
          label={labels.day}
          value={day}
          onChange={setDay}
          options={[
            { value: "all", label: labels.all },
            ...days.map((d) => ({ value: d, label: d })),
          ]}
        />
        {(country !== "all" || day !== "all") && (
          <button
            type="button"
            onClick={resetAll}
            className="text-xs md:text-sm uppercase tracking-widest font-semibold text-gold-700 hover:text-ink-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded px-2"
          >
            Reset
          </button>
        )}
      </div>

      {/* Count */}
      <div className="mb-8 text-sm uppercase tracking-widest text-ink-600">
        {filtered.length === 0
          ? labels.zero
          : filtered.length === 1
            ? labels.one
            : labels.many.replace("{count}", String(filtered.length))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p) => (
            <PitmasterCard
              key={p.slug}
              p={p}
              countryName={countryNames[p.country] || p.country.toUpperCase()}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-ink-600">{labels.empty}</div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="inline-flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-widest font-semibold text-ink-600">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-cream-50 border border-ink-900/20 rounded-sm px-3 py-2 text-sm text-ink-900 font-medium focus:outline-none focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-500/30 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function PitmasterCard({
  p,
  countryName,
}: {
  p: Pitmaster;
  countryName: string;
}) {
  return (
    <Link
      href={`/pitmasters/${p.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden bg-char-800 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
    >
      {p.portrait && (
        <Image
          src={p.portrait}
          alt={p.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {/* Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent transition-opacity duration-500 opacity-80 group-hover:opacity-95"
        aria-hidden="true"
      />

      {/* Char ring on hover */}
      <div
        className="absolute inset-3 ring-1 ring-gold-500/0 group-hover:ring-gold-500/60 transition-all duration-500 pointer-events-none rounded-sm"
        aria-hidden="true"
      />

      {/* Info */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex flex-col gap-1.5 text-cream-50">
        <span
          className="inline-block w-6 h-px bg-gold-500 origin-left transition-transform duration-500 ease-out group-hover:scale-x-[2]"
          aria-hidden="true"
        />
        <h3
          className="text-lg md:text-2xl leading-tight font-bold tracking-tight"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          {p.name}
        </h3>
        <div className="flex items-center justify-between gap-2 text-[11px] md:text-xs text-cream-50/80 uppercase tracking-widest">
          <span className="flex items-center gap-1.5 min-w-0">
            <CountryFlag country={p.country} />
            <span className="truncate">{countryName}</span>
          </span>
          <ArrowUpRight
            className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
            strokeWidth={2}
          />
        </div>
      </div>
    </Link>
  );
}

function CountryFlag({ country }: { country: string }) {
  return (
    <Image
      src={`/flags/${country}.svg`}
      alt=""
      width={14}
      height={14}
      className="w-3.5 h-3.5 rounded-full object-cover"
    />
  );
}
