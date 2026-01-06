import * as React from "react";
import { cn } from "../../utils";
import { avatarDataUrl } from "./avatar-data";

export interface AvatarIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * Tamanho do ícone.
     * @default "default"
     */
    size?: "sm" | "default" | "lg";
}

const iconSizes = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12",
};

/**
 * AvatarIcon - ícone padrão Educacross para usar em avatares.
 * 
 * Usa o ícone SVG original do Figma com a imagem do avatar Educacross
 * embutida como data URL base64 para garantir renderização correta.
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarIcon size="lg" />
 * </Avatar>
 * ```
 */
export const AvatarIcon = React.forwardRef<HTMLImageElement, AvatarIconProps>(
    ({ size = "default", className, ...props }, ref) => {
        return (
            <img
                ref={ref}
                src={avatarDataUrl}
                alt="Avatar Educacross"
                className={cn(iconSizes[size], "object-contain", className)}
                {...props}
            />
        );
    }
);

AvatarIcon.displayName = "AvatarIcon";
