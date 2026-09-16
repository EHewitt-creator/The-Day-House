"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export default function CommunityContact() {
  return (
    <section className="bg-peach-100">
      <div className="section flex flex-col items-start gap-6 !py-14 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Referral partners, healthcare professionals, and community organizations
          </h2>
          <p className="mt-3 max-w-xl text-lg text-ink-700">
            If you work with families navigating memory loss or dementia and
            want to learn more about The Day House, we&rsquo;d like to
            connect.
          </p>
        </div>
        <Link
          href="/contact"
          className="btn-primary whitespace-nowrap"
          onClick={() => track("contact_click", { location: "community_contact" })}
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
