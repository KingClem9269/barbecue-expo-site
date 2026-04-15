"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { CarouselContainerBlok } from "@/types/storyblok";
import { ComponentRenderer } from "@/lib/ComponentRenderer";

export default function CarouselContainer({
  blok,
}: {
  blok: CarouselContainerBlok;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 1,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const isMobile = useIsMobile();

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const defaultChildren = (
    <>
      <div className="bg-slate-400 h-64" />
      <div className="bg-slate-400 h-64" />
      <div className="bg-slate-400 h-64" />
      <div className="bg-slate-400 h-64" />
      <div className="bg-slate-400 h-64" />
      <div className="bg-slate-400 h-64" />
    </>
  );

  const childrenArray = React.Children.toArray(
    blok.content?.map((content: any) => (
      <ComponentRenderer blok={content} key={content._uid} />
    )) || defaultChildren
  ) as React.ReactNode[];
  const itemWidth = blok.slideWidth || "336px";

  return (
    <div className="w-full h-full">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-0">
          {childrenArray.map((child, index) => (
            <div
              key={index}
              className="embla__slide shrink-0"
              style={{
                width: blok.slideWidth || "336px",
                gap: "16px",
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-opacity ${
                index === selectedIndex
                  ? "opacity-100 bg-slate-600"
                  : "opacity-50 bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
