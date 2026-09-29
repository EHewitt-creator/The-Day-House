import Link from "next/link";

// Deliberately compact — the full founder story (belief, origin, philosophy,
// individual bios) lives on /about now, not here. This is a single trust
// teaser plus a link, not a section to fill space. Copy rewritten 2026-09 to
// lead with why they're building this rather than a résumé-style credential
// list — the fuller version of that same shift is on /about itself.
export default function FounderLine() {
  return (
    <div className="section !py-10 text-center sm:!py-12">
      <h2 className="text-2xl font-semibold sm:text-3xl">
        Built from decades of caring for people and families.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base text-ink-700">
        The Day House was founded by Elvina Hewitt, RN, MBA, and Robbin
        Hewitt after careers spanning emergency care, aging services,
        community response, and healthcare operations. They&rsquo;re
        building the kind of daytime support they believe families should
        have before caregiving reaches a breaking point.
      </p>
      <Link href="/about" className="btn-ghost mt-3">
        Meet Elvina &amp; Robbin →
      </Link>
    </div>
  );
}
