import PhotoPlaceholder from "@/components/PhotoPlaceholder";

const MOMENTS: { title: string; description: string; tone: "sage" | "terracotta" | "peach" }[] = [
  { title: "Coffee and conversation", description: "An easy start to the day, on your own schedule.", tone: "peach" },
  { title: "Movement and walking", description: "Time outside, stretching, or a walk with a friend.", tone: "sage" },
  { title: "Gardening and outdoor time", description: "Hands in soil, fresh air, and natural light, weather permitting.", tone: "sage" },
  { title: "Art and creative work", description: "Painting, drawing, and projects with no wrong answer.", tone: "terracotta" },
  { title: "Music", description: "Singing, listening, and moving to songs that matter.", tone: "peach" },
  { title: "Cooking or food preparation", description: "Simple, purposeful kitchen tasks done together.", tone: "terracotta" },
  { title: "Purposeful household or community roles", description: "Folding, sorting, setting tables, real contributions.", tone: "sage" },
  { title: "Quiet time", description: "A calm space to rest, read, or simply sit.", tone: "peach" },
  { title: "Small-group and self-directed activities", description: "Join a group, or choose to do your own thing.", tone: "terracotta" },
];

export default function DayInLife() {
  return (
    <section className="section">
      <div className="max-w-2xl">
        <span className="eyebrow">A Day at The Day House</span>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          What a day may feel like.
        </h2>
        <p className="mt-5 text-lg text-ink-700">
          There is no single rigid schedule. Each day offers a mix of these
          moments, and participants choose what fits how they feel.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOMENTS.map((moment) => (
          <div key={moment.title} className="overflow-hidden rounded-xl2 border border-ink/5 bg-cream-100 shadow-sm">
            <PhotoPlaceholder label={moment.title} tone={moment.tone} aspect="aspect-[4/3]" className="rounded-none border-0" />
            <div className="p-5">
              <h3 className="text-lg font-semibold">{moment.title}</h3>
              <p className="mt-1.5 text-sm text-ink-700">{moment.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
