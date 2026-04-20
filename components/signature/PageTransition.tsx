"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * PageTransition — smoke-like overlay that sweeps up the screen on route changes.
 *
 * Triggered every time the pathname changes. Uses a black overlay with a
 * gradient that quickly covers then uncovers the page, giving a cinematic
 * transition feel without heavy dependencies.
 *
 * Respects prefers-reduced-motion (becomes a simple instant opacity flash).
 */
export default function PageTransition() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "covering" | "revealing">("idle");

  useEffect(() => {
    // Don't animate on first mount — only on path change
    let cancelled = false;
    setState("covering");
    const coverTimer = window.setTimeout(() => {
      if (!cancelled) setState("revealing");
    }, 280); // cover duration
    const idleTimer = window.setTimeout(() => {
      if (!cancelled) setState("idle");
    }, 560); // reveal finishes

    return () => {
      cancelled = true;
      window.clearTimeout(coverTimer);
      window.clearTimeout(idleTimer);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9997] ${
        state === "idle" ? "opacity-0" : ""
      }`}
    >
      {/* Dark sheet that sweeps up from bottom during cover, then slides off top during reveal */}
      <div
        className={`absolute inset-0 bg-ink-950 ${
          state === "covering"
            ? "page-transition-cover"
            : state === "revealing"
              ? "page-transition-reveal"
              : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(14,14,14,1) 0%, rgba(14,14,14,0.97) 40%, rgba(28,25,23,0.8) 100%)",
        }}
      />
      {/* Thin gold line accent that sweeps with it */}
      <div
        className={`absolute inset-x-0 h-px bg-gold-500 ${
          state === "covering"
            ? "page-transition-line-cover"
            : state === "revealing"
              ? "page-transition-line-reveal"
              : "opacity-0"
        }`}
      />
    </div>
  );
}
