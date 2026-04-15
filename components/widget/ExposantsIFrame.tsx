// app/components/ImaginaIframe.tsx
"use client";

import { useEffect } from "react";

export default function ExposantsIFrame() {
  /*   useEffect(() => {
    function resizeIFrame(event: MessageEvent) {
      if (event.data && typeof (event.data as any).height !== "undefined") {
        const iframe = document.querySelector<HTMLIFrameElement>(
          ".website-section-iframe"
        );
        if (!iframe) return;

        const height = Number((event.data as any).height);
        if (!Number.isFinite(height) || height <= 0) return;

        iframe.style.height = `${height}px`;
        iframe.height = height.toString();
      }
    }

    window.addEventListener("message", resizeIFrame, false);
    return () => window.removeEventListener("message", resizeIFrame, false);
  }, []); */

  return (
    <iframe
      className="website-section-iframe"
      allow="geolocation"
      src="https://app.imagina.com/module/460795/112440?application_id=43669485"
      style={{
        border: "none",
        width: "100%",
        display: "block",
        overflow: "scroll",
        height: "1000px",
      }}
    />
  );
}
