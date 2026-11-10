// Replaces the homepage FAQ (there wasn't a dedicated FAQ component or
// route in this codebase to begin with — see the summary of this change)
// with a single scannable definition list of the facts a visiting family
// actually needs pre-launch. One framing line up top instead of a
// disclaimer repeated on every row.
//
// The list is split into two arrays (DETAILS_BEFORE / DETAILS_AFTER)
// rather than one, so the Full Day / Half Day comparison (2026-11) can sit
// between "Opening" and "Toileting support" as its own properly-headed
// sub-section instead of being forced into a plain dt/dd row, while every
// dl row before and after it keeps the exact same markup and styling as
// before — this is the smallest change that lets the comparison have real
// semantic structure (its own <h3>, a two-up grid) without touching
// anything else in this list.
const DETAILS_BEFORE: { term: string; description: string }[] = [
  {
    term: "Who it's for",
    description:
      "Adults who need daytime support to continue living at home. The program is designed with memory loss and dementia in mind, but a diagnosis is not required.",
  },
  {
    term: "Location",
    description: "Boise metro area, with West Boise and Eagle under active consideration",
  },
  {
    term: "Opening",
    description: "Planned for 2027",
  },
];

const DETAILS_AFTER: { term: string; description: string }[] = [
  {
    term: "Toileting support",
    description:
      "Individualized toileting schedules and bathroom assistance as needed. Members must be able to bear weight and assist with transfers.",
  },
  {
    term: "Participant fit",
    description:
      "Participants must be able to bear weight for supported transfers and participate safely in a shared setting. Fit will be assessed individually.",
  },
  {
    term: "Medication support",
    description:
      "Assistance with self-administered medications based on each member’s care plan. Medication administration will not be offered at launch.",
  },
  {
    term: "Transportation",
    description: "Families will arrange transportation at launch",
  },
];

const SCHEDULE_OPTIONS: {
  label: string;
  hours: string;
  price: string;
  included: string;
}[] = [
  {
    label: "Full Day",
    hours: "8:30 AM–5:30 PM",
    price: "$200 per day",
    included: "Catered lunch and snacks included.",
  },
  {
    label: "Half Day",
    hours: "10:00 AM–2:00 PM",
    price: "$125 per day",
    included: "Catered lunch included.",
  },
];

function DetailRow({ term, description }: { term: string; description: string }) {
  return (
    <div className="grid gap-1 py-5 sm:grid-cols-[220px_1fr] sm:gap-6">
      <dt className="text-sm font-semibold uppercase tracking-wide text-sage-700">{term}</dt>
      <dd className="text-base text-ink-700 sm:text-lg">{description}</dd>
    </div>
  );
}

export default function ProgramDetails() {
  return (
    <section id="details" className="scroll-mt-28">
      <div className="section">
        <span className="eyebrow">Current Launch Plan</span>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          The details families need.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-ink-500">
          These reflect our current plans and may be finalized before
          enrollment opens.
        </p>

        <dl className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
          {DETAILS_BEFORE.map((item) => (
            <DetailRow key={item.term} term={item.term} description={item.description} />
          ))}
        </dl>

        {/* Schedule and planned pricing — a comparison, not a dt/dd row, so
            it gets real heading structure and a two-up layout instead of
            being squeezed into the list's label/value shape. border-t
            continues the same divider rhythm the dl rows use above and
            below it. */}
        <div className="border-t border-ink/10 py-8">
          <h3 className="text-xl font-semibold text-ink sm:text-2xl">
            Schedule and planned pricing
          </h3>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-sage-700">
            Available Monday through Friday
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {SCHEDULE_OPTIONS.map((option) => (
              <div key={option.label} className="rounded-xl2 border border-ink/10 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-sage-700">
                  {option.label}
                </p>
                <p className="mt-3 text-xl font-semibold text-ink sm:text-2xl">
                  {option.hours}
                </p>
                <p className="mt-1 text-xl font-semibold text-ink sm:text-2xl">
                  {option.price}
                </p>
                <p className="mt-3 text-sm text-ink-700">{option.included}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm font-medium text-ink-700">
            Both options include meaningful programming and individualized support.
          </p>

          <div className="mt-6 max-w-2xl">
            <h4 className="text-base font-semibold text-ink">Need more time?</h4>
            <p className="mt-1 text-sm text-ink-500">
              Additional time within regular operating hours may be arranged
              in advance for{" "}
              <strong className="font-semibold text-ink-700">
                $25 per hour, billed in one-hour increments
              </strong>
              . The total daily charge will never exceed{" "}
              <strong className="font-semibold text-ink-700">$200</strong>.
            </p>
          </div>
        </div>

        <dl className="divide-y divide-ink/10 border-t border-ink/10">
          {DETAILS_AFTER.map((item) => (
            <DetailRow key={item.term} term={item.term} description={item.description} />
          ))}
        </dl>
      </div>
    </section>
  );
}
