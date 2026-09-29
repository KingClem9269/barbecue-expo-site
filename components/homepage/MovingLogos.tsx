import { StoryblokAsset } from "@/types/storyblok";
import Image from "next/image";
import MarqueePause from "@/components/primitives/MarqueePause";

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
  // Liste ×3 : les keyframes scroll / scroll-right bouclent sur -33,333 %.
  const tripled = [...logos, ...logos, ...logos];

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
    <div
      data-marquee
      className="relative overflow-hidden w-screen ml-[-16px] md:ml-[-32px] lg:ml-[-48px] xl:ml-[-64px] px-4 md:px-16"
    >
      <div className="overflow-hidden whitespace-nowrap w-full text-primary font-sans-plomb text-2xl md:text-4xl leading-none mb-4 mt-4 md:mt-2">
        <div
          className="inline-flex w-max marquee-track"
          style={{ "--marquee-name": animationName, "--marquee-duration": speed } as React.CSSProperties}
        >
          {tripled.map((logo, i) => (
            <div key={`${logo?.filename}-${i}`} className={`${sizeClassname()} mr-16`}>
              <Image
                src={logo?.filename}
                alt={i < logos.length ? logo?.alt || "" : ""}
                width={50}
                height={50}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <MarqueePause tone="dark" />
      </div>
    </div>
  );
}
