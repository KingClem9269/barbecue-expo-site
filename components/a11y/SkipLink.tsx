"use client";

import { useLocale } from "next-intl";

const LABELS: Record<string, string> = {
  fr: "Aller au contenu principal",
  en: "Skip to main content",
  es: "Saltar al contenido principal",
  de: "Zum Hauptinhalt springen",
  nl: "Naar hoofdinhoud",
  pt: "Saltar para o conteúdo principal",
  it: "Vai al contenuto principale",
};

/**
 * SkipLink — accessibility link for keyboard users.
 * Hidden until focused, then becomes visible with strong contrast.
 * Must be the very first focusable element in the document.
 */
export default function SkipLink() {
  const locale = useLocale();
  const label = LABELS[locale] || LABELS.fr;

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:bg-gold-500 focus:text-ink-950 focus:px-4 focus:py-3 focus:rounded-sm focus:font-semibold focus:text-sm focus:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-950"
    >
      {label}
    </a>
  );
}
