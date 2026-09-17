import Link from "next/link";
import Image from "next/image";
import elvinaPhoto from "@/public/founders/elvina-hewitt.jpg";
import robbinPhoto from "@/public/founders/robbin-hewitt.jpg";

export default function FoundersPreview() {
  return (
    <section className="section">
      <div className="max-w-3xl">
        <span className="eyebrow">About Us</span>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Built by people who believe dementia care can be better.
        </h2>
        <p className="mt-4 text-lg text-ink-700">
          Their combined clinical and operational experience shapes how The
          Day House is being built.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="flex gap-4 rounded-xl2 border border-ink/5 bg-sage-50 p-6">
          <Image
            src={elvinaPhoto}
            alt="Elvina Hewitt, RN, MBA, co-founder of The Day House"
            className="h-14 w-14 shrink-0 rounded-full object-cover"
            width={56}
            height={56}
          />
          <div>
            <h3 className="font-semibold text-ink">Elvina Hewitt, RN, MBA</h3>
            <p className="mt-1.5 text-base text-ink-700">
              Direct patient care and clinical leadership in Emergency
              Services, plus experience in Adult Day Health.
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-xl2 border border-ink/5 bg-terracotta-50 p-6">
          <Image
            src={robbinPhoto}
            alt="Robbin Hewitt, co-founder of The Day House"
            className="h-14 w-14 shrink-0 rounded-full object-cover"
            width={56}
            height={56}
          />
          <div>
            <h3 className="font-semibold text-ink">Robbin Hewitt</h3>
            <p className="mt-1.5 text-base text-ink-700">
              More than two decades as a firefighter and paramedic, with
              experience in safety, emergency response, and operations.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/about" className="btn-secondary">
          Meet Our Founders
        </Link>
      </div>
    </section>
  );
}
