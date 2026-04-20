import { Menu, X } from "lucide-react";

export const BurgerMenuButton = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="block lg:hidden p-2.5 cursor-pointer text-white backdrop-blur-md bg-ink-950/50 border border-white/20 rounded-full hover:border-gold-500 hover:text-gold-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <X className="h-5 w-5" strokeWidth={2} />
      ) : (
        <Menu className="h-5 w-5" strokeWidth={2} />
      )}
    </button>
  );
};
