"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAudience } from "@/components/nav/AudienceContext";
import { pousser, identifiantUnique } from "./mesure";

/**
 * Demande d'e-mail de /presentation-exposants (et de cette page seulement).
 *
 * Déclenchement (le premier qui arrive) :
 *   A. lecture engagée : 50 % de la page atteints (bas de l'écran) ET au
 *      moins 20 s sur la page — la plus tardive des deux conditions ;
 *   B. intention de sortie : curseur qui sort par le haut de la fenêtre
 *      (ordinateur), ou défilement rapide vers le haut (mobile).
 * Un voile flou couvre alors la page et bloque le défilement ; une carte sans
 * fermeture (ni croix, ni clic à côté, ni Échap) demande l'e-mail. Le champ et le bouton
 * sont un formulaire du CRM (Pylot) affiché en iframe. L'iframe prévient la
 * page par postMessage :
 *   { type: "pylot-form:height", slug, height }  → hauteur de l'iframe
 *   { type: "pylot-form:submitted", slug }       → 1 s plus tard, la page se
 *     débloque et le déblocage est mémorisé (localStorage) : plus jamais
 *     de demande sur ce navigateur.
 * Langue du formulaire : français si <html lang> est le français, anglais
 * sinon ; suivie en direct (le catalogue change de langue sans recharger).
 */

const ORIGINE = "https://app.pylot-ai.com";
const SLUG = "barbecue-expo-presentation-exposant";
const CLE = "bbq-expo:presentation-exposants:email";
const DELAI_MIN = 20_000; // règle A : présence minimale
const PROFONDEUR = 0.5; // règle A : moitié de la page
// règle B (mobile) : remontée d'au moins 250 px à plus de 1,5 px/ms
const REMONTEE_PX = 250;
const REMONTEE_VITESSE = 1.5;

const TEXTES: Record<string, { surtitre: string; titre: string; texte: string }> = {
  fr: {
    surtitre: "Présentation exposant · 2027",
    titre: "Continuez la lecture",
    texte: "Laissez votre e-mail pour lire la présentation complète du salon et le catalogue exposant. On ne vous le demandera qu'une fois.",
  },
  en: {
    surtitre: "Exhibitor presentation · 2027",
    titre: "Keep reading",
    texte: "Leave your email to read the full show presentation and the exhibitor catalogue. We'll only ask once.",
  },
  es: {
    surtitre: "Presentación expositor · 2027",
    titre: "Siga leyendo",
    texte: "Deje su correo para leer la presentación completa del salón y el catálogo del expositor. Solo se lo pediremos una vez.",
  },
  de: {
    surtitre: "Ausstellerpräsentation · 2027",
    titre: "Weiterlesen",
    texte: "Hinterlassen Sie Ihre E-Mail-Adresse, um die vollständige Messepräsentation und den Ausstellerkatalog zu lesen. Wir fragen nur ein einziges Mal.",
  },
  nl: {
    surtitre: "Exposantenpresentatie · 2027",
    titre: "Lees verder",
    texte: "Laat uw e-mailadres achter om de volledige beurspresentatie en de exposantencatalogus te lezen. We vragen het maar één keer.",
  },
  pt: {
    surtitre: "Apresentação expositor · 2027",
    titre: "Continue a ler",
    texte: "Deixe o seu e-mail para ler a apresentação completa do salão e o catálogo do expositor. Só lho pediremos uma vez.",
  },
  it: {
    surtitre: "Presentazione espositori · 2027",
    titre: "Continua a leggere",
    texte: "Lascia la tua email per leggere la presentazione completa del salone e il catalogo espositori. Te la chiederemo una sola volta.",
  },
};

function langueDuDocument() {
  return (document.documentElement.lang || "fr").slice(0, 2).toLowerCase();
}

function dejaDebloque() {
  try {
    return window.localStorage.getItem(CLE) === "1";
  } catch {
    return false;
  }
}

export default function PorteEmail() {
  const { audience } = useAudience();
  const [ouverte, setOuverte] = useState(false);
  const [langue, setLangue] = useState("fr");
  const [hauteur, setHauteur] = useState(260);
  const titreRef = useRef<HTMLHeadingElement>(null);

  // Règles A et B, sauf si la page a déjà été débloquée sur ce navigateur.
  useEffect(() => {
    if (dejaDebloque()) return;
    const debut = Date.now();
    let fait = false;
    let moitieAtteinte = false;
    let attente: number | undefined;

    const ouvrir = () => {
      if (fait) return;
      fait = true;
      nettoyer();
      setLangue(langueDuDocument());
      setOuverte(true);
    };

    // A. 50 % de la page ET 20 s de présence
    const verifierA = () => {
      if (moitieAtteinte) return;
      const doc = document.documentElement;
      if ((window.scrollY + window.innerHeight) / doc.scrollHeight < PROFONDEUR) return;
      moitieAtteinte = true;
      attente = window.setTimeout(ouvrir, Math.max(0, DELAI_MIN - (Date.now() - debut)));
    };

    // B. sortie par le haut (ordinateur)
    const surSortie = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) ouvrir();
    };

    // B. défilement rapide vers le haut (mobile)
    let dernierY = window.scrollY;
    let dernierT = performance.now();
    let cumul = 0;
    const surDefilement = () => {
      const y = window.scrollY;
      const t = performance.now();
      const dy = dernierY - y; // > 0 : vers le haut
      const dt = Math.max(1, t - dernierT);
      if (dy > 0 && dy / dt > REMONTEE_VITESSE) {
        cumul += dy;
        if (cumul >= REMONTEE_PX && window.matchMedia("(pointer: coarse)").matches) ouvrir();
      } else {
        cumul = 0;
      }
      dernierY = y;
      dernierT = t;
      verifierA();
    };

    function nettoyer() {
      window.removeEventListener("scroll", surDefilement);
      document.removeEventListener("mouseout", surSortie);
      if (attente !== undefined) window.clearTimeout(attente);
    }

    window.addEventListener("scroll", surDefilement, { passive: true });
    document.addEventListener("mouseout", surSortie);
    verifierA(); // page plus courte que l'écran, ou arrivée en milieu de page
    return nettoyer;
  }, []);

  // Mesure : le mur s'affiche (dénominateur du taux de franchissement).
  useEffect(() => {
    if (ouverte) pousser({ event: "email_gate_shown", audience });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ouverte]);

  // Langue suivie en direct : un changement de <html lang> réinitialise l'iframe.
  useEffect(() => {
    if (!ouverte) return;
    const obs = new MutationObserver(() => setLangue(langueDuDocument()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => obs.disconnect();
  }, [ouverte]);

  // Voile ouvert : défilement bloqué, reste de la page inerte, focus sur la carte.
  useEffect(() => {
    if (!ouverte) return;
    const html = document.documentElement;
    const avant = { html: html.style.overflow, body: document.body.style.overflow };
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const inertes = [...document.body.children].filter(
      (el) => !el.hasAttribute("data-porte-email") && !el.hasAttribute("inert"),
    );
    inertes.forEach((el) => el.setAttribute("inert", ""));
    titreRef.current?.focus();
    return () => {
      html.style.overflow = avant.html;
      document.body.style.overflow = avant.body;
      inertes.forEach((el) => el.removeAttribute("inert"));
    };
  }, [ouverte]);

  // Messages du formulaire : hauteur, puis envoi.
  useEffect(() => {
    if (!ouverte) return;
    let fermeture: number | undefined;
    const surMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGINE) return;
      const d = e.data as { type?: string; slug?: string; height?: number } | null;
      if (!d || (d.slug && d.slug !== SLUG)) return;
      if (d.type === "pylot-form:height" && typeof d.height === "number" && d.height > 0) {
        setHauteur(Math.ceil(d.height));
      } else if (d.type === "pylot-form:submitted" && fermeture === undefined) {
        // Le formulaire n'envoie « submitted » qu'après la réponse réussie du CRM.
        pousser({ event: "email_gate_submitted", event_id: identifiantUnique(), audience });
        try {
          window.localStorage.setItem(CLE, "1");
        } catch {
          /* stockage indisponible : la page se débloque quand même */
        }
        fermeture = window.setTimeout(() => setOuverte(false), 1000);
      }
    };
    window.addEventListener("message", surMessage);
    return () => {
      window.removeEventListener("message", surMessage);
      if (fermeture !== undefined) window.clearTimeout(fermeture);
    };
  }, [ouverte, audience]);

  if (!ouverte) return null;

  const t = TEXTES[langue] || TEXTES.en;
  const langueFormulaire = langue === "fr" ? "fr" : "en";

  return createPortal(
    <div
      data-porte-email=""
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-charbon/40 backdrop-blur-md overflow-y-auto"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="porte-email-titre"
        data-email-gate=""
        className="w-full max-w-[500px] bg-charbon text-papier border border-white/15 p-6 md:p-8 shadow-2xl"
      >
        <p className="text-xs uppercase tracking-[0.08em] text-jaune">{t.surtitre}</p>
        <h2
          id="porte-email-titre"
          ref={titreRef}
          tabIndex={-1}
          className="mt-3 font-affiche font-normal uppercase leading-[0.9] text-4xl md:text-5xl focus:outline-none"
        >
          {t.titre}
        </h2>
        <p className="mt-4 text-papier/80 text-base leading-relaxed">{t.texte}</p>
        <iframe
          key={langueFormulaire}
          src={`${ORIGINE}/form/${SLUG}?lang=${langueFormulaire}&bare=1`}
          title={t.titre}
          className="mt-6 block w-full border-0"
          style={{ height: hauteur }}
        />
      </div>
    </div>,
    document.body,
  );
}
