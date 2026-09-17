import Link from "next/link";
import Pillars from "@/components/Pillars";
import DayInLife from "@/components/DayInLife";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Approach",
  description:
    "How The Day House approaches dementia care: purpose, connection, movement, creativity, choice, independence, belonging, and support.",
  path: "/our-approach",
});

export default function OurApproachPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("Our Approach", "/our-approach")),
        }}
      />
      <section className="section">
        <span className="eyebrow">Our Approach</span>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">
          A philosophy built around the person, not the diagnosis.
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-ink-700">
          Most programs are organized around what someone can no longer do.
          The Day House starts from the opposite question: What can this
          person still do, enjoy, and contribute, today?
        </p>
        <p className="mt-4 max-w-2xl text-lg text-ink-700">
          That shift changes everything about how a day is designed, from
          the pace of the morning to the choices available after lunch. It
          is a philosophy, not a script, and it is one we intend to keep
          refining alongside the families and staff who live it every day.
        </p>
      </section>

      <Pillars />
      <DayInLife />

      <section className="section text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Want to see this in practice once we open?
        </h2>
        <div className="mt-6">
          <Link href="/#family-interest" className="btn-primary">
            Join Our Interest List
          </Link>
        </div>
      </section>
    </>
  );
}
