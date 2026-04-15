import { ProgrammationCardBlok } from "@/types/storyblok";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MediaCard } from "@/components/primitives/MediaCard";

const ProgrammationCard = ({ blok }: { blok: ProgrammationCardBlok }) => {
  return (
    <div
      key={blok._uid || "programmation-card"}
    >
      <MediaCard
        media={blok.media || {}}
        key={blok._uid || "programmation-card"}
        width="w-full"
        height="h-[200px]"
      >
        <p className="text-lg">{blok.title}</p>
        {blok.link && (
          <Link href={blok.link?.url || ""} className="text-blue-500">
            {blok.link_label || "En savoir plus"}
          </Link>
        )}
        {/*       {blok.content?.map((content: any) => (
        <StoryblokServerComponent blok={content} key={content._uid} />
      ))} */}
      </MediaCard>
    </div>
  );
};

export default ProgrammationCard;
