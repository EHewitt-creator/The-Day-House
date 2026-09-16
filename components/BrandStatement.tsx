// The three-part brand statement. Wording is fixed and must not be
// reworded or shortened: "Purposeful days. Meaningful connection.
// Dependable respite." Each phrase maps to part of the brand story:
// the person attending, the relationships and community around them,
// and the relief it gives the family caring for them.

const PHRASES = [
  {
    text: "Purposeful days.",
    audience: "For the person who attends",
  },
  {
    text: "Meaningful connection.",
    audience: "For relationships and belonging",
  },
  {
    text: "Dependable respite.",
    audience: "For the family who cares for them",
  },
] as const;

/** Compact single line for use directly under the hero copy. */
export function BrandStatementInline({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xl font-semibold text-sage-700 sm:text-2xl ${className}`}>
      <span className="sr-only">Our promise: </span>
      {PHRASES.map((phrase, i) => (
        <span key={phrase.text}>
          {phrase.text}
          {i < PHRASES.length - 1 && (
            <span className="mx-2 text-terracotta-500" aria-hidden="true">
              ·
            </span>
          )}
        </span>
      ))}
    </p>
  );
}

/** Full-width, three-column banner for a prominent placement near the bottom of the page. */
export function BrandStatementBanner() {
  return (
    <section className="bg-sage-700 text-cream-100">
      <div className="section !py-16 text-center lg:!py-20">
        <span className="inline-block rounded-full bg-cream-100/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-terracotta-400">
          Our Promise
        </span>

        <p className="mx-auto mt-6 max-w-4xl text-3xl font-semibold leading-snug sm:text-4xl lg:text-5xl">
          Purposeful days. Meaningful connection. Dependable respite.
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-3">
          {PHRASES.map((phrase) => (
            <div key={phrase.text}>
              <p className="text-lg font-semibold text-terracotta-300">{phrase.text}</p>
              <p className="mt-1 text-sm text-cream-100/75">{phrase.audience}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Single line for the footer. */
export function BrandStatementFooter({ className = "" }: { className?: string }) {
  return (
    <p className={`text-base text-cream-100/80 ${className}`}>
      Purposeful days. Meaningful connection. Dependable respite.
    </p>
  );
}
