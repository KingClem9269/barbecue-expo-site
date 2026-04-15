"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type CarouselProps = {
  children?: React.ReactNode;
  slideWidth?: string;
};

export default function Carousel({ children, slideWidth }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 1,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const isMobile = useIsMobile();

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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

  const childrenArray = React.Children.toArray(children || defaultChildren);
  const itemWidth = "336px";

  return (
    <div className="w-full relative">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-0">
          {childrenArray.map((child, index) => (
            <div
              key={index}
              className="embla__slide shrink-0"
              style={{
                width: itemWidth,
                minWidth: itemWidth,
                marginLeft: isMobile ? "16px" : "0px",
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 ml-4 rounded-full bg-white/80 hover:bg-white transition-all shadow-md ${
              !canScrollPrev
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-110"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 mr-4 md:mr-8 rounded-full bg-white/80 hover:bg-white transition-all shadow-md ${
              !canScrollNext
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-110"
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
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
        </>
      )}
    </div>
  );
}
