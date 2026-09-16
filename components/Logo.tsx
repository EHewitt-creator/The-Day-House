import Link from "next/link";
import Image from "next/image";
import logoMark from "@/public/brand/logo-grid.png";

/**
 * Wordmark + icon, using the real brand mark (cropped from the approved
 * logo artwork in public/brand/logo-grid.png — the four-color grid with
 * the leaf accent). Swap that source file if the mark is ever redesigned;
 * every use on the site (nav, footer, favicon, Open Graph image) reads
 * from the same file.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 ${className}`}
      aria-label="The Day House — home"
    >
      <Image
        src={logoMark}
        alt=""
        className="h-9 w-9 shrink-0 rounded-lg shadow-sm"
        priority
      />
      <span className="font-serif text-xl font-semibold leading-none text-ink">
        The Day House
      </span>
    </Link>
  );
}
