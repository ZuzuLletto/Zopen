import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0e17",
        surface: "#13161f",
        "surface-light": "#1a1e2e",
        border: "#252a3a",
        primary: "#00d4ff",
        "primary-dark": "#00a8cc",
        secondary: "#8b5cf6",
        accent: "#f59e0b",
        success: "#10b981",
        danger: "#ef4444",
        // Rarity colors
        common: "#6b7280",
        uncommon: "#3b82f6",
        rare: "#8b5cf6",
        epic: "#ef4444",
        legendary: "#f59e0b",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
