import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Card variants using class-variance-authority.
 */
const cardVariants = cva(
    [
        "rounded-lg border bg-card text-card-foreground",
        "transition-shadow duration-200",
    ],
    {
        variants: {
            variant: {
                default: "shadow-sm",
                elevated: "shadow-md hover:shadow-lg",
                outline: "shadow-none",
                interactive:
                    "shadow-sm hover:shadow-md cursor-pointer hover:border-primary/50",
            },
            padding: {
                none: "",
                sm: "p-4",
                default: "p-6",
                lg: "p-8",
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
        className={cn("flex flex-col space-y-1.5 p-6", className)}
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
            "text-2xl font-semibold leading-none tracking-tight",
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
        className={cn("text-sm text-muted-foreground", className)}
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
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
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
        className={cn("flex items-center p-6 pt-0", className)}
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
