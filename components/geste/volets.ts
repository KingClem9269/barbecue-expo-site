/** Mécanique commune aux cases à volets (Tableau, CompteARebours). */

const JEU = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:·";

/** Aligne un texte sur une largeur fixe de cases. */
export function aligner(texte: string, largeur: number) {
  return texte.toUpperCase().slice(0, largeur).padEnd(largeur, " ");
}

/** Change le caractère d'une case avec un battement de volet. */
function battre(caseEl: HTMLElement, ch: string) {
  const s = caseEl.firstElementChild as HTMLElement | null;
  if (!s) return;
  s.textContent = ch;
  s.animate?.(
    [{ transform: "scaleY(1)" }, { transform: "scaleY(0.08)" }, { transform: "scaleY(1)" }],
    { duration: 70 },
  );
}

/** Fait défiler quelques caractères au hasard puis s'arrête sur la cible. */
export function defiler(caseEl: HTMLElement, cible: string, delai: number, pas: number) {
  let i = 0;
  let t = window.setTimeout(function tic() {
    if (i < pas) {
      battre(caseEl, JEU.charAt(Math.floor(Math.random() * JEU.length)));
      i++;
      t = window.setTimeout(tic, 42);
    } else {
      battre(caseEl, cible);
    }
  }, delai);
  return () => window.clearTimeout(t);
}
