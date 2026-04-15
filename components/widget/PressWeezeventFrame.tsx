"use client";

import Script from "next/script";

export default function PressWeezeventFrame() {
  return (
    <>
      <a
        title="Logiciel billetterie en ligne"
        href="https://widget.weezevent.com/ticket/E1751329/?code=76602&locale=fr-FR&width_auto=1&color_primary=0032FA"
        className="weezevent-widget-integration"
        data-src="https://widget.weezevent.com/ticket/E1751329/?code=76602&locale=fr-FR&width_auto=1&color_primary=0032FA"
        data-id="1751329"
        data-resize="1"
        data-width_auto="1"
        data-noscroll="0"
        data-use-container="yes"
        data-type="neo"
        target="_blank"
        rel="noreferrer"
      >
        Billetterie Weezevent
      </a>

      <Script
        src="https://widget.weezevent.com/weez.js"
        strategy="afterInteractive"
      />
    </>
  );
}
