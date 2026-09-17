// Centralized option lists for the family interest and career forms.
// Keeping labels here (rather than scattered through JSX) makes it easy to
// keep survey wording consistent and to export/analyze responses later.

export const INTERESTED_IN_OPTIONS = [
  { value: "myself", label: "Myself" },
  { value: "spouse_or_partner", label: "Spouse or partner" },
  { value: "parent", label: "Parent" },
  { value: "other_family_member", label: "Other family member" },
  { value: "friend", label: "Friend" },
  { value: "professional_support", label: "Someone I support professionally" },
] as const;

export const DAYS_PER_WEEK_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "not_sure", label: "Not sure" },
] as const;

// Step 2 survey, revision "2026-09-hours-pricing-v1" — see types/leads.ts
// for the payload shape and docs/google-apps-script.gs for how each field
// lands in the sheet. Bump SURVEY_VERSION (and treat it as a new, additive
// revision rather than editing these in place) if the questions change
// again after real responses exist.
export const SURVEY_VERSION = "2026-09-hours-pricing-v1" as const;

export const PREFERRED_WEEKDAY_OPTIONS = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
] as const;

export const PREFERRED_START_TIME_OPTIONS = [
  { value: "8_30_am", label: "8:30 AM" },
  { value: "9_00_am", label: "9:00 AM" },
  { value: "either", label: "Either would work" },
  { value: "neither", label: "Neither would work" },
  { value: "not_sure", label: "I’m not sure yet" },
] as const;

export const PREFERRED_STANDARD_PICKUP_TIME_OPTIONS = [
  { value: "3_30_pm", label: "3:30 PM" },
  { value: "4_30_pm", label: "4:30 PM" },
  { value: "either", label: "Either would work" },
  { value: "neither", label: "Neither would work" },
  { value: "not_sure", label: "I’m not sure yet" },
] as const;

export const EXTENDED_PICKUP_FREQUENCY_OPTIONS = [
  { value: "never", label: "Never" },
  { value: "occasionally", label: "Occasionally" },
  { value: "1_2_days_per_week", label: "1–2 days per week" },
  { value: "most_scheduled_days", label: "Most scheduled days" },
  { value: "every_scheduled_day", label: "Every scheduled day" },
  { value: "not_sure", label: "I’m not sure yet" },
] as const;

export const REALISTIC_USAGE_AT_200_OPTIONS = [
  { value: "5_days_per_week", label: "5 days per week" },
  { value: "3_4_days_per_week", label: "3–4 days per week" },
  { value: "2_days_per_week", label: "2 days per week" },
  { value: "under_2_or_occasional", label: "Fewer than 2 days per week or occasionally" },
  { value: "needs_financial_assistance", label: "We would likely need financial assistance or insurance coverage" },
  { value: "cannot_consider_at_price", label: "We could not seriously consider the program at this price" },
  { value: "not_sure", label: "I’m not sure yet" },
] as const;

export const NON_PRICE_BARRIER_OPTIONS = [
  { value: "transportation", label: "Transportation" },
  { value: "location_or_distance", label: "Location or travel distance" },
  { value: "reluctant_to_attend", label: "My loved one may be reluctant to attend" },
  { value: "needs_may_exceed_scope", label: "Their personal or medical needs may exceed the program’s scope" },
  { value: "behavioral_support_needs", label: "Behavioral support needs" },
  { value: "unpredictable_schedule", label: "An unpredictable schedule" },
  { value: "not_ready_yet", label: "We are exploring options but are not ready yet" },
  { value: "other", label: "Other" },
] as const;

export const NON_PRICE_BARRIERS_MAX = 2;

export const WILLING_TO_TALK_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "maybe", label: "Maybe" },
  { value: "no", label: "No" },
] as const;

export const CONFIDENCE_REQUIREMENT_MAX_LENGTH = 1000;

export const CAREER_AREA_OPTIONS = [
  { value: "care_partner", label: "Care partner" },
  { value: "activities_programming", label: "Activities / programming" },
  { value: "nursing", label: "Nursing" },
  { value: "operations", label: "Operations" },
  { value: "administration", label: "Administration" },
  { value: "volunteer", label: "Volunteer" },
  { value: "internship_student", label: "Internship / student opportunity" },
  { value: "other", label: "Other" },
] as const;
