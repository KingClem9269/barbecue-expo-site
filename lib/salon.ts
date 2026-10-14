/**
 * Les informations du salon 2027 affichées dans l'identité (affiche
 * d'ouverture, billet, bandes de date) : une seule source, traduite.
 * Les chiffres publics (visiteurs…) sont dans lib/chiffres.ts.
 */

export const SALON = {
  annee: "2027",
  jours: "12·13·14",
  datesCourtes: "12·13·14.03.2027",
  lieu: ["Parc Floral", "de Paris"],
  ouverture: "2027-03-12T00:00:00+01:00",
  /**
   * Vente des billets grand public 2027. Tant que false, /billetterie annonce
   * l'ouverture prochaine et propose l'alerte (inscription à la newsletter).
   * Passer à true le jour de l'ouverture : le module Weezevent s'affiche et
   * les boutons reprennent « Réserver ma place ».
   */
  billetterieOuverte: false,
} as const;

type ParLangue = Record<string, string>;

function traduire(table: ParLangue, locale: string) {
  return table[locale] || table.fr;
}

const EDITION: ParLangue = {
  fr: "6ᵉ édition",
  en: "6th edition",
  es: "6.ª edición",
  de: "6. Ausgabe",
  nl: "6e editie",
  pt: "6.ª edição",
  it: "6ª edizione",
};

const MOIS: ParLangue = {
  fr: "mars",
  en: "March",
  es: "marzo",
  de: "März",
  nl: "maart",
  pt: "março",
  it: "marzo",
};

const BILLETTERIE: ParLangue = {
  fr: "Billetterie",
  en: "Tickets",
  es: "Entradas",
  de: "Tickets",
  nl: "Tickets",
  pt: "Bilhetes",
  it: "Biglietti",
};

/** Mois et année des photos de l'édition 2026 (10-12 avril 2026). */
const EDITION_2026: ParLangue = {
  fr: "Avril 2026",
  en: "April 2026",
  es: "Abril 2026",
  de: "April 2026",
  nl: "April 2026",
  pt: "Abril 2026",
  it: "Aprile 2026",
};

export const edition = (locale: string) => traduire(EDITION, locale);
export const mois = (locale: string) => traduire(MOIS, locale);
export const libelleBilletterie = (locale: string) => traduire(BILLETTERIE, locale);
export const photos2026 = (locale: string) => traduire(EDITION_2026, locale);
