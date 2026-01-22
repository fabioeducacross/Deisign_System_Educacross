# FormField

> Componente molécula para campos de formulário completos e acessíveis

## Visão Geral

O `FormField` é um componente que encapsula a lógica de **Label + Input + Mensagens (erro/helper)**, seguindo padrões de acessibilidade WCAG 2.1 AA e facilitando a integração com React Hook Form.

### Features Principais

- ✅ **Geração automática de IDs** via `useId()`
- ✅ **Injeção automática de props de acessibilidade** (aria-\*) no child
- ✅ **Priorização de erro sobre helperText** (UX clara)
- ✅ **3 variants CVA**: size, layout, disabled
- ✅ **Compatível com React Hook Form** via spread operator
- ✅ **34 testes** com 100% de cobertura

---

## Instalação

```bash
pnpm add @fabioeducacross/ui
```

---

## Uso Básico

```tsx
import { FormField, Input } from "@fabioeducacross/ui";

function MyForm() {
  return (
    <FormField label="Email" required helperText="Use seu email corporativo">
      <Input type="email" placeholder="seu@email.com" />
    </FormField>
  );
}
```

---

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `label` | `string` | — | **Obrigatório**. Texto do label (sempre visível) |
| `id` | `string` | Auto-gerado | ID do campo (gerado via useId se omitido) |
| `required` | `boolean` | `false` | Marca campo como obrigatório (adiciona \* e aria-required) |
| `error` | `string` | — | Mensagem de erro (sobrescreve helperText) |
| `helperText` | `string` | — | Texto de ajuda (oculto quando há erro) |
| `disabled` | `boolean` | `false` | Estado desabilitado (aplica estilos e injeta no child) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamanho (afeta tipografia e espaçamentos) |
| `layout` | `"vertical" \| "horizontal"` | `"vertical"` | Orientação (label acima ou ao lado) |
| `children` | `React.ReactElement` | — | **Obrigatório**. Elemento de entrada (Input, etc) |
| `className` | `string` | — | Classes CSS adicionais para o wrapper |

---

## Variants

### Size (Tamanho)

Controla tipografia e espaçamentos:

```tsx
// Pequeno (compacto)
<FormField label="Código" size="sm">
  <Input />
</FormField>

// Médio (padrão)
<FormField label="Nome" size="md">
  <Input />
</FormField>

// Grande (destaque)
<FormField label="Título Principal" size="lg">
  <Input />
</FormField>
```

**Classes aplicadas:**
- `sm`: `space-y-1`, `text-xs`
- `md`: `space-y-2`, `text-sm`
- `lg`: `space-y-2.5`, `text-base`

### Layout (Orientação)

Define posição do label:

```tsx
// Vertical (padrão) - label acima
<FormField label="Email" layout="vertical">
  <Input />
</FormField>

// Horizontal - label ao lado (ideal para checkboxes)
<FormField label="" layout="horizontal" size="sm">
  <div className="flex items-center gap-2">
    <Checkbox id="terms" />
    <label htmlFor="terms">Aceito os termos</label>
  </div>
</FormField>
```

### Disabled (Desabilitado)

Aplica estilos visuais e injeta prop no child:

```tsx
<FormField label="Campo Desabilitado" disabled>
  <Input />
</FormField>
```

**Estilos aplicados:**
- Label: `cursor-not-allowed opacity-70`
- Child: `disabled={true}` injetado via cloneElement

---

## Integração com React Hook Form

### Exemplo Simples (Login)

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField, Input, Button } from "@fabioeducacross/ui";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // API call
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField 
        label="Email" 
        required 
        error={errors.email?.message}
      >
        <Input {...register("email")} type="email" />
      </FormField>

      <FormField 
        label="Senha" 
        required 
        error={errors.password?.message}
        helperText="Mínimo 8 caracteres"
      >
        <Input {...register("password")} type="password" />
      </FormField>

      <Button type="submit" disabled={isSubmitting}>
        Entrar
      </Button>
    </form>
  );
}
```

### Exemplo Avançado (Cadastro)

```tsx
const registrationSchema = z
  .object({
    fullName: z.string().min(3, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Aceite os termos" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nome com size lg para destaque */}
      <FormField label="Nome Completo" required size="lg" error={errors.fullName?.message}>
        <Input {...register("fullName")} />
      </FormField>

      {/* Grid 2 colunas */}
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Email" required error={errors.email?.message}>
          <Input {...register("email")} type="email" />
        </FormField>

        <FormField label="Telefone" error={errors.phone?.message}>
          <Input {...register("phone")} type="tel" />
        </FormField>
      </div>

      {/* Senhas */}
      <FormField label="Senha" required error={errors.password?.message}>
        <Input {...register("password")} type="password" />
      </FormField>

      <FormField label="Confirmar Senha" required error={errors.confirmPassword?.message}>
        <Input {...register("confirmPassword")} type="password" />
      </FormField>

      {/* Checkbox horizontal */}
      <FormField label="" layout="horizontal" size="sm" error={errors.terms?.message}>
        <div className="flex items-center gap-2">
          <Checkbox {...register("terms")} id="terms" />
          <label htmlFor="terms">Aceito os termos de uso</label>
        </div>
      </FormField>

      <Button type="submit">Cadastrar</Button>
    </form>
  );
}
```

---

## Acessibilidade (WCAG 2.1 AA)

O FormField implementa as seguintes práticas de acessibilidade:

### 1. Label Sempre Presente
- ✅ Label sempre visível (não apenas placeholder)
- ✅ Associação via `htmlFor`/`id`
- ✅ Asterisco (\*) visual para campos obrigatórios

### 2. ARIA Attributes
- `aria-required`: Adicionado quando `required={true}`
- `aria-invalid`: Adicionado quando há erro
- `aria-describedby`: Vincula mensagens ao input

### 3. Mensagens de Erro
- `role="alert"`: Anuncia erros para leitores de tela
- Cor semântica (`text-destructive`)
- Prioridade sobre helperText

### 4. Estados Visuais
- Focus visible: `focus-visible:ring-2`
- Disabled: `opacity-70` + `cursor-not-allowed`
- Transições suaves: `duration-200`

---

## Padrões de UX

### 1. Priorização de Mensagens
```tsx
// ✅ Correto: erro tem prioridade
<FormField label="Email" error="Email inválido" helperText="Use @empresa.com">
  <Input />
</FormField>
// Exibe: "Email inválido" (helperText oculto)

// ✅ Correto: helper quando não há erro
<FormField label="Email" helperText="Use @empresa.com">
  <Input />
</FormField>
// Exibe: "Use @empresa.com"
```

### 2. Layout Responsivo
```tsx
// Grid responsivo (1 col mobile, 2 cols desktop)
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <FormField label="Nome">
    <Input />
  </FormField>
  <FormField label="Sobrenome">
    <Input />
  </FormField>
</div>
```

### 3. Campos Obrigatórios
```tsx
// ✅ Correto: use a prop required
<FormField label="Email" required>
  <Input />
</FormField>

// ❌ Errado: não adicione asterisco manualmente
<FormField label="Email *">
  <Input />
</FormField>
```

---

## Troubleshooting

### Problema: Child não recebe props injetadas

**Causa:** Child não é um `ReactElement` ou não aceita props padrão HTML.

**Solução:** Certifique-se de que o child é um componente React válido:

```tsx
// ✅ Correto
<FormField label="Nome">
  <Input />
</FormField>

// ❌ Errado: string não é ReactElement
<FormField label="Nome">
  Nome do usuário
</FormField>

// ❌ Errado: múltiplos children
<FormField label="Nome">
  <Input />
  <Button>OK</Button>
</FormField>
```

### Problema: ID duplicado em formulários dinâmicos

**Causa:** IDs auto-gerados podem colidir em listas.

**Solução:** Forneça ID explícito em arrays:

```tsx
{items.map((item, index) => (
  <FormField 
    key={item.id} 
    label={item.label} 
    id={`field-${item.id}`} // ID explícito
  >
    <Input />
  </FormField>
))}
```

---

## Arquitetura

### Atomic Design Level
**Molécula** (combina Label + Input + Text)

### Dependências
- `react` (peer)
- `class-variance-authority` (variants)
- `@fabioeducacross/ui/utils` (cn helper)

### Exports
```tsx
export { FormField } from "./FormField";
export { formFieldVariants } from "./FormField";
export { formFieldLabelVariants } from "./FormField";
export { formFieldMessageVariants } from "./FormField";
export type { FormFieldProps } from "./FormField";
```

---

## Testing

O componente possui **34 testes** cobrindo:

1. Renderização básica (3 testes)
2. Campos obrigatórios (3 testes)
3. Mensagens de erro (4 testes)
4. Helper text (3 testes)
5. Acessibilidade (3 testes)
6. CloneElement (3 testes)
7. Classes customizadas (1 teste)
8. Props HTML (1 teste)
9. **Variants - Size** (4 testes)
10. **Variants - Layout** (4 testes)
11. **Variants - Disabled** (3 testes)
12. **Variants - Combinações** (2 testes)

Execute os testes:

```bash
pnpm test FormField
```

---

## Storybook

Veja exemplos interativos em:

```bash
pnpm storybook
```

**Stories disponíveis:**
- `Patterns/Form Field/React Hook Form Login` - Formulário simples
- `Patterns/Form Field/React Hook Form Registration` - Formulário avançado

---

## Changelog

### v0.2.0 (2026-01-22)

**Features**
- ✨ Componente FormField com CVA variants
- ✨ Integração React Hook Form + Zod
- ✨ 34 testes (100% cobertura)
- ✨ Exemplos LoginForm e RegistrationForm
- ✨ Stories Storybook com documentação

**Variants**
- `size`: sm/md/lg
- `layout`: vertical/horizontal
- `disabled`: estado desabilitado

---

## Contribuindo

Veja [CONTRIBUTING.md](../../../CONTRIBUTING.md) para diretrizes.

---

## Licença

MIT © Educacross
