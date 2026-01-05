import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Toast variants using class-variance-authority.
 */
const toastVariants = cva(
    [
        "group pointer-events-auto relative flex w-full items-center justify-between",
        "space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg",
        "transition-all duration-300",
        "data-[swipe=cancel]:translate-x-0",
        "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
        "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
        "data-[swipe=move]:transition-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-80",
        "data-[state=closed]:slide-out-to-right-full",
        "data-[state=open]:slide-in-from-top-full",
        "data-[state=open]:sm:slide-in-from-bottom-full",
    ],
    {
        variants: {
            variant: {
                default: "border bg-background text-foreground",
                destructive:
                    "destructive group border-destructive bg-destructive text-destructive-foreground",
                success:
                    "border-green-500 bg-green-500 text-white",
                warning:
                    "border-yellow-500 bg-yellow-500 text-white",
                info:
                    "border-blue-500 bg-blue-500 text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

/**
 * Close icon for toast.
 */
function CloseIcon({ className }: { className?: string }) {
    return (
        <svg
            className={cn("h-4 w-4", className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

export interface ToastProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
    /**
     * Whether the toast is visible.
     */
    open?: boolean;
    /**
     * Callback when the toast is closed.
     */
    onClose?: () => void;
    /**
     * Duration in milliseconds before auto-close. Set to 0 to disable.
     */
    duration?: number;
}

/**
 * Toast component - a brief notification message.
 *
 * @example
 * ```tsx
 * <Toast open={isOpen} onClose={() => setIsOpen(false)}>
 *   <ToastTitle>Success!</ToastTitle>
 *   <ToastDescription>Your changes have been saved.</ToastDescription>
 * </Toast>
 * ```
 */
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    (
        {
            className,
            variant,
            open = true,
            onClose,
            duration = 5000,
            children,
            ...props
        },
        ref
    ) => {
        React.useEffect(() => {
            if (open && duration > 0) {
                const timer = setTimeout(() => {
                    onClose?.();
                }, duration);
                return () => clearTimeout(timer);
            }
        }, [open, duration, onClose]);

        if (!open) {
            return null;
        }

        return (
            <div
                ref={ref}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                data-state={open ? "open" : "closed"}
                className={cn(toastVariants({ variant }), className)}
                {...props}
            >
                <div className="flex-1">{children}</div>
                {onClose && (
                    <button
                        type="button"
                        className={cn(
                            "absolute right-2 top-2 rounded-md p-1",
                            "opacity-0 transition-opacity",
                            "hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2",
                            "group-hover:opacity-100",
                            "group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50",
                            "group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600"
                        )}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <CloseIcon />
                    </button>
                )}
            </div>
        );
    }
);
Toast.displayName = "Toast";

/**
 * ToastTitle - the title of the toast.
 */
const ToastTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm font-semibold", className)}
        {...props}
    />
));
ToastTitle.displayName = "ToastTitle";

/**
 * ToastDescription - the description of the toast.
 */
const ToastDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = "ToastDescription";

/**
 * ToastAction - an action button in the toast.
 */
const ToastAction = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className={cn(
            "inline-flex h-8 shrink-0 items-center justify-center rounded-md border",
            "bg-transparent px-3 text-sm font-medium",
            "ring-offset-background transition-colors",
            "hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            "group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30",
            "group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground",
            "group-[.destructive]:focus:ring-destructive",
            className
        )}
        {...props}
    />
));
ToastAction.displayName = "ToastAction";

/**
 * ToastViewport - container for positioning toasts.
 */
const ToastViewport = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4",
            "sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
            className
        )}
        {...props}
    />
));
ToastViewport.displayName = "ToastViewport";

export {
    Toast,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastViewport,
    toastVariants,
};
