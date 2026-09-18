import { NextRequest, NextResponse } from "next/server";
import type { StandaloneSurveyPayload } from "@/types/leads";
import { forwardToSheet } from "@/lib/googleSheets";
import { isValidEmail, isValidPhone } from "@/lib/validation";

// Standalone planning survey, decoupled from the family interest list —
// see components/survey/SurveyForm.tsx. Every field is optional (including
// contact info), so unlike /api/family-interest and /api/contact, there is
// no required-field check here: a fully blank submission is a legitimate,
// anonymous response and is still worth recording.
export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as StandaloneSurveyPayload;

    if (!payload?.survey) {
      return NextResponse.json(
        { ok: false, error: "Missing survey responses." },
        { status: 400 }
      );
    }

    // Contact info is optional and unverified — if given but malformed,
    // drop just that field rather than rejecting the whole submission.
    const name = payload.name?.trim() || undefined;
    const email = payload.email && isValidEmail(payload.email) ? payload.email.trim() : undefined;
    const phone = payload.phone && isValidPhone(payload.phone) ? payload.phone.trim() : undefined;

    const sanitizedPayload: StandaloneSurveyPayload = {
      ...payload,
      name,
      email,
      phone,
    };

    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[survey] submission received:", JSON.stringify(sanitizedPayload, null, 2));
    }

    await forwardToSheet("Survey Responses", sanitizedPayload);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid submission." },
      { status: 400 }
    );
  }
}
