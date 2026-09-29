"use client";

import { useRef, type ReactNode } from "react";
import { MOUVEMENT_REDUIT } from "@/lib/motion/jetons";

/**
 * L'exception · La Braise — quelques braises montent du bouton au survol.
 * Un seul endroit sur le site : l'appel à la billetterie.
 */
export default function Braise({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const derniere = useRef(0);

  const allumer = () => {
    const el = ref.current;
    if (!el || !el.animate || window.matchMedia(MOUVEMENT_REDUIT).matches) return;
    const now = performance.now();
    if (now - derniere.current < 450) return;
    derniere.current = now;
    for (let i = 0; i < 7; i++) {
      const p = document.createElement("span");
      p.className = "braise-p";
      p.style.left = `${12 + Math.random() * 76}%`;
      el.appendChild(p);
      const dx = (Math.random() - 0.5) * 26;
      const dy = -(34 + Math.random() * 46);
      p.animate(
        [
          { transform: "translate(-50%, 0) scale(0.5)", opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), ${dy}px) scale(1)`, opacity: 0.9, offset: 0.6 },
          { transform: `translate(calc(-50% + ${dx * 1.3}px), ${dy * 1.35}px) scale(0.3)`, opacity: 0 },
        ],
        { duration: 650 + Math.random() * 450, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", delay: i * 40, fill: "both" },
      ).onfinish = () => p.remove();
    }
  };

  return (
    <span ref={ref} className={`relative inline-flex ${className}`} onPointerEnter={allumer}>
      {children}
    </span>
  );
}
