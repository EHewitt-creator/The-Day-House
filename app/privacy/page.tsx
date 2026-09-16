import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for The Day House.",
};

export default function PrivacyPage() {
  return (
    <section className="section max-w-3xl">
      <h1 className="text-4xl font-semibold">Privacy</h1>
      <p className="mt-6 text-lg text-ink-700">
        This is a placeholder privacy page. Replace this content with a full
        privacy policy before launch, covering what information is
        collected through the interest list, career, and contact forms, how
        it is stored and used, and how people can request that their
        information be removed.
      </p>
      <p className="mt-4 text-lg text-ink-700">
        Because this site collects names, contact details, and details about
        health-related needs and preferences, we recommend having this
        policy reviewed by legal counsel familiar with Idaho requirements
        and, if applicable, HIPAA considerations before the site goes live.
      </p>
    </section>
  );
}
