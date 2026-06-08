"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed YouTube background for the hero — muted, autoplay, and looped
 * on the 0:00 → LOOP_END segment (not the whole video). Uses the YouTube
 * IFrame Player API so we can seek back to 0 precisely at LOOP_END.
 *
 * The iframe is pointer-events-none (pure decoration) and scaled to cover
 * the container regardless of aspect ratio.
 */

const VIDEO_ID = "jUSlNznQ-Io";
const LOOP_END = 44; // seconds — loop back to 0 here

// Minimal typing for the YT API we use.
interface YTPlayer {
  mute: () => void;
  playVideo: () => void;
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

export default function YouTubeHeroBackground({ poster }: { poster?: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !targetRef.current || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player(targetRef.current, {
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
            e.target.playVideo();
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            if (window.YT && e.data === window.YT.PlayerState.ENDED) {
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
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-950" aria-hidden="true">
      {/* Poster shown until the player is ready */}
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Cover-sized wrapper: 16:9 box that always fills the hero */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[56.25vw] min-h-[100dvh] min-w-[177.78dvh] pointer-events-none">
        <div ref={targetRef} className="w-full h-full" />
      </div>
    </div>
  );
}
