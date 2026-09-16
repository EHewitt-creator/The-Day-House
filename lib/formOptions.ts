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

export const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export const PREFERRED_HOURS_OPTIONS = [
  { value: "8_330", label: "8:00 AM–3:30 PM" },
  { value: "830_430", label: "8:30 AM–4:30 PM" },
  { value: "9_330", label: "9:00 AM–3:30 PM" },
  { value: "extended_530", label: "Extended pickup until 5:30 PM would be important" },
  { value: "other", label: "Other" },
] as const;

export const SERVICE_FEATURE_OPTIONS = [
  { value: "social_cognitive_engagement", label: "Meaningful social and cognitive engagement" },
  { value: "exercise_movement", label: "Exercise / movement" },
  { value: "outdoor_space", label: "Outdoor space" },
  { value: "gardening", label: "Gardening" },
  { value: "art_music_creative", label: "Art / music / creative programs" },
  { value: "lunch_snacks", label: "Lunch and snacks" },
  { value: "personal_care_toileting", label: "Personal care / toileting support" },
  { value: "medication_reminders", label: "Medication reminders" },
  { value: "dementia_trained_staff", label: "Dementia-trained staff" },
  { value: "rn_oversight", label: "RN oversight" },
  { value: "caregiver_communication", label: "Caregiver communication" },
  { value: "small_staff_ratios", label: "Small staff-to-participant ratios" },
  { value: "quiet_calming_space", label: "Quiet / calming space" },
  { value: "other", label: "Other" },
] as const;

export const BARRIER_OPTIONS = [
  { value: "cost", label: "Cost" },
  { value: "hours", label: "Hours" },
  { value: "transportation", label: "Transportation" },
  { value: "location_distance", label: "Location / distance" },
  { value: "loved_one_unwilling", label: "Loved one unwilling to attend" },
  { value: "personal_care_needs", label: "Personal care needs" },
  { value: "medical_needs", label: "Medical needs" },
  { value: "behavioral_needs", label: "Behavioral needs" },
  { value: "schedule_uncertainty", label: "Schedule uncertainty" },
  { value: "other", label: "Other" },
] as const;

export const PRICE_RANGE_OPTIONS = [
  { value: "under_125", label: "Under $125/day" },
  { value: "125_149", label: "$125–$149/day" },
  { value: "150_174", label: "$150–$174/day" },
  { value: "175_199", label: "$175–$199/day" },
  { value: "200_224", label: "$200–$224/day" },
  { value: "225_plus", label: "$225+/day" },
  { value: "not_sure", label: "I'm not sure" },
  { value: "need_financial_assistance", label: "I would likely need financial assistance or insurance coverage" },
] as const;

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
