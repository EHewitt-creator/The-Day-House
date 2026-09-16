import type { Metadata } from "next";
import CareerForm from "@/components/CareerForm";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the team building The Day House, a new dementia daytime program opening soon in the Treasure Valley. Care partner, activities, nursing, and operations roles.",
};

export default function CareersPage() {
  return (
    <section className="section">
      <span className="eyebrow">Careers</span>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">
        Want to help build The Day House?
      </h1>
      <p className="mt-6 max-w-2xl text-xl text-ink-700">
        We&rsquo;re building a team of thoughtful, dependable people who
        genuinely enjoy spending time with older adults and believe care can
        be better.
      </p>
      <p className="mt-4 max-w-2xl text-lg font-medium text-sage-700">
        Experience in dementia care is valuable. Seeing the person before the
        diagnosis is essential.
      </p>

      <div className="mt-12 max-w-3xl rounded-2xl border border-ink/5 bg-cream-100 p-6 shadow-soft sm:p-10">
        <CareerForm />
      </div>
    </section>
  );
}
