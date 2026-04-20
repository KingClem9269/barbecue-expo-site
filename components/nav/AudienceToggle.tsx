"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

/**
 * AudienceToggle — contextual nav pill showing current rail (Visiter / Pro).
 * Appears on desktop nav. Highlights the active rail based on pathname.
 */

const LABELS: Record<string, { visit: string; pro: string }> = {
  fr: { visit: "Visiter", pro: "Pro" },
  en: { visit: "Visit", pro: "Pro" },
  es: { visit: "Visitar", pro: "Pro" },
  de: { visit: "Besuchen", pro: "Pro" },
  nl: { visit: "Bezoeken", pro: "Pro" },
  pt: { visit: "Visitar", pro: "Pro" },
  it: { visit: "Visitare", pro: "Pro" },
};

export function AudienceToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const labels = LABELS[locale] || LABELS.fr;
  const isVisit = pathname.startsWith("/visiter");
  const isPro = pathname.startsWith("/pro");

  return (
    <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/15 rounded-full p-1 text-xs uppercase tracking-widest font-semibold backdrop-blur-md">
      <Link
        href="/visiter"
        className={`px-3 py-1.5 rounded-full transition-colors ${
          isVisit
            ? "bg-gold-500 text-ink-950"
            : "text-white/80 hover:text-gold-500"
        }`}
      >
        {labels.visit}
      </Link>
      <Link
        href="/pro"
        className={`px-3 py-1.5 rounded-full transition-colors ${
          isPro
            ? "bg-gold-500 text-ink-950"
            : "text-white/80 hover:text-gold-500"
        }`}
      >
        {labels.pro}
      </Link>
    </div>
  );
}
