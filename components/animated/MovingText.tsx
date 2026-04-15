interface MovingTextBlok {
  text?: string;
  speed?: string; // Animation duration in seconds (e.g., "20s")
}

export default function MovingText({ blok }: { blok: MovingTextBlok }) {
  const text = blok.text || "";
  const speed = blok.speed || "20s";

  return (
    <div
      className="overflow-hidden whitespace-nowrap w-full text-primary font-sans-plomb text-2xl md:text-4xl leading-none mb-4 mt-4 md:mt-2"
    >
      <div
        className="inline-flex"
        style={{
          animation: `scroll ${speed} linear infinite`,
        }}
      >
        {/* Duplicate text for seamless loop */}
        <span className="pr-8">{text}</span>
        <span className="pr-8">●</span>
        <span className="pr-8">{text}</span>
        <span className="pr-8">●</span>
        <span className="pr-8">{text}</span>
        <span className="pr-8">●</span>
        <span className="pr-8">{text}</span>
        <span className="pr-8">●</span>
        <span className="pr-8">{text}</span>
        <span className="pr-8">●</span>
        <span className="pr-8">{text}</span>
        <span className="pr-8">●</span>
        <span className="pr-8">{text}</span>
        <span className="pr-8">●</span>
        <span className="pr-8">{text}</span>
        <span className="pr-8">●</span>
        <span className="pr-8">{text}</span>
      </div>
    </div>
  );
}
