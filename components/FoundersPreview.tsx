import Link from "next/link";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

export default function FoundersPreview() {
  return (
    <section className="section">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">About Us</span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Built by people who believe dementia care can be better.
          </h2>
          <p className="mt-5 text-lg text-ink-700">
            The Day House was founded by Elvina Hewitt, RN, MBA, and Robbin
            Hewitt. Elvina&rsquo;s background includes years of direct
            patient care and clinical leadership in Emergency Services, along
            with direct experience working in Adult Day Health. Robbin brings
            extensive experience as a firefighter and paramedic, with a
            strong focus on safety, emergency preparedness, operations, and
            community service.
          </p>
          <p className="mt-4 text-lg text-ink-700">
            Together, they are building The Day House around a simple
            belief: people living with dementia deserve meaningful days
            filled with purpose, choice, connection, and dignity, and
            families deserve dependable support that helps them continue
            caring for the people they love.
          </p>
          <div className="mt-8">
            <Link href="/about" className="btn-secondary">
              Meet Our Founders
            </Link>
          </div>
        </div>

        <PhotoPlaceholder
          label="Portrait of the founders, warm and approachable, non-clinical setting"
          tone="sage"
          aspect="aspect-[5/4]"
        />
      </div>
    </section>
  );
}
