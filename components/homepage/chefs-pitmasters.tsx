import { ComponentRenderer } from "@/lib/ComponentRenderer";
import {
  ChefCardBlok,
  ChefsAndPitmastersBlok,
  StoryblokComponentBase,
} from "@/types/storyblok";
import Carousel from "../primitives/Carousel";
import ChefCard from "../cards/ChefCard";

export function ChefsPitmasters({
  blok,
}: {
  blok: ChefsAndPitmastersBlok & StoryblokComponentBase;
}) {
  return (
    <div
      className="w-full py-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Colonne 1: Description */}
        <div className="flex flex-col justify-start  element-basic-padding">
          {blok.content?.map((content: any) => (
            <ComponentRenderer blok={content} key={content._uid} />
          ))}
        </div>

        {/* Colonne 2: Chefs Carousel */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 overflow-x-hidden md:pt-16">
          <div className="w-full">
            <Carousel>
              {blok.chefs?.map((chef: ChefCardBlok, index: number) => (
                <ChefCard
                  blok={chef}
                  index={index}
                  key={chef._uid || "chef-card"}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
