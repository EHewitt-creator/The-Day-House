type Tone = "terracotta" | "sage";

const TONE_CLASSES: Record<Tone, string> = {
  terracotta: "bg-terracotta-100 text-terracotta-700",
  sage: "bg-sage-100 text-sage-700",
};

// A colored top rule instead of a bordered, shadowed card — lighter and
// less "card grid," per the redesign's move away from box-and-shadow
// treatments for these four items.
const RULE_CLASSES: Record<Tone, string> = {
  terracotta: "border-terracotta-500",
  sage: "border-sage-500",
};

const PILLARS: { title: string; description: string; tone: Tone; icon: React.ReactNode }[] = [
  {
    title: "Purpose",
    description: "Real roles, meaningful activity, and reasons to participate.",
    tone: "terracotta",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Connection",
    description: "Friendship, conversation, belonging, and being known.",
    tone: "sage",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16.5" cy="12.5" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 19c.6-2.8 2.5-4.3 5-4.3s4.4 1.5 5 4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M14.5 19c.4-1.9 1.7-3 3.6-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Choice",
    description: "Options throughout the day rather than one rigid schedule.",
    tone: "terracotta",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 10L6 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 10l6 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Dependable Support",
    description: "Skilled daytime support for participants, reliable respite for families.",
    tone: "sage",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l7 3v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Pillars() {
  return (
    <section className="bg-sage-50">
      <div className="section">
        <div className="max-w-2xl">
          <span className="eyebrow">Why The Day House</span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Let&rsquo;s make the day matter.
          </h2>
          <p className="mt-5 text-lg text-ink-700">
            At The Day House, we focus on <strong className="font-semibold">what remains possible</strong>.
            Every day is designed around independence and the person behind
            the diagnosis.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className={`border-t-2 pt-5 ${RULE_CLASSES[pillar.tone]}`}>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${TONE_CLASSES[pillar.tone]}`}
              >
                {pillar.icon}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-1.5 text-base text-ink-700">{pillar.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 border-l-2 border-sage-600 pl-4 text-xl font-semibold text-sage-700 sm:text-2xl">
          Support should help someone participate in life, not simply keep
          them occupied.
        </p>
      </div>
    </section>
  );
}
