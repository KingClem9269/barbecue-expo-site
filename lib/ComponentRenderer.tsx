import { ComponentType } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlokComponent = ComponentType<{ blok: any; index?: number }>;

// Module-level registry — populated by StoryRenderer before first render
// This avoids circular dependencies: components import ComponentRenderer,
// and StoryRenderer imports components + registers them here.
const registry: { map: Record<string, BlokComponent> } = { map: {} };

export function registerComponents(map: Record<string, BlokComponent>) {
  registry.map = map;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ComponentRenderer({ blok }: { blok: any }) {
  if (!blok?.component) return null;

  const Component = registry.map[blok.component];
  if (!Component) {
    console.warn(`[ComponentRenderer] Unknown component: "${blok.component}"`);
    return null;
  }

  return <Component blok={blok} />;
}
