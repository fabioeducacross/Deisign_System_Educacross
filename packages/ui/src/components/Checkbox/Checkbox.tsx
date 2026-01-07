import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Checkbox variants using class-variance-authority.
 */
const checkboxVariants = cva(
    [
        "peer h-4 w-4 shrink-0 rounded-sm border-2",
        "ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors duration-200",
        "cursor-pointer",
    ],
    {
        variants: {
            size: {
                sm: "h-3.5 w-3.5",
                default: "h-4 w-4",
                lg: "h-5 w-5",
            },
            variant: {
                default: "border-[#6E63E8] data-[state=checked]:bg-[#6E63E8] data-[state=checked]:text-white data-[state=checked]:border-[#6E63E8]",
                error: "border-[#EA5455] data-[state=checked]:bg-[#EA5455] data-[state=checked]:text-white data-[state=checked]:border-[#EA5455]",
            },
        },
        defaultVariants: {
            size: "default",
            variant: "default",
        },
    }
);

/**
 * Checkmark icon for checked state.
 */
function CheckIcon({ className }: { className?: string }) {
    return (
        <svg
            className={cn("h-3 w-3", className)}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

export interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof checkboxVariants> {
    /**
     * Label text to display next to the checkbox.
     */
    label?: string;
    /**
     * Description text below the label.
     */
    description?: string;
    /**
     * Error message to display.
     */
    error?: string;
}

/**
 * Checkbox component - a control for selecting one or more options.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" />
 * <Checkbox label="Subscribe" description="Get email updates" />
 * <Checkbox checked disabled label="Selected & Disabled" />
 * ```
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            className,
            size,
            variant,
            label,
            description,
            error,
            id,
            checked,
            defaultChecked,
            ...props
        },
        ref
    ) => {
        const [isChecked, setIsChecked] = React.useState(
            defaultChecked ?? false
        );
        const controlledChecked = checked !== undefined ? checked : isChecked;
        const generatedId = React.useId();
        const checkboxId = id ?? generatedId;
        const descriptionId = description ? `${checkboxId}-description` : undefined;
        const errorId = error ? `${checkboxId}-error` : undefined;

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (checked === undefined) {
                setIsChecked(event.target.checked);
            }
            props.onChange?.(event);
        };

        return (
            <div className="flex items-start space-x-3">
                <div className="relative flex items-center justify-center">
                    <input
                        type="checkbox"
                        ref={ref}
                        id={checkboxId}
                        checked={controlledChecked}
                        onChange={handleChange}
                        className={cn(
                            checkboxVariants({ size, variant: error ? "error" : variant }),
                            "appearance-none",
                            className
                        )}
                        data-state={controlledChecked ? "checked" : "unchecked"}
                        aria-describedby={
                            [descriptionId, errorId].filter(Boolean).join(" ") ||
                            undefined
                        }
                        aria-invalid={error ? true : undefined}
                        {...props}
                    />
                    {controlledChecked && (
                        <CheckIcon className="pointer-events-none absolute text-primary-foreground" />
                    )}
                </div>
                {(label || description || error) && (
                    <div className="flex flex-col">
                        {label && (
                            <label
                                htmlFor={checkboxId}
                                className={cn(
                                    "text-sm font-medium leading-none cursor-pointer",
                                    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                    error && "text-destructive"
                                )}
                            >
                                {label}
                            </label>
                        )}
                        {description && (
                            <p
                                id={descriptionId}
                                className="text-sm text-muted-foreground mt-1"
                            >
                                {description}
                            </p>
                        )}
                        {error && (
                            <p
                                id={errorId}
                                className="text-sm text-destructive mt-1"
                                role="alert"
                            >
                                {error}
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }
);
Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
