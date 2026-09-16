import { NextRequest, NextResponse } from "next/server";
import type { ContactPayload } from "@/types/leads";
import { forwardToSheet } from "@/lib/googleSheets";

// Forwarded to a Google Sheet if GOOGLE_SHEETS_WEBHOOK_URL is configured
// (see lib/googleSheets.ts and docs/google-apps-script.gs). Consider also
// wiring up an email send (Resend, SendGrid, or a Gmail-based approach)
// so general inquiries reach someone's inbox directly, not just the sheet.
export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as ContactPayload;

    if (!payload?.email || !payload?.name || !payload?.message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[contact] submission received:", JSON.stringify(payload, null, 2));
    }

    await forwardToSheet("Contact Messages", payload);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid submission." },
      { status: 400 }
    );
  }
}
