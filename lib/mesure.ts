/**
 * Événements de mesure poussés dans le dataLayer et lus par GTM
 * (GTM-5NCHQMXR). Sert à la page des campagnes /presentation-exposants :
 * voir ConfigurateurStand.tsx, PageCampagnes.tsx et Estimator.tsx, et la liste
 * des événements dans dossiers/refonte-page-exposants/evenements-pierre.md.
 */

export function pousser(evenement: Record<string, unknown>) {
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(evenement);
}

/** Identifiant unique d'un événement (déduplication des conversions). */
export function identifiantUnique() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Une seule fois par visite (onglet) : vrai la première fois seulement. */
export function premiereFoisDansLaVisite(cle: string) {
  try {
    if (window.sessionStorage.getItem(cle)) return false;
    window.sessionStorage.setItem(cle, "1");
  } catch {
    /* stockage indisponible : on accepte un éventuel doublon */
  }
  return true;
}
