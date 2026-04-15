import { ArticleContentBlok } from "@/types/storyblok";
import { ComponentRenderer } from "@/lib/ComponentRenderer";
import { Link } from "@/i18n/navigation";

export default function ArticleContent({ blok }: { blok: ArticleContentBlok }) {
  return (
    <div className="article-content p-4 md:px-32 lg:px-64 xl:px-96 md:pb-16">
      <div className="flex items-center gap-2 mb-4">
        <div>
          <Link href="/" className="text-slate-500 hover:text-slate-700">
            BBQ Expo
          </Link>
        </div>
        <div>{">"}</div>
        <div>
          <Link href="/blog" className="text-slate-500 hover:text-slate-700">
            Blog
          </Link>
        </div>
        <div>{">"}</div>
        <div> {blok.headline} </div>
      </div>
      <h2 className="headline mb-4">{blok.headline}</h2>
      <div className="article-content-body [&>*:not(:last-child)]:mb-4">
        {blok.content?.map((content: any) => (
          <ComponentRenderer blok={content} key={content._uid} />
        ))}
      </div>
    </div>
  );
}
