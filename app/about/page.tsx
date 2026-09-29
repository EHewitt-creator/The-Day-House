import Image from "next/image";
import Link from "next/link";
import elvinaPhoto from "@/public/founders/elvina-hewitt.jpg";
import robbinPhoto from "@/public/founders/robbin-hewitt.jpg";
import elvinaAndRobbinPhoto from "@/public/founders/elvina-and-robbin.jpg";
import { breadcrumbJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Why Elvina and Robbin Hewitt are building The Day House: a different point of view on adult day and dementia support for the Boise metro area, and the experience behind it.",
  path: "/about",
});

// Person schema for the two named founders, built only from facts already
// stated in this page's own copy below — nothing added that isn't already
// visible to a visitor reading the page. Kept in sync with the credential
// lines in Section 4 whenever those change.
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
      jobTitle: "Founder & Owner",
      description:
        "Founder & Owner of The Day House. Fourteen years in emergency nursing and leadership, followed by work in aging services, health technology, and product development.",
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
        "Co-Founder of The Day House. Nearly 20 years as a firefighter-paramedic with the City and County of San Francisco. Certified Dementia Care Navigator with Positive Approach to Care training.",
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

      {/* SECTION 1 — Hero / core belief. The provocative headline ("Safe and
          occupied isn't enough.") is deliberately bold — the rest of the
          page's warmth is what balances it. Photo pairs with the text the
          same way the homepage hero doesn't need one: this page is
          founder-led, not a program overview. */}
      <section className="section">
        <span className="eyebrow">About Us</span>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight sm:text-5xl">
          Safe and occupied isn&rsquo;t enough.
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="max-w-xl space-y-5 text-lg text-ink-700">
            <p>
              The Day House started with a simple idea: daytime support
              should be designed first for the person spending their day
              there.
            </p>
            <p>
              Caregiver respite matters enormously. We&rsquo;ve seen
              firsthand what happens when families are asked to carry too
              much for too long. But the person spending the day somewhere
              matters, too.
            </p>
            <p className="text-xl font-medium leading-relaxed text-sage-700">
              They deserve more than somewhere to be. They deserve somewhere
              worth going.
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

      {/* SECTION 2 — Why we're building this. The founders' own experience,
          told briefly — this is the "why," not a résumé; the credential
          facts live once, in Section 4. */}
      <section className="bg-sage-50">
        <div className="section">
          <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
            Why we&rsquo;re building The Day House
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-lg text-ink-700">
            <p>
              We&rsquo;re Elvina and Robbin Hewitt. Between us, we&rsquo;ve
              spent decades supporting people and families through emergency
              care, community response, aging services, and healthcare.
            </p>
            <p>
              During 14 years in emergency nursing, Elvina saw what happens
              when families don&rsquo;t have enough support: older adults
              arriving in the emergency department because the people caring
              for them had become exhausted, overwhelmed, or simply
              couldn&rsquo;t keep doing it alone. Her later work in health
              technology, product development, and aging services pushed her
              to think about what better support could look like before
              families reach that point.
            </p>
            <p>
              Robbin spent nearly 20 years as a San Francisco
              firefighter-paramedic, responding to thousands of calls in
              people&rsquo;s homes and communities. Those years reinforced
              something simple but important.
            </p>
          </div>

          <blockquote className="mt-8 max-w-2xl border-l-4 border-terracotta-500 pl-6 text-2xl font-semibold text-sage-700 sm:text-3xl">
            People are still people.
          </blockquote>

          <p className="mt-8 max-w-2xl text-lg text-ink-700">
            Cognitive change doesn&rsquo;t erase someone&rsquo;s history,
            personality, preferences, humor, abilities, relationships, or
            desire to be part of what&rsquo;s happening around them.
            Together, those experiences led us to ask: what if we built
            somewhere people wanted to attend, rather than somewhere they
            simply needed to go?
          </p>
        </div>
      </section>

      {/* SECTION 3 — A different standard for a good day. This is the page's
          point of view. The before/after question near the end is
          deliberately plain typography, not a card, per the brand
          direction to keep this understated rather than "marketing copy." */}
      <section>
        <div className="section">
          <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
            A different standard for a good day
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-lg text-ink-700">
            <p>
              People living with cognitive change are too often defined by
              what they can no longer do. We want to start with what they
              can: understanding the person in front of us, adapting how we
              communicate, and creating an environment that supports who
              they are.
            </p>
            <p>
              Some days that might mean creating, moving, helping, talking,
              or trying something new. Other days it might mean a cup of
              coffee, music, a walk, or simply enjoying the company of other
              people.
            </p>
          </div>

          <blockquote className="mt-8 max-w-2xl border-l-4 border-terracotta-500 pl-6 text-2xl font-semibold text-sage-700 sm:text-3xl">
            There is no single right way to have a meaningful day.
          </blockquote>

          <div className="mt-8 max-w-2xl space-y-5 text-lg text-ink-700">
            <p>
              What matters is having choices, being included, and continuing
              to treat adults like adults. We don&rsquo;t expect someone
              experiencing cognitive change to do all the adapting.
            </p>
          </div>

          <blockquote className="mt-8 max-w-2xl border-l-4 border-terracotta-500 pl-6 text-2xl font-semibold text-sage-700 sm:text-3xl">
            It&rsquo;s our job to meet them where they are.
          </blockquote>

          <p className="mt-8 max-w-2xl text-lg text-ink-700">
            Our goal is for members to have somewhere meaningful to go, and
            for their families to have dependable time for everything else
            life requires. Both people should get something valuable from
            the day.
          </p>

          <div className="mt-14 max-w-2xl border-t border-ink-500/15 pt-10">
            <p className="text-base font-medium uppercase tracking-wide text-ink-500">
              We want to help change the question from
            </p>
            <p className="mt-3 text-xl text-ink-700">
              &ldquo;Where can Mom go so I can get a break?&rdquo;
            </p>
            <p className="mt-4 text-base font-medium uppercase tracking-wide text-ink-500">
              to
            </p>
            <p className="mt-3 text-xl font-medium text-sage-700">
              &ldquo;Mom has somewhere meaningful to go today. And I have
              dependable time for myself.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Elvina & Robbin. Deliberately compact: by this point in
          the page the visitor already has the story, so this is scannable
          credibility (name, title, a few credential lines, a photo), not a
          second pass at their biographies. */}
      <section className="bg-sage-50">
        <div className="section">
          <span className="eyebrow">Elvina &amp; Robbin</span>

          <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-12">
            <div>
              <Image
                src={elvinaPhoto}
                alt="Elvina Hewitt, RN, MBA, Founder & Owner of The Day House"
                className="h-32 w-32 rounded-full object-cover"
                placeholder="blur"
                sizes="128px"
              />
              <h3 className="mt-5 text-xl font-semibold">Elvina Hewitt, RN, MBA</h3>
              <p className="text-base font-medium text-terracotta-700">Founder &amp; Owner</p>
              <ul className="mt-3 space-y-1.5 text-base text-ink-700">
                <li>14 years emergency nursing &amp; leadership</li>
                <li>Aging services, health technology &amp; product development</li>
                <li>Brown University · NYU Nursing · UC Berkeley Haas</li>
              </ul>
            </div>

            <div>
              <Image
                src={robbinPhoto}
                alt="Robbin Hewitt, Co-Founder of The Day House"
                className="h-32 w-32 rounded-full object-cover"
                placeholder="blur"
                sizes="128px"
              />
              <h3 className="mt-5 text-xl font-semibold">Robbin Hewitt</h3>
              <p className="text-base font-medium text-terracotta-700">Co-Founder</p>
              <ul className="mt-3 space-y-1.5 text-base text-ink-700">
                <li>Nearly 20 years as a San Francisco firefighter-paramedic</li>
                <li>Thousands of calls in people&rsquo;s homes and communities</li>
                <li>Dementia care &amp; community response</li>
                <li>Certified Dementia Care Navigator · Positive Approach to Care training</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Closing / trust. Short, and ends on the belief rather
          than a credentials recap. The interest-list CTA stays secondary —
          a single ghost-weight link-style button, not a repeated sales
          pitch (that already lives on the homepage). */}
      <section className="section">
        <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
          Trust is built in what we do.
        </h2>

        <div className="mt-8 max-w-2xl space-y-5 text-lg text-ink-700">
          <p>
            We know credentials alone don&rsquo;t earn a family&rsquo;s
            trust. That comes from the people we hire, how we train and
            treat them, the culture we create, how well we get to know our
            members, and what families experience when they walk through
            our doors.
          </p>
          <p>
            We&rsquo;re continuing to learn from people living with
            cognitive change, their families, dementia-care professionals,
            and our community as we build The Day House. Because
            ultimately, our belief is simple:
          </p>
        </div>

        <blockquote className="mt-8 max-w-2xl border-l-4 border-terracotta-500 pl-6 text-2xl font-semibold text-sage-700 sm:text-3xl">
          A person can need support and still have a life to participate in.
        </blockquote>

        <p className="mt-8 max-w-2xl text-lg font-medium text-ink-700">
          That&rsquo;s the standard we&rsquo;re building toward.
        </p>

        <div className="mt-10">
          <Link href="/#interest" className="btn-primary">
            Join Our Interest List
          </Link>
        </div>
      </section>
    </>
  );
}
