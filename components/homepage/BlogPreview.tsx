import { BlogPageBlok, BlogPreviewBlok } from "@/types/storyblok";

import BlogCard from "../cards/BlogCard";

export function BlogPreview({ blok }: { blok: BlogPreviewBlok }) {
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-4 h-[412px]">
        {blok.articles?.map((item: BlogPageBlok, index: number) => (
          <BlogCard
            key={index}
            blogPage={item}
            index={index}
            className={index === 0 ? "md:row-span-2" : "md:col-span-1"}
          />
        ))}
      </div>
    </div>
  );
}
