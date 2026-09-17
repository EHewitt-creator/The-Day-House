import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How The Day House collects, uses, shares, and protects information submitted through yourdayhouse.com, including our family interest list, career, and contact forms.",
  path: "/privacy",
});

const EMAIL = "info@yourdayhouse.com";
const EMAIL_LINK = (
  <a href={`mailto:${EMAIL}`} className="font-semibold text-terracotta-700 underline">
    {EMAIL}
  </a>
);

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-700">{children}</div>
    </div>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-6">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <section className="section max-w-3xl">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("Privacy Policy", "/privacy")) }}
      />

      <span className="eyebrow">Privacy Policy</span>
      <h1 className="mt-4 text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: September 17, 2026</p>

      <p className="mt-6 text-lg text-ink-700">
        The Day House respects your privacy. This Privacy Policy explains what
        information we collect through yourdayhouse.com, how we use and
        protect it, when we may share it, and the choices available to you.
      </p>
      <p className="mt-4 text-lg text-ink-700">
        This policy applies to information collected through our website,
        including our family interest list, optional planning survey, career
        interest form, and contact form.
      </p>

      <Section title="Information We Collect">
        <div>
          <h3 className="text-lg font-semibold text-ink">Information you provide</h3>
          <p className="mt-2">We may collect information you voluntarily provide, including:</p>
          <List
            items={[
              "Your name",
              "Email address",
              "Telephone number",
              "ZIP code",
              "Your relationship to the person for whom you are exploring services",
              "Anticipated days, hours, and frequency of service",
              "Program features or support needs that are important to your family",
              "Pricing preferences and potential barriers to attendance",
              "Responses to optional research or planning questions",
              "Information you provide in an open-text response",
              "Your willingness to participate in a follow-up conversation",
              "Your communication preferences",
            ]}
          />
        </div>

        <div>
          <p>If you contact us about employment, volunteering, internships, or other opportunities, we may also collect:</p>
          <List
            items={[
              "Your employment interests",
              "Relevant experience",
              "Résumé or application materials",
              "LinkedIn profile",
              "Information included in correspondence with us",
            ]}
          />
        </div>

        <p>If you use our general contact form, we collect the information necessary to respond to your message.</p>

        <div>
          <h3 className="text-lg font-semibold text-ink">Information about another person</h3>
          <p className="mt-2">
            You may provide limited information about a family member or
            another person while exploring The Day House. Please provide only
            information that is reasonably necessary for your inquiry and
            that you are authorized to share.
          </p>
          <p className="mt-3 rounded-xl2 bg-sage-50 p-4 font-medium text-sage-700">
            Do not submit medical records, Social Security numbers, financial
            account information, insurance identification numbers, or other
            highly sensitive information through the website.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-ink">Information collected automatically</h3>
          <p className="mt-2">
            When you visit the website, certain technical information may be
            collected automatically, including:
          </p>
          <List
            items={[
              "Internet Protocol address",
              "Browser and device type",
              "Operating system",
              "Pages viewed",
              "Date and time of access",
              "Referring website",
              "General geographic information derived from an IP address",
              "Website interaction and diagnostic information",
              "Marketing attribution information, such as UTM source, medium, campaign, or content",
            ]}
          />
          <p className="mt-3">
            We may use cookies, local storage, server logs, or similar
            technologies that are necessary for the website to operate,
            maintain security, remember preferences, and understand how
            visitors find and use the site.
          </p>
          <p className="mt-3">
            Our website does not currently use third-party advertising or
            analytics trackers, and it does not change its behavior in
            response to a browser&rsquo;s &ldquo;Do Not Track&rdquo; signal.
            If that changes, we will update this section to describe how the
            site responds.
          </p>
          <p className="mt-3">
            The Day House does not sell personal information or use personal
            information for third-party targeted advertising.
          </p>
        </div>
      </Section>

      <Section title="How We Use Information">
        <List
          items={[
            "Add you to The Day House interest list",
            "Provide opening, tour, programming, pricing, and enrollment updates",
            "Respond to questions and requests",
            "Understand demand for adult day services in the Treasure Valley",
            "Evaluate preferred hours, scheduling needs, pricing, services, and barriers",
            "Plan our location, staffing, programming, and business operations",
            "Invite interested individuals to optional research conversations",
            "Evaluate and communicate with prospective employees, volunteers, interns, and community partners",
            "Maintain and improve the website",
            "Measure the effectiveness of outreach and referral channels",
            "Prevent fraud, misuse, security threats, and technical problems",
            "Comply with legal and regulatory obligations",
            "Protect the rights, safety, and property of The Day House and others",
          ]}
        />
        <p>
          Completing an optional survey does not create a service
          relationship or commit you to enrolling in The Day House.
        </p>
      </Section>

      <Section title="Email Communications">
        <p>
          If you agree to receive updates, we may contact you about The Day
          House&rsquo;s opening, tours, programming, pricing, enrollment
          availability, events, or related developments.
        </p>
        <p>
          You may opt out of these updates at any time by emailing us at{" "}
          {EMAIL_LINK} with the subject line &ldquo;Unsubscribe.&rdquo; We
          will honor your request promptly. If we later send updates through
          an email service that includes an unsubscribe link, you can also
          use that link directly.
        </p>
        <p>
          We may still send nonmarketing messages when necessary to respond
          to a request or communicate about an interaction you initiated.
        </p>
      </Section>

      <Section title="How We Share Information">
        <p>We do not sell or rent personal information.</p>
        <div>
          <p>We may share information with service providers that help us:</p>
          <List
            items={[
              "Host and maintain the website",
              "Store and secure form submissions",
              "Send and manage email communications",
              "Manage applicant or career information",
              "Monitor website performance and security",
              "Analyze aggregated website or survey information",
              "Provide legal, accounting, or professional services",
            ]}
          />
          <p className="mt-3">
            These service providers may use the information only to perform
            services for The Day House or as otherwise permitted by their
            agreements and applicable law.
          </p>
        </div>
        <div>
          <p>We may also disclose information:</p>
          <List
            items={[
              "When required by law, subpoena, court order, or legal process",
              "To protect the safety, rights, or property of The Day House, our visitors, or others",
              "To investigate suspected fraud, misuse, or security incidents",
              "In connection with a merger, financing, reorganization, sale, or transfer of all or part of the business",
              "With your direction or consent",
            ]}
          />
        </div>
        <p>
          We may use or share aggregated or de-identified information that
          does not reasonably identify an individual.
        </p>
      </Section>

      <Section title="Health-Related Information">
        <p>
          The website&rsquo;s interest and planning forms are intended for
          general inquiries and pre-opening research. They are not intended
          for submitting detailed medical records, receiving medical advice,
          requesting emergency assistance, or completing a clinical intake.
        </p>
        <p>
          This Privacy Policy is not a HIPAA Notice of Privacy Practices. If
          additional privacy notices or secure procedures become applicable
          to The Day House&rsquo;s future services, those materials will be
          provided separately.
        </p>
        <p className="rounded-xl2 bg-terracotta-50 p-4 font-medium text-terracotta-700">
          If you are experiencing an emergency, call 911 or contact an
          appropriate emergency service.
        </p>
      </Section>

      <Section title="Data Retention">
        <div>
          <p>We retain personal information only for as long as reasonably necessary to:</p>
          <List
            items={[
              "Fulfill the purposes described in this policy",
              "Maintain the interest list",
              "Conduct pre-opening planning and analysis",
              "Evaluate career inquiries",
              "Respond to communications",
              "Meet legal, accounting, security, and operational requirements",
            ]}
          />
        </div>
        <p>Retention periods may differ depending on the type of information and why it was collected.</p>
        <p>
          You may ask us to remove your information from our active records
          by contacting {EMAIL_LINK}. We may retain limited information when
          required by law, necessary for security or recordkeeping, or
          needed to document an opt-out request.
        </p>
      </Section>

      <Section title="Data Security">
        <p>
          We use reasonable administrative, technical, and organizational
          safeguards intended to protect personal information against
          unauthorized access, disclosure, alteration, loss, or misuse.
        </p>
        <p>
          No website, electronic transmission, or storage system can be
          guaranteed to be completely secure. Please use care when deciding
          what information to submit online.
        </p>
      </Section>

      <Section title="Your Choices and Requests">
        <div>
          <p>Depending on applicable law and the circumstances, you may request that we:</p>
          <List
            items={[
              "Tell you what personal information we maintain about you",
              "Correct inaccurate information",
              "Delete information",
              "Stop sending marketing communications",
              "Withdraw a communication preference",
              "Answer questions about how your information is used",
            ]}
          />
        </div>
        <p>
          To submit a request, email {EMAIL_LINK} with the subject line
          &ldquo;Privacy Request.&rdquo;
        </p>
        <p>
          We may need to verify your identity before completing certain
          requests. We will not discriminate against you for making a
          privacy request.
        </p>
      </Section>

      <Section title="Children's Privacy">
        <p>
          The website is intended for adults and is not directed to children
          under 13. We do not knowingly collect personal information
          directly from children under 13 through the website.
        </p>
        <p>
          If you believe a child has provided personal information through
          the website, contact us at {EMAIL_LINK}.
        </p>
      </Section>

      <Section title="Third-Party Links">
        <p>
          The website may contain links to websites or services operated by
          other organizations. Their privacy practices are governed by their
          own policies, and The Day House is not responsible for their
          content or privacy practices.
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>We may update this Privacy Policy as our website, services, or legal obligations change.</p>
        <p>
          When we make changes, we will update the &ldquo;Last updated&rdquo;
          date at the top of this page. Material changes may also be
          communicated through the website or by email when appropriate.
        </p>
      </Section>

      <Section title="Contact Us">
        <p>If you have questions, concerns, or requests concerning this Privacy Policy, contact:</p>
        <p className="text-ink">
          The Day House
          <br />
          Treasure Valley, Idaho
          <br />
          Email: {EMAIL_LINK}
        </p>
      </Section>
    </section>
  );
}
