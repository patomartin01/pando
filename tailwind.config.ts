import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07090E",
        foreground: "#F8FAFC",
        pando: {
          dark: "#07090E",
          card: "#0D111A",
          hover: "#141A26",
          border: "#1E2638",
          emerald: "#10B981",
          teal: "#14B8A6",
          cyan: "#06B6D4",
          violet: "#8B5CF6",
          amber: "#F59E0B",
          rose: "#F43F5E",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px -3px rgba(16, 185, 129, 0.25)",
        "glow-cyan": "0 0 20px -3px rgba(6, 182, 212, 0.25)",
        "glow-violet": "0 0 20px -3px rgba(139, 92, 246, 0.25)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
