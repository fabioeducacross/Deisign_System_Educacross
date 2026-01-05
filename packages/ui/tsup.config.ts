import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        "tailwind-preset": "src/tailwind-preset.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
    esbuildOptions(options) {
        options.banner = {
            js: '"use client";',
        };
    },
    onSuccess: async () => {
        // Copy CSS to dist
        const fs = await import("fs");
        const path = await import("path");
        const src = path.resolve("src/styles.css");
        const dest = path.resolve("dist/styles.css");
        fs.copyFileSync(src, dest);
        console.log("✓ Copied styles.css to dist");
    },
});
