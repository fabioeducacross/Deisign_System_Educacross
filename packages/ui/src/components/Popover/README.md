# Popover Component

Componente de painel flutuante para exibir conteúdo interativo ao clicar em um trigger.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@fabioeducacross/ui";

export default function MyPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Abrir Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Título do Popover</h4>
          <p className="text-sm text-muted-foreground">
            Conteúdo interativo do popover.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Props

### Popover

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | `boolean` | - | Estado aberto (controlado) |
| `defaultOpen` | `boolean` | `false` | Estado inicial (não controlado) |
| `onOpenChange` | `(open: boolean) => void` | - | Callback ao mudar estado |
| `modal` | `boolean` | `false` | Se bloqueia interação com fundo |

### PopoverTrigger

| Prop | Tipo | Descrição |
|------|------|-----------|
| `asChild` | `boolean` | Passa props para filho ao invés de criar botão |

### PopoverContent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Posição do popover |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alinhamento no eixo |
| `sideOffset` | `number` | `4` | Distância do trigger (px) |
| `className` | `string` | - | Classes CSS adicionais |

## Posicionamento

### Bottom (Padrão)

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Abrir</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom">
    <p>Popover abaixo do trigger</p>
  </PopoverContent>
</Popover>
```

### Top

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Abrir</Button>
  </PopoverTrigger>
  <PopoverContent side="top">
    <p>Popover acima do trigger</p>
  </PopoverContent>
</Popover>
```

### Left / Right

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Abrir</Button>
  </PopoverTrigger>
  <PopoverContent side="left">
    <p>Popover à esquerda</p>
  </PopoverContent>
</Popover>
```

## Exemplos de Uso

### Popover com Formulário

```tsx
function DatePickerPopover() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {date ? format(date, "PPP") : "Selecione uma data"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
```

### Popover com Menu de Ações

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button size="icon" variant="ghost">
      <Icons.MoreVertical className="h-4 w-4" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-56">
    <div className="space-y-1">
      <Button variant="ghost" className="w-full justify-start">
        <Icons.Edit className="mr-2 h-4 w-4" />
        Editar
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <Icons.Copy className="mr-2 h-4 w-4" />
        Duplicar
      </Button>
      <Button variant="ghost" className="w-full justify-start text-destructive">
        <Icons.Trash className="mr-2 h-4 w-4" />
        Excluir
      </Button>
    </div>
  </PopoverContent>
</Popover>
```

### Popover com Filtros

```tsx
function FilterPopover() {
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Icons.Filter className="mr-2 h-4 w-4" />
          Filtros
          {filters.status.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {filters.status.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Status</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox id="active" />
                <Label htmlFor="active" className="ml-2">Ativo</Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="pending" />
                <Label htmlFor="pending" className="ml-2">Pendente</Label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Prioridade</h4>
            <RadioGroup>
              <div className="flex items-center space-x-2">
                <Radio value="high" id="high" />
                <Label htmlFor="high">Alta</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Radio value="medium" id="medium" />
                <Label htmlFor="medium">Média</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-2">
            <Button size="sm" className="flex-1">Aplicar</Button>
            <Button size="sm" variant="outline">Limpar</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

### Popover com Seletor de Cor

```tsx
function ColorPickerPopover() {
  const [color, setColor] = useState("#6E63E8");

  const colors = [
    "#6E63E8", "#EA5455", "#28C76F", "#FF9F43",
    "#00CFE8", "#7367F0", "#FF6B6B", "#4ECDC4",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: color }}
          />
          {color}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <h4 className="font-medium">Escolher cor</h4>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((c) => (
              <button
                key={c}
                className={cn(
                  "w-12 h-12 rounded-md border-2 transition-all",
                  color === c ? "border-primary scale-110" : "border-transparent"
                )}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
          <Input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#000000"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

### Popover Controlado

```tsx
function ControlledPopover() {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    // Processar dados
    setOpen(false); // Fechar após salvar
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>Configurações</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          <h4 className="font-medium">Configurações</h4>
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input placeholder="Digite o nome" />
          </div>
          <Button onClick={handleSave} className="w-full">
            Salvar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

### Popover com Share

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <Icons.Share className="mr-2 h-4 w-4" />
      Compartilhar
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-4">
      <h4 className="font-medium">Compartilhar este link</h4>
      <div className="flex gap-2">
        <Input value="https://example.com/item/123" readOnly />
        <Button size="icon" variant="outline">
          <Icons.Copy className="h-4 w-4" />
        </Button>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Ou compartilhar via:
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Icons.Mail className="mr-2 h-4 w-4" />
            E-mail
          </Button>
          <Button size="sm" variant="outline">
            <Icons.MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

### Popover com User Info

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Avatar className="cursor-pointer">
      <AvatarImage src="/user.jpg" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">João da Silva</p>
          <p className="text-sm text-muted-foreground">joao@example.com</p>
        </div>
      </div>
      <div className="grid gap-1">
        <Button variant="ghost" className="justify-start">
          <Icons.User className="mr-2 h-4 w-4" />
          Perfil
        </Button>
        <Button variant="ghost" className="justify-start">
          <Icons.Settings className="mr-2 h-4 w-4" />
          Configurações
        </Button>
        <Button variant="ghost" className="justify-start text-destructive">
          <Icons.LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

### Popover com Emoji Picker (Simulado)

```tsx
function EmojiPickerPopover() {
  const [selected, setSelected] = useState("😀");

  const emojis = ["😀", "😍", "🎉", "👍", "❤️", "🔥", "✨", "🚀"];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          {selected}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <h4 className="font-medium">Escolher emoji</h4>
          <div className="grid grid-cols-4 gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                className={cn(
                  "text-2xl p-2 rounded hover:bg-accent transition-colors",
                  selected === emoji && "bg-accent"
                )}
                onClick={() => setSelected(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Acessibilidade

O componente Popover segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Keyboard navigation**: Abre com `Enter/Space`, fecha com `Esc`
- ✅ **Focus trap**: Foco contido dentro do popover quando aberto
- ✅ **ARIA completo**: `role="dialog"`, `aria-haspopup`, `aria-expanded`
- ✅ **Click outside**: Fecha ao clicar fora
- ✅ **Restaura foco**: Retorna foco ao trigger ao fechar

### Exemplo Acessível

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      aria-haspopup="dialog"
      aria-label="Abrir menu de ações"
    >
      Ações
    </Button>
  </PopoverTrigger>
  <PopoverContent
    role="dialog"
    aria-label="Menu de ações"
  >
    <div className="space-y-2">
      <Button variant="ghost" className="w-full justify-start">
        Editar
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        Excluir
      </Button>
    </div>
  </PopoverContent>
</Popover>
```

## Popover vs Tooltip vs Dialog

| Característica | Popover | Tooltip | Dialog |
|----------------|---------|---------|--------|
| **Trigger** | Click | Hover/Focus | Click |
| **Conteúdo** | Interativo | Texto descritivo | Complexo |
| **Duração** | Até fechar | Temporário | Até fechar |
| **Backdrop** | Opcional | Não | Sim |
| **Tamanho** | Médio | Pequeno | Grande |

## Links

- [Storybook - Popover Stories](../../../../apps/storybook/stories/components/Popover.stories.tsx)
- [Código Fonte](./Popover.tsx)
- [Testes](./Popover.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos (filtros, color picker, share, emoji)

### v0.1.1
- ✨ Lançamento inicial
- 🎯 4 posições (top, bottom, left, right)
- 🎯 3 alinhamentos (start, center, end)
- ⌨️ Suporte a teclado e focus trap
- 🎬 Animações suaves
- 🔧 Controlado e não controlado
