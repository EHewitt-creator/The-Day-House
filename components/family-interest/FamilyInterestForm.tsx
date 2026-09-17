"use client";

import { useEffect, useRef, useState } from "react";
import FamilyInterestStepOne from "@/components/family-interest/FamilyInterestStepOne";
import FamilyInterestStepTwo from "@/components/family-interest/FamilyInterestStepTwo";
import SuccessMessage from "@/components/SuccessMessage";
import { track } from "@/lib/analytics";
import { getStoredUtmParams } from "@/lib/utm";
import { isValidEmail, isValidPhone, isValidZip, isNonEmpty, type FieldErrors } from "@/lib/validation";
import { SURVEY_VERSION } from "@/lib/formOptions";
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
  preferredWeekdays: [],
  preferredWeekdaysNotSure: false,
  preferredStartTime: "",
  preferredStartTimeOther: "",
  preferredStandardPickupTime: "",
  preferredStandardPickupTimeOther: "",
  extendedPickupFrequency: "",
  realisticUsageAt200: "",
  nonPriceBarriers: [],
  nonPriceBarriersOther: "",
  confidenceRequirement: "",
  willingToTalk: "",
  surveyVersion: SURVEY_VERSION,
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
  const [step, setStep] = useState<"one" | "two" | "done" | "skipped">("one");
  const [stepOne, setStepOne] = useState<StepOneType>(emptyStepOne);
  const [stepTwo, setStepTwo] = useState<StepTwoType>(emptyStepTwo);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startedTracking = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Moving between step 1 → step 2 → done/skipped swaps in shorter content,
  // so without this the page keeps whatever scroll position it had and the
  // visitor can end up looking at the section below instead of the
  // confirmation. Skip it on first mount so loading the page doesn't jump.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    containerRef.current?.focus({ preventScroll: true });
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

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
      // Non-PII signals only — no names, contact details, or free-text
      // answers (confidenceRequirement, the "other" fields) leave the client.
      const answeredScheduleQuestions =
        stepTwo.preferredWeekdays.length > 0 ||
        stepTwo.preferredWeekdaysNotSure ||
        !!stepTwo.preferredStartTime ||
        !!stepTwo.preferredStandardPickupTime ||
        !!stepTwo.extendedPickupFrequency;
      track("survey_complete", {
        survey_version: stepTwo.surveyVersion,
        answered_schedule_questions: answeredScheduleQuestions,
        answered_pricing_question: !!stepTwo.realisticUsageAt200,
        willing_to_talk: stepTwo.willingToTalk || "not_answered",
      });
      setStep("done");
    } catch {
      setSubmitError("Something went wrong submitting your answers. Please try again, or feel free to skip.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSkipSurvey() {
    setStep("skipped");
  }

  return (
    <div ref={containerRef} tabIndex={-1} className="scroll-mt-28 outline-none">
      {step === "done" && (
        <SuccessMessage
          heading="Thank you."
          message="Your input will help us make better decisions about The Day House's hours, pricing, and support for local families."
        />
      )}

      {step === "skipped" && (
        <SuccessMessage
          heading="You're on the list."
          message="No problem, you're still on our interest list. We'll be in touch as The Day House gets closer to opening."
        />
      )}

      {(step === "one" || step === "two") && (
        <>
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
                  Would you answer a short optional survey to help us plan The
                  Day House? Your answers will help us determine operating
                  hours, extended pickup needs, and pricing before we open.
                </p>
                <p className="mt-1">Every question is optional.</p>
              </div>

              <FamilyInterestStepTwo value={stepTwo} onChange={(patch) => setStepTwo((prev) => ({ ...prev, ...patch }))} />

              {submitError && <p className="field-error mt-4">{submitError}</p>}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit My Answers"}
                </button>
                <button type="button" className="btn-ghost" onClick={handleSkipSurvey}>
                  Skip This Survey
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
