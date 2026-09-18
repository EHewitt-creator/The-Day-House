// Optional forwarder to a Google Apps Script Web App bound to a Google
// Sheet. This is the fastest way to get a real, working backend for a team
// on Google Workspace without standing up a database.
//
// Setup: see docs/google-apps-script.gs for the script to paste into
// script.google.com, and set GOOGLE_SHEETS_WEBHOOK_URL to the deployed
// Web App URL (looks like https://script.google.com/macros/s/.../exec).
//
// If GOOGLE_SHEETS_WEBHOOK_URL isn't set, this is a no-op — the API routes
// still log to the console and return success, so the site works out of
// the box before this is configured.

type SheetName = "Family Leads" | "Career Leads" | "Contact Messages" | "Survey Responses";

export async function forwardToSheet(
  sheet: SheetName,
  payload: Record<string, unknown>
): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sheet, ...payload }),
    });
    if (!res.ok && process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`[googleSheets] webhook responded ${res.status} for "${sheet}"`);
    }
  } catch (err) {
    // Never let a Sheets outage block someone from joining the interest
    // list or contacting us — log and move on.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`[googleSheets] failed to forward to "${sheet}":`, err);
    }
  }
}
