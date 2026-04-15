import {
  ContainerBlok,
  MediaBlok,
  StoryblokComponent,
} from "@/types/storyblok";
import { ComponentRenderer } from "@/lib/ComponentRenderer";
import Image from "next/image";

interface PageHeroBlok {
  backgroundMedia?: MediaBlok;
  content?: StoryblokComponent[];
  darkOverlay?: boolean;
}

export default function PageHero({ blok }: { blok: PageHeroBlok }) {
  const darkOverlay = blok.darkOverlay ? "bg-black/50" : "bg-white/50";
  return (
    <div
      className={`block h-[256px] md:h-[384px] overflow-hidden bg-primary`}
    >
      <div className="relative top-0 left-0 overflow-hidden w-full h-full z-20 flex items-center justify-center">
        {blok.content?.map((nestedBlok: any) => (
          <ComponentRenderer blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
      {blok.darkOverlay ? (
        <div
          className={`absolute top-0 left-0 overflow-hidden w-full h-[256px] md:h-[384px] ${darkOverlay} z-10`}
        ></div>
      ) : (
        <></>
      )}
      {blok.backgroundMedia?.filename ? (
        <div
          className={`absolute top-0 left-0 overflow-hidden w-full h-[256px] md:h-[384px] `}
        >
          <Image
            src={blok.backgroundMedia.filename}
            alt={
              blok.backgroundMedia.alt ||
              blok.backgroundMedia.name ||
              "Background media"
            }
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
