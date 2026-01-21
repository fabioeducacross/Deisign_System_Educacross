# Label Component

Componente de rótulo para campos de formulário com indicador de obrigatoriedade.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Label, Input } from "@fabioeducacross/ui";

export default function FormField() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" />
    </div>
  );
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `"default" \| "error" \| "muted"` | `"default"` | Estilo visual do label |
| `required` | `boolean` | `false` | Mostra asterisco (*) de obrigatoriedade |
| `htmlFor` | `string` | - | ID do input associado (obrigatório para a11y) |
| `...props` | `React.LabelHTMLAttributes` | - | Props nativas do `<label>` |

## Variantes

### Variant: Default
Label padrão com cor foreground.

```tsx
<Label htmlFor="name">Nome</Label>
```

### Variant: Error
Label com cor de erro.

```tsx
<Label htmlFor="email" variant="error">
  Email inválido
</Label>
```

### Variant: Muted
Label com cor esmaecida (texto secundário).

```tsx
<Label htmlFor="bio" variant="muted">
  Biografia (opcional)
</Label>
```

## Required (Obrigatório)

Exibe asterisco vermelho para campos obrigatórios:

```tsx
<Label htmlFor="password" required>
  Senha
</Label>
{/* Renderiza: "Senha *" com asterisco vermelho */}
```

## Exemplos de Uso

### Formulário Completo

```tsx
export function SignupForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" required>Nome completo</Label>
        <Input id="name" placeholder="João Silva" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" required>Email</Label>
        <Input id="email" type="email" placeholder="você@exemplo.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" variant="muted">Biografia</Label>
        <textarea id="bio" className="..." />
      </div>
    </form>
  );
}
```

### Label com Validação

```tsx
const [email, setEmail] = useState("");
const [error, setError] = useState("");

<div className="space-y-2">
  <Label 
    htmlFor="email" 
    variant={error ? "error" : "default"}
    required
  >
    Email
  </Label>
  <Input
    id="email"
    type="email"
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
      setError(e.target.validity.valid ? "" : "Email inválido");
    }}
    error={!!error}
  />
  {error && <p className="text-sm text-destructive">{error}</p>}
</div>
```

### Label com Tooltip

```tsx
<div className="flex items-center gap-2">
  <Label htmlFor="api-key" required>API Key</Label>
  <Tooltip>
    <TooltipTrigger asChild>
      <InfoIcon className="h-4 w-4 text-muted-foreground" />
    </TooltipTrigger>
    <TooltipContent>
      <p>Sua chave de API encontra-se nas configurações</p>
    </TooltipContent>
  </Tooltip>
</div>
<Input id="api-key" type="password" />
```

### Label com Contador de Caracteres

```tsx
const [value, setValue] = useState("");
const maxLength = 100;

<div className="space-y-2">
  <div className="flex justify-between">
    <Label htmlFor="bio">Biografia</Label>
    <span className="text-xs text-muted-foreground">
      {value.length}/{maxLength}
    </span>
  </div>
  <textarea
    id="bio"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    maxLength={maxLength}
    className="..."
  />
</div>
```

## Acessibilidade

O componente Label segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **`htmlFor` obrigatório**: Sempre associe o label ao input via `htmlFor="id"`
- ✅ **Indicador de obrigatoriedade**: Asterisco (*) para campos `required`
- ✅ **Contraste adequado**: Todas as variantes passam WCAG AA (4.5:1)
- ✅ **peer-disabled**: Label se adapta quando input está desabilitado
- ✅ **Leitores de tela**: Associação correta entre label e input

### Boas Práticas

#### ✅ Correto
```tsx
<Label htmlFor="email" required>Email</Label>
<Input id="email" type="email" />
```

#### ❌ Incorreto
```tsx
{/* Falta htmlFor - não associa com input */}
<Label>Email</Label>
<Input id="email" type="email" />

{/* Placeholder não substitui label */}
<Input placeholder="Email" />
```

### Exemplo Completo Acessível

```tsx
<fieldset className="space-y-4">
  <legend className="text-lg font-semibold">Informações Pessoais</legend>
  
  <div className="space-y-2">
    <Label htmlFor="name" required>
      Nome completo
    </Label>
    <Input
      id="name"
      aria-required="true"
      placeholder="João Silva"
    />
  </div>

  <div className="space-y-2">
    <Label htmlFor="email" required>
      Email
    </Label>
    <Input
      id="email"
      type="email"
      aria-required="true"
      aria-describedby="email-help"
    />
    <p id="email-help" className="text-xs text-muted-foreground">
      Usaremos este email para contato
    </p>
  </div>
</fieldset>
```

## Links

- [Storybook - Label Stories](../../../../apps/storybook/stories/components/Label.stories.tsx)
- [Código Fonte](./Label.tsx)
- [Testes](./Label.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade com exemplos

### v0.1.1
- ✨ Lançamento inicial com 3 variantes
- 🎨 Suporte a required com asterisco vermelho
