import { ProgrammationCardsSectionBlok } from "@/types/storyblok";
import Carousel from "../primitives/Carousel";
import ProgrammationCard from "../cards/ProgrammationCard";
import { ComponentRenderer } from "@/lib/ComponentRenderer";

const Programmation = ({ blok }: { blok: ProgrammationCardsSectionBlok }) => {
  return (
    <div className="w-full">
      <div className="element-basic-padding">
        {blok.content?.map((content: any) => (
          <ComponentRenderer blok={content} key={content._uid} />
        ))}

        <div className="overflow-x-hidden w-full pl-0">
          <Carousel>
            {blok.cards?.map((card, index) => (
              <ComponentRenderer blok={card} key={index.toString()} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Programmation;
