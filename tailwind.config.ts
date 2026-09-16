import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
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
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
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
