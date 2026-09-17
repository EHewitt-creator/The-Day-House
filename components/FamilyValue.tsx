"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

const CAREGIVER_TIME: { label: string; icon: React.ReactNode }[] = [
  {
    label: "Work",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Attend appointments",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8.5 14.5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Care for other family",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 20s-7-4.4-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.6 12 20 12 20z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Rest",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Run errands",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="4" y="8" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 12h4l1 4h-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="8" cy="20.5" r="1.3" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="17.5" cy="20.5" r="1.3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Simply breathe",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21c-4-2-7-5-7-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4-3 7-7 9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function FamilyValue() {
  return (
    <section className="bg-terracotta-50">
      <div className="section grid items-center gap-12 !py-16 lg:grid-cols-2 lg:!py-20">
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Good days matter for families, too.
          </h2>
          <p className="mt-5 text-lg text-ink-700">
            Dependable daytime support gives caregivers reliable time back,
            while knowing their loved one is engaged and well cared for.
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

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
          {CAREGIVER_TIME.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 rounded-xl2 bg-cream/70 p-4 text-base font-medium text-ink-700"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-terracotta-700">
                {item.icon}
              </span>
              {/* min-w-0 lets this text actually wrap instead of forcing
                  the tile wider than its grid column — without it, a flex
                  item's default min-width is its longest unbreakable word
                  ("appointments"), so on narrow phones that word pushed
                  past the tile's right edge instead of wrapping inside it. */}
              <span className="min-w-0 flex-1">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
