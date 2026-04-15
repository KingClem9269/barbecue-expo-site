import { ComponentRenderer } from "@/lib/ComponentRenderer";

export default function CenteredTextBlock({ blok }: { blok: any }) {
  return (
    <div className="centered-text-block">
      {blok.content?.map((content: any) => (
        <ComponentRenderer blok={content} key={content._uid} />
      ))}
    </div>
  );
}
