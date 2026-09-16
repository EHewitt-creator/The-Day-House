/**
 * Stand-in for real photography. Clearly labeled so it's obvious in the
 * browser and in code where a real photo needs to be dropped in later.
 * Swap for a Next.js <Image> once photography is available.
 */
export default function PhotoPlaceholder({
  label,
  aspect = "aspect-[4/3]",
  tone = "sage",
  className = "",
}: {
  label: string;
  aspect?: string;
  tone?: "sage" | "terracotta" | "peach";
  className?: string;
}) {
  const toneClasses: Record<string, string> = {
    sage: "bg-sage-100 text-sage-700 border-sage-300/60",
    terracotta: "bg-terracotta-50 text-terracotta-700 border-terracotta-100",
    peach: "bg-peach-100 text-terracotta-700 border-peach-300",
  };

  return (
    <div
      className={`flex ${aspect} w-full flex-col items-center justify-center gap-2 rounded-xl2 border-2 border-dashed p-6 text-center ${toneClasses[tone]} ${className}`}
      role="img"
      aria-label={`Placeholder for future photography: ${label}`}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="opacity-70"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="10" r="1.75" stroke="currentColor" strokeWidth="1.5" />
        <path d="M21 16l-5.5-5-9.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-sm font-semibold">Photo placeholder</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}
