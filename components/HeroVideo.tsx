"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroVideo({ blok }: { blok: any }) {
  gsap.registerPlugin(useGSAP);

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create flame element
        const flame = document.createElement("div");
        flame.textContent = "🔥";
        flame.style.position = "absolute";
        flame.style.left = `${x}px`;
        flame.style.top = `${y}px`;
        flame.style.fontSize = "24px";
        flame.style.pointerEvents = "none";
        flame.style.zIndex = "10";
        flame.style.transform = "translate(-50%, -50%)";
        container.appendChild(flame);

        // Animate the flame rising and fading
        const randomX = gsap.utils.random(-20, 20);
        gsap.fromTo(
          flame,
          {
            opacity: 1,
            scale: 0.5,
            y: 0,
            rotation: gsap.utils.random(-30, 30),
          },
          {
            opacity: 0,
            scale: gsap.utils.random(0.8, 1.2),
            y: gsap.utils.random(-80, -120),
            x: `+=${randomX}`,
            rotation: gsap.utils.random(-45, 45),
            duration: gsap.utils.random(0.8, 1.2),
            ease: "power2.out",
            onComplete: () => {
              flame.remove();
            },
          },
        );
      };

      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] lg:h-[700px] overflow-hidden"
    >
      {/* Placeholder video */}
      <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
        <video
          src={
            "https://dicfw56ddakrzcwg.public.blob.vercel-storage.com/teaserbbqexpo"
          }
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Overlay avec logo et texte */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
        <Image
          src={blok.media?.filename}
          alt={blok.media?.alt || ""}
          width={150}
          height={150}
          className="mb-4 h-auto"
        />

        {/*         <h1 className="text-4xl md:text-5xl font-bold text-white">
          {blok.headline}
        </h1> */}
      </div>
    </div>
  );
}
