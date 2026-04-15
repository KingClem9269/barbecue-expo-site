"use client";
import { HeadlineBlok } from "@/types/storyblok";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Headline({ blok }: { blok: HeadlineBlok }) {
  gsap.registerPlugin(useGSAP); // register any plugins, including the useGSAP hook

  const container = useRef<HTMLHeadingElement>(null);
  const textAlign = "text-" + (blok.textAlign || "start");
  useGSAP(
    () => {
      gsap.to(container.current, {
        duration: 1.5,
        yPercent: -15,
        ease: "power4",
        stagger: 0.1,
      });
    },
    { scope: container }
  );

  if (blok.heading == "h1") {
    return (
      <h1
        className={`text-${blok.color || "primary"} ${textAlign} leading-none`}
      >
        {blok.content}
      </h1>
    );
  }
  if (blok.heading == "h2") {
    return (
      <h2
        className={`text-${blok.color || "primary"} ${textAlign}`}
      >
        {blok.content}
      </h2>
    );
  }
  if (blok.heading == "h3") {
    return (
      <h3
        className={`text-${blok.color || "primary"} ${textAlign} leading-none`}
      >
        {blok.content}
      </h3>
    );
  }
  if (blok.heading == "h4") {
    return (
      <h4
        className={`text-${blok.color || "primary"} ${textAlign}`}
      >
        {blok.content}
      </h4>
    );
  }
  if (blok.heading == "h5") {
    return (
      <h5
        className={`text-${blok.color || "primary"} ${textAlign}`}
      >
        {blok.content}
      </h5>
    );
  }
  if (blok.heading == "hero") {
    return (
      <h1
        ref={container}
        className={`text-${
          blok.color || "primary"
        } text-6xl md:text-8xl lg:text-9xl ${textAlign} translate-y-[20px]`}
      >
        {blok.content}
      </h1>
    );
  }
  return (
    <h2
      className={`text-${blok.color || "primary"} ${textAlign}`}
    >
      {blok.content}
    </h2>
  );
}
