type Tone = "terracotta" | "sage" | "peach";

const TONE_CLASSES: Record<Tone, string> = {
  terracotta: "bg-terracotta-100 text-terracotta-700",
  sage: "bg-sage-100 text-sage-700",
  peach: "bg-peach-200 text-terracotta-700",
};

const RHYTHM: { title: string; description: string; tone: Tone; icon: React.ReactNode }[] = [
  {
    title: "Create and Contribute",
    description: "Gardening, cooking, art, household roles, and meaningful hands-on work.",
    tone: "sage",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 21c3-6 6-9 9-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M13 9c1-2 3-3 6-3-0 3-1 5-3 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 21c1.5-.5 2.7-1.1 3.5-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Move and Explore",
    description: "Walking, strength and balance, movement, and time outdoors.",
    tone: "terracotta",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="14" cy="4.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M9 20l2-6 2.5 2 3 1M9 9.5l3.5-1.5 3 3.5-2 5.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M11 12.5l-3 1.5-1.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Connect and Belong",
    description: "Coffee, conversation, music, and shared time in small groups.",
    tone: "peach",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 4v-4H6a2 2 0 0 1-2-2V6z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M8 8.5h8M8 11.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Choose Your Own Rhythm",
    description: "Independent activities, quiet time, reading, or joining others when it feels right.",
    tone: "sage",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function DayInLife() {
  return (
    <section className="section">
      <div className="max-w-2xl">
        <span className="eyebrow">A Day at The Day House</span>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">What a day may feel like.</h2>
        <p className="mt-5 text-lg text-ink-700">
          Every day has a predictable rhythm, not one compulsory activity
          schedule. Participants move between these kinds of moments and
          choose what fits how they feel.
        </p>
      </div>

      <div className="relative mt-12 space-y-3">
        {RHYTHM.map((moment, i) => (
          <div key={moment.title} className="relative flex gap-5">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${TONE_CLASSES[moment.tone]}`}
              >
                {moment.icon}
              </span>
              {i < RHYTHM.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-ink/10" aria-hidden="true" />}
            </div>
            <div className="pb-8">
              <h3 className="text-xl font-semibold">{moment.title}</h3>
              <p className="mt-1.5 max-w-xl text-base text-ink-700">{moment.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
