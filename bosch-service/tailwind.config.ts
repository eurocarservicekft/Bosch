import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        surface: "var(--bg-2)",
        surface2: "var(--bg-3)",
        border: "var(--border)",
        ink: "var(--text)",
        muted: "var(--text-2)",
        accent: {
          DEFAULT: "var(--red)",
          soft: "var(--red-soft)",
        },
      },
      fontFamily: {
        serif: ["var(--serif)"],
        sans: ["var(--sans)"],
        mono: ["var(--mono)"],
      },
      keyframes: {
        kenburns: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.05)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        kenburns: "kenburns 15s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
