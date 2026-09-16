import CareerForm from "@/components/CareerForm";

export default function CareersSection() {
  return (
    <section id="careers-form" className="bg-sage-900 text-cream-100">
      <div className="section !text-cream-100">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-cream-100/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-terracotta-400">
            Careers
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-cream-100 sm:text-4xl">
            Want to help build The Day House?
          </h2>
          <p className="mt-5 text-lg text-cream-100/85">
            We&rsquo;re building a team of thoughtful, dependable people who
            genuinely enjoy spending time with older adults and believe care
            can be better.
          </p>
          <p className="mt-4 text-lg font-medium text-cream-100">
            Experience in dementia care is valuable. Seeing the person before
            the diagnosis is essential.
          </p>
        </div>

        <div className="mt-12 rounded-2xl bg-cream p-6 text-ink shadow-soft sm:p-10">
          <CareerForm />
        </div>
      </div>
    </section>
  );
}
