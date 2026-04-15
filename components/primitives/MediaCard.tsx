import { MediaBlok } from "@/types/storyblok";
import Image from "next/image";

export const MediaCard = ({
  media,
  children,
  width,
  height,
  className,
}: {
  media: MediaBlok | undefined;
  children: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
}) => {
  return (
    <div
      className={`relative shrink-0 ${width || "w-full"} ${
        height || "h-full"
      } text-start overflow-hidden ${className} rounded-md`}
    >
      {media?.filename ? (
        <div
          className={`${width || "w-full"} ${
            height || "h-full"
          } absolute top-0 left-0  mb-3 mx-auto overflow-hidden`}
        >
          <Image
            src={media.filename}
            alt={media.alt || media.name || "Chef photo"}
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="w-full h-full">
          <span className="text-slate-400 text-xs">Photo</span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 text-white p-2 z-10 w-full">
        {children}
      </div>
      <div className="absolute bottom-0 left-0 h-full bg-black/50 w-full z-0"></div>
    </div>
  );
};
