"use client";

import Link from "next/link";
import Image from "next/image";
import logoMark from "@/public/brand/logo-grid.png";
import { JoinedPhrases } from "@/components/BrandStatement";
import { track } from "@/lib/analytics";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-peach-100 via-cream to-cream">
      <div className="mx-auto grid max-w-content items-center gap-12 px-6 pb-16 pt-8 sm:px-8 sm:pt-10 lg:grid-cols-2 lg:pb-24 lg:pt-16">
        <div>
          <span className="eyebrow">Coming Soon to the Treasure Valley</span>

          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            A better way to spend the day.
          </h1>

          <p className="mt-6 text-xl text-ink-700">
            The Day House is a dementia-informed adult day program and
            daytime community for adults living with memory loss and
            dementia.
          </p>

          <p className="mt-4 text-lg text-ink-700">
            A place built around meaningful days, real relationships,
            movement, purpose, laughter, and the freedom to keep doing the
            things that make life feel like life.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#family-interest"
              className="btn-primary"
              onClick={() => track("hero_interest_click", { location: "hero_primary" })}
            >
              Join Our Interest List
            </Link>
            <Link href="/our-approach" className="btn-secondary">
              Explore Our Approach
            </Link>
          </div>

          <p className="mt-4 text-sm text-ink-500">
            No commitment. Get opening updates and help shape the program.
          </p>
        </div>

        {/* No fixed aspect-ratio here on purpose: an aspect-locked box
            derives its height purely from width, but this card's content
            (logo, tagline, location line) has its own roughly-fixed pixel
            height that doesn't shrink with viewport width. On a narrow
            phone the box got shorter than its content needed, and with
            items-center/justify-center centering that overflow evenly,
            the logo image visibly spilled out past the card's top edge.
            Letting the card size to its own content (min-h-full still
            keeps it matching the text column's height when there's room
            to grow, via the parent grid's items-center) fixes that at
            every width. */}
        <div className="relative w-full">
          {/* Soft, nonrepresentational color composition — no stock photography. */}
          <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-terracotta-100/60 blur-2xl" aria-hidden="true" />
          <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-sage-100/70 blur-2xl" aria-hidden="true" />
          <div className="relative flex w-full flex-col items-center justify-center gap-6 rounded-xl2 border border-ink/5 bg-cream/80 p-10 text-center shadow-soft backdrop-blur-sm">
            <Image
              src={logoMark}
              alt=""
              className="h-36 w-36 rounded-3xl shadow-sm sm:h-44 sm:w-44 lg:h-40 lg:w-40 xl:h-44 xl:w-44"
              priority
            />
            <p className="text-lg font-semibold tracking-tight text-sage-700 sm:text-xl">
              <JoinedPhrases dotClassName="text-terracotta-500" />
            </p>
            {/* A non-breaking space between "Opening" and "2027" keeps
                them on the same line as each other whenever this wraps,
                so "2027" never lands alone on its own line. */}
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">
              Treasure Valley, Idaho · Opening&nbsp;2027
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
