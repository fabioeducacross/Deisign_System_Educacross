/**
 * generate-tokens.test.ts
 *
 * Testes para validação do generate-tokens.ts
 */

import { describe, it, expect, beforeAll } from "vitest";
import * as fs from "fs";
import * as path from "path";

const TOKENS_PATH = path.join(__dirname, "../../dist/tokens.json");

describe("generate-tokens", () => {
    let tokens: any;

    beforeAll(() => {
        // Lê os tokens gerados
        if (fs.existsSync(TOKENS_PATH)) {
            const content = fs.readFileSync(TOKENS_PATH, "utf-8");
            tokens = JSON.parse(content);
        }
    });

    describe("Estrutura dos tokens", () => {
        it("deve existir arquivo tokens.json em dist/", () => {
            expect(fs.existsSync(TOKENS_PATH)).toBe(true);
        });

        it("deve ter propriedades obrigatórias", () => {
            expect(tokens).toHaveProperty("generatedAt");
            expect(tokens).toHaveProperty("version");
            expect(tokens).toHaveProperty("tokens");
            expect(tokens).toHaveProperty("totalTokens");
        });

        it("deve ter versão válida", () => {
            expect(tokens.version).toMatch(/^\d+\.\d+\.\d+/);
        });

        it("deve ter generatedAt em formato ISO", () => {
            expect(() => new Date(tokens.generatedAt)).not.toThrow();
            expect(new Date(tokens.generatedAt).toISOString()).toBe(
                tokens.generatedAt
            );
        });

        it("deve ter objeto tokens com categorias", () => {
            expect(tokens.tokens).toHaveProperty("colors");
            expect(tokens.tokens).toHaveProperty("spacing");
            expect(tokens.tokens).toHaveProperty("radius");
            expect(tokens.tokens).toHaveProperty("typography");
            expect(tokens.tokens).toHaveProperty("other");
        });
    });

    describe("Categorias de tokens", () => {
        it("colors deve ser array", () => {
            expect(Array.isArray(tokens.tokens.colors)).toBe(true);
        });

        it("deve ter tokens de cores (mínimo 10)", () => {
            expect(tokens.tokens.colors.length).toBeGreaterThanOrEqual(10);
        });

        it("cada token deve ter estrutura válida", () => {
            const token = tokens.tokens.colors[0];
            expect(token).toHaveProperty("name");
            expect(token).toHaveProperty("value");
            expect(token).toHaveProperty("type");
            expect(token.type).toBe("color");
        });

        it("tokens devem ter cssVar quando aplicável", () => {
            for (const tokenCategory of Object.values(tokens.tokens)) {
                for (const token of tokenCategory as any[]) {
                    if (token.cssVar) {
                        expect(token.cssVar).toMatch(/^var\(--[\w-]+\)$/);
                    }
                }
            }
        });
    });

    describe("Validação de valores", () => {
        it("totalTokens deve corresponder ao total de arrays", () => {
            const total =
                tokens.tokens.colors.length +
                tokens.tokens.spacing.length +
                tokens.tokens.radius.length +
                tokens.tokens.typography.length +
                tokens.tokens.other.length;
            expect(tokens.totalTokens).toBe(total);
        });

        it("nomes de tokens não devem ter prefixo --", () => {
            for (const tokenCategory of Object.values(tokens.tokens)) {
                for (const token of tokenCategory as any[]) {
                    expect(token.name).not.toMatch(/^--/);
                }
            }
        });

        it("valores não devem estar vazios", () => {
            for (const tokenCategory of Object.values(tokens.tokens)) {
                for (const token of tokenCategory as any[]) {
                    expect(token.value).toBeTruthy();
                    expect(token.value.length).toBeGreaterThan(0);
                }
            }
        });
    });

    describe("Tokens específicos", () => {
        it("deve incluir token primary", () => {
            const primary = tokens.tokens.colors.find(
                (t: any) => t.name === "primary" || t.name.includes("primary")
            );
            expect(primary).toBeDefined();
        });

        it("deve incluir tokens de radius", () => {
            expect(tokens.tokens.radius.length).toBeGreaterThan(0);
        });

        it("tipos de tokens devem ser válidos", () => {
            const validTypes = ["color", "spacing", "radius", "typography", "shadow", "other"];

            for (const tokenCategory of Object.values(tokens.tokens)) {
                for (const token of tokenCategory as any[]) {
                    expect(validTypes).toContain(token.type);
                }
            }
        });
    });
});
