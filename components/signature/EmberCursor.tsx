"use client";
import { useEffect, useRef } from "react";

/**
 * EmberCursor — signature cursor trail for desktop.
 *
 * Listens to pointer move and spawns short-lived gold/ember particles
 * that rise and fade. Disabled on:
 *  - touch devices (no hover capability)
 *  - reduced-motion preference
 *  - inside inputs/textareas/selects (UX friendliness)
 *
 * Uses raw DOM + CSS for performance (no React re-render on mousemove).
 */
export default function EmberCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnRef = useRef(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip on touch devices and reduced motion
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!canHover || reducedMotion) return;

    // Avoid spawning too fast (every ~45ms and only if mouse moved enough)
    const SPAWN_MIN_INTERVAL_MS = 45;
    const SPAWN_MIN_DISTANCE = 8;
    const MAX_LIVE_PARTICLES = 16;

    let liveCount = 0;

    const spawn = (x: number, y: number) => {
      if (liveCount >= MAX_LIVE_PARTICLES) return;
      const ember = document.createElement("div");
      const size = 4 + Math.random() * 5; // 4–9 px
      ember.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, #FCEBBE 0%, #F4AD3C 45%, rgba(184,57,15,0.5) 85%, transparent 100%);
        box-shadow: 0 0 6px rgba(244,173,60,0.6), 0 0 12px rgba(184,57,15,0.25);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        will-change: transform, opacity;
        opacity: 1;
      `;
      container.appendChild(ember);
      liveCount++;

      const dx = (Math.random() - 0.5) * 30;
      const dy = -(60 + Math.random() * 80);
      const duration = 700 + Math.random() * 500;
      const scale = 0.6 + Math.random() * 0.8;

      const anim = ember.animate(
        [
          { opacity: 1, transform: `translate(-50%, -50%) scale(0.4)` },
          {
            opacity: 0,
            transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`,
          },
        ],
        { duration, easing: "cubic-bezier(0.22, 0.8, 0.36, 1)", fill: "forwards" },
      );
      anim.onfinish = () => {
        ember.remove();
        liveCount--;
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      // Skip when hovering inputs/textareas/selects/etc.
      const target = e.target as Element | null;
      if (
        target &&
        typeof (target as HTMLElement).closest === "function" &&
        (target as HTMLElement).closest(
          "input, textarea, select, [contenteditable='true']",
        )
      ) {
        return;
      }

      const now = performance.now();
      const last = lastPosRef.current;
      const dx = last ? e.clientX - last.x : Infinity;
      const dy = last ? e.clientY - last.y : Infinity;
      const dist = Math.hypot(dx, dy);

      if (
        now - lastSpawnRef.current < SPAWN_MIN_INTERVAL_MS ||
        dist < SPAWN_MIN_DISTANCE
      ) {
        return;
      }

      lastSpawnRef.current = now;
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      spawn(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  // Container is fixed full-screen but transparent; particles are appended to it
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998]"
    />
  );
}
