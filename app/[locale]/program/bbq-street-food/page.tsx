import { StoryRenderer } from "@/lib/StoryRenderer";
import { getPageContent } from "@/lib/content";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[]; locale: string }>;
}) {
  const { locale } = await params;

  const story = await getPageContent("program/bbq-street-food", locale);

  if (!story?.content) {
    notFound();
  }

  return <StoryRenderer story={story} />;
}
