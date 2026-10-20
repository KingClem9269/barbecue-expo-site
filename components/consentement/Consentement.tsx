"use client";

import { useState, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Link } from "@/i18n/navigation";

/**
 * Bandeau cookies, en deux finalités séparées : mesure d'audience et publicité.
 *
 * Consent Mode v2 :
 *  - au chargement, avant GTM, SCRIPT_CONSENTEMENT_DEFAUT (dans le <head>)
 *    pose les quatre signaux à « denied » puis réapplique un choix déjà fait ;
 *  - au clic, gtag('consent', 'update', …) + événement dataLayer
 *    « cookie_consent_update » (déclencheur possible dans GTM).
 * GTM (GTM-5NCHQMXR) est chargé sur toutes les pages : ses balises lisent ces
 * signaux. GA4 en direct (G-YBVVEXBHWM) ne se charge qu'avec l'accord
 * « mesure ». « Refuser » est aussi visible qu'« Accepter » (CNIL). Choix
 * gardé 6 mois. Pour revoir son choix : <BoutonCookies /> (pied de page).
 */

const CLE = "bbq-expo:cookies";
const DUREE = 1000 * 60 * 60 * 24 * 182; // ≈ 6 mois
const EVENEMENT = "bbq-expo:cookies";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5NCHQMXR";
const GA_ID = "G-YBVVEXBHWM";

export type Choix = { mesure: boolean; pub: boolean };

/**
 * À placer dans le <head>, avant GTM : valeurs par défaut « denied », puis le
 * choix enregistré s'il existe (ancien format { choix: "accepte" } compris).
 */
export const SCRIPT_CONSENTEMENT_DEFAUT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
try {
  var c = JSON.parse(localStorage.getItem('${CLE}') || 'null');
  if (c && Date.now() - c.date < ${DUREE}) {
    var m = c.mesure === true || c.choix === 'accepte', p = c.pub === true || c.choix === 'accepte';
    gtag('consent', 'update', { analytics_storage: m ? 'granted' : 'denied', ad_storage: p ? 'granted' : 'denied', ad_user_data: p ? 'granted' : 'denied', ad_personalization: p ? 'granted' : 'denied' });
  }
} catch (e) {}
`;

function lireChoix(): Choix | null {
  try {
    const brut = window.localStorage.getItem(CLE);
    if (!brut) return null;
    const c = JSON.parse(brut) as { mesure?: boolean; pub?: boolean; choix?: string; date: number };
    if (Date.now() - c.date > DUREE) return null;
    if (c.choix) return { mesure: c.choix === "accepte", pub: c.choix === "accepte" };
    return { mesure: c.mesure === true, pub: c.pub === true };
  } catch {
    return null;
  }
}

// Choix fait pendant la visite (si le stockage est bloqué) ; « rouvert » quand
// le visiteur redemande le bandeau depuis le pied de page.
let choixVisite: Choix | null = null;
let rouvert = false;

function envoyerConsentement(c: Choix) {
  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  w.gtag = w.gtag || function gtag() { w.dataLayer!.push(arguments); };
  const pub = c.pub ? "granted" : "denied";
  w.gtag("consent", "update", {
    ad_storage: pub,
    ad_user_data: pub,
    ad_personalization: pub,
    analytics_storage: c.mesure ? "granted" : "denied",
  });
  w.dataLayer.push({ event: "cookie_consent_update", consent_analytics: c.mesure, consent_ads: c.pub });
}

function enregistrer(c: Choix) {
  try {
    window.localStorage.setItem(CLE, JSON.stringify({ ...c, date: Date.now() }));
  } catch {
    /* stockage indisponible : le choix vaut pour cette visite */
  }
  choixVisite = c;
  rouvert = false;
  envoyerConsentement(c);
  window.dispatchEvent(new Event(EVENEMENT));
}

function abonner(cb: () => void) {
  window.addEventListener(EVENEMENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENEMENT, cb);
    window.removeEventListener("storage", cb);
  };
}
// « m » mesure, « p » publicité, « - » pas de choix ; « |1 » bandeau rouvert.
function instantane() {
  const c = lireChoix() ?? choixVisite;
  return `${c ? `${c.mesure ? "m" : ""}${c.pub ? "p" : ""}.` : "-"}|${rouvert ? 1 : 0}`;
}

/** Vrai si le visiteur a accepté la mesure d'audience. */
export function useCookiesAcceptes() {
  return useSyncExternalStore(abonner, instantane, () => "?|0").includes("m");
}

/** Ouvre de nouveau le bandeau (lien « Gérer les cookies » du pied de page). */
export function rouvrirCookies() {
  rouvert = true;
  window.dispatchEvent(new Event(EVENEMENT));
}

type Textes = {
  texte: string;
  plus: string;
  accepter: string;
  refuser: string;
  personnaliser: string;
  enregistrer: string;
  mesure: string;
  mesureDetail: string;
  pub: string;
  pubDetail: string;
};

const TEXTES: Record<string, Textes> = {
  fr: {
    texte: "Avec votre accord, nous utilisons des cookies de mesure d'audience (Google Analytics) et des cookies publicitaires (Google Ads) pour mesurer et améliorer nos campagnes.",
    plus: "En savoir plus", accepter: "Accepter", refuser: "Refuser", personnaliser: "Personnaliser", enregistrer: "Enregistrer mes choix",
    mesure: "Mesure d'audience", mesureDetail: "Google Analytics : pages vues, sources de visite.",
    pub: "Publicité", pubDetail: "Google Ads : mesure des campagnes et annonces adaptées à vos centres d'intérêt.",
  },
  en: {
    texte: "With your consent, we use audience measurement cookies (Google Analytics) and advertising cookies (Google Ads) to measure and improve our campaigns.",
    plus: "Learn more", accepter: "Accept", refuser: "Decline", personnaliser: "Customise", enregistrer: "Save my choices",
    mesure: "Audience measurement", mesureDetail: "Google Analytics: page views, traffic sources.",
    pub: "Advertising", pubDetail: "Google Ads: campaign measurement and ads tailored to your interests.",
  },
  es: {
    texte: "Con su consentimiento, usamos cookies de medición de audiencia (Google Analytics) y cookies publicitarias (Google Ads) para medir y mejorar nuestras campañas.",
    plus: "Más información", accepter: "Aceptar", refuser: "Rechazar", personnaliser: "Personalizar", enregistrer: "Guardar mis opciones",
    mesure: "Medición de audiencia", mesureDetail: "Google Analytics: páginas vistas, fuentes de visita.",
    pub: "Publicidad", pubDetail: "Google Ads: medición de campañas y anuncios adaptados a sus intereses.",
  },
  de: {
    texte: "Mit Ihrer Zustimmung verwenden wir Cookies zur Reichweitenmessung (Google Analytics) und Werbe-Cookies (Google Ads), um unsere Kampagnen zu messen und zu verbessern.",
    plus: "Mehr erfahren", accepter: "Akzeptieren", refuser: "Ablehnen", personnaliser: "Anpassen", enregistrer: "Auswahl speichern",
    mesure: "Reichweitenmessung", mesureDetail: "Google Analytics: Seitenaufrufe, Besuchsquellen.",
    pub: "Werbung", pubDetail: "Google Ads: Kampagnenmessung und auf Ihre Interessen zugeschnittene Anzeigen.",
  },
  nl: {
    texte: "Met uw toestemming gebruiken we cookies voor bezoekersmeting (Google Analytics) en advertentiecookies (Google Ads) om onze campagnes te meten en te verbeteren.",
    plus: "Meer informatie", accepter: "Accepteren", refuser: "Weigeren", personnaliser: "Aanpassen", enregistrer: "Mijn keuzes opslaan",
    mesure: "Bezoekersmeting", mesureDetail: "Google Analytics: paginaweergaven, bezoekbronnen.",
    pub: "Advertenties", pubDetail: "Google Ads: campagnemeting en advertenties op basis van uw interesses.",
  },
  pt: {
    texte: "Com o seu consentimento, usamos cookies de medição de audiência (Google Analytics) e cookies publicitários (Google Ads) para medir e melhorar as nossas campanhas.",
    plus: "Saber mais", accepter: "Aceitar", refuser: "Recusar", personnaliser: "Personalizar", enregistrer: "Guardar as minhas escolhas",
    mesure: "Medição de audiência", mesureDetail: "Google Analytics: páginas vistas, fontes de visita.",
    pub: "Publicidade", pubDetail: "Google Ads: medição de campanhas e anúncios adaptados aos seus interesses.",
  },
  it: {
    texte: "Con il tuo consenso usiamo cookie di misurazione dell'audience (Google Analytics) e cookie pubblicitari (Google Ads) per misurare e migliorare le nostre campagne.",
    plus: "Scopri di più", accepter: "Accetta", refuser: "Rifiuta", personnaliser: "Personalizza", enregistrer: "Salva le mie scelte",
    mesure: "Misurazione dell'audience", mesureDetail: "Google Analytics: pagine viste, fonti di visita.",
    pub: "Pubblicità", pubDetail: "Google Ads: misurazione delle campagne e annunci in base ai tuoi interessi.",
  },
};

const BOUTON =
  "px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 border-gold-500 transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950";
const PLEIN = `${BOUTON} bg-gold-500 text-ink-950 hover:bg-gold-300 hover:border-gold-300`;
const CONTOUR = `${BOUTON} text-gold-500 hover:bg-gold-500 hover:text-ink-950`;

export default function Consentement() {
  const locale = useLocale();
  const t = TEXTES[locale] || TEXTES.en;
  // Côté serveur et à l'hydratation : choix inconnu, rien affiché.
  const etat = useSyncExternalStore(abonner, instantane, () => "?|0");
  const [code, rouvre] = etat.split("|");
  const connu = code !== "?";
  const aChoisi = connu && code !== "-";
  const mesure = code.includes("m");
  const visible = connu && (!aChoisi || rouvre === "1");

  const [details, setDetails] = useState(false);
  const [brouillon, setBrouillon] = useState<Choix>({ mesure: false, pub: false });

  const ouvrirDetails = () => {
    setBrouillon({ mesure, pub: code.includes("p") });
    setDetails(true);
  };
  const valider = (c: Choix) => {
    setDetails(false);
    enregistrer(c);
  };

  return (
    <>
      {mesure && <GoogleAnalytics gaId={GA_ID} />}
      {visible && (
        <div
          role="region"
          aria-label="Cookies"
          data-cookie-banner=""
          className="fixed inset-x-0 bottom-0 z-[60] bg-ink-950/95 backdrop-blur-sm border-t border-white/15 text-cream-50"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              <p className="text-xs md:text-sm leading-snug text-cream-50/85 flex-1">
                {t.texte}{" "}
                <Link href="/confidentialite#cookies" className="underline underline-offset-2 hover:text-gold-500">
                  {t.plus}
                </Link>
              </p>
              <div className="flex flex-wrap gap-2 shrink-0">
                <button type="button" onClick={() => valider({ mesure: false, pub: false })} className={`flex-1 md:flex-none ${CONTOUR}`}>
                  {t.refuser}
                </button>
                <button
                  type="button"
                  onClick={() => (details ? setDetails(false) : ouvrirDetails())}
                  aria-expanded={details}
                  aria-controls="cookies-details"
                  className="flex-1 md:flex-none px-3 py-2 text-xs font-bold uppercase tracking-widest text-cream-50/80 underline underline-offset-4 hover:text-gold-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm"
                >
                  {t.personnaliser}
                </button>
                <button type="button" onClick={() => valider({ mesure: true, pub: true })} className={`flex-1 md:flex-none ${PLEIN}`}>
                  {t.accepter}
                </button>
              </div>
            </div>

            {details && (
              <div id="cookies-details" className="mt-3 pt-3 border-t border-white/10 flex flex-col md:flex-row md:items-end gap-3 md:gap-6">
                <div className="flex-1 grid gap-2 sm:grid-cols-2">
                  {(["mesure", "pub"] as const).map((cle) => (
                    <label key={cle} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={brouillon[cle]}
                        onChange={(e) => setBrouillon((b) => ({ ...b, [cle]: e.target.checked }))}
                        className="mt-0.5 h-4 w-4 accent-[#F4AD3C]"
                      />
                      <span className="text-xs md:text-sm leading-snug">
                        <span className="font-semibold">{cle === "mesure" ? t.mesure : t.pub}</span>
                        <span className="block text-cream-50/65">{cle === "mesure" ? t.mesureDetail : t.pubDetail}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <button type="button" onClick={() => valider(brouillon)} className={`shrink-0 ${CONTOUR}`}>
                  {t.enregistrer}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
