"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

// Single-column hero: the previous right-hand card (logo mark, tagline,
// location badge) was dropped as repetitive with the logo already shown in
// the header nav. The location/opening-date info it carried now lives in
// the eyebrow above the headline and in the Practical Launch Details
// section (#details), so nothing it said is lost, just not duplicated here.
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-peach-100 via-cream to-cream">
      <div className="mx-auto max-w-content px-6 pb-16 pt-8 sm:px-8 sm:pt-10 lg:pb-24 lg:pt-16">
        {/* max-w-4xl (not max-w-3xl) specifically because "Meaningful
            connection." at lg:text-6xl (60px) measures ~795px wide — a
            max-w-3xl (768px) column wrapped it into two lines on desktop,
            confirmed with a real getClientRects() measurement, not just a
            screenshot glance (a screenshot at this size can look like one
            line at a casual glance even when it isn't). max-w-4xl (896px)
            clears that with margin at every width from 1024px up. */}
        <div className="max-w-4xl">
          <span className="eyebrow">Coming to the Boise metro area in 2027</span>

          {/* Each phrase is its own line rather than a wrapped sentence, so
              the mobile base size can be picked specifically to keep
              "Meaningful connection." — the longest line — from breaking
              mid-phrase on standard phone widths, while still scaling up
              generously on larger screens.

              The base (sub-640px) size is a fluid clamp rather than a fixed
              text-2xl: measured against the actual rendered font, 24px
              overflows "Meaningful connection." at a 320px viewport (272px
              of available width vs. ~318px of text), so a flat text-2xl
              would wrap on the narrowest phones. clamp(1.25rem, 1rem +
              1.25vw, 1.5rem) holds at exactly 20px at 320px width — measured
              to fit with margin to spare — scales up smoothly, and lands
              back at exactly 1.5rem/24px at the 640px sm: breakpoint, so
              there's no visible jump where it hands off to sm:text-4xl. */}
          {/* mt-2/sm:mt-3/lg:mt-4 on the 2nd and 3rd lines adds breathing
              room between the three phrases (scaled up at the same
              breakpoints as the type itself, so the gap stays proportional
              rather than looking cramped at 60px and oversized at 20px).
              Margin rather than a larger leading-* value on purpose: this
              only opens space between the blocks, it doesn't change how
              tall the text within each line renders, so it can't affect the
              one-line-fit measurements above. */}
          <h1 className="mt-6 font-semibold leading-tight">
            <span className="block text-[clamp(1.25rem,1rem+1.25vw,1.5rem)] sm:text-4xl lg:text-6xl">Purposeful days.</span>
            <span className="mt-2 block text-[clamp(1.25rem,1rem+1.25vw,1.5rem)] sm:mt-3 sm:text-4xl lg:mt-4 lg:text-6xl">Meaningful connection.</span>
            <span className="mt-2 block text-[clamp(1.25rem,1rem+1.25vw,1.5rem)] text-terracotta-700 sm:mt-3 sm:text-4xl lg:mt-4 lg:text-6xl">Dependable respite.</span>
          </h1>

          <p className="mt-6 text-xl text-ink-700">
            The Day House is an adult day program for people who need more
            support than staying home alone can provide and want to continue
            living in their own homes.
          </p>

          <p className="mt-4 text-lg text-ink-700">
            Designed with adults living with memory loss and dementia in
            mind, The Day House provides an engaging, supported day while
            family caregivers have dependable time for work, appointments,
            rest, and everything else life requires.
          </p>

          <p className="mt-4 text-lg font-semibold text-sage-700">
            A dementia diagnosis is not required.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#interest"
              className="btn-primary"
              onClick={() => track("hero_interest_click", { location: "hero_primary" })}
            >
              Join Our Interest List
            </Link>
            <Link href="/#approach" className="btn-secondary">
              See Our Approach
            </Link>
          </div>

          <p className="mt-4 text-sm text-ink-500">
            No commitment. Receive opening updates and help shape the program.
          </p>
        </div>
      </div>
    </section>
  );
}
