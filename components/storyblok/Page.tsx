import { ComponentRenderer } from "@/lib/ComponentRenderer";

export default function Page({ blok }: { blok: any }) {
  return (
    <main>
      {blok.body?.map((nestedBlok: any) => (
        <ComponentRenderer blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
