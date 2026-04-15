import { ContainerBlok, EventCardBlok, MediaBlok } from "@/types/storyblok";
import { ArrowRight, ArrowRightIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export interface CookingEventCardBlok {
  title?: string;
  date?: string;
  media?: MediaBlok;
  path?: string;
}

export default function CookingEventCard({
  blok,
}: {
  blok: CookingEventCardBlok;
}) {
  return (
    <Link href={blok.path || ""}>
      <div
        className="relative w-full h-[256px] rounded-md overflow-hidden group hover:cursor-pointer"
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
          <div className="p-2 group-hover:mb-1 bg-black/50 backdrop-blur-md group-hover:backdrop-blur-lg transition-all duration-300 rounded-md flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <h4 className="text-xl event-card-title font-sans-plomb leading-none">
                {blok.title}
              </h4>
              <div className="flex flex-row items-center gap-1">
                <ClockIcon className="w-4 h-4" />

                <p className="event-card-date text-sm font-inter-tight font-bold">
                  {blok.date}
                </p>
              </div>
            </div>
            <ArrowRightIcon className="w-4 h-4" />
            {/*           <p className="event-card-subtitle-text">{blok.subtitle}</p> */}
          </div>
        </div>
        {/*       <div className="border grow h-full p-2 rounded-br-md rounded-tr-md">
        <div className="event-card-content">
          <h3 className="event-card-title font-sans-plomb text-xl">
            {blok.title}
          </h3>
        </div>
        <div className="event-card-subtitle">
          <p className="event-card-subtitle-text">{blok.subtitle}</p>
        </div>
        <div></div>
        <p className="event-card-date">{blok.date}</p>
      </div> */}
      </div>
    </Link>
  );
}
