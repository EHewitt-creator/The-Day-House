/**
 * The Day House — lead capture backend on Google Sheets.
 *
 * SETUP
 * 1. Create a new Google Sheet (e.g. "The Day House — Leads").
 * 2. Extensions > Apps Script. Delete the placeholder code and paste this
 *    whole file in.
 * 3. Deploy > New deployment > type "Web app".
 *      Execute as: Me
 *      Who has access: Anyone
 *    (It's a webhook endpoint, not a page anyone should browse to — the
 *    URL itself is the only thing that needs to stay private.)
 * 4. Copy the Web App URL and set it as GOOGLE_SHEETS_WEBHOOK_URL in the
 *    Next.js app's environment (.env.local for local dev; your host's
 *    environment variables in production).
 * 5. Submit a test entry through the site's forms and confirm rows show
 *    up in the sheet. Apps Script will prompt you to authorize Drive and
 *    Sheets access the first time it runs (needed for resume storage).
 *
 * This creates four tabs automatically the first time each is used:
 * "Family Leads", "Career Leads", "Contact Messages", and "Survey
 * Responses" (the standalone planning survey at /survey — see
 * StandaloneSurveyPayload in types/leads.ts). Resumes are saved to a Drive
 * folder named "The Day House — Resumes" (created automatically) and
 * linked from the Career Leads row.
 *
 * Each new row also sends a short email notification (see NOTIFY_EMAILS
 * below) so submissions don't sit unseen in the sheet. It's sent from the
 * Workspace account you authorize the script as (Execute as: Me), so no
 * separate email setup is needed. Change the addresses below, or set any
 * of them to "" to turn a notification off, or add more addresses
 * comma-separated (e.g. "info@yourdayhouse.com,elvina@yourdayhouse.com")
 * to notify more than one inbox.
 */

const NOTIFY_EMAILS = {
  "Family Leads": "info@yourdayhouse.com",
  "Career Leads": "careers@yourdayhouse.com",
  "Contact Messages": "info@yourdayhouse.com",
  "Survey Responses": "info@yourdayhouse.com",
};

const RESUME_FOLDER_NAME = "The Day House — Resumes";

// "Family Leads" columns 1-23 are the original layout and are intentionally
// left completely untouched below — same labels, same order — including
// columns 10-19 ("Preferred Days" through "Willing To Talk 15min"), which
// held answers from the first version of the optional survey. When that
// survey was replaced (2026-09, "2026-09-hours-pricing-v1"), those columns
// were deliberately NOT deleted, renamed, or reordered — doing so would
// misalign every row a live sheet already has, since this script only
// writes the header row once, when a tab is first created (see
// getOrCreateSheet below). They are simply left blank ("") on every row
// this script writes from now on; any historical answers already in those
// columns are untouched. The new survey's answers are appended as
// brand-new columns 24 onward instead. If you already have a live "Family
// Leads" tab with real rows in it, add these new column headers (24-32
// below) to the end of its existing header row before this updated script
// starts writing rows, so new answers land under the right labels.
const HEADERS = {
  "Family Leads": [
    "Submitted At",
    "Full Name",
    "Email",
    "Phone",
    "ZIP Code",
    "Interested In",
    "Days Per Week",
    "Consent To Contact",
    "Survey Completed",
    "Preferred Days",
    "Preferred Arrival",
    "Preferred Pickup",
    "Preferred Hours",
    "Services Wanted",
    "Barriers",
    "Realistic Price Range",
    "Too Expensive Price",
    "What Would Be Valuable",
    "Willing To Talk 15min",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "UTM Content",
    "Survey Version",
    "Preferred Weekdays",
    "Preferred Start Time",
    "Preferred Standard Pickup Time",
    "Extended Pickup Frequency (5:30 PM)",
    "Realistic Usage At $200/Day",
    "Non-Price Barriers",
    "Confidence Requirement",
    "Willing To Talk (Survey v2)",
  ],
  "Career Leads": [
    "Submitted At",
    "Name",
    "Email",
    "Phone",
    "Area Of Interest",
    "Relevant Experience",
    "Why Interested",
    "LinkedIn URL",
    "Resume Link",
    "Permission To Contact",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "UTM Content",
  ],
  "Contact Messages": [
    "Submitted At",
    "Name",
    "Email",
    "Phone",
    "Organization",
    "Message",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "UTM Content",
  ],
  "Survey Responses": [
    "Submitted At",
    "Name",
    "Email",
    "Phone",
    "Survey Version",
    "Preferred Weekdays",
    "Preferred Start Time",
    "Preferred Standard Pickup Time",
    "Extended Pickup Frequency (5:30 PM)",
    "Realistic Usage At $200/Day",
    "Non-Price Barriers",
    "Confidence Requirement",
    "Willing To Talk (15min Conversation)",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "UTM Content",
  ],
};

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheetName = body.sheet;

    if (!HEADERS[sheetName]) {
      return jsonResponse({ ok: false, error: "Unknown sheet: " + sheetName });
    }

    const sheet = getOrCreateSheet(sheetName);

    let row;
    if (sheetName === "Family Leads") {
      row = buildFamilyLeadRow(body);
    } else if (sheetName === "Career Leads") {
      row = buildCareerLeadRow(body);
    } else if (sheetName === "Survey Responses") {
      row = buildSurveyRow(body);
    } else {
      row = buildContactRow(body);
    }

    sheet.appendRow(row);
    sendNotificationEmail(sheetName, body);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function getOrCreateSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(HEADERS[name]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function buildFamilyLeadRow(body) {
  const step1 = body.step1 || {};
  const step2 = body.step2 || {};
  const utm = body.utm || {};

  return [
    body.submittedAt || new Date().toISOString(),
    step1.fullName || "",
    step1.email || "",
    step1.phone || "",
    step1.zipCode || "",
    step1.interestedIn || "",
    step1.daysPerWeek || "",
    step1.consentToContact ? "Yes" : "No",
    body.step2Completed ? "Yes" : "No",
    "", // Preferred Days — retired with the old survey, left blank going forward
    "", // Preferred Arrival — retired with the old survey, left blank going forward
    "", // Preferred Pickup — retired with the old survey, left blank going forward
    "", // Preferred Hours — retired with the old survey, left blank going forward
    "", // Services Wanted — retired with the old survey, left blank going forward
    "", // Barriers — retired with the old survey, left blank going forward
    "", // Realistic Price Range — retired with the old survey, left blank going forward
    "", // Too Expensive Price — retired with the old survey, left blank going forward
    "", // What Would Be Valuable — retired with the old survey, left blank going forward
    "", // Willing To Talk 15min — retired with the old survey, left blank going forward
    utm.utm_source || "",
    utm.utm_medium || "",
    utm.utm_campaign || "",
    utm.utm_content || "",
    step2.surveyVersion || "",
    weekdaysSummary(step2),
    step2.preferredStartTime
      ? step2.preferredStartTime +
        (step2.preferredStartTimeOther ? " (" + step2.preferredStartTimeOther + ")" : "")
      : "",
    step2.preferredStandardPickupTime
      ? step2.preferredStandardPickupTime +
        (step2.preferredStandardPickupTimeOther ? " (" + step2.preferredStandardPickupTimeOther + ")" : "")
      : "",
    step2.extendedPickupFrequency || "",
    step2.realisticUsageAt200 || "",
    (step2.nonPriceBarriers || []).join(", ") +
      (step2.nonPriceBarriersOther ? " (" + step2.nonPriceBarriersOther + ")" : ""),
    step2.confidenceRequirement || "",
    step2.willingToTalk || "",
  ];
}

// "I'm not sure yet" is stored as its own boolean (preferredWeekdaysNotSure)
// rather than mixed into the preferredWeekdays list, so it reads clearly as
// a single cell either way.
function weekdaysSummary(step2) {
  if (step2.preferredWeekdaysNotSure) return "Not sure yet";
  return (step2.preferredWeekdays || []).join(", ");
}

function buildCareerLeadRow(body) {
  const utm = body.utm || {};
  let resumeLink = "";

  if (body.resumeBase64 && body.resumeFileName) {
    resumeLink = saveResumeToDrive(body.resumeBase64, body.resumeMimeType, body.resumeFileName);
  } else if (body.resumeFileName) {
    resumeLink = "(not stored — file too large or forwarding skipped: " + body.resumeFileName + ")";
  }

  return [
    body.submittedAt || new Date().toISOString(),
    body.name || "",
    body.email || "",
    body.phone || "",
    body.areaOfInterest || "",
    body.relevantExperience || "",
    body.whyInterested || "",
    body.linkedInUrl || "",
    resumeLink,
    body.permissionToContact ? "Yes" : "No",
    utm.utm_source || "",
    utm.utm_medium || "",
    utm.utm_campaign || "",
    utm.utm_content || "",
  ];
}

// Standalone /survey submissions — same question set as the family
// interest form's step 2 (body.survey has the same shape as that step2
// object), but with no required step-1 lead capture in front of it. Name,
// email, and phone are all optional here and may be blank.
function buildSurveyRow(body) {
  const survey = body.survey || {};
  const utm = body.utm || {};

  return [
    body.submittedAt || new Date().toISOString(),
    body.name || "",
    body.email || "",
    body.phone || "",
    survey.surveyVersion || "",
    weekdaysSummary(survey),
    survey.preferredStartTime
      ? survey.preferredStartTime +
        (survey.preferredStartTimeOther ? " (" + survey.preferredStartTimeOther + ")" : "")
      : "",
    survey.preferredStandardPickupTime
      ? survey.preferredStandardPickupTime +
        (survey.preferredStandardPickupTimeOther ? " (" + survey.preferredStandardPickupTimeOther + ")" : "")
      : "",
    survey.extendedPickupFrequency || "",
    survey.realisticUsageAt200 || "",
    (survey.nonPriceBarriers || []).join(", ") +
      (survey.nonPriceBarriersOther ? " (" + survey.nonPriceBarriersOther + ")" : ""),
    survey.confidenceRequirement || "",
    survey.willingToTalk || "",
    utm.utm_source || "",
    utm.utm_medium || "",
    utm.utm_campaign || "",
    utm.utm_content || "",
  ];
}

function buildContactRow(body) {
  const utm = body.utm || {};
  return [
    body.submittedAt || new Date().toISOString(),
    body.name || "",
    body.email || "",
    body.phone || "",
    body.organization || "",
    body.message || "",
    utm.utm_source || "",
    utm.utm_medium || "",
    utm.utm_campaign || "",
    utm.utm_content || "",
  ];
}

function getOrCreateResumeFolder() {
  const folders = DriveApp.getFoldersByName(RESUME_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(RESUME_FOLDER_NAME);
}

function saveResumeToDrive(base64, mimeType, fileName) {
  try {
    const folder = getOrCreateResumeFolder();
    const bytes = Utilities.base64Decode(base64);
    const blob = Utilities.newBlob(bytes, mimeType || "application/octet-stream", fileName);
    const file = folder.createFile(blob);
    return file.getUrl();
  } catch (err) {
    return "(failed to save resume: " + String(err) + ")";
  }
}

function sendNotificationEmail(sheetName, body) {
  const recipients = NOTIFY_EMAILS[sheetName];
  if (!recipients) return;

  try {
    const sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
    let subject, summaryLines;

    if (sheetName === "Family Leads") {
      const step1 = body.step1 || {};
      subject = "New interest list signup: " + (step1.fullName || "unknown name");
      summaryLines = [
        "Name: " + (step1.fullName || ""),
        "Email: " + (step1.email || ""),
        "Phone: " + (step1.phone || ""),
        "ZIP: " + (step1.zipCode || ""),
        "Interested in for: " + (step1.interestedIn || ""),
        "Days per week: " + (step1.daysPerWeek || ""),
        "Optional survey completed: " + (body.step2Completed ? "Yes" : "No"),
      ];
    } else if (sheetName === "Career Leads") {
      subject = "New career interest: " + (body.name || "unknown name");
      summaryLines = [
        "Name: " + (body.name || ""),
        "Email: " + (body.email || ""),
        "Phone: " + (body.phone || ""),
        "Area of interest: " + (body.areaOfInterest || ""),
        "Resume attached: " + (body.resumeFileName ? "Yes (" + body.resumeFileName + ")" : "No"),
      ];
    } else if (sheetName === "Survey Responses") {
      subject = "New planning survey response" + (body.name ? ": " + body.name : " (anonymous)");
      summaryLines = [
        "Name: " + (body.name || "(not given)"),
        "Email: " + (body.email || "(not given)"),
        "Phone: " + (body.phone || "(not given)"),
        "Willing to talk 15 min: " + ((body.survey && body.survey.willingToTalk) || ""),
      ];
    } else {
      subject = "New contact message: " + (body.name || "unknown name");
      summaryLines = [
        "Name: " + (body.name || ""),
        "Email: " + (body.email || ""),
        "Phone: " + (body.phone || ""),
        "Organization: " + (body.organization || ""),
        "Message: " + (body.message || ""),
      ];
    }

    const message =
      summaryLines.join("\n") +
      "\n\nFull details in the sheet: " +
      sheetUrl +
      " (tab: " +
      sheetName +
      ")";

    MailApp.sendEmail(recipients, subject, message);
  } catch (err) {
    // Don't let a notification failure block the submission from being
    // recorded — the row is already saved at this point either way.
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
