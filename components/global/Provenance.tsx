"use client";

import { useEffect } from "react";
import { releverProvenance } from "@/lib/provenance";

/** Relève la provenance du visiteur à son arrivée (voir lib/provenance.ts). */
export default function Provenance() {
  useEffect(() => {
    releverProvenance();
  }, []);
  return null;
}
