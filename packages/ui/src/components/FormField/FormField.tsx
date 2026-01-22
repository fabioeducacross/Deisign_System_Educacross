/**
 * FormField — Molécula de campo de formulário
 * 
 * Agrupa Label + Input + Helper/Error para criar campos completos e acessíveis.
 * Segue WCAG 2.1 AA e injeta props de acessibilidade via cloneElement.
 * 
 * @component FormField
 * @category Forms
 * @atomic-level Molécula
 * 
 * @example
 * ```tsx
 * <FormField label="E-mail" required error={errors.email?.message}>
 *   <Input type="email" {...register("email")} />
 * </FormField>
 * ```
 */

import * as React from "react";
import { cn } from "../../utils";

// ============================================================================
// TYPES
// ============================================================================

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Texto do label (sempre visível, obrigatório para acessibilidade).
   * 
   * ✅ MUST: Label sempre presente (não apenas placeholder)
   * @see WCAG 2.1 - 3.3.2 Labels or Instructions (Level A)
   */
  label: string;

  /**
   * ID do campo. Se omitido, será gerado automaticamente via useId().
   * 
   * @example "email-field"
   */
  id?: string;

  /**
   * Se o campo é obrigatório. Adiciona asterisco (*) no label e aria-required.
   * 
   * ✅ MUST: Use esta prop, não adicione asterisco manualmente no label
   */
  required?: boolean;

  /**
   * Mensagem de erro. Quando presente, sobrescreve helperText.
   * 
   * ✅ MUST: Erro tem prioridade sobre helperText (apenas 1 mensagem por vez)
   */
  error?: string;

  /**
   * Texto de ajuda (dica). Oculto quando há erro.
   * 
   * @example "Mínimo 8 caracteres"
   */
  helperText?: string;

  /**
   * Campo de entrada (Input, Textarea, Select, etc).
   * 
   * ✅ MUST: Apenas 1 elemento filho
   * ❌ MUST NOT: Checkbox ou Radio (use FormField específico ou grupo)
   */
  children: React.ReactElement;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      id,
      required = false,
      error,
      helperText,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Gerar ID automático se não fornecido
    const autoId = React.useId();
    const fieldId = id || `field-${autoId}`;

    // IDs para mensagens de erro e helper
    const errorId = `${fieldId}-error`;
    const helperId = `${fieldId}-helper`;

    // Determinar qual mensagem exibir (erro tem prioridade)
    const showError = Boolean(error);
    const showHelper = Boolean(helperText) && !showError;

    // Construir aria-describedby baseado em qual mensagem está visível
    const ariaDescribedBy = showError
      ? errorId
      : showHelper
      ? helperId
      : undefined;

    // ========================================================================
    // INJEÇÃO DE PROPS NO CHILD VIA CLONELEMENT
    // ========================================================================
    // Injeta props de acessibilidade no input filho
    // ✅ Mantém props originais do child (spread first)
    // ✅ Sobrescreve apenas o necessário (id, aria-*)
    
    const enhancedChild = React.cloneElement(children, {
      id: fieldId,
      "aria-invalid": showError ? true : undefined,
      "aria-required": required ? true : undefined,
      "aria-describedby": ariaDescribedBy,
      // Spread original props do child por último para permitir override se necessário
      ...children.props,
    });

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {/* ================================================================
            LABEL
            ================================================================ */}
        <label
          htmlFor={fieldId}
          className={cn(
            "block text-sm font-medium leading-none",
            "text-foreground",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          )}
        >
          {label}
          {required && (
            <span
              className="ml-1 text-destructive"
              aria-label="obrigatório"
            >
              *
            </span>
          )}
        </label>

        {/* ================================================================
            INPUT (COM PROPS INJETADAS)
            ================================================================ */}
        {enhancedChild}

        {/* ================================================================
            MENSAGENS (ERRO OU HELPER)
            ================================================================ */}
        {/* Erro (prioridade) */}
        {showError && (
          <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className={cn(
              "text-sm font-medium text-destructive",
              "animate-in fade-in-50 duration-200"
            )}
          >
            {error}
          </p>
        )}

        {/* Helper text (apenas se não houver erro) */}
        {showHelper && (
          <p
            id={helperId}
            className={cn(
              "text-sm text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
