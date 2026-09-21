import ContactForm from "@/components/ContactForm";
import { breadcrumbJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with The Day House, a new dementia daytime program opening soon in the Boise metro area. For families, referral partners, and community organizations.",
  path: "/contact",
});

// ContactPage identifies this route's purpose to search engines; `about`
// points at the same Organization entity defined on the homepage (see
// app/page.tsx's HOME_JSON_LD), which already carries the real contact
// email via its contactPoint — no need to repeat it here.
const CONTACT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: "Contact The Day House",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
};

export default function ContactPage() {
  return (
    <section className="section">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("Contact", "/contact")) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_JSON_LD) }}
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
        <a href="/#interest" className="font-semibold text-terracotta-700 underline">
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
