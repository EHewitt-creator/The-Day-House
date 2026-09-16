import { NextRequest, NextResponse } from "next/server";
import type { CareerInterestPayload } from "@/types/leads";
import { forwardToSheet } from "@/lib/googleSheets";

// Submitted as multipart/form-data because of the optional resume upload.
// Forwarded to a Google Sheet (with the resume uploaded to Drive) if
// GOOGLE_SHEETS_WEBHOOK_URL is configured — see lib/googleSheets.ts and
// docs/google-apps-script.gs. Otherwise this just logs, which keeps the
// form working before that's set up. Swap for a real ATS later if the
// volume of applicants outgrows a spreadsheet.
const MAX_RESUME_BYTES_TO_FORWARD = 8 * 1024 * 1024; // 8MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const resume = formData.get("resume");

    const payload: CareerInterestPayload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      areaOfInterest: (formData.get("areaOfInterest") as CareerInterestPayload["areaOfInterest"]) ?? "",
      relevantExperience: String(formData.get("relevantExperience") ?? ""),
      whyInterested: String(formData.get("whyInterested") ?? ""),
      resumeFileName: resume instanceof File ? resume.name : undefined,
      linkedInUrl: String(formData.get("linkedInUrl") ?? "") || undefined,
      permissionToContact: formData.get("permissionToContact") === "true",
      utm: JSON.parse(String(formData.get("utm") ?? "{}")),
      submittedAt: String(formData.get("submittedAt") ?? new Date().toISOString()),
      source: "career_interest_form",
    };

    if (!payload.name || !payload.email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[career-interest] submission received:", JSON.stringify(payload, null, 2));
      if (resume instanceof File) {
        // eslint-disable-next-line no-console
        console.log(`[career-interest] resume attached: ${resume.name} (${resume.size} bytes)`);
      }
    }

    // Base64-encode the resume (if present and reasonably sized) so the
    // Apps Script side can save it to Drive and link it from the sheet
    // row. Larger files are skipped here to stay well under the Apps
    // Script Web App request-size ceiling; the filename is still recorded.
    let resumeBase64: string | undefined;
    let resumeMimeType: string | undefined;
    if (resume instanceof File && resume.size > 0 && resume.size <= MAX_RESUME_BYTES_TO_FORWARD) {
      const bytes = new Uint8Array(await resume.arrayBuffer());
      resumeBase64 = Buffer.from(bytes).toString("base64");
      resumeMimeType = resume.type || "application/octet-stream";
    }

    await forwardToSheet("Career Leads", { ...payload, resumeBase64, resumeMimeType });

    // TODO: swap for a real ATS/CRM here if the volume of applicants
    // outgrows a spreadsheet.

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid submission." },
      { status: 400 }
    );
  }
}
