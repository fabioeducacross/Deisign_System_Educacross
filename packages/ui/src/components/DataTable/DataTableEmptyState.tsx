/**
 * @file DataTableEmptyState.tsx
 * @description Estados vazios para DataTable (no data, no results, error)
 */

import * as React from "react";
import { Search, Inbox, AlertCircle } from "lucide-react";
import { cn } from "../../utils";
import { Button } from "../Button";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Tipos de estado vazio disponíveis.
 */
export type EmptyStateVariant = "no-data" | "no-results" | "error";

/**
 * Props do componente DataTableEmptyState.
 */
export interface DataTableEmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variante do estado vazio.
   * @default "no-data"
   */
  variant?: EmptyStateVariant;

  /**
   * Título customizado.
   */
  title?: string;

  /**
   * Descrição customizada.
   */
  description?: string;

  /**
   * Ícone customizado (substitui o ícone padrão da variant).
   */
  icon?: React.ReactNode;

  /**
   * Label do botão de ação.
   */
  actionLabel?: string;

  /**
   * Handler do botão de ação.
   */
  onAction?: () => void;

  /**
   * Label do botão secundário.
   */
  secondaryActionLabel?: string;

  /**
   * Handler do botão secundário.
   */
  onSecondaryAction?: () => void;
}

// ============================================================================
// VARIANT CONFIGS
// ============================================================================

const variantConfigs: Record<
  EmptyStateVariant,
  {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    iconColor: string;
  }
> = {
  "no-data": {
    icon: Inbox,
    title: "Nenhum dado disponível",
    description: "Não há dados para exibir no momento.",
    iconColor: "text-muted-foreground",
  },
  "no-results": {
    icon: Search,
    title: "Nenhum resultado encontrado",
    description: "Tente ajustar os filtros ou termos de busca.",
    iconColor: "text-muted-foreground",
  },
  error: {
    icon: AlertCircle,
    title: "Erro ao carregar dados",
    description: "Ocorreu um erro ao tentar carregar os dados. Tente novamente.",
    iconColor: "text-destructive",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * DataTableEmptyState - Estados vazios para tabelas de dados.
 * 
 * Renderiza diferentes estados vazios com ícone, título, descrição e ações.
 * Possui 3 variantes pré-configuradas: no-data, no-results e error.
 * 
 * @example
 * ```tsx
 * // Estado vazio sem dados
 * <DataTableEmptyState variant="no-data" />
 * 
 * // Sem resultados com ação para limpar filtros
 * <DataTableEmptyState 
 *   variant="no-results"
 *   actionLabel="Limpar filtros"
 *   onAction={handleClearFilters}
 * />
 * 
 * // Erro com retry
 * <DataTableEmptyState
 *   variant="error"
 *   actionLabel="Tentar novamente"
 *   onAction={handleRetry}
 * />
 * 
 * // Customizado
 * <DataTableEmptyState
 *   variant="no-data"
 *   title="Nenhum usuário cadastrado"
 *   description="Comece adicionando seu primeiro usuário."
 *   actionLabel="Adicionar usuário"
 *   onAction={handleAddUser}
 * />
 * ```
 */
export function DataTableEmptyState({
  variant = "no-data",
  title,
  description,
  icon,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
  ...rest
}: DataTableEmptyStateProps): JSX.Element {
  const config = variantConfigs[variant];
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12 px-4 text-center",
        className
      )}
      role="status"
      aria-live="polite"
      {...rest}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full bg-muted",
          config.iconColor
        )}
      >
        {icon || <IconComponent className="h-8 w-8" />}
      </div>

      {/* Text */}
      <div className="space-y-2 max-w-md">
        <h3 className="text-lg font-semibold">
          {title || config.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description || config.description}
        </p>
      </div>

      {/* Actions */}
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex items-center gap-3 mt-2">
          {actionLabel && onAction && (
            <Button onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button variant="outline" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

DataTableEmptyState.displayName = "DataTableEmptyState";
