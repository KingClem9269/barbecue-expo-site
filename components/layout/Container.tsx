import { ContainerBlok } from "@/types/storyblok";
import { ComponentRenderer } from "@/lib/ComponentRenderer";
import Image from "next/image";

export default function Container({ blok }: { blok: ContainerBlok }) {
  const customHeight = blok.customHeight
    ? `h-[${blok.customHeight}]`
    : "h-full";
  const customWidth = blok.customWidth ? `w-[${blok.customWidth}]` : "w-full";

  return (
    <div
      className={`block ${blok.paddingMobile ? "p-" + blok.paddingMobile : "0"} 
      ${blok.paddingDesktop ? "md:p-" + blok.paddingDesktop : ""} 
      ${blok.paddingDesktopLarge ? "lg:p-" + blok.paddingDesktopLarge : ""}
       col-span-${blok.colSpanMobile || 12} md:col-span-${
        blok.colSpanDesktop || 12
      } row-span-${
        blok.rowSpanMobile ? "row-span-" + blok.rowSpanMobile : "1"
      } md:row-span-${
        blok.rowSpanDesktop ? "row-span-" + blok.rowSpanDesktop : "1"
      } bg-${blok.backgroundColor || "none"} relative ${
        customHeight || "h-full"
      } ${customWidth || "w-full"}`}
    >
      <div className=" relative top-0 left-0 overflow-hidden w-full h-full z-10">
        {blok.content?.map((nestedBlok: any) => (
          <ComponentRenderer blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
      {blok.backgroundMedia?.filename ? (
        <div className={`absolute top-0 left-0 overflow-hidden w-full h-full`}>
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
