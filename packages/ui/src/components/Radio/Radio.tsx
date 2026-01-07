import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Radio variants using class-variance-authority.
 */
const radioVariants = cva(
    [
        "peer h-4 w-4 shrink-0 rounded-full border-2",
        "ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors duration-200",
        "cursor-pointer",
        "relative",
    ],
    {
        variants: {
            size: {
                sm: "h-3.5 w-3.5",
                default: "h-4 w-4",
                lg: "h-5 w-5",
            },
            variant: {
                default: "border-[#6E63E8] data-[state=checked]:bg-[#6E63E8]",
                error: "border-[#EA5455] data-[state=checked]:bg-[#EA5455]",
            },
        },
        defaultVariants: {
            size: "default",
            variant: "default",
        },
    }
);

export interface RadioGroupProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The name attribute for the radio group.
     */
    name: string;
    /**
     * The controlled value of the radio group.
     */
    value?: string;
    /**
     * The default value when uncontrolled.
     */
    defaultValue?: string;
    /**
     * Callback when the value changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * Whether the radio group is disabled.
     */
    disabled?: boolean;
    /**
     * Error state for the radio group.
     */
    error?: boolean;
}

interface RadioGroupContextValue {
    name: string;
    value?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    error?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
    null
);

/**
 * RadioGroup component - container for Radio items.
 *
 * @example
 * ```tsx
 * <RadioGroup name="plan" defaultValue="basic">
 *   <Radio value="basic" label="Basic" />
 *   <Radio value="pro" label="Pro" />
 *   <Radio value="enterprise" label="Enterprise" />
 * </RadioGroup>
 * ```
 */
const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
    (
        {
            className,
            name,
            value,
            defaultValue,
            onValueChange,
            disabled,
            error,
            children,
            ...props
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = React.useState(defaultValue);
        const controlledValue = value !== undefined ? value : internalValue;

        const handleValueChange = React.useCallback(
            (newValue: string) => {
                if (value === undefined) {
                    setInternalValue(newValue);
                }
                onValueChange?.(newValue);
            },
            [value, onValueChange]
        );

        return (
            <RadioGroupContext.Provider
                value={{
                    name,
                    value: controlledValue,
                    onValueChange: handleValueChange,
                    disabled,
                    error,
                }}
            >
                <div
                    ref={ref}
                    role="radiogroup"
                    className={cn("flex flex-col gap-2", className)}
                    {...props}
                >
                    {children}
                </div>
            </RadioGroupContext.Provider>
        );
    }
);
RadioGroup.displayName = "RadioGroup";

export interface RadioProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof radioVariants> {
    /**
     * The value of the radio item.
     */
    value: string;
    /**
     * Label text to display next to the radio.
     */
    label?: string;
    /**
     * Description text below the label.
     */
    description?: string;
}

/**
 * Radio component - a single radio option within a RadioGroup.
 */
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    ({ className, size, variant, value, label, description, id, ...props }, ref) => {
        const context = React.useContext(RadioGroupContext);
        const generatedId = React.useId();
        const radioId = id ?? generatedId;
        const descriptionId = description ? `${radioId}-description` : undefined;
        const isChecked = context?.value === value;
        const isDisabled = props.disabled ?? context?.disabled;
        const hasError = context?.error;

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                context?.onValueChange?.(value);
            }
            props.onChange?.(event);
        };

        return (
            <div className="flex items-start space-x-3">
                <div className="relative flex items-center justify-center">
                    <input
                        type="radio"
                        ref={ref}
                        id={radioId}
                        name={context?.name}
                        value={value}
                        checked={isChecked}
                        onChange={handleChange}
                        disabled={isDisabled}
                        className={cn(
                            radioVariants({
                                size,
                                variant: hasError ? "error" : variant,
                            }),
                            "appearance-none",
                            className
                        )}
                        data-state={isChecked ? "checked" : "unchecked"}
                        aria-describedby={descriptionId}
                        {...props}
                    />
                    {isChecked && (
                        <span
                            className={cn(
                                "pointer-events-none absolute h-2 w-2 rounded-full bg-primary",
                                size === "sm" && "h-1.5 w-1.5",
                                size === "lg" && "h-2.5 w-2.5",
                                hasError && "bg-destructive"
                            )}
                            aria-hidden="true"
                        />
                    )}
                </div>
                {(label || description) && (
                    <div className="flex flex-col">
                        {label && (
                            <label
                                htmlFor={radioId}
                                className={cn(
                                    "text-sm font-medium leading-none cursor-pointer",
                                    isDisabled && "cursor-not-allowed opacity-70",
                                    hasError && "text-destructive"
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
                    </div>
                )}
            </div>
        );
    }
);
Radio.displayName = "Radio";

export { RadioGroup, Radio, radioVariants };
