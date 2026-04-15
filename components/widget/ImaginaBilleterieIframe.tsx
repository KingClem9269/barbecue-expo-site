// app/components/ImaginaBilleterieIframe.tsx
"use client";

import { useEffect, useRef } from "react";

export default function ImaginaBilleterieIframe() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    function resizeIFrame(event: MessageEvent) {
      // Optional but recommended:
      // if (event.origin !== "https://app.imagina.com") return;

      const data: any = event.data;
      if (!data || data.height == null) return;

      const height = Number(data.height);
      if (!Number.isFinite(height) || height <= 0) return;

      const iframe = iframeRef.current;
      if (!iframe) return;

      iframe.style.height = `${height}px`;
      iframe.height = height.toString();
    }

    window.addEventListener("message", resizeIFrame, false);
    return () => window.removeEventListener("message", resizeIFrame, false);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      scrolling="no"
      className="website-section-iframe"
      allow="geolocation"
      src="https://app.imagina.com/module/460798/112440?application_id=42894439"
      tabIndex={-1}
      style={{
        border: "none",
        width: "100%",
        display: "block",
        overflow: "hidden",
        height: "600px", // default before postMessage resize
      }}
    />
  );
}
