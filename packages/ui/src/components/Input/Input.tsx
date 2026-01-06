import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Input variants using class-variance-authority.
 * All visual values reference design tokens - no magic values.
 */
const inputVariants = cva(
    [
        // Base styles usando tokens semânticos
        "flex w-full rounded-[var(--radius-md)] border bg-transparent",
        "px-[var(--padding-3)] py-[var(--padding-2)]",
        "text-base text-[var(--text-primary)]",
        "ring-offset-background",
        // Placeholder - usando texto secundário
        "placeholder:text-[var(--text-subtitle)]",
        // Focus styles (a11y)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
        // Disabled styles - usando tokens de ação
        "disabled:cursor-not-allowed disabled:bg-[var(--action-disabled-bg)] disabled:text-[var(--text-disabled)]",
        // File input styles
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--text-primary)]",
        // Transition
        "transition-colors duration-200",
        // Mobile text size (prevents zoom on iOS)
        "md:text-sm",
    ],
    {
        variants: {
            variant: {
                default: "border-[var(--input-border)] focus-visible:border-[var(--color-primary-500)]",
                filled: "border-transparent bg-[var(--filled-input-bg)] focus-visible:bg-transparent focus-visible:border-[var(--input-border)]",
                error: "border-[var(--color-error-500)] focus-visible:ring-[var(--color-error-500)]",
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
