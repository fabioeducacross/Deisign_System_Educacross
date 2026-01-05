import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Input variants using class-variance-authority.
 * All visual values reference design tokens - no magic values.
 */
const inputVariants = cva(
    [
        // Base styles
        "flex w-full rounded-md border bg-background px-3 py-2",
        "text-base text-foreground",
        "ring-offset-background",
        // Placeholder
        "placeholder:text-muted-foreground",
        // Focus styles (a11y)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        // Disabled styles
        "disabled:cursor-not-allowed disabled:opacity-50",
        // File input styles
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Transition
        "transition-colors duration-200",
        // Mobile text size (prevents zoom on iOS)
        "md:text-sm",
    ],
    {
        variants: {
            variant: {
                default: "border-input",
                error: "border-destructive focus-visible:ring-destructive",
            },
            inputSize: {
                default: "h-10",
                sm: "h-9 text-sm",
                lg: "h-11 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            inputSize: "default",
        },
    }
);

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
    /**
     * If true, applies error styling to the input.
     */
    error?: boolean;
    /**
     * Size variant for the input.
     * Named inputSize to avoid conflict with HTML size attribute.
     */
    inputSize?: "default" | "sm" | "lg";
}

/**
 * Input component with variants and states.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter your email" />
 * <Input variant="error" error aria-invalid="true" />
 * <Input inputSize="lg" />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", variant, inputSize, error, "aria-invalid": ariaInvalid, ...props }, ref) => {
        // If error prop is true, use error variant
        const computedVariant = error ? "error" : variant;
        // Set aria-invalid based on error prop or explicit aria-invalid
        const computedAriaInvalid = ariaInvalid ?? error;

        return (
            <input
                type={type}
                className={cn(inputVariants({ variant: computedVariant, inputSize, className }))}
                ref={ref}
                aria-invalid={computedAriaInvalid}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input, inputVariants };
