import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorPalette } from "../../src/components";

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

## Copiar Tokens

Clique em qualquer cor abaixo para copiar o nome do token CSS para a área de transferência.

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
            <h2 className="text-2xl font-bold mb-6 text-foreground">Paleta de Cores Completa</h2>
            <p className="text-muted-foreground mb-8">
                Clique em qualquer cor para copiar o token CSS.
            </p>

            <ColorPalette
                title="Cores Primárias"
                columns={4}
                colors={[
                    { name: "Primary", value: "#7367F0", token: "var(--primary)" },
                    { name: "Primary Foreground", value: "#FFFFFF", token: "var(--primary-foreground)" },
                    { name: "Secondary", value: "#808390", token: "var(--secondary)" },
                    { name: "Secondary Foreground", value: "#FFFFFF", token: "var(--secondary-foreground)" },
                ]}
            />

            <ColorPalette
                title="Cores de Estado"
                columns={4}
                colors={[
                    { name: "Destructive", value: "#FF4B50", token: "var(--destructive)" },
                    { name: "Destructive Foreground", value: "#FFFFFF", token: "var(--destructive-foreground)" },
                    { name: "Success", value: "#28C76F", token: "var(--success)" },
                    { name: "Success Foreground", value: "#FFFFFF", token: "var(--success-foreground)" },
                ]}
            />

            <ColorPalette
                title="Cores de Superfície"
                columns={5}
                colors={[
                    { name: "Background", value: "#FFFFFF", token: "var(--background)" },
                    { name: "Foreground", value: "#1F2937", token: "var(--foreground)" },
                    { name: "Card", value: "#FFFFFF", token: "var(--card)" },
                    { name: "Card Foreground", value: "#1F2937", token: "var(--card-foreground)" },
                    { name: "Popover", value: "#FFFFFF", token: "var(--popover)" },
                ]}
            />

            <ColorPalette
                title="Cores Neutras"
                columns={5}
                colors={[
                    { name: "Muted", value: "#F5F5F7", token: "var(--muted)" },
                    { name: "Muted Foreground", value: "#6B7280", token: "var(--muted-foreground)" },
                    { name: "Accent", value: "#F5F5F7", token: "var(--accent)" },
                    { name: "Accent Foreground", value: "#1F2937", token: "var(--accent-foreground)" },
                    { name: "Border", value: "#E1E1E8", token: "var(--border)" },
                ]}
            />
        </div>
    ),
};
