import Image from "next/image";
import Link from "next/link";
import elvinaPhoto from "@/public/founders/elvina-hewitt.jpg";
import robbinPhoto from "@/public/founders/robbin-hewitt.jpg";
import { breadcrumbJsonLd, pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Meet the founders of The Day House, Elvina Hewitt, RN, MBA, and Robbin Hewitt, and learn why they're building a better daytime program for adults living with dementia in the Treasure Valley.",
  path: "/about",
});

// Person schema for the two named founders, built only from facts already
// stated in this page's own copy above (roles, credentials) — nothing added
// that isn't already visible to a visitor reading the page.
const FOUNDERS_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Elvina Hewitt",
      honorificSuffix: "RN, MBA",
      jobTitle: "Co-Founder",
      description:
        "Co-founder of The Day House with a background in Emergency Services clinical leadership and direct experience in Adult Day Health.",
      worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@type": "Person",
      name: "Robbin Hewitt",
      jobTitle: "Co-Founder",
      description:
        "Co-founder of The Day House with a background as a firefighter and paramedic, focused on safety, emergency preparedness, and operations.",
      worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
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
      <section className="section">
        <span className="eyebrow">About Us</span>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">
          Built by people who believe dementia care can be better.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-ink-700">
          The Day House started with a simple frustration: too many daytime
          options for adults with memory loss focus on keeping someone safe
          and occupied, rather than genuinely engaged. Elvina and Robbin are
          building something different, starting from what a person can
          still do, not what they&rsquo;ve lost.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <Image
            src={elvinaPhoto}
            alt="Elvina Hewitt, RN, MBA, co-founder of The Day House"
            className="aspect-[4/5] w-full rounded-xl2 object-cover"
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">Elvina Hewitt, RN, MBA</h2>
            <p className="mt-3 text-lg text-ink-700">
              Elvina&rsquo;s background includes years of direct patient care
              and clinical leadership in Emergency Services, along with
              direct experience working in Adult Day Health. That combination,
              acute clinical judgment paired with day-to-day experience in
              community-based care, shapes how The Day House approaches
              safety, staffing, and daily programming.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <h2 className="text-2xl font-semibold">Robbin Hewitt</h2>
            <p className="mt-3 text-lg text-ink-700">
              Robbin brings extensive experience as a firefighter and
              paramedic, with a strong focus on safety, emergency
              preparedness, operations, and community service. That
              background informs how The Day House is built to run
              reliably, day after day, for the families who count on it.
            </p>
          </div>
          <Image
            src={robbinPhoto}
            alt="Robbin Hewitt, co-founder of The Day House"
            className="order-1 aspect-[4/5] w-full rounded-xl2 object-cover lg:order-2"
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>

        <p className="mt-16 max-w-2xl text-lg text-ink-700">
          Elvina leads clinical care and day-to-day programming; Robbin leads
          safety, facilities, and operations. Together, that combination is
          meant to make The Day House both warm and dependable.
        </p>

        <div className="mt-8 max-w-3xl rounded-xl2 bg-sage-50 p-6 sm:p-8">
          <p className="text-xl font-medium text-sage-700">
            Together, they are building The Day House around a simple
            belief: people living with dementia deserve meaningful days
            filled with purpose, choice, connection, and dignity, and
            families deserve dependable support that helps them continue
            caring for the people they love.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/#family-interest" className="btn-primary">
            Join Our Interest List
          </Link>
        </div>
      </section>
    </>
  );
}
