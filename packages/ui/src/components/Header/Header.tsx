import * as React from "react";
import { Menu } from "react-feather";
import { cn } from "../../utils";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { Button } from "../Button";

/**
 * HeaderProps - propriedades do componente Header.
 */
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Nome do usuário exibido no header.
     */
    userName?: string;
    /**
     * Role/cargo do usuário.
     */
    userRole?: string;
    /**
     * URL da imagem do avatar.
     */
    avatarSrc?: string;
    /**
     * Fallback para o avatar (iniciais).
     */
    avatarFallback?: string;
    /**
     * Callback quando o menu hamburger é clicado.
     */
    onMenuClick?: () => void;
    /**
     * Callback quando o perfil é clicado.
     */
    onProfileClick?: () => void;
    /**
     * Se o header tem sombra.
     * @default true
     */
    shadow?: boolean;
}

/**
 * Header - componente de cabeçalho da aplicação Educacross.
 *
 * @example
 * ```tsx
 * <Header
 *   userName="Afonso"
 *   userRole="Gestor de Redes"
 *   avatarSrc="/avatar.jpg"
 *   avatarFallback="AF"
 *   onMenuClick={() => console.log("Menu clicked")}
 * />
 * ```
 */
export const Header = React.forwardRef<HTMLElement, HeaderProps>(
    (
        {
            userName,
            userRole,
            avatarSrc,
            avatarFallback,
            onMenuClick,
            onProfileClick,
            shadow = true,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <header
                ref={ref}
                className={cn(
                    "flex items-center justify-between",
                    "h-16 px-4 md:px-6",
                    "bg-white border-b border-border",
                    shadow && "shadow-sm",
                    className
                )}
                {...props}
            >
                {/* Menu Hamburger */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    aria-label="Abrir menu"
                    className="text-[#7C3AED] hover:bg-[#7C3AED]/10"
                >
                    <Menu className="h-6 w-6" />
                </Button>

                {/* Logo Educacross */}
                <div className="flex items-center gap-1">
                    {/* Ícone dos óculos */}
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <circle cx="10" cy="16" r="5" fill="#1F2937" />
                        <circle cx="22" cy="16" r="5" fill="#1F2937" />
                        <path
                            d="M15 16 h2"
                            stroke="#1F2937"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M5 16 h2 M25 16 h2"
                            stroke="#1F2937"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                    {/* Texto Logo */}
                    <span className="text-xl font-bold tracking-tight">
                        <span className="text-[#1F2937]">educa</span>
                        <span className="text-[#DC2626]">cross</span>
                    </span>
                </div>

                {/* User Profile */}
                <button
                    onClick={onProfileClick}
                    className={cn(
                        "flex items-center gap-3",
                        "rounded-lg p-2",
                        "transition-colors",
                        "hover:bg-accent",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    )}
                    aria-label={`Perfil de ${userName}`}
                >
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-[#374151] leading-tight">
                            {userName}
                        </p>
                        <p className="text-xs text-[#7C3AED] font-medium leading-tight">
                            {userRole}
                        </p>
                    </div>
                    <Avatar size="lg" className="border-2 border-[#06B6D4]">
                        <AvatarImage src={avatarSrc} alt={userName} />
                        <AvatarFallback className="bg-[#06B6D4] text-white font-semibold">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </header>
        );
    }
);

Header.displayName = "Header";
