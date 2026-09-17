"use client";

import { useEffect, useRef, useState } from "react";
import SuccessMessage from "@/components/SuccessMessage";
import { track } from "@/lib/analytics";
import { getStoredUtmParams } from "@/lib/utm";
import { isValidEmail, isValidPhone, isNonEmpty, type FieldErrors } from "@/lib/validation";
import { CAREER_AREA_OPTIONS } from "@/lib/formOptions";
import type { CareerAreaOfInterest } from "@/types/leads";

type FormState = {
  name: string;
  email: string;
  phone: string;
  areaOfInterest: CareerAreaOfInterest | "";
  relevantExperience: string;
  whyInterested: string;
  linkedInUrl: string;
  permissionToContact: boolean;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  areaOfInterest: "",
  relevantExperience: "",
  whyInterested: "",
  linkedInUrl: "",
  permissionToContact: false,
};

export default function CareerForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Submitting swaps the full form for a short confirmation, so without this
  // the page keeps its old scroll position and the visitor can end up
  // looking past the confirmation instead of at it.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    containerRef.current?.focus({ preventScroll: true });
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [done]);

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!isNonEmpty(form.name)) errs.name = "Please enter your name.";
    if (!isValidEmail(form.email)) errs.email = "Please enter a valid email address.";
    if (!isValidPhone(form.phone)) errs.phone = "Please enter a valid phone number.";
    if (!form.areaOfInterest) errs.areaOfInterest = "Please select an area of interest.";
    if (!isNonEmpty(form.whyInterested)) errs.whyInterested = "Please share a few words about your interest.";
    if (!form.permissionToContact) errs.permissionToContact = "Please give permission to be contacted.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const utm = getStoredUtmParams();
      const body = new FormData();
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("phone", form.phone);
      body.append("areaOfInterest", form.areaOfInterest);
      body.append("relevantExperience", form.relevantExperience);
      body.append("whyInterested", form.whyInterested);
      body.append("linkedInUrl", form.linkedInUrl);
      body.append("permissionToContact", String(form.permissionToContact));
      body.append("submittedAt", new Date().toISOString());
      body.append("utm", JSON.stringify(utm));
      if (resumeFile) body.append("resume", resumeFile);

      const res = await fetch("/api/career-interest", { method: "POST", body });
      if (!res.ok) throw new Error("Submission failed");

      track("career_form_submit", { areaOfInterest: form.areaOfInterest });
      setDone(true);
    } catch {
      setSubmitError("Something went wrong submitting your information. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div ref={containerRef} tabIndex={-1} className="outline-none">
        <SuccessMessage
          heading="Thanks for your interest in helping build The Day House."
          message="We'll keep your information on file and reach out as opportunities develop."
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="career-name" className="field-label">Name</label>
          <input
            id="career-name"
            className="field-input"
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            autoComplete="name"
            required
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="career-email" className="field-label">Email</label>
          <input
            id="career-email"
            type="email"
            className="field-input"
            value={form.email}
            onChange={(e) => update({ email: e.target.value })}
            autoComplete="email"
            required
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="career-phone" className="field-label">Phone</label>
          <input
            id="career-phone"
            type="tel"
            className="field-input"
            value={form.phone}
            onChange={(e) => update({ phone: e.target.value })}
            autoComplete="tel"
            required
          />
          {errors.phone && <p className="field-error">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="career-area" className="field-label">Area of interest</label>
          <select
            id="career-area"
            className="field-input"
            value={form.areaOfInterest}
            onChange={(e) => update({ areaOfInterest: e.target.value as CareerAreaOfInterest })}
            required
          >
            <option value="">Select one</option>
            {CAREER_AREA_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.areaOfInterest && <p className="field-error">{errors.areaOfInterest}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="career-experience" className="field-label">Relevant experience</label>
        <textarea
          id="career-experience"
          rows={3}
          className="field-input"
          value={form.relevantExperience}
          onChange={(e) => update({ relevantExperience: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="career-why" className="field-label">Why does The Day House interest you?</label>
        <textarea
          id="career-why"
          rows={4}
          className="field-input"
          value={form.whyInterested}
          onChange={(e) => update({ whyInterested: e.target.value })}
          required
        />
        {errors.whyInterested && <p className="field-error">{errors.whyInterested}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="career-resume" className="field-label">Resume (optional)</label>
          <input
            id="career-resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="field-input file:mr-4 file:rounded-full file:border-0 file:bg-sage-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-sage-700"
            onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <div>
          <label htmlFor="career-linkedin" className="field-label">LinkedIn URL (optional)</label>
          <input
            id="career-linkedin"
            type="url"
            placeholder="https://linkedin.com/in/…"
            className="field-input"
            value={form.linkedInUrl}
            onChange={(e) => update({ linkedInUrl: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="career-permission"
          type="checkbox"
          className="mt-1 h-5 w-5 rounded border-ink/30 text-sage-600 focus:ring-sage-500"
          checked={form.permissionToContact}
          onChange={(e) => update({ permissionToContact: e.target.checked })}
          required
        />
        <label htmlFor="career-permission" className="text-sm text-ink-700">
          I give The Day House permission to contact me regarding future roles.
        </label>
      </div>
      {errors.permissionToContact && <p className="field-error">{errors.permissionToContact}</p>}

      {submitError && <p className="field-error">{submitError}</p>}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Submitting…" : "Join Our Talent Community"}
      </button>
    </form>
  );
}
