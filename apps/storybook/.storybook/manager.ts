import { addons } from "storybook/manager-api";
import themeLight from "./theme";
import themeDark from "./educacross-theme-dark";

// Detecta preferência do sistema
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
    theme: isDarkMode ? themeDark : themeLight,
    sidebar: {
        showRoots: true,
        collapsedRoots: [],
    },
});
