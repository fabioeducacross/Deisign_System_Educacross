import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Card variants using class-variance-authority.
 */
const cardVariants = cva(
    [
        // Base styles usando tokens semânticos
        "rounded-[var(--radius-lg)] border border-[var(--divider)]",
        "bg-[var(--paper)] text-[var(--text-primary)]",
        "transition-shadow duration-200",
    ],
    {
        variants: {
            variant: {
                default: "shadow-sm",
                elevated: "shadow-md hover:shadow-lg",
                outline: "shadow-none border-[var(--outline-border)]",
                interactive:
                    "shadow-sm hover:shadow-md cursor-pointer hover:border-[var(--color-primary-500)]",
            },
            padding: {
                none: "",
                sm: "p-[var(--padding-4)]",
                default: "p-[var(--padding-6)]",
                lg: "p-[var(--padding-8)]",
            },
        },
        defaultVariants: {
            variant: "default",
            padding: "default",
        },
    }
);

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

/**
 * Card component - a container for grouping related content.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description here</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content goes here</CardContent>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, padding, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(cardVariants({ variant, padding, className }))}
            {...props}
        />
    )
);
Card.displayName = "Card";

/**
 * CardHeader - contains title and description.
 */
const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col gap-[var(--gap-2)] p-[var(--card-header)]", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

/**
 * CardTitle - the main title of the card.
 */
const CardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight text-[var(--text-primary)]",
            className
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

/**
 * CardDescription - secondary text below the title.
 */
const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-[var(--text-secondary)]", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

/**
 * CardContent - main content area of the card.
 */
const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-[var(--card-padding)] pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * CardFooter - actions or secondary information.
 */
const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-[var(--card-footer)] pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    cardVariants,
};
