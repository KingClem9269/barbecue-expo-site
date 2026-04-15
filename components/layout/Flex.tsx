import { GridBlok, StoryblokComponent } from "@/types/storyblok";
import { ComponentRenderer } from "@/lib/ComponentRenderer";

export interface FlexBlok {
  content?: StoryblokComponent[];
  direction?: "col" | "row";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center";
  gap?: "0" | "4";
  gapDesktop?: "0" | "4" | "8" | "16";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
}

export default function Flex({ blok }: { blok: FlexBlok }) {
  return (
    <div
      className={`flex flex-${blok.direction || "row"} justify-${
        blok.justify || "start"
      } items-${blok.align || "start"} gap-${blok.gap || "4"} ${
        blok.gapDesktop ? "md:gap-" + blok.gapDesktop : ""
      } ${blok.wrap ? "flex-wrap" : ""}`}
    >
      {blok.content?.map((nestedBlok: any) => (
        <ComponentRenderer blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
