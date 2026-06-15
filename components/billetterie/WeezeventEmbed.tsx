"use client";

import Script from "next/script";
import { WEEZEVENT_GP_URL, openWeezevent } from "./WeezeventCTA";
import { useLocale } from "next-intl";

const FALLBACK: Record<string, string> = {
  fr: "Le module de billetterie se charge… Cliquez ici si rien n'apparaît.",
  en: "The ticketing module is loading… Click here if nothing appears.",
  es: "El módulo de entradas se está cargando… Haz clic aquí si no aparece nada.",
  de: "Das Ticketmodul wird geladen… Klicken Sie hier, falls nichts erscheint.",
  nl: "De ticketmodule wordt geladen… Klik hier als er niets verschijnt.",
  pt: "O módulo de bilhetes está a carregar… Clique aqui se nada aparecer.",
  it: "Il modulo biglietteria si sta caricando… Clicca qui se non appare nulla.",
};

/** Billetterie grand public — widget Weezevent embarqué en ligne. */
export default function WeezeventEmbed() {
  const locale = useLocale();
  return (
    <div className="max-w-3xl mx-auto">
      {/* weez.js transforme ce lien en iframe de billetterie intégrée */}
      <a
        title="Billetterie en ligne"
        href={WEEZEVENT_GP_URL}
        className="weezevent-widget-integration block"
        data-src={WEEZEVENT_GP_URL}
        data-id="2154351"
        data-resize="1"
        data-width_auto="1"
        data-noscroll="0"
        data-use-container="yes"
        data-type="neo"
        target="_blank"
        rel="noreferrer"
        onClick={(e) => {
          // Repli : si le widget inline n'a pas pris la main, ouvrir en popup.
          if (!document.querySelector(".weezevent-widget-integration iframe")) {
            e.preventDefault();
            openWeezevent();
          }
        }}
      >
        <span className="block text-center text-ink-500 text-sm py-6">{FALLBACK[locale] || FALLBACK.fr}</span>
      </a>

      <Script
        src="https://widget.weezevent.com/weez.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
