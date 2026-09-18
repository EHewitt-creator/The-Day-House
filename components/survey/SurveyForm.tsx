"use client";

import { useRef, useState } from "react";
import FamilyInterestStepTwo from "@/components/family-interest/FamilyInterestStepTwo";
import SuccessMessage from "@/components/SuccessMessage";
import { getStoredUtmParams } from "@/lib/utm";
import { isValidEmail, isValidPhone, type FieldErrors } from "@/lib/validation";
import { SURVEY_VERSION } from "@/lib/formOptions";
import type { FamilyInterestStepTwo as StepTwoType, StandaloneSurveyPayload } from "@/types/leads";

const emptySurvey: StepTwoType = {
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

type ContactState = {
  name: string;
  email: string;
  phone: string;
};

const emptyContact: ContactState = { name: "", email: "", phone: "" };

/**
 * The same planning survey asked in step 2 of the family interest form
 * (FamilyInterestStepTwo — the questions themselves live there so both
 * places stay in sync), reachable on its own for anyone who wants to help
 * shape hours, pricing, and programming without joining the interest list
 * first. Every field is optional, including the "how can we reach you"
 * block below — leaving it blank submits an anonymous response.
 */
export default function SurveyForm() {
  const [contact, setContact] = useState<ContactState>(emptyContact);
  const [survey, setSurvey] = useState<StepTwoType>(emptySurvey);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function validateContact(): FieldErrors {
    const errs: FieldErrors = {};
    // Both fields are optional — only validate format if something was
    // actually typed in, so leaving them blank never blocks submission.
    if (contact.email.trim() && !isValidEmail(contact.email)) {
      errs.email = "Please enter a valid email address, or leave this blank.";
    }
    if (contact.phone.trim() && !isValidPhone(contact.phone)) {
      errs.phone = "Please enter a valid phone number, or leave this blank.";
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const validationErrors = validateContact();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload: StandaloneSurveyPayload = {
        name: contact.name.trim() || undefined,
        email: contact.email.trim() || undefined,
        phone: contact.phone.trim() || undefined,
        survey,
        utm: getStoredUtmParams(),
        submittedAt: new Date().toISOString(),
        source: "standalone_survey",
      };

      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");

      setDone(true);
    } catch {
      setSubmitError("Something went wrong submitting your answers. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div ref={containerRef} tabIndex={-1} className="outline-none">
        <SuccessMessage
          heading="Thank you."
          message="Your answers will help us make better decisions about The Day House's hours, pricing, and support for local families."
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FamilyInterestStepTwo value={survey} onChange={(patch) => setSurvey((prev) => ({ ...prev, ...patch }))} />

      <div className="mt-10 border-t border-ink/10 pt-8">
        <h3 className="text-lg font-semibold text-ink">
          How can we reach you? <span className="font-normal text-ink-500">(optional)</span>
        </h3>
        <p className="mt-1 text-sm text-ink-500">
          Leave this blank to answer anonymously, or share a way to reach you
          if you&rsquo;re open to a follow-up question.
        </p>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="survey-name" className="field-label">Name</label>
            <input
              id="survey-name"
              className="field-input"
              value={contact.name}
              onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="survey-email" className="field-label">Email</label>
            <input
              id="survey-email"
              type="email"
              className="field-input"
              value={contact.email}
              onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "survey-email-error" : undefined}
            />
            {errors.email && <p id="survey-email-error" className="field-error">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="survey-phone" className="field-label">Phone</label>
            <input
              id="survey-phone"
              type="tel"
              className="field-input"
              value={contact.phone}
              onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "survey-phone-error" : undefined}
            />
            {errors.phone && <p id="survey-phone-error" className="field-error">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {submitError && <p className="field-error mt-6">{submitError}</p>}

      <div className="mt-8">
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit My Answers"}
        </button>
      </div>
      <p className="mt-3 text-sm text-ink-500">
        Submitting this survey does not add you to our interest list or
        commit you to enrollment.
      </p>
    </form>
  );
}
