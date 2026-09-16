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

export type PreferredHoursOption =
  | "8_330"
  | "830_430"
  | "9_330"
  | "extended_530"
  | "other";

export type ServiceFeatureOption =
  | "social_cognitive_engagement"
  | "exercise_movement"
  | "outdoor_space"
  | "gardening"
  | "art_music_creative"
  | "lunch_snacks"
  | "personal_care_toileting"
  | "medication_reminders"
  | "dementia_trained_staff"
  | "rn_oversight"
  | "caregiver_communication"
  | "small_staff_ratios"
  | "quiet_calming_space"
  | "other";

export type BarrierOption =
  | "cost"
  | "hours"
  | "transportation"
  | "location_distance"
  | "loved_one_unwilling"
  | "personal_care_needs"
  | "medical_needs"
  | "behavioral_needs"
  | "schedule_uncertainty"
  | "other";

export type PriceRangeOption =
  | "under_125"
  | "125_149"
  | "150_174"
  | "175_199"
  | "200_224"
  | "225_plus"
  | "not_sure"
  | "need_financial_assistance";

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

/** Step 2: optional market-research survey. Entirely skippable. */
export type FamilyInterestStepTwo = {
  preferredDaysOfWeek: string[];
  preferredArrivalTime: string;
  preferredPickupTime: string;
  preferredHours: PreferredHoursOption | "";
  preferredHoursOther: string;
  servicesWanted: ServiceFeatureOption[];
  servicesWantedOther: string;
  barriers: BarrierOption[];
  barriersOther: string;
  realisticPriceRange: PriceRangeOption | "";
  tooExpensivePrice: string;
  whatWouldBeValuable: string;
  willingToTalk: "yes" | "no" | "";
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
