import type { Config } from "tailwindcss";

/**
 * LTL Pulse design system tokens.
 * Theme extensions are applied in src/app/globals.css (Tailwind v4 CSS-first config).
 */
const ltlPulse = {
  colors: {
    background: "#111111",
    surface: "#1A1A1A",
    border: "#2A2A2A",
    accent: {
      DEFAULT: "#FFB400",
      hover: "#E6A200",
    },
    text: {
      primary: "#F5F5F5",
      secondary: "#A0A0A0",
    },
  },
  fontFamily: {
    sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
    heading: ["var(--font-heading)", "Playfair Display", "Georgia", "serif"],
    mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
    label: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
  },
  keyframes: {
    "fade-up": {
      from: { opacity: "0", transform: "translateY(1rem)" },
      to: { opacity: "1", transform: "translateY(0)" },
    },
    "stagger-fade-up": {
      from: { opacity: "0", transform: "translateY(1rem)" },
      to: { opacity: "1", transform: "translateY(0)" },
    },
  },
  animation: {
    "fade-up": "fade-up 0.6s ease-out both",
    "stagger-fade-up": "stagger-fade-up 0.6s ease-out both",
  },
} as const;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: ltlPulse,
  },
  plugins: [],
};

export default config;
export { ltlPulse };
