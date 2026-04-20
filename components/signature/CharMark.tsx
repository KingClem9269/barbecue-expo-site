/**
 * CharMark — signature decorative element.
 *
 * Two variants:
 *  - <CharCorners />: 4 corner accents (top-left, top-right, bottom-left, bottom-right)
 *    to frame premium sections or cards. Styled with char-800 brown and gold-500 dots.
 *  - <CharDivider />: horizontal separator with a burnt-looking gold line and dot accents.
 *    Used between sections to break rhythm elegantly.
 *
 * Pure SVG, no client JS needed. Drop-in decorative only (aria-hidden).
 */

export function CharCorners({
  className = "",
  accent = "gold-500",
  ...rest
}: {
  className?: string;
  accent?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  // We wrap children via positioning; user places this inside a relative parent.
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      {...rest}
    >
      {/* Top-left */}
      <svg
        className={`absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 text-${accent}`}
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M2 14V2H14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <circle cx="2" cy="2" r="1.2" fill="currentColor" />
      </svg>
      {/* Top-right */}
      <svg
        className={`absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 text-${accent}`}
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M18 2H30V14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <circle cx="30" cy="2" r="1.2" fill="currentColor" />
      </svg>
      {/* Bottom-left */}
      <svg
        className={`absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 text-${accent}`}
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M2 18V30H14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <circle cx="2" cy="30" r="1.2" fill="currentColor" />
      </svg>
      {/* Bottom-right */}
      <svg
        className={`absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 text-${accent}`}
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M18 30H30V18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <circle cx="30" cy="30" r="1.2" fill="currentColor" />
      </svg>
    </div>
  );
}

export function CharDivider({
  className = "",
  accent = "gold-500",
  label,
}: {
  className?: string;
  accent?: string;
  label?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 w-full ${className}`}
    >
      <span className={`h-px bg-${accent} flex-1 max-w-[160px] opacity-80`} />
      <span className={`w-1.5 h-1.5 rounded-full bg-${accent}`} />
      {label && (
        <span
          className={`text-${accent} text-xs uppercase tracking-widest font-semibold px-2`}
        >
          {label}
        </span>
      )}
      <span className={`w-1.5 h-1.5 rounded-full bg-${accent}`} />
      <span className={`h-px bg-${accent} flex-1 max-w-[160px] opacity-80`} />
    </div>
  );
}
