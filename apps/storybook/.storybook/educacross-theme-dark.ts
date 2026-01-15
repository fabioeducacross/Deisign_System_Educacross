import { create } from "storybook/theming/create";
import logoEducacross from "../public/logo-educacross.svg";

export default create({
    base: "dark",
    
    // Branding
    brandTitle: "Educacross Design System",
    brandUrl: "https://educacross.com.br",
    brandImage: logoEducacross, // TODO: Criar logo-educacross-dark.svg
    brandTarget: "_blank",

    // UI Colors (Dark Mode)
    appBg: "#0F172A",                      // Slate 900
    appContentBg: "#1E293B",               // Slate 800
    appBorderColor: "#334155",             // Slate 700
    appPreviewBg: "#1E293B",
    appBorderRadius: 12,

    // Typography
    fontBase: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontCode: '"JetBrains Mono", "Fira Code", Consolas, monospace',

    // Text colors (High contrast)
    textColor: "#F1F5F9",                  // Slate 100
    textInverseColor: "#0F172A",           // Slate 900
    textMutedColor: "#94A3B8",             // Slate 400

    // Toolbar colors
    barTextColor: "#CBD5E1",               // Slate 300
    barHoverColor: "#8F85F3",              // --color-primary-400 (lighter)
    barSelectedColor: "#8F85F3",           // --color-primary-400
    barBg: "#1E293B",                      // Slate 800

    // Buttons
    buttonBg: "#8F85F3",                   // --color-primary-400
    buttonBorder: "#8F85F3",
    booleanBg: "#334155",
    booleanSelectedBg: "#8F85F3",

    // Colors
    colorPrimary: "#8F85F3",               // --color-primary-400
    colorSecondary: "#33C8DA",             // --color-info-400

    // Form colors
    inputBg: "#1E293B",                    // Slate 800
    inputBorder: "#475569",                // Slate 600
    inputTextColor: "#F1F5F9",             // Slate 100
    inputBorderRadius: 8,
});
