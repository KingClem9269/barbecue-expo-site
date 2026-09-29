import { cn } from "@/lib/utils";

/**
 * Légende de photo : jour · heure · lieu · texte · © auteur. Chaque photo du
 * site est datée, située et créditée (les fichiers de William Plin portent
 * déjà leur date : 110426 = samedi 11 avril 2026).
 */
export default function Legende({
  jour,
  heure,
  lieu,
  texte,
  auteur,
  className = "",
}: {
  jour?: string;
  heure?: string;
  lieu?: string;
  texte?: string;
  auteur?: string;
  className?: string;
}) {
  const parties = [jour, heure, lieu, texte, auteur ? `© ${auteur}` : undefined].filter(Boolean);
  return (
    <figcaption className={cn("mt-2 text-[11.5px] leading-snug uppercase tracking-[0.04em] text-fumee", className)}>
      {parties.join(" · ")}
    </figcaption>
  );
}
