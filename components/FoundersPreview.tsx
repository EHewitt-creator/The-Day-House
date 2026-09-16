import Link from "next/link";

export default function FoundersPreview() {
  return (
    <section className="section">
      <div className="max-w-3xl">
        <span className="eyebrow">About Us</span>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Built by people who believe dementia care can be better.
        </h2>
        <p className="mt-5 text-lg text-ink-700">
          The Day House was founded by Elvina Hewitt, RN, MBA, and Robbin
          Hewitt.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="flex gap-4 rounded-xl2 border border-ink/5 bg-sage-50 p-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sage-600 font-serif text-lg font-semibold text-cream">
            EH
          </span>
          <div>
            <h3 className="font-semibold text-ink">Elvina Hewitt, RN, MBA</h3>
            <p className="mt-1.5 text-base text-ink-700">
              Direct patient care and clinical leadership in Emergency
              Services, plus direct experience in Adult Day Health.
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-xl2 border border-ink/5 bg-terracotta-50 p-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-terracotta-600 font-serif text-lg font-semibold text-cream">
            RH
          </span>
          <div>
            <h3 className="font-semibold text-ink">Robbin Hewitt</h3>
            <p className="mt-1.5 text-base text-ink-700">
              More than two decades as a firefighter and paramedic, with
              experience in safety, emergency preparedness, operations, and
              community service.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-10 max-w-3xl rounded-xl2 bg-cream-100 p-6 text-lg font-medium text-sage-700 sm:p-8">
        People living with dementia deserve meaningful days filled with
        purpose, choice, connection, and dignity, and families deserve
        dependable support that helps them continue caring for the people
        they love.
      </p>

      <div className="mt-8">
        <Link href="/about" className="btn-secondary">
          Meet Our Founders
        </Link>
      </div>
    </section>
  );
}
