# Select Component

Componente dropdown para seleção única de opções em listas.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@fabioeducacross/ui";

export default function CountrySelector() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Selecione um país" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="br">Brasil</SelectItem>
        <SelectItem value="pt">Portugal</SelectItem>
        <SelectItem value="us">Estados Unidos</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

## Props

### Select

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `value` | `string` | - | Valor selecionado (controlado) |
| `defaultValue` | `string` | - | Valor inicial (não controlado) |
| `onValueChange` | `(value: string) => void` | - | Callback ao mudar seleção |
| `disabled` | `boolean` | `false` | Desabilita o select |
| `required` | `boolean` | `false` | Torna obrigatório |

### SelectTrigger

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `className` | `string` | - | Classes CSS adicionais |
| `variant` | `"default" \| "filled" \| "error"` | `"default"` | Estilo visual |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Tamanho do trigger |

### SelectValue

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `placeholder` | `string` | - | Texto quando vazio |

### SelectContent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `position` | `"item-aligned" \| "popper"` | `"item-aligned"` | Posicionamento |
| `className` | `string` | - | Classes CSS adicionais |

### SelectItem

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `value` | `string` | - | Valor do item (obrigatório) |
| `disabled` | `boolean` | `false` | Desabilita este item |
| `className` | `string` | - | Classes CSS adicionais |

## Variantes do Trigger

### Default (Com borda)
```tsx
<Select>
  <SelectTrigger variant="default" className="w-[200px]">
    <SelectValue placeholder="Selecione..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Opção 1</SelectItem>
    <SelectItem value="2">Opção 2</SelectItem>
  </SelectContent>
</Select>
```

### Filled (Com background)
```tsx
<Select>
  <SelectTrigger variant="filled" className="w-[200px]">
    <SelectValue placeholder="Selecione..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Opção 1</SelectItem>
    <SelectItem value="2">Opção 2</SelectItem>
  </SelectContent>
</Select>
```

### Error (Erro de validação)
```tsx
<Select>
  <SelectTrigger variant="error" className="w-[200px]">
    <SelectValue placeholder="Selecione..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Opção 1</SelectItem>
    <SelectItem value="2">Opção 2</SelectItem>
  </SelectContent>
</Select>
```

## Tamanhos

```tsx
<div className="space-y-2">
  <Select>
    <SelectTrigger size="sm" className="w-[180px]">
      <SelectValue placeholder="Pequeno" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">Pequeno</SelectItem>
    </SelectContent>
  </Select>

  <Select>
    <SelectTrigger size="default" className="w-[200px]">
      <SelectValue placeholder="Padrão" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">Padrão</SelectItem>
    </SelectContent>
  </Select>

  <Select>
    <SelectTrigger size="lg" className="w-[220px]">
      <SelectValue placeholder="Grande" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">Grande</SelectItem>
    </SelectContent>
  </Select>
</div>
```

## Exemplos de Uso

### Select com Label e Validação

```tsx
import { Label } from "@fabioeducacross/ui";

function LanguageSelector() {
  const [language, setLanguage] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="space-y-2">
      <Label htmlFor="language" required>
        Idioma preferido
      </Label>
      <Select
        value={language}
        onValueChange={(value) => {
          setLanguage(value);
          setError("");
        }}
      >
        <SelectTrigger
          id="language"
          variant={error ? "error" : "default"}
          className="w-full"
        >
          <SelectValue placeholder="Selecione um idioma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
          <SelectItem value="en-US">English (US)</SelectItem>
          <SelectItem value="es-ES">Español</SelectItem>
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
```

### Select com Ícones

```tsx
import { Icons } from "@fabioeducacross/ui";

<Select>
  <SelectTrigger className="w-[250px]">
    <SelectValue placeholder="Status do projeto" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="active">
      <div className="flex items-center gap-2">
        <Icons.CircleCheck className="h-4 w-4 text-success" />
        <span>Ativo</span>
      </div>
    </SelectItem>
    <SelectItem value="paused">
      <div className="flex items-center gap-2">
        <Icons.CirclePause className="h-4 w-4 text-warning" />
        <span>Pausado</span>
      </div>
    </SelectItem>
    <SelectItem value="archived">
      <div className="flex items-center gap-2">
        <Icons.Archive className="h-4 w-4 text-muted-foreground" />
        <span>Arquivado</span>
      </div>
    </SelectItem>
  </SelectContent>
</Select>
```

### Select com Agrupamento

```tsx
<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Escolha uma categoria" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Frutas</SelectLabel>
      <SelectItem value="apple">Maçã</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="orange">Laranja</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetais</SelectLabel>
      <SelectItem value="carrot">Cenoura</SelectItem>
      <SelectItem value="lettuce">Alface</SelectItem>
      <SelectItem value="tomato">Tomate</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Select com Busca Integrada

```tsx
function SearchableSelect() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const countries = [
    { value: "br", label: "Brasil" },
    { value: "us", label: "Estados Unidos" },
    { value: "pt", label: "Portugal" },
    { value: "fr", label: "França" },
    // ... mais países
  ];

  const filtered = countries.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Select open={open} onOpenChange={setOpen}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Selecione um país" />
      </SelectTrigger>
      <SelectContent>
        <div className="flex items-center border-b px-3">
          <Icons.Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Buscar país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {filtered.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            {country.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

### Select Desabilitado

```tsx
<Select disabled>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Indisponível" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Opção 1</SelectItem>
  </SelectContent>
</Select>
```

### Multi-Select (Simulado)

```tsx
function MultiSelectSimulated() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="space-y-2">
      <Label>Tecnologias (multi-seleção)</Label>
      <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
        {selected.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
            <button
              onClick={() => setSelected(selected.filter((t) => t !== tech))}
              className="ml-1 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        ))}
      </div>
      <Select
        value=""
        onValueChange={(value) => {
          if (!selected.includes(value)) {
            setSelected([...selected, value]);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Adicionar tecnologia..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="React">React</SelectItem>
          <SelectItem value="Vue">Vue</SelectItem>
          <SelectItem value="Angular">Angular</SelectItem>
          <SelectItem value="Svelte">Svelte</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

## Acessibilidade

O componente Select segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Navegação por teclado**: `Enter/Space` para abrir, `Arrow keys` para navegar, `Enter` para selecionar, `Escape` para fechar
- ✅ **Foco visível**: Anel de foco com `focus-visible:ring-2`
- ✅ **ARIA completo**: Usa `role="combobox"`, `aria-expanded`, `aria-controls`
- ✅ **Labels associados**: Sempre use `<Label htmlFor="id">`
- ✅ **Estados ARIA**: `aria-invalid`, `aria-required`, `aria-describedby`
- ✅ **Portal seguro**: Dropdown renderizado em portal para evitar overflow

### Exemplo Acessível com Validação

```tsx
<div className="space-y-2">
  <Label htmlFor="country" required>
    País de residência
  </Label>
  <Select
    value={country}
    onValueChange={(value) => {
      setCountry(value);
      setError("");
    }}
    required
  >
    <SelectTrigger
      id="country"
      variant={error ? "error" : "default"}
      className="w-full"
      aria-invalid={!!error}
      aria-describedby={error ? "country-error" : undefined}
    >
      <SelectValue placeholder="Selecione seu país" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="br">Brasil</SelectItem>
      <SelectItem value="pt">Portugal</SelectItem>
      <SelectItem value="us">Estados Unidos</SelectItem>
    </SelectContent>
  </Select>
  {error && (
    <p id="country-error" className="text-sm text-destructive" role="alert">
      {error}
    </p>
  )}
</div>
```

## Integração com React Hook Form

```tsx
import { useForm, Controller } from "react-hook-form";

function MyForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        name="priority"
        control={control}
        rules={{ required: "Selecione uma prioridade" }}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label htmlFor="priority" required>
              Prioridade
            </Label>
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="priority"
                variant={fieldState.error ? "error" : "default"}
                className="w-full"
              >
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

## Links

- [Storybook - Select Stories](../../../../apps/storybook/stories/components/Select.stories.tsx)
- [Código Fonte](./Select.tsx)
- [Testes](./Select.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos avançados (busca, multi-select simulado)

### v0.1.1
- ✨ Lançamento inicial baseado em Radix UI Select
- 🎨 Suporte a variantes e tamanhos
- 🔧 Props controlados e não controlados
