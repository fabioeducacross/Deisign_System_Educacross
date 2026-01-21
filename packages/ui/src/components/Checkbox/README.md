# Checkbox Component

Componente de caixa de seleção (checkbox) acessível com variantes e tamanhos.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Checkbox, Label } from "@fabioeducacross/ui";

export default function TermsAcceptance() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Aceito os termos e condições</Label>
    </div>
  );
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Tamanho do checkbox |
| `variant` | `"default" \| "error"` | `"default"` | Estilo visual |
| `checked` | `boolean \| "indeterminate"` | - | Estado controlado |
| `onCheckedChange` | `(checked: boolean) => void` | - | Callback ao mudar estado |
| `disabled` | `boolean` | `false` | Desabilita o checkbox |
| `...props` | Props HTML do input | - | Props nativas |

## Variantes

### Variant: Default (Roxo)
```tsx
<Checkbox id="option1" />
<Label htmlFor="option1">Opção padrão</Label>
```

### Variant: Error (Vermelho)
```tsx
<Checkbox id="option2" variant="error" />
<Label htmlFor="option2" variant="error">Campo obrigatório</Label>
```

## Tamanhos

### Small
```tsx
<Checkbox id="small" size="sm" />
<Label htmlFor="small" className="text-sm">Pequeno</Label>
```

### Default
```tsx
<Checkbox id="default" size="default" />
<Label htmlFor="default">Padrão</Label>
```

### Large
```tsx
<Checkbox id="large" size="lg" />
<Label htmlFor="large" className="text-lg">Grande</Label>
```

## Estado Indeterminado

```tsx
const [checkedItems, setCheckedItems] = useState([false, false, false]);
const allChecked = checkedItems.every(Boolean);
const someChecked = checkedItems.some(Boolean);

<div className="space-y-2">
  <div className="flex items-center space-x-2">
    <Checkbox
      id="select-all"
      checked={allChecked ? true : someChecked ? "indeterminate" : false}
      onCheckedChange={(checked) => {
        setCheckedItems(checkedItems.map(() => checked === true));
      }}
    />
    <Label htmlFor="select-all" className="font-semibold">
      Selecionar todos
    </Label>
  </div>

  <div className="ml-6 space-y-2">
    {checkedItems.map((checked, i) => (
      <div key={i} className="flex items-center space-x-2">
        <Checkbox
          id={`item-${i}`}
          checked={checked}
          onCheckedChange={(newChecked) => {
            const updated = [...checkedItems];
            updated[i] = newChecked === true;
            setCheckedItems(updated);
          }}
        />
        <Label htmlFor={`item-${i}`}>Item {i + 1}</Label>
      </div>
    ))}
  </div>
</div>
```

## Exemplos de Uso

### Formulário de Preferências

```tsx
function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    newsletter: false,
    updates: false,
    marketing: false,
  });

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">Notificações</Label>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="newsletter"
          checked={preferences.newsletter}
          onCheckedChange={(checked) =>
            setPreferences({ ...preferences, newsletter: checked === true })
          }
        />
        <Label htmlFor="newsletter">Newsletter semanal</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="updates"
          checked={preferences.updates}
          onCheckedChange={(checked) =>
            setPreferences({ ...preferences, updates: checked === true })
          }
        />
        <Label htmlFor="updates">Atualizações de produto</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="marketing"
          checked={preferences.marketing}
          onCheckedChange={(checked) =>
            setPreferences({ ...preferences, marketing: checked === true })
          }
        />
        <Label htmlFor="marketing">Ofertas e promoções</Label>
      </div>
    </div>
  );
}
```

### Checkbox com Descrição

```tsx
<div className="flex items-start space-x-3">
  <Checkbox id="terms" className="mt-1" />
  <div className="space-y-1">
    <Label htmlFor="terms" className="font-medium">
      Aceito os termos e condições
    </Label>
    <p className="text-sm text-muted-foreground">
      Você concorda com nossos Termos de Serviço e Política de Privacidade.
    </p>
  </div>
</div>
```

### Checkbox Desabilitado

```tsx
<div className="space-y-2">
  <div className="flex items-center space-x-2">
    <Checkbox id="disabled-unchecked" disabled />
    <Label htmlFor="disabled-unchecked">Desabilitado (desmarcado)</Label>
  </div>

  <div className="flex items-center space-x-2">
    <Checkbox id="disabled-checked" disabled checked />
    <Label htmlFor="disabled-checked">Desabilitado (marcado)</Label>
  </div>
</div>
```

## Acessibilidade

O componente Checkbox segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Navegação por teclado**: `Space` para marcar/desmarcar, `Tab` para navegar
- ✅ **Foco visível**: Anel de foco com `focus-visible:ring-2`
- ✅ **Labels associados**: Sempre use `<Label htmlFor="id">`
- ✅ **Estados ARIA**: `aria-checked`, `aria-disabled`, `aria-invalid`
- ✅ **Contraste**: Todas as variantes passam WCAG AA (3:1 para componentes de UI)

### Exemplo Acessível com Validação

```tsx
function TermsCheckbox() {
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!accepted) {
      setError("Você deve aceitar os termos para continuar");
      return;
    }
    // Prosseguir...
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={accepted}
          onCheckedChange={(checked) => {
            setAccepted(checked === true);
            setError("");
          }}
          variant={error ? "error" : "default"}
          aria-invalid={!!error}
          aria-describedby={error ? "terms-error" : undefined}
        />
        <Label 
          htmlFor="terms" 
          variant={error ? "error" : "default"}
          required
        >
          Aceito os termos e condições
        </Label>
      </div>
      {error && (
        <p id="terms-error" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
```

## Integração com React Hook Form

```tsx
import { useForm, Controller } from "react-hook-form";

function MyForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        name="terms"
        control={control}
        rules={{ required: "Você deve aceitar os termos" }}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={field.value}
                onCheckedChange={field.onChange}
                variant={fieldState.error ? "error" : "default"}
              />
              <Label htmlFor="terms" required>
                Aceito os termos
              </Label>
            </div>
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

- [Storybook - Checkbox Stories](../../../../apps/storybook/stories/components/Checkbox.stories.tsx)
- [Código Fonte](./Checkbox.tsx)
- [Testes](./Checkbox.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido

### v0.1.1
- ✨ Lançamento inicial com variantes e tamanhos
- 🎨 Suporte a estado indeterminado
