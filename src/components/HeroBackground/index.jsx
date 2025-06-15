const HeroBackground = () => {
  return (
    <div className="absolute inset-0 mt-1 w-full h-full overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M0,90 C300,180 900,-10 1440,130 L1440,460 C1000,710 400,420 0,500 Z"
          className="fill-gray-100 dark:fill-gray-800 transition-colors duration-500"
        />

        <path
          d="M0,90 C350,180 900,-10 1440,130"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="10,8"
          fill="none"
          className="text-gray-300 dark:text-white"
        />

        <path
          d="M0,500 C400,420 1000,710 1440,460"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="10,8"
          fill="none"
          className="text-gray-300 dark:text-white"
        />
      </svg>
    </div>
  );
};

export default HeroBackground;
