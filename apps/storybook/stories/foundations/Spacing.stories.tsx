import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenShowcase } from "../../src/components";

const meta: Meta = {
    title: "Foundations/Spacing",
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: `
# Espaçamento

O sistema de espaçamento segue a escala padrão do Tailwind CSS.

## Uso

\`\`\`tsx
// Padding
<div className="p-4">16px de padding</div>
<div className="px-6 py-4">24px horizontal, 16px vertical</div>

// Margin
<div className="mt-8">32px margin top</div>
<div className="space-y-4">16px gap vertical</div>

// Gap (Flexbox/Grid)
<div className="flex gap-4">16px entre items</div>
\`\`\`

## Copiar Tokens

Clique em qualquer token abaixo para copiar o nome para a área de transferência.
        `,
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

interface SpacingRowProps {
    name: string;
    value: string;
    pixels: string;
}

function SpacingRow({ name, value, pixels }: SpacingRowProps) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-16 text-sm font-mono text-muted-foreground">{name}</div>
            <div className="w-16 text-sm text-muted-foreground">{pixels}</div>
            <div
                className="h-4 bg-primary rounded"
                style={{ width: value }}
            />
        </div>
    );
}

export const Scale: Story = {
    render: () => (
        <div className="p-8 bg-background">
            <TokenShowcase
                title="Escala de Espaçamento"
                category="spacing"
                tokens={[
                    { name: "Nenhum", value: "0px", token: "0" },
                    { name: "Extra Pequeno", value: "0.25rem", token: "1" },
                    { name: "Pequeno", value: "0.5rem", token: "2" },
                    { name: "Pequeno+", value: "0.75rem", token: "3" },
                    { name: "Base", value: "1rem", token: "4" },
                    { name: "Médio", value: "1.25rem", token: "5" },
                    { name: "Médio+", value: "1.5rem", token: "6" },
                    { name: "Grande", value: "2rem", token: "8" },
                    { name: "Extra Grande", value: "2.5rem", token: "10" },
                    { name: "2XL", value: "3rem", token: "12" },
                    { name: "3XL", value: "4rem", token: "16" },
                    { name: "4XL", value: "5rem", token: "20" },
                ]}
            />
        </div>
    ),
};

export const BorderRadius: Story = {
    render: () => (
        <div className="p-8 bg-background">
            <TokenShowcase
                title="Border Radius"
                category="radius"
                tokens={[
                    { name: "Nenhum", value: "0px", token: "rounded-none" },
                    { name: "Pequeno", value: "calc(var(--radius) - 4px)", token: "rounded-sm" },
                    { name: "Médio", value: "calc(var(--radius) - 2px)", token: "rounded-md" },
                    { name: "Grande", value: "var(--radius)", token: "rounded-lg" },
                    { name: "Extra Grande", value: "calc(var(--radius) + 4px)", token: "rounded-xl" },
                    { name: "Circular", value: "9999px", token: "rounded-full" },
                ]}
            />
        </div>
    ),
};

export const Shadows: Story = {
    render: () => (
        <div className="p-8 bg-background">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Sombras</h2>

            <div className="flex flex-wrap gap-8">
                <div className="text-center">
                    <div className="w-24 h-24 bg-card rounded-lg shadow-sm mb-4" />
                    <p className="text-sm text-muted-foreground">shadow-sm</p>
                </div>
                <div className="text-center">
                    <div className="w-24 h-24 bg-card rounded-lg shadow-md mb-4" />
                    <p className="text-sm text-muted-foreground">shadow-md</p>
                </div>
                <div className="text-center">
                    <div className="w-24 h-24 bg-card rounded-lg shadow-lg mb-4" />
                    <p className="text-sm text-muted-foreground">shadow-lg</p>
                </div>
            </div>
        </div>
    ),
};
