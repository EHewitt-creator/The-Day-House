import Image from "next/image";
import Link from "next/link";
import elvinaPhoto from "@/public/founders/elvina-hewitt.jpg";
import robbinPhoto from "@/public/founders/robbin-hewitt.jpg";
import elvinaAndRobbinPhoto from "@/public/founders/elvina-and-robbin.jpg";
import { JoinedPhrases } from "@/components/BrandStatement";
import { breadcrumbJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Why Elvina and Robbin Hewitt are building The Day House: a different point of view on adult day and dementia support for the Boise metro area, and the experience behind it.",
  path: "/about",
});

// Person schema for the two named founders, built only from facts already
// stated in this page's own copy below — nothing added that isn't already
// visible to a visitor reading the page. Kept in sync with the bios in
// Section 4 whenever those change.
//
// The two Person @ids (#elvina-hewitt / #robbin-hewitt) match the stub
// entries referenced from the homepage's Organization.founder field (see
// app/page.tsx's HOME_JSON_LD) — same @id, same real person, fuller detail
// here where the page is actually about them.
//
// AboutPage wraps the whole graph so this page's own identity (not just its
// two Person entities) is represented — isPartOf ties it back to the
// sitewide WebSite, about ties it to the Organization it's describing.
const FOUNDERS_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: "About The Day House",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      mainEntity: [
        { "@id": `${SITE_URL}/about#elvina-hewitt` },
        { "@id": `${SITE_URL}/about#robbin-hewitt` },
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/about#elvina-hewitt`,
      name: "Elvina Hewitt",
      honorificSuffix: "RN, MBA",
      jobTitle: "Co-Founder",
      description:
        "Co-founder of The Day House. Fourteen years in emergency care, from bedside RN to nursing leadership at a Level I trauma center, followed by work in aging services, health technology, and product development.",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Brown University" },
        { "@type": "CollegeOrUniversity", name: "New York University" },
        { "@type": "CollegeOrUniversity", name: "UC Berkeley Haas School of Business" },
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/about#robbin-hewitt`,
      name: "Robbin Hewitt",
      jobTitle: "Co-Founder",
      description:
        "Co-founder of The Day House. Nearly 20 years as a firefighter-paramedic with the City and County of San Francisco, with a dementia care navigator certification and Positive Approach to Care training.",
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("About", "/about")) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FOUNDERS_JSON_LD) }}
      />

      {/* SECTION 1 — Hero / shared belief. Mirrors the homepage hero's
          restraint: one headline, two short paragraphs, no card, no bullet
          list. The brand statement ties this page back to the homepage's
          positioning without repeating any program details. */}
      <section className="section">
        <span className="eyebrow">About Us</span>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          We believe a good day should be about more than being cared for.
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="max-w-xl space-y-5 text-lg text-ink-700">
            <p>
              The Day House started with a simple idea: adult day should be
              designed first for the person spending their day there.
            </p>
            <p>
              Caregiver respite matters enormously. But we believe the best
              respite comes from knowing the person you love has somewhere
              meaningful to go.
            </p>
            <p className="text-base font-semibold text-sage-700">
              <JoinedPhrases dotClassName="text-terracotta-600" />
            </p>
          </div>

          <Image
            src={elvinaAndRobbinPhoto}
            alt="Elvina and Robbin Hewitt, co-founders of The Day House"
            className="w-full rounded-xl2 object-cover"
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </section>

      {/* SECTION 2 — Origin story. Plain prose, short paragraphs, one pulled
          quote ("People are still people.") for the single strongest line. */}
      <section className="bg-sage-50">
        <div className="section">
          <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
            Why we&rsquo;re building this
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-lg text-ink-700">
            <p>
              Elvina spent 14 years in emergency care, starting as a bedside
              RN and eventually moving into nursing leadership at a Level I
              trauma center and public safety-net hospital.
            </p>
            <p>
              Some of what stayed with her most were the older adults who
              arrived in the emergency department because the support around
              them had quietly started to break down. Families were
              exhausted, overwhelmed, sometimes at the point where they
              simply couldn&rsquo;t continue without more help.
            </p>
            <p>
              After leaving emergency nursing for health technology, product
              development, and aging services, she kept returning to the
              same question: how could services step in before a family
              reached that breaking point? One-on-one care has its place,
              but she saw real potential in social adult day done well:
              supporting several people at once while still building in
              genuine connection, purpose, and dependable relief for the
              families around them.
            </p>
            <p>
              Robbin came to the same problem from another direction. He
              spent nearly 20 years as a San Francisco firefighter-paramedic,
              responding to thousands of calls in people&rsquo;s homes and
              communities.
            </p>
          </div>

          <blockquote className="mt-8 max-w-2xl border-l-4 border-terracotta-500 pl-6 text-2xl font-semibold text-sage-700 sm:text-3xl">
            People are still people.
          </blockquote>

          <div className="mt-8 max-w-2xl space-y-5 text-lg text-ink-700">
            <p>
              Older adults and people living with cognitive change have
              histories, preferences, humor, relationships, and something to
              contribute. Those years also gave Robbin an unusual window
              into what life actually looks like inside people&rsquo;s
              homes, and what families are quietly managing behind closed
              doors.
            </p>
          </div>

          <p className="mt-8 max-w-2xl text-xl font-medium text-ink">
            Together, those two vantage points shaped a question: what if we
            built somewhere people wanted to attend, rather than somewhere
            they simply needed to go? The Day House is our answer.
          </p>
        </div>
      </section>

      {/* SECTION 3 — Philosophy. Reuses the homepage's OurApproach layout
          convention (large statement left, supporting copy right) for
          visual continuity, with different content — this is the belief
          behind the program, not the program details already covered on
          the homepage. */}
      <section>
        <div className="section">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <h2 className="text-2xl font-semibold leading-snug text-sage-700 sm:text-3xl lg:text-4xl">
              People living with cognitive change are too often defined by
              what they can no longer do.
            </h2>

            <div className="space-y-5 text-lg text-ink-700">
              <p>
                We believe good support starts somewhere else: with the
                person who is still there. That means understanding their
                perspective, adapting how we communicate, shaping an
                environment around their abilities, and continuing to treat
                them as adults with preferences, histories, humor,
                relationships, and something to contribute.
              </p>
              <p>
                Supporting someone living with dementia well takes real
                effort, and we don&rsquo;t think that effort should fall on
                them.
              </p>
              <blockquote className="border-l-4 border-terracotta-500 pl-6 text-2xl font-semibold text-sage-700">
                It&rsquo;s our job to meet them where they are.
              </blockquote>
              <p>
                It&rsquo;s the same idea behind how we&rsquo;ve built The Day
                House day to day: support should help someone participate in
                life, not simply keep them occupied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Individual founder profiles. This is where credentials
          belong, after the philosophy has already been established. Same
          alternating photo/text layout as the previous version of this
          page, kept for continuity, with tightened, less résumé-flavored
          copy plus concise credential lines. */}
      <section className="bg-sage-50">
        <div className="section">
          <span className="eyebrow">Meet Elvina &amp; Robbin</span>

          <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-14">
            <Image
              src={elvinaPhoto}
              alt="Elvina Hewitt, RN, MBA, co-founder of The Day House"
              className="aspect-[4/5] w-full rounded-xl2 object-cover"
              placeholder="blur"
              sizes="(min-width: 1024px) 280px, 100vw"
            />
            <div className="flex flex-col justify-center lg:justify-start">
              <h3 className="text-2xl font-semibold">Elvina Hewitt, RN, MBA</h3>
              <p className="mt-3 text-lg text-ink-700">
                Fourteen years in emergency care at a Level I trauma center
                and public safety-net hospital, from bedside RN to nursing
                leadership. Her career later expanded into aging services,
                health technology, and product development, pairing direct
                patient care with experience designing and running the
                services people actually use. She has also pursued
                additional training in dementia and person-centered care.
              </p>
              <p className="mt-4 text-base font-medium text-sage-700">
                Brown University · Nursing degree, New York University ·
                MBA, UC Berkeley Haas
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-14">
            <div className="order-2 flex flex-col justify-center lg:order-1 lg:justify-start">
              <h3 className="text-2xl font-semibold">Robbin Hewitt</h3>
              <p className="mt-3 text-lg text-ink-700">
                Nearly 20 years as a firefighter-paramedic with the City and
                County of San Francisco, responding to thousands of calls in
                people&rsquo;s homes and communities, many involving older
                adults, people living with cognitive impairment, and
                families managing complex situations at home. That frontline
                experience shapes how The Day House thinks about safety,
                home life, and community care.
              </p>
              <p className="mt-4 text-base font-medium text-sage-700">
                Dementia care navigator certification · Positive Approach to
                Care training
              </p>
            </div>
            <Image
              src={robbinPhoto}
              alt="Robbin Hewitt, co-founder of The Day House"
              className="order-1 aspect-[4/5] w-full rounded-xl2 object-cover lg:order-2"
              placeholder="blur"
              sizes="(min-width: 1024px) 280px, 100vw"
            />
          </div>

          <p className="mt-12 max-w-2xl text-lg text-ink-700">
            Elvina leads clinical care and day-to-day programming; Robbin
            leads safety, facilities, and operations. Two different
            vantage points on the same problem, working together.
          </p>
        </div>
      </section>

      {/* SECTION 5 — Closing. Deliberately short, and deliberately not a
          mission-statement cliché. Ends on trust being earned day to day,
          not claimed by a credentials list. */}
      <section className="section">
        <div className="max-w-2xl space-y-5 text-lg text-ink-700">
          <p>
            We&rsquo;ve both pursued additional education specifically in
            dementia and person-centered care, because decades in healthcare
            and emergency services don&rsquo;t automatically teach someone
            how to support a person living with dementia well.
          </p>
          <p>
            We&rsquo;re still learning, from people living with cognitive
            change, their families, dementia-care professionals, and our
            community, as we build The Day House. That doesn&rsquo;t stop
            once we open. It&rsquo;s ongoing.
          </p>
        </div>

        <div className="mt-8 max-w-2xl rounded-xl2 bg-sage-50 p-6 sm:p-8">
          <p className="text-xl font-medium text-sage-700">
            Credentials matter. But we don&rsquo;t expect a list of degrees
            or job titles to earn a family&rsquo;s trust. That comes from the
            people we hire, how we treat them, the culture we build, how we
            show up for members and families, and what it actually feels
            like to walk through our doors.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/#interest" className="btn-primary">
            Join Our Interest List
          </Link>
        </div>
      </section>
    </>
  );
}
