// app/components/WeezeventWidget.tsx
"use client";

import Script from "next/script";

export default function WeezeventWidget() {
  return (
    <>
      <a
        title="Logiciel billetterie en ligne"
        href="https://widget.weezevent.com/ticket/E1400308/?code=69496&locale=fr-FR&width_auto=1&color_primary=fcb900"
        className="weezevent-widget-integration"
        data-src="https://widget.weezevent.com/ticket/E1400308/?code=69496&locale=fr-FR&width_auto=1&color_primary=fcb900"
        data-id="1400308"
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
