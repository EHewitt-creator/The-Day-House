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
 * Compact line for use directly under the hero copy. Mobile-first: wraps
 * freely and starts small on narrow phones, where forcing this long phrase
 * onto one line would overflow the screen. It only gets locked to a single
 * line at the `lg` breakpoint, where the hero becomes two columns and this
 * sits in a narrower but still comfortably wide left half.
 */
export function BrandStatementInline({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-base font-semibold tracking-tight text-sage-700 sm:text-lg md:text-xl lg:whitespace-nowrap lg:text-sm lg:tracking-normal xl:text-base ${className}`}
    >
      <JoinedPhrases dotClassName="text-terracotta-500" />
    </p>
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
