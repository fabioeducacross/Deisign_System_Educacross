import type { Meta, StoryObj } from "@storybook/react";

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
            <h2 className="text-2xl font-bold mb-8 text-foreground">Escala de Espaçamento</h2>

            <div className="space-y-3">
                <SpacingRow name="0" value="0" pixels="0px" />
                <SpacingRow name="px" value="1px" pixels="1px" />
                <SpacingRow name="0.5" value="0.125rem" pixels="2px" />
                <SpacingRow name="1" value="0.25rem" pixels="4px" />
                <SpacingRow name="1.5" value="0.375rem" pixels="6px" />
                <SpacingRow name="2" value="0.5rem" pixels="8px" />
                <SpacingRow name="2.5" value="0.625rem" pixels="10px" />
                <SpacingRow name="3" value="0.75rem" pixels="12px" />
                <SpacingRow name="3.5" value="0.875rem" pixels="14px" />
                <SpacingRow name="4" value="1rem" pixels="16px" />
                <SpacingRow name="5" value="1.25rem" pixels="20px" />
                <SpacingRow name="6" value="1.5rem" pixels="24px" />
                <SpacingRow name="7" value="1.75rem" pixels="28px" />
                <SpacingRow name="8" value="2rem" pixels="32px" />
                <SpacingRow name="9" value="2.25rem" pixels="36px" />
                <SpacingRow name="10" value="2.5rem" pixels="40px" />
                <SpacingRow name="12" value="3rem" pixels="48px" />
                <SpacingRow name="14" value="3.5rem" pixels="56px" />
                <SpacingRow name="16" value="4rem" pixels="64px" />
                <SpacingRow name="20" value="5rem" pixels="80px" />
            </div>
        </div>
    ),
};

export const BorderRadius: Story = {
    render: () => (
        <div className="p-8 bg-background">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Border Radius</h2>
            <p className="text-muted-foreground mb-6">
                O token <code className="font-mono text-sm">--radius</code> define o raio base.
            </p>

            <div className="flex flex-wrap gap-8">
                <div className="text-center">
                    <div className="w-20 h-20 bg-primary rounded-none mb-2" />
                    <p className="text-sm text-muted-foreground">none</p>
                    <p className="text-xs font-mono text-muted-foreground">0</p>
                </div>
                <div className="text-center">
                    <div className="w-20 h-20 bg-primary rounded-sm mb-2" />
                    <p className="text-sm text-muted-foreground">sm</p>
                    <p className="text-xs font-mono text-muted-foreground">calc(--radius - 4px)</p>
                </div>
                <div className="text-center">
                    <div className="w-20 h-20 bg-primary rounded-md mb-2" />
                    <p className="text-sm text-muted-foreground">md</p>
                    <p className="text-xs font-mono text-muted-foreground">calc(--radius - 2px)</p>
                </div>
                <div className="text-center">
                    <div className="w-20 h-20 bg-primary rounded-lg mb-2" />
                    <p className="text-sm text-muted-foreground">lg</p>
                    <p className="text-xs font-mono text-muted-foreground">--radius</p>
                </div>
                <div className="text-center">
                    <div className="w-20 h-20 bg-primary rounded-full mb-2" />
                    <p className="text-sm text-muted-foreground">full</p>
                    <p className="text-xs font-mono text-muted-foreground">9999px</p>
                </div>
            </div>
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
