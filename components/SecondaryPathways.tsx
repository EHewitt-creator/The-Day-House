"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

/**
 * Compact teasers for the two audiences who shouldn't compete with the
 * primary family journey on the homepage: job seekers and referral /
 * community partners. Each links out to its own dedicated page, which is
 * where the full career-interest form and detailed contact options live.
 */
export default function SecondaryPathways() {
  return (
    <section className="bg-sage-900 text-cream-100">
      <div className="section grid gap-10 !py-12 md:grid-cols-2 md:divide-x md:divide-cream-100/10 md:!py-16">
        <div className="md:pr-10">
          <span className="inline-block rounded-full bg-cream-100/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-terracotta-400">
            Careers
          </span>
          <h2 className="mt-4 text-2xl font-semibold text-cream-100 sm:text-3xl">
            Want to help build The Day House?
          </h2>
          <p className="mt-4 text-base text-cream-100/85">
            We&rsquo;re building a team of thoughtful, dependable people who
            genuinely enjoy this work and believe care can be better.
            Dementia care experience is valuable.
          </p>
          <div className="mt-6">
            <Link
              href="/careers"
              className="btn-secondary !border-cream-100/40 !text-cream-100 hover:!bg-cream-100/10"
              onClick={() => track("career_click", { location: "homepage_teaser" })}
            >
              Explore Careers
            </Link>
          </div>
        </div>

        <div className="md:pl-10">
          <span className="inline-block rounded-full bg-cream-100/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-terracotta-400">
            Partners &amp; Community
          </span>
          <h2 className="mt-4 text-2xl font-semibold text-cream-100 sm:text-3xl">
            Work with families navigating memory loss or dementia?
          </h2>
          <p className="mt-4 text-base text-cream-100/85">
            If you support families navigating memory loss or dementia and
            want to learn more, we&rsquo;d like to connect.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="btn-secondary !border-cream-100/40 !text-cream-100 hover:!bg-cream-100/10"
              onClick={() => track("contact_click", { location: "homepage_teaser" })}
            >
              Connect With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
