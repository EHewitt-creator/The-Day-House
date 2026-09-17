"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";

/**
 * A discreet, mobile-only "Join Our Interest List" bar that appears once a
 * visitor has scrolled a bit into the page (so it isn't just noise on first
 * paint) and disappears whenever the family-interest form itself is on
 * screen, so it never sits on top of form fields, consent text, validation
 * messages, or the submit button. It's conditionally rendered (rather than
 * just hidden) so it never leaves an off-screen, keyboard-focusable link
 * behind when it isn't visible.
 */
export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const formSection = document.getElementById("family-interest");
    let pastThreshold = false;
    let formInView = false;

    function recompute() {
      setVisible(pastThreshold && !formInView);
    }

    function onScroll() {
      pastThreshold = window.scrollY > 480;
      recompute();
    }

    const observer =
      formSection && "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              formInView = entry.isIntersecting;
              recompute();
            },
            { rootMargin: "0px 0px -15% 0px" }
          )
        : null;

    if (formSection && observer) observer.observe(formSection);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-cream/95 px-4 pt-3 shadow-soft backdrop-blur sm:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/#family-interest"
        className="btn-primary block w-full text-center"
        onClick={() => track("hero_interest_click", { location: "mobile_sticky" })}
      >
        Join Our Interest List
      </Link>
    </div>
  );
}
