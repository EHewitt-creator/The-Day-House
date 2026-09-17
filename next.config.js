/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Default is webp only; avif is smaller for most photos and Vercel's
    // Image Optimization API serves it automatically to browsers that
    // support it, falling back to webp/original otherwise. Verified locally:
    // /_next/image requests now return image/avif for Accept headers that
    // support it.
    formats: ["image/avif", "image/webp"],
  },
  // Tried experimental.optimizeCss (Next's critters-based critical-CSS
  // inlining) to address Lighthouse's render-blocking-CSS flag. Verified via
  // built output that it did not inline anything here — the served
  // stylesheet was byte-identical with or without the flag — and a Lighthouse
  // re-run with it enabled showed no improvement (and a small score dip,
  // likely noise). Reverted rather than ship a config flag with no verified
  // effect; the `critters` devDependency stays installed in case a future
  // Next.js version makes this work for the App Router.
};

module.exports = nextConfig;
