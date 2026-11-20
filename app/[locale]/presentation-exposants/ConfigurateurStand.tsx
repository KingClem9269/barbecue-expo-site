"use client";

/**
 * « Composez votre stand » : la première partie de la page des campagnes
 * (/presentation-exposants), d'après la maquette de Pierre.
 *
 *   1. Le visiteur laisse son e-mail. Le configurateur se déplie aussitôt sur
 *      place, sans changer de page, pendant que l'e-mail part au CRM en
 *      arrière-plan (POST /api/exposants-email). Le
 *      déblocage est mémorisé (localStorage) : on ne redemande plus l'e-mail
 *      sur ce navigateur.
 *   2. Il choisit sa zone, sa surface et son aménagement : le prix s'affiche
 *      tout de suite. Le calcul est celui du catalogue (buildLines), frais de
 *      dossier compris : le total affiché est celui du devis reçu.
 *   3. Il demande son devis par un formulaire court (POST /api/quote, le même
 *      envoi que le catalogue : Fred crée la transaction, ou ajoute le devis à
 *      la transaction 2027 existante). Les options (angles, électricité…) sont
 *      vues ensuite avec un commercial.
 *
 * Événements poussés dans le dataLayer (lus par GTM) : email_gate_shown,
 * email_gate_submitted, simulateur_utilise (Estimator.tsx), zone_selected,
 * gamme_selected, devis_form_opened, devis_submitted. Liste et paramètres :
 * dossiers/refonte-page-exposants/evenements-pierre.md. Le devis créé part
 * aussi à GA4 en direct (generate_lead), comme sur l'ancienne page.
 */

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { sendGAEvent } from "@next/third-parties/google";
import { ArrowRight, Check, ExternalLink, Loader2, MailCheck, Minus, Plus } from "lucide-react";
import { useAudience } from "@/components/nav/AudienceContext";
import { Link } from "@/i18n/navigation";
import { pousser, identifiantUnique, premiereFoisDansLaVisite } from "@/lib/mesure";
import { lireProvenance } from "@/lib/provenance";
import { buildLines, fmtEUR, useEstimator, type Zone } from "./Estimator";
import { CountryPicker } from "./QuoteModal";
import PlanZones from "./PlanZones";
import { countryByIso } from "./countries";
import { useT } from "./i18n";
import { ESTIMATOR_CFG } from "./tarifs";
import { useMesuree } from "./variante";

/** Même clé que l'ancien mur d'e-mail : qui l'a déjà franchi n'est pas redemandé. */
const CLE_EMAIL = "bbq-expo:presentation-exposants:email";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AFFICHE = { fontFamily: "SansPlomb-98, 'Arial Narrow', sans-serif" } as const;
/** Repère posé par PageCampagnes à la fin de l'article : la barre du bas s'y efface. */
export const FIN_DE_PAGE = "fin-page-exposants";
/** Surface proposée quand le visiteur ajoute de l'extérieur. */
const EXTERIEUR_DEPART = 10;

/** Photos des gammes : les visuels du catalogue (data.ts), montrés en entier comme là-bas. */
const GAMMES: { key: string | null; nom: string; detail: string; photo: string }[] = [
  { key: null, nom: "Surface nue", detail: "Vous construisez votre stand. Plan de construction à présenter.", photo: "/stands/surface-nue.png" },
  { key: "argent", nom: "Argent", detail: "Cloisons mélaminées, enseigne, badges.", photo: "/stands/gamme-argent.png" },
  { key: "or", nom: "Or", detail: "Cloisons bois et tissu, enseigne, badges.", photo: "/stands/gamme-or.png" },
  { key: "perso", nom: "Personnalisée", detail: "Cloisons imprimées, arche, comptoir, éclairage, coffret 3 kW, angle(s), badges.", photo: "/stands/gamme-perso.png" },
];

const ZONES: { id: Zone; detail: string; pastille: string }[] = [
  { id: "A", detail: "Au centre du hall.", pastille: "bg-gold-500" },
  { id: "B", detail: "En bordure du hall.", pastille: "bg-cream-100" },
];

/** Catégories de produits exposés : `cle` est envoyée à Fred (contact.exhibitedProducts). */
const PRODUITS: { cle: string; label: string }[] = [
  { cle: "barbecues", label: "Barbecues, fumoirs, planchas, fours" },
  { cle: "accessoires", label: "Accessoires, ustensiles, couteaux" },
  { cle: "mobilier-cuisines", label: "Mobilier et cuisines d'extérieur" },
  { cle: "amenagement-exterieur", label: "Aménagement extérieur" },
  { cle: "epicerie-combustibles", label: "Combustibles, sauces, épices, viande" },
  { cle: "autre", label: "Autre" },
];

const OPTIONS_INFO = [
  "Angle : 1 angle 350 € HT · 2 angles 600 € HT · îlot 1 000 € HT",
  "Réserve de stand : de 300 à 450 € HT selon surface et gamme",
  "Électricité sur stand : de 300 € HT (1 kW) à 900 € HT (15 kW)",
  "Co-exposition : 700 € HT (dès 12 m²) · 1 400 € HT (dès 24 m²)",
  "Parking, mobilier, badges, invitations : précisés dans votre devis",
];

const CARTE = "text-left rounded-lg border-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300";
const CARTE_OUI = "bg-gold-500 text-ink-950 border-gold-500";
const CARTE_NON = "bg-black text-cream-50 border-cream-50/30 hover:border-gold-500";
const CHAMP = "w-full min-h-11 px-3 rounded-md border bg-white text-ink-950 text-base placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-950";

/** Le visiteur a-t-il déjà laissé son e-mail sur ce navigateur ? (faux côté serveur) */
function useDejaDebloque() {
  return useSyncExternalStore(
    (prevenir) => {
      window.addEventListener("storage", prevenir);
      return () => window.removeEventListener("storage", prevenir);
    },
    () => {
      try { return window.localStorage.getItem(CLE_EMAIL) === "1"; } catch { return false; }
    },
    () => false,
  );
}

type Coordonnees = {
  company: string; firstName: string; lastName: string; email: string;
  phoneIso: string; phone: string; countryIso: string; produits: string[];
};
type Erreurs = Partial<Record<"company" | "firstName" | "lastName" | "email" | "phone" | "countryIso", string>>;

export default function ConfigurateurStand() {
  const { t, lang } = useT();
  const est = useEstimator();
  const mesuree = useMesuree();
  const { audience } = useAudience();

  /* ───────── 1. L'e-mail, puis le dépliage ───────── */
  const dejaDebloque = useDejaDebloque();
  const [debloqueIci, setDebloqueIci] = useState(false); // e-mail laissé pendant cette visite : dépliage animé
  const [deplie, setDeplie] = useState(false); // fin de l'animation : plus rien n'est rogné
  const ouvert = dejaDebloque || debloqueIci;
  const [email, setEmail] = useState("");
  const [emailInvalide, setEmailInvalide] = useState(false);
  const champEmail = useRef<HTMLInputElement>(null);
  const carteEmail = useRef<HTMLDivElement>(null);
  const titreEtape1 = useRef<HTMLHeadingElement>(null);

  // Mesure : la demande d'e-mail est vue (dénominateur du taux de franchissement).
  useEffect(() => {
    const el = carteEmail.current;
    if (!el || ouvert || !mesuree) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      if (premiereFoisDansLaVisite("bbq-expo:email-gate-shown")) pousser({ event: "email_gate_shown", audience });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ouvert, mesuree, audience]);

  // Après le dépliage, le clavier et les lecteurs d'écran arrivent sur l'étape 1.
  useEffect(() => {
    if (debloqueIci) titreEtape1.current?.focus({ preventScroll: true });
  }, [debloqueIci]);

  // Le configurateur s'ouvre tout de suite : l'envoi au CRM prend plusieurs
  // secondes (7,6 s mesurées en production) et le visiteur n'a pas à l'attendre.
  // L'e-mail part en arrière-plan ; s'il échoue, il repartira avec le devis.
  const envoyerEmail = (ev: React.FormEvent) => {
    ev.preventDefault();
    const adresse = email.trim().toLowerCase();
    if (!EMAIL_RE.test(adresse)) { setEmailInvalide(true); champEmail.current?.focus(); return; }
    try { window.localStorage.setItem(CLE_EMAIL, "1"); } catch { /* stockage indisponible : la page s'ouvre quand même */ }
    setEmail(adresse);
    setDebloqueIci(true);
    fetch("/api/exposants-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: adresse, lang, page: window.location.pathname }),
      keepalive: true, // l'envoi va au bout même si le visiteur quitte la page
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        // Mesure : e-mail enregistré par le CRM. Les adresses de l'équipe ne comptent pas.
        if (res.ok && data?.ok === true && data?.team !== true && mesuree) {
          pousser({ event: "email_gate_submitted", event_id: identifiantUnique(), audience });
        }
      })
      .catch(() => { /* CRM injoignable : rien à faire, le visiteur est déjà passé */ });
  };

  /* ───────── 2. Le stand ───────── */
  const prixZone = ESTIMATOR_CFG.zonePrice;
  const prixExterieur = ESTIMATOR_CFG.outdoorPerSqm;
  const exterieur = est.outdoorSqm > 0;
  const surface = Math.max(1, est.sqm);
  const lignes = useMemo(() => buildLines(est, ESTIMATOR_CFG, t, lang), [est, t, lang]);
  const total = lignes.reduce((somme, l) => somme + (l.amount ?? 0), 0);
  const gamme = GAMMES.find((g) => g.key === est.rangeKey) ?? GAMMES[0];
  const mesure = () => ({ value: Math.round(total * 100) / 100, currency: "EUR", surface_m2: surface, zone: est.zone, gamme: est.rangeKey ?? "surface_nue" });

  const choisirZone = (z: Zone) => {
    if (mesuree && premiereFoisDansLaVisite("bbq-expo:zone-selected")) pousser({ event: "zone_selected", zone: z });
    est.setZone(z);
  };
  const choisirGamme = (cle: string | null) => {
    if (mesuree && premiereFoisDansLaVisite("bbq-expo:gamme-selected")) pousser({ event: "gamme_selected", gamme: cle ?? "surface_nue" });
    est.setRangeKey(cle);
  };
  const basculerExterieur = () => est.setOutdoorSqm(exterieur ? 0 : EXTERIEUR_DEPART);

  /** Lignes du récapitulatif, dites simplement ; les montants sont ceux du devis. */
  const recap = lignes.map((l) => {
    if (l.id === "surface") return { id: l.id, label: `${t("Zone")} ${est.zone} · ${surface} m²`, montant: l.amount };
    if (l.id === "range") return { id: l.id, label: `${t("Aménagement")} ${t(gamme.nom)}`, montant: l.amount };
    if (l.id === "outdoor") return { id: l.id, label: `${t("Extérieur")} · ${est.outdoorSqm} m²`, montant: l.amount };
    return { id: l.id, label: l.label, montant: l.amount };
  });
  if (est.rangeKey === null) recap.splice(1, 0, { id: "range", label: `${t("Aménagement")} ${t("Surface nue")}`, montant: 0 });

  /* ───────── 3. Le devis ───────── */
  const [devis, setDevis] = useState<"ferme" | "formulaire" | "envoi" | "envoye">("ferme");
  const [coordonnees, setCoordonnees] = useState<Coordonnees>({
    company: "", firstName: "", lastName: "", email: "", phoneIso: "fr", phone: "", countryIso: "fr", produits: [],
  });
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [erreurEnvoi, setErreurEnvoi] = useState<string | null>(null);
  const [resultat, setResultat] = useState<{ quoteNumber?: string; signingUrl?: string }>({});
  const blocRecap = useRef<HTMLElement>(null);
  const emailDevis = coordonnees.email || email;

  const saisir = (cle: keyof Coordonnees, valeur: string) => {
    setCoordonnees((c) => ({ ...c, [cle]: valeur }));
    if (cle in erreurs) setErreurs((e) => ({ ...e, [cle]: undefined }));
  };

  // Le formulaire ouvert, le récapitulatif n'est plus collant (il dépasserait
  // de l'écran) : on amène le visiteur dessus.
  const ouvrirDevis = () => {
    if (devis === "ferme" || devis === "envoye") {
      if (mesuree && premiereFoisDansLaVisite("bbq-expo:devis-form-opened")) pousser({ event: "devis_form_opened", ...mesure() });
      setErreurEnvoi(null);
      setDevis("formulaire");
    }
    window.requestAnimationFrame(() => blocRecap.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const envoyerDevis = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (devis === "envoi") return;
    const c = { ...coordonnees, email: emailDevis };
    const e: Erreurs = {};
    if (!c.company.trim()) e.company = "Requis";
    if (!c.firstName.trim()) e.firstName = "Requis";
    if (!c.lastName.trim()) e.lastName = "Requis";
    if (!c.email.trim()) e.email = "Requis";
    else if (!EMAIL_RE.test(c.email.trim())) e.email = "Email invalide";
    if (!c.phone.trim()) e.phone = "Requis";
    if (!c.countryIso) e.countryIso = "Requis";
    setErreurs(e);
    if (Object.keys(e).length > 0) return;

    setDevis("envoi");
    setErreurEnvoi(null);
    const indicatif = countryByIso(c.phoneIso)?.dial ?? "";
    const pays = countryByIso(c.countryIso);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Même forme que le catalogue (QuoteModal) : seuls l'adresse postale, que
        // Fred n'exige pas, et les produits exposés diffèrent.
        body: JSON.stringify({
          lang,
          event: "barbecue-expo",
          contact: {
            firstName: c.firstName.trim(),
            lastName: c.lastName.trim(),
            email: c.email.trim().toLowerCase(),
            phone: `+${indicatif} ${c.phone.trim()}`.trim(),
            phoneCountry: c.phoneIso,
            company: c.company.trim(),
            country: pays?.name,
            countryIso: c.countryIso,
            exhibitedProducts: c.produits,
          },
          estimate: { total, hasQuote: false, lines: lignes.map((l) => ({ label: l.label, detail: l.detail, amount: l.amount })) },
          provenance: lireProvenance(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.message || data?.errorCode || "unexpected_error");
      setResultat({ quoteNumber: data.quoteNumber, signingUrl: data.signingUrl });
      setCoordonnees(c);
      setDevis("envoye");
      // Mesure : conversion devis, au retour réussi de Fred. event_id = numéro de
      // devis créé par Fred (unique, stable : sert à dédoublonner).
      if (mesuree) {
        pousser({
          event: "devis_submitted",
          event_id: data.quoteNumber ? String(data.quoteNumber) : identifiantUnique(),
          ...mesure(),
          pays: c.countryIso.toUpperCase(),
        });
        // Conversion GA4 : devis exposant créé dans le CRM. GA4 est encore chargé
        // en direct par le site (Consentement.tsx) ; cet envoi disparaîtra quand
        // GA4 passera par GTM (bascule de la mesure du 30 novembre 2026).
        sendGAEvent("event", "generate_lead", { value: total, currency: "EUR", has_quote: false });
      }
    } catch (err) {
      setDevis("formulaire");
      setErreurEnvoi(err instanceof Error ? err.message : "unexpected_error");
    }
  };

  /* ───────── Barre du bas (téléphone et tablette) ───────── */
  const [finAtteinte, setFinAtteinte] = useState(false);
  useEffect(() => {
    // La barre accompagne toute la page (présentation comprise) et s'efface à la
    // fin de l'article, pour ne pas masquer le pied de page du site.
    const el = document.getElementById(FIN_DE_PAGE);
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setFinAtteinte(e.isIntersecting || e.boundingClientRect.top < 0));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const versLeConfigurateur = () => {
    if (mesuree) pousser({ event: "hero_cta_click", emplacement: "barre" });
    document.getElementById("stand")?.scrollIntoView({ behavior: "smooth", block: "start" });
    champEmail.current?.focus({ preventScroll: true });
  };

  const etapesFaites = devis !== "ferme" ? 4 : ouvert ? 3 : 1;
  const prixM2 = (n: number) => `${fmtEUR(n, lang)}/m²`;

  return (
    <section id="stand" className="scroll-mt-16 bg-ink-950 text-cream-50" aria-labelledby="stand-titre">
      <style>{`@keyframes stand-deplier{from{grid-template-rows:0fr;opacity:0}to{grid-template-rows:1fr;opacity:1}}`}</style>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-6 md:mb-8">
          <h2 id="stand-titre" className="text-4xl sm:text-5xl md:text-6xl leading-[0.95] uppercase" style={AFFICHE}>{t("Composez votre stand")}</h2>
          <ol className="flex flex-wrap gap-2 text-xs font-bold" aria-label={t("Étapes")}>
            {["Zone", "Surface", "Aménagement", "Devis"].map((nom, i) => (
              <li key={nom} className={`px-3 py-1.5 rounded-full ${i < etapesFaites ? "bg-gold-500 text-ink-950" : "border border-cream-50/40 text-cream-50/80"}`}>
                {i + 1} {t(nom)}
              </li>
            ))}
          </ol>
        </div>

        {!ouvert ? (
          /* ───────── L'e-mail ───────── */
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div ref={carteEmail} className="bg-cream-100 text-ink-950 rounded-lg p-6 md:p-8" data-email-gate="">
              <h3 className="text-3xl md:text-4xl leading-[0.95] uppercase" style={AFFICHE}>{t("Voyez les tarifs et composez votre stand")}</h3>
              <p className="mt-3 text-base md:text-lg">{t("Plan des zones, prix en direct, devis envoyé par e-mail en un clic.")}</p>
              <form onSubmit={envoyerEmail} noValidate className="mt-5 flex flex-col gap-3">
                <label htmlFor="stand-email" className="text-sm font-bold">{t("Votre e-mail")}</label>
                <input
                  id="stand-email"
                  ref={champEmail}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t("vous@entreprise.com")}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailInvalide(false); }}
                  aria-invalid={emailInvalide}
                  aria-describedby={emailInvalide ? "stand-email-erreur" : undefined}
                  className={`${CHAMP} min-h-13 ${emailInvalide ? "border-braise" : "border-ink-950"}`}
                />
                {emailInvalide && <p id="stand-email-erreur" role="alert" className="text-sm text-braise font-semibold">{t("Indiquez une adresse e-mail valide.")}</p>}
                <button
                  type="submit"
                  className="min-h-13 inline-flex items-center justify-center gap-2 rounded-md bg-ink-950 text-gold-500 font-extrabold text-base md:text-lg px-5 hover:bg-black transition-colors"
                >
                  {t("Voir le plan et les tarifs")}
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
                </button>
                <p className="text-xs leading-relaxed">
                  {t("On ne vous le demandera qu'une fois. Vos coordonnées servent uniquement à vous informer sur l'exposition à Barbecue Expo. Aucune revente.")}{" "}
                  <Link href="/confidentialite" className="underline underline-offset-2">{t("Politique de confidentialité")}</Link>
                </p>
              </form>
            </div>
            {/* Aperçu de ce que l'e-mail ouvre (ordinateur) */}
            <div className="hidden lg:block max-w-md mx-auto w-full opacity-50 blur-[1.5px] pointer-events-none select-none" aria-hidden="true">
              <PlanZones zone="A" exterieur={false} />
            </div>
          </div>
        ) : (
          /* ───────── Le configurateur, déplié sur place ───────── */
          <div
            className="grid motion-reduce:!animate-none"
            style={debloqueIci ? { animation: "stand-deplier .55s ease-out both" } : undefined}
            onAnimationEnd={(e) => { if (e.animationName === "stand-deplier") setDeplie(true); }}
            data-configurateur=""
          >
            {/* Rogné seulement pendant le dépliage : ensuite le récapitulatif reste
                collant et les listes de pays peuvent dépasser. */}
            <div className={`min-h-0 ${debloqueIci && !deplie ? "overflow-clip motion-reduce:overflow-visible" : ""}`}>
              <div className="grid lg:grid-cols-[minmax(0,1fr)_22rem] gap-8 lg:gap-10 items-start">
                <div className="flex flex-col gap-9 min-w-0">
                  {/* 1 · Zone */}
                  <div>
                    <h3 ref={titreEtape1} tabIndex={-1} className="[font-family:inherit] text-gold-500 text-lg md:text-xl font-extrabold mb-4 focus:outline-none">1 · {t("Où voulez-vous être ?")}</h3>
                    <div className="grid md:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] gap-4">
                      <div className="bg-black rounded-lg p-4">
                        <PlanZones zone={est.zone} exterieur={exterieur} onZone={choisirZone} onExterieur={basculerExterieur} />
                      </div>
                      <div className="flex flex-col gap-3">
                        {ZONES.map((z) => (
                          <button key={z.id} type="button" aria-pressed={est.zone === z.id} onClick={() => choisirZone(z.id)} className={`${CARTE} p-4 ${est.zone === z.id ? CARTE_OUI : CARTE_NON}`}>
                            <span className="flex items-center gap-2.5 text-lg font-extrabold">
                              <span className={`w-4.5 h-4.5 rounded-[3px] border border-white ${z.pastille}`} aria-hidden="true" />
                              {t("Zone")} {z.id}
                            </span>
                            <span className="block mt-0.5 font-bold">{prixM2(prixZone[z.id])}</span>
                            <span className="block mt-1 text-sm">{t(z.detail)}</span>
                          </button>
                        ))}
                        <button type="button" aria-pressed={exterieur} onClick={basculerExterieur} className={`${CARTE} p-4 ${exterieur ? CARTE_OUI : CARTE_NON}`}>
                          <span className="flex items-center gap-2.5 text-lg font-extrabold">
                            <span className="w-4.5 h-4.5 rounded-[3px] border border-white bg-[repeating-linear-gradient(45deg,#f4ad3c_0_4px,#262626_4px_8px)]" aria-hidden="true" />
                            {exterieur ? t("Extérieur ajouté") : t("Ajouter de l'extérieur")}
                          </span>
                          <span className="block mt-0.5 font-bold">+ {prixM2(prixExterieur)}</span>
                          <span className="block mt-1 text-sm">{t("Stand démo en plein air, pour cuisiner en live.")}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2 · Surface */}
                  <div>
                    <h3 className="[font-family:inherit] text-gold-500 text-lg md:text-xl font-extrabold mb-4">2 · {t("Quelle surface ?")}</h3>
                    <div className={`grid gap-3 ${exterieur ? "sm:grid-cols-2" : ""}`}>
                      <ChoixSurface titre={`${t("Dans le hall")} · ${t("Zone")} ${est.zone}`} valeur={surface} onChange={est.setSqm} note={t("Traçage au sol, moquette non incluse, badges selon la surface.")} />
                      {exterieur && <ChoixSurface titre={t("En extérieur")} valeur={est.outdoorSqm} onChange={est.setOutdoorSqm} note={t("Stand démo en plein air, pour cuisiner en live.")} />}
                    </div>
                  </div>

                  {/* 3 · Aménagement */}
                  <div>
                    <h3 className="[font-family:inherit] text-gold-500 text-lg md:text-xl font-extrabold mb-4">3 · {t("Quel aménagement ?")}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {GAMMES.map((g) => {
                        const choisie = est.rangeKey === g.key;
                        const supplement = g.key ? ESTIMATOR_CFG.ranges.find((r) => r.key === g.key)?.surcharge ?? 0 : 0;
                        return (
                          <button key={g.nom} type="button" aria-pressed={choisie} onClick={() => choisirGamme(g.key)} className={`${CARTE} overflow-hidden flex flex-col ${choisie ? CARTE_OUI : CARTE_NON}`}>
                            <span className="relative block shrink-0 w-full aspect-[16/9] bg-white">
                              <Image src={g.photo} alt="" fill sizes="(max-width: 1024px) 45vw, 380px" className="object-cover" />
                              {choisie && (
                                <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-ink-950 text-gold-500 flex items-center justify-center" aria-hidden="true">
                                  <Check className="w-4 h-4" strokeWidth={3} />
                                </span>
                              )}
                            </span>
                            <span className="block p-3 sm:p-4 min-w-0">
                              <span className="block text-base sm:text-lg font-extrabold leading-tight">{t(g.nom)}</span>
                              <span className="block font-bold">{g.key ? `+${prixM2(supplement)}` : t("Inclus")}</span>
                              <span className="block mt-1.5 text-[13px] sm:text-sm leading-snug">{t(g.detail)}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <details className="mt-4 border-t border-cream-50/20 pt-2 group">
                      <summary className="min-h-11 flex items-center gap-2 font-bold cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <Plus className="w-4 h-4 text-gold-500 group-open:rotate-45 transition-transform" strokeWidth={3} aria-hidden="true" />
                        {t("Options : angles, réserve, électricité, co-exposition…")}
                      </summary>
                      <ul className="mt-1 mb-2 pl-6 list-disc text-sm leading-7 text-cream-100">
                        {OPTIONS_INFO.map((o) => <li key={o}>{t(o)}</li>)}
                      </ul>
                      <p className="pl-6 text-sm text-cream-50/80">{t("Un conseiller les ajoute avec vous à votre devis.")}</p>
                    </details>
                  </div>
                </div>

                {/* Mon stand : prix en direct, puis le devis */}
                <aside ref={blocRecap} id="recap" className={`scroll-mt-20 ${devis === "ferme" || devis === "envoye" ? "lg:sticky lg:top-20" : ""} bg-gold-500 text-ink-950 rounded-lg p-5 md:p-6 flex flex-col gap-3`} aria-label={t("Mon stand")}>
                  <p className="text-sm font-extrabold uppercase tracking-widest">{t("Mon stand")}</p>
                  <dl className="flex flex-col gap-1.5 text-[15px]">
                    {recap.map((l) => (
                      <div key={l.id} className="flex items-baseline justify-between gap-4">
                        <dt>{l.label}</dt>
                        <dd className="font-bold whitespace-nowrap">{l.montant ? fmtEUR(l.montant, lang) : t("Inclus").toLowerCase()}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="border-t-2 border-ink-950 pt-2 text-5xl leading-none" style={AFFICHE} aria-live="polite">{fmtEUR(total, lang)}</p>
                  <p className="text-xs leading-relaxed">{t("Estimation hors options et hors TVA. Le devis détaillé vous est envoyé par e-mail.")}</p>

                  {devis === "ferme" && (
                    <button type="button" onClick={ouvrirDevis} className="min-h-13 rounded-md bg-ink-950 text-gold-500 font-extrabold text-lg hover:bg-black transition-colors">
                      {t("Recevoir mon devis")}
                    </button>
                  )}

                  {(devis === "formulaire" || devis === "envoi") && (
                    /* data-quote-modal : GTM surveille l'apparition de cet attribut à
                       l'écran pour envoyer InitiateCheckout à Meta (déclencheur de
                       visibilité créé pour l'ancienne modale de devis). */
                    <form onSubmit={envoyerDevis} noValidate className="flex flex-col gap-2.5" data-quote-modal="">
                      <Champ id="devis-societe" label={t("Société")} erreur={erreurs.company && t(erreurs.company)}>
                        <input id="devis-societe" autoComplete="organization" value={coordonnees.company} onChange={(e) => saisir("company", e.target.value)} className={`${CHAMP} ${erreurs.company ? "border-[#6b1500] border-2" : "border-ink-950"}`} />
                      </Champ>
                      <div className="grid grid-cols-2 gap-2.5">
                        <Champ id="devis-prenom" label={t("Prénom")} erreur={erreurs.firstName && t(erreurs.firstName)}>
                          <input id="devis-prenom" autoComplete="given-name" value={coordonnees.firstName} onChange={(e) => saisir("firstName", e.target.value)} className={`${CHAMP} ${erreurs.firstName ? "border-[#6b1500] border-2" : "border-ink-950"}`} />
                        </Champ>
                        <Champ id="devis-nom" label={t("Nom")} erreur={erreurs.lastName && t(erreurs.lastName)}>
                          <input id="devis-nom" autoComplete="family-name" value={coordonnees.lastName} onChange={(e) => saisir("lastName", e.target.value)} className={`${CHAMP} ${erreurs.lastName ? "border-[#6b1500] border-2" : "border-ink-950"}`} />
                        </Champ>
                      </div>
                      <Champ id="devis-email" label={t("E-mail")} erreur={erreurs.email && t(erreurs.email)}>
                        <input id="devis-email" type="email" inputMode="email" autoComplete="email" value={emailDevis} onChange={(e) => saisir("email", e.target.value)} className={`${CHAMP} ${erreurs.email ? "border-[#6b1500] border-2" : "border-ink-950"}`} />
                      </Champ>
                      <Champ id="devis-telephone" label={t("Téléphone")} erreur={erreurs.phone && t(erreurs.phone)}>
                        <div className="flex gap-2">
                          <CountryPicker mode="dial" value={coordonnees.phoneIso} onChange={(iso) => saisir("phoneIso", iso)} />
                          <input id="devis-telephone" type="tel" inputMode="tel" autoComplete="tel-national" value={coordonnees.phone} onChange={(e) => saisir("phone", e.target.value)} className={`${CHAMP} ${erreurs.phone ? "border-[#6b1500] border-2" : "border-ink-950"}`} />
                        </div>
                      </Champ>
                      <Champ label={t("Pays")} erreur={erreurs.countryIso && t(erreurs.countryIso)}>
                        <CountryPicker mode="country" value={coordonnees.countryIso} onChange={(iso) => saisir("countryIso", iso)} invalid={!!erreurs.countryIso} />
                      </Champ>
                      <fieldset className="mt-1">
                        <legend className="text-[13px] font-bold mb-1">{t("Produits exposés")}</legend>
                        {PRODUITS.map((p) => (
                          <label key={p.cle} className="flex items-center gap-2.5 min-h-9 text-[15px] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={coordonnees.produits.includes(p.cle)}
                              onChange={(e) => setCoordonnees((c) => ({ ...c, produits: e.target.checked ? [...c.produits, p.cle] : c.produits.filter((x) => x !== p.cle) }))}
                              className="w-4.5 h-4.5 accent-ink-950"
                            />
                            {t(p.label)}
                          </label>
                        ))}
                      </fieldset>
                      {erreurEnvoi && (
                        <p role="alert" className="text-sm font-semibold bg-cream-50 text-[#6b1500] rounded-md px-3 py-2">
                          {t("Une erreur est survenue lors de l’envoi. Merci de réessayer.")}
                        </p>
                      )}
                      <button type="submit" disabled={devis === "envoi"} className="mt-1 min-h-13 inline-flex items-center justify-center gap-2 rounded-md bg-ink-950 text-gold-500 font-extrabold text-base hover:bg-black disabled:opacity-70 transition-colors">
                        {devis === "envoi" && <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />}
                        {devis === "envoi" ? t("Envoi…") : t("Envoyer ma demande de devis")}
                      </button>
                      {devis === "envoi" && <p role="status" className="text-xs">{t("Votre devis est en cours de création : cela prend quelques secondes.")}</p>}
                    </form>
                  )}

                  {devis === "envoye" && (
                    <div role="status" className="bg-ink-950 text-cream-50 rounded-md p-4 flex flex-col gap-3">
                      <p className="flex items-center gap-2 text-gold-500 font-extrabold text-lg"><MailCheck className="w-5 h-5" aria-hidden="true" />{t("Devis envoyé !")}</p>
                      <p className="text-sm leading-relaxed">
                        {t("Votre devis")}{resultat.quoteNumber ? ` n° ${resultat.quoteNumber}` : ""} {t("part par e-mail à")} <span className="font-bold">{coordonnees.email}</span>. {t("Un conseiller vous rappelle sous 48 h.")}
                      </p>
                      {resultat.signingUrl && (
                        <a href={resultat.signingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 min-h-11 rounded-md bg-gold-500 text-ink-950 font-extrabold text-sm px-4 hover:bg-gold-300 transition-colors">
                          {t("Voir & signer mon devis")} <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        </a>
                      )}
                      <button type="button" onClick={ouvrirDevis} className="self-start text-sm underline underline-offset-2 hover:text-gold-500">
                        {t("Modifier mon stand et demander un autre devis")}
                      </button>
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Barre du bas : le stand suit le visiteur sur téléphone et tablette */}
      <div
        className={`lg:hidden fixed inset-x-0 z-40 bg-black border-t-2 border-gold-500 px-4 py-2.5 flex items-center justify-between gap-3 transition-transform duration-300 ${finAtteinte ? "translate-y-[110%]" : ""}`}
        style={{ bottom: "var(--cookie-banner-h, 0px)" }}
        data-barre-stand=""
        inert={finAtteinte}
      >
        <p className="min-w-0 text-sm leading-tight">
          <span className="block text-gold-500 font-extrabold text-base">{ouvert ? fmtEUR(total, lang) : t("12-14 mars 2027")}</span>
          <span className="block truncate">
            {ouvert ? `${surface} m² · ${t("Zone")} ${est.zone}${exterieur ? ` · ${t("Extérieur").toLowerCase()}` : ""}` : `${t("Stands dès")} ${prixM2(Math.min(prixZone.A, prixZone.B))}`}
          </span>
        </p>
        {ouvert ? (
          <button type="button" disabled={devis === "envoye"} onClick={ouvrirDevis} className="shrink-0 min-h-11 rounded-md bg-gold-500 text-ink-950 font-extrabold text-sm px-4 disabled:opacity-80">
            {devis === "envoye" ? t("Devis envoyé") : t("Recevoir mon devis")}
          </button>
        ) : (
          <button type="button" onClick={versLeConfigurateur} className="shrink-0 min-h-11 rounded-md bg-gold-500 text-ink-950 font-extrabold text-sm px-4">
            {t("Composer mon stand")}
          </button>
        )}
      </div>
    </section>
  );
}

/** Surface au m² près : − / saisie directe / +. */
function ChoixSurface({ titre, valeur, onChange, note }: { titre: string; valeur: number; onChange: (n: number) => void; note: string }) {
  const { t } = useT();
  const borne = (n: number) => Math.min(2000, Math.max(1, Math.round(n) || 1));
  const bouton = "shrink-0 w-12 h-12 rounded-md border border-cream-50/70 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 disabled:opacity-30 transition-colors";
  return (
    <div className="bg-black border border-cream-50/30 rounded-lg p-4">
      <p className="text-sm font-bold">{titre}</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <button type="button" aria-label={t("Diminuer")} disabled={valeur <= 1} onClick={() => onChange(borne(valeur - 1))} className={bouton}><Minus className="w-5 h-5" strokeWidth={2.5} /></button>
        <label className="flex items-baseline justify-center gap-2 text-5xl leading-none" style={AFFICHE}>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={2000}
            value={valeur}
            onChange={(e) => onChange(borne(Number(e.target.value)))}
            aria-label={`${titre}, m²`}
            className="w-24 bg-transparent text-right focus:outline-none focus:text-gold-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span aria-hidden="true">m²</span>
        </label>
        <button type="button" aria-label={t("Augmenter")} onClick={() => onChange(borne(valeur + 1))} className={bouton}><Plus className="w-5 h-5" strokeWidth={2.5} /></button>
      </div>
      <p className="mt-2 text-xs text-cream-50/85 leading-relaxed">{note}</p>
    </div>
  );
}

function Champ({ id, label, erreur, children }: { id?: string; label: string; erreur?: string | false; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      {id ? <label htmlFor={id} className="text-[13px] font-bold">{label}</label> : <span className="text-[13px] font-bold">{label}</span>}
      {children}
      {erreur && <p role="alert" className="text-xs font-bold text-[#6b1500]">{erreur}</p>}
    </div>
  );
}
