// Replaces the homepage FAQ (there wasn't a dedicated FAQ component or
// route in this codebase to begin with — see the summary of this change)
// with a single scannable definition list of the facts a visiting family
// actually needs pre-launch. One framing line up top instead of a
// disclaimer repeated on every row.
const DETAILS: { term: string; description: string }[] = [
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
  {
    term: "Core hours",
    description: "9:00 AM–4:30 PM",
  },
  {
    term: "Daily rate",
    description: "Anticipated at $200 per full day",
  },
  {
    term: "Included",
    description:
      "Programming, a catered lunch, snacks, scheduled toileting, and bathroom assistance within program scope",
  },
  {
    term: "Participant fit",
    description:
      "Participants must be able to bear weight for supported transfers and participate safely in a shared setting. Fit will be assessed individually.",
  },
  {
    term: "Medications",
    description: "Medication administration and reminders will not be available at launch",
  },
  {
    term: "Transportation",
    description: "Families will arrange transportation at launch",
  },
];

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
          {DETAILS.map((item) => (
            <div key={item.term} className="grid gap-1 py-5 sm:grid-cols-[220px_1fr] sm:gap-6">
              <dt className="text-sm font-semibold uppercase tracking-wide text-sage-700">
                {item.term}
              </dt>
              <dd className="text-base text-ink-700 sm:text-lg">{item.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
