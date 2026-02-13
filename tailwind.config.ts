import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // This covers everything inside src/app/
  ],
  theme: {
    extend: {
      colors: {
        // Colors are defined in src/app/globals.css via @theme for Tailwind v4
      },
    },
  },
  // ... rest of your config
};