import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenShowcase } from "../../src/components";

const meta: Meta = {
    title: "Foundations/Typography",
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: `
# Tipografia

O sistema tipográfico do Educacross Design System é baseado na fonte **Montserrat**.

## Uso

\`\`\`tsx
// Tailwind classes
<h1 className="text-4xl font-bold">Heading 1</h1>
<p className="text-base">Body text</p>
<span className="text-sm text-muted-foreground">Caption</span>
\`\`\`

## Escala Tipográfica

Usamos a escala padrão do Tailwind com ajustes para line-height otimizado.

## Pesos Disponíveis

Montserrat está configurada com os seguintes pesos:
- **Light (300)**: Para textos grandes ou com ênfase suave
- **Regular (400)**: Peso padrão para corpo de texto
- **Medium (500)**: Para destaque moderado
- **Semibold (600)**: Para subtítulos e elementos de interface
- **Bold (700)**: Para títulos e ênfase forte

## Copiar Tokens

Clique em qualquer token abaixo para copiar o nome da classe para a área de transferência.
        `,
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

interface TypeSampleProps {
    name: string;
    className: string;
    size: string;
    lineHeight: string;
}

function TypeSample({ name, className, size, lineHeight }: TypeSampleProps) {
    return (
        <div className="border-b border-border pb-6">
            <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">{name}</span>
                <span className="text-xs font-mono text-muted-foreground">
                    {size} / {lineHeight}
                </span>
            </div>
            <p className={className}>
                The quick brown fox jumps over the lazy dog
            </p>
        </div>
    );
}

export const Scale: Story = {
    render: () => (
        <div className="p-8 bg-background space-y-6">
            <TokenShowcase
                title="Escala Tipográfica"
                category="typography"
                tokens={[
                    { name: "Heading 1", value: "2.25rem", token: "text-4xl" },
                    { name: "Heading 2", value: "1.875rem", token: "text-3xl" },
                    { name: "Heading 3", value: "1.5rem", token: "text-2xl" },
                    { name: "Heading 4", value: "1.25rem", token: "text-xl" },
                    { name: "Heading 5", value: "1.125rem", token: "text-lg" },
                    { name: "Body Large", value: "1.125rem", token: "text-lg" },
                    { name: "Body", value: "1rem", token: "text-base" },
                    { name: "Small", value: "0.875rem", token: "text-sm" },
                    { name: "Extra Small", value: "0.75rem", token: "text-xs" },
                ]}
            />
        </div>
    ),
};

export const FontWeights: Story = {
    render: () => (
        <div className="p-8 bg-background space-y-4">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Pesos de Fonte - Montserrat</h2>

            <p className="text-xl font-light text-foreground">Light (300) - The quick brown fox jumps over the lazy dog</p>
            <p className="text-xl font-normal text-foreground">Regular (400) - The quick brown fox jumps over the lazy dog</p>
            <p className="text-xl font-medium text-foreground">Medium (500) - The quick brown fox jumps over the lazy dog</p>
            <p className="text-xl font-semibold text-foreground">Semibold (600) - The quick brown fox jumps over the lazy dog</p>
            <p className="text-xl font-bold text-foreground">Bold (700) - The quick brown fox jumps over the lazy dog</p>
        </div>
    ),
};

export const TextColors: Story = {
    render: () => (
        <div className="p-8 bg-background space-y-4">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Cores de Texto</h2>

            <p className="text-lg text-foreground">Foreground - Texto principal</p>
            <p className="text-lg text-muted-foreground">Muted Foreground - Texto secundário</p>
            <p className="text-lg text-primary">Primary - Links e destaque</p>
            <p className="text-lg text-destructive">Destructive - Erros e alertas</p>
        </div>
    ),
};

export const Headings: Story = {
    render: () => (
        <div className="p-8 bg-background space-y-6">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Headings</h2>

            <div className="space-y-4">
                <div>
                    <h1 className="text-4xl font-bold text-foreground">Heading 1</h1>
                    <p className="text-sm text-muted-foreground font-mono mt-1">text-4xl font-bold</p>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-foreground">Heading 2</h2>
                    <p className="text-sm text-muted-foreground font-mono mt-1">text-3xl font-bold</p>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-foreground">Heading 3</h3>
                    <p className="text-sm text-muted-foreground font-mono mt-1">text-2xl font-semibold</p>
                </div>
                <div>
                    <h4 className="text-xl font-semibold text-foreground">Heading 4</h4>
                    <p className="text-sm text-muted-foreground font-mono mt-1">text-xl font-semibold</p>
                </div>
                <div>
                    <h5 className="text-lg font-medium text-foreground">Heading 5</h5>
                    <p className="text-sm text-muted-foreground font-mono mt-1">text-lg font-medium</p>
                </div>
                <div>
                    <h6 className="text-base font-medium text-foreground">Heading 6</h6>
                    <p className="text-sm text-muted-foreground font-mono mt-1">text-base font-medium</p>
                </div>
            </div>
        </div>
    ),
};

export const BodyText: Story = {
    render: () => (
        <div className="p-8 bg-background max-w-2xl">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Texto Corpo</h2>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Lead Paragraph</h3>
                    <p className="text-lg text-muted-foreground">
                        O Educacross Design System fornece componentes consistentes e acessíveis
                        para construir interfaces de usuário modernas.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Body Text</h3>
                    <p className="text-base text-foreground">
                        Este é um parágrafo de texto padrão. Ele usa o tamanho base (1rem) com
                        line-height de 1.5 para ótima legibilidade. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Small Text</h3>
                    <p className="text-sm text-muted-foreground">
                        Texto pequeno é usado para informações secundárias, captions e notas de rodapé.
                        Mantém boa legibilidade mesmo em tamanho reduzido.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Extra Small Text</h3>
                    <p className="text-xs text-muted-foreground">
                        Texto extra pequeno para labels, badges e elementos compactos.
                    </p>
                </div>
            </div>
        </div>
    ),
};
