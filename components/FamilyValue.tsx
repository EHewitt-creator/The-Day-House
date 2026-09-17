"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export default function FamilyValue() {
  return (
    <section className="relative overflow-hidden bg-terracotta-50">
      {/* Soft, nonrepresentational accents echoing the Hero's visual
          language — this section is now a single left-aligned paragraph
          (no more icon grid), so on wide screens these keep the right side
          from reading as empty rather than intentionally spacious. They're
          clipped by the section's own overflow-hidden and never affect
          layout or tab order. */}
      <div className="absolute -right-10 top-1/2 hidden h-56 w-56 -translate-y-1/2 rounded-full bg-peach-200/60 blur-2xl lg:block" aria-hidden="true" />
      <div className="absolute right-24 top-1/4 hidden h-24 w-24 rounded-full bg-sage-100/70 blur-xl lg:block" aria-hidden="true" />
      <div className="section relative max-w-2xl">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Good days matter for families, too.
        </h2>
        <p className="mt-5 text-lg text-ink-700">
          Dependable daytime support gives caregivers reliable time to work,
          attend appointments, care for their family, or simply recharge
          while knowing their loved one is engaged and supported.
        </p>
        <div className="mt-8">
          <Link
            href="/#family-interest"
            className="btn-primary"
            onClick={() => track("hero_interest_click", { location: "family_value" })}
          >
            Join the Interest List
          </Link>
        </div>
      </div>
    </section>
  );
}
