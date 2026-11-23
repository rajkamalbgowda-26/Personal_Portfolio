import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: "var(--bg-porcelain)",
        pearl: "var(--bg-pearl)",
        silver: {
          100: "var(--silver-100)",
          300: "var(--silver-300)",
          500: "var(--silver-500)",
          700: "var(--silver-700)",
        },
        graphite: {
          600: "var(--graphite-600)",
          900: "var(--graphite-900)",
        },
        iris: {
          cyan: "var(--iris-cyan)",
          lilac: "var(--iris-lilac)",
          peach: "var(--iris-peach)",
        },
        signal: "var(--signal)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "iris-spectrum": "linear-gradient(135deg, var(--iris-cyan) 0%, var(--iris-lilac) 50%, var(--iris-peach) 100%)",
        "chrome-sheen": "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(201,205,211,0.2) 50%, rgba(167,173,181,0.4) 100%)",
        "brushed-silver": "linear-gradient(90deg, #F7F8FA 0%, #E4E7EB 25%, #C9CDD3 50%, #E4E7EB 75%, #F7F8FA 100%)",
      },
      boxShadow: {
        "atelier-subtle": "0 2px 20px -2px rgba(22, 24, 28, 0.05)",
        "atelier-card": "0 10px 30px -10px rgba(110, 116, 124, 0.12), 0 0 0 1px rgba(228, 231, 235, 0.8)",
        "atelier-hover": "0 20px 40px -15px rgba(47, 107, 255, 0.15), 0 0 0 1px rgba(201, 184, 255, 0.4)",
        "chrome-glow": "0 0 30px -5px rgba(201, 205, 211, 0.5)",
        "iris-glow": "0 0 35px -5px rgba(159, 231, 245, 0.35)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "holo-shift": "holo 8s ease infinite alternate",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        holo: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(60deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
