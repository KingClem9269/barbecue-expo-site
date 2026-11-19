/**
 * Le choix cookies du visiteur, enregistré par le bandeau
 * (components/consentement/Consentement.tsx) dans localStorage
 * « bbq-expo:cookies » : { mesure, pub, date }. L'ancien format
 * { choix: "accepte" | "refuse", date } vaut pour les deux finalités.
 *
 * Lu aussi par la provenance (lib/provenance.ts) et par le module de
 * billetterie intégré, qui ne reçoit les identifiants de mesure et de
 * publicité qu'avec l'accord correspondant (lib/module-billetterie.ts).
 */

export const CLE_COOKIES = "bbq-expo:cookies";
export const DUREE_COOKIES = 1000 * 60 * 60 * 24 * 182; // ≈ 6 mois
/** Événement window envoyé à chaque choix (et à la réouverture du bandeau). */
export const EVENEMENT_COOKIES = "bbq-expo:cookies";

export type Choix = { mesure: boolean; pub: boolean };

/** Choix enregistré (texte brut du stockage), ou null s'il manque, est illisible ou a expiré. */
export function analyserChoix(brut: string | null, maintenant: number): Choix | null {
  if (!brut) return null;
  try {
    const c = JSON.parse(brut) as { mesure?: unknown; pub?: unknown; choix?: unknown; date?: unknown } | null;
    if (!c || typeof c !== "object" || typeof c.date !== "number" || maintenant - c.date > DUREE_COOKIES) return null;
    if (typeof c.choix === "string") return { mesure: c.choix === "accepte", pub: c.choix === "accepte" };
    return { mesure: c.mesure === true, pub: c.pub === true };
  } catch {
    return null;
  }
}

// Choix fait pendant la visite, si le stockage est bloqué.
let choixVisite: Choix | null = null;

export function retenirChoixVisite(c: Choix) {
  choixVisite = c;
}

/** Choix enregistré dans le navigateur, sinon celui fait pendant la visite, sinon null. */
export function choixEnregistre(): Choix | null {
  try {
    const c = analyserChoix(window.localStorage.getItem(CLE_COOKIES), Date.now());
    if (c) return c;
  } catch {
    /* stockage indisponible */
  }
  return choixVisite;
}

/** Le choix en vigueur : sans choix, tout est refusé. */
export function choixActuel(): Choix {
  return choixEnregistre() ?? { mesure: false, pub: false };
}
