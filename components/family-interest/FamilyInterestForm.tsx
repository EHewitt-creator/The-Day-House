"use client";

import { useRef, useState } from "react";
import FamilyInterestStepOne from "@/components/family-interest/FamilyInterestStepOne";
import FamilyInterestStepTwo from "@/components/family-interest/FamilyInterestStepTwo";
import SuccessMessage from "@/components/SuccessMessage";
import { track } from "@/lib/analytics";
import { getStoredUtmParams } from "@/lib/utm";
import { isValidEmail, isValidPhone, isValidZip, isNonEmpty, type FieldErrors } from "@/lib/validation";
import type {
  FamilyInterestPayload,
  FamilyInterestStepOne as StepOneType,
  FamilyInterestStepTwo as StepTwoType,
} from "@/types/leads";

const emptyStepOne: StepOneType = {
  fullName: "",
  email: "",
  phone: "",
  zipCode: "",
  interestedIn: "",
  daysPerWeek: "",
  consentToContact: false,
};

const emptyStepTwo: StepTwoType = {
  preferredDaysOfWeek: [],
  preferredArrivalTime: "",
  preferredPickupTime: "",
  preferredHours: "",
  preferredHoursOther: "",
  servicesWanted: [],
  servicesWantedOther: "",
  barriers: [],
  barriersOther: "",
  realisticPriceRange: "",
  tooExpensivePrice: "",
  whatWouldBeValuable: "",
  willingToTalk: "",
};

function validateStepOne(v: StepOneType): FieldErrors {
  const errors: FieldErrors = {};
  if (!isNonEmpty(v.fullName)) errors.fullName = "Please enter your full name.";
  if (!isValidEmail(v.email)) errors.email = "Please enter a valid email address.";
  // Phone is optional in step 1 — only validate its format if provided.
  if (isNonEmpty(v.phone) && !isValidPhone(v.phone)) errors.phone = "Please enter a valid phone number.";
  if (!isValidZip(v.zipCode)) errors.zipCode = "Please enter a valid ZIP code.";
  if (!v.interestedIn) errors.interestedIn = "Please select an option.";
  if (!v.daysPerWeek) errors.daysPerWeek = "Please select an option.";
  if (!v.consentToContact) errors.consentToContact = "Please check this box to join the interest list.";
  return errors;
}

export default function FamilyInterestForm() {
  const [step, setStep] = useState<"one" | "two" | "done">("one");
  const [stepOne, setStepOne] = useState<StepOneType>(emptyStepOne);
  const [stepTwo, setStepTwo] = useState<StepTwoType>(emptyStepTwo);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startedTracking = useRef(false);

  function handleStepOneChange(patch: Partial<StepOneType>) {
    if (!startedTracking.current) {
      startedTracking.current = true;
      track("family_form_start");
    }
    setStepOne((prev) => ({ ...prev, ...patch }));
  }

  async function submitPayload(payload: FamilyInterestPayload) {
    const res = await fetch("/api/family-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Submission failed");
  }

  async function handleStepOneSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateStepOne(stepOne);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitPayload({
        step1: stepOne,
        step2Completed: false,
        utm: getStoredUtmParams(),
        submittedAt: new Date().toISOString(),
        source: "family_interest_form",
      });
      track("family_form_submit", { hasSurvey: false });
      setStep("two");
    } catch {
      setSubmitError("Something went wrong submitting your information. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStepTwoSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitPayload({
        step1: stepOne,
        step2Completed: true,
        step2: stepTwo,
        utm: getStoredUtmParams(),
        submittedAt: new Date().toISOString(),
        source: "family_interest_form",
      });
      track("survey_complete");
      setStep("done");
    } catch {
      setSubmitError("Something went wrong submitting your answers. Please try again, or feel free to skip.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSkipSurvey() {
    setStep("done");
  }

  if (step === "done") {
    return (
      <SuccessMessage
        heading="Thank you."
        message="We're building The Day House with local families in mind, and your input genuinely helps shape what comes next."
      />
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-3 text-sm font-semibold text-ink-500">
        <span className={step === "one" ? "text-sage-700" : ""}>Step 1 of 2 · Contact information</span>
        {step === "two" && <span className="text-sage-700">→ Step 2 of 2 · Optional survey</span>}
      </div>

      {step === "one" && (
        <form onSubmit={handleStepOneSubmit} noValidate>
          <FamilyInterestStepOne value={stepOne} errors={errors} onChange={handleStepOneChange} />

          {submitError && <p className="field-error mt-4">{submitError}</p>}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Submitting…" : "Join the Interest List"}
            </button>
          </div>
          <p className="mt-3 text-sm text-ink-500">
            Joining the interest list does not commit you to enrollment.
          </p>
        </form>
      )}

      {step === "two" && (
        <form onSubmit={handleStepTwoSubmit} noValidate>
          <div role="status" className="mb-6 rounded-xl2 bg-terracotta-50 p-4 text-base text-ink-700">
            <p className="font-semibold text-sage-700">You&rsquo;re on the list.</p>
            <p className="mt-1">
              Would you answer a 60-second optional survey to help us shape
              The Day House? Every question below is optional, and you can
              skip it entirely.
            </p>
          </div>

          <FamilyInterestStepTwo value={stepTwo} onChange={(patch) => setStepTwo((prev) => ({ ...prev, ...patch }))} />

          {submitError && <p className="field-error mt-4">{submitError}</p>}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit My Answers"}
            </button>
            <button type="button" className="btn-ghost" onClick={handleSkipSurvey}>
              Skip this part
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
