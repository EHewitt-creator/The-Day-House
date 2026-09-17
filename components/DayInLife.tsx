import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
  showApproachLink?: boolean;
  /** Pass a real photo once one is available (e.g. coffee and conversation,
   * gardening, cooking, or creative work — matching the copy alongside it).
   * Until then, a branded color-block placeholder fills this spot instead
   * of a stock photo of a passive older adult. */
  image?: StaticImageData;
  imageAlt?: string;
};

export default function DayInLife({ showApproachLink = false, image, imageAlt = "" }: Props) {
  return (
    <section className="section">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2">
          {image ? (
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute inset-0 bg-sage-600" />
              <div
                className="absolute inset-0 bg-peach-200"
                style={{ clipPath: "polygon(0 0, 62% 0, 30% 100%, 0% 100%)" }}
              />
              <div
                className="absolute inset-0 bg-terracotta-600"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 42% 100%)" }}
              />
            </div>
          )}
        </div>

        <div>
          <span className="eyebrow">A Day at The Day House</span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">What a day may feel like.</h2>
          <p className="mt-5 text-lg text-ink-700">
            A day might include coffee and conversation, gardening, cooking,
            movement, music, creative work, or quiet time. There will be a
            predictable rhythm, but not one compulsory activity schedule.
            Participants can choose what fits their interests and how they
            feel that day.
          </p>
          {showApproachLink && (
            <div className="mt-6">
              <Link href="/our-approach" className="btn-ghost">
                Learn About Our Approach
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
