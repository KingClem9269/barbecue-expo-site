"use client";
import WeezeventWidget from "../widget/Weezevent";

export default function IFrame({ blok }: { blok: { code?: string } }) {
  if (!blok.code) {
    return null;
  }

  return (
    <div>
      <WeezeventWidget />
    </div>
  );
}
