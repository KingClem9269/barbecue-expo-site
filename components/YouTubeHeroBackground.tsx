"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { useCookiesAcceptes } from "@/components/consentement/Consentement";
import { Pause, Play } from "lucide-react";

/**
 * Full-bleed YouTube background for the hero — muted, autoplay, and looped
 * on the 0:00 → LOOP_END segment (not the whole video). Uses the YouTube
 * IFrame Player API so we can seek back to 0 precisely at LOOP_END.
 *
 * The poster (optimised by next/image, it is the LCP image) stays alone on
 * mobile, with prefers-reduced-motion and with Save-Data: no iframe, no
 * polling. When the video runs, a pause button is shown (WCAG 2.2.2).
 */

const VIDEO_ID = "jUSlNznQ-Io";
const LOOP_END = 44; // seconds — loop back to 0 here

const LABELS: Record<string, { pause: string; play: string }> = {
  fr: { pause: "Mettre la vidéo en pause", play: "Relancer la vidéo" },
  en: { pause: "Pause the video", play: "Play the video" },
  es: { pause: "Pausar el vídeo", play: "Reanudar el vídeo" },
  de: { pause: "Video pausieren", play: "Video abspielen" },
  nl: { pause: "Video pauzeren", play: "Video afspelen" },
  pt: { pause: "Pausar o vídeo", play: "Retomar o vídeo" },
  it: { pause: "Metti in pausa il video", play: "Riprendi il video" },
};

// Minimal typing for the YT API we use.
interface YTPlayer {
  mute: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (s: number, allowSeekAhead?: boolean) => void;
  getCurrentTime: () => number;
  destroy: () => void;
}
declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: unknown) => YTPlayer;
      PlayerState: { ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const SMALL_SCREEN = "(max-width: 767px)";

function videoAllowed() {
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData === true;
  return (
    !window.matchMedia(REDUCED_MOTION).matches &&
    !window.matchMedia(SMALL_SCREEN).matches &&
    !saveData
  );
}

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(REDUCED_MOTION), window.matchMedia(SMALL_SCREEN)];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

export default function YouTubeHeroBackground({ poster }: { poster?: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const locale = useLocale();
  const labels = LABELS[locale] || LABELS.fr;

  // Dépend de l'écran et des préférences : faux côté serveur et à
  // l'hydratation (poster seul), puis suivi en direct côté client.
  // YouTube dépose des cookies à la lecture : la vidéo attend l'accord du
  // bandeau cookies ; sinon l'image fixe reste seule.
  const cookiesAcceptes = useCookiesAcceptes();
  const active = useSyncExternalStore(subscribe, videoAllowed, () => false) && cookiesAcceptes;

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !targetRef.current || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player(targetRef.current, {
        // Mode « sans cookies » de YouTube (pas de cookie avant lecture active)
        host: "https://www.youtube-nocookie.com",
        videoId: VIDEO_ID,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 0,
          start: 0,
          end: LOOP_END,
          iv_load_policy: 3,
          cc_load_policy: 0,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.mute();
            if (!pausedRef.current) e.target.playVideo();
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            if (
              window.YT &&
              e.data === window.YT.PlayerState.ENDED &&
              !pausedRef.current
            ) {
              e.target.seekTo(0);
              e.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        createPlayer();
      };
      if (!document.getElementById("yt-iframe-api")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    // Safety loop: if ENDED doesn't fire reliably, seek back near LOOP_END.
    const interval = window.setInterval(() => {
      const p = playerRef.current;
      if (pausedRef.current) return;
      try {
        if (p?.getCurrentTime && p.getCurrentTime() >= LOOP_END - 0.2) {
          p.seekTo(0);
          p.playVideo();
        }
      } catch {
        /* player not ready yet */
      }
    }, 500);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      try {
        playerRef.current?.destroy();
      } catch {
        /* noop */
      }
    };
  }, [active]);

  const togglePause = () => {
    const next = !paused;
    pausedRef.current = next;
    setPaused(next);
    try {
      if (next) playerRef.current?.pauseVideo();
      else playerRef.current?.playVideo();
    } catch {
      /* player not ready yet */
    }
  };

  return (
    <>
      <div className="absolute inset-0 overflow-hidden bg-ink-950" aria-hidden="true">
        {/* Poster: shown until the player is ready, and alone when the video is off */}
        {poster && (
          <Image
            src={poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {active && (
          /* Cover-sized wrapper: 16:9 box that always fills the hero */
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[56.25vw] min-h-[100dvh] min-w-[177.78dvh] pointer-events-none">
            <div ref={targetRef} className="w-full h-full" />
          </div>
        )}
      </div>

      {active && (
        <button
          type="button"
          onClick={togglePause}
          aria-pressed={paused}
          aria-label={paused ? labels.play : labels.pause}
          title={paused ? labels.play : labels.pause}
          className="absolute bottom-8 right-40 z-20 flex items-center justify-center w-10 h-10 border border-cream-50/40 text-cream-50 hover:border-gold-500 hover:text-gold-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
        >
          {paused ? (
            <Play className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          ) : (
            <Pause className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      )}
    </>
  );
}
