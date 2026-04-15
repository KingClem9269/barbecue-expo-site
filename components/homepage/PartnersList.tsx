import {
  PartnerBlok,
  PartnersBlok,
  StoryblokComponentBase,
} from "@/types/storyblok";
import Carousel from "../primitives/Carousel";
import PartnerCard from "../cards/PartnerCard";

export function PartnersList({
  blok,
}: {
  blok: PartnersBlok & StoryblokComponentBase;
}) {
  return (
    <div className="w-full ">
      <div className="element-basic-padding">
        <h2 className="headline">Partenaires</h2>
        <div className="w-full overflow-x-hidden">
          <Carousel>
            {blok.partners?.map((partner: PartnerBlok, index: number) => (
              <PartnerCard
                blok={partner}
                key={partner._uid || "partner-card"}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
