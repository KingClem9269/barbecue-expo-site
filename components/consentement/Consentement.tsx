"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Link } from "@/i18n/navigation";

/**
 * Bandeau cookies et chargement des outils de mesure.
 *
 * Rien n'est déposé avant le choix : GTM (GTM-5NCHQMXR) et GA4
 * (G-YBVVEXBHWM) ne se chargent qu'après « Accepter ». « Refuser » est
 * aussi visible et aussi simple qu'« Accepter » (recommandations CNIL). Le
 * choix est gardé 6 mois dans le navigateur, puis redemandé. Le consentement
 * Google (Consent Mode v2) est envoyé aux balises, utile pour Google Ads.
 * Pour revoir son choix : <BoutonCookies /> (pied de page).
 */

const CLE = "bbq-expo:cookies";
const DUREE = 1000 * 60 * 60 * 24 * 182; // ≈ 6 mois
const EVENEMENT = "bbq-expo:cookies";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5NCHQMXR";
const GA_ID = "G-YBVVEXBHWM";

type Choix = "accepte" | "refuse" | null;

function lireChoix(): Choix {
  try {
    const brut = window.localStorage.getItem(CLE);
    if (!brut) return null;
    const { choix, date } = JSON.parse(brut) as { choix: Choix; date: number };
    if (Date.now() - date > DUREE) return null;
    return choix === "accepte" || choix === "refuse" ? choix : null;
  } catch {
    return null;
  }
}

function enregistrer(choix: Exclude<Choix, null>) {
  try {
    window.localStorage.setItem(CLE, JSON.stringify({ choix, date: Date.now() }));
  } catch {
    /* stockage indisponible : le choix vaut pour cette visite */
  }
  choixVisite = choix;
  window.dispatchEvent(new Event(EVENEMENT));
}

// Choix fait pendant la visite (si le stockage est bloqué) ; « rouvert » quand
// le visiteur redemande le bandeau depuis le pied de page.
let choixVisite: Choix = null;
let rouvert = false;

function abonner(cb: () => void) {
  window.addEventListener(EVENEMENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENEMENT, cb);
    window.removeEventListener("storage", cb);
  };
}
const instantane = () => `${lireChoix() ?? choixVisite ?? ""}|${rouvert ? 1 : 0}`;

/** Vrai si le visiteur a accepté les cookies (vidéos YouTube, mesure). */
export function useCookiesAcceptes() {
  const etat = useSyncExternalStore(abonner, instantane, () => "?|0");
  return etat.startsWith("accepte|");
}

/** Ouvre de nouveau le bandeau (lien « Cookies » du pied de page). */
export function rouvrirCookies() {
  rouvert = true;
  window.dispatchEvent(new Event(EVENEMENT));
}

const EN_SAVOIR_PLUS: Record<string, string> = {
  fr: "En savoir plus", en: "Learn more", es: "Más información", de: "Mehr erfahren", nl: "Meer informatie", pt: "Saber mais", it: "Scopri di più",
};

const TEXTES: Record<string, { texte: string; accepter: string; refuser: string }> = {
  fr: { texte: "Avec votre accord, nous utilisons des cookies de mesure d'audience (Google Analytics) et la vidéo YouTube de l'accueil en dépose aussi.", accepter: "Accepter", refuser: "Refuser" },
  en: { texte: "With your consent, we use audience measurement cookies (Google Analytics); the YouTube video on the home page also sets cookies.", accepter: "Accept", refuser: "Decline" },
  es: { texte: "Con su consentimiento, usamos cookies de medición de audiencia (Google Analytics); el vídeo de YouTube de la portada también deposita cookies.", accepter: "Aceptar", refuser: "Rechazar" },
  de: { texte: "Mit Ihrer Zustimmung verwenden wir Cookies zur Reichweitenmessung (Google Analytics); auch das YouTube-Video der Startseite setzt Cookies.", accepter: "Akzeptieren", refuser: "Ablehnen" },
  nl: { texte: "Met uw toestemming gebruiken we cookies voor bezoekersmeting (Google Analytics); ook de YouTube-video op de homepage plaatst cookies.", accepter: "Accepteren", refuser: "Weigeren" },
  pt: { texte: "Com o seu consentimento, usamos cookies de medição de audiência (Google Analytics); o vídeo do YouTube da página inicial também coloca cookies.", accepter: "Aceitar", refuser: "Recusar" },
  it: { texte: "Con il tuo consenso usiamo cookie di misurazione dell'audience (Google Analytics); anche il video YouTube della home deposita cookie.", accepter: "Accetta", refuser: "Rifiuta" },
};

export default function Consentement() {
  const locale = useLocale();
  const t = TEXTES[locale] || TEXTES.en;
  // Côté serveur et à l'hydratation : pas encore de choix connu, rien affiché.
  const etat = useSyncExternalStore(abonner, instantane, () => "?|0");
  const [choixBrut, rouvre] = etat.split("|");
  const connu = choixBrut !== "?";
  const choix = (choixBrut || null) as Choix;
  const visible = connu && (choix === null || rouvre === "1");

  // Consentement Google : refusé par défaut, accordé après « Accepter ».
  useEffect(() => {
    if (!connu) return;
    const w = window as Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    w.gtag = w.gtag || function gtag() { w.dataLayer!.push(arguments); };
    const accord = choix === "accepte" ? "granted" : "denied";
    w.gtag("consent", choix === null ? "default" : "update", {
      analytics_storage: accord,
      ad_storage: accord,
      ad_user_data: accord,
      ad_personalization: accord,
    });
  }, [connu, choix]);

  const choisir = (c: Exclude<Choix, null>) => {
    rouvert = false;
    enregistrer(c);
  };

  return (
    <>
      {choix === "accepte" && (
        <>
          {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
          <GoogleAnalytics gaId={GA_ID} />
        </>
      )}
      {visible && (
        <div
          role="region"
          aria-label="Cookies"
          className="fixed inset-x-0 bottom-0 z-[60] bg-ink-950/95 backdrop-blur-sm border-t border-white/15 text-cream-50"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="text-xs md:text-sm leading-snug text-cream-50/85 flex-1">
              {t.texte}{" "}
              <Link href="/confidentialite#cookies" className="underline underline-offset-2 hover:text-gold-500">
                {EN_SAVOIR_PLUS[locale] || EN_SAVOIR_PLUS.en}
              </Link>
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => choisir("refuse")}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-ink-950 transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                {t.refuser}
              </button>
              <button
                type="button"
                onClick={() => choisir("accepte")}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 border-gold-500 bg-gold-500 text-ink-950 hover:bg-gold-300 hover:border-gold-300 transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                {t.accepter}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
