import * as React from "react";
import { cn } from "../../utils";

export interface TableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Número de itens selecionados */
  selectedCount?: number;
  /** Callback quando limpar seleção */
  onClearSelection?: () => void;
  /** Mostrar botão de limpar seleção */
  showClearSelection?: boolean;
}

/**
 * TableToolbar - barra de ferramentas superior da tabela.
 * 
 * @example
 * ```tsx
 * <TableToolbar 
 *   selectedCount={20}
 *   onClearSelection={() => console.log('clear')}
 *   showClearSelection
 * >
 *   <div className="flex items-center gap-4">
 *     <Select />
 *     <Input />
 *     <Button />
 *   </div>
 * </TableToolbar>
 * ```
 */
const TableToolbar = React.forwardRef<HTMLDivElement, TableToolbarProps>(
  ({ className, selectedCount, onClearSelection, showClearSelection, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {/* Barra principal com controles */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {children}
      </div>

      {/* Contador de seleção e limpar */}
      {(selectedCount !== undefined || showClearSelection) && (
        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          {selectedCount !== undefined && (
            <span>
              Alunos selecionados: <strong className="text-foreground">{selectedCount}</strong>
            </span>
          )}
          {showClearSelection && onClearSelection && (
            <button
              type="button"
              onClick={onClearSelection}
              className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
              Limpar seleção
            </button>
          )}
        </div>
      )}
    </div>
  )
);
TableToolbar.displayName = "TableToolbar";

export { TableToolbar };
