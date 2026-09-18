import SurveyForm from "@/components/survey/SurveyForm";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Family Planning Survey",
  description:
    "Help The Day House plan hours, pricing, and programming for our upcoming adult day program in the Treasure Valley. A short, optional, anonymous-friendly survey — no interest list sign-up required.",
  path: "/survey",
});

export default function SurveyPage() {
  return (
    <section className="section max-w-3xl">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("Family Planning Survey", "/survey")) }}
      />

      <span className="eyebrow">Help Us Plan</span>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
        Help shape The Day House.
      </h1>
      <p className="mt-6 text-xl text-ink-700">
        We&rsquo;re still finalizing hours, pricing, and programming before
        opening. This short survey takes about 60&ndash;90 seconds and helps
        us plan around what local families actually need.
      </p>
      <p className="mt-4 rounded-xl2 bg-sage-50 p-4 text-base font-medium text-sage-700">
        You don&rsquo;t need to join our interest list to take this survey.
        Every question is optional, and you can answer anonymously &mdash;
        sharing your name or a way to reach you at the end is entirely up to
        you.
      </p>
      <p className="mt-4 text-base text-ink-700">
        Already on our interest list? You may have already seen these
        questions there &mdash; no need to fill this out twice.
      </p>

      <div className="mt-10 rounded-2xl border border-ink/5 bg-cream p-6 shadow-soft sm:p-10">
        <SurveyForm />
      </div>
    </section>
  );
}
