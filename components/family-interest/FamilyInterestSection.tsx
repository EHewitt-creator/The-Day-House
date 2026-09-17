import FamilyInterestForm from "@/components/family-interest/FamilyInterestForm";

export default function FamilyInterestSection() {
  return (
    <section id="family-interest" className="scroll-mt-28 bg-cream-100">
      <div className="section">
        <div className="max-w-2xl">
          <span className="eyebrow">Interest List</span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Interested in The Day House?
          </h2>
          <p className="mt-5 text-lg text-ink-700">
            We&rsquo;re preparing to open our first Treasure Valley location.
            Join our interest list to receive updates about opening, tours,
            programming, pricing, and enrollment availability.
          </p>
          <p className="mt-3 text-base font-medium text-sage-700">
            Joining the list does not commit you to enrollment. We&rsquo;ll
            use your information only to share Day House updates and better
            understand what local families need.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-ink/5 bg-cream p-6 shadow-soft sm:p-10">
          <FamilyInterestForm />
        </div>
      </div>
    </section>
  );
}
