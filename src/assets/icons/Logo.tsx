export default function Logo() {
  return (
    <svg
      id="logo-40"
      width="140"
      height="40"
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background part of your logo */}
      <path
        d="M0 20C0 9.61116 9.61116 0 20 0H45C55.3888 0 65 9.61116 65 20V40H20C9.61116 40 0 30.3888 0 20Z"
        fill="#588157"
      ></path>
      <rect x="8" y="8" width="50" height="24" rx="12" fill="#a3b18a"></rect>
      <circle cx="20" cy="20" r="6" fill="#000000"></circle>
      <circle cx="18" cy="18" r="1.5" fill="#ffffff"></circle>
      <circle cx="46" cy="20" r="6" fill="#000000"></circle>
      <circle cx="44" cy="18" r="1.5" fill="#ffffff"></circle>

      {/* Gradient definitions */}
      <defs>
        {/* Light theme gradient */}
        <linearGradient id="lightGradient" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="#588157" />
          <stop offset="100%" stopColor="#a3b18a" />
        </linearGradient>

        {/* Dark theme gradient */}
        <linearGradient id="darkGradient" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="20%" stopColor="#96e6a1" />
          <stop offset="100%" stopColor="#588157" />
        </linearGradient>
      </defs>

      {/* RideOn Text */}
      <text
        x="75"
        y="38"
        fontSize="28"
        fontWeight="bold"
        fontFamily="Roboto Slab, serif"
        className="fill-[url(#lightGradient)] dark:fill-[url(#darkGradient)]"
      >
        RideMate
      </text>
    </svg>
  );
}
