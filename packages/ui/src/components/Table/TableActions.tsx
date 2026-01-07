import * as React from "react";
import { cn } from "../../utils";

export interface TableActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ações como array de botões/componentes */
  actions?: React.ReactNode[];
}

/**
 * TableActions - container para ações da linha da tabela.
 * 
 * @example
 * ```tsx
 * <TableActions>
 *   <button><TrendingUp size={18} /></button>
 *   <button><BarChart2 size={18} /></button>
 *   <button><Users size={18} /></button>
 * </TableActions>
 * ```
 */
const TableActions = React.forwardRef<HTMLDivElement, TableActionsProps>(
  ({ className, children, actions, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1",
        className
      )}
      {...props}
    >
      {actions ? actions.map((action, index) => (
        <React.Fragment key={index}>{action}</React.Fragment>
      )) : children}
    </div>
  )
);
TableActions.displayName = "TableActions";

/**
 * TableActionButton - botão de ação individual.
 */
export interface TableActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ícone do botão */
  icon?: React.ReactNode;
  /** Variante de cor */
  variant?: "default" | "primary" | "success" | "warning" | "destructive";
}

const TableActionButton = React.forwardRef<HTMLButtonElement, TableActionButtonProps>(
  ({ className, icon, variant = "default", children, ...props }, ref) => {
    const variantClasses = {
      default: "text-muted-foreground hover:text-foreground",
      primary: "text-primary hover:text-primary/80",
      success: "text-success hover:text-success/80",
      warning: "text-warning hover:text-warning/80",
      destructive: "text-destructive hover:text-destructive/80",
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center rounded-md p-1.5",
          "transition-colors hover:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {icon || children}
      </button>
    );
  }
);
TableActionButton.displayName = "TableActionButton";

export { TableActions, TableActionButton };
