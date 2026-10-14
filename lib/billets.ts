/**
 * Les billets grand public présentés sur le site. La vente elle-même (tarifs,
 * périodes, minimum par commande, formulaire participants) se règle dans
 * Weezevent : garder ces valeurs identiques à celles du module.
 */

export type PhaseTarif = "earlyBird" | "prevente" | "final";

export const BILLET_GROUPE = {
  /** billets minimum par commande */
  minimum: 20,
  /** prix d'un billet (€) selon la période de vente, dans l'ordre */
  tarifs: [
    { phase: "earlyBird", prix: 10 },
    { phase: "prevente", prix: 12 },
    { phase: "final", prix: 14 },
  ],
} as const;

/** 10 € (fr), €10 (en)… selon la langue. */
export function prix(valeur: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(valeur);
}

/* ------------------------------------------------------------------------- */
/*  Billetterie 2027 en trois pass (Individuel, Groupes, + Food)              */
/* ------------------------------------------------------------------------- */

/**
 * Les paliers de prix du module de vente : un palier se termine à sa date,
 * le suivant prend le relais. Le dernier n'a pas de fin.
 */
export type IdPalier = "earlyBird" | "prevente" | "dernierAppel";

export const PALIERS: readonly { id: IdPalier; fin: string | null }[] = [
  { id: "earlyBird", fin: "2026-12-31T23:59:59+01:00" },
  { id: "prevente", fin: "2027-02-28T23:59:59+01:00" },
  { id: "dernierAppel", fin: null },
];

/** Indice du palier en cours à la date donnée. */
export function palierCourant(maintenant = new Date()) {
  const i = PALIERS.findIndex((p) => p.fin && maintenant <= new Date(p.fin));
  return i === -1 ? PALIERS.length - 1 : i;
}

export type IdTarif = "vendredi" | "journee" | "weekend" | "jeune" | "moins12" | "famille" | "groupe";

/**
 * Prix TTC (€) de chaque tarif, palier par palier (early bird, prévente,
 * dernier appel) : identiques à la grille du module de vente. 0 = gratuit.
 */
export const TARIFS: Record<IdTarif, readonly [number, number, number]> = {
  vendredi: [18, 20, 22],
  journee: [14, 16, 18],
  weekend: [22, 25, 28],
  jeune: [10, 10, 10],
  moins12: [0, 0, 0],
  famille: [40, 45, 48],
  groupe: [10, 12, 14],
};

export type IdPass = "individuel" | "groupes" | "food";

/** Les trois familles de pass, et les tarifs vendus dans chaque module. */
export const PASS: Record<IdPass, { tarifs: readonly IdTarif[]; ouvert: boolean }> = {
  individuel: { tarifs: ["vendredi", "journee", "weekend", "jeune", "moins12"], ouvert: true },
  groupes: { tarifs: ["famille", "groupe", "moins12"], ouvert: true },
  food: { tarifs: [], ouvert: false },
};

export const ORDRE_PASS: readonly IdPass[] = ["individuel", "groupes", "food"];

/** Prix le plus bas (payant) d'un pass au palier donné, pour « dès … ». */
export function prixMini(pass: IdPass, palier: number) {
  const payants = PASS[pass].tarifs.map((t) => TARIFS[t][palier]).filter((p) => p > 0);
  return payants.length ? Math.min(...payants) : null;
}
