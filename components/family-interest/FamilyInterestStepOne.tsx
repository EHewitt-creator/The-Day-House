"use client";

import type { FamilyInterestStepOne } from "@/types/leads";
import type { FieldErrors } from "@/lib/validation";
import {
  INTERESTED_IN_OPTIONS,
  PRIMARY_LOOKING_FOR_OPTIONS,
  DAYS_PER_WEEK_OPTIONS,
  DAYS_OF_WEEK,
} from "@/lib/formOptions";

type Props = {
  value: FamilyInterestStepOne;
  errors: FieldErrors;
  onChange: (patch: Partial<FamilyInterestStepOne>) => void;
};

export default function FamilyInterestStepOne({ value, errors, onChange }: Props) {
  function toggleDay(day: string) {
    const next = value.preferredDaysOfWeek.includes(day)
      ? value.preferredDaysOfWeek.filter((d) => d !== day)
      : [...value.preferredDaysOfWeek, day];
    onChange({ preferredDaysOfWeek: next });
  }

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
          <label htmlFor="phone" className="field-label">
            Phone number
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
            required
          />
          {errors.phone && <p id="phone-error" className="field-error">{errors.phone}</p>}
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
      </div>

      <div>
        <label htmlFor="interestedIn" className="field-label">
          Who are you interested in The Day House for?
        </label>
        <select
          id="interestedIn"
          className="field-input"
          value={value.interestedIn}
          onChange={(e) => onChange({ interestedIn: e.target.value as FamilyInterestStepOne["interestedIn"] })}
          aria-invalid={!!errors.interestedIn}
          required
        >
          <option value="">Select one</option>
          {INTERESTED_IN_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.interestedIn && <p className="field-error">{errors.interestedIn}</p>}
      </div>

      <div>
        <label htmlFor="primaryLookingFor" className="field-label">
          What are you primarily looking for?
        </label>
        <select
          id="primaryLookingFor"
          className="field-input"
          value={value.primaryLookingFor}
          onChange={(e) => onChange({ primaryLookingFor: e.target.value as FamilyInterestStepOne["primaryLookingFor"] })}
          aria-invalid={!!errors.primaryLookingFor}
          required
        >
          <option value="">Select one</option>
          {PRIMARY_LOOKING_FOR_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.primaryLookingFor && <p className="field-error">{errors.primaryLookingFor}</p>}
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
          required
        >
          <option value="">Select one</option>
          {DAYS_PER_WEEK_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.daysPerWeek && <p className="field-error">{errors.daysPerWeek}</p>}
      </div>

      <fieldset>
        <legend className="field-label">Preferred days of week</legend>
        <div className="flex flex-wrap gap-2">
          {DAYS_OF_WEEK.map((day) => {
            const active = value.preferredDaysOfWeek.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                aria-pressed={active}
                className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "border-sage-600 bg-sage-600 text-cream"
                    : "border-ink/15 bg-cream-50 text-ink-700 hover:border-sage-400"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="preferredArrivalTime" className="field-label">
            Preferred arrival time
          </label>
          <input
            id="preferredArrivalTime"
            type="time"
            className="field-input"
            value={value.preferredArrivalTime}
            onChange={(e) => onChange({ preferredArrivalTime: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="preferredPickupTime" className="field-label">
            Preferred pickup time
          </label>
          <input
            id="preferredPickupTime"
            type="time"
            className="field-input"
            value={value.preferredPickupTime}
            onChange={(e) => onChange({ preferredPickupTime: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl2 bg-sage-50 p-4">
        <input
          id="consentToContact"
          type="checkbox"
          className="mt-1 h-5 w-5 rounded border-ink/30 text-sage-600 focus:ring-sage-500"
          checked={value.consentToContact}
          onChange={(e) => onChange({ consentToContact: e.target.checked })}
          aria-invalid={!!errors.consentToContact}
          required
        />
        <label htmlFor="consentToContact" className="text-sm text-ink-700">
          I consent to receive emails and updates from The Day House about
          opening, tours, programming, pricing, and enrollment availability.
          Joining this list does not commit me to enrollment.
        </label>
      </div>
      {errors.consentToContact && <p className="field-error">{errors.consentToContact}</p>}
    </div>
  );
}
