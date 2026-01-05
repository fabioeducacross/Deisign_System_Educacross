import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Label variants using class-variance-authority.
 * All visual values reference design tokens - no magic values.
 */
const labelVariants = cva(
    [
        // Base styles
        "text-sm font-medium leading-none",
        // Disabled state (when associated input is disabled)
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    ],
    {
        variants: {
            variant: {
                default: "text-foreground",
                error: "text-destructive",
                muted: "text-muted-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface LabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
    /**
     * If true, shows a required indicator (*).
     */
    required?: boolean;
}

/**
 * Label component for form inputs.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Label htmlFor="password" required>Password</Label>
 * <Label variant="error">Invalid field</Label>
 * ```
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, variant, required, children, ...props }, ref) => {
        return (
            <label ref={ref} className={cn(labelVariants({ variant, className }))} {...props}>
                {children}
                {required && (
                    <span className="ml-1 text-destructive" aria-hidden="true">
                        *
                    </span>
                )}
            </label>
        );
    }
);
Label.displayName = "Label";

export { Label, labelVariants };
