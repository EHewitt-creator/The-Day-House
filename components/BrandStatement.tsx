// The three-part brand statement: "Purposeful days · Meaningful connection
// · Dependable respite." Each phrase maps to part of the brand story: the
// person attending, the relationships and community around them, and the
// relief it gives the family caring for them. Rendered with middot
// separators (no periods) everywhere it appears.

const PHRASES = [
  {
    text: "Purposeful days",
    audience: "For the person who attends",
  },
  {
    text: "Meaningful connection",
    audience: "For relationships and belonging",
  },
  {
    text: "Dependable respite",
    audience: "For the family who cares for them",
  },
] as const;

const FULL_STATEMENT = PHRASES.map((p) => p.text).join(" · ");

/** Renders the phrases joined by middots, as a single accessible text node. */
function JoinedPhrases({ dotClassName }: { dotClassName: string }) {
  return (
    <>
      <span className="sr-only">Our promise: {FULL_STATEMENT}</span>
      <span aria-hidden="true">
        {PHRASES.map((phrase, i) => (
          <span key={phrase.text}>
            {phrase.text}
            {i < PHRASES.length - 1 && <span className={dotClassName}> · </span>}
          </span>
        ))}
      </span>
    </>
  );
}

/**
 * Compact single line for use directly under the hero copy. Sized to stay
 * on one line: full size while the hero is a single stacked column, and a
 * step smaller at the `lg` breakpoint where the hero becomes two columns
 * and this sits in the narrower left half.
 */
export function BrandStatementInline({ className = "" }: { className?: string }) {
  return (
    <p
      className={`whitespace-nowrap text-lg font-semibold tracking-tight text-sage-700 sm:text-xl lg:text-sm lg:tracking-normal xl:text-base ${className}`}
    >
      <JoinedPhrases dotClassName="text-terracotta-500" />
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
          <JoinedPhrases dotClassName="text-terracotta-300" />
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
      <JoinedPhrases dotClassName="text-terracotta-400" />
    </p>
  );
}
