import { ParagraphBlok } from "@/types/storyblok";
export default function Paragraph({ blok }: { blok: ParagraphBlok }) {
  return (
    <div
      className={`paragraph text-${blok.color || "primary"} text-${blok.textAlign || "start"} ${blok.bold ? "font-bold" : ""}`}
    >
      <span>{blok.content}</span>
    </div>
  );
}
