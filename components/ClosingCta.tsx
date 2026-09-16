"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

/**
 * Final, compact conversion moment before the footer. Replaces the old
 * full-width three-column brand-promise banner (BrandStatementBanner) —
 * that promise is already stated in the Hero and in the footer, so this
 * section's only job is to give hesitant scrollers one last clear CTA.
 */
export default function ClosingCta() {
  return (
    <section className="bg-terracotta-600 text-cream">
      <div className="section flex flex-col items-center gap-6 !py-14 text-center lg:!py-16">
        <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
          Help shape a better daytime option for Treasure Valley families.
        </h2>
        <Link
          href="/#family-interest"
          className="btn-primary bg-cream !text-terracotta-700 hover:bg-cream-100"
          onClick={() => track("hero_interest_click", { location: "closing_cta" })}
        >
          Join Our Interest List
        </Link>
      </div>
    </section>
  );
}
