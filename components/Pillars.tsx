const PILLARS: { title: string; description: string }[] = [
  {
    title: "Purpose",
    description: "Real roles and reasons to show up, not idle time to fill.",
  },
  {
    title: "Connection",
    description: "Conversation and friendship with people and staff who know you.",
  },
  {
    title: "Movement",
    description: "Walking, stretching, and activity built into an ordinary day.",
  },
  {
    title: "Creativity",
    description: "Art, music, and hands-on work that make room for expression.",
  },
  {
    title: "Choice",
    description: "Options throughout the day, not one fixed schedule for everyone.",
  },
  {
    title: "Independence",
    description: "Support for what's hard, room to do what's still easy.",
  },
  {
    title: "Belonging",
    description: "A community that notices when you're there, and when you're not.",
  },
  {
    title: "Support",
    description: "Dependable structure for participants and relief for families.",
  },
];

export default function Pillars() {
  return (
    <section className="bg-sage-50">
      <div className="section">
        <div className="max-w-2xl">
          <span className="eyebrow">Our Approach</span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            This isn&rsquo;t about filling time. It&rsquo;s about making the
            day matter.
          </h2>
          <p className="mt-5 text-lg text-ink-700">
            The Day House focuses on what someone can still do, not only on
            what they can no longer do. Every day is built around purpose,
            relationships, and choice.
          </p>
        </div>

        <p className="mt-10 rounded-xl2 bg-cream px-6 py-6 text-xl font-semibold text-sage-700 shadow-soft sm:text-2xl">
          Support should help someone participate in life, not simply keep
          them occupied.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl2 border border-sage-100 bg-cream p-6 shadow-sm transition hover:shadow-soft"
            >
              <h3 className="text-lg font-semibold text-sage-700">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-ink-700">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
