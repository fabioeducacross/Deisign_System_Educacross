import * as React from "react";
import { cn } from "../../utils";

export interface AvatarIconProps
    extends React.HTMLAttributes<HTMLDivElement> {
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
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarIcon size="lg" />
 * </Avatar>
 * ```
 */
export const AvatarIcon = React.forwardRef<HTMLDivElement, AvatarIconProps>(
    ({ size = "default", className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    iconSizes[size],
                    "flex items-center justify-center",
                    className
                )}
                {...props}
            >
                <svg
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    <circle cx="21" cy="21" r="21" fill="#00CFE8"/>
                    <g transform="translate(10, 11.5)">
                        <circle cx="11" cy="7" r="3" fill="white"/>
                        <path d="M11 12C7 12 4 14 4 17H18C18 14 15 12 11 12Z" fill="white"/>
                        <ellipse cx="8" cy="6.5" rx="1.5" ry="2" fill="#00CFE8"/>
                        <ellipse cx="14" cy="6.5" rx="1.5" ry="2" fill="#00CFE8"/>
                    </g>
                </svg>
            </div>
        );
    }
);

AvatarIcon.displayName = "AvatarIcon";
