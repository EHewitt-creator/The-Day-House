// Shared types for lead capture across the site.
// Keep family leads and career leads as separate, explicit shapes so they
// can be exported/analyzed independently once a backend or CRM is wired up.

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

export type InterestedInOption =
  | "myself"
  | "spouse_or_partner"
  | "parent"
  | "other_family_member"
  | "friend"
  | "professional_support";

export type DaysPerWeekOption = "1" | "2" | "3" | "4" | "5" | "not_sure";

export type PreferredWeekdayOption = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

export type PreferredStartTimeOption = "8_30_am" | "9_00_am" | "either" | "neither" | "not_sure";

export type PreferredStandardPickupTimeOption = "3_30_pm" | "4_30_pm" | "either" | "neither" | "not_sure";

export type ExtendedPickupFrequencyOption =
  | "never"
  | "occasionally"
  | "1_2_days_per_week"
  | "most_scheduled_days"
  | "every_scheduled_day"
  | "not_sure";

export type RealisticUsageAt200Option =
  | "5_days_per_week"
  | "3_4_days_per_week"
  | "2_days_per_week"
  | "under_2_or_occasional"
  | "needs_financial_assistance"
  | "cannot_consider_at_price"
  | "not_sure";

export type NonPriceBarrierOption =
  | "transportation"
  | "location_or_distance"
  | "reluctant_to_attend"
  | "needs_may_exceed_scope"
  | "behavioral_support_needs"
  | "unpredictable_schedule"
  | "not_ready_yet"
  | "other";

export type WillingToTalkOption = "yes" | "maybe" | "no";

/**
 * Step 1: short lead capture only. A lead is created from this alone, so it
 * deliberately asks for as little as possible before someone is on the
 * list — everything that isn't needed to save a lead lives in step 2
 * instead.
 */
export type FamilyInterestStepOne = {
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  interestedIn: InterestedInOption | "";
  daysPerWeek: DaysPerWeekOption | "";
  consentToContact: boolean;
};

/**
 * Step 2: optional, ~60-90 second market-research survey. Entirely
 * skippable, and every question inside it is independently optional too —
 * see the "2026-09-hours-pricing-v1" survey below for what's asked and why.
 * `surveyVersion` is a fixed constant (see lib/formOptions.ts), not user
 * input, and lets responses to a future revision of this survey stay
 * distinguishable from these in the sheet without touching old rows.
 */
export type FamilyInterestStepTwo = {
  preferredWeekdays: PreferredWeekdayOption[];
  preferredWeekdaysNotSure: boolean;
  preferredStartTime: PreferredStartTimeOption | "";
  preferredStartTimeOther: string;
  preferredStandardPickupTime: PreferredStandardPickupTimeOption | "";
  preferredStandardPickupTimeOther: string;
  extendedPickupFrequency: ExtendedPickupFrequencyOption | "";
  realisticUsageAt200: RealisticUsageAt200Option | "";
  nonPriceBarriers: NonPriceBarrierOption[];
  nonPriceBarriersOther: string;
  confidenceRequirement: string;
  willingToTalk: WillingToTalkOption | "";
  surveyVersion: string;
};

export type FamilyInterestPayload = {
  step1: FamilyInterestStepOne;
  step2Completed: boolean;
  step2?: FamilyInterestStepTwo;
  utm: UtmParams;
  submittedAt: string;
  source: "family_interest_form";
};

export type CareerAreaOfInterest =
  | "care_partner"
  | "activities_programming"
  | "nursing"
  | "operations"
  | "administration"
  | "volunteer"
  | "internship_student"
  | "other";

export type CareerInterestPayload = {
  name: string;
  email: string;
  phone: string;
  areaOfInterest: CareerAreaOfInterest | "";
  relevantExperience: string;
  whyInterested: string;
  resumeFileName?: string;
  linkedInUrl?: string;
  permissionToContact: boolean;
  utm: UtmParams;
  submittedAt: string;
  source: "career_interest_form";
};

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
  utm: UtmParams;
  submittedAt: string;
  source: "contact_form";
};
