import { StoryRenderer } from "@/lib/StoryRenderer";
import { getPageContent } from "@/lib/content";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[]; locale: string }>;
}) {
  const { slug, locale } = await params;

  const fullSlug = slug ? `blog/${slug.join("/")}` : "blog";

  const story = await getPageContent(fullSlug, locale);

  if (!story?.content) {
    notFound();
  }

  return (
    <>
      <div className="w-full h-[72px] bg-slate-500"></div>
      <StoryRenderer story={story} />
    </>
  );
}
