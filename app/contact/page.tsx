import ContactForm from "@/components/ContactForm";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with The Day House, a new dementia daytime program opening soon in the Treasure Valley. For families, referral partners, and community organizations.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="section">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("Contact", "/contact")) }}
      />
      <span className="eyebrow">Contact</span>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">
        We&rsquo;d like to hear from you.
      </h1>
      <p className="mt-6 max-w-2xl text-xl text-ink-700">
        Families, referral partners, healthcare professionals, and community
        organizations are all welcome to reach out. If you&rsquo;re a family
        looking to join our interest list, you can also do that directly
        from our{" "}
        <a href="/#family-interest" className="font-semibold text-terracotta-700 underline">
          homepage
        </a>
        .
      </p>

      <div className="mt-12 max-w-2xl rounded-2xl border border-ink/5 bg-cream-100 p-6 shadow-soft sm:p-10">
        <ContactForm />
      </div>
    </section>
  );
}
