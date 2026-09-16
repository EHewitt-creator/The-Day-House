import Link from "next/link";
import Logo from "@/components/Logo";
import { BrandStatementFooter } from "@/components/BrandStatement";

export default function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-sage-900 text-cream-100">
      <div className="mx-auto max-w-content px-6 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="mb-4 [&_span]:text-cream-100">
              <Logo />
            </div>
            <BrandStatementFooter className="max-w-sm" />
            <p className="mt-3 text-sm font-semibold tracking-wide text-terracotta-400">
              Coming soon to the Treasure Valley, Idaho
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wide text-cream-100/60">
              Explore
            </h2>
            <ul className="space-y-3 text-base">
              <li>
                <Link href="/our-approach" className="hover:text-terracotta-400">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-terracotta-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-terracotta-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-terracotta-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wide text-cream-100/60">
              Legal
            </h2>
            <ul className="space-y-3 text-base">
              <li>
                <Link href="/privacy" className="hover:text-terracotta-400">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream-100/10 pt-6 text-sm text-cream-100/60">
          © {new Date().getFullYear()} The Day House. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
