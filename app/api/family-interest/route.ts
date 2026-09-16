import { NextRequest, NextResponse } from "next/server";
import type { FamilyInterestPayload } from "@/types/leads";
import { forwardToSheet } from "@/lib/googleSheets";

// Family leads are kept as their own payload shape (see types/leads.ts) so
// step-1-only leads and full survey responses can both be exported and
// analyzed distinctly from career leads. Submissions are forwarded to a
// Google Sheet if GOOGLE_SHEETS_WEBHOOK_URL is configured (see
// lib/googleSheets.ts and docs/google-apps-script.gs) — otherwise this
// just logs, which keeps the form working before that's set up.
export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as FamilyInterestPayload;

    if (!payload?.step1?.email || !payload?.step1?.fullName) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[family-interest] submission received:", JSON.stringify(payload, null, 2));
    }

    await forwardToSheet("Family Leads", payload);

    // TODO: also persist `payload` to a database or CRM/ESP here, if and
    // when Sheets is no longer the right home for these leads.

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid submission." },
      { status: 400 }
    );
  }
}
