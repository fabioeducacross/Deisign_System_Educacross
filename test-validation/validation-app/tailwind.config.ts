import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@fabioeducacross/ui/dist/**/*.{js,mjs}",
  ],
  presets: [
    require("@fabioeducacross/ui/tailwind-preset"),
  ],
  darkMode: "class",
};

export default config;
