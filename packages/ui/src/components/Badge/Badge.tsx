import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Badge variants using class-variance-authority.
 */
const badgeVariants = cva(
    [
        "inline-flex items-center rounded-full border px-2.5 py-0.5",
        "text-xs font-semibold",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    ],
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-[#6E63E8] text-white hover:bg-[#6E63E8]/80",
                secondary:
                    "border-transparent bg-[#82868B] text-white hover:bg-[#82868B]/80",
                destructive:
                    "border-transparent bg-[#EA5455] text-white hover:bg-[#EA5455]/80",
                outline: "text-foreground",
                success:
                    "border-transparent bg-[#28C76F] text-white hover:bg-[#28C76F]/80",
                warning:
                    "border-transparent bg-[#FF9F43] text-white hover:bg-[#FF9F43]/80",
                info:
                    "border-transparent bg-[#00CFE8] text-white hover:bg-[#00CFE8]/80",
                // Variantes "soft" com fundo claro e texto colorido
                softPrimary:
                    "border-transparent bg-[#6E63E8]/10 text-[#6E63E8] hover:bg-[#6E63E8]/20",
                softSecondary:
                    "border-transparent bg-[#82868B]/10 text-[#82868B] hover:bg-[#82868B]/20",
                softDestructive:
                    "border-transparent bg-[#EA5455]/10 text-[#EA5455] hover:bg-[#EA5455]/20",
                softSuccess:
                    "border-transparent bg-[#28C76F]/10 text-[#28C76F] hover:bg-[#28C76F]/20",
                softWarning:
                    "border-transparent bg-[#FF9F43]/10 text-[#FF9F43] hover:bg-[#FF9F43]/20",
                softInfo:
                    "border-transparent bg-[#00CFE8]/10 text-[#00CFE8] hover:bg-[#00CFE8]/20",
            },
            size: {
                default: "px-2.5 py-0.5 text-xs",
                sm: "px-2 py-0.5 text-[10px]",
                lg: "px-3 py-1 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

/**
 * Badge component - displays a small status indicator or label.
 *
 * @example
 * ```tsx
 * <Badge>New</Badge>
 * <Badge variant="secondary">Draft</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="success">Active</Badge>
 * ```
 */
function Badge({ className, variant, size, ...props }: BadgeProps) {
    return (
        <div
            className={cn(badgeVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export { Badge, badgeVariants };
