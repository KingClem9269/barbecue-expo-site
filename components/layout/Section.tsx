import { SectionBlok } from "@/types/storyblok";
import { ComponentRenderer } from "@/lib/ComponentRenderer";
import SectionReveal from "@/components/primitives/SectionReveal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Section({ blok }: { blok: SectionBlok & { disableReveal?: boolean } }) {
  // Use anchor field if provided, otherwise fall back to _uid
  const sectionId = blok.anchor || blok._uid;

  const inner = (
    <div
      id={sectionId}
      className={`scroll-mt-24 bg-${blok.backgroundColor || "none"} ${
        blok.height || "h-full"
      } ${blok.padding ? "p-4 md:p-8 lg:p-12 xl:p-16" : "p-0"}`}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {blok.content?.map((nestedBlok: any) => (
        <ComponentRenderer blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );

  if (blok.disableReveal) return inner;
  return <SectionReveal>{inner}</SectionReveal>;
}
