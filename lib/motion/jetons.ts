/**
 * Jetons motion « Marqué au feu » — miroir JS des variables CSS de
 * app/[locale]/globals.css. Référence : design-system/MOTION.md.
 */

/** Durées en millisecondes. */
export const DUREE = {
  tap: 120, // appui, focus
  ui: 200, // survol, ouverture de menu
  geste: 480, // tampon avec rebond, retournement
  scene: 650, // découpe entre deux pages
  saisie: 900, // saisie d'un titre
} as const;

/** Trois courbes, pas une de plus. */
export const EASE = {
  saisie: "cubic-bezier(0.7, 0, 0.2, 1)", // attaque franche, arrêt net
  tampon: "cubic-bezier(0.3, 1.5, 0.5, 1)", // impact, léger rebond
  sortie: "cubic-bezier(0.2, 0.8, 0.2, 1)", // survols, sorties
} as const;

/** Inclinaison des traits du « B », en degrés (repère écran). */
export const ANGLE_MARQUE = -27;

/** Décalage entre traits, lignes ou cases, en millisecondes. */
export const DECALAGE = 60;

export const MOUVEMENT_REDUIT = "(prefers-reduced-motion: reduce)";
