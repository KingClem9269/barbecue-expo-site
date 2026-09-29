import type { ReactNode } from "react";

/**
 * Un vrai billet : encoches, perforation, talon. Pour tout ce qui s'achète
 * (pass, masterclasses) et pour le talon « Billetterie » collé en bas sur
 * mobile. La position de la perforation suit la colonne du talon (72 %).
 */
export default function Ticket({
  children,
  talon,
  className = "",
}: {
  children: ReactNode;
  talon: ReactNode;
  className?: string;
}) {
  return (
    <div className={`ticket relative grid grid-cols-[minmax(0,1fr)_28%] bg-[#fffdf8] text-charbon ${className}`}>
      <div className="p-5 min-w-0">{children}</div>
      <div className="border-l-2 border-dashed border-charbon p-4 flex flex-col justify-between items-start gap-3 min-w-0">
        {talon}
      </div>
    </div>
  );
}
