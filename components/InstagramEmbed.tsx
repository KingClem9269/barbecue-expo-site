"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Embed Instagram officiel — iframe directe + gestion fiable du redimensionnement.
 *
 * Le script officiel embed.js rate souvent le message de resize en contexte SPA
 * (React / navigation client), laissant l'iframe coincée à sa hauteur par défaut
 * de 631px → médias mal cadrés / étirés. Ici on iframe directement l'endpoint
 * /embed/ et on écoute nous-mêmes les messages `MEASURE` d'Instagram pour
 * appliquer la bonne hauteur, en associant chaque message à son iframe via
 * `contentWindow === event.source`.
 */

// Écouteur global installé une seule fois pour toutes les iframes de la page.
let listenerInstalled = false;
function installResizeListener() {
  if (listenerInstalled || typeof window === "undefined") return;
  listenerInstalled = true;
  window.addEventListener("message", (e: MessageEvent) => {
    if (typeof e.origin !== "string" || !e.origin.includes("instagram.com")) return;
    let data: unknown = e.data;
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch {
        return;
      }
    }
    const d = data as { type?: string; details?: { height?: number } };
    const height = d?.details?.height;
    if (d?.type !== "MEASURE" || !height) return;
    document.querySelectorAll<HTMLIFrameElement>("iframe[data-ig-embed]").forEach((f) => {
      if (f.contentWindow === e.source) f.style.height = `${Math.ceil(height)}px`;
    });
  });
}

function shortcode(url: string): string | null {
  const m = url.match(/instagram\.com\/(?:p|reel|tv)\/([^/?#]+)/);
  return m ? m[1] : null;
}

export default function InstagramEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [code] = useState(() => shortcode(url));

  useEffect(() => {
    installResizeListener();
  }, []);

  if (!code) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block p-4 text-sm text-ink-700 underline bg-white rounded-lg">
        Voir le post Instagram
      </a>
    );
  }

  return (
    <iframe
      ref={ref}
      data-ig-embed
      src={`https://www.instagram.com/p/${code}/embed/`}
      title="Publication Instagram"
      loading="lazy"
      scrolling="no"
      allowTransparency
      className="w-full block"
      style={{ border: 0, background: "#fff", borderRadius: 8, height: 631, maxWidth: 340, margin: "0 auto" }}
    />
  );
}
