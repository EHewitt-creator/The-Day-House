"use client";

import type { FamilyInterestStepTwo, ServiceFeatureOption, BarrierOption } from "@/types/leads";
import {
  DAYS_OF_WEEK,
  PREFERRED_HOURS_OPTIONS,
  SERVICE_FEATURE_OPTIONS,
  BARRIER_OPTIONS,
  PRICE_RANGE_OPTIONS,
} from "@/lib/formOptions";

type Props = {
  value: FamilyInterestStepTwo;
  onChange: (patch: Partial<FamilyInterestStepTwo>) => void;
};

function toggleValue<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function FamilyInterestStepTwo({ value, onChange }: Props) {
  function toggleDay(day: string) {
    onChange({ preferredDaysOfWeek: toggleValue(value.preferredDaysOfWeek, day) });
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="text-lg font-semibold text-sage-700">
          Help us build a program that works for local families.
        </p>
        <p className="mt-1 text-sm text-ink-700">
          Everything below is optional. It helps us plan hours, services, and
          pricing before we open, it is not a commitment of any kind.
        </p>
      </div>

      <fieldset>
        <legend className="field-label">A. Which days of the week would you likely need?</legend>
        <div className="flex flex-wrap gap-2">
          {DAYS_OF_WEEK.map((day) => {
            const active = value.preferredDaysOfWeek.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                aria-pressed={active}
                className={`min-h-[44px] rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "border-sage-600 bg-sage-600 text-cream"
                    : "border-ink/15 bg-cream-50 text-ink-700 hover:border-sage-300"
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
            B. Preferred arrival time
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

      <fieldset>
        <legend className="field-label">
          C. Which hours would be most useful to your family?
        </legend>
        <div className="space-y-2">
          {PREFERRED_HOURS_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex min-h-[44px] items-center gap-3 text-base text-ink-700">
              <input
                type="radio"
                name="preferredHours"
                className="h-5 w-5 shrink-0 border-ink/30 text-sage-600 focus:ring-sage-500"
                checked={value.preferredHours === opt.value}
                onChange={() => onChange({ preferredHours: opt.value })}
              />
              {opt.label}
            </label>
          ))}
          {value.preferredHours === "other" && (
            <input
              type="text"
              placeholder="Tell us what would work better"
              className="field-input mt-2"
              value={value.preferredHoursOther}
              onChange={(e) => onChange({ preferredHoursOther: e.target.value })}
            />
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend className="field-label">
          D. Which services or features would matter most? (select all that apply)
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {SERVICE_FEATURE_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex min-h-[44px] items-start gap-3 text-base text-ink-700">
              <input
                type="checkbox"
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink/30 text-sage-600 focus:ring-sage-500"
                checked={value.servicesWanted.includes(opt.value as ServiceFeatureOption)}
                onChange={() =>
                  onChange({
                    servicesWanted: toggleValue(value.servicesWanted, opt.value as ServiceFeatureOption),
                  })
                }
              />
              {opt.label}
            </label>
          ))}
        </div>
        {value.servicesWanted.includes("other") && (
          <input
            type="text"
            placeholder="Other services or features"
            className="field-input mt-3"
            value={value.servicesWantedOther}
            onChange={(e) => onChange({ servicesWantedOther: e.target.value })}
          />
        )}
      </fieldset>

      <fieldset>
        <legend className="field-label">
          E. What would make it difficult for your family to use a program like The Day House? (select all that apply)
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {BARRIER_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex min-h-[44px] items-start gap-3 text-base text-ink-700">
              <input
                type="checkbox"
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink/30 text-sage-600 focus:ring-sage-500"
                checked={value.barriers.includes(opt.value as BarrierOption)}
                onChange={() =>
                  onChange({ barriers: toggleValue(value.barriers, opt.value as BarrierOption) })
                }
              />
              {opt.label}
            </label>
          ))}
        </div>
        {value.barriers.includes("other") && (
          <input
            type="text"
            placeholder="Other barriers"
            className="field-input mt-3"
            value={value.barriersOther}
            onChange={(e) => onChange({ barriersOther: e.target.value })}
          />
        )}
      </fieldset>

      <fieldset>
        <legend className="field-label">
          F. For a full day of high-quality, dementia-informed daytime
          support, including activities, lunch, snacks, and personal
          assistance as needed, which daily price range would feel realistic
          for your family?
        </legend>
        <div className="space-y-2">
          {PRICE_RANGE_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex min-h-[44px] items-center gap-3 text-base text-ink-700">
              <input
                type="radio"
                name="realisticPriceRange"
                className="h-5 w-5 shrink-0 border-ink/30 text-sage-600 focus:ring-sage-500"
                checked={value.realisticPriceRange === opt.value}
                onChange={() => onChange({ realisticPriceRange: opt.value })}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <label htmlFor="tooExpensivePrice" className="field-label mt-6">
          At what price would the program feel too expensive for you to
          seriously consider? (optional)
        </label>
        <input
          id="tooExpensivePrice"
          type="text"
          placeholder="e.g. $250/day"
          className="field-input"
          value={value.tooExpensivePrice}
          onChange={(e) => onChange({ tooExpensivePrice: e.target.value })}
        />
      </fieldset>

      <div>
        <label htmlFor="whatWouldBeValuable" className="field-label">
          G. What would make The Day House especially valuable to your family?
        </label>
        <textarea
          id="whatWouldBeValuable"
          rows={4}
          className="field-input"
          value={value.whatWouldBeValuable}
          onChange={(e) => onChange({ whatWouldBeValuable: e.target.value })}
        />
      </div>

      <fieldset>
        <legend className="field-label">
          H. Would you be willing to participate in a 15-minute conversation
          as we design the program?
        </legend>
        <div className="flex gap-6">
          {(["yes", "no"] as const).map((option) => (
            <label key={option} className="flex min-h-[44px] items-center gap-2 text-base capitalize text-ink-700">
              <input
                type="radio"
                name="willingToTalk"
                className="h-5 w-5 shrink-0 border-ink/30 text-sage-600 focus:ring-sage-500"
                checked={value.willingToTalk === option}
                onChange={() => onChange({ willingToTalk: option })}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
