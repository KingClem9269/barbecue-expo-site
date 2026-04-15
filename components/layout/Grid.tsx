import { GridBlok } from "@/types/storyblok";
import { ComponentRenderer } from "@/lib/ComponentRenderer";

export default function Grid({ blok }: { blok: GridBlok }) {
  return (
    <div
      className={`grid md:grid-cols-${blok.nColsMedium || 2} grid-cols-${
        blok.nColsMobile || 1
      } lg:grid-cols-${blok.nColsLarge || 4} h-full w-full gap-${
        blok.gap || "4"
      } `}
    >
      {blok.content?.map((nestedBlok: any) => (
        <ComponentRenderer blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
