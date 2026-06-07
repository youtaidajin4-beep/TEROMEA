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
        pulseSoft: "pulseSoft 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        popIn: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
        staggerIn: "staggerIn 0.6s ease-out forwards",
        glow: "glow 2s ease-in-out infinite",
        unlockReveal: "unlockReveal 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards",
        scoreBurst: "scoreBurst 0.7s ease-out forwards"
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
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        staggerIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" }
        },
        unlockReveal: {
          "0%": { opacity: "0", transform: "scale(0.88) translateY(12px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" }
        },
        scoreBurst: {
          "0%": { opacity: "0.6", transform: "scale(0.6)" },
          "100%": { opacity: "0", transform: "scale(1.8)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
