"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export default function FamilyValue() {
  return (
    <section className="bg-terracotta-50">
      <div className="section grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10">
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Good days matter for families, too.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-ink-700">
            Dependable daytime support gives caregivers reliable time to work,
            attend appointments, care for their family, or simply recharge
            while knowing their loved one is engaged and supported.
          </p>
        </div>
        <Link
          href="/#family-interest"
          className="btn-primary justify-self-start"
          onClick={() => track("hero_interest_click", { location: "family_value" })}
        >
          Join the Interest List
        </Link>
      </div>
    </section>
  );
}
