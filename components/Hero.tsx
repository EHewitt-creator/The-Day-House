"use client";

import Link from "next/link";
import Image from "next/image";
import logoMark from "@/public/brand/logo-grid.png";
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
            We&rsquo;re creating a warm, adult place built around purpose,
            movement, creativity, choice, and real relationships, with
            dependable daytime support for families.
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
            <Link href="/our-approach" className="btn-secondary">
              Explore Our Approach
            </Link>
          </div>

          <p className="mt-4 text-sm text-ink-500">
            No commitment. Get opening updates and help shape the program.
          </p>
        </div>

        <div className="relative aspect-[5/4] w-full">
          {/* Soft, nonrepresentational color composition — no stock photography. */}
          <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-terracotta-100/60 blur-2xl" aria-hidden="true" />
          <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-sage-100/70 blur-2xl" aria-hidden="true" />
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 rounded-xl2 border border-ink/5 bg-cream/80 p-10 text-center shadow-soft backdrop-blur-sm">
            <Image src={logoMark} alt="" className="h-24 w-24 rounded-2xl shadow-sm sm:h-28 sm:w-28" priority />
            <p className="font-serif text-2xl italic text-sage-700 sm:text-3xl">
              A place to belong, every day.
            </p>
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">
              Treasure Valley, Idaho · Opening 2027
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
