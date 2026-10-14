"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { sendGAEvent } from "@next/third-parties/google";
import Tampon from "@/components/geste/Tampon";
import Bouton from "@/components/marque/Bouton";
import { inscrireNewsletter } from "@/lib/newsletter";

/**
 * Alerte d'ouverture de la billetterie, tant que la vente n'est pas ouverte.
 * C'est une inscription à la newsletter (même liste que le pied de page) et
 * le formulaire le dit. Réponse par le geste Tampon (« reçu »).
 */

const UI: Record<
  string,
  { label: string; bouton: string; recu: string; merci: string; mention: string }
> = {
  fr: {
    label: "Votre adresse e-mail",
    bouton: "Me prévenir",
    recu: "C'est noté",
    merci: "Merci ! Votre adresse est inscrite à la newsletter Barbecue Expo.",
    mention: "En vous inscrivant, vous recevez la newsletter Barbecue Expo ; désinscription possible à tout moment.",
  },
  en: {
    label: "Your email address",
    bouton: "Notify me",
    recu: "Noted",
    merci: "Thanks! Your address is signed up to the Barbecue Expo newsletter.",
    mention: "Signing up subscribes you to the Barbecue Expo newsletter; you can unsubscribe at any time.",
  },
  es: {
    label: "Su correo electrónico",
    bouton: "Avisarme",
    recu: "Anotado",
    merci: "¡Gracias! Su dirección está inscrita en el boletín de Barbecue Expo.",
    mention: "Al inscribirse, recibe el boletín de Barbecue Expo; puede darse de baja en cualquier momento.",
  },
  de: {
    label: "Ihre E-Mail-Adresse",
    bouton: "Benachrichtigen",
    recu: "Notiert",
    merci: "Danke! Ihre Adresse ist für den Barbecue-Expo-Newsletter angemeldet.",
    mention: "Mit der Anmeldung erhalten Sie den Barbecue-Expo-Newsletter; Abmeldung jederzeit möglich.",
  },
  nl: {
    label: "Uw e-mailadres",
    bouton: "Waarschuw mij",
    recu: "Genoteerd",
    merci: "Bedankt! Uw adres is ingeschreven voor de Barbecue Expo-nieuwsbrief.",
    mention: "Met uw inschrijving ontvangt u de Barbecue Expo-nieuwsbrief; u kunt zich op elk moment uitschrijven.",
  },
  pt: {
    label: "O seu e-mail",
    bouton: "Avisar-me",
    recu: "Anotado",
    merci: "Obrigado! O seu endereço está inscrito na newsletter Barbecue Expo.",
    mention: "Ao inscrever-se, recebe a newsletter Barbecue Expo; pode cancelar a qualquer momento.",
  },
  it: {
    label: "Il tuo indirizzo email",
    bouton: "Avvisami",
    recu: "Registrato",
    merci: "Grazie! Il tuo indirizzo è iscritto alla newsletter Barbecue Expo.",
    mention: "Iscrivendoti ricevi la newsletter Barbecue Expo; puoi disiscriverti in qualsiasi momento.",
  },
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AlerteOuverture() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;
  const t = useTranslations("newsletter");
  const id = useId();
  const confirmation = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [etat, setEtat] = useState<"saisie" | "envoi" | "inscrit" | "erreur">("saisie");
  const [erreur, setErreur] = useState("");

  // Le formulaire disparaît avec le bouton qui avait le focus : on le pose
  // sur la confirmation.
  useEffect(() => {
    if (etat === "inscrit") confirmation.current?.focus();
  }, [etat]);

  const envoyer = async (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setEtat("erreur");
      setErreur(t("error_invalid_email"));
      return;
    }
    setEtat("envoi");
    setErreur("");
    try {
      const res = await inscrireNewsletter(email);
      if (!res.ok) {
        setEtat("erreur");
        setErreur(res.message || t("error_unexpected"));
        return;
      }
      setEtat("inscrit");
      // Conversion GA4 : même événement que le pied de page, autre origine
      sendGAEvent("event", "newsletter_signup", { method: "billetterie" });
    } catch {
      setEtat("erreur");
      setErreur(t("error_unexpected"));
    }
  };

  return (
    <div className="max-w-xl">
      <div role="status">
        {etat === "inscrit" && (
          <div ref={confirmation} tabIndex={-1} className="flex flex-col items-start gap-5 focus:outline-none">
            <Tampon mode="chargement" angle={-6} className="text-jaune text-4xl md:text-5xl">
              {ui.recu}
            </Tampon>
            <p className="text-papier/85 text-base md:text-lg leading-relaxed">{ui.merci}</p>
          </div>
        )}
      </div>

      {etat !== "inscrit" && (
        <form onSubmit={envoyer} noValidate>
          <label htmlFor={`${id}-email`} className="block mb-2 text-xs uppercase tracking-[0.08em] text-papier/75">
            {ui.label}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id={`${id}-email`}
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={etat === "envoi"}
              aria-invalid={etat === "erreur"}
              aria-describedby={etat === "erreur" ? `${id}-erreur ${id}-mention` : `${id}-mention`}
              className="flex-1 min-w-0 bg-papier text-charbon px-4 py-3 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-jaune focus-visible:ring-offset-2 focus-visible:ring-offset-charbon disabled:opacity-60"
            />
            <Bouton type="submit" variante="jaune" disabled={etat === "envoi"}>
              {etat === "envoi" ? t("loading") : ui.bouton}
            </Bouton>
          </div>
          {etat === "erreur" && (
            <p id={`${id}-erreur`} role="alert" className="mt-3 text-sm text-[#ffb4a8]">
              {erreur}
            </p>
          )}
          <p id={`${id}-mention`} className="mt-3 text-xs leading-relaxed text-papier/60">
            {ui.mention}
          </p>
        </form>
      )}
    </div>
  );
}
