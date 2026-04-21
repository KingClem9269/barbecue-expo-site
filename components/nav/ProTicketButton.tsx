"use client";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const LABELS: Record<string, string> = {
  fr: "Billetterie Pro",
  en: "Pro Tickets",
  es: "Entradas Pro",
  de: "Pro-Tickets",
  nl: "Pro-tickets",
  pt: "Bilhetes Pro",
  it: "Biglietti Pro",
};

export function ProTicketButton() {
  const locale = useLocale();
  const label = LABELS[locale] || LABELS.fr;
  return (
    <Link
      href="/billetterie/pro-b2b"
      className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-sm font-bold uppercase tracking-widest border-2 border-gold-500 bg-gold-500 text-ink-950 hover:bg-gold-300 hover:border-gold-300 transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
    >
      {label}
    </Link>
  );
}
