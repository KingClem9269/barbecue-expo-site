/**
 * Les chiffres publics du salon, validés par l'organisation : une seule
 * source pour tout le site. Ne pas les réécrire en dur ailleurs ; les textes
 * rédigés en toutes lettres (components/pro/ProHero.tsx et ExhibitorBenefits.tsx)
 * sont à reprendre à la main quand une valeur change. Les cumuls « depuis
 * 2020 » de /le-salon (contenu CMS) sont d'autres chiffres.
 */

export const CHIFFRES = {
  /** Fréquentation de l'édition 2026 */
  visiteurs2026: 26000,
  /** Fréquentation attendue pour l'édition 2027 */
  visiteursAttendus2027: 30000,
  /** Marques internationales de l'édition 2027 */
  marques2027: 250,
  /** Pays représentés à l'édition 2027 */
  pays2027: 20,
} as const;

/** 26 000 (fr), 26,000 (en), 26.000 (de)… selon la langue. */
export function nombre(valeur: number, locale: string) {
  return new Intl.NumberFormat(locale).format(valeur);
}
