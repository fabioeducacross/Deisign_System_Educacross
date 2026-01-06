import type { Meta, StoryObj } from "@storybook/react";
import { fn, expect, userEvent, within } from "@storybook/test";
import { Button } from "@educacross/ui";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: `
O **Button** é o componente principal para ações e interações do usuário.

## Características
- ✅ 9 variantes visuais (default, destructive, outline, secondary, ghost, link, success, warning, info)
- ✅ 4 tamanhos
- ✅ Estado de loading com spinner
- ✅ Suporte a \`asChild\` para composição
- ✅ Acessível: navegação por teclado, foco visível, aria-attributes
- ✅ Tokens semânticos do Figma
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "destructive", "outline", "secondary", "ghost", "link", "success", "warning", "info"],
            description: "Visual variant of the button",
        },
        size: {
            control: "select",
            options: ["default", "sm", "lg", "icon"],
            description: "Size of the button",
        },
        loading: {
            control: "boolean",
            description: "Shows loading spinner and disables button",
        },
        disabled: {
            control: "boolean",
            description: "Disables the button",
        },
        asChild: {
            control: "boolean",
            description: "Render as child element (for composition)",
        },
    },
    args: {
        onClick: fn(),
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT STORIES
// =============================================================================

export const Default: Story = {
    args: {
        children: "Button",
        variant: "default",
        size: "default",
    },
};

export const Playground: Story = {
    args: {
        children: "Playground Button",
        variant: "default",
        size: "default",
        loading: false,
        disabled: false,
    },
};

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Primary: Story = {
    args: {
        children: "Primary",
        variant: "default",
    },
};

export const Destructive: Story = {
    args: {
        children: "Delete",
        variant: "destructive",
    },
    parameters: {
        docs: {
            description: {
                story: "Use para ações destrutivas como deletar ou remover.",
            },
        },
    },
};

export const Outline: Story = {
    args: {
        children: "Outline",
        variant: "outline",
    },
};

export const Secondary: Story = {
    args: {
        children: "Secondary",
        variant: "secondary",
    },
};

export const Ghost: Story = {
    args: {
        children: "Ghost",
        variant: "ghost",
    },
};

export const Link: Story = {
    args: {
        children: "Link Button",
        variant: "link",
    },
};

export const Success: Story = {
    args: {
        children: "Sucesso",
        variant: "success",
    },
    parameters: {
        docs: {
            description: {
                story: "Use para ações de confirmação ou sucesso.",
            },
        },
    },
};

export const Warning: Story = {
    args: {
        children: "Atenção",
        variant: "warning",
    },
    parameters: {
        docs: {
            description: {
                story: "Use para ações que requerem atenção do usuário.",
            },
        },
    },
};

export const Info: Story = {
    args: {
        children: "Informação",
        variant: "info",
    },
    parameters: {
        docs: {
            description: {
                story: "Use para ações informativas ou neutras.",
            },
        },
    },
};

// =============================================================================
// SIZE STORIES
// =============================================================================

export const Small: Story = {
    args: {
        children: "Small",
        size: "sm",
    },
};

export const Large: Story = {
    args: {
        children: "Large",
        size: "lg",
    },
};

export const IconSize: Story = {
    args: {
        size: "icon",
        children: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
            </svg>
        ),
        "aria-label": "Add item",
    },
    parameters: {
        docs: {
            description: {
                story: "Use `size='icon'` para botões que contém apenas um ícone. Sempre adicione `aria-label` para acessibilidade.",
            },
        },
    },
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const Disabled: Story = {
    args: {
        children: "Disabled",
        disabled: true,
    },
};

export const Loading: Story = {
    args: {
        children: "Loading...",
        loading: true,
    },
    parameters: {
        docs: {
            description: {
                story: "O estado de loading mostra um spinner e desabilita o botão automaticamente.",
            },
        },
    },
};

// =============================================================================
// ALL VARIANTS SHOWCASE
// =============================================================================

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Todas as variantes disponíveis lado a lado.",
            },
        },
    },
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Add">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                </svg>
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Todos os tamanhos disponíveis lado a lado.",
            },
        },
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Estados: normal, disabled e loading.",
            },
        },
    },
};

// =============================================================================
// INTERACTION TESTS
// =============================================================================

export const ClickInteraction: Story = {
    args: {
        children: "Click me",
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: /click me/i });

        // Verify button is visible and enabled
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();

        // Click the button
        await userEvent.click(button);

        // Verify onClick was called
        await expect(args.onClick).toHaveBeenCalledTimes(1);
    },
};

export const DisabledInteraction: Story = {
    args: {
        children: "Cannot click",
        disabled: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: /cannot click/i });

        // Verify button is disabled
        await expect(button).toBeDisabled();
    },
};

export const LoadingInteraction: Story = {
    args: {
        children: "Loading",
        loading: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: /loading/i });

        // Verify button is disabled when loading
        await expect(button).toBeDisabled();
        await expect(button).toHaveAttribute("aria-busy", "true");
    },
};

export const KeyboardNavigation: Story = {
    args: {
        children: "Focus me",
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: /focus me/i });

        // Focus via keyboard (tab)
        await userEvent.tab();
        await expect(button).toHaveFocus();

        // Activate via keyboard (Enter)
        await userEvent.keyboard("{Enter}");
        await expect(args.onClick).toHaveBeenCalled();
    },
};
