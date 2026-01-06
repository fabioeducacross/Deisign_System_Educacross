import * as React from "react";
import { cn } from "../../utils";
import educacrossIcon from "../../assets/Icons/educacross-icon.svg";

export interface AvatarIconProps
    extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * Tamanho do ícone.
     * @default "default"
     */
    size?: "sm" | "default" | "lg";
}

const iconSizes = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
};

/**
 * AvatarIcon - ícone padrão Educacross para usar em avatares.
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
                src={educacrossIcon}
                alt="Avatar Educacross"
                className={cn(
                    iconSizes[size],
                    "object-contain",
                    className
                )}
                {...props}
            />
        );
    }
);

AvatarIcon.displayName = "AvatarIcon";
