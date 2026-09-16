"use client";

import Link from "next/link";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { BrandStatementInline } from "@/components/BrandStatement";
import { track } from "@/lib/analytics";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-peach-100 via-cream to-cream">
      <div className="mx-auto grid max-w-content items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="eyebrow">Coming Soon to the Treasure Valley</span>

          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            A better way to spend the day.
          </h1>

          <p className="mt-6 text-xl text-ink-700">
            The Day House is a new daytime community for adults living with
            memory loss and dementia, coming soon to the Treasure Valley.
          </p>

          <p className="mt-4 text-lg text-ink-700">
            We&rsquo;re creating a place built around meaningful days, real
            relationships, movement, creativity, choice, and dignity, while
            giving families dependable daytime support.
          </p>

          <BrandStatementInline className="mt-6" />

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#family-interest"
              className="btn-primary"
              onClick={() => track("hero_interest_click", { location: "hero_primary" })}
            >
              Join Our Interest List
            </Link>
            <Link
              href="/our-approach"
              className="btn-secondary"
            >
              Learn About The Day House
            </Link>
          </div>
        </div>

        <PhotoPlaceholder
          label="Older adults in easy conversation over coffee, natural light, no clinical setting visible"
          aspect="aspect-[5/4]"
          tone="terracotta"
          className="lg:h-full"
        />
      </div>
    </section>
  );
}
