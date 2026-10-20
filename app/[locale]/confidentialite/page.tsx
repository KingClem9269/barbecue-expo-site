import { getLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import BoutonCookies from "@/components/consentement/BoutonCookies";

/**
 * Politique de confidentialité et cookies. Texte en français et en anglais
 * (anglais pour les autres langues). La liste des cookies doit suivre ce que
 * le site dépose réellement : components/consentement/Consentement.tsx,
 * vidéos YouTube, stockage local (localStorage).
 */

type Bloc = { titre: string; paragraphes?: string[]; liste?: string[] };
type Cookie = { nom: string; qui: string; but: string; duree: string; accord: string };
type Contenu = {
  meta: string;
  titre: string;
  maj: string;
  intro: string;
  blocs: Bloc[];
  cookiesTitre: string;
  cookiesIntro: string;
  entetes: [string, string, string, string, string];
  cookies: Cookie[];
  gerer: string;
  droitsTitre: string;
  droits: string[];
};

const CONTACT = "info@barbecue-expo.fr";

const FR: Contenu = {
  meta: "Politique de confidentialité et cookies — Barbecue Expo",
  titre: "Confidentialité & cookies",
  maj: "Mise à jour : 20 octobre 2026",
  intro:
    "Cette page explique quelles données personnelles le site barbecue-expo.fr recueille, pourquoi, combien de temps elles sont gardées et comment exercer vos droits.",
  blocs: [
    {
      titre: "Qui est responsable de vos données",
      paragraphes: [
        `JPC EVENTS, SAS au capital de 63 080 €, RCS Nanterre 825 256 902, organisatrice de Barbecue Expo — Route de la Pyramide, 75012 Paris, France. Contact : ${CONTACT} · 09 83 90 16 15.`,
      ],
    },
    {
      titre: "Les données que nous recueillons",
      liste: [
        "Newsletter et alerte d'ouverture de la billetterie : votre adresse e-mail (base légale : votre consentement, retirable à tout moment par le lien de désinscription).",
        "Formulaire de contact : nom, prénom, e-mail, téléphone, société et message (base légale : notre intérêt légitime à répondre à votre demande).",
        "Demande de devis exposant : identité, coordonnées, adresse, société, SIRET et numéro de TVA (base légale : mesures précontractuelles prises à votre demande).",
        "Présentation exposant : l'adresse e-mail demandée pour lire la présentation (base légale : votre consentement).",
        "Billetterie : l'achat de billets se fait sur le module Weezevent, qui applique sa propre politique de confidentialité.",
      ],
    },
    {
      titre: "Qui y a accès",
      paragraphes: [
        "Les équipes de JPC EVENTS et, uniquement pour les besoins du service : Brevo (envoi des e-mails), Google (mesure d'audience et publicité, seulement avec votre accord) et YouTube (vidéos). Google et YouTube peuvent traiter des données hors de l'Union européenne, avec les garanties prévues par le RGPD (clauses contractuelles types ou cadre de protection des données UE–États-Unis). Vos données ne sont jamais vendues.",
      ],
    },
    {
      titre: "Combien de temps nous les gardons",
      paragraphes: [
        "Les données des prospects et des abonnés sont conservées 3 ans après le dernier contact de votre part, celles des exposants pendant la relation commerciale puis le temps des obligations légales (comptables notamment).",
      ],
    },
  ],
  cookiesTitre: "Les cookies",
  cookiesIntro:
    "Les cookies de mesure d'audience et les cookies publicitaires ne sont déposés qu'avec votre accord, donné séparément pour chacune de ces deux finalités dans le bandeau. Sans accord, Google Tag Manager reçoit un signal de refus et les balises publicitaires ne déposent aucun cookie. Les vidéos du site sont diffusées par YouTube en mode « confidentialité renforcée » et se lancent automatiquement : YouTube dépose alors ses propres cookies. Le site garde aussi quelques réglages dans votre navigateur, nécessaires à son fonctionnement.",
  entetes: ["Nom", "Déposé par", "À quoi il sert", "Durée", "Accord"],
  cookies: [
    { nom: "_ga, _ga_*", qui: "Google Analytics", but: "Mesurer l'audience du site (pages vues, sources de visite)", duree: "13 mois", accord: "Oui (mesure)" },
    { nom: "_gcl_au, _gcl_aw, IDE…", qui: "Google Ads", but: "Mesurer l'efficacité de nos campagnes et adapter les annonces à vos centres d'intérêt", duree: "90 jours à 13 mois", accord: "Oui (publicité)" },
    { nom: "YSC, VISITOR_INFO1_LIVE, VISITOR_PRIVACY_METADATA…", qui: "YouTube (Google)", but: "Lire les vidéos intégrées (lecture automatique)", duree: "Session à 6 mois", accord: "Non" },
    { nom: "bbq-expo:cookies", qui: "barbecue-expo.fr (stockage local)", but: "Retenir votre choix sur les cookies", duree: "6 mois", accord: "Non (nécessaire)" },
    { nom: "NEXT_LOCALE", qui: "barbecue-expo.fr", but: "Retenir la langue du site", duree: "Session", accord: "Non (nécessaire)" },
    { nom: "bbq-expo-audience", qui: "barbecue-expo.fr (stockage local)", but: "Retenir le parcours choisi (grand public ou pro)", duree: "Jusqu'à effacement", accord: "Non (nécessaire)" },
    { nom: "bbq-expo:presentation-exposants:email", qui: "barbecue-expo.fr (stockage local)", but: "Ne pas redemander votre e-mail sur la présentation exposant", duree: "Jusqu'à effacement", accord: "Non (nécessaire)" },
    { nom: "bbq-estimator-v1", qui: "barbecue-expo.fr (stockage local)", but: "Garder votre estimation de stand en cours", duree: "Jusqu'à effacement", accord: "Non (nécessaire)" },
  ],
  gerer: "Vous pouvez changer d'avis à tout moment :",
  droitsTitre: "Vos droits",
  droits: [
    `Vous pouvez accéder à vos données, les faire rectifier ou effacer, vous opposer à leur traitement, en demander la limitation ou la portabilité, et retirer votre consentement à tout moment. Écrivez-nous à ${CONTACT}.`,
    "Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (cnil.fr).",
  ],
};

const EN: Contenu = {
  meta: "Privacy & cookie policy — Barbecue Expo",
  titre: "Privacy & cookies",
  maj: "Updated: 20 October 2026",
  intro:
    "This page explains what personal data barbecue-expo.fr collects, why, how long it is kept and how to exercise your rights.",
  blocs: [
    {
      titre: "Who is responsible for your data",
      paragraphes: [
        `JPC EVENTS, a French SAS with a share capital of €63,080, registered in Nanterre under no. 825 256 902, organiser of Barbecue Expo — Route de la Pyramide, 75012 Paris, France. Contact: ${CONTACT} · +33 9 83 90 16 15.`,
      ],
    },
    {
      titre: "The data we collect",
      liste: [
        "Newsletter and ticketing launch alert: your email address (legal basis: your consent, which you can withdraw at any time through the unsubscribe link).",
        "Contact form: first and last name, email, phone, company and message (legal basis: our legitimate interest in answering your request).",
        "Exhibitor quote request: identity, contact details, address, company, company registration and VAT numbers (legal basis: pre-contractual steps taken at your request).",
        "Exhibitor presentation: the email address requested to read the presentation (legal basis: your consent).",
        "Ticketing: tickets are bought through the Weezevent module, which applies its own privacy policy.",
      ],
    },
    {
      titre: "Who has access",
      paragraphes: [
        "JPC EVENTS staff and, only as needed for the service: Brevo (email sending), Google (audience measurement and advertising, only with your consent) and YouTube (videos). Google and YouTube may process data outside the European Union, under the safeguards set by the GDPR (standard contractual clauses or the EU–US Data Privacy Framework). Your data is never sold.",
      ],
    },
    {
      titre: "How long we keep it",
      paragraphes: [
        "Prospect and subscriber data is kept for 3 years after your last contact with us; exhibitor data for the duration of the business relationship, then as long as legal (notably accounting) obligations require.",
      ],
    },
  ],
  cookiesTitre: "Cookies",
  cookiesIntro:
    "Audience measurement and advertising cookies are only set with your consent, given separately for each of these two purposes in the banner. Without consent, Google Tag Manager receives a refusal signal and advertising tags set no cookies. The site's videos are served by YouTube in privacy-enhanced mode and start automatically: YouTube then sets its own cookies. The site also keeps a few settings in your browser that it needs to work.",
  entetes: ["Name", "Set by", "Purpose", "Duration", "Consent"],
  cookies: [
    { nom: "_ga, _ga_*", qui: "Google Analytics", but: "Measure site audience (page views, traffic sources)", duree: "13 months", accord: "Yes (measurement)" },
    { nom: "_gcl_au, _gcl_aw, IDE…", qui: "Google Ads", but: "Measure our campaigns' effectiveness and tailor ads to your interests", duree: "90 days to 13 months", accord: "Yes (advertising)" },
    { nom: "YSC, VISITOR_INFO1_LIVE, VISITOR_PRIVACY_METADATA…", qui: "YouTube (Google)", but: "Play embedded videos (autoplay)", duree: "Session to 6 months", accord: "No" },
    { nom: "bbq-expo:cookies", qui: "barbecue-expo.fr (local storage)", but: "Remember your cookie choice", duree: "6 months", accord: "No (necessary)" },
    { nom: "NEXT_LOCALE", qui: "barbecue-expo.fr", but: "Remember the site language", duree: "Session", accord: "No (necessary)" },
    { nom: "bbq-expo-audience", qui: "barbecue-expo.fr (local storage)", but: "Remember the chosen journey (public or trade)", duree: "Until cleared", accord: "No (necessary)" },
    { nom: "bbq-expo:presentation-exposants:email", qui: "barbecue-expo.fr (local storage)", but: "Avoid asking for your email again on the exhibitor presentation", duree: "Until cleared", accord: "No (necessary)" },
    { nom: "bbq-estimator-v1", qui: "barbecue-expo.fr (local storage)", but: "Keep your current booth estimate", duree: "Until cleared", accord: "No (necessary)" },
  ],
  gerer: "You can change your mind at any time:",
  droitsTitre: "Your rights",
  droits: [
    `You can access your data, have it corrected or erased, object to its processing, ask for its restriction or portability, and withdraw your consent at any time. Write to us at ${CONTACT}.`,
    "If you believe your rights are not respected, you can lodge a complaint with the French data protection authority, the CNIL (cnil.fr).",
  ],
};

const contenu = (locale: string) => (locale === "fr" ? FR : EN);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = contenu(locale);
  return buildMetadata(locale, "/confidentialite", { title: c.meta, description: c.intro });
}

export default async function ConfidentialitePage() {
  const locale = await getLocale();
  const c = contenu(locale);

  return (
    <div className="bg-cream-50 text-ink-900 pt-32 md:pt-40 pb-20" lang={locale === "fr" ? "fr" : "en"}>
      <article className="max-w-3xl mx-auto px-6 md:px-12">
        <p className="text-xs uppercase tracking-widest text-ink-500">{c.maj}</p>
        <h1 className="mt-4 text-5xl md:text-7xl leading-[0.95]" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
          {c.titre}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-700">{c.intro}</p>

        {c.blocs.map((b) => (
          <section key={b.titre} className="mt-12">
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{b.titre}</h2>
            {b.paragraphes?.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-ink-700">{p}</p>
            ))}
            {b.liste && (
              <ul className="mt-4 list-disc pl-5 space-y-2 leading-relaxed text-ink-700">
                {b.liste.map((l) => <li key={l}>{l}</li>)}
              </ul>
            )}
          </section>
        ))}

        <section id="cookies" className="mt-12 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{c.cookiesTitre}</h2>
          <p className="mt-4 leading-relaxed text-ink-700">{c.cookiesIntro}</p>
          <div className="mt-6 overflow-x-auto border border-ink-900/15">
            <table className="w-full text-sm text-left">
              <thead className="bg-ink-900/5">
                <tr>{c.entetes.map((e) => <th key={e} scope="col" className="px-3 py-2 font-semibold">{e}</th>)}</tr>
              </thead>
              <tbody>
                {c.cookies.map((k) => (
                  <tr key={k.nom} className="border-t border-ink-900/10 align-top">
                    <td className="px-3 py-2 font-mono text-xs break-all">{k.nom}</td>
                    <td className="px-3 py-2">{k.qui}</td>
                    <td className="px-3 py-2">{k.but}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{k.duree}</td>
                    <td className="px-3 py-2">{k.accord}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-ink-700">
            {c.gerer} <BoutonCookies />
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{c.droitsTitre}</h2>
          {c.droits.map((d) => <p key={d} className="mt-4 leading-relaxed text-ink-700">{d}</p>)}
        </section>
      </article>
    </div>
  );
}
