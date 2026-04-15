import { SectionBlok } from "@/types/storyblok";
import { ComponentRenderer } from "@/lib/ComponentRenderer";

export default function Section({ blok }: { blok: SectionBlok }) {
  // Use anchor field if provided, otherwise fall back to _uid
  const sectionId = blok.anchor || blok._uid;

  return (
    <div
      id={sectionId}
      className={`scroll-mt-24 bg-${blok.backgroundColor || "none"} ${
        blok.height || "h-full"
      } ${blok.padding ? "p-4 md:p-8 lg:p-12 xl:p-16" : "p-0"}`}
    >
      {blok.content?.map((nestedBlok: any) => (
        <ComponentRenderer blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
