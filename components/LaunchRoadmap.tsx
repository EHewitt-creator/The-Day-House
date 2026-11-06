// A compact, connected timeline showing where The Day House is in the
// opening process, placed right before the interest-list section so it
// builds confidence just before asking someone to sign up. Deliberately
// not a set of separate cards — one line with four markers, reusing the
// same subtle divider tone (ink/10) already used for the Program Details
// list below it.
//
// Rendered twice (horizontal row vs. vertical list) rather than reflowed
// with pure CSS, same pattern Nav.tsx already uses for its desktop/mobile
// nav: the two shapes are different enough that one markup tree fighting
// itself across breakpoints would be harder to read and maintain than two
// small renders sharing one data array below.
//
// To update when the lease is signed or a milestone completes: just edit
// MILESTONES. Move `active` to the next entry and the accent color, the
// "WE ARE HERE" marker styling, and both layouts all follow automatically.
const MILESTONES: {
  status: string;
  title: string;
  description: string;
  active?: boolean;
}[] = [
  {
    status: "WE ARE HERE",
    title: "Secure our home",
    description:
      "We’re evaluating locations in the Boise metro area, including West Boise and Eagle.",
    active: true,
  },
  {
    status: "NEXT",
    title: "Prepare the space",
    description: "Complete permitting, build-out, hiring, and staff preparation.",
  },
  {
    status: "BEFORE OPENING",
    title: "Tours and enrollment",
    description: "Invite families to visit, discuss fit, and confirm schedules.",
  },
  {
    status: "TARGET: 2027",
    title: "Welcome our first members",
    description: "Open with a focused daytime program and grow thoughtfully from there.",
  },
];

function Marker({ active }: { active?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={
        active
          ? "inline-block h-3.5 w-3.5 shrink-0 rounded-full bg-terracotta-600"
          : "inline-block h-3 w-3 shrink-0 rounded-full border-2 border-sage-400 bg-cream"
      }
    />
  );
}

function StatusLabel({ status, active }: { status: string; active?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-wide ${
        active ? "text-terracotta-700" : "text-sage-700"
      }`}
    >
      {status}
    </p>
  );
}

export default function LaunchRoadmap() {
  return (
    <section id="roadmap" className="scroll-mt-28 bg-sage-50">
      <div className="section !py-12 sm:!py-16">
        <span className="eyebrow">WHERE WE ARE</span>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Our path to opening</h2>
        <p className="mt-4 max-w-2xl text-base text-ink-500">
          We’re working toward opening in 2027. Families on our interest list
          will hear first as each milestone is confirmed.
        </p>

        {/* Desktop / tablet: one horizontal line behind four centered
            columns. The line's 12.5%/87.5% insets land exactly on the
            center of the first and last column in a 4-column grid
            (half of one quarter-width), so it reaches marker to marker
            without extra measuring. */}
        <ol className="relative mt-12 hidden md:grid md:grid-cols-4 md:gap-6">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[7px] h-px bg-ink/10"
          />
          {MILESTONES.map((milestone) => (
            <li key={milestone.title} className="relative flex flex-col items-center text-center">
              <Marker active={milestone.active} />
              <div className="mt-4">
                <StatusLabel status={milestone.status} active={milestone.active} />
              </div>
              <h3 className="mt-1 font-serif text-lg font-semibold text-ink">
                {milestone.title}
              </h3>
              <p className="mt-2 max-w-[220px] text-sm text-ink-700">
                {milestone.description}
              </p>
            </li>
          ))}
        </ol>

        {/* Mobile: one vertical line behind a left-aligned column of
            markers, content to the right of each. */}
        <ol className="relative mt-10 space-y-7 md:hidden">
          <div
            aria-hidden="true"
            className="absolute left-[5px] top-2 bottom-2 w-px bg-ink/10"
          />
          {MILESTONES.map((milestone) => (
            <li key={milestone.title} className="relative flex gap-4">
              <div className="relative z-10 pt-0.5">
                <Marker active={milestone.active} />
              </div>
              <div>
                <StatusLabel status={milestone.status} active={milestone.active} />
                <h3 className="mt-1 font-serif text-lg font-semibold text-ink">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-sm text-ink-700">{milestone.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
