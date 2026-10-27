/**
 * Provenance du visiteur : d'où il arrive sur le site (publicité Meta,
 * LinkedIn, Google, lien suivi d'un e-mailing, réseau social, moteur de
 * recherche, site référent, accès direct).
 *
 * Relevée à l'arrivée (<Provenance /> dans le layout) puis jointe à la demande
 * de devis (QuoteModal → /api/quote → Fred), qui la classe et la range dans la
 * liste « Demandes de devis ». Rien n'est envoyé tant que le visiteur ne
 * demande pas de devis.
 *
 * Stockage : sessionStorage (la visite en cours) ; localStorage 90 jours en
 * plus seulement si le visiteur a accepté les cookies publicitaires, pour
 * reconnaître celui qui revient plus tard après avoir cliqué une annonce.
 *
 * Deux contacts gardés : le premier et le dernier « non direct ». Un retour en
 * accès direct n'efface pas la publicité qui l'a fait venir.
 */

const CLE = "bbq-expo:provenance";
const CLE_COOKIES = "bbq-expo:cookies";
const DUREE = 1000 * 60 * 60 * 24 * 90;

const PARAMS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id",
  "fbclid", "gclid", "gbraid", "wbraid", "li_fat_id", "msclkid", "ttclid",
] as const;

export type Contact = Partial<Record<(typeof PARAMS)[number], string>> & {
  referrer?: string;
  landing_page?: string;
  at: string;
};

type Memoire = { premiere?: Contact; derniere?: Contact; date: number };

function pubAcceptee(): boolean {
  try {
    const c = JSON.parse(window.localStorage.getItem(CLE_COOKIES) || "null");
    return c?.pub === true || c?.choix === "accepte";
  } catch {
    return false;
  }
}

function lire(stockage: Storage): Memoire | null {
  try {
    const m = JSON.parse(stockage.getItem(CLE) || "null") as Memoire | null;
    if (!m || Date.now() - m.date > DUREE) return null;
    return m;
  } catch {
    return null;
  }
}

function ecrire(m: Memoire) {
  const brut = JSON.stringify(m);
  try { window.sessionStorage.setItem(CLE, brut); } catch { /* stockage indisponible */ }
  try {
    if (pubAcceptee()) window.localStorage.setItem(CLE, brut);
  } catch { /* stockage indisponible */ }
}

/** Le contact de cette arrivée, ou null si accès direct (ni paramètre, ni site d'origine). */
function contactDeLArrivee(): Contact | null {
  const url = new URL(window.location.href);
  const c: Contact = { at: new Date().toISOString(), landing_page: url.pathname };
  let signal = false;
  for (const p of PARAMS) {
    const v = url.searchParams.get(p);
    if (v) { c[p] = v.slice(0, 300); signal = true; }
  }
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    // Navigation interne : pas une provenance.
    if (ref && ref.hostname !== url.hostname) { c.referrer = ref.origin + ref.pathname; signal = true; }
  } catch { /* referrer illisible */ }
  return signal ? c : null;
}

/** À appeler une fois par chargement de page. */
export function releverProvenance() {
  const contact = contactDeLArrivee();
  const m = lire(window.sessionStorage) ?? lire(window.localStorage) ?? { date: Date.now() };
  if (contact) {
    m.premiere = m.premiere ?? contact;
    m.derniere = contact;
    m.date = Date.now();
  }
  if (contact || m.premiere) ecrire(m);
}

function cookie(nom: string): string | undefined {
  const v = document.cookie.split("; ").find((c) => c.startsWith(`${nom}=`));
  return v ? decodeURIComponent(v.slice(nom.length + 1)).slice(0, 300) : undefined;
}

/** Ce qui accompagne la demande de devis. */
export function lireProvenance() {
  const m = lire(window.sessionStorage) ?? lire(window.localStorage);
  return {
    premiere: m?.premiere ?? null,
    derniere: m?.derniere ?? null,
    // Posés par le pixel Meta et Google Ads (avec accord publicitaire) après un clic d'annonce.
    fbc: cookie("_fbc"),
    gclAw: cookie("_gcl_aw"),
    page: window.location.pathname,
  };
}
