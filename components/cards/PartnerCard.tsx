import { PartnerBlok } from "@/types/storyblok";
import Image from "next/image";
import React from "react";

const PartnerCard = ({ blok }: { blok: PartnerBlok }) => {
  return (
    <div
      key={blok._uid || "partner-card"}
      className="w-full h-[128px] rounded-lg flex flex-col items-center justify-center overflow-hidden"
    >
      {blok.logo?.filename ? (
        <Image
          src={blok.logo?.filename || ""}
          alt={blok.name || blok.logo?.alt || "Partner logo"}
          width={60}
          height={60}
          className="object-contain w-full h-full p-2"
        />
      ) : (
        <span className="text-slate-400 text-sm text-center px-2">
          {blok.name}
        </span>
      )}
      {/*       <div className="paragraph">{blok.name}</div> */}
    </div>
  );
};

export default PartnerCard;
