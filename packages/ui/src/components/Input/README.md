# Input Component

Componente de campo de entrada de texto com variantes e estados.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Input, Label } from "@fabioeducacross/ui";

export default function LoginForm() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input 
        id="email" 
        type="email" 
        placeholder="você@exemplo.com" 
      />
    </div>
  );
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `"default" \| "filled" \| "error"` | `"default"` | Estilo visual do input |
| `inputSize` | `"default" \| "sm" \| "lg"` | `"default"` | Tamanho do input |
| `error` | `boolean` | `false` | Aplica estilo de erro |
| `disabled` | `boolean` | `false` | Desabilita o input |
| `...props` | `React.InputHTMLAttributes` | - | Props nativas do `<input>` |

## Variantes

### Variant: Default
Input padrão com borda.

```tsx
<Input placeholder="Digite aqui..." />
```

### Variant: Filled
Input com fundo preenchido.

```tsx
<Input variant="filled" placeholder="Campo preenchido" />
```

### Variant: Error
Input com estilo de erro.

```tsx
<Input variant="error" placeholder="Campo inválido" />
{/* ou */}
<Input error placeholder="Campo inválido" />
```

## Tamanhos

### Small (`inputSize="sm"`)
```tsx
<Input inputSize="sm" placeholder="Campo pequeno" />
```

### Default (`inputSize="default"`)
```tsx
<Input inputSize="default" placeholder="Campo padrão" />
```

### Large (`inputSize="lg"`)
```tsx
<Input inputSize="lg" placeholder="Campo grande" />
```

## Exemplos de Uso

### Input com Label

```tsx
<div className="space-y-2">
  <Label htmlFor="name">Nome completo</Label>
  <Input id="name" placeholder="João Silva" />
</div>
```

### Input com Validação

```tsx
const [email, setEmail] = useState("");
const [isValid, setIsValid] = useState(true);

<div className="space-y-2">
  <Label htmlFor="email" variant={isValid ? "default" : "error"}>
    Email
  </Label>
  <Input
    id="email"
    type="email"
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
      setIsValid(e.target.validity.valid);
    }}
    error={!isValid}
    placeholder="você@exemplo.com"
  />
  {!isValid && (
    <p className="text-sm text-destructive">Email inválido</p>
  )}
</div>
```

### Input com Ícone

```tsx
<div className="relative">
  <Input placeholder="Buscar..." className="pl-10" />
  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
</div>
```

### Input de Arquivo

```tsx
<Input 
  type="file" 
  accept=".pdf,.doc,.docx" 
  className="file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground"
/>
```

### Input Desabilitado

```tsx
<Input disabled placeholder="Campo desabilitado" />
```

## Acessibilidade

O componente Input segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Labels associados**: Sempre use `<Label htmlFor="id">` com `<Input id="id">`
- ✅ **Foco visível**: Anel de foco com `focus-visible:ring-2`
- ✅ **Estados claros**: Disabled, error e focus com indicadores visuais
- ✅ **Placeholder não substitui label**: Use sempre um `<Label>` visível
- ✅ **Mensagens de erro**: Use `aria-describedby` para associar mensagens de erro

### Exemplo Acessível Completo

```tsx
<div className="space-y-2">
  <Label htmlFor="password" required>
    Senha
  </Label>
  <Input
    id="password"
    type="password"
    aria-describedby={hasError ? "password-error" : undefined}
    aria-invalid={hasError}
    error={hasError}
    placeholder="Min. 8 caracteres"
  />
  {hasError && (
    <p id="password-error" className="text-sm text-destructive">
      A senha deve ter pelo menos 8 caracteres
    </p>
  )}
</div>
```

## Integração com React Hook Form

```tsx
import { useForm } from "react-hook-form";
import { Input, Label } from "@fabioeducacross/ui";

function MyForm() {
  const { register, formState: { errors } } = useForm();

  return (
    <div className="space-y-2">
      <Label htmlFor="email" required>Email</Label>
      <Input
        id="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        error={!!errors.email}
        placeholder="você@exemplo.com"
      />
    </div>
  );
}
```

## Links

- [Storybook - Input Stories](../../../../apps/storybook/stories/components/Input.stories.tsx)
- [Código Fonte](./Input.tsx)
- [Testes](./Input.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Melhorias de acessibilidade documentadas

### v0.1.1
- ✨ Lançamento inicial com 3 variantes
- 🎨 Suporte a variant, inputSize e error
