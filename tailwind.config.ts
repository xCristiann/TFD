import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#07090f",
        panel: "#0f1422",
        line: "#232b3b",
        foreground: "#e6ebf5",
        muted: "#9ea8bc",
        accent: {
          DEFAULT: "#4f7cff",
          soft: "#1f325f",
          success: "#1fa67a",
          danger: "#e85d75",
          warning: "#f2b44f"
        }
      },
      boxShadow: {
        panel: "0 20px 50px -25px rgba(0,0,0,0.55)",
        soft: "0 12px 30px -20px rgba(79,124,255,0.45)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at top, rgba(79,124,255,0.22), rgba(7,9,15,0) 48%)"
      }
    }
  },
  plugins: []
};

export default config;
