import dynamic from "next/dynamic";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// See FamilyInterestSection.tsx for why this is dynamic() rather than a
// plain import: splits the form's JS into its own chunk, SSR stays on so
// the server-rendered HTML (and CLS) is unaffected.
const CareerForm = dynamic(() => import("@/components/CareerForm"));

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Join the team building The Day House, a new dementia daytime program opening soon in the Boise metro area. Care partner, activities, nursing, and operations roles.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <section className="section">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("Careers", "/careers")) }}
      />
      <span className="eyebrow">Careers</span>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">
        Want to help build The Day House?
      </h1>
      <p className="mt-6 max-w-2xl text-xl text-ink-700">
        We&rsquo;re building a team of thoughtful, dependable people who
        genuinely enjoy spending time with older adults and believe care can
        be better.
      </p>
      <p className="mt-4 max-w-2xl text-lg font-medium text-sage-700">
        Experience in dementia care is valuable. Seeing the person before the
        diagnosis is essential.
      </p>

      <div className="mt-12 max-w-3xl rounded-2xl border border-ink/5 bg-cream-100 p-6 shadow-soft sm:p-10">
        <CareerForm />
      </div>
    </section>
  );
}
