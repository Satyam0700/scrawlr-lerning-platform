export function BottomGraphic() {
  // Height percentages for the vertical silhouette bars from left to right matching the reference image
  const barHeights = [
    28, 42, 60, 85, 72, 54, 38, 24, 40, 52, 68, 92, 100, 78, 64, 48, 62, 80,
    95, 70, 50,
  ];

  return (
    <div
      className="relative w-full h-44 sm:h-56 mt-auto overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Bars container */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-1 sm:gap-2 px-0 h-full opacity-70">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md transition-all"
            style={{
              height: `${h}%`,
              background:
                "linear-gradient(to top, rgba(249, 115, 22, 0.45) 0%, rgba(251, 146, 60, 0.25) 50%, rgba(253, 186, 116, 0.05) 90%, transparent 100%)",
            }}
          />
        ))}
      </div>

      {/* Ambient bottom warm glow overlay */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            "linear-gradient(to top, rgba(249, 115, 22, 0.2) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
