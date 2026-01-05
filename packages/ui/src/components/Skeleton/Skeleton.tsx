import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Skeleton variants.
 */
const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
    variants: {
        variant: {
            default: "bg-muted",
            primary: "bg-primary/20",
            card: "bg-muted border",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface SkeletonProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> { }

/**
 * Skeleton component - loading placeholder.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-12 w-12 rounded-full" />
 * <Skeleton className="h-4 w-[250px]" />
 * ```
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(skeletonVariants({ variant }), className)}
            {...props}
        />
    )
);
Skeleton.displayName = "Skeleton";

export interface SkeletonTextProps extends SkeletonProps {
    /**
     * Number of text lines to display.
     */
    lines?: number;
    /**
     * Width of the last line (for text variation).
     */
    lastLineWidth?: string;
}

/**
 * SkeletonText - multiple lines of skeleton text.
 */
const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
    ({ className, lines = 3, lastLineWidth = "60%", variant, ...props }, ref) => (
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    variant={variant}
                    className="h-4"
                    style={{
                        width: i === lines - 1 ? lastLineWidth : "100%",
                    }}
                />
            ))}
        </div>
    )
);
SkeletonText.displayName = "SkeletonText";

export interface SkeletonCircleProps extends SkeletonProps {
    /**
     * Size of the circle.
     */
    size?: "sm" | "md" | "lg" | "xl";
}

const circleSizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
};

/**
 * SkeletonCircle - circular skeleton for avatars.
 */
const SkeletonCircle = React.forwardRef<HTMLDivElement, SkeletonCircleProps>(
    ({ className, size = "md", variant, ...props }, ref) => (
        <Skeleton
            ref={ref}
            variant={variant}
            className={cn("rounded-full", circleSizes[size], className)}
            {...props}
        />
    )
);
SkeletonCircle.displayName = "SkeletonCircle";

/**
 * SkeletonCard - card-shaped skeleton.
 */
const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, variant, ...props }, ref) => (
        <div ref={ref} className={cn("space-y-3", className)} {...props}>
            <Skeleton variant={variant} className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton variant={variant} className="h-4 w-[250px]" />
                <Skeleton variant={variant} className="h-4 w-[200px]" />
            </div>
        </div>
    )
);
SkeletonCard.displayName = "SkeletonCard";

/**
 * SkeletonAvatar - avatar with text skeleton.
 */
const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, variant, ...props }, ref) => (
        <div ref={ref} className={cn("flex items-center space-x-4", className)} {...props}>
            <SkeletonCircle variant={variant} size="md" />
            <div className="space-y-2">
                <Skeleton variant={variant} className="h-4 w-[150px]" />
                <Skeleton variant={variant} className="h-3 w-[100px]" />
            </div>
        </div>
    )
);
SkeletonAvatar.displayName = "SkeletonAvatar";

/**
 * SkeletonTable - table skeleton with rows.
 */
const SkeletonTable = React.forwardRef<
    HTMLDivElement,
    SkeletonProps & { rows?: number; columns?: number }
>(({ className, rows = 5, columns = 4, variant, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {/* Header */}
        <div className="flex gap-4">
            {Array.from({ length: columns }).map((_, i) => (
                <Skeleton key={i} variant={variant} className="h-8 flex-1" />
            ))}
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-4">
                {Array.from({ length: columns }).map((_, colIndex) => (
                    <Skeleton key={colIndex} variant={variant} className="h-6 flex-1" />
                ))}
            </div>
        ))}
    </div>
));
SkeletonTable.displayName = "SkeletonTable";

export {
    Skeleton,
    SkeletonText,
    SkeletonCircle,
    SkeletonCard,
    SkeletonAvatar,
    SkeletonTable,
    skeletonVariants,
};
