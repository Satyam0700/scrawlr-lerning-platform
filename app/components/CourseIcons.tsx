export function NextjsIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <div
      className={`bg-black rounded-xl flex items-center justify-center p-2.5 shadow-sm ${className}`}
      aria-label="Next.js"
    >
      <svg
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <mask
          id="mask0_next"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="180"
          height="180"
          style={{ maskType: "alpha" }}
        >
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#mask0_next)">
          <path
            d="M149.508 157.508L69.8335 54.0001H54V126H66.6V69.9481L139.73 165.263C143.155 162.887 146.425 160.293 149.508 157.508Z"
            fill="white"
          />
          <path d="M115.2 54H127.8V126H115.2V54Z" fill="white" />
        </g>
      </svg>
    </div>
  );
}

export function DockerIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      aria-label="Docker"
    >
      <svg
        viewBox="0 0 72 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Containers */}
        {/* Top row */}
        <rect x="22" y="10" width="8" height="6.5" rx="1" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
        <rect x="31" y="10" width="8" height="6.5" rx="1" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
        {/* Middle row */}
        <rect x="13" y="18" width="8" height="6.5" rx="1" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
        <rect x="22" y="18" width="8" height="6.5" rx="1" fill="#0EA5E9" stroke="#0284C7" strokeWidth="1" />
        <rect x="31" y="18" width="8" height="6.5" rx="1" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
        <rect x="40" y="18" width="8" height="6.5" rx="1" fill="#0EA5E9" stroke="#0284C7" strokeWidth="1" />
        {/* Bottom row */}
        <rect x="4" y="26" width="8" height="6.5" rx="1" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
        <rect x="13" y="26" width="8" height="6.5" rx="1" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
        <rect x="22" y="26" width="8" height="6.5" rx="1" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
        <rect x="31" y="26" width="8" height="6.5" rx="1" fill="#0EA5E9" stroke="#0284C7" strokeWidth="1" />
        <rect x="40" y="26" width="8" height="6.5" rx="1" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />

        {/* Whale Body */}
        <path
          d="M68 28.5C65.5 28 62.5 29 60 32C56.5 27 50.5 26.5 48 27C47 27.2 46 27.5 45 28V34C45 34.5 43 35 41 35H3C1.5 35 0.5 36.5 0.5 38C0.5 45 6.5 52 18 53C33 54.3 48 53 58 45C64.5 39.8 67.5 34 68 28.5Z"
          fill="#0284C7"
        />
        {/* Whale Eye */}
        <circle cx="12" cy="42" r="1.5" fill="#FFFFFF" />
        {/* Whale Water spout / tail detail */}
        <path
          d="M60 32C62 30 65 29 68 31C67 27 63 24 59 25"
          stroke="#0284C7"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function TypeScriptIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <div
      className={`bg-[#3178C6] rounded-xl flex items-center justify-center p-2.5 shadow-sm ${className}`}
      aria-label="TypeScript"
    >
      <span className="font-sans font-bold text-white text-2xl tracking-tight select-none">
        TS
      </span>
    </div>
  );
}

export function ReactIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      aria-label="React"
    >
      <svg
        viewBox="-11.5 -10.23174 23 20.46348"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#087ea4]"
      >
        <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
        <g stroke="#00D8FF" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    </div>
  );
}

export function NodejsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      aria-label="Node.js"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M16 2.5L28 9.4V23.2L16 30.1L4 23.2V9.4L16 2.5Z"
          fill="#5FA04E"
          stroke="#417E38"
          strokeWidth="1.5"
        />
        <text
          x="16"
          y="20"
          textAnchor="middle"
          fill="white"
          fontSize="11"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          JS
        </text>
      </svg>
    </div>
  );
}

export function JavaScriptIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div
      className={`bg-[#F7DF1E] rounded-md flex items-center justify-center shadow-xs ${className}`}
      aria-label="JavaScript"
    >
      <span className="font-sans font-bold text-black text-[13px] leading-none select-none tracking-tighter">
        JS
      </span>
    </div>
  );
}

export function getCourseBrandIcon(courseTitleOrSlug?: string, sizeClass = "w-5 h-5") {
  const normalized = (courseTitleOrSlug || "").toLowerCase();
  if (normalized.includes("next")) {
    return <NextjsIcon className={sizeClass} />;
  }
  if (normalized.includes("react")) {
    return <ReactIcon className={sizeClass} />;
  }
  if (normalized.includes("node") || normalized.includes("backend")) {
    return <NodejsIcon className={sizeClass} />;
  }
  if (normalized.includes("typescript")) {
    return <TypeScriptIcon className={sizeClass} />;
  }
  if (normalized.includes("docker") || normalized.includes("devops") || normalized.includes("kubernetes")) {
    return <DockerIcon className={sizeClass} />;
  }
  if (normalized.includes("javascript") || normalized.includes("js")) {
    return <JavaScriptIcon className={sizeClass} />;
  }
  // Default to Next.js
  return <NextjsIcon className={sizeClass} />;
}

