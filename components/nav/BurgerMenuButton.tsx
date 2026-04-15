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
      className="block lg:hidden p-2 cursor-pointer fill-white backdrop-blur-md bg-black/40 border border-white/10 rounded-full"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" fill="#FFFFFF" stroke="white" />
      )}
    </button>
  );
};
