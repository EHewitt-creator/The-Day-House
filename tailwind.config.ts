import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Extra breakpoint below the default `sm` (640px), for mobile-first
      // tweaks that should kick in on typical modern phones (~390-430px
      // wide) while still leaving very small or split-screen viewports at
      // a single column.
      screens: {
        xs: "420px",
      },
      colors: {
        cream: {
          DEFAULT: "#FBF6EE",
          50: "#FFFDFB",
          100: "#FBF6EE",
          200: "#F5EBDC",
        },
        peach: {
          DEFAULT: "#F5DCC6",
          100: "#FAEEE1",
          200: "#F5DCC6",
          300: "#EEC7A4",
        },
        terracotta: {
          DEFAULT: "#DC8A4E",
          50: "#FBEAD9",
          100: "#F5D3B3",
          400: "#E5A06B",
          500: "#DC8A4E",
          600: "#C4713A",
          700: "#9C5A2E",
        },
        sage: {
          DEFAULT: "#5C6B4F",
          50: "#EEF1E9",
          100: "#DAE1CE",
          300: "#9AAB86",
          500: "#5C6B4F",
          600: "#4A5640",
          700: "#3A4332",
          900: "#242A1E",
        },
        ink: {
          DEFAULT: "#2B2A26",
          700: "#4A473F",
          500: "#6B675C",
        },
      },
      // Poppins is the only font loaded now (see app/layout.tsx). Both
      // `font-serif` (used for headings and the logo wordmark, via
      // `h1, h2, h3, h4` in globals.css and components/Logo.tsx) and
      // `font-sans` (body text, and a few explicit overrides like the
      // Footer's eyebrow labels) point at the same font on purpose, so
      // every existing className in the codebase keeps working — nothing
      // is actually serif anymore, "serif" here is just the existing
      // Tailwind utility name carried over from the previous two-font setup.
      fontFamily: {
        serif: ["var(--font-poppins)", "system-ui", "sans-serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(43, 42, 38, 0.18)",
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
