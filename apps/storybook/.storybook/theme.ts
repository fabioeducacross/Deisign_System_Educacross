import { create } from "storybook/theming/create";
import logoEducacross from "../public/logo-educacross.svg";

export default create({
    base: "light",
    
    // Branding
    brandTitle: "Educacross Design System",
    brandUrl: "https://educacross.com.br",
    brandImage: logoEducacross,
    brandTarget: "_blank",

    // UI Colors (Educacross tokens)
    appBg: "#FFFFFF",
    appContentBg: "#F5F5F7",              // --color-gray-100
    appBorderColor: "#E1E1E8",            // --color-gray-300
    appPreviewBg: "#FFFFFF",
    appBorderRadius: 12,

    // Typography
    fontBase: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontCode: '"JetBrains Mono", "Fira Code", Consolas, monospace',

    // Text colors
    textColor: "#1F2937",                  // Texto principal (gray-900)
    textInverseColor: "#FFFFFF",
    textMutedColor: "#6B7280",             // Texto secundário (gray-600)

    // Toolbar colors (Educacross Primary)
    barTextColor: "#4B5563",               // gray-700
    barHoverColor: "#7367F0",              // --color-primary-500
    barSelectedColor: "#7367F0",           // --color-primary-500
    barBg: "#FFFFFF",

    // Buttons (Primary Educacross)
    buttonBg: "#7367F0",                   // --color-primary-500
    buttonBorder: "#7367F0",
    booleanBg: "#E1E1E8",
    booleanSelectedBg: "#7367F0",

    // Colors
    colorPrimary: "#7367F0",               // --color-primary-500
    colorSecondary: "#00BAD1",             // --color-info-500

    // Form colors
    inputBg: "#FFFFFF",
    inputBorder: "#D7D7E0",                // --color-gray-400
    inputTextColor: "#1F2937",
    inputBorderRadius: 8,
});
