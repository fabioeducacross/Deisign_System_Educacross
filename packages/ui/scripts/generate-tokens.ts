#!/usr/bin/env node
/**
 * generate-tokens.ts
 *
 * Script para gerar tokens.json com todas as variáveis CSS do Design System.
 * Extrai de styles.css e tokens.ts para criar um arquivo JSON consumível.
 *
 * Output: dist/tokens.json
 *
 * Uso:
 *   pnpm tsx scripts/generate-tokens.ts
 */

import * as fs from "fs";
import * as path from "path";

interface Token {
    name: string;
    value: string;
    type: "color" | "spacing" | "radius" | "typography" | "shadow" | "other";
    cssVar?: string;
}

interface TokensManifest {
    generatedAt: string;
    version: string;
    tokens: {
        colors: Token[];
        spacing: Token[];
        radius: Token[];
        typography: Token[];
        other: Token[];
    };
    totalTokens: number;
}

const STYLES_FILE = path.join(__dirname, "../src/styles.css");
const DIST_DIR = path.join(__dirname, "../dist");
const OUTPUT_FILE = path.join(DIST_DIR, "tokens.json");

/**
 * Extrai tokens CSS de styles.css
 */
function extractCSSTokens(): Token[] {
    const content = fs.readFileSync(STYLES_FILE, "utf-8");
    const tokens: Token[] = [];

    // Regex para capturar custom properties: --nome: valor;
    const cssVarRegex = /--([\w-]+):\s*([^;]+);/g;
    let match;

    while ((match = cssVarRegex.exec(content)) !== null) {
        const name = match[1];
        const value = match[2].trim();

        // Determina tipo baseado no nome
        let type: Token["type"] = "other";

        if (
            name.includes("color") ||
            name.includes("background") ||
            name.includes("foreground") ||
            name.includes("border") ||
            name.includes("primary") ||
            name.includes("secondary") ||
            name.includes("accent") ||
            name.includes("destructive") ||
            name.includes("muted") ||
            name.includes("card") ||
            name.includes("popover") ||
            name.includes("success") ||
            name.includes("warning") ||
            name.includes("error") ||
            name.includes("info")
        ) {
            type = "color";
        } else if (name.includes("radius")) {
            type = "radius";
        } else if (
            name.includes("font") ||
            name.includes("line-height") ||
            name.includes("letter-spacing")
        ) {
            type = "typography";
        } else if (name.includes("shadow")) {
            type = "shadow";
        }

        tokens.push({
            name,
            value,
            type,
            cssVar: `var(--${name})`,
        });
    }

    return tokens;
}

/**
 * Gera manifest de tokens
 */
function generateTokensManifest(): TokensManifest {
    console.log("🔍 Extraindo tokens CSS...\n");

    const allTokens = extractCSSTokens();

    const tokensByType = {
        colors: allTokens.filter((t) => t.type === "color"),
        spacing: allTokens.filter((t) => t.type === "spacing"),
        radius: allTokens.filter((t) => t.type === "radius"),
        typography: allTokens.filter((t) => t.type === "typography"),
        other: allTokens.filter(
            (t) =>
                t.type !== "color" &&
                t.type !== "spacing" &&
                t.type !== "radius" &&
                t.type !== "typography"
        ),
    };

    console.log("📊 Tokens encontrados:");
    console.log(`  🎨 Colors: ${tokensByType.colors.length}`);
    console.log(`  📏 Spacing: ${tokensByType.spacing.length}`);
    console.log(`  ⭕ Radius: ${tokensByType.radius.length}`);
    console.log(`  🔤 Typography: ${tokensByType.typography.length}`);
    console.log(`  📦 Other: ${tokensByType.other.length}`);
    console.log(`  ✅ Total: ${allTokens.length}\n`);

    return {
        generatedAt: new Date().toISOString(),
        version: "0.2.0",
        tokens: tokensByType,
        totalTokens: allTokens.length,
    };
}

/**
 * Main
 */
function main() {
    console.log("🚀 Gerando tokens.json...\n");

    // Cria diretório dist se não existir
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
    }

    // Gera manifest
    const manifest = generateTokensManifest();

    // Escreve arquivo JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2), "utf-8");

    console.log(`✅ Tokens gerados com sucesso!`);
    console.log(`📄 Arquivo: ${OUTPUT_FILE}`);
    console.log(`📊 Total de tokens: ${manifest.totalTokens}`);
}

// Executa
main();
