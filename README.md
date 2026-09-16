# The Day House — Landing Site

A Next.js (App Router) + TypeScript + Tailwind CSS marketing site for The
Day House, a new social adult day program for adults living with memory
loss and dementia, opening in the Treasure Valley, Idaho.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

This build was verified in a sandboxed environment without access to
`fonts.googleapis.com`; a normal environment (local machine, Vercel, etc.)
will fetch the Fraunces/Inter fonts at build time with no changes needed.

## Homepage structure

The homepage (`app/page.tsx`) is a short, mobile-first, conversion-focused
landing page built around one dominant journey: understand The Day House,
trust The Day House, join the interest list. Sections render in this
order:

1. `Hero` — headline, supporting copy, primary and secondary CTA, and a
   photo-free branded visual panel (no stock photography).
2. `Pillars` — 4 "why we're different" pillars (Purpose, Connection,
   Choice, Dependable Support), each a compact icon + description row.
3. `DayInLife` — 4 categories of "what a day may feel like," rendered as a
   vertical rhythm/timeline, not a tile grid.
4. `FamilyValue` — the caregiver-relief pitch plus a chip grid of what
   families get time back for.
5. `FamilyInterestSection` — the two-step interest form (moved up from
   near the bottom of the old page; see "Forms and data" below).
6. `FoundersPreview` — a compact, two-founder summary with initials
   avatars (no photo placeholders).
7. `SecondaryPathways` — a single dark section combining the Careers
   teaser and the Partners/Community teaser, each linking to its own full
   page rather than embedding a form on the homepage.
8. `ClosingCta` — a short final interest-list prompt before the footer.

`components/CareersSection.tsx` and `components/CommunityContact.tsx`
(the old, longer standalone sections) and `BrandStatementBanner` (the old
full-width three-column promise banner) have been removed; their
homepage-relevant content now lives in `SecondaryPathways` and
`ClosingCta`. The full career-interest form (with resume upload) still
lives on its own page at `/careers`, unchanged.

## What's here

- `app/` — App Router pages: home (`/`), `/our-approach`, `/about`,
  `/careers`, `/contact`, `/privacy`, plus API routes under `app/api/`.
- `components/` — Page sections and shared UI (Nav, Footer, forms, photo
  placeholders, etc.). `components/family-interest/` holds the two-step
  waitlist form and its optional research survey. The homepage itself no
  longer uses `PhotoPlaceholder`; it's still used on `/about` for the
  founders' portraits.
- `lib/` — Analytics event helper, UTM capture/storage, form validation,
  and the shared option lists used by the forms.
- `types/leads.ts` — Typed payload shapes for family leads, career leads,
  and general contact messages, kept separate on purpose.
- `public/brand/logo-grid.png` — the real brand mark, cropped from the
  approved logo artwork (the four-color grid with the leaf accent). It's
  the single source used everywhere the mark appears: the nav and footer
  (`components/Logo.tsx`), the browser favicon (`app/icon.png`), the iOS
  home-screen icon (`app/apple-icon.png`), and the Open Graph preview
  image (`app/opengraph-image.tsx`, which inlines it as a data URI so it
  renders without a network fetch). Replace `logo-grid.png` and re-crop
  the derived files if the mark is ever redesigned.

## Forms and data

Three placeholder API routes log submissions to the server console in
development and return `{ ok: true }`:

- `POST /api/family-interest` — interest list (step 1, required) and the
  optional "help us build the program" survey (step 2). A lead is created
  from step 1 alone; step 2 is a second, separate submission tagged
  `step2Completed: true`. Step 1 collects only the minimum needed to
  create a lead: full name, email, ZIP code, optional phone, who you're
  exploring the program for, and approximate days per week. Everything
  else (preferred days/times, preferred hours, services wanted, barriers,
  price sensitivity, and willingness to do a 15-minute interview) moved
  into the fully optional, fully skippable step 2 survey.
- `POST /api/career-interest` — talent community signups. Sent as
  `multipart/form-data` because of the optional resume upload.
- `POST /api/contact` — general inquiries from families, referral
  partners, and community organizations.

None of these currently write to a database or CRM — see "Next steps."

UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`)
are captured from the URL on first page load and stored in
`sessionStorage`, then attached to every form submission automatically
(`lib/utm.ts`).

## Analytics

`lib/analytics.ts` exports a single `track()` function with these named
events, called from the relevant components:

`hero_interest_click`, `family_form_start`, `family_form_submit`,
`survey_complete`, `career_click`, `career_form_submit`, `contact_click`.

No analytics provider is wired up yet — events currently log to the
console in development. Point `track()` at your provider of choice
(GA4, PostHog, Segment, Meta Pixel, etc.) once one is chosen; call sites
don't need to change.

## Environment variables

None are required to run the site as-is — all three forms work locally
without any configuration; submissions just get logged to the console.

```
# .env.local
GOOGLE_SHEETS_WEBHOOK_URL=   # see "Lead capture backend" below
NEXT_PUBLIC_GA_ID=           # once an analytics provider is chosen
```

## Lead capture backend (Google Sheets)

Since the team is on Google Workspace, the three API routes
(`app/api/family-interest`, `app/api/career-interest`, `app/api/contact`)
already forward every submission to a Google Sheet via
`lib/googleSheets.ts`, with no database or paid service required.

To turn it on:

1. Open `docs/google-apps-script.gs` and follow the setup steps at the top
   of that file (create a Sheet, paste the script into Apps Script,
   deploy it as a Web App, copy the resulting URL).
2. Set `GOOGLE_SHEETS_WEBHOOK_URL` to that URL in your environment.
3. Submit a test entry through each form and confirm a row lands in the
   "Family Leads", "Career Leads", or "Contact Messages" tab (created
   automatically on first use).

Career applicants' resumes are base64-encoded and sent along with the
submission (files under 8MB); the script saves them to a Drive folder
called "The Day House — Resumes" and links the file from the sheet row.

Each new row also sends a short email notification, so submissions don't
sit unseen in the sheet until someone happens to open it. It's already
addressed to the inboxes you mentioned: family interest signups and
general contact messages go to `info@yourdayhouse.com`, career interest
goes to `careers@yourdayhouse.com`. Change the `NOTIFY_EMAILS` map at the
top of `docs/google-apps-script.gs` if you'd rather route these
differently or add `elvina@yourdayhouse.com` as an additional recipient
(comma-separate multiple addresses in one entry). The email is sent from
whatever Workspace account you authorize the script as, so no separate
email service or credentials are needed. Google Workspace accounts can
send up to 1,500 emails a day through this method, far more than a
pre-launch interest list will need.

If `GOOGLE_SHEETS_WEBHOOK_URL` isn't set, nothing breaks — the routes
still log to the console and the forms still work, which is what let this
be verified without live Google credentials.

## Deployment (yourdayhouse.com)

The domain is already owned, so this is the fastest path to a live site:

1. Push this project to a GitHub repo (Vercel deploys straight from Git).
2. Create a new Vercel project from that repo. No configuration needed —
   Vercel auto-detects Next.js. Add `GOOGLE_SHEETS_WEBHOOK_URL` (and
   `NEXT_PUBLIC_GA_ID` once you have one) under Project Settings >
   Environment Variables before the first deploy that should use them.
3. In the Vercel project's Domains settings, add both `yourdayhouse.com`
   and `www.yourdayhouse.com`. Vercel will show the exact DNS records to
   add (typically an A record for the apex domain and a CNAME for `www`,
   pointing at Vercel). Vercel redirects one to the other automatically
   once both are added; `siteUrl` in `app/layout.tsx` is already set to
   `https://www.yourdayhouse.com` to match.
4. **Important if email on this domain runs through Google Workspace**:
   add only the specific A/CNAME records Vercel asks for at your current
   DNS provider. Don't switch the domain's nameservers over to Vercel
   wholesale, that would also move DNS for the domain's MX records and
   likely break `@yourdayhouse.com` email. Whoever manages the domain's
   DNS today (registrar or Workspace admin console) should add the new
   records alongside the existing ones, not replace them.
5. SSL is automatic on Vercel once DNS resolves, usually within minutes.

Given the launch-ASAP goal, steps 1 to 3 alone get the site live on a
Vercel-provided URL (like `the-day-house.vercel.app`) immediately, so the
custom domain can follow a day or two later without blocking the launch
itself.

## Next steps

Given the site should launch as soon as possible, while the program
itself doesn't open until early 2027, the priority right now is getting a
lead-capture site live correctly, not building out infrastructure the
team won't need for months.

1. **Configure the Google Sheets webhook** (see above) so real submissions
   land somewhere the team can see them, then do one end-to-end test of
   all three forms before treating the site as live.
2. **Deploy and point the domain** (see "Deployment" above). This is the
   most likely remaining bottleneck to an ASAP launch.
3. **Consider real photography.** The homepage is intentionally photo-free
   right now (soft abstract color compositions, icons, and the real brand
   mark instead of stock photography or placeholders). `/about` still uses
   labeled placeholders (`components/PhotoPlaceholder.tsx`) for the
   founders' portraits. Swap in real images with `next/image` once
   photography is available; this doesn't need to block launch.
4. **Pick and install an analytics provider**, then fill in the `track()`
   function in `lib/analytics.ts`. Google Analytics 4 is a natural
   default given the existing Workspace/Google account.
5. **Legal review of `/privacy`.** The current page is a placeholder. Given
   this site collects contact details plus dementia-care and
   health-related preferences, have counsel review before launch,
   including whether any HIPAA-adjacent handling applies. This is worth
   doing before the site goes live, even on a fast timeline.
6. **Closer to the early-2027 opening**, revisit whether Sheets is still
   the right home for leads, add real pricing once it's set (the survey
   currently only gathers willingness-to-pay ranges), and consider a
   proper CRM/ESP if the family and career pipelines have grown enough to
   need one.
