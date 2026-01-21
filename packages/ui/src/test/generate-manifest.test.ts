/**
 * generate-manifest.test.ts
 *
 * Testes para validação do generate-manifest.ts
 */

import { describe, it, expect, beforeAll } from "vitest";
import * as fs from "fs";
import * as path from "path";

const MANIFEST_PATH = path.join(__dirname, "../../dist/manifest.json");

describe("generate-manifest", () => {
    let manifest: any;

    beforeAll(() => {
        // Lê o manifest gerado
        if (fs.existsSync(MANIFEST_PATH)) {
            const content = fs.readFileSync(MANIFEST_PATH, "utf-8");
            manifest = JSON.parse(content);
        }
    });

    describe("Estrutura do manifest", () => {
        it("deve existir arquivo manifest.json em dist/", () => {
            expect(fs.existsSync(MANIFEST_PATH)).toBe(true);
        });

        it("deve ter propriedades obrigatórias", () => {
            expect(manifest).toHaveProperty("name");
            expect(manifest).toHaveProperty("version");
            expect(manifest).toHaveProperty("description");
            expect(manifest).toHaveProperty("generatedAt");
            expect(manifest).toHaveProperty("totalComponents");
            expect(manifest).toHaveProperty("components");
        });

        it("deve ter nome do pacote correto", () => {
            expect(manifest.name).toBe("@fabioeducacross/ui");
        });

        it("deve ter versão válida", () => {
            expect(manifest.version).toMatch(/^\d+\.\d+\.\d+/);
        });

        it("deve ter generatedAt em formato ISO", () => {
            expect(() => new Date(manifest.generatedAt)).not.toThrow();
            expect(new Date(manifest.generatedAt).toISOString()).toBe(manifest.generatedAt);
        });
    });

    describe("Componentes", () => {
        it("deve ter array de componentes", () => {
            expect(Array.isArray(manifest.components)).toBe(true);
            expect(manifest.components.length).toBeGreaterThan(0);
        });

        it("totalComponents deve corresponder ao array", () => {
            expect(manifest.totalComponents).toBe(manifest.components.length);
        });

        it("deve ter componentes principais (mínimo 25)", () => {
            expect(manifest.totalComponents).toBeGreaterThanOrEqual(25);
        });

        it("cada componente deve ter estrutura válida", () => {
            const component = manifest.components[0];
            expect(component).toHaveProperty("name");
            expect(component).toHaveProperty("category");
            expect(component).toHaveProperty("path");
            expect(component).toHaveProperty("hasVariants");
            expect(component).toHaveProperty("hasTests");
            expect(component).toHaveProperty("hasStories");
            expect(component).toHaveProperty("hasReadme");
            expect(component).toHaveProperty("exports");
        });

        it("exports deve ser array não vazio", () => {
            for (const component of manifest.components) {
                expect(Array.isArray(component.exports)).toBe(true);
                expect(component.exports.length).toBeGreaterThan(0);
            }
        });

        it("deve incluir Logo", () => {
            const logo = manifest.components.find((c: any) => c.name === "Logo");
            expect(logo).toBeDefined();
            expect(logo.category).toBe("layout");
        });

        it("deve incluir Button", () => {
            const button = manifest.components.find((c: any) => c.name === "Button");
            expect(button).toBeDefined();
            expect(button.category).toBe("forms");
        });
    });

    describe("Categorias", () => {
        it("deve ter categorias válidas", () => {
            const validCategories = [
                "layout",
                "forms",
                "display",
                "feedback",
                "overlay",
                "navigation",
                "theme",
                "icons",
            ];

            for (const component of manifest.components) {
                expect(validCategories).toContain(component.category);
            }
        });

        it("deve ter componentes em múltiplas categorias", () => {
            const categories = new Set(
                manifest.components.map((c: any) => c.category)
            );
            expect(categories.size).toBeGreaterThanOrEqual(5);
        });
    });

    describe("Paths", () => {
        it("todos os paths devem começar com ./components/", () => {
            for (const component of manifest.components) {
                expect(component.path).toMatch(/^\.\/components\/.+$/);
            }
        });

        it("paths devem corresponder aos nomes", () => {
            for (const component of manifest.components) {
                expect(component.path).toContain(component.name);
            }
        });
    });
});
