"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Link } from "@/i18n/navigation";
import {
  CLE_COOKIES as CLE,
  DUREE_COOKIES as DUREE,
  EVENEMENT_COOKIES as EVENEMENT,
  choixEnregistre,
  retenirChoixVisite,
  type Choix,
} from "@/lib/consentement";

/**
 * Bandeau cookies, en deux finalités séparées : mesure d'audience et publicité.
 *
 * Consent Mode v2 :
 *  - au chargement, SCRIPT_CONSENTEMENT_DEFAUT (dans le <head>) pose les quatre
 *    signaux à « denied », réapplique un choix déjà fait et charge GTM ;
 *  - au clic, gtag('consent', 'update', …) + événement dataLayer
 *    « cookie_consent_update » (déclencheur possible dans GTM).
 * GTM (GTM-5NCHQMXR) est chargé sur toutes les pages : ses balises lisent ces
 * signaux. GA4 (G-YBVVEXBHWM) reste chargé en direct avec l'accord « mesure »,
 * à la demande de Pierre (19/11), jusqu'au jour où GTM le reprend : retirer
 * alors <GoogleAnalytics> le jour de la publication. Le cookie _ga qu'il pose
 * donne le client_id transmis au module de billetterie (achat GA4 serveur). Premier écran : « Accepter » (jaune) et « Personnaliser », avec le lien « Continuer sans accepter » en haut à droite : refuser reste aussi simple qu'accepter (CNIL, forme qu'elle admet). Panneau « Personnaliser » : cookies essentiels (toujours actifs), choix décochés par défaut, « Accepter » et « Valider mes choix » (sans rien cocher : tout refusé).
 * Choix gardé 6 mois (lib/consentement.ts). Pour revoir son choix :
 * <BoutonCookies /> (pied de page).
 * Balises dans GTM : GA4 (mesure), Google Ads, Meta et LinkedIn (publicité).
 * Le module de billetterie intégré reçoit aussi le choix, à chaque changement
 * (components/billetterie/pass/ModuleBunnyHunter.tsx).
 *
 * Le bandeau ne dépend d'aucun autre élément : sur /presentation-exposants, il
 * passe au-dessus du mur d'e-mail, qui lui laisse sa place (--cookie-banner-h).
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5NCHQMXR";
const GA_ID = "G-YBVVEXBHWM";

export type { Choix };

/**
 * À placer dans le <head> : valeurs par défaut « denied », puis le choix
 * enregistré s'il existe (ancien format { choix: "accepte" } compris), puis GTM.
 * Sans accord, ses balises ne font rien : GTM attend alors la fin du chargement
 * plus 1,5 s (124 Ko qui retardaient l'affichage sur mobile). Avec accord : tout
 * de suite.
 */
export const SCRIPT_CONSENTEMENT_DEFAUT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
var accord = false;
try {
  var c = JSON.parse(localStorage.getItem('${CLE}') || 'null');
  if (c && Date.now() - c.date < ${DUREE}) {
    var m = c.mesure === true || c.choix === 'accepte', p = c.pub === true || c.choix === 'accepte';
    gtag('consent', 'update', { analytics_storage: m ? 'granted' : 'denied', ad_storage: p ? 'granted' : 'denied', ad_user_data: p ? 'granted' : 'denied', ad_personalization: p ? 'granted' : 'denied' });
    accord = m || p;
  }
} catch (e) {}
function chargerGTM() {
  dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';
  document.head.appendChild(s);
}
if (accord) chargerGTM();
else if (document.readyState === 'complete') setTimeout(chargerGTM, 1500);
else addEventListener('load', function () { setTimeout(chargerGTM, 1500); }, { once: true });
`;

// « rouvert » quand le visiteur redemande le bandeau depuis le pied de page.
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
  retenirChoixVisite(c);
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
  const c = choixEnregistre();
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
  continuer: string;
  personnaliser: string;
  enregistrer: string;
  essentiels: string;
  essentielsDetail: string;
  toujours: string;
  mesure: string;
  mesureDetail: string;
  pub: string;
  pubDetail: string;
};

const TEXTES: Record<string, Textes> = {
  fr: {
    texte: "Avec votre accord, nous utilisons des cookies pour mesurer la fréquentation du site (Google Analytics) et l'efficacité de nos publicités (Google Ads, Meta, LinkedIn). Vous pouvez changer d'avis à tout moment.",
    plus: "En savoir plus", accepter: "Accepter", continuer: "Continuer sans accepter", personnaliser: "Personnaliser", enregistrer: "Valider mes choix",
    essentiels: "Cookies essentiels", essentielsDetail: "Choix des cookies, sécurité et fonctionnement du site et de la billetterie.", toujours: "Toujours actifs",
    mesure: "Mesure d'audience", mesureDetail: "Google Analytics : pages vues, sources de visite, étapes de l'achat de billets.",
    pub: "Publicité", pubDetail: "Google Ads, Meta, LinkedIn : savoir quelles annonces vous ont fait connaître le salon, mesurer les achats de billets qui en viennent (e-mail haché, jamais en clair) et vous montrer des annonces adaptées.",
  },
  en: {
    texte: "With your consent, we use cookies to measure site traffic (Google Analytics) and how well our ads work (Google Ads, Meta, LinkedIn). You can change your mind at any time.",
    plus: "Learn more", accepter: "Accept", continuer: "Continue without accepting", personnaliser: "Customise", enregistrer: "Confirm my choices",
    essentiels: "Essential cookies", essentielsDetail: "Cookie choice, security and running of the site and ticket shop.", toujours: "Always on",
    mesure: "Audience measurement", mesureDetail: "Google Analytics: page views, traffic sources, ticket purchase steps.",
    pub: "Advertising", pubDetail: "Google Ads, Meta, LinkedIn: see which ads helped you discover the show, measure the ticket purchases they lead to (hashed email, never in plain text) and show you relevant ads.",
  },
  es: {
    texte: "Con su consentimiento, usamos cookies para medir las visitas al sitio (Google Analytics) y la eficacia de nuestros anuncios (Google Ads, Meta, LinkedIn). Puede cambiar de opinión en cualquier momento.",
    plus: "Más información", accepter: "Aceptar", continuer: "Continuar sin aceptar", personnaliser: "Personalizar", enregistrer: "Validar mis opciones",
    essentiels: "Cookies esenciales", essentielsDetail: "Elección de cookies, seguridad y funcionamiento del sitio y de la taquilla.", toujours: "Siempre activas",
    mesure: "Medición de audiencia", mesureDetail: "Google Analytics: páginas vistas, fuentes de visita, pasos de la compra de entradas.",
    pub: "Publicidad", pubDetail: "Google Ads, Meta, LinkedIn: saber qué anuncios le han permitido descubrir el salón, medir las compras de entradas que generan (correo electrónico con hash, nunca en claro) y mostrarle anuncios adaptados.",
  },
  de: {
    texte: "Mit Ihrer Zustimmung verwenden wir Cookies, um die Besucherzahlen der Website (Google Analytics) und die Wirkung unserer Anzeigen (Google Ads, Meta, LinkedIn) zu messen. Sie können Ihre Meinung jederzeit ändern.",
    plus: "Mehr erfahren", accepter: "Akzeptieren", continuer: "Weiter ohne Zustimmung", personnaliser: "Anpassen", enregistrer: "Auswahl bestätigen",
    essentiels: "Notwendige Cookies", essentielsDetail: "Cookie-Auswahl, Sicherheit und Betrieb der Website und des Ticketshops.", toujours: "Immer aktiv",
    mesure: "Reichweitenmessung", mesureDetail: "Google Analytics: Seitenaufrufe, Besuchsquellen, Schritte des Ticketkaufs.",
    pub: "Werbung", pubDetail: "Google Ads, Meta, LinkedIn: sehen, durch welche Anzeigen Sie die Messe entdeckt haben, die daraus folgenden Ticketkäufe messen (gehashte E-Mail-Adresse, nie im Klartext) und Ihnen passende Anzeigen zeigen.",
  },
  nl: {
    texte: "Met uw toestemming gebruiken we cookies om het websitebezoek (Google Analytics) en het effect van onze advertenties (Google Ads, Meta, LinkedIn) te meten. U kunt op elk moment van gedachten veranderen.",
    plus: "Meer informatie", accepter: "Accepteren", continuer: "Doorgaan zonder te accepteren", personnaliser: "Aanpassen", enregistrer: "Mijn keuzes bevestigen",
    essentiels: "Essentiële cookies", essentielsDetail: "Cookiekeuze, beveiliging en werking van de site en de ticketverkoop.", toujours: "Altijd actief",
    mesure: "Bezoekersmeting", mesureDetail: "Google Analytics: paginaweergaven, bezoekbronnen, stappen van de ticketaankoop.",
    pub: "Advertenties", pubDetail: "Google Ads, Meta, LinkedIn: zien via welke advertenties u de beurs hebt ontdekt, de ticketaankopen meten die eruit voortkomen (gehasht e-mailadres, nooit leesbaar) en u relevante advertenties tonen.",
  },
  pt: {
    texte: "Com o seu consentimento, usamos cookies para medir as visitas ao site (Google Analytics) e a eficácia dos nossos anúncios (Google Ads, Meta, LinkedIn). Pode mudar de ideias a qualquer momento.",
    plus: "Saber mais", accepter: "Aceitar", continuer: "Continuar sem aceitar", personnaliser: "Personalizar", enregistrer: "Validar as minhas escolhas",
    essentiels: "Cookies essenciais", essentielsDetail: "Escolha de cookies, segurança e funcionamento do site e da bilheteira.", toujours: "Sempre ativos",
    mesure: "Medição de audiência", mesureDetail: "Google Analytics: páginas vistas, fontes de visita, etapas da compra de bilhetes.",
    pub: "Publicidade", pubDetail: "Google Ads, Meta, LinkedIn: saber que anúncios lhe deram a conhecer o salão, medir as compras de bilhetes que deles resultam (e-mail com hash, nunca legível) e mostrar-lhe anúncios adequados.",
  },
  it: {
    texte: "Con il tuo consenso usiamo cookie per misurare le visite al sito (Google Analytics) e l'efficacia dei nostri annunci (Google Ads, Meta, LinkedIn). Puoi cambiare idea in qualsiasi momento.",
    plus: "Scopri di più", accepter: "Accetta", continuer: "Continua senza accettare", personnaliser: "Personalizza", enregistrer: "Conferma le mie scelte",
    essentiels: "Cookie essenziali", essentielsDetail: "Scelta dei cookie, sicurezza e funzionamento del sito e della biglietteria.", toujours: "Sempre attivi",
    mesure: "Misurazione dell'audience", mesureDetail: "Google Analytics: pagine viste, fonti di visita, fasi dell'acquisto dei biglietti.",
    pub: "Pubblicità", pubDetail: "Google Ads, Meta, LinkedIn: capire quali annunci ti hanno fatto scoprire il salone, misurare gli acquisti di biglietti che ne derivano (email con hash, mai in chiaro) e mostrarti annunci pertinenti.",
  },
};

const BOUTON =
  "px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 border-gold-500 transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950";
const PLEIN = `${BOUTON} bg-gold-500 text-ink-950 hover:bg-gold-300 hover:border-gold-300`;
/** Gros bouton jaune « Accepter ». */
const ACCEPTER = `${PLEIN} md:px-8 py-3 text-sm`;
/** Bouton gris (« Personnaliser », « Valider mes choix »). */
const GRIS =
  "px-4 py-3 text-xs font-bold uppercase tracking-widest border-2 border-white/25 bg-white/10 text-cream-50 hover:bg-white/20 transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950";

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
  // Hauteur du bandeau, pour que le mur d'e-mail ne passe pas dessous.
  const bandeauRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bandeauRef.current;
    if (!visible || !el) return;
    const html = document.documentElement;
    const obs = new ResizeObserver(() => html.style.setProperty("--cookie-banner-h", `${el.offsetHeight}px`));
    obs.observe(el);
    return () => {
      obs.disconnect();
      html.style.removeProperty("--cookie-banner-h");
    };
  }, [visible]);

  const valider = (c: Choix) => {
    setDetails(false);
    enregistrer(c);
  };

  return (
    <>
      {mesure && <GoogleAnalytics gaId={GA_ID} />}
      {visible && (
        <div
          ref={bandeauRef}
          role="region"
          aria-label="Cookies"
          data-cookie-banner=""
          className="fixed inset-x-0 bottom-0 z-[60] [html[data-porte-email]_&]:z-[310] bg-ink-950/95 backdrop-blur-sm border-t border-white/15 text-cream-50"
        >
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-3">
            {/* Refuser aussi simple qu'accepter (CNIL) : lien lisible, en haut à droite. */}
            <button
              type="button"
              onClick={() => valider({ mesure: false, pub: false })}
              className="absolute top-2 right-4 md:right-6 text-xs text-cream-50/75 underline underline-offset-2 hover:text-gold-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm"
            >
              {t.continuer}
            </button>
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              <p className="text-xs md:text-sm leading-snug text-cream-50/85 flex-1">
                {t.texte}{" "}
                <Link href="/confidentialite#cookies" className="underline underline-offset-2 hover:text-gold-500">
                  {t.plus}
                </Link>
              </p>
              {!details && (
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={ouvrirDetails}
                    aria-expanded={false}
                    aria-controls="cookies-details"
                    className={`flex-1 md:flex-none ${GRIS}`}
                  >
                    {t.personnaliser}
                  </button>
                  <button type="button" onClick={() => valider({ mesure: true, pub: true })} className={`flex-1 md:flex-none ${ACCEPTER}`}>
                    {t.accepter}
                  </button>
                </div>
              )}
            </div>

            {details && (
              <div id="cookies-details" className="mt-3 pt-3 border-t border-white/10">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" checked disabled aria-readonly className="mt-0.5 h-4 w-4 accent-[#F4AD3C] opacity-60" />
                    <span className="text-xs md:text-sm leading-snug">
                      <span className="font-semibold">{t.essentiels}</span>{" "}
                      <span className="text-cream-50/50">· {t.toujours}</span>
                      <span className="block text-cream-50/65">{t.essentielsDetail}</span>
                    </span>
                  </div>
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
                <div className="mt-3 flex gap-2 md:justify-end">
                  <button type="button" onClick={() => valider({ mesure: true, pub: true })} className={`flex-1 md:flex-none ${ACCEPTER}`}>
                    {t.accepter}
                  </button>
                  <button type="button" onClick={() => valider(brouillon)} className={`flex-1 md:flex-none ${GRIS}`}>
                    {t.enregistrer}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
