// The single, combined philosophy section for the shortened pre-launch
// homepage — replaces the previous three separate sections (Pillars.tsx's
// "Why The Day House", a "What Members Can Expect" treatment, and
// DayInLife.tsx's "How a Day Works"), which are no longer rendered here.
// Both of those components are still used by /our-approach and are left
// untouched — only the homepage stopped importing them.
//
// Deliberately no cards, tiles, icons, numbered steps, or mock schedule —
// the primary statement is the visual anchor, not a grid of content.
export default function OurApproach() {
  return (
    <section id="approach" className="scroll-mt-28 bg-sage-50">
      <div className="section">
        <span className="eyebrow">Our Approach</span>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <h2 className="text-2xl font-semibold leading-snug text-sage-700 sm:text-3xl lg:text-4xl">
            Support should help someone participate in life, not simply keep
            them occupied.
          </h2>

          <div className="space-y-4 text-lg text-ink-700">
            <p>
              At The Day House, members can choose from meaningful
              activities, movement, music, gardening, creative projects,
              shared meals, conversation, or a quieter pace.
            </p>
            <p>
              The environment and support are designed around what each
              person can do, enjoy, and contribute. That means a more
              engaging day for members and dependable time away for family
              caregivers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
