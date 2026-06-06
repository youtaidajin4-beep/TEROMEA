import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fbf7ef",
        mint: "#e8f6ef",
        skysoft: "#e8f3fb",
        leaf: "#4f9f72",
        ink: "#24322b",
        navy: "#1e2a3a",
        beige: "#f5efe6",
        accent: "#e07a3a"
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(36, 50, 43, 0.08)",
        card: "0 8px 32px rgba(30, 42, 58, 0.06)"
      },
      animation: {
        fadeSlide: "fadeSlide 0.35s ease-out",
        scoreReveal: "scoreReveal 0.6s ease-out",
        pulseSoft: "pulseSoft 2.5s ease-in-out infinite"
      },
      keyframes: {
        fadeSlide: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        scoreReveal: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(224, 122, 58, 0.3)" },
          "50%": { boxShadow: "0 0 0 8px rgba(224, 122, 58, 0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
