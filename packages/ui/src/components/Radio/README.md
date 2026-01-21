# Radio Component

Componente de botão de rádio (radio button) para seleção única em grupos.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Radio, RadioGroup, Label } from "@fabioeducacross/ui";

export default function PaymentMethod() {
  const [method, setMethod] = useState("credit");

  return (
    <RadioGroup value={method} onValueChange={setMethod}>
      <div className="flex items-center space-x-2">
        <Radio value="credit" id="credit" />
        <Label htmlFor="credit">Cartão de crédito</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Radio value="debit" id="debit" />
        <Label htmlFor="debit">Cartão de débito</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Radio value="pix" id="pix" />
        <Label htmlFor="pix">PIX</Label>
      </div>
    </RadioGroup>
  );
}
```

## Props

### RadioGroup

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `value` | `string` | - | Valor selecionado (controlado) |
| `defaultValue` | `string` | - | Valor inicial (não controlado) |
| `onValueChange` | `(value: string) => void` | - | Callback ao mudar seleção |
| `disabled` | `boolean` | `false` | Desabilita todo o grupo |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Orientação do grupo |

### Radio

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `value` | `string` | - | Valor único deste radio (obrigatório) |
| `id` | `string` | - | ID para associar com Label |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Tamanho do radio |
| `variant` | `"default" \| "error"` | `"default"` | Estilo visual |
| `disabled` | `boolean` | `false` | Desabilita este radio |

## Variantes

### Variant: Default (Roxo)
```tsx
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <Radio value="option1" id="r1" />
    <Label htmlFor="r1">Opção 1</Label>
  </div>
</RadioGroup>
```

### Variant: Error (Vermelho)
```tsx
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <Radio value="option1" id="r1" variant="error" />
    <Label htmlFor="r1" variant="error">Seleção inválida</Label>
  </div>
</RadioGroup>
```

## Tamanhos

```tsx
<RadioGroup defaultValue="default">
  <div className="flex items-center space-x-2">
    <Radio value="sm" id="small" size="sm" />
    <Label htmlFor="small" className="text-sm">Pequeno</Label>
  </div>

  <div className="flex items-center space-x-2">
    <Radio value="default" id="default" size="default" />
    <Label htmlFor="default">Padrão</Label>
  </div>

  <div className="flex items-center space-x-2">
    <Radio value="lg" id="large" size="lg" />
    <Label htmlFor="large" className="text-lg">Grande</Label>
  </div>
</RadioGroup>
```

## Orientações

### Vertical (Padrão)
```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <Radio value="1" id="v1" />
    <Label htmlFor="v1">Opção 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Radio value="2" id="v2" />
    <Label htmlFor="v2">Opção 2</Label>
  </div>
</RadioGroup>
```

### Horizontal
```tsx
<RadioGroup 
  value={value} 
  onValueChange={setValue} 
  orientation="horizontal"
  className="flex space-x-4"
>
  <div className="flex items-center space-x-2">
    <Radio value="1" id="h1" />
    <Label htmlFor="h1">Opção 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Radio value="2" id="h2" />
    <Label htmlFor="h2">Opção 2</Label>
  </div>
</RadioGroup>
```

## Exemplos de Uso

### Formulário de Seleção de Plano

```tsx
function PlanSelector() {
  const [plan, setPlan] = useState("pro");

  const plans = [
    { value: "free", label: "Gratuito", price: "R$ 0/mês" },
    { value: "pro", label: "Profissional", price: "R$ 29/mês" },
    { value: "enterprise", label: "Empresarial", price: "R$ 99/mês" },
  ];

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">Escolha seu plano</Label>
      <RadioGroup value={plan} onValueChange={setPlan}>
        {plans.map((p) => (
          <div key={p.value} className="flex items-start space-x-3">
            <Radio value={p.value} id={p.value} className="mt-1" />
            <div>
              <Label htmlFor={p.value} className="font-medium">
                {p.label}
              </Label>
              <p className="text-sm text-muted-foreground">{p.price}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
```

### Radio com Cards

```tsx
<RadioGroup value={selected} onValueChange={setSelected}>
  {options.map((option) => (
    <label
      key={option.value}
      htmlFor={option.value}
      className={cn(
        "flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-colors",
        selected === option.value
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      )}
    >
      <Radio value={option.value} id={option.value} />
      <div className="flex-1">
        <div className="font-medium">{option.label}</div>
        <div className="text-sm text-muted-foreground">
          {option.description}
        </div>
      </div>
    </label>
  ))}
</RadioGroup>
```

### Radio Desabilitado

```tsx
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <Radio value="option1" id="opt1" />
    <Label htmlFor="opt1">Disponível</Label>
  </div>

  <div className="flex items-center space-x-2">
    <Radio value="option2" id="opt2" disabled />
    <Label htmlFor="opt2">Indisponível</Label>
  </div>
</RadioGroup>
```

## Acessibilidade

O componente Radio segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Navegação por teclado**: `Arrow keys` para navegar, `Tab` para pular grupo
- ✅ **Foco visível**: Anel de foco com `focus-visible:ring-2`
- ✅ **RadioGroup semântico**: Usa `role="radiogroup"` e `role="radio"`
- ✅ **Labels associados**: Sempre use `<Label htmlFor="id">`
- ✅ **Estados ARIA**: `aria-checked`, `aria-disabled`, `aria-invalid`

### Exemplo Acessível Completo

```tsx
<fieldset className="space-y-3">
  <legend className="text-base font-semibold">
    Método de pagamento
    <span className="text-destructive ml-1">*</span>
  </legend>
  
  <RadioGroup
    value={method}
    onValueChange={(value) => {
      setMethod(value);
      setError("");
    }}
    aria-invalid={!!error}
    aria-describedby={error ? "payment-error" : undefined}
  >
    <div className="flex items-center space-x-2">
      <Radio value="credit" id="credit" />
      <Label htmlFor="credit">Cartão de crédito</Label>
    </div>

    <div className="flex items-center space-x-2">
      <Radio value="debit" id="debit" />
      <Label htmlFor="debit">Cartão de débito</Label>
    </div>

    <div className="flex items-center space-x-2">
      <Radio value="pix" id="pix" />
      <Label htmlFor="pix">PIX</Label>
    </div>
  </RadioGroup>

  {error && (
    <p id="payment-error" className="text-sm text-destructive">
      {error}
    </p>
  )}
</fieldset>
```

## Integração com React Hook Form

```tsx
import { useForm, Controller } from "react-hook-form";

function MyForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        name="plan"
        control={control}
        rules={{ required: "Selecione um plano" }}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label required>Plano</Label>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
            >
              <div className="flex items-center space-x-2">
                <Radio value="free" id="free" />
                <Label htmlFor="free">Gratuito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Radio value="pro" id="pro" />
                <Label htmlFor="pro">Profissional</Label>
              </div>
            </RadioGroup>
            {fieldState.error && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </form>
  );
}
```

## Links

- [Storybook - Radio Stories](../../../../apps/storybook/stories/components/Radio.stories.tsx)
- [Código Fonte](./Radio.tsx)
- [Testes](./Radio.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido

### v0.1.1
- ✨ Lançamento inicial com RadioGroup
- 🎨 Suporte a variantes e tamanhos
