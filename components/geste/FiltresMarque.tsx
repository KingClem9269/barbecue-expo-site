/**
 * Filtres SVG partagés par les gestes, rendus une fois dans le layout.
 * #encre : bords irréguliers et manques d'encre du Tampon.
 */
export default function FiltresMarque() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <filter id="encre" x="-10%" y="-20%" width="120%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} seed={11} result="bruit" />
        <feColorMatrix
          in="bruit"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 1.55"
          result="trous"
        />
        <feComposite in="SourceGraphic" in2="trous" operator="in" result="encree" />
        <feDisplacementMap in="encree" in2="bruit" scale={2.2} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
