import Image from "next/image";
import Link from "next/link";
import founderPhoto from "@/public/founders/elvina-and-robbin-home.jpg";

// Deliberately compact — the full founder story (belief, origin, philosophy,
// individual bios) lives on /about now, not here. This is a single trust
// teaser plus a link, not a section to fill space. Copy rewritten 2026-09 to
// lead with why they're building this rather than a résumé-style credential
// list — the fuller version of that same shift is on /about itself.
//
// Photo added 2026-10: a dedicated joint portrait (public/founders/
// elvina-and-robbin-home.jpg), distinct from the more candid outdoor shot
// used on /about (elvina-and-robbin.jpg). Two columns from md: up, photo
// first and roughly 40% of the row; stacked, photo on top, below md:.
// Deliberately NOT wrapped in its own mx-auto/max-w block — that nested
// centering made the whole section look like a narrow island floating in
// the middle of the page instead of lining up with the left edge of
// Program Details above it. It now just fills the standard .section
// width like every other section on the page.
export default function FounderLine() {
  return (
    <div className="section !py-10 sm:!py-12">
      <div className="grid items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-12 md:text-left">
        <Image
          src={founderPhoto}
          alt="Elvina and Robbin Hewitt, founders of The Day House"
          className="aspect-[4/3] w-full rounded-xl2 object-cover"
          placeholder="blur"
          sizes="(min-width: 768px) 40vw, 100vw"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Built from decades of caring for people and families.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-700 md:mx-0">
            The Day House was founded by Elvina Hewitt, RN, MBA, and Robbin
            Hewitt after careers spanning emergency care, aging services,
            community response, and healthcare operations. They&rsquo;re
            building the kind of daytime support they believe families
            should have before caregiving reaches a breaking point.
          </p>
          <Link href="/about" className="btn-ghost mt-3">
            Meet Elvina &amp; Robbin →
          </Link>
        </div>
      </div>
    </div>
  );
}
