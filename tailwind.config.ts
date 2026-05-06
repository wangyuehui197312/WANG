import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        clay: "#8C6A53",
        oat: "#F5F0EA",
        pine: "#5B6D63",
        ink: "#2F3440"
      }
    }
  },
  plugins: []
};

export default config;
