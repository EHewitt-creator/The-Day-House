"use client";

import Link from "next/link";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { track } from "@/lib/analytics";

export default function FamilyValue() {
  return (
    <section className="bg-terracotta-50">
      <div className="section grid items-center gap-12 !py-16 lg:grid-cols-2 lg:!py-20">
        <PhotoPlaceholder
          label="An adult child or spouse at work or relaxed at home, at ease"
          tone="peach"
          aspect="aspect-[5/4]"
        />

        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Good days matter for families, too.
          </h2>
          <p className="mt-5 text-lg text-ink-700">
            The Day House is designed to give caregivers reliable time to
            work, rest, run errands, care for others, or simply recharge,
            while knowing their loved one is supported and engaged.
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
      </div>
    </section>
  );
}
