import type { Config } from "tailwindcss";
import { educacrossPreset } from "./src/tailwind-preset";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}"],
    presets: [educacrossPreset],
};

export default config;
