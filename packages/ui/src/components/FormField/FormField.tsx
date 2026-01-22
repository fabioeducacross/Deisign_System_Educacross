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
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

// ============================================================================
// VARIANTS (CVA)
// ============================================================================

/**
 * Variants do wrapper principal do FormField.
 * Controla espaçamento interno e orientação do layout.
 * 
 * @variant size - Controla espaçamento vertical entre elementos
 * @variant layout - Define orientação (vertical/horizontal)
 * 
 * @example
 * ```tsx
 * // Layout vertical (padrão) com espaçamento médio
 * <FormField label="Nome" size="md" layout="vertical">
 *   <Input />
 * </FormField>
 * 
 * // Layout horizontal para checkboxes
 * <FormField label="" layout="horizontal" size="sm">
 *   <Checkbox />
 * </FormField>
 * ```
 */
export const formFieldVariants = cva("space-y-2", {
  variants: {
    /**
     * Tamanho do campo (afeta label, helper text e espaçamento)
     * - sm: Campos compactos, ideal para checkboxes e formulários densos
     * - md: Tamanho padrão, uso geral
     * - lg: Campos de destaque, maior legibilidade
     */
    size: {
      sm: "space-y-1",
      md: "space-y-2",
      lg: "space-y-2.5",
    },
    /**
     * Layout do campo
     * - vertical: Label acima do input (padrão, uso geral)
     * - horizontal: Label ao lado do input (ideal para checkboxes inline)
     */
    layout: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row items-start gap-3",
    },
  },
  defaultVariants: {
    size: "md",
    layout: "vertical",
  },
});

/**
 * Variants do label do FormField.
 * Controla tipografia, alinhamento e estados visuais.
 * 
 * @variant size - Tamanho da fonte do label
 * @variant layout - Alinhamento conforme orientação
 * @variant disabled - Estilos para estado desabilitado
 * 
 * @example
 * ```tsx
 * // Label grande com layout vertical
 * formFieldLabelVariants({ size: "lg", layout: "vertical" })
 * // → "font-medium ... text-base block"
 * 
 * // Label pequeno desabilitado em layout horizontal
 * formFieldLabelVariants({ size: "sm", layout: "horizontal", disabled: true })
 * // → "font-medium ... text-xs inline-flex pt-2 cursor-not-allowed opacity-70"
 * ```
 */
export const formFieldLabelVariants = cva(
  [
    "font-medium leading-none",
    "text-foreground",
    "transition-colors duration-200",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      layout: {
        vertical: "block",
        horizontal: "inline-flex pt-2", // Alinha verticalmente com input
      },
      disabled: {
        true: "cursor-not-allowed opacity-70",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      layout: "vertical",
      disabled: false,
    },
  }
);

/**
 * Variants das mensagens (erro e helper text).
 * Controla tamanho da fonte e cores semânticas.
 * 
 * @variant size - Tamanho da fonte da mensagem
 * @variant type - Tipo de mensagem (erro vs helper)
 * 
 * @example
 * ```tsx
 * // Mensagem de erro
 * formFieldMessageVariants({ size: "sm", type: "error" })
 * // → "font-medium ... text-xs text-destructive"
 * 
 * // Helper text
 * formFieldMessageVariants({ size: "md", type: "helper" })
 * // → "font-medium ... text-sm text-muted-foreground"
 * ```
 */
export const formFieldMessageVariants = cva("font-medium transition-colors duration-200", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
    },
    type: {
      error: "text-destructive",
      helper: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    type: "helper",
  },
});

// ============================================================================
// TYPES
// ============================================================================

/**
 * Props do componente FormField.
 * 
 * @interface FormFieldProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 * @extends VariantProps<typeof formFieldVariants>
 * 
 * @example Uso básico
 * ```tsx
 * <FormField label="Email" required>
 *   <Input type="email" />
 * </FormField>
 * ```
 * 
 * @example Com React Hook Form
 * ```tsx
 * <FormField 
 *   label="Senha" 
 *   required 
 *   error={errors.password?.message}
 *   helperText="Mínimo 8 caracteres"
 * >
 *   <Input {...register("password")} type="password" />
 * </FormField>
 * ```
 * 
 * @example Layout horizontal para checkbox
 * ```tsx
 * <FormField label="" layout="horizontal" size="sm">
 *   <Checkbox {...register("terms")} />
 * </FormField>
 * ```
 */
export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  /**
   * Texto do label (sempre visível, obrigatório para acessibilidade).
   * 
   * ✅ MUST: Label sempre presente (não apenas placeholder)
   * ❌ MUST NOT: Use string vazia para esconder label (use layout="horizontal" para checkboxes)
   * 
   * @see WCAG 2.1 - 3.3.2 Labels or Instructions (Level A)
   * @required
   * @example "Nome completo"
   * @example "Aceito os termos de uso"
   */
  label: string;

  /**
   * ID do campo. Se omitido, será gerado automaticamente via useId().
   * 
   * 💡 TIP: Apenas forneça ID customizado se precisar referenciar o campo externamente
   * 
   * @optional
   * @default Gerado automaticamente via React.useId()
   * @example "email-field"
   * @example "billing-address-zip"
   */
  id?: string;

  /**
   * Se o campo é obrigatório. Adiciona asterisco (*) no label e aria-required no input.
   * 
   * ✅ MUST: Use esta prop ao invés de adicionar asterisco manualmente no label
   * 
   * @optional
   * @default false
   * @example true
   */
  required?: boolean;

  /**
   * Mensagem de erro. Quando presente, sobrescreve helperText e adiciona role="alert".
   * 
   * ✅ MUST: Erro tem prioridade sobre helperText (apenas 1 mensagem exibida por vez)
   * 💡 TIP: Use com React Hook Form: error={errors.fieldName?.message}
   * 
   * @optional
   * @example "Email inválido"
   * @example "Senha deve ter no mínimo 8 caracteres"
   */
  error?: string;

  /**
   * Texto de ajuda (dica). Exibido abaixo do input quando não há erro.
   * 
   * 💡 TIP: Use para instruções curtas e objetivas
   * 
   * @optional
   * @example "Use seu email corporativo"
   * @example "Formato: (XX) XXXXX-XXXX"
   */
  helperText?: string;

  /**
   * Se o campo está desabilitado. Aplica estilos visuais (opacity, cursor) no label
   * e injeta prop disabled no elemento filho.
   * 
   * ✅ MUST: Prop será automaticamente injetada no child via cloneElement
   * 
   * @optional
   * @default false
   * @example true
   */
  disabled?: boolean;

  /**
   * Campo de entrada (Input, Textarea, Select, etc).
   * 
   * ✅ MUST: Apenas 1 elemento filho (React.ReactElement)
   * ✅ MUST: Elemento deve aceitar props: id, aria-invalid, aria-describedby, aria-required
   * ❌ MUST NOT: Checkbox ou Radio isolados (considere layout="horizontal" para inline)
   * 
   * @required
   * @example <Input type="email" />
   * @example <Input {...register("name")} />
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
      disabled = false,
      size,
      layout,
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
      disabled: disabled || children.props.disabled,
      "aria-invalid": showError ? true : undefined,
      "aria-required": required ? true : undefined,
      "aria-describedby": ariaDescribedBy,
      // Spread original props do child por último para permitir override se necessário
      ...children.props,
    });

    // Layout horizontal precisa de wrapper para input + mensagens
    const isHorizontal = layout === "horizontal";

    return (
      <div
        ref={ref}
        className={cn(formFieldVariants({ size, layout }), className)}
        {...props}
      >
        {/* ================================================================
            LABEL
            ================================================================ */}
        <label
          htmlFor={fieldId}
          className={formFieldLabelVariants({ size, layout, disabled })}
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
            INPUT + MENSAGENS (wrapper para layout horizontal)
            ================================================================ */}
        {isHorizontal ? (
          <div className="flex-1 space-y-1">
            {enhancedChild}
            {/* Mensagens */}
            {showError && (
              <p
                id={errorId}
                role="alert"
                aria-live="polite"
                className={cn(
                  formFieldMessageVariants({ size, type: "error" }),
                  "animate-in fade-in-50 duration-200"
                )}
              >
                {error}
              </p>
            )}
            {showHelper && (
              <p
                id={helperId}
                className={formFieldMessageVariants({ size, type: "helper" })}
              >
                {helperText}
              </p>
            )}
          </div>
        ) : (
          <>
            {enhancedChild}
            {/* Mensagens (layout vertical) */}
            {showError && (
              <p
                id={errorId}
                role="alert"
                aria-live="polite"
                className={cn(
                  formFieldMessageVariants({ size, type: "error" }),
                  "animate-in fade-in-50 duration-200"
                )}
              >
                {error}
              </p>
            )}
            {showHelper && (
              <p
                id={helperId}
                className={formFieldMessageVariants({ size, type: "helper" })}
              >
                {helperText}
              </p>
            )}
          </>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
