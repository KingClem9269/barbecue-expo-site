"use client";

import Image from "next/image";

/**
 * Two-row infinite logo marquee.
 * Row 1 scrolls left → right (scroll-right keyframe).
 * Row 2 scrolls right → left (scroll keyframe).
 * Logos sit in light cards so they stay visible on any background.
 * Each row renders the list ×3 for a seamless -33.333% loop.
 */

const LOGOS = [
  "7a5907deca_napoleoin.png",
  "0710c00822_campingaz.png",
  "c03ec5ca0a_charbroil.png",
  "8dbe912df5_logo-weber-svg-1.png",
  "25eb4257c0_pitboss.png",
  "9ffc7e2043_kamado-joe.png",
  "d37c7b4e80_grillobois.png",
  "efa4b26c2c_barbecook.png",
  "fd46ad7c34_monolith.png",
  "e332600512_soler2.png",
  "be7506edc9_ma-bonne-viande-x-barbecue-expo.png",
  "805fc19129_the-barbecue-compagnie-x-barbecue-expo.jpg",
  "ce441e7ae5_masterbuilt.png",
  "0ee44fae1e_traeger.png",
  "46a68bad93_ofyr2.png",
  "7a1e7585f5_oklahoma-joe-s.png",
  "0404b28de9_char-griller.png",
  "78c2396828_le-marquier.png",
  "c6aae8d21e_bastard.png",
  "406e7d7fe6_eno.png",
  "d4a9d828f1_lake-montagnes-x-barbecue-expo.png",
];

function LogoCard({ file }: { file: string }) {
  return (
    <div className="shrink-0 w-36 md:w-44 h-20 md:h-24 mx-2 flex items-center justify-center bg-cream-50 rounded-sm border border-ink-900/10 p-4">
      <Image
        src={`/content/images/${file}`}
        alt=""
        width={140}
        height={64}
        unoptimized
        className="max-h-full max-w-full object-contain mix-blend-darken"
      />
    </div>
  );
}

function Row({ files, animation, duration }: { files: string[]; animation: string; duration: string }) {
  const tripled = [...files, ...files, ...files];
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max"
        style={{ animation: `${animation} ${duration} linear infinite` }}
      >
        {tripled.map((f, i) => (
          <LogoCard key={`${f}-${i}`} file={f} />
        ))}
      </div>
    </div>
  );
}

export default function BrandLogoMarquee({ fade = "dark" }: { fade?: "dark" | "cream" }) {
  const row2 = [...LOGOS].reverse();
  const fadeR = fade === "cream" ? "from-cream-100" : "from-ink-950";
  const fadeL = fade === "cream" ? "from-cream-100" : "from-ink-950";
  return (
    <div className="relative flex flex-col gap-3 md:gap-4">
      {/* Row 1 — left → right */}
      <Row files={LOGOS} animation="scroll-right" duration="55s" />
      {/* Row 2 — right → left */}
      <Row files={row2} animation="scroll" duration="65s" />

      {/* Edge fades — couleur selon le fond (sombre par défaut, crème sur fond clair) */}
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r ${fadeR} to-transparent`} aria-hidden="true" />
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l ${fadeL} to-transparent`} aria-hidden="true" />
    </div>
  );
}
