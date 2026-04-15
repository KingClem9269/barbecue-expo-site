import { MediaBlok, StoryblokAsset } from "@/types/storyblok";
import Image from "next/image";

interface MovingLogosBlok {
  logos?: StoryblokAsset[];
  speed?: string; // Animation duration in seconds (e.g., "20s")
  direction?: "left" | "right"; // Animation direction
  size?: "sm" | "md";
}

export default function MovingLogos({ blok }: { blok: MovingLogosBlok }) {
  const speed = blok.speed || "20s";
  const direction = blok.direction || "left";
  const logos = blok.logos || [];
  const animationName = direction === "right" ? "scroll-right" : "scroll";

  const sizeClassname = () => {
    switch (blok.size) {
      case "sm":
        return "w-24 md:w-16 h-24 md:h-16";
      case "md":
        return "w-36 h-36";
      default:
        return "w-36 h-36";
    }
  };

  return (
    <div className="relative overflow-hidden w-screen ml-[-16px] md:ml-[-32px] lg:ml-[-48px] xl:ml-[-64px] px-4md:px-16">
      {/*       
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white via-white/95 via-white/80 to-transparent z-10 pointer-events-none" />


      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white via-white/95 via-white/80 to-transparent z-10 pointer-events-none" />
      */}
      <div
        className="overflow-hidden whitespace-nowrap w-full text-primary font-sans-plomb text-2xl md:text-4xl leading-none mb-4 mt-4 md:mt-2"
      >
        <div
          className="inline-flex w-content "
          style={{
            animation: `${animationName} ${speed} linear infinite `,
          }}
        >
          {logos.map((logo) => (
            <div key={logo?.filename} className={`${sizeClassname()} mr-16`}>
              <Image
                src={logo?.filename}
                alt={logo?.alt || ""}
                width={50}
                height={50}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
          {logos.map((logo) => (
            <div key={logo?.filename} className={`${sizeClassname()} mr-16`}>
              <Image
                src={logo?.filename}
                alt={logo?.alt || ""}
                width={50}
                height={50}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
