"use client";

import { useLocale } from "next-intl";

/** Billetterie grand public — widget Weezevent (Barbecue Expo Grand Public). */
export const WEEZEVENT_GP_URL =
  "https://widget.weezevent.com/ticket/E2154351/?code=16841&locale=fr-FR&width_auto=1&color_primary=0032FA";

/** Ouvre la billetterie Weezevent dans une fenêtre popup. */
export function openWeezevent() {
  if (typeof window === "undefined") return;
  const w = window.open(
    WEEZEVENT_GP_URL,
    "Billetterie Weezevent",
    "width=650, height=600, top=100, left=100, toolbar=no, resizable=yes, scrollbars=yes, status=no",
  );
  w?.focus();
}

const BUY_LABEL: Record<string, string> = {
  fr: "Acheter vos billets",
  en: "Buy your tickets",
  es: "Compra tus entradas",
  de: "Tickets kaufen",
  nl: "Koop je tickets",
  pt: "Compre os seus bilhetes",
  it: "Acquista i biglietti",
};

/** Bouton « Acheter vos billets » → popup Weezevent. */
export default function WeezeventCTA({ className }: { className?: string }) {
  const locale = useLocale();
  return (
    <button
      type="button"
      onClick={openWeezevent}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 bg-gold-500 text-ink-950 px-7 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gold-300 transition-colors"
      }
    >
      {BUY_LABEL[locale] || BUY_LABEL.fr}
    </button>
  );
}
