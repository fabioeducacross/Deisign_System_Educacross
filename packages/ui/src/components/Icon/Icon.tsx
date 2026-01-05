import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as FeatherIcons from "react-feather";
import { cn } from "../../utils";

/**
 * Icon size variants.
 */
const iconVariants = cva("inline-block flex-shrink-0", {
    variants: {
        size: {
            xs: "h-3 w-3",
            sm: "h-4 w-4",
            default: "h-5 w-5",
            md: "h-6 w-6",
            lg: "h-8 w-8",
            xl: "h-10 w-10",
            "2xl": "h-12 w-12",
        },
        variant: {
            default: "text-current",
            muted: "text-muted-foreground",
            primary: "text-primary",
            secondary: "text-secondary",
            destructive: "text-destructive",
            success: "text-success",
            warning: "text-warning",
        },
    },
    defaultVariants: {
        size: "default",
        variant: "default",
    },
});

/**
 * All available Feather icon names.
 */
export type IconName = keyof typeof FeatherIcons;

/**
 * Get all available icon names for documentation.
 */
export const iconNames = Object.keys(FeatherIcons).filter(
    (key) => key !== "default"
) as IconName[];

export interface IconProps
    extends Omit<React.SVGAttributes<SVGElement>, "ref">,
    VariantProps<typeof iconVariants> {
    /**
     * The name of the Feather icon to render.
     */
    name: IconName;
    /**
     * Custom size in pixels (overrides size variant).
     */
    pixelSize?: number;
    /**
     * Stroke width for the icon.
     * @default 2
     */
    strokeWidth?: number;
}

/**
 * Icon component - wrapper for Feather Icons.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Icon name="Check" />
 *
 * // With size variant
 * <Icon name="AlertCircle" size="lg" />
 *
 * // With color variant
 * <Icon name="Heart" variant="destructive" />
 *
 * // With custom pixel size
 * <Icon name="Star" pixelSize={32} />
 *
 * // With custom stroke width
 * <Icon name="User" strokeWidth={1.5} />
 * ```
 */
const Icon: React.FC<IconProps> = ({
    name,
    className,
    size,
    variant,
    pixelSize,
    strokeWidth = 2,
    ...props
}) => {
    const IconComponent = FeatherIcons[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in Feather Icons`);
        return null;
    }

    const sizeProps = pixelSize
        ? { width: pixelSize, height: pixelSize }
        : {};

    return (
        <IconComponent
            className={cn(iconVariants({ size, variant }), className)}
            strokeWidth={strokeWidth}
            {...sizeProps}
            {...props}
        />
    );
};
Icon.displayName = "Icon";

/**
 * Icon categories for organization.
 */
export const iconCategories = {
    arrows: [
        "ArrowDown",
        "ArrowDownCircle",
        "ArrowDownLeft",
        "ArrowDownRight",
        "ArrowLeft",
        "ArrowLeftCircle",
        "ArrowRight",
        "ArrowRightCircle",
        "ArrowUp",
        "ArrowUpCircle",
        "ArrowUpLeft",
        "ArrowUpRight",
        "ChevronDown",
        "ChevronLeft",
        "ChevronRight",
        "ChevronUp",
        "ChevronsDown",
        "ChevronsLeft",
        "ChevronsRight",
        "ChevronsUp",
        "CornerDownLeft",
        "CornerDownRight",
        "CornerLeftDown",
        "CornerLeftUp",
        "CornerRightDown",
        "CornerRightUp",
        "CornerUpLeft",
        "CornerUpRight",
    ] as IconName[],
    actions: [
        "Check",
        "CheckCircle",
        "CheckSquare",
        "X",
        "XCircle",
        "XSquare",
        "Plus",
        "PlusCircle",
        "PlusSquare",
        "Minus",
        "MinusCircle",
        "MinusSquare",
        "Edit",
        "Edit2",
        "Edit3",
        "Trash",
        "Trash2",
        "Copy",
        "Clipboard",
        "Download",
        "Upload",
        "Share",
        "Share2",
        "ExternalLink",
        "Link",
        "Link2",
        "Refresh",
        "RefreshCw",
        "RefreshCcw",
        "RotateCw",
        "RotateCcw",
    ] as IconName[],
    alerts: [
        "AlertCircle",
        "AlertOctagon",
        "AlertTriangle",
        "Bell",
        "BellOff",
        "Info",
        "HelpCircle",
    ] as IconName[],
    media: [
        "Play",
        "PlayCircle",
        "Pause",
        "PauseCircle",
        "StopCircle",
        "SkipBack",
        "SkipForward",
        "Rewind",
        "FastForward",
        "Volume",
        "Volume1",
        "Volume2",
        "VolumeX",
        "Music",
        "Video",
        "VideoOff",
        "Mic",
        "MicOff",
        "Camera",
        "CameraOff",
        "Image",
        "Film",
        "Tv",
        "Radio",
        "Headphones",
        "Speaker",
    ] as IconName[],
    communication: [
        "Mail",
        "Inbox",
        "Send",
        "MessageCircle",
        "MessageSquare",
        "Phone",
        "PhoneCall",
        "PhoneForwarded",
        "PhoneIncoming",
        "PhoneMissed",
        "PhoneOff",
        "PhoneOutgoing",
        "Voicemail",
        "AtSign",
        "Hash",
    ] as IconName[],
    users: [
        "User",
        "UserCheck",
        "UserMinus",
        "UserPlus",
        "UserX",
        "Users",
    ] as IconName[],
    files: [
        "File",
        "FileMinus",
        "FilePlus",
        "FileText",
        "Folder",
        "FolderMinus",
        "FolderPlus",
        "Archive",
        "Book",
        "BookOpen",
        "Bookmark",
        "Paperclip",
    ] as IconName[],
    navigation: [
        "Home",
        "Menu",
        "MoreHorizontal",
        "MoreVertical",
        "Grid",
        "List",
        "Sidebar",
        "Layout",
        "Maximize",
        "Maximize2",
        "Minimize",
        "Minimize2",
        "Move",
        "Navigation",
        "Navigation2",
        "Map",
        "MapPin",
        "Compass",
        "Crosshair",
    ] as IconName[],
    settings: [
        "Settings",
        "Sliders",
        "Tool",
        "Wrench",
        "Filter",
        "Search",
        "ZoomIn",
        "ZoomOut",
        "Eye",
        "EyeOff",
        "Lock",
        "Unlock",
        "Key",
        "Shield",
        "ShieldOff",
    ] as IconName[],
    time: [
        "Clock",
        "Watch",
        "Calendar",
        "Sunrise",
        "Sunset",
        "Moon",
        "Sun",
        "Cloud",
        "CloudDrizzle",
        "CloudLightning",
        "CloudOff",
        "CloudRain",
        "CloudSnow",
        "Wind",
        "Umbrella",
    ] as IconName[],
    commerce: [
        "ShoppingBag",
        "ShoppingCart",
        "CreditCard",
        "DollarSign",
        "Gift",
        "Package",
        "Tag",
        "Truck",
        "Percent",
    ] as IconName[],
    devices: [
        "Monitor",
        "Smartphone",
        "Tablet",
        "Laptop",
        "Printer",
        "Server",
        "Database",
        "HardDrive",
        "Cpu",
        "Wifi",
        "WifiOff",
        "Bluetooth",
        "Battery",
        "BatteryCharging",
        "Power",
        "Zap",
        "ZapOff",
    ] as IconName[],
    social: [
        "Heart",
        "ThumbsUp",
        "ThumbsDown",
        "Star",
        "Award",
        "Flag",
        "Smile",
        "Frown",
        "Meh",
    ] as IconName[],
} as const;

export { Icon, iconVariants };

// Re-export all Feather icons for direct usage if needed
export * from "react-feather";
