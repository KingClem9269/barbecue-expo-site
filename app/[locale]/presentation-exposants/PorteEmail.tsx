"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Demande d'e-mail de /presentation-exposants (et de cette page seulement).
 *
 * Après 15 s de lecture, un voile flou couvre la page et bloque le défilement ;
 * une carte sans bouton de fermeture demande l'e-mail. Le champ et le bouton
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
const DELAI = 15_000;

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
  const [ouverte, setOuverte] = useState(false);
  const [langue, setLangue] = useState("fr");
  const [hauteur, setHauteur] = useState(260);
  const titreRef = useRef<HTMLHeadingElement>(null);

  // Minuterie de 15 s, sauf si la page a déjà été débloquée.
  useEffect(() => {
    if (dejaDebloque()) return;
    const id = window.setTimeout(() => {
      setLangue(langueDuDocument());
      setOuverte(true);
    }, DELAI);
    return () => window.clearTimeout(id);
  }, []);

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
        const w = window as Window & { dataLayer?: unknown[] };
        if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: "presentation_exposant_email" });
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
  }, [ouverte]);

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
