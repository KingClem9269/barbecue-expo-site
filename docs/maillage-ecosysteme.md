# Maillage écosystème — suivi des liens (barbecue-expo.fr)

Stratégie de netlinking entre les 5 plateformes. Source de vérité technique : [`lib/ecosystem.ts`](../lib/ecosystem.ts).
Composant de rendu : [`components/ecosystem/EcosystemLinks.tsx`](../components/ecosystem/EcosystemLinks.tsx).

## Sites de l'écosystème

| Clé | Site | URL | État |
|---|---|---|---|
| `mag` | Barbecue Mag | https://www.barbecue-mag.fr | ✅ en ligne (hub éditorial) |
| `fest` | Barbecue Fest | https://www.barbecue-fest.com/paris/ | ✅ en ligne |
| `piment` | Le Piment d'Or | https://lepimentdor.com/championnat | ✅ en ligne (championnat sauces) |
| `coupe` | Coupe de France de Barbecue | https://www.coupe-de-france-barbecue.com | ⚠️ **hors-ligne** → `enabled:false` |

> Quand la Coupe sera en ligne : basculer `coupe.enabled = true` dans `lib/ecosystem.ts` → tous ses liens (grill-arena, footer, agenda…) s'activent automatiquement.

## Liens sortants implémentés (depuis barbecue-expo.fr)

| ID | Page source | URL | Emplacement | Destinations | Ancre | Statut |
|----|-------------|-----|-------------|--------------|-------|--------|
| L1 | Grill Arena | `/grill-arena` | bloc avant CTA final | Coupe*, Mag | bloc « Les autres rendez-vous du feu » | ✅ (Coupe masquée tant que hors-ligne) |
| L2 | Fiches pitmasters ×15 | `/pitmasters/[slug]` | bloc « Pour aller plus loin » | Mag | nom de marque + blurb | ✅ |
| L3 | Billetterie | `/billetterie` | après widget Weezevent | Fest, Piment | bloc écosystème | ✅ |
| L4 | Street Food | `/program/bbq-street-food` | après CTA | Fest, Mag | bloc écosystème | ✅ |
| L5 | Exposants | `/exposants` | après l'annuaire marques | Mag, Fest | bloc écosystème | ✅ |
| L6 | Footer (toutes pages) | global | sous le menu footer | Mag, Fest, Piment, Coupe* | « Notre écosystème » | ✅ |
| L7 | Agenda (pilier) | `/agenda` | cartes événements + bloc | Fest, Piment, Expo, Coupe* | cartes datées + bloc | ✅ **nouveau** |

\* Coupe masquée automatiquement (site hors-ligne).

## Correctifs effectués

- 🔧 Street Food : lien `/billetterie/particulier` (page legacy) → `/billetterie` (canonique).
- 🔧 Sitemap : ajout de `/agenda`.

## Mesure (GA4 `G-YBVVEXBHWM`)

- Chaque clic sortant émet l'événement GA4 **`outbound_ecosystem`** avec `{ site, location }`.
- À suivre dans GA4 : Rapports → Engagement → Événements → `outbound_ecosystem` (ventiler par paramètre `site`).
- À configurer (admin GA4, hors code) : **mesure inter-domaines** + exclusion de référents pour les 5 domaines → parcours cross-site correctement attribué.

## Liens ENTRANTS à demander aux autres agents (rappel)

| Depuis | Vers (mes pages) | Ancre | Prio |
|---|---|---|---|
| **Barbecue Mag** (tests/articles marques) | `/exposants`, `/presentation-exposants` | « retrouvez [marque] au salon **Barbecue Expo** » | 🔴 |
| Barbecue Mag (interviews pitmasters) | `/pitmasters/[slug]` | nom du pitmaster | 🔴 |
| Barbecue Fest (partenaires) | `/devenez-exposants`, `/pro` | « le salon pro **Barbecue Expo** » | 🟠 |
| Coupe de France (partenaires/équipements) | `/grill-arena`, `/exposants` | « la Grill Arena de **Barbecue Expo** » | 🟠 |
| Le Piment d'Or (sponsors sauces) | `/exposants` (sauces) | « marques de sauces au salon Barbecue Expo » | 🟡 |

## Prochaines étapes (contenu — nécessite rédaction)

- [ ] Remplir les **descriptions des 30 marques** (`content/brands/index.json` : 3/30 actuellement) → permettra des fiches `/marques/[slug]` non-thin.
- [ ] Articles blog « angle marché/pro » avec liens sortants vers Mag (le blog ne contient que 3 articles démo).
- [ ] Étendre le schéma marques (`barbecueMagUrl`, `festPartner`…) pour le maillage par entité.
- [ ] Coordination inter-agents : base d'entités partagée (proposition : Supabase, déjà en place côté CRM).
