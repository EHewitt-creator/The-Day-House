// Lightweight, provider-agnostic analytics hooks.
//
// No analytics provider is installed yet. Each call currently logs to the
// console in development so the event names and payload shapes are visible
// and easy to verify. When a provider is chosen (GA4, Segment, PostHog,
// Meta Pixel, etc.), wire it up inside `track()` only — every call site in
// the app stays the same.

export type AnalyticsEventName =
  | "hero_interest_click"
  | "family_form_start"
  | "family_form_submit"
  | "survey_complete"
  | "career_click"
  | "career_form_submit"
  | "contact_click";

export function track(
  event: AnalyticsEventName,
  properties?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log(`[analytics] ${event}`, properties ?? {});
  }

  // TODO: forward to a real analytics provider once one is chosen, e.g.:
  // window.gtag?.("event", event, properties);
  // window.posthog?.capture(event, properties);
}
