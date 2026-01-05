import type { Config } from "tailwindcss";
import { educacrossPreset } from "@educacross/ui/tailwind-preset";

const config: Config = {
    content: [
        "./stories/**/*.{ts,tsx,mdx}",
        "../../packages/ui/src/**/*.{ts,tsx}",
    ],
    presets: [educacrossPreset],
};

export default config;
