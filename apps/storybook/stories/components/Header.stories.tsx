import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@educacross/ui";

const meta = {
    title: "Layout/Header",
    component: Header,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        userName: {
            control: "text",
            description: "Nome do usuário exibido no header",
        },
        userRole: {
            control: "text",
            description: "Role/cargo do usuário",
        },
        avatarSrc: {
            control: "text",
            description: "URL da imagem do avatar",
        },
        avatarFallback: {
            control: "text",
            description: "Fallback do avatar (iniciais)",
        },
        shadow: {
            control: "boolean",
            description: "Se o header tem sombra",
        },
        onMenuClick: { action: "menu clicked" },
        onProfileClick: { action: "profile clicked" },
    },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Header padrão com perfil de Gestor de Redes.
 */
export const Default: Story = {
    args: {
        userName: "Afonso",
        userRole: "Gestor de Redes",
        avatarFallback: "AF",
        shadow: true,
    },
};

/**
 * Header com avatar personalizado.
 */
export const WithAvatar: Story = {
    args: {
        userName: "Maria Silva",
        userRole: "Coordenadora Pedagógica",
        avatarSrc: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        avatarFallback: "MS",
        shadow: true,
    },
};

/**
 * Header com nome longo para testar truncamento.
 */
export const WithLongName: Story = {
    args: {
        userName: "João Pedro da Silva Santos",
        userRole: "Diretor Regional de Educação",
        avatarFallback: "JP",
        shadow: true,
    },
};

/**
 * Header sem sombra.
 */
export const NoShadow: Story = {
    args: {
        userName: "Carlos",
        userRole: "Administrador",
        avatarFallback: "CA",
        shadow: false,
    },
};

/**
 * Header em contexto de aplicação completa.
 */
export const InContext: Story = {
    args: {
        userName: "Ana Paula",
        userRole: "Gestor de Redes",
        avatarFallback: "AP",
    },
    render: (args) => (
        <div className="min-h-screen bg-background">
            <Header {...args} />
            <main className="p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <p className="text-muted-foreground">
                    Conteúdo da aplicação aqui...
                </p>
            </main>
        </div>
    ),
};

/**
 * Variações de roles.
 */
export const DifferentRoles: Story = {
    render: () => (
        <div className="space-y-px">
            <Header
                userName="Afonso"
                userRole="Gestor de Redes"
                avatarFallback="AF"
            />
            <Header
                userName="Beatriz"
                userRole="Coordenadora Pedagógica"
                avatarFallback="BE"
            />
            <Header
                userName="Carlos"
                userRole="Professor"
                avatarFallback="CA"
            />
            <Header
                userName="Diana"
                userRole="Administrador do Sistema"
                avatarFallback="DI"
            />
        </div>
    ),
};
