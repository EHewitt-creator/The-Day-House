import Link from "next/link";

// Deliberately compact — the full founders section (photos, individual
// bios) previously lived here as FoundersPreview.tsx. That component still
// exists and still renders on /about; it's just no longer imported by the
// homepage. This is a single trust line plus a link, not a section to fill
// space.
export default function FounderLine() {
  return (
    <div className="section !py-10 text-center sm:!py-12">
      <p className="mx-auto max-w-2xl text-base text-ink-700">
        Founded by Elvina Hewitt, RN, MBA, and Robbin Hewitt. Their
        backgrounds span direct care, Adult Day Health, emergency services,
        and operations.
      </p>
      <Link href="/about" className="btn-ghost mt-3">
        Meet the Founders
      </Link>
    </div>
  );
}
