export const CloseIcon = ({
  className = "",
  width = 24,
  height = 24,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
};

export const ChevronDownIcon = ({
  className = "",
  width = 24,
  height = 24,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M19 9l-7 7-7-7"></path>
    </svg>
  );
};

export const ArrowOpenIcon = ({
  className = "",
  width = 24,
  height = 24,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
    </svg>
  );
};


