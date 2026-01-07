import * as React from "react";
import { cn } from "../../utils";

export interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Página atual (1-indexed) */
  currentPage?: number;
  /** Total de páginas */
  totalPages?: number;
  /** Callback ao mudar página */
  onPageChange?: (page: number) => void;
  /** Índice inicial dos itens sendo exibidos */
  startIndex?: number;
  /** Índice final dos itens sendo exibidos */
  endIndex?: number;
  /** Total de itens */
  totalItems?: number;
}

/**
 * TablePagination - paginação para tabelas.
 * 
 * @example
 * ```tsx
 * <TablePagination
 *   currentPage={1}
 *   totalPages={5}
 *   startIndex={1}
 *   endIndex={10}
 *   totalItems={50}
 *   onPageChange={(page) => console.log(page)}
 * />
 * ```
 */
const TablePagination = React.forwardRef<HTMLDivElement, TablePaginationProps>(
  ({ 
    className, 
    currentPage = 1, 
    totalPages = 1, 
    onPageChange,
    startIndex = 1,
    endIndex = 10,
    totalItems = 0,
    ...props 
  }, ref) => {
    const handlePrevious = () => {
      if (currentPage > 1 && onPageChange) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages && onPageChange) {
        onPageChange(currentPage + 1);
      }
    };

    const handlePageClick = (page: number) => {
      if (onPageChange) {
        onPageChange(page);
      }
    };

    // Gerar array de páginas para mostrar
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      const maxVisible = 5;

      if (totalPages <= maxVisible) {
        // Mostrar todas as páginas
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Mostrar páginas com elipses
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) pages.push(i);
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push("...");
          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
          pages.push("...");
          pages.push(totalPages);
        }
      }

      return pages;
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-4 pt-4 text-sm",
          className
        )}
        {...props}
      >
        {/* Informação de exibição */}
        <div className="text-muted-foreground">
          Exibindo {startIndex} a {endIndex} de {totalItems} entradas
        </div>

        {/* Controles de paginação */}
        <div className="flex items-center gap-1">
          {/* Botão anterior */}
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={cn(
              "inline-flex items-center justify-center rounded-md w-8 h-8",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              currentPage === 1
                ? "text-muted-foreground cursor-not-allowed opacity-50"
                : "text-foreground hover:bg-muted cursor-pointer"
            )}
            aria-label="Página anterior"
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
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Números de página */}
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {typeof page === "number" ? (
                <button
                  type="button"
                  onClick={() => handlePageClick(page)}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full w-8 h-8",
                    "transition-colors font-medium",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    page === currentPage
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-foreground hover:bg-muted"
                  )}
                  aria-label={`Página ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              ) : (
                <span className="inline-flex items-center justify-center w-8 h-8 text-muted-foreground">
                  {page}
                </span>
              )}
            </React.Fragment>
          ))}

          {/* Botão próximo */}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={cn(
              "inline-flex items-center justify-center rounded-md w-8 h-8",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              currentPage === totalPages
                ? "text-muted-foreground cursor-not-allowed opacity-50"
                : "text-foreground hover:bg-muted cursor-pointer"
            )}
            aria-label="Próxima página"
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);
TablePagination.displayName = "TablePagination";

export { TablePagination };
