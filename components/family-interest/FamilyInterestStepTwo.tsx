"use client";

import { useEffect, useRef } from "react";
import type {
  FamilyInterestStepTwo,
  PreferredWeekdayOption,
  NonPriceBarrierOption,
} from "@/types/leads";
import {
  PREFERRED_WEEKDAY_OPTIONS,
  SCHEDULE_PREFERENCE_OPTIONS,
  EXTENDED_PICKUP_FREQUENCY_OPTIONS,
  REALISTIC_USAGE_AT_200_OPTIONS,
  NON_PRICE_BARRIER_OPTIONS,
  NON_PRICE_BARRIERS_MAX,
  WILLING_TO_TALK_OPTIONS,
  CONFIDENCE_REQUIREMENT_MAX_LENGTH,
} from "@/lib/formOptions";

type Props = {
  value: FamilyInterestStepTwo;
  onChange: (patch: Partial<FamilyInterestStepTwo>) => void;
};

// Shared styling so every question in this survey reads the same way: full
// width on mobile, generous touch targets, and a checked state that never
// depends on color alone (the native check/radio glyph carries that).
const OPTION_ROW =
  "flex min-h-[44px] items-start gap-3 rounded-xl border-2 px-4 py-3 text-base text-ink-700 transition";
const OPTION_ROW_ACTIVE = "border-sage-600 bg-sage-50";
const OPTION_ROW_INACTIVE = "border-ink/10 bg-cream-50";
const OPTION_ROW_DISABLED = "cursor-not-allowed opacity-50";

export default function FamilyInterestStepTwo({ value, onChange }: Props) {
  const scheduleOtherRef = useRef<HTMLInputElement>(null);
  const barriersOtherRef = useRef<HTMLInputElement>(null);

  // Move focus onto a conditional field the moment it appears, so keyboard
  // and screen-reader users land somewhere sensible instead of having to
  // hunt for the new field that just showed up below the option they chose.
  useEffect(() => {
    if (value.schedulePreference === "neither") scheduleOtherRef.current?.focus();
  }, [value.schedulePreference]);

  useEffect(() => {
    if (value.nonPriceBarriers.includes("other")) barriersOtherRef.current?.focus();
  }, [value.nonPriceBarriers]);

  function toggleWeekday(day: PreferredWeekdayOption) {
    const next = value.preferredWeekdays.includes(day)
      ? value.preferredWeekdays.filter((d) => d !== day)
      : [...value.preferredWeekdays, day];
    // Selecting any weekday means the family isn't "not sure" anymore.
    onChange({ preferredWeekdays: next, preferredWeekdaysNotSure: false });
  }

  function toggleWeekdaysNotSure() {
    onChange(
      value.preferredWeekdaysNotSure
        ? { preferredWeekdaysNotSure: false }
        : { preferredWeekdaysNotSure: true, preferredWeekdays: [] }
    );
  }

  function selectSchedulePreference(val: FamilyInterestStepTwo["schedulePreference"]) {
    onChange({
      schedulePreference: val,
      ...(val !== "neither" ? { schedulePreferenceOther: "" } : {}),
    });
  }

  const barriersAtMax = value.nonPriceBarriers.length >= NON_PRICE_BARRIERS_MAX;

  function toggleBarrier(option: NonPriceBarrierOption) {
    const isSelected = value.nonPriceBarriers.includes(option);
    if (!isSelected && barriersAtMax) return;
    const next = isSelected
      ? value.nonPriceBarriers.filter((b) => b !== option)
      : [...value.nonPriceBarriers, option];
    onChange({
      nonPriceBarriers: next,
      ...(option === "other" && isSelected ? { nonPriceBarriersOther: "" } : {}),
    });
  }

  return (
    <div className="space-y-10">
      {/* Question 1: preferred weekdays */}
      <fieldset>
        <legend className="field-label">Which weekdays would you most likely need?</legend>
        <p className="mb-3 text-sm text-ink-500">Select all that apply.</p>
        <div className="space-y-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0">
          {PREFERRED_WEEKDAY_OPTIONS.map((opt) => {
            const active = value.preferredWeekdays.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={`${OPTION_ROW} cursor-pointer ${active ? OPTION_ROW_ACTIVE : OPTION_ROW_INACTIVE}`}
              >
                <input
                  type="checkbox"
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink/30 text-sage-600 focus:ring-sage-500"
                  checked={active}
                  onChange={() => toggleWeekday(opt.value)}
                />
                <span className="font-medium">{opt.label}</span>
              </label>
            );
          })}
          <label
            className={`${OPTION_ROW} cursor-pointer sm:col-span-2 ${
              value.preferredWeekdaysNotSure ? OPTION_ROW_ACTIVE : OPTION_ROW_INACTIVE
            }`}
          >
            <input
              type="checkbox"
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink/30 text-sage-600 focus:ring-sage-500"
              checked={value.preferredWeekdaysNotSure}
              onChange={toggleWeekdaysNotSure}
            />
            <span className="font-medium">I&rsquo;m not sure yet</span>
          </label>
        </div>
      </fieldset>

      {/* Question 2: schedule preference. Replaces the old separate
          "preferred start time" / "preferred standard pickup time"
          questions (see lib/formOptions.ts SURVEY_VERSION v2 comment) now
          that Full Day and Half Day are two fixed start+end packages rather
          than independently adjustable times. */}
      <fieldset>
        <legend className="field-label">
          Which option fits your family&rsquo;s schedule best?
        </legend>
        <div className="space-y-2">
          {SCHEDULE_PREFERENCE_OPTIONS.map((opt) => {
            const active = value.schedulePreference === opt.value;
            return (
              <label
                key={opt.value}
                className={`${OPTION_ROW} cursor-pointer ${active ? OPTION_ROW_ACTIVE : OPTION_ROW_INACTIVE}`}
              >
                <input
                  type="radio"
                  name="schedulePreference"
                  className="mt-0.5 h-5 w-5 shrink-0 border-ink/30 text-sage-600 focus:ring-sage-500"
                  checked={active}
                  onChange={() => selectSchedulePreference(opt.value)}
                />
                <span className="font-medium">{opt.label}</span>
              </label>
            );
          })}
        </div>
        {value.schedulePreference === "neither" && (
          <div className="mt-3">
            <label htmlFor="schedulePreferenceOther" className="field-label">
              What would work better for your family?
            </label>
            <input
              ref={scheduleOtherRef}
              id="schedulePreferenceOther"
              type="text"
              className="field-input"
              value={value.schedulePreferenceOther}
              onChange={(e) => onChange({ schedulePreferenceOther: e.target.value })}
            />
          </div>
        )}
      </fieldset>

      {/* Question 3: extended-hours demand. extendedPickupFrequency keeps
          its field name and answer scale (see lib/formOptions.ts) — only
          this question's premise changed, from "pickup until 5:30 PM" as a
          premium ask (back when 5:30 PM wasn't the standard Full Day end
          time) to the actual current add-on: extra hours beyond a chosen
          option, billed hourly up to the Full Day rate. */}
      <fieldset>
        <legend className="field-label">
          If you chose Half Day, how often would you want to add extra hours
          (at $25/hour, up to the Full Day rate)?
        </legend>
        <div className="space-y-2">
          {EXTENDED_PICKUP_FREQUENCY_OPTIONS.map((opt) => {
            const active = value.extendedPickupFrequency === opt.value;
            return (
              <label
                key={opt.value}
                className={`${OPTION_ROW} cursor-pointer ${active ? OPTION_ROW_ACTIVE : OPTION_ROW_INACTIVE}`}
              >
                <input
                  type="radio"
                  name="extendedPickupFrequency"
                  className="mt-0.5 h-5 w-5 shrink-0 border-ink/30 text-sage-600 focus:ring-sage-500"
                  checked={active}
                  onChange={() => onChange({ extendedPickupFrequency: opt.value })}
                />
                <span className="font-medium">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Question 4: realistic utilization at current pricing.
          realisticUsageAt200 also keeps its field name and answer scale —
          only the preamble below now names both prices instead of just
          the old flat $200/day. */}
      <fieldset>
        <legend className="field-label">
          The anticipated price is $200 per full day or $125 per half day.
          At these prices, how often could your family realistically use
          The Day House?
        </legend>
        <div className="mt-3 space-y-2">
          {REALISTIC_USAGE_AT_200_OPTIONS.map((opt) => {
            const active = value.realisticUsageAt200 === opt.value;
            return (
              <label
                key={opt.value}
                className={`${OPTION_ROW} cursor-pointer ${active ? OPTION_ROW_ACTIVE : OPTION_ROW_INACTIVE}`}
              >
                <input
                  type="radio"
                  name="realisticUsageAt200"
                  className="mt-0.5 h-5 w-5 shrink-0 border-ink/30 text-sage-600 focus:ring-sage-500"
                  checked={active}
                  onChange={() => onChange({ realisticUsageAt200: opt.value })}
                />
                <span className="font-medium">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Question 5: non-price barriers */}
      <fieldset>
        <legend className="field-label">
          Other than price, what could make it difficult for your family to
          use The Day House?
        </legend>
        <p className="mb-3 text-sm text-ink-500">Choose up to two.</p>
        <div className="space-y-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0">
          {NON_PRICE_BARRIER_OPTIONS.map((opt) => {
            const active = value.nonPriceBarriers.includes(opt.value);
            const disabled = !active && barriersAtMax;
            return (
              <label
                key={opt.value}
                className={`${OPTION_ROW} ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${
                  active ? OPTION_ROW_ACTIVE : OPTION_ROW_INACTIVE
                } ${disabled ? OPTION_ROW_DISABLED : ""}`}
              >
                <input
                  type="checkbox"
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink/30 text-sage-600 focus:ring-sage-500 disabled:cursor-not-allowed"
                  checked={active}
                  disabled={disabled}
                  onChange={() => toggleBarrier(opt.value)}
                />
                <span className="font-medium">{opt.label}</span>
              </label>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-ink-500" aria-live="polite">
          {barriersAtMax
            ? "You’ve chosen two. Uncheck one to pick a different option."
            : `You can choose up to ${NON_PRICE_BARRIERS_MAX}.`}
        </p>
        {value.nonPriceBarriers.includes("other") && (
          <div className="mt-3">
            <label htmlFor="nonPriceBarriersOther" className="field-label">
              Please tell us more.
            </label>
            <input
              ref={barriersOtherRef}
              id="nonPriceBarriersOther"
              type="text"
              className="field-input"
              value={value.nonPriceBarriersOther}
              onChange={(e) => onChange({ nonPriceBarriersOther: e.target.value })}
            />
          </div>
        )}
      </fieldset>

      {/* Question 6: trust requirement */}
      <div>
        <label htmlFor="confidenceRequirement" className="field-label">
          What is the one thing that would make you feel confident that your
          loved one would have a good day at The Day House?
        </label>
        <textarea
          id="confidenceRequirement"
          rows={4}
          maxLength={CONFIDENCE_REQUIREMENT_MAX_LENGTH}
          className="field-input"
          value={value.confidenceRequirement}
          onChange={(e) => onChange({ confidenceRequirement: e.target.value })}
        />
        <p className="mt-1 text-right text-sm text-ink-500">
          {value.confidenceRequirement.length}/{CONFIDENCE_REQUIREMENT_MAX_LENGTH}
        </p>
      </div>

      {/* Follow-up conversation */}
      <fieldset>
        <legend className="field-label">
          Would you be willing to participate in a 15-minute conversation as
          we design the program?
        </legend>
        <div className="flex flex-col gap-2 sm:flex-row">
          {WILLING_TO_TALK_OPTIONS.map((opt) => {
            const active = value.willingToTalk === opt.value;
            return (
              <label
                key={opt.value}
                className={`${OPTION_ROW} flex-1 cursor-pointer justify-center ${
                  active ? OPTION_ROW_ACTIVE : OPTION_ROW_INACTIVE
                }`}
              >
                <input
                  type="radio"
                  name="willingToTalk"
                  className="mt-0.5 h-5 w-5 shrink-0 border-ink/30 text-sage-600 focus:ring-sage-500"
                  checked={active}
                  onChange={() => onChange({ willingToTalk: opt.value })}
                />
                <span className="font-medium">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
