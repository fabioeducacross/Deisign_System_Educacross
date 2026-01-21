#!/usr/bin/env node
/**
 * generate-manifest.ts
 *
 * Script para gerar manifest.json com metadados de todos os componentes.
 * Extrai informações via parsing de arquivos TypeScript/TSX.
 *
 * Output: dist/manifest.json
 *
 * Uso:
 *   pnpm tsx scripts/generate-manifest.ts
 */

import * as fs from "fs";
import * as path from "path";
import { componentList, metadata } from "../src/metadata";

interface ComponentMetadata {
    name: string;
    category: string;
    path: string;
    hasVariants: boolean;
    hasTests: boolean;
    hasStories: boolean;
    hasReadme: boolean;
    exports: string[];
}

interface Manifest {
    name: string;
    version: string;
    description: string;
    generatedAt: string;
    totalComponents: number;
    components: ComponentMetadata[];
}

/**
 * Diretórios base
 */
const COMPONENTS_DIR = path.join(__dirname, "../src/components");
const DIST_DIR = path.join(__dirname, "../dist");
const OUTPUT_FILE = path.join(DIST_DIR, "manifest.json");

/**
 * Verifica se um arquivo existe
 */
function fileExists(filePath: string): boolean {
    try {
        return fs.existsSync(filePath);
    } catch {
        return false;
    }
}

/**
 * Lê conteúdo de um arquivo
 */
function readFile(filePath: string): string {
    try {
        return fs.readFileSync(filePath, "utf-8");
    } catch {
        return "";
    }
}

/**
 * Detecta se o componente tem variantes (usa CVA)
 */
function hasVariants(componentPath: string): boolean {
    const tsxFile = path.join(componentPath, `${path.basename(componentPath)}.tsx`);
    if (!fileExists(tsxFile)) return false;

    const content = readFile(tsxFile);
    return content.includes("cva(") || content.includes("Variants");
}

/**
 * Extrai exports de um componente
 */
function extractExports(componentPath: string): string[] {
    const indexFile = path.join(componentPath, "index.ts");
    if (!fileExists(indexFile)) return [];

    const content = readFile(indexFile);
    const exports: string[] = [];

    // Padrão: export { Component, type Props }
    const exportRegex = /export\s+{\s*([^}]+)\s*}/g;
    let match;

    while ((match = exportRegex.exec(content)) !== null) {
        const exportsList = match[1]
            .split(",")
            .map((item) => item.trim().replace(/^type\s+/, ""));
        exports.push(...exportsList);
    }

    return exports.filter(Boolean);
}

/**
 * Gera metadata para um componente individual
 */
function generateComponentMetadata(
    componentName: string,
    category: string
): ComponentMetadata | null {
    const componentPath = path.join(COMPONENTS_DIR, componentName);

    // Verifica se o diretório existe
    if (!fileExists(componentPath) || !fs.statSync(componentPath).isDirectory()) {
        console.warn(`⚠️  Componente ${componentName} não encontrado em ${componentPath}`);
        return null;
    }

    // Verifica arquivos relacionados
    const hasTestFile = fileExists(path.join(componentPath, `${componentName}.test.tsx`));
    const hasReadmeFile = fileExists(path.join(componentPath, "README.md"));

    // Stories estão em apps/storybook
    const storiesPath = path.join(
        __dirname,
        "../../..",
        "apps",
        "storybook",
        "stories",
        "components",
        `${componentName}.stories.tsx`
    );
    const hasStoriesFile = fileExists(storiesPath);

    // Extrai exports
    const exports = extractExports(componentPath);

    return {
        name: componentName,
        category,
        path: `./components/${componentName}`,
        hasVariants: hasVariants(componentPath),
        hasTests: hasTestFile,
        hasStories: hasStoriesFile,
        hasReadme: hasReadmeFile,
        exports,
    };
}

/**
 * Gera manifest completo
 */
function generateManifest(): Manifest {
    const components: ComponentMetadata[] = [];

    console.log("🔍 Analisando componentes...\n");

    // Itera sobre todas as categorias
    for (const [category, componentNames] of Object.entries(componentList)) {
        console.log(`📁 Categoria: ${category}`);

        for (const componentName of componentNames) {
            // Pula subcomponentes compostos (ex: CardHeader → parte do Card)
            if (componentName.includes("Item") && componentName !== "SidebarItem") continue;
            if (componentName.includes("Content") && componentName !== "TabsContent") continue;
            if (componentName.includes("Trigger") && componentName !== "TabsTrigger") continue;
            if (componentName.includes("Portal")) continue;
            if (componentName.includes("Overlay")) continue;
            if (componentName.includes("Close")) continue;

            // Componentes raiz principais
            const rootComponents = [
                "Header",
                "Logo",
                "AvatarIcon",
                "Sidebar",
                "Button",
                "Input",
                "Label",
                "ThemeSwitcher",
                "ThemeProvider",
                "Card",
                "Badge",
                "Avatar",
                "Checkbox",
                "Radio",
                "RadioGroup",
                "Select",
                "Dialog",
                "Alert",
                "Toast",
                "Tabs",
                "Accordion",
                "Tooltip",
                "DropdownMenu",
                "Popover",
                "Table",
                "Pagination",
                "Skeleton",
                "Icon",
                "CustomIcon",
            ];

            if (!rootComponents.includes(componentName)) continue;

            const meta = generateComponentMetadata(componentName, category);
            if (meta) {
                components.push(meta);
                const status = [
                    meta.hasTests ? "✅ Tests" : "❌ Tests",
                    meta.hasStories ? "✅ Stories" : "❌ Stories",
                    meta.hasReadme ? "✅ README" : "❌ README",
                ].join(" | ");
                console.log(`  └─ ${componentName}: ${status}`);
            }
        }
        console.log();
    }

    console.log(`✅ Total de componentes processados: ${components.length}\n`);

    return {
        name: metadata.name,
        version: metadata.version,
        description: metadata.description,
        generatedAt: new Date().toISOString(),
        totalComponents: components.length,
        components,
    };
}

/**
 * Main
 */
function main() {
    console.log("🚀 Gerando manifest.json...\n");

    // Cria diretório dist se não existir
    if (!fileExists(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
    }

    // Gera manifest
    const manifest = generateManifest();

    // Escreve arquivo JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2), "utf-8");

    console.log(`✅ Manifest gerado com sucesso!`);
    console.log(`📄 Arquivo: ${OUTPUT_FILE}`);
    console.log(`📊 Total de componentes: ${manifest.totalComponents}`);

    // Estatísticas
    const stats = {
        withTests: manifest.components.filter((c) => c.hasTests).length,
        withStories: manifest.components.filter((c) => c.hasStories).length,
        withReadme: manifest.components.filter((c) => c.hasReadme).length,
        withVariants: manifest.components.filter((c) => c.hasVariants).length,
    };

    console.log("\n📈 Estatísticas:");
    console.log(`  ✅ Com testes: ${stats.withTests}/${manifest.totalComponents}`);
    console.log(`  📖 Com stories: ${stats.withStories}/${manifest.totalComponents}`);
    console.log(`  📝 Com README: ${stats.withReadme}/${manifest.totalComponents}`);
    console.log(`  🎨 Com variantes: ${stats.withVariants}/${manifest.totalComponents}`);

    // Calcula completude
    const completeness =
        ((stats.withTests + stats.withStories + stats.withReadme) /
            (manifest.totalComponents * 3)) *
        100;
    console.log(`\n🎯 Completude geral: ${completeness.toFixed(1)}%`);
}

// Executa
main();
