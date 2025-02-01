export function PizzaIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Pizza slice shape */}
      <path
        d="M12 3L3 20H21L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Crust texture */}
      <path
        d="M12 3L3 20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3L21 20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Toppings */}
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="9" cy="15" r="1" fill="currentColor" />
      <circle cx="15" cy="15" r="1" fill="currentColor" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}
