# FormField — Molécula (Input Composto)

## 1. Resumo

**O que é:** Componente que agrupa Label + Input + Helper/Error para criar um campo de formulário completo e acessível.

**Quando usar:**
- ✅ Qualquer formulário que necessite validação
- ✅ Campos com mensagens de ajuda ou erro
- ✅ Quando precisar garantir associação label-input acessível

**Quando NÃO usar:**
- ❌ Campos inline muito simples (ex.: busca sem validação)
- ❌ Quando o layout precisa ser extremamente customizado

---

## 2. Anatomia

```tsx
<FormField>
  <Label>              {/* Obrigatório */}
  <Input>              {/* Componente do tipo campo */}
  <HelperText>         {/* Opcional - texto de ajuda */}
  <ErrorMessage>       {/* Condicional - erro de validação */}
</FormField>
```

**Estrutura visual:**

```
┌─────────────────────────────────────┐
│ Label *                             │  ← Obrigatório, com indicador *
├─────────────────────────────────────┤
│ [ Input field               ]       │  ← Foco, estados, validação
├─────────────────────────────────────┤
│ Helper text (opcional)              │  ← Muted, 12px
│ ❌ Error message (se houver erro)   │  ← Destructive, 12px, ícone
└─────────────────────────────────────┘
```

---

## 3. Estados & Variações

### **Estados de Interação**

| Estado | Aparência | Comportamento |
|--------|-----------|---------------|
| **Default** | Label normal, input com border padrão | Aguarda interação |
| **Hover** | Border do input escurece levemente | Indica interatividade |
| **Focus** | Ring azul (2px), label destacado | Usuário digitando |
| **Filled** | Input com texto, label permanece visível | Mostra valor preenchido |
| **Disabled** | Opacidade 50%, cursor not-allowed | Campo não editável |
| **ReadOnly** | Border tracejada, bg levemente cinza | Valor visível mas não editável |

### **Estados de Validação**

| Estado | Aparência | Quando |
|--------|-----------|--------|
| **Valid** | Border verde, ícone ✓ opcional | Após validação com sucesso |
| **Invalid** | Border vermelha, mensagem de erro | Após validação com falha |
| **Warning** | Border amarela, mensagem de alerta | Valor válido mas com ressalva |
| **Loading** | Spinner no canto direito | Validação assíncrona em progresso |

### **Variações de Tamanho**

```tsx
size: "sm" | "md" | "lg"

sm:  Label 12px, Input h-8,  Helper 11px
md:  Label 14px, Input h-10, Helper 12px  (default)
lg:  Label 16px, Input h-12, Helper 14px
```

### **Variações de Layout**

```tsx
layout: "vertical" | "horizontal"

vertical:   Label acima do input (padrão)
horizontal: Label à esquerda (grid 1:2 ou custom)
```

---

## 4. API de Props

### **FormField**

| Prop | Tipo | Default | Obrigatório | Descrição |
|------|------|---------|-------------|-----------|
| `label` | `string` | — | ✅ | Texto do label |
| `id` | `string` | auto-generated | ❌ | ID do input (para acessibilidade) |
| `required` | `boolean` | `false` | ❌ | Exibe asterisco (*) e aria-required |
| `error` | `string` | `undefined` | ❌ | Mensagem de erro (se presente, campo inválido) |
| `helperText` | `string` | `undefined` | ❌ | Texto de ajuda abaixo do input |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | ❌ | Tamanho do conjunto |
| `layout` | `"vertical" \| "horizontal"` | `"vertical"` | ❌ | Orientação label-input |
| `disabled` | `boolean` | `false` | ❌ | Desabilita todo o campo |
| `loading` | `boolean` | `false` | ❌ | Mostra spinner (validação assíncrona) |
| `className` | `string` | `""` | ❌ | Classes adicionais no container |

### **Composição com Input**

```tsx
<FormField label="Email" required error={errors.email}>
  <Input 
    type="email" 
    placeholder="seu@email.com"
    {...register("email")}
  />
</FormField>
```

---

## 5. Acessibilidade

### **Estrutura Semântica**

```tsx
<div className="form-field">
  <label htmlFor={id} {...(required && { "aria-required": true })}>
    {label} {required && <span aria-hidden="true">*</span>}
  </label>
  
  <input
    id={id}
    aria-invalid={!!error}
    aria-describedby={helperTextId || errorId}
    {...props}
  />
  
  {helperText && !error && (
    <p id={helperTextId} className="helper-text">
      {helperText}
    </p>
  )}
  
  {error && (
    <p id={errorId} role="alert" className="error-message">
      <AlertCircle size={12} aria-hidden="true" />
      {error}
    </p>
  )}
</div>
```

### **Regras Obrigatórias**

- ✅ **Label sempre visível** (nunca usar placeholder como substituto)
- ✅ **Associação via `for` + `id`** (ou wrapping implícito)
- ✅ **`aria-required`** quando `required={true}`
- ✅ **`aria-invalid`** quando `error` presente
- ✅ **`aria-describedby`** apontando para helper ou erro
- ✅ **`role="alert"`** no erro para anúncio imediato por leitores de tela
- ✅ **Contraste mínimo** 4.5:1 em label e erro
- ✅ **Foco visível** com ring de 2px

### **Navegação por Teclado**

| Tecla | Ação |
|-------|------|
| **Tab** | Move foco para o input |
| **Shift+Tab** | Move foco para campo anterior |
| **Enter** | Submete formulário (se dentro de `<form>`) |
| **Esc** | Limpa campo (opcional, depende do tipo) |

---

## 6. Práticas Recomendadas

### **✅ DO (Faça)**

1. **Use labels descritivos** — "Endereço de e-mail" em vez de "E-mail"
2. **Mensagens de erro humanas** — "Digite um e-mail válido (ex: nome@email.com)" em vez de "Invalid email format"
3. **Helper text preventivo** — "Mínimo 8 caracteres" ajuda antes do erro
4. **Validação inline após blur** — Evita interromper digitação, mas dá feedback rápido
5. **Preservar valor em caso de erro** — Não limpar o campo quando houver erro

### **❌ DON'T (Evite)**

1. ❌ **Placeholder como label** — Acessibilidade ruim, confunde usuários
2. ❌ **Validação em tempo real agressiva** — Causa frustração durante digitação
3. ❌ **Erros vagos** — "Erro no campo" não ajuda o usuário
4. ❌ **Cores como único indicador** — Sempre combine com ícone/texto
5. ❌ **Desabilitar copiar/colar em campos** — Má UX e segurança questionável

---

## 7. Exemplos de Uso

### **Exemplo 1: Campo de E-mail com Validação**

```tsx
import { FormField, Input } from "@fabioeducacross/ui";
import { useForm } from "react-hook-form";

function LoginForm() {
  const { register, formState: { errors } } = useForm();
  
  return (
    <form>
      <FormField
        label="E-mail"
        required
        error={errors.email?.message}
        helperText="Usaremos para recuperação de senha"
      >
        <Input
          type="email"
          placeholder="seu@email.com"
          {...register("email", {
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Digite um e-mail válido"
            }
          })}
        />
      </FormField>
    </form>
  );
}
```

### **Exemplo 2: Campo de Senha com Força**

```tsx
<FormField
  label="Senha"
  required
  error={errors.password?.message}
  helperText={
    <PasswordStrength value={watch("password")} />
  }
>
  <Input
    type="password"
    placeholder="Mínimo 8 caracteres"
    {...register("password", {
      minLength: {
        value: 8,
        message: "A senha deve ter pelo menos 8 caracteres"
      }
    })}
  />
</FormField>
```

### **Exemplo 3: Campo Horizontal (Admin)**

```tsx
<FormField
  label="Código da Escola"
  layout="horizontal"
  size="sm"
  required
  error={errors.schoolCode?.message}
>
  <Input
    placeholder="Ex: EDC-2024-001"
    maxLength={15}
    {...register("schoolCode")}
  />
</FormField>
```

### **Exemplo 4: Campo com Validação Assíncrona**

```tsx
const [isCheckingEmail, setIsCheckingEmail] = useState(false);

<FormField
  label="E-mail"
  required
  loading={isCheckingEmail}
  error={errors.email?.message}
>
  <Input
    type="email"
    onBlur={async (e) => {
      setIsCheckingEmail(true);
      const available = await checkEmailAvailability(e.target.value);
      setIsCheckingEmail(false);
      if (!available) {
        setError("email", { message: "Este e-mail já está em uso" });
      }
    }}
    {...register("email")}
  />
</FormField>
```

---

## 8. Responsividade

### **Mobile (<640px)**

- Layout sempre `vertical` (forçar, mesmo se prop `horizontal`)
- Label com `font-size: 14px` (legibilidade em telas pequenas)
- Input com `min-height: 44px` (área de toque adequada)
- Error/helper com `font-size: 12px`

### **Tablet (640-1024px)**

- Layout respeita prop (vertical ou horizontal)
- Horizontal usa grid `grid-cols-[200px_1fr]`
- Espaçamento entre campos: `space-y-4`

### **Desktop (>1024px)**

- Layout horizontal pode usar `grid-cols-[150px_1fr]` ou `grid-cols-[1fr_2fr]`
- Formulários multi-coluna suportados (`grid-cols-2` no container pai)
- Espaçamento entre campos: `space-y-6`

---

## 9. Conteúdo & Microcopy

### **Labels**

| Ruim ❌ | Bom ✅ |
|---------|--------|
| Nome | Nome completo do aluno |
| Email | Endereço de e-mail |
| Senha | Senha (mínimo 8 caracteres) |
| Data | Data de nascimento |

### **Helper Text**

- **Formato esperado:** "Ex: (11) 98765-4321"
- **Limite de caracteres:** "Máximo 200 caracteres"
- **Privacidade:** "Não compartilhamos seu e-mail com terceiros"
- **Dica de uso:** "Use uma senha diferente das redes sociais"

### **Mensagens de Erro**

| Ruim ❌ | Bom ✅ |
|---------|--------|
| Campo obrigatório | Por favor, preencha seu nome completo |
| Formato inválido | Digite um e-mail válido (ex: nome@email.com) |
| Senha fraca | A senha deve ter pelo menos 8 caracteres, incluindo letras e números |
| Erro no servidor | Não foi possível salvar. Tente novamente em alguns instantes |

### **Tom de Voz**

- **Educacional:** Ensine o usuário em vez de apenas avisar erro
- **Amigável:** Use "Por favor" e "Obrigado" quando apropriado
- **Claro:** Evite jargões técnicos para público leigo
- **Acionável:** Sempre diga o que fazer ("Digite..." em vez de "não pode ser vazio")

---

## 10. Relação no Atomic Design

```
FormField (MOLÉCULA)
├── Label (ÁTOMO)
├── Input (ÁTOMO)
├── HelperText (ÁTOMO)
└── ErrorMessage (ÁTOMO)

Usado em:
├── LoginForm (ORGANISMO)
├── RegistrationForm (ORGANISMO)
├── ProfileEditForm (ORGANISMO)
└── AdminConfigForm (ORGANISMO)
```

---

## 11. Checklist de Validação

### **Acessibilidade**

- [x] Label visível e associado ao input via `htmlFor` + `id`
- [x] `aria-required` quando `required={true}`
- [x] `aria-invalid` quando `error` presente
- [x] `aria-describedby` aponta para helper ou erro
- [x] `role="alert"` no erro para anúncio imediato
- [x] Contraste mínimo 4.5:1 em texto e 3:1 em bordas
- [x] Foco visível com ring de 2px
- [x] Navegável por teclado (Tab/Shift+Tab)

### **Consistência Visual**

- [x] Usa tokens de cor, tipografia e espaçamento
- [x] Estados visuais distinguíveis (hover, focus, error)
- [x] Raio de borda consistente com Design System
- [x] Ícones de erro/sucesso padronizados

### **Conteúdo & UX**

- [x] Labels claros e descritivos
- [x] Mensagens de erro humanas e acionáveis
- [x] Helper text preventivo quando apropriado
- [x] Placeholder não substitui label
- [x] Validação após blur (não durante digitação)

### **Dev & Escalabilidade**

- [x] API simples e previsível
- [x] Props de tamanho padronizadas (sm/md/lg)
- [x] Suporta composição com qualquer input-like component
- [x] TypeScript types completos
- [x] Testável (queries por role/label)

---

## 12. Implementação (Referência)

```tsx
// packages/ui/src/components/FormField/FormField.tsx
import React, { useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle, Loader2 } from "react-feather";
import { cn } from "../../utils";

const formFieldVariants = cva("space-y-2", {
  variants: {
    layout: {
      vertical: "",
      horizontal: "grid grid-cols-[150px_1fr] gap-4 items-start",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    layout: "vertical",
    size: "md",
  },
});

export interface FormFieldProps extends VariantProps<typeof formFieldVariants> {
  label: string;
  id?: string;
  required?: boolean;
  error?: string;
  helperText?: string | React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children: React.ReactElement;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      id: providedId,
      required,
      error,
      helperText,
      disabled,
      loading,
      layout,
      size,
      className,
      children,
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperTextId = `${id}-helper`;
    const errorId = `${id}-error`;

    // Clone child (Input) with necessary props
    const input = React.cloneElement(children, {
      id,
      disabled: disabled || loading,
      "aria-invalid": !!error,
      "aria-describedby": error ? errorId : helperText ? helperTextId : undefined,
      ...(required && { "aria-required": true }),
    });

    return (
      <div ref={ref} className={cn(formFieldVariants({ layout, size }), className)}>
        <label
          htmlFor={id}
          className={cn(
            "block font-medium text-foreground",
            layout === "horizontal" && "pt-2"
          )}
        >
          {label}
          {required && (
            <span className="ml-1 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <div className="relative">
          {input}
          
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 size={16} className="animate-spin text-muted-foreground" />
            </div>
          )}
        </div>

        {helperText && !error && (
          <p id={helperTextId} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            role="alert"
            className="flex items-center gap-1 text-xs text-destructive"
          >
            <AlertCircle size={12} aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
```

---

## 13. Próximos Passos

1. ✅ Implementar `FormField` no pacote UI
2. ⏳ Criar testes unitários (rendering, a11y, validação)
3. ⏳ Documentar no Storybook com controles interativos
4. ⏳ Criar variantes especializadas:
   - `TextAreaField` (textarea + label + error)
   - `SelectField` (select + label + error)
   - `CheckboxField` (checkbox + label inline)
5. ⏳ Integrar com React Hook Form em exemplos
6. ⏳ Adicionar suporte a máscaras de input (CPF, CEP, telefone)
