import { StoryRenderer } from "@/lib/StoryRenderer";
import { getPageContent } from "@/lib/content";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[]; locale: string }>;
}) {
  const { slug, locale } = await params;

  const fullSlug = slug ? slug.join("/") : "home";

  const story = await getPageContent(fullSlug, locale);

  if (!story?.content) {
    notFound();
  }

  return <StoryRenderer story={story} />;
}
