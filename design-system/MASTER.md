# Barbecue Expo 2026 — Design System (Master)

> Source of truth pour le design system. Toute modification visuelle doit respecter ces règles.
> Les pages spécifiques peuvent surcharger ces règles dans `design-system/pages/<page>.md`.

---

## 1. Couleurs (Charte préservée + déclinaisons)

### Tokens de marque (inchangés, rétro-compatibles)

| Tailwind | Hex | Usage |
|----------|-----|-------|
| `bg-primary` / `text-primary` | `#262626` | Textes, titres, fonds dark |
| `bg-secondary` | `#FCF4DA` | Fonds chauds doux |
| `bg-tertiary` | `#F4AD3C` | **Signature** — CTA, accents |

### Échelle GOLD (dérivée de `#F4AD3C`)

Utiliser pour tous les niveaux d'accent jaune/doré.

| Token | Hex | Usage recommandé |
|-------|-----|-----------------|
| `bg-gold-50` | `#FEF8E9` | Backgrounds très doux, hover pâles |
| `bg-gold-100` | `#FCEBBE` | Badges légers |
| `bg-gold-300` | `#F7C874` | Survols, dégradés |
| `bg-gold-500` | `#F4AD3C` | **Signature** (= tertiary) |
| `bg-gold-600` | `#D68B1A` | Hover CTA, texte jaune sur crème |
| `bg-gold-700` | `#A76A10` | Contraste AA, liens visités |
| `bg-gold-900` | `#6B4205` | Ombres dorées, très foncé |

### Échelle INK (dérivée du primary)

Utiliser pour tous les niveaux de gris/noir.

| Token | Hex | Usage recommandé |
|-------|-----|-----------------|
| `bg-ink-50` | `#FAFAFA` | Blanc cassé |
| `bg-ink-100` | `#F5F5F5` | Backgrounds neutres |
| `text-ink-400` | `#737373` | Textes secondaires |
| `text-ink-600` | `#525252` | Textes standards |
| `text-ink-900` | `#262626` | **Textes principaux** (= primary) |
| `bg-ink-950` | `#0E0E0E` | Hero fullscreen, sections cinématiques |

### Échelle CREAM (dérivée du secondary)

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-cream-50` | `#FEFBF0` | Fonds très doux |
| `bg-cream-100` | `#FCF4DA` | **Secondary existant** |
| `bg-cream-200` | `#F5E8B8` | Hover sur cream |

### Accents de soutien (utilisation < 5% du site)

**Ember** — rappel de braise, cohérent BBQ mais ne vole pas la vedette au jaune.

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-ember-400` | `#E17646` | Badges "Nouveau" |
| `bg-ember-600` | `#B8390F` | Accents de feu |
| `bg-ember-800` | `#7C2408` | Très rare, pour contraste fort |

**Char** — brun bois brûlé, pour textures premium.

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-char-700` | `#5A4530` | Bordures premium |
| `bg-char-800` | `#3A2D1F` | Fonds portrait pitmasters |
| `bg-char-900` | `#1F1812` | Textures "charred" |

---

## 2. Typographie

### Polices

| Rôle | Police | Source | Usage |
|------|--------|--------|-------|
| **Display** | `SansPlomb-98` | Local (`/public/SansPlomb-98.woff`) | H1, H2, H3, H4 — **police de marque** |
| **Body** | `Inter Tight` | Google Fonts | Paragraphes, UI, formulaires |

**Règle** : pas d'ajout de nouvelle police sans validation. Ces deux voix suffisent.

### Échelle typographique

Définie dans `globals.css` via les utilitaires Tailwind.

| Niveau | Mobile | Desktop | Classe |
|--------|--------|---------|--------|
| H1 Hero | 48px | 72px+ | `text-4xl md:text-5xl font-bold` (actuel) |
| H2 | 32px | 48px | `text-3xl md:text-5xl font-bold` |
| H3 | 20px | 24px | `text-xl md:text-2xl font-bold` |
| H4 | 16px | 24px | `text-base md:text-2xl font-bold` |
| Body large | 18px | 20px | `text-lg` |
| Body | 16px | 18px | `text-base md:text-lg` (classe `.paragraph`) |
| Caption | 13px | 14px | `text-sm` |

### Règles de lisibilité

- Line-height body : **1.5 à 1.75**
- Line-length max : **65-75 caractères** (environ `max-w-prose`)
- Tracking : valeurs par défaut Tailwind, pas de tracking négatif sur le body
- **Minimum 16px** pour le body sur mobile (évite l'auto-zoom iOS)

---

## 3. Espacement et rythme

Système 4/8pt strict.

| Token | Valeur | Usage |
|-------|--------|-------|
| `p-1` / `gap-1` | 4px | Micro (icônes, badges internes) |
| `p-2` / `gap-2` | 8px | Compact (listes denses) |
| `p-4` / `gap-4` | 16px | Standard (padding cards) |
| `p-6` / `gap-6` | 24px | Section padding mobile |
| `p-8` / `gap-8` | 32px | Section padding desktop |
| `p-12` / `gap-12` | 48px | Entre sections |
| `p-16` / `gap-16` | 64px | Entre grandes sections |
| `p-24` | 96px | Pauses éditoriales |

**Rythme vertical** : entre 2 sections = `py-16` mobile / `py-24 md:py-32` desktop.

---

## 4. Grille et containers

- **Mobile** : 4 colonnes, gouttière 16px
- **Tablet (768+)** : 8 colonnes, gouttière 24px
- **Desktop (1024+)** : 12 colonnes, gouttière 32px
- **Max-width content** : `max-w-7xl` (1280px)
- **Max-width lecture** : `max-w-prose` (65ch)

---

## 5. Responsive breakpoints

Respecter les breakpoints Tailwind natifs :

| Nom | Min-width |
|-----|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

**Mobile-first** : écrire les styles par défaut pour mobile, puis ajouter `md:` pour desktop.

---

## 6. Animations

### Timings standardisés

| Type | Durée | Easing |
|------|-------|--------|
| Hover état | 150-200ms | `ease-out` |
| Clic / press | 100ms | `ease-in` |
| Transition section | 600ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Transition page | 400ms | `ease-in-out` |

### Règles d'or

1. **1-2 animations simultanées max** par viewport
2. **Respect `prefers-reduced-motion`** obligatoire
3. **Animate uniquement `transform` et `opacity`** (performance)
4. **Pas d'auto-play vidéo** sans contrôle utilisateur

---

## 7. Accessibilité (CRITIQUE)

- **Contraste texte** : minimum 4.5:1 (AA) pour body, 3:1 pour larges
- **Focus rings** visibles sur tous éléments interactifs (classe `focus-visible:ring-2 ring-gold-500`)
- **Touch targets** : 44×44px minimum
- **Alt text** descriptif sur toutes les images
- **Hiérarchie H1→H6** propre, pas de saut de niveau

---

## 8. Anti-patterns (à éviter)

- ❌ Ajouter une 3e police ou plus
- ❌ Utiliser `bg-primary text-primary` (noir sur noir)
- ❌ Texte `text-gold-500` sur fond `bg-cream-100` (contraste < 4.5:1 — utiliser `text-gold-700` à la place)
- ❌ Animations décoratives sans signification
- ❌ Icons emoji (utiliser Lucide SVG)
- ❌ Fonts hardcodées dans les composants (utiliser variables CSS)
- ❌ Hex codes en dur dans les composants (utiliser tokens)

---

## Évolution

Ce fichier est la source de vérité. Toute modification du design system doit :
1. Être documentée ici
2. Être appliquée dans `app/[locale]/globals.css`
3. Être testée sur les 7 langues

Dernière mise à jour : Sprint 1 — ajout des échelles Gold/Ink/Cream/Ember/Char, nettoyage des polices inutilisées.
