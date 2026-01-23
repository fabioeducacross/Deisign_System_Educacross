/**
 * @file DataTableSkeleton.tsx
 * @description Skeleton loading state para DataTable
 */

import * as React from "react";
import { cn } from "../../utils";
import { Skeleton } from "../Skeleton";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Props do componente DataTableSkeleton.
 */
export interface DataTableSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Número de linhas a renderizar.
   * @default 5
   */
  rows?: number;

  /**
   * Número de colunas a renderizar.
   * @default 4
   */
  columns?: number;

  /**
   * Se deve mostrar o header skeleton.
   * @default true
   */
  showHeader?: boolean;

  /**
   * Se deve mostrar o toolbar skeleton.
   * @default false
   */
  showToolbar?: boolean;

  /**
   * Se deve mostrar o pagination skeleton.
   * @default false
   */
  showPagination?: boolean;

  /**
   * Altura das linhas.
   * @default "h-12"
   */
  rowHeight?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * DataTableSkeleton - Loading skeleton para DataTable.
 * 
 * Renderiza placeholders durante carregamento de dados.
 * Customizável em número de linhas, colunas e seções.
 * 
 * @example
 * ```tsx
 * // Skeleton básico
 * <DataTableSkeleton rows={5} columns={4} />
 * 
 * // Com toolbar e pagination
 * <DataTableSkeleton 
 *   rows={10}
 *   columns={6}
 *   showToolbar
 *   showPagination
 * />
 * 
 * // Customizado
 * <DataTableSkeleton
 *   rows={3}
 *   columns={5}
 *   showHeader={false}
 *   rowHeight="h-16"
 * />
 * ```
 */
export function DataTableSkeleton({
  rows = 5,
  columns = 4,
  showHeader = true,
  showToolbar = false,
  showPagination = false,
  rowHeight = "h-12",
  className,
  ...rest
}: DataTableSkeletonProps): JSX.Element {
  return (
    <div className={cn("space-y-4", className)} aria-busy="true" aria-live="polite" {...rest}>
      {/* Toolbar Skeleton */}
      {showToolbar && (
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-10 w-64" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      )}

      {/* Table Skeleton */}
      <div className="rounded-md border">
        {/* Header */}
        {showHeader && (
          <div className="border-b bg-muted/50">
            <div className="flex items-center gap-4 p-4">
              {Array.from({ length: columns }).map((_, i) => (
                <Skeleton
                  key={`header-${i}`}
                  className={cn(
                    "h-5",
                    i === 0 ? "w-12" : "flex-1"
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {/* Rows */}
        <div className="divide-y">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex items-center gap-4 p-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={cn(
                    rowHeight,
                    colIndex === 0 ? "w-12" : "flex-1"
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      {showPagination && (
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      )}
    </div>
  );
}

DataTableSkeleton.displayName = "DataTableSkeleton";
