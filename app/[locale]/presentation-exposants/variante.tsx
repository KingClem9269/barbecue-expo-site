"use client";

/**
 * Deux adresses partagent l'estimation de stand (Estimator.tsx) :
 *   /presentation-exposants  la page des campagnes (Meta, LinkedIn…), mesurée :
 *                            PageCampagnes.tsx ;
 *   /pres-exposants          la page des commerciaux : la présentation et le
 *                            catalogue complets (CatalogueClient.tsx), sans
 *                            demande d'e-mail et sans événement de mesure, pour
 *                            que leurs démonstrations ne comptent pas comme des
 *                            prospects dans les campagnes.
 * Les devis demandés depuis la page des commerciaux partent chez Fred comme les
 * autres ; ils portent l'adresse de la page (provenance.page, lib/provenance.ts).
 */

import { createContext, useContext } from "react";

export type Variante = "campagnes" | "commerciaux";

export const VarianteContext = createContext<Variante>("campagnes");

/** Vrai sur la page des campagnes : seule cette adresse envoie des événements de mesure. */
export const useMesuree = () => useContext(VarianteContext) === "campagnes";
