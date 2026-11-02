"use client";

import Image from "next/image";
import MarqueePause from "@/components/primitives/MarqueePause";

/** Single-row auto-scrolling photo gallery (event photos). */

const DEFAULT_PHOTOS = [
  "/photos-2026/bbq-expo-066.jpg",
  "/photos-editions/533a7509.jpg",
  "/photos-2026/bbq-expo-105.jpg",
  "/photos-2026/bbq-expo-154.jpg",
  "/photos-editions/j7i3281.jpg",
  "/photos-2026/bbq-expo-184.jpg",
  "/photos-editions/bbqexpo-mars24-ninacoriton-114.jpg",
  "/photos-2026/william-plin-jpc-120426-533a7138.jpg",
  "/photos-2026/bbq-expo-403.jpg",
  "/photos-editions/img-7929.jpg",
  "/photos-2026/bbq-expo-789.jpg",
  "/photos-2026/bbq-expo-720.jpg",
  "/photos-editions/j7i1640.jpg",
  "/photos-2026/william-plin-jpc-110426-533a4088.jpg",
  "/photos-2026/bbq-expo-645.jpg",
  "/photos-editions/bbqexpo-mars24-ninacoriton-053.jpg",
  "/photos-2026/william-plin-jpc-120426-533a6497.jpg",
  "/photos-2026/bbq-expo-765.jpg",
  "/photos-editions/j7i2225.jpg",
  "/photos-2026/bbq-expo-293.jpg",
  "/photos-2026/william-plin-jpc-110426-533a3838.jpg",
  "/photos-editions/j7i1963.jpg",
  "/photos-2026/bbq-expo-477.jpg",
  "/photos-2026/bbq-expo-563.jpg",
  "/photos-editions/img-8188.jpg",
  "/photos-2026/bbq-expo-737.jpg",
  "/photos-2026/william-plin-jpc-120426-533a7828.jpg",
  "/photos-editions/j7i1575.jpg",
  "/photos-2026/bbq-expo-073.jpg",
  "/photos-2026/william-plin-jpc-110426-533a4065.jpg",
  "/photos-editions/bbqexpo-mars24-ninacoriton-130.jpg",
  "/photos-2026/bbq-expo-615.jpg",
  "/photos-editions/j7i1328.jpg",
  "/photos-2026/bbq-expo-155.jpg",
  "/photos-2026/william-plin-jpc-120426-533a7139.jpg",
  "/photos-editions/img-7808.jpg",
  "/photos-2026/bbq-expo-404.jpg",
  "/photos-editions/bbqexpo-mars24-ninacoriton-021.jpg",
  "/photos-2026/william-plin-jpc-110426-533a4426.jpg",
  "/photos-editions/j7i1281.jpg",
  "/photos-2026/bbq-expo-740.jpg",
  "/photos-editions/bbqexpo-mars24-ninacoriton-046.jpg",
  "/photos-2026/william-plin-jpc-110426-533a4931.jpg",
];

/** Seconds per photo: the band keeps the same speed whatever its length. */
const SECONDS_PER_PHOTO = 7;

export default function PhotoMarquee({ photos = DEFAULT_PHOTOS }: { photos?: string[] }) {
  const tripled = [...photos, ...photos, ...photos];
  return (
    <div data-marquee className="flex flex-col gap-3">
      <div className="relative overflow-hidden">
        <div
          className="flex w-max marquee-track"
          style={{ "--marquee-name": "scroll", "--marquee-duration": `${photos.length * SECONDS_PER_PHOTO}s` } as React.CSSProperties}
        >
          {tripled.map((p, i) => (
            <div key={i} className="w-72 md:w-[26rem] aspect-[3/2] mx-2 shrink-0 rounded-sm overflow-hidden bg-ink-900">
              <Image src={p} alt="" width={416} height={277} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-ink-950 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-ink-950 to-transparent" aria-hidden="true" />
      </div>
      <div className="flex justify-end">
        <MarqueePause tone="light" />
      </div>
    </div>
  );
}
