"use client";

import { useLocale } from "next-intl";
import { rouvrirCookies } from "./Consentement";

const LIBELLE: Record<string, string> = {
  fr: "Gérer les cookies",
  en: "Manage cookies",
  es: "Gestionar cookies",
  de: "Cookie-Einstellungen",
  nl: "Cookies beheren",
  pt: "Gerir cookies",
  it: "Gestisci cookie",
};

/** Rouvre le bandeau cookies pour changer d'avis (pied de page). */
export default function BoutonCookies() {
  const locale = useLocale();
  return (
    <button type="button" onClick={rouvrirCookies} className="underline underline-offset-2 hover:text-gold-500 transition-colors">
      {LIBELLE[locale] || LIBELLE.en}
    </button>
  );
}
