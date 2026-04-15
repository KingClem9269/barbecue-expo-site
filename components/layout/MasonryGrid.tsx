import { MasonryGridBlok } from "@/types/storyblok";
import { ComponentRenderer } from "@/lib/ComponentRenderer";

export default function MasonryGrid({ blok }: { blok: MasonryGridBlok }) {
  const nColsMobile = blok.nColsMobile || 1;
  const nColsMedium = blok.nColsMedium || 2;
  const nColsLarge = blok.nColsLarge || 4;
  const gap = blok.gap || "4";

  // Convert gap string to rem (Tailwind spacing scale: 4 = 1rem, 8 = 2rem, etc.)
  const gapValue = `${parseInt(gap) * 0.25}rem`;
  const uniqueId = `masonry-${Math.random().toString(36).substring(2, 11)}`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #${uniqueId} {
              column-count: ${nColsMobile};
              column-gap: ${gapValue};
            }
            @media (min-width: 768px) {
              #${uniqueId} {
                column-count: ${nColsMedium};
              }
            }
            @media (min-width: 1024px) {
              #${uniqueId} {
                column-count: ${nColsLarge};
              }
            }
          `,
        }}
      />
      <div
        id={uniqueId}
        className="w-full"
      >
        {blok.content?.map((nestedBlok: any) => (
          <div
            key={nestedBlok._uid}
            className="break-inside-avoid"
            style={{ marginBottom: gapValue }}
          >
            <ComponentRenderer blok={nestedBlok} />
          </div>
        ))}
      </div>
    </>
  );
}
