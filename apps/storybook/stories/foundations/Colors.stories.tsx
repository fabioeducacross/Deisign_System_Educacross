import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: "Foundations/Colors",
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: `
# Design Tokens - Cores

Os tokens de cor são a base do sistema visual do Educacross Design System.
Todas as cores são definidas como CSS custom properties e mapeadas para o Tailwind.

## Uso

\`\`\`tsx
// Tailwind classes
<div className="bg-primary text-primary-foreground" />
<div className="bg-destructive text-destructive-foreground" />

// CSS custom properties
.custom-element {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
\`\`\`

## Light / Dark Mode

Alterne o tema usando o controle no topo da página para ver as cores em ambos os modos.
        `,
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

interface ColorSwatchProps {
    name: string;
    variable: string;
    className: string;
    textClass?: string;
}

function ColorSwatch({ name, variable, className, textClass = "text-foreground" }: ColorSwatchProps) {
    return (
        <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-lg border border-border ${className}`} />
            <div>
                <p className={`font-medium ${textClass}`}>{name}</p>
                <p className="text-sm text-muted-foreground font-mono">{variable}</p>
            </div>
        </div>
    );
}

function ColorPair({ name, bgClass, fgClass }: { name: string; bgClass: string; fgClass: string }) {
    return (
        <div className="flex flex-col gap-2">
            <div className={`${bgClass} ${fgClass} rounded-lg p-4 border border-border`}>
                <p className="font-medium">{name}</p>
                <p className="text-sm opacity-80">Foreground text</p>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
                bg: {bgClass.replace("bg-", "")} | fg: {fgClass.replace("text-", "")}
            </p>
        </div>
    );
}

export const SemanticColors: Story = {
    render: () => (
        <div className="p-8 bg-background">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Cores Semânticas</h2>
            <p className="text-muted-foreground mb-8">
                Cores com significado específico, usadas consistentemente em toda a aplicação.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ColorPair name="Primary" bgClass="bg-primary" fgClass="text-primary-foreground" />
                <ColorPair name="Secondary" bgClass="bg-secondary" fgClass="text-secondary-foreground" />
                <ColorPair name="Destructive" bgClass="bg-destructive" fgClass="text-destructive-foreground" />
                <ColorPair name="Muted" bgClass="bg-muted" fgClass="text-muted-foreground" />
                <ColorPair name="Accent" bgClass="bg-accent" fgClass="text-accent-foreground" />
                <ColorPair name="Card" bgClass="bg-card" fgClass="text-card-foreground" />
            </div>
        </div>
    ),
};

export const BaseColors: Story = {
    render: () => (
        <div className="p-8 bg-background">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Cores Base</h2>
            <p className="text-muted-foreground mb-8">
                Cores fundamentais para backgrounds, textos e bordas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorSwatch
                    name="Background"
                    variable="--background"
                    className="bg-background"
                />
                <ColorSwatch
                    name="Foreground"
                    variable="--foreground"
                    className="bg-foreground"
                />
                <ColorSwatch
                    name="Border"
                    variable="--border"
                    className="bg-border"
                />
                <ColorSwatch
                    name="Input"
                    variable="--input"
                    className="bg-input"
                />
                <ColorSwatch
                    name="Ring"
                    variable="--ring"
                    className="bg-ring"
                />
            </div>
        </div>
    ),
};

export const AllTokens: Story = {
    render: () => (
        <div className="p-8 bg-background">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Todos os Tokens de Cor</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 text-foreground">Token</th>
                            <th className="text-left py-3 px-4 text-foreground">CSS Variable</th>
                            <th className="text-left py-3 px-4 text-foreground">Tailwind Class</th>
                            <th className="text-left py-3 px-4 text-foreground">Preview</th>
                        </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                        <tr className="border-b border-border">
                            <td className="py-3 px-4">Background</td>
                            <td className="py-3 px-4 font-mono text-xs">--background</td>
                            <td className="py-3 px-4 font-mono text-xs">bg-background</td>
                            <td className="py-3 px-4"><div className="w-8 h-8 rounded bg-background border border-border" /></td>
                        </tr>
                        <tr className="border-b border-border">
                            <td className="py-3 px-4">Foreground</td>
                            <td className="py-3 px-4 font-mono text-xs">--foreground</td>
                            <td className="py-3 px-4 font-mono text-xs">text-foreground</td>
                            <td className="py-3 px-4"><div className="w-8 h-8 rounded bg-foreground" /></td>
                        </tr>
                        <tr className="border-b border-border">
                            <td className="py-3 px-4">Primary</td>
                            <td className="py-3 px-4 font-mono text-xs">--primary</td>
                            <td className="py-3 px-4 font-mono text-xs">bg-primary</td>
                            <td className="py-3 px-4"><div className="w-8 h-8 rounded bg-primary" /></td>
                        </tr>
                        <tr className="border-b border-border">
                            <td className="py-3 px-4">Secondary</td>
                            <td className="py-3 px-4 font-mono text-xs">--secondary</td>
                            <td className="py-3 px-4 font-mono text-xs">bg-secondary</td>
                            <td className="py-3 px-4"><div className="w-8 h-8 rounded bg-secondary border border-border" /></td>
                        </tr>
                        <tr className="border-b border-border">
                            <td className="py-3 px-4">Destructive</td>
                            <td className="py-3 px-4 font-mono text-xs">--destructive</td>
                            <td className="py-3 px-4 font-mono text-xs">bg-destructive</td>
                            <td className="py-3 px-4"><div className="w-8 h-8 rounded bg-destructive" /></td>
                        </tr>
                        <tr className="border-b border-border">
                            <td className="py-3 px-4">Muted</td>
                            <td className="py-3 px-4 font-mono text-xs">--muted</td>
                            <td className="py-3 px-4 font-mono text-xs">bg-muted</td>
                            <td className="py-3 px-4"><div className="w-8 h-8 rounded bg-muted border border-border" /></td>
                        </tr>
                        <tr className="border-b border-border">
                            <td className="py-3 px-4">Accent</td>
                            <td className="py-3 px-4 font-mono text-xs">--accent</td>
                            <td className="py-3 px-4 font-mono text-xs">bg-accent</td>
                            <td className="py-3 px-4"><div className="w-8 h-8 rounded bg-accent border border-border" /></td>
                        </tr>
                        <tr className="border-b border-border">
                            <td className="py-3 px-4">Border</td>
                            <td className="py-3 px-4 font-mono text-xs">--border</td>
                            <td className="py-3 px-4 font-mono text-xs">border-border</td>
                            <td className="py-3 px-4"><div className="w-8 h-8 rounded bg-border" /></td>
                        </tr>
                        <tr className="border-b border-border">
                            <td className="py-3 px-4">Ring</td>
                            <td className="py-3 px-4 font-mono text-xs">--ring</td>
                            <td className="py-3 px-4 font-mono text-xs">ring-ring</td>
                            <td className="py-3 px-4"><div className="w-8 h-8 rounded bg-ring" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    ),
};
