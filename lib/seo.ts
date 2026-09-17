import type { Metadata } from "next";

// Single source of truth for the site's canonical origin and name, so it's
// never hand-typed (and risking a typo or drift) in more than one place —
// layout.tsx, the sitemap, robots.txt, and every page's metadata all import
// this instead of hardcoding the URL.
export const SITE_URL = "https://www.yourdayhouse.com";
export const SITE_NAME = "The Day House";

/**
 * Builds a page's full metadata (title, description, canonical, and
 * matching Open Graph / Twitter tags) from the same title and description
 * used for the <title> tag, so a shared link preview never falls back to
 * showing a different page's title and summary. `path` is the route's
 * canonical path (e.g. "/about"), resolved against SITE_URL/metadataBase.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/**
 * BreadcrumbList JSON-LD for an interior page. Every route here is one level
 * below Home, so this only ever needs the page's own name and path — no
 * need for a generic multi-level builder until the site's structure grows
 * deeper than that.
 */
export function breadcrumbJsonLd(pageName: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: pageName, item: `${SITE_URL}${path}` },
    ],
  };
}
