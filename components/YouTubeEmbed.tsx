"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useCookiesAcceptes } from "@/components/consentement/Consentement";

/**
 * Contained YouTube player — muted, autoplay, looped on the 0→LOOP_END
 * segment. Fills its parent (which should be a relative aspect-ratio box).
 * Unlike YouTubeHeroBackground, this is NOT full-bleed: it sits at 100%×100%
 * of its container, so use a 16:9 box to avoid letterboxing.
 */

const VIDEO_ID = "jUSlNznQ-Io";
const LOOP_END = 44;

interface YTPlayer {
  mute: () => void;
  unMute: () => void;
  setVolume: (v: number) => void;
  playVideo: () => void;
  seekTo: (s: number, allow?: boolean) => void;
  getCurrentTime: () => number;
  destroy: () => void;
}
// Note : window.YT et onYouTubeIframeAPIReady sont déjà déclarés globalement
// dans YouTubeHeroBackground.tsx — on ne les redéclare pas ici (sinon conflit TS).

const UI: Record<string, { activer: string; couper: string; actif: string; lire: string; avis: string }> = {
  fr: { activer: "Activer le son", couper: "Couper le son", actif: "Son activé", lire: "Lire la vidéo", avis: "YouTube dépose des cookies à la lecture." },
  en: { activer: "Turn sound on", couper: "Mute", actif: "Sound on", lire: "Play the video", avis: "YouTube sets cookies when playing." },
  es: { activer: "Activar el sonido", couper: "Silenciar", actif: "Sonido activado", lire: "Ver el vídeo", avis: "YouTube deposita cookies al reproducir." },
  de: { activer: "Ton einschalten", couper: "Ton ausschalten", actif: "Ton an", lire: "Video abspielen", avis: "YouTube setzt beim Abspielen Cookies." },
  nl: { activer: "Geluid aan", couper: "Geluid uit", actif: "Geluid staat aan", lire: "Video afspelen", avis: "YouTube plaatst cookies bij het afspelen." },
  pt: { activer: "Ativar o som", couper: "Desativar o som", actif: "Som ativado", lire: "Ver o vídeo", avis: "O YouTube coloca cookies ao reproduzir." },
  it: { activer: "Attiva l'audio", couper: "Disattiva l'audio", actif: "Audio attivo", lire: "Guarda il video", avis: "YouTube deposita cookie durante la riproduzione." },
};

export default function YouTubeEmbed() {
  const targetRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [muted, setMuted] = useState(true);
  const ui = UI[useLocale()] || UI.fr;
  // Lecture seulement après l'accord du bandeau cookies, ou un clic sur
  // « Lire la vidéo » (accord pour cette vidéo-là).
  const cookiesAcceptes = useCookiesAcceptes();
  const [clic, setClic] = useState(false);
  const actif = cookiesAcceptes || clic;

  const toggleSound = () => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (muted) { p.unMute(); p.setVolume(100); setMuted(false); }
      else { p.mute(); setMuted(true); }
    } catch { /* not ready */ }
  };

  useEffect(() => {
    if (!actif) return;
    let cancelled = false;
    const create = () => {
      if (cancelled || !targetRef.current || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player(targetRef.current, {
        // Mode « sans cookies » de YouTube (pas de cookie avant lecture active)
        host: "https://www.youtube-nocookie.com",
        videoId: VIDEO_ID,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0,
          modestbranding: 1, playsinline: 1, rel: 0, loop: 0,
          start: 0, end: LOOP_END, iv_load_policy: 3, cc_load_policy: 0,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => { e.target.mute(); e.target.playVideo(); },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            if (window.YT && e.data === window.YT.PlayerState.ENDED) { e.target.seekTo(0); e.target.playVideo(); }
          },
        },
      }) as unknown as YTPlayer;
    };
    if (window.YT?.Player) create();
    else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); create(); };
      if (!document.getElementById("yt-iframe-api")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }
    const iv = window.setInterval(() => {
      const p = playerRef.current;
      try { if (p?.getCurrentTime && p.getCurrentTime() >= LOOP_END - 0.2) { p.seekTo(0); p.playVideo(); } } catch { /* not ready */ }
    }, 500);
    return () => {
      cancelled = true;
      window.clearInterval(iv);
      try { playerRef.current?.destroy(); } catch { /* noop */ }
    };
  }, [actif]);

  if (!actif) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-950 text-cream-50 px-6 text-center">
        <button
          type="button"
          onClick={() => setClic(true)}
          className="inline-flex items-center gap-2 rounded-full bg-gold-500 hover:bg-gold-300 text-ink-950 px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
        >
          <Play className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" /> {ui.lire}
        </button>
        <p className="text-xs text-cream-50/60">{ui.avis}</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <div ref={targetRef} className="w-full h-full pointer-events-none" />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? ui.activer : ui.couper}
        title={muted ? ui.activer : ui.couper}
        className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full bg-ink-950/70 hover:bg-ink-950/90 text-cream-50 px-3 py-2 backdrop-blur transition-colors"
      >
        {muted ? <VolumeX className="w-4 h-4" strokeWidth={2} /> : <Volume2 className="w-4 h-4 text-gold-500" strokeWidth={2} />}
        <span className="text-xs font-semibold">{muted ? ui.activer : ui.actif}</span>
      </button>
    </div>
  );
}
