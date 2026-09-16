"use client";

import { useState } from "react";
import SuccessMessage from "@/components/SuccessMessage";
import { track } from "@/lib/analytics";
import { getStoredUtmParams } from "@/lib/utm";
import { isValidEmail, isNonEmpty, type FieldErrors } from "@/lib/validation";
import type { ContactPayload } from "@/types/leads";

type FormState = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!isNonEmpty(form.name)) errs.name = "Please enter your name.";
    if (!isValidEmail(form.email)) errs.email = "Please enter a valid email address.";
    if (!isNonEmpty(form.message)) errs.message = "Please enter a message.";
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
      const payload: ContactPayload = {
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        organization: form.organization || undefined,
        message: form.message,
        utm: getStoredUtmParams(),
        submittedAt: new Date().toISOString(),
        source: "contact_form",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");

      track("contact_click", { action: "form_submit" });
      setDone(true);
    } catch {
      setSubmitError("Something went wrong sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <SuccessMessage
        heading="Thank you for reaching out."
        message="We'll get back to you soon."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">Name</label>
          <input
            id="contact-name"
            className="field-input"
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            autoComplete="name"
            required
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="field-label">Email</label>
          <input
            id="contact-email"
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
          <label htmlFor="contact-phone" className="field-label">Phone (optional)</label>
          <input
            id="contact-phone"
            type="tel"
            className="field-input"
            value={form.phone}
            onChange={(e) => update({ phone: e.target.value })}
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="contact-org" className="field-label">Organization (optional)</label>
          <input
            id="contact-org"
            className="field-input"
            value={form.organization}
            onChange={(e) => update({ organization: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="field-label">Message</label>
        <textarea
          id="contact-message"
          rows={5}
          className="field-input"
          value={form.message}
          onChange={(e) => update({ message: e.target.value })}
          required
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>

      {submitError && <p className="field-error">{submitError}</p>}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
