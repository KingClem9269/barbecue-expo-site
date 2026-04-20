"use client";
import { useEffect, useRef, useState } from "react";

/**
 * SectionReveal — wraps children in a subtle fade-up animation that triggers
 * once the element enters the viewport. Uses IntersectionObserver + CSS animation
 * (not rAF) so it works even in background tabs.
 *
 * Respects prefers-reduced-motion (animation disabled via CSS).
 *
 * Usage:
 *   <SectionReveal>
 *     <section>...</section>
 *   </SectionReveal>
 *
 * Optional props:
 *   - delay: ms before animation starts (stagger sections)
 *   - threshold: IntersectionObserver threshold (default 0.15)
 *   - once: whether to stop observing after first reveal (default true)
 */
export default function SectionReveal({
  children,
  delay = 0,
  threshold = 0.15,
  once = true,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver isn't available, reveal immediately
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);

    // Safety: ensure visible after a generous timeout (for hidden tabs, etc.)
    const safety = window.setTimeout(() => setVisible(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={`${visible ? "section-reveal-visible" : "section-reveal-hidden"} ${className}`}
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
