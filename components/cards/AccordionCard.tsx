"use client";

import { StoryblokComponent } from "@/types/storyblok";
import { ComponentRenderer } from "@/lib/ComponentRenderer";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export interface AccordionCardBlok {
  _uid?: string;
  color?: string;
  contentShown?: ( StoryblokComponent )[];
  contentHidden?: ( StoryblokComponent )[];
}

export default function AccordionCard({ blok }: { blok: AccordionCardBlok }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`bg-${blok.color || "white"} overflow-hidden p-4 self-start`}
    >
      <div 
        className="flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={toggleAccordion}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 flex-1">
            {blok.contentShown?.map((content: StoryblokComponent) => (
              <ComponentRenderer blok={content} key={content._uid} />
            ))}
          </div>
          {blok.contentHidden && blok.contentHidden.length > 0 && (
            <div className="shrink-0 ml-2">
              {isExpanded ? (
                <Minus className="w-5 h-5 transition-opacity duration-300" />
              ) : (
                <Plus className="w-5 h-5 transition-opacity duration-300" />
              )}
            </div>
          )}
        </div>
      </div>
      {blok.contentHidden && blok.contentHidden.length > 0 && (
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-[5000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="flex flex-col gap-2 pt-2 border-t border-black/20">
            {blok.contentHidden.map((content: StoryblokComponent) => (
              <ComponentRenderer blok={content} key={content._uid} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
