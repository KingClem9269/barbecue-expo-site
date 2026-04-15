import { ChefCardBlok } from "@/types/storyblok";

import { MediaCard } from "@/components/primitives/MediaCard";
import { Link } from "@/i18n/navigation";
import { ArrowOpenIcon } from "../icons";
import Image from "next/image";

export const CountryFlag = ({ country }: { country: string }) => {
  return (
    <div>
      <Image
        src={`/flags/${country}.svg`}
        alt={country}
        width={20}
        height={20}
        className="w-4 h-4 rounded-full"
      />
    </div>
  );
};

const ChefCard = ({ blok, index }: { blok: ChefCardBlok; index: number }) => {
  return (
    <div
      key={blok._uid || "chef-card"}
    >
      <a target="_blank" href={blok.link?.url} rel="noopener noreferrer">
        <MediaCard
          media={blok.media || {}}
          key={(index && index.toString()) || blok._uid || "chef-card"}
          width="w-[320px]"
          height="h-[412px]"
          className="rounded-sm border border-slate-300/20 shadow-md mb-2"
        >
          <div className="flex flex-row justify-between w-full bg-black/50 p-2 rounded-md backdrop-blur-md hover:mb-2 transition-all duration-300">
            <div>
              <p className="text-xl font-sans-plomb">{blok.name}</p>
              <div className="flex flex-row items-center gap-2">
                {blok.country && <CountryFlag country={blok.country} />}
                <p className="text-sm font-inter-tight">{blok.stand}</p>
              </div>
            </div>
            <ArrowOpenIcon className="h-4 w-4" />
          </div>
        </MediaCard>
      </a>
    </div>
  );
};

export default ChefCard;
