import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with proper precedence.
 * Combines clsx for conditional classes with tailwind-merge to handle conflicts.
 *
 * @example
 * ```tsx
 * cn("px-4 py-2", condition && "bg-primary", className)
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
