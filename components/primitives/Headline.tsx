import { HeadlineBlok } from "@/types/storyblok";

export default function Headline({ blok }: { blok: HeadlineBlok }) {
  const textAlign = "text-" + (blok.textAlign || "start");

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
        className={`text-${
          blok.color || "primary"
        } text-6xl md:text-8xl lg:text-9xl ${textAlign} headline-rise`}
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
