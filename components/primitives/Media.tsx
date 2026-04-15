import { StoryblokAsset } from "@/types/storyblok";
import Image from "next/image";

export interface MediaBlok {
  media?: StoryblokAsset | undefined;
  customClass?: string;
  _uid?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export default function Media({ blok }: { blok: MediaBlok }) {
  const objectFit = blok.objectFit || "cover";
  return (
    <div
      className={`h-full w-full overflow-hidden max-h-[640px] ${blok.customClass || ""}`}
    >
      {blok.media?.filename ? (
        <Image
          src={blok.media?.filename || ""}
          alt={blok.media?.alt || ""}
          width={400}
          height={400}
          className={`w-full h-full object-${objectFit}`}
        />
      ) : (
        <div className="w-full h-full bg-slate-200"></div>
      )}
    </div>
  );
}
