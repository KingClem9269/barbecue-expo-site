"use client";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useAudience } from "./AudienceContext";

/**
 * AudienceToggle — Grand Public ↔ Pro pill in the desktop nav.
 *
 * Active state derived from AudienceContext (URL pathname or persisted choice).
 * Clicking a side both navigates AND persists the choice for next visit.
 */

const LABELS: Record<string, { b2c: string; pro: string }> = {
  fr: { b2c: "Grand Public", pro: "Pro" },
  en: { b2c: "Public", pro: "Pro" },
  es: { b2c: "Gran Público", pro: "Pro" },
  de: { b2c: "Allgemeines Publikum", pro: "Pro" },
  nl: { b2c: "Publiek", pro: "Pro" },
  pt: { b2c: "Grande Público", pro: "Pro" },
  it: { b2c: "Grande Pubblico", pro: "Pro" },
};

export function AudienceToggle() {
  const locale = useLocale();
  const labels = LABELS[locale] || LABELS.fr;
  const { audience, setAudience } = useAudience();

  return (
    <div
      className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/15 rounded-full p-1 text-[11px] uppercase tracking-widest font-semibold backdrop-blur-md"
      role="tablist"
      aria-label="Audience"
    >
      <Link
        href="/visiter"
        onClick={() => setAudience("b2c")}
        role="tab"
        aria-selected={audience === "b2c"}
        className={`px-3 py-1.5 rounded-full transition-colors ${
          audience === "b2c"
            ? "bg-gold-500 text-ink-950"
            : "text-white/80 hover:text-gold-500"
        }`}
      >
        {labels.b2c}
      </Link>
      <Link
        href="/pro"
        onClick={() => setAudience("pro")}
        role="tab"
        aria-selected={audience === "pro"}
        className={`px-3 py-1.5 rounded-full transition-colors ${
          audience === "pro"
            ? "bg-gold-500 text-ink-950"
            : "text-white/80 hover:text-gold-500"
        }`}
      >
        {labels.pro}
      </Link>
    </div>
  );
}
