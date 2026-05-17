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
        ink: "#24322b"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(36, 50, 43, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
