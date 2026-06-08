"use client";

import Image from "next/image";

/** Single-row auto-scrolling photo gallery (event photos). */

const DEFAULT_PHOTOS = [
  "/photos-2026/bbq-expo-066.jpg",
  "/photos-2026/bbq-expo-105.jpg",
  "/photos-2026/bbq-expo-184.jpg",
  "/photos-2026/bbq-expo-403.jpg",
  "/photos-2026/bbq-expo-720.jpg",
  "/photos-2026/william-plin-jpc-110426-533a4088.jpg",
  "/photos-2026/william-plin-jpc-120426-533a6497.jpg",
  "/photos-2026/bbq-expo-293.jpg",
  "/photos-2026/bbq-expo-477.jpg",
  "/photos-2026/bbq-expo-737.jpg",
];

export default function PhotoMarquee({ photos = DEFAULT_PHOTOS }: { photos?: string[] }) {
  const tripled = [...photos, ...photos, ...photos];
  return (
    <div className="relative overflow-hidden">
      <div className="flex w-max" style={{ animation: "scroll 70s linear infinite" }}>
        {tripled.map((p, i) => (
          <div key={i} className="w-72 md:w-[26rem] aspect-[3/2] mx-2 shrink-0 rounded-sm overflow-hidden bg-ink-900">
            <Image src={p} alt="" width={416} height={277} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-ink-950 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-ink-950 to-transparent" aria-hidden="true" />
    </div>
  );
}
