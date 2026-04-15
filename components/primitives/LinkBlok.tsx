import { LinkBlok as LinkBlokType } from "@/types/storyblok";
import { Link } from "@/i18n/navigation";
import { ArrowOpenIcon } from "../icons";
import { ArrowRightIcon } from "lucide-react";

export default function LinkBlok({
  blok,
  className,
}: {
  blok: LinkBlokType;
  className?: string;
}) {
  const btnStyle = () => {
    switch (blok.style) {
      case "filled-dark":
        return "text-lg bg-primary text-white px-4 py-2";
      case "filled-light":
        return "text-lg bg-secondary text-primary px-4 py-2";
      case "outline-dark":
        return "text-lg border border-primary text-primary px-4 py-2";
      case "outline-light":
        return "text-lg border border-secondary text-secondary px-4 py-2";
      case "link":
        return "text-lg text-primary underline";
      default:
        return "text-lg bg-primary text-primary-foreground px-4 py-2 rounded-md";
    }
  };

  const fullWidth = blok.fullWidth ? "w-full" : "";

  return (
    <div
      className={`${btnStyle()} ${fullWidth} ${className}`}
    >
      <Link
        className="flex flex-row items-center gap-2"
        href={blok.path || "/"}
      >
        <span>{blok.label}</span>
        {blok.icon === "arrow-right" && <ArrowRightIcon className="w-4 h-4" />}
        {blok.icon === "arrow-external-link" && (
          <ArrowOpenIcon className="w-4 h-4" />
        )}
      </Link>
    </div>
  );
}
