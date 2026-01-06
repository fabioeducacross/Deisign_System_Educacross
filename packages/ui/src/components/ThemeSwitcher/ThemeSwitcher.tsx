import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

// ============================================================================
// Hook useTheme
// ============================================================================

/**
 * Tipos de tema disponíveis.
 */
export type Theme = "light" | "dark" | "system";

/**
 * Tipo do tema resolvido (light ou dark).
 */
export type ResolvedTheme = "light" | "dark";

/**
 * Chave para persistência no localStorage.
 */
const THEME_STORAGE_KEY = "educacross-theme";

/**
 * Contexto do tema.
 */
interface ThemeContextValue {
    /** Tema atual (light, dark ou system) */
    theme: Theme;
    /** Tema resolvido (light ou dark) - útil quando theme é 'system' */
    resolvedTheme: ResolvedTheme;
    /** Função para alterar o tema */
    setTheme: (theme: Theme) => void;
    /** Alterna entre light e dark */
    toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

/**
 * Hook para acessar o contexto de tema.
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, setTheme, toggleTheme } = useTheme();
 *   return <button onClick={toggleTheme}>Toggle</button>;
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
    }
    return context;
}

/**
 * Detecta a preferência de tema do sistema.
 */
function getSystemTheme(): ResolvedTheme {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Obtém o tema salvo no localStorage.
 */
function getStoredTheme(): Theme | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
        return stored;
    }
    return null;
}

/**
 * Resolve o tema para light ou dark.
 */
function resolveTheme(theme: Theme): ResolvedTheme {
    if (theme === "system") {
        return getSystemTheme();
    }
    return theme;
}

export interface ThemeProviderProps {
    /** Tema padrão se não houver preferência salva */
    defaultTheme?: Theme;
    /** Filhos do provider */
    children: React.ReactNode;
    /** Atributo para aplicar no documento (padrão: class) */
    attribute?: "class" | "data-theme";
    /** Desabilitar persistência no localStorage */
    disableStorage?: boolean;
    /** Desabilitar transição ao trocar tema */
    disableTransitionOnChange?: boolean;
}

/**
 * Provider de tema que gerencia o estado e aplica a classe no documento.
 * 
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
    defaultTheme = "system",
    children,
    attribute = "class",
    disableStorage = false,
    disableTransitionOnChange = false,
}: ThemeProviderProps) {
    const [theme, setThemeState] = React.useState<Theme>(() => {
        if (!disableStorage) {
            const stored = getStoredTheme();
            if (stored) return stored;
        }
        return defaultTheme;
    });

    const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(() =>
        resolveTheme(theme)
    );

    // Aplica o tema no documento
    const applyTheme = React.useCallback(
        (newTheme: Theme) => {
            const resolved = resolveTheme(newTheme);
            setResolvedTheme(resolved);

            const root = document.documentElement;

            // Desabilitar transições temporariamente se configurado
            if (disableTransitionOnChange) {
                root.style.setProperty("--transition-duration", "0s");
            }

            if (attribute === "class") {
                root.classList.remove("light", "dark");
                root.classList.add(resolved);
            } else {
                root.setAttribute("data-theme", resolved);
            }

            // Restaurar transições
            if (disableTransitionOnChange) {
                // Força reflow antes de restaurar
                void root.offsetHeight;
                root.style.removeProperty("--transition-duration");
            }
        },
        [attribute, disableTransitionOnChange]
    );

    // Função para definir tema
    const setTheme = React.useCallback(
        (newTheme: Theme) => {
            setThemeState(newTheme);
            if (!disableStorage) {
                localStorage.setItem(THEME_STORAGE_KEY, newTheme);
            }
            applyTheme(newTheme);
        },
        [applyTheme, disableStorage]
    );

    // Alternar entre light e dark
    const toggleTheme = React.useCallback(() => {
        const newTheme = resolvedTheme === "light" ? "dark" : "light";
        setTheme(newTheme);
    }, [resolvedTheme, setTheme]);

    // Aplicar tema inicial e observar mudanças no sistema
    React.useEffect(() => {
        applyTheme(theme);

        // Observar mudanças na preferência do sistema
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (theme === "system") {
                applyTheme("system");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme, applyTheme]);

    const value = React.useMemo(
        () => ({
            theme,
            resolvedTheme,
            setTheme,
            toggleTheme,
        }),
        [theme, resolvedTheme, setTheme, toggleTheme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ============================================================================
// Componente ThemeSwitcher
// ============================================================================

/**
 * Ícones de tema.
 */
function SunIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    );
}

function MoonIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    );
}

function MonitorIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
    );
}

/**
 * Variantes do ThemeSwitcher.
 */
const themeSwitcherVariants = cva(
    [
        "inline-flex items-center justify-center",
        "rounded-[var(--radius-md)]",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                icon: [
                    "bg-transparent text-[var(--text-primary)]",
                    "hover:bg-[var(--action-hover)]",
                    "active:bg-[var(--action-selected)]",
                ],
                outline: [
                    "border border-[var(--input-border)] bg-transparent text-[var(--text-primary)]",
                    "hover:bg-[var(--action-hover)]",
                ],
                filled: [
                    "bg-[var(--filled-input-bg)] text-[var(--text-primary)]",
                    "hover:bg-[var(--action-hover)]",
                ],
            },
            size: {
                sm: "h-8 w-8 [&_svg]:h-4 [&_svg]:w-4",
                default: "h-10 w-10 [&_svg]:h-5 [&_svg]:w-5",
                lg: "h-12 w-12 [&_svg]:h-6 [&_svg]:w-6",
            },
        },
        defaultVariants: {
            variant: "icon",
            size: "default",
        },
    }
);

/**
 * Variantes do toggle (switch visual).
 */
const themeToggleVariants = cva(
    [
        "relative inline-flex items-center",
        "rounded-full border-2 border-transparent",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "cursor-pointer",
    ],
    {
        variants: {
            size: {
                sm: "h-6 w-11",
                default: "h-8 w-14",
                lg: "h-10 w-[4.5rem]",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

export interface ThemeSwitcherProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
        VariantProps<typeof themeSwitcherVariants> {
    /**
     * Modo de exibição do switcher.
     * - icon: botão com ícone que alterna entre sol/lua
     * - toggle: switch visual estilo iOS
     * - dropdown: dropdown com 3 opções (light, dark, system)
     */
    mode?: "icon" | "toggle" | "dropdown";
    /**
     * Rótulo acessível do botão.
     */
    label?: string;
    /**
     * Mostrar label de texto ao lado do ícone.
     */
    showLabel?: boolean;
}

/**
 * Componente ThemeSwitcher para alternar entre temas Light e Dark.
 *
 * @example
 * ```tsx
 * // Modo ícone (padrão)
 * <ThemeSwitcher />
 *
 * // Modo toggle
 * <ThemeSwitcher mode="toggle" />
 *
 * // Modo dropdown
 * <ThemeSwitcher mode="dropdown" />
 *
 * // Com label
 * <ThemeSwitcher showLabel />
 * ```
 */
const ThemeSwitcher = React.forwardRef<HTMLButtonElement, ThemeSwitcherProps>(
    (
        {
            className,
            variant,
            size,
            mode = "icon",
            label,
            showLabel = false,
            disabled,
            ...props
        },
        ref
    ) => {
        const { resolvedTheme, toggleTheme, setTheme, theme } = useTheme();
        const [isOpen, setIsOpen] = React.useState(false);
        const dropdownRef = React.useRef<HTMLDivElement>(null);

        const isDark = resolvedTheme === "dark";
        const ariaLabel = label || (isDark ? "Mudar para tema claro" : "Mudar para tema escuro");
        const labelText = isDark ? "Escuro" : "Claro";

        // Fechar dropdown ao clicar fora
        React.useEffect(() => {
            if (!isOpen) return;

            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [isOpen]);

        // Fechar dropdown com Escape
        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        // Modo Toggle
        if (mode === "toggle") {
            const thumbSizeClass = {
                sm: "h-4 w-4",
                default: "h-6 w-6",
                lg: "h-8 w-8",
            }[size || "default"];

            const translateClass = {
                sm: isDark ? "translate-x-5" : "translate-x-0.5",
                default: isDark ? "translate-x-6" : "translate-x-0.5",
                lg: isDark ? "translate-x-8" : "translate-x-0.5",
            }[size || "default"];

            const iconSizeClass = {
                sm: "h-2.5 w-2.5",
                default: "h-3.5 w-3.5",
                lg: "h-5 w-5",
            }[size || "default"];

            return (
                <button
                    ref={ref}
                    type="button"
                    role="switch"
                    aria-checked={isDark}
                    aria-label={ariaLabel}
                    disabled={disabled}
                    onClick={toggleTheme}
                    className={cn(
                        themeToggleVariants({ size }),
                        isDark ? "bg-[var(--color-primary-500)]" : "bg-[var(--color-gray-300)]",
                        className
                    )}
                    {...props}
                >
                    <span
                        className={cn(
                            "pointer-events-none flex items-center justify-center rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
                            thumbSizeClass,
                            translateClass
                        )}
                    >
                        {isDark ? (
                            <MoonIcon className={cn(iconSizeClass, "text-[var(--color-primary-500)]")} />
                        ) : (
                            <SunIcon className={cn(iconSizeClass, "text-[var(--color-warning-500)]")} />
                        )}
                    </span>
                </button>
            );
        }

        // Modo Dropdown
        if (mode === "dropdown") {
            const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
                { value: "light", label: "Claro", icon: <SunIcon className="h-4 w-4" /> },
                { value: "dark", label: "Escuro", icon: <MoonIcon className="h-4 w-4" /> },
                { value: "system", label: "Sistema", icon: <MonitorIcon className="h-4 w-4" /> },
            ];

            return (
                <div ref={dropdownRef} className="relative inline-block">
                    <button
                        ref={ref}
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={isOpen}
                        aria-label={ariaLabel}
                        disabled={disabled}
                        onClick={() => setIsOpen(!isOpen)}
                        onKeyDown={handleKeyDown}
                        className={cn(
                            themeSwitcherVariants({ variant: variant || "outline", size }),
                            showLabel && "w-auto gap-2 px-3",
                            className
                        )}
                        {...props}
                    >
                        {isDark ? <MoonIcon /> : <SunIcon />}
                        {showLabel && <span className="text-sm">{labelText}</span>}
                    </button>

                    {isOpen && (
                        <div
                            role="listbox"
                            className={cn(
                                "absolute right-0 z-50 mt-2 w-36",
                                "rounded-[var(--radius-md)] border border-[var(--divider)]",
                                "bg-[var(--paper)] shadow-md",
                                "py-1"
                            )}
                        >
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="option"
                                    aria-selected={theme === option.value}
                                    onClick={() => {
                                        setTheme(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "flex w-full items-center gap-2 px-3 py-2 text-sm",
                                        "hover:bg-[var(--action-hover)]",
                                        "transition-colors duration-150",
                                        theme === option.value && "bg-[var(--action-selected)] font-medium"
                                    )}
                                >
                                    {option.icon}
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        // Modo Icon (padrão)
        return (
            <button
                ref={ref}
                type="button"
                aria-label={ariaLabel}
                disabled={disabled}
                onClick={toggleTheme}
                className={cn(
                    themeSwitcherVariants({ variant, size }),
                    showLabel && "w-auto gap-2 px-3",
                    className
                )}
                {...props}
            >
                {isDark ? <MoonIcon /> : <SunIcon />}
                {showLabel && <span className="text-sm">{labelText}</span>}
            </button>
        );
    }
);
ThemeSwitcher.displayName = "ThemeSwitcher";

export { ThemeSwitcher, themeSwitcherVariants };
