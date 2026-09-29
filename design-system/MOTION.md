# Barbecue Expo — Motion « Marqué au feu »

> Source de vérité pour toute animation du site. Banc d'essai : la page `/lab`
> (non indexée, absente de la production). Toute nouvelle animation y passe
> avant d'entrer dans une page.

---

## 1. Principes

1. **Un geste = une action de cuisson.** Si on ne peut pas le nommer (saisir, tamponner, afficher, trancher, retourner, sonder), on n'anime pas.
2. **Lent pour l'ambiance, sec pour l'action.** Une boucle de braises dure 6 s, un tampon 180 ms. Rien entre les deux « par défaut ».
3. **Une section, un geste.** Seule l'ouverture de l'accueil a droit à une séquence de deux (Saisie du titre, puis le « B » tracé).
4. **Le contenu est là avant l'animation.** L'état de repos d'un geste est son état final : c'est ce que montrent le rendu serveur, les navigateurs sans JavaScript et le mode « mouvement réduit ». Un élément déjà visible au chargement n'est jamais caché puis révélé.
5. **Réduire n'est pas supprimer.** Chaque geste a sa version « mouvement réduit », écrite en même temps que lui.
6. **Le motion paie sa place.** Seuls `transform`, `opacity`, `clip-path` et `mask` sont animés. Budget : 30 Ko gzip de JS motion au premier chargement de l'accueil, LCP mobile ≤ 2,5 s, INP ≤ 200 ms.

## 2. Jetons

Définis dans `app/[locale]/globals.css`, miroir JS dans `lib/motion/jetons.ts`.

| Jeton | Valeur | Usage |
|---|---|---|
| `--duree-tap` | 120 ms | Appui, focus |
| `--duree-ui` | 200 ms | Survol, ouverture de menu |
| `--duree-geste` | 480 ms | Tampon, retournement, soulignement |
| `--duree-scene` | 650 ms | Découpe |
| `--duree-saisie` | 900 ms | Saisie d'un titre |
| `ease-saisie` | `cubic-bezier(.7, 0, .2, 1)` | Attaque franche, arrêt net |
| `ease-tampon` | `cubic-bezier(.3, 1.5, .5, 1)` | Impact, léger rebond |
| `ease-sortie` | `cubic-bezier(.2, .8, .2, 1)` | Survols, sorties |
| `--angle-marque` | `-27deg` | Inclinaison des traits du « B » (mesurée : 26°) |
| `--decalage` | 60 ms | Entre traits, lignes, cases |

Trois courbes, pas une de plus. En Tailwind : `ease-saisie`, `duration-(--duree-ui)`.

## 3. Les gestes

Tous dans `components/geste/`. Les gestes CSS passent par `<Declencheur>`, qui pose `data-geste` : `repos` → `pret` (seulement si hors écran) → `joue` → `fin`.

| Geste | Composant | Quand | Mouvement réduit |
|---|---|---|---|
| 1 · La Saisie | `<Saisie as="h1" mode="chargement">` | Titres d'affiche, grands chiffres. Jamais sur du texte courant. | Titre affiché directement |
| 2 · La Marque | `<Trait variante="court-1">`, classe `.lien-marque`, `<TraceB>` | Soulignements, puces, séparateurs, état actif, chargements | Trait affiché sans tracé |
| 3 · Le Tampon | `<Tampon angle={-9}>` | Early bird, complet, nouveau, pastilles Awards, « reçu » | Tampon posé directement |
| 4 · Le Tableau | `<Tableau>`, `<CompteARebours>` | Horaires, résultats, chiffres clés (à la place des compteurs) | Texte final, sans volets |
| 5 · La Découpe | `<Decoupe scenes actif>` | Jours du programme, Grand public / Pro, puis pages (phase 2) | Changement direct |
| 6 · Le Retournement | `<Fiche recto verso>` | Fiches pitmasters, jury Awards | Fondu recto / verso |
| 7 · Le Thermomètre | `<Thermometre>` | Articles, devis exposant, candidature Awards | Barre sans transition |
| L'exception · La Braise | `<Braise>` | Le bouton Billetterie, et lui seul | Aucune braise |

Modes de déclenchement : `vue` (à l'entrée dans l'écran, par défaut) ou `chargement` (dès le premier affichage, en CSS pur : le HTML serveur porte déjà `data-geste="joue"`).

### Les traits du « B »

Les 14 coups de pinceau du monogramme sont extraits de `public/logo_b_only.svg` (script de simplification, tolérance 0,7) :

- `lib/marque/traits-b.ts` : les 14 traits dans l'orientation du logo, pour `<TraceB>` ;
- `public/marque/trait-*.svg` : 7 traits remis à l'horizontale (4 longs, 3 courts), utilisés en masque CSS.

Ne pas redessiner ces traits : si le fichier source du logo évolue, relancer l'extraction.

## 4. Chorégraphie de l'accueil (phase 2)

| Section | Geste | Déclenchement |
|---|---|---|
| Affiche d'ouverture | Saisie du titre, puis `<TraceB>` | Chargement, moins de 1,5 s au total |
| Programme XXL | Marque (puces) | Entrée dans l'écran |
| Grill Arena | Tableau | Entrée dans l'écran |
| Pitmasters | Retournement | Clic ou tap |
| Plan du salon | Tampon léger des pictos | Entrée dans l'écran |
| Partenaires, récits | Aucun | · |
| Billet | Tampon « Early bird » + Braise | Entrée dans l'écran, survol |

## 5. Interdits

- Pas de défilement détourné (Lenis & co.), pas de parallaxe généralisée, pas de curseur personnalisé.
- Pas de fondu montant générique sur chaque section, pas de compteur qui défile, pas de zoom photo au survol, pas de flèche ↗ qui glisse.
- Pas de particules, halos ou lueurs ailleurs que sur le bouton Billetterie.
- Pas de boucle infinie sans bouton pause (WCAG 2.2.2) : voir `MarqueePause`.
- Pas de GSAP ni de bibliothèque chargée globalement : import dynamique, page par page. GSAP n'est plus importé nulle part ; le déclarer dans `package.json` quand un geste en aura besoin (SplitText, Flip, DrawSVG).
