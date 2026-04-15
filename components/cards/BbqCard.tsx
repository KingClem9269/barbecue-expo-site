import {
  ContainerBlok,
  EventCardBlok,
  LinkBlok as LinkBlokType,
  MediaBlok,
  StoryblokLink,
} from "@/types/storyblok";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { CountryFlag } from "./ChefCard";

import LinkBlok from "../primitives/LinkBlok";

export interface BbqCardBlok {
  title?: string;
  country?: string;
  paragraph?: string;
  media?: MediaBlok;
  link?: LinkBlokType[];
  linkedPage?: {
    _uid?: string;
    story?: {
      url?: string;
    };
  };
  _uid?: string;
}

export default function BbqCard({ blok }: { blok: BbqCardBlok }) {
  return (
    <Link href={"/" + blok.linkedPage?.story?.url || ""}>
      <div
        className="relative w-full h-[320px] rounded-md overflow-hidden group hover:cursor-pointer"
      >
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <Image
            src={blok.media?.filename || ""}
            alt={blok.media?.alt || ""}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute bottom-0 z-20 text-white p-2 w-full">
          <div className="p-2 group-hover:mb-1 bg-black/50 backdrop-blur-md group-hover:backdrop-blur-lg transition-all duration-300 rounded-md flex flex-col justify-between items-center">
            <div className="flex flex-row items-center justify-between gap-2 w-full">
              <h3 className="event-card-title font-sans-plomb leading-none pb-1">
                {blok.title}
              </h3>
              {blok.country && <CountryFlag country={blok.country} />}
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="event-card-subtitle-text mb-2">{blok.paragraph}</p>
              {blok.link?.map((nestedBlok: any) => (
                <div
                  key={blok._uid}
                  className="flex flex-row items-center gap-2 border px-2 py-1"
                >
                  <span>{nestedBlok.label}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
