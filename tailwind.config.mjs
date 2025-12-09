/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Russo One"', "sans-serif"],
        tech: ['"Chakra Petch"', "sans-serif"],
      },
      colors: {
        brand: {
          blue: "#0071BD",
          red: "#E11E36",
          black: "#050505",
          white: "#FFFFFF",
        },
        // Semantic color tokens using CSS variables
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-alt": "var(--color-surface-alt)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
      },
    },
  },
  plugins: [],
};
