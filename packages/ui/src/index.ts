/**
 * @educacross/ui - Educacross Design System
 *
 * A React component library built with Tailwind CSS and Radix UI primitives.
 * Provides accessible, themeable components following the Educacross design language.
 *
 * @example
 * ```tsx
 * import { Button, Input, Label } from "@educacross/ui";
 * import "@educacross/ui/styles.css";
 *
 * function App() {
 *   return (
 *     <form>
 *       <Label htmlFor="email">Email</Label>
 *       <Input id="email" type="email" placeholder="you@example.com" />
 *       <Button type="submit">Submit</Button>
 *     </form>
 *   );
 * }
 * ```
 */

// P1 Components
export { Button, buttonVariants, type ButtonProps } from "./components/Button";
export { Input, inputVariants, type InputProps } from "./components/Input";
export { Label, labelVariants, type LabelProps } from "./components/Label";

// P2 Components
export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    cardVariants,
    type CardProps,
} from "./components/Card";

export { Badge, badgeVariants, type BadgeProps } from "./components/Badge";

export {
    Avatar,
    AvatarImage,
    AvatarFallback,
    avatarVariants,
    type AvatarProps,
    type AvatarImageProps,
    type AvatarFallbackProps,
} from "./components/Avatar";

export {
    Checkbox,
    checkboxVariants,
    type CheckboxProps,
} from "./components/Checkbox";

export {
    RadioGroup,
    Radio,
    radioVariants,
    type RadioGroupProps,
    type RadioProps,
} from "./components/Radio";

export {
    Select,
    selectVariants,
    type SelectProps,
    type SelectOption,
} from "./components/Select";

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    dialogContentVariants,
    dialogOverlayVariants,
    type DialogProps,
    type DialogTriggerProps,
    type DialogContentProps,
} from "./components/Dialog";

export {
    Alert,
    AlertTitle,
    AlertDescription,
    alertVariants,
    type AlertProps,
} from "./components/Alert";

export {
    Toast,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastViewport,
    toastVariants,
    type ToastProps,
} from "./components/Toast";

// Utilities
export { cn } from "./utils";
