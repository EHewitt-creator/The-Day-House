"use client";

import type { FamilyInterestStepOne } from "@/types/leads";
import type { FieldErrors } from "@/lib/validation";
import { INTERESTED_IN_OPTIONS, DAYS_PER_WEEK_OPTIONS } from "@/lib/formOptions";

type Props = {
  value: FamilyInterestStepOne;
  errors: FieldErrors;
  onChange: (patch: Partial<FamilyInterestStepOne>) => void;
};

/**
 * Deliberately short: just enough to save a real lead. Preferred days,
 * arrival/pickup times, services, barriers, and pricing all live in the
 * optional step 2 survey instead, so joining the list never feels like
 * filling out an intake form.
 */
export default function FamilyInterestStepOne({ value, errors, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="field-label">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            className="field-input"
            value={value.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            required
          />
          {errors.fullName && (
            <p id="fullName-error" className="field-error">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="field-input"
            value={value.email}
            onChange={(e) => onChange({ email: e.target.value })}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="zipCode" className="field-label">
            ZIP code
          </label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            className="field-input"
            value={value.zipCode}
            onChange={(e) => onChange({ zipCode: e.target.value })}
            aria-invalid={!!errors.zipCode}
            aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
            required
          />
          {errors.zipCode && <p id="zipCode-error" className="field-error">{errors.zipCode}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="field-label">
            Phone number <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="field-input"
            value={value.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && <p id="phone-error" className="field-error">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="interestedIn" className="field-label">
          Who are you exploring The Day House for?
        </label>
        <select
          id="interestedIn"
          className="field-input"
          value={value.interestedIn}
          onChange={(e) => onChange({ interestedIn: e.target.value as FamilyInterestStepOne["interestedIn"] })}
          aria-invalid={!!errors.interestedIn}
          aria-describedby={errors.interestedIn ? "interestedIn-error" : undefined}
          required
        >
          <option value="">Select one</option>
          {INTERESTED_IN_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.interestedIn && <p id="interestedIn-error" className="field-error">{errors.interestedIn}</p>}
      </div>

      <div>
        <label htmlFor="daysPerWeek" className="field-label">
          Approximate days per week you may need
        </label>
        <select
          id="daysPerWeek"
          className="field-input"
          value={value.daysPerWeek}
          onChange={(e) => onChange({ daysPerWeek: e.target.value as FamilyInterestStepOne["daysPerWeek"] })}
          aria-invalid={!!errors.daysPerWeek}
          aria-describedby={errors.daysPerWeek ? "daysPerWeek-error" : undefined}
          required
        >
          <option value="">Select one</option>
          {DAYS_PER_WEEK_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.daysPerWeek && <p id="daysPerWeek-error" className="field-error">{errors.daysPerWeek}</p>}
      </div>

      <div className="flex items-start gap-3 rounded-xl2 bg-sage-50 p-4">
        <input
          id="consentToContact"
          type="checkbox"
          className="mt-1 h-5 w-5 shrink-0 rounded border-ink/30 text-sage-600 focus:ring-sage-500"
          checked={value.consentToContact}
          onChange={(e) => onChange({ consentToContact: e.target.checked })}
          aria-invalid={!!errors.consentToContact}
          aria-describedby={errors.consentToContact ? "consent-error" : undefined}
          required
        />
        <label htmlFor="consentToContact" className="text-sm text-ink-700">
          I consent to receive emails and updates from The Day House about
          opening, tours, programming, pricing, and enrollment availability.
          Joining this list does not commit me to enrollment.
        </label>
      </div>
      {errors.consentToContact && <p id="consent-error" className="field-error">{errors.consentToContact}</p>}
    </div>
  );
}
