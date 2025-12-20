import type { Config } from "tailwindcss";

const withOpacityValue = (variable: string) => {
  return ({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}) / 1)`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
};

const accentPalette = {
  "brand-midnight": "#030712",
  "brand-ink": "#070F1F",
  "brand-cobalt": "#4364F7",
  "brand-iris": "#7C8BFF",
  "brand-cyan": "#18B8FF",
  "brand-amber": "#F5C266",
  "brand-rose": "#FF8AA6",
  "border-glow": "rgba(124, 139, 255, 0.45)",
};

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...accentPalette,
        "surface-base": withOpacityValue("--surface-base"),
        "surface-card": withOpacityValue("--surface-card"),
        "surface-soft": withOpacityValue("--surface-soft"),
        "surface-contrast": withOpacityValue("--surface-contrast"),
        "text-high": withOpacityValue("--text-high"),
        "text-muted": withOpacityValue("--text-muted"),
      },
      fontFamily: {
        display: ["var(--font-be-vietnam-pro)", "sans-serif"],
        body: ["var(--font-noto-sans)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        glow: "0 25px 80px rgba(67, 100, 247, 0.35)",
        card: "0 20px 45px rgba(5, 10, 24, 0.45)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at 20% 20%, rgba(111, 231, 255, 0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255, 138, 166, 0.18), transparent 55%), linear-gradient(140deg, rgba(3, 7, 18, 0.95), rgba(7, 15, 31, 0.9))",
        "card-aurora":
          "linear-gradient(135deg, rgba(67, 100, 247, 0.18), rgba(111, 231, 255, 0.08))",
      },
    },
  },
  plugins: [],
};

export default config;
