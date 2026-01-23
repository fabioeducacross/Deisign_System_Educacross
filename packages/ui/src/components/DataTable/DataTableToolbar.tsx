/**
 * @file DataTableToolbar.tsx
 * @description Toolbar com search, column visibility e ações customizáveis
 */

import * as React from "react";
import type { Table } from "@tanstack/react-table";
import { X, Settings2 } from "lucide-react";
import { cn } from "../../utils";
import { Button } from "../Button";
import { Input } from "../Input";
import { Checkbox } from "../Checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../DropdownMenu";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Props do componente DataTableToolbar.
 * 
 * @template TData - Tipo dos dados da tabela
 */
export interface DataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Instância da tabela do TanStack Table.
   * @required
   */
  table: Table<TData>;

  /**
   * Placeholder do input de busca.
   * @default "Buscar..."
   */
  searchPlaceholder?: string;

  /**
   * Coluna usada para filtro global.
   * Se não fornecida, o filtro não será exibido.
   * @example "name" ou "email"
   */
  searchColumn?: string;

  /**
   * Mostrar toggle de visibilidade de colunas.
   * @default true
   */
  showColumnVisibility?: boolean;

  /**
   * Label do botão de visibilidade de colunas.
   * @default "Colunas"
   */
  columnVisibilityLabel?: string;

  /**
   * Ações customizadas (botões) a serem exibidas na toolbar.
   * @example
   * ```tsx
   * actions={[
   *   <Button key="export" variant="outline" onClick={handleExport}>
   *     <Download className="h-4 w-4 mr-2" />
   *     Exportar
   *   </Button>
   * ]}
   * ```
   */
  actions?: React.ReactNode[];
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * DataTableToolbar - Barra de ferramentas com filtros e ações.
 * 
 * @example Uso básico com search
 * ```tsx
 * <DataTableToolbar 
 *   table={table} 
 *   searchColumn="name"
 *   searchPlaceholder="Buscar por nome..."
 * />
 * ```
 * 
 * @example Com ações customizadas
 * ```tsx
 * <DataTableToolbar 
 *   table={table}
 *   searchColumn="email"
 *   actions={[
 *     <Button key="export" onClick={handleExport}>
 *       <Download /> Exportar
 *     </Button>,
 *     <Button key="import" variant="outline" onClick={handleImport}>
 *       <Upload /> Importar
 *     </Button>
 *   ]}
 * />
 * ```
 */
export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "Buscar...",
  searchColumn,
  showColumnVisibility = true,
  columnVisibilityLabel = "Colunas",
  actions,
  className,
  ...rest
}: DataTableToolbarProps<TData>) {
  // Estado de filtro da coluna de busca
  const columnFilterValue = searchColumn
    ? (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
    : "";

  // Verifica se há filtros ativos
  const isFiltered = table.getState().columnFilters.length > 0;

  /**
   * Handler para mudança no input de busca
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (searchColumn) {
      table.getColumn(searchColumn)?.setFilterValue(event.target.value);
    }
  };

  /**
   * Handler para limpar filtros
   */
  const handleResetFilters = () => {
    table.resetColumnFilters();
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...rest}
    >
      {/* Lado esquerdo: Search e reset */}
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
        {/* Search input */}
        {searchColumn && (
          <div className="relative flex-1 sm:max-w-sm">
            <Input
              placeholder={searchPlaceholder}
              value={columnFilterValue}
              onChange={handleSearchChange}
              className="pr-8"
              aria-label="Buscar na tabela"
            />
            {columnFilterValue && (
              <button
                onClick={() => table.getColumn(searchColumn)?.setFilterValue("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Limpar busca"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Reset filters button */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            className="h-8 px-2 lg:px-3"
            aria-label="Resetar filtros"
          >
            Resetar
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Lado direito: Column visibility e ações */}
      <div className="flex items-center gap-2">
        {/* Custom actions */}
        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2">
            {actions.map((action, index) => (
              <React.Fragment key={index}>{action}</React.Fragment>
            ))}
          </div>
        )}

        {/* Column visibility toggle */}
        {showColumnVisibility && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto h-8"
                aria-label="Alternar visibilidade de colunas"
              >
                <Settings2 className="mr-2 h-4 w-4" />
                {columnVisibilityLabel}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Visibilidade</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" && column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuItem
                      key={column.id}
                      onClick={(e) => e.preventDefault()}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        checked={column.getIsVisible()}
                        onChange={() => column.toggleVisibility()}
                        aria-label={`Alternar coluna ${column.id}`}
                      />
                      <span>
                        {/* Usa o header se for string, senão o id */}
                        {typeof column.columnDef.header === "string"
                          ? column.columnDef.header
                          : column.id}
                      </span>
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

DataTableToolbar.displayName = "DataTableToolbar";
