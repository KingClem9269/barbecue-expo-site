import { BlogPageBlok } from "@/types/storyblok";
import { Link } from "@/i18n/navigation";
import { MediaCard } from "../primitives/MediaCard";
import { ArrowRightIcon } from "lucide-react";

const BlogCard = ({
  blogPage,
  index,
  className,
}: {
  blogPage: BlogPageBlok;
  index: number;
  className: string;
}) => {
  return (
    <Link
      href={`/blog/${blogPage.slug}`}
      key={index}
      className={`w-full h-full ${className}`}
    >
      <MediaCard
        media={blogPage.content?.body?.[0]?.preview_image}
        key={index.toString()}
        width="w-full"
        height="h-full"
      >
        <div className="flex flex-row justify-between items-center">
          <h4>{blogPage.content?.body?.[0]?.headline}</h4>
          <ArrowRightIcon className="w-4 h-4" />
        </div>
      </MediaCard>
    </Link>
  );
};

export default BlogCard;
