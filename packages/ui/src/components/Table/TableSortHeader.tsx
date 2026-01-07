import * as React from "react";
import { cn } from "../../utils";

export type SortDirection = "asc" | "desc" | null;

export interface TableSortHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Direção atual da ordenação */
  sortDirection?: SortDirection;
  /** Callback quando clicar no cabeçalho */
  onSort?: () => void;
  /** Ícone opcional antes do texto */
  icon?: React.ReactNode;
  /** Desabilitar ordenação */
  disableSort?: boolean;
}

/**
 * TableSortHeader - cabeçalho de coluna com ordenação.
 * 
 * @example
 * ```tsx
 * <TableSortHeader 
 *   sortDirection="asc"
 *   onSort={() => console.log('sort')}
 * >
 *   Nome
 * </TableSortHeader>
 * ```
 */
const TableSortHeader = React.forwardRef<HTMLTableCellElement, TableSortHeaderProps>(
  ({ className, sortDirection, onSort, icon, disableSort, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-14 px-6 text-left align-middle font-semibold text-muted-foreground uppercase text-xs tracking-wider",
        "[&:has([role=checkbox])]:pr-0",
        !disableSort && "cursor-pointer select-none hover:text-foreground transition-colors",
        className
      )}
      onClick={!disableSort ? onSort : undefined}
      {...props}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span>{children}</span>
        {!disableSort && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "transition-transform",
              sortDirection === "desc" && "rotate-180",
              sortDirection === null && "opacity-40"
            )}
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        )}
      </div>
    </th>
  )
);
TableSortHeader.displayName = "TableSortHeader";

export { TableSortHeader };
