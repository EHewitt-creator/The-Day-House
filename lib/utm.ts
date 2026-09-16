"use client";

import type { UtmParams } from "@/types/leads";

const STORAGE_KEY = "tdh_utm_params";
const UTM_KEYS: (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
];

/**
 * Captures UTM params from the current URL (if present) and persists them
 * to sessionStorage so they survive navigation between pages (e.g. someone
 * lands on /our-approach from an ad, then submits the form from /contact).
 * Call this once on app load (see UtmCapture component).
 */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;

  try {
    const url = new URL(window.location.href);
    const found: UtmParams = {};
    let hasAny = false;

    UTM_KEYS.forEach((key) => {
      const value = url.searchParams.get(key);
      if (value) {
        found[key] = value;
        hasAny = true;
      }
    });

    if (hasAny) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    // sessionStorage may be unavailable (private browsing, etc.) — fail silently.
  }
}

/** Reads previously captured UTM params for inclusion in a form submission. */
export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}
