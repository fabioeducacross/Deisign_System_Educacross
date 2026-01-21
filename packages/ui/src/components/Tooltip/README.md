# Tooltip Component

Componente de dica contextual que aparece ao passar o mouse sobre um elemento.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@fabioeducacross/ui";

export default function MyTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Passe o mouse</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Esta é uma dica útil</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## Props

### TooltipProvider

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `delayDuration` | `number` | `400` | Delay antes de mostrar (ms) |
| `skipDelayDuration` | `number` | `300` | Delay entre tooltips consecutivos (ms) |

### Tooltip

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | `boolean` | - | Estado aberto (controlado) |
| `defaultOpen` | `boolean` | `false` | Estado inicial (não controlado) |
| `onOpenChange` | `(open: boolean) => void` | - | Callback ao mudar estado |
| `delayDuration` | `number` | `400` | Delay específico deste tooltip |

### TooltipTrigger

| Prop | Tipo | Descrição |
|------|------|-----------|
| `asChild` | `boolean` | Passa props para filho ao invés de criar botão |

### TooltipContent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Posição do tooltip |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alinhamento no eixo |
| `sideOffset` | `number` | `4` | Distância do trigger (px) |
| `className` | `string` | - | Classes CSS adicionais |

## Posicionamento

### Top (Padrão)

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    <p>Tooltip acima</p>
  </TooltipContent>
</Tooltip>
```

### Bottom

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom">
    <p>Tooltip abaixo</p>
  </TooltipContent>
</Tooltip>
```

### Left

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover</Button>
  </TooltipTrigger>
  <TooltipContent side="left">
    <p>Tooltip à esquerda</p>
  </TooltipContent>
</Tooltip>
```

### Right

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover</Button>
  </TooltipTrigger>
  <TooltipContent side="right">
    <p>Tooltip à direita</p>
  </TooltipContent>
</Tooltip>
```

## Alinhamento

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom" align="start">
    <p>Alinhado ao início</p>
  </TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom" align="center">
    <p>Alinhado ao centro</p>
  </TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom" align="end">
    <p>Alinhado ao fim</p>
  </TooltipContent>
</Tooltip>
```

## Exemplos de Uso

### Tooltip em Botão de Ação

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Icons.Trash className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Excluir item</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Tooltip em Ícone Informativo

```tsx
<div className="flex items-center gap-2">
  <Label>Senha forte</Label>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Icons.Info className="h-4 w-4 text-muted-foreground cursor-help" />
      </TooltipTrigger>
      <TooltipContent>
        <p>Mínimo 8 caracteres, incluindo letras e números</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</div>
```

### Tooltip com Atalho de Teclado

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Salvar</Button>
    </TooltipTrigger>
    <TooltipContent>
      <div className="flex items-center gap-2">
        <span>Salvar documento</span>
        <kbd className="px-2 py-1 text-xs bg-muted rounded">Ctrl+S</kbd>
      </div>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Tooltip em Texto Truncado

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <p className="truncate w-48 cursor-help">
        Este é um texto muito longo que será truncado
      </p>
    </TooltipTrigger>
    <TooltipContent>
      <p>Este é um texto muito longo que será truncado</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Tooltip em Avatar

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Avatar className="cursor-pointer">
        <AvatarImage src="/user.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </TooltipTrigger>
    <TooltipContent>
      <div className="space-y-1">
        <p className="font-semibold">João da Silva</p>
        <p className="text-xs text-muted-foreground">joao@example.com</p>
        <p className="text-xs text-muted-foreground">Online</p>
      </div>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Tooltip em Badge de Status

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Badge variant="success" className="cursor-help">
        Ativo
      </Badge>
    </TooltipTrigger>
    <TooltipContent>
      <p>Último acesso: 2 minutos atrás</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Tooltip Controlado

```tsx
function ControlledTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="space-y-2">
        <Button onClick={() => setOpen(!open)} size="sm">
          {open ? "Ocultar" : "Mostrar"} Tooltip
        </Button>

        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <Button>Trigger</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tooltip controlado programaticamente</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

### Tooltip em Botões Desabilitados

```tsx
{/* Wrapper necessário porque elementos desabilitados não disparam eventos */}
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="inline-block">
        <Button disabled>Salvar</Button>
      </span>
    </TooltipTrigger>
    <TooltipContent>
      <p>Preencha todos os campos obrigatórios</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Tooltip com Rich Content

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Estatísticas</Button>
    </TooltipTrigger>
    <TooltipContent className="max-w-xs">
      <div className="space-y-2">
        <p className="font-semibold">Resumo Mensal</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Vendas:</p>
            <p className="font-medium">R$ 12.450</p>
          </div>
          <div>
            <p className="text-muted-foreground">Lucro:</p>
            <p className="font-medium text-green-600">+15%</p>
          </div>
        </div>
      </div>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Múltiplos Tooltips (Provider Global)

```tsx
function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <Icons.Home className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Início</p></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <Icons.User className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Perfil</p></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <Icons.Settings className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Configurações</p></TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

## Acessibilidade

O componente Tooltip segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Keyboard trigger**: Abre ao focar com `Tab`, fecha com `Esc`
- ✅ **ARIA completo**: `role="tooltip"`, `aria-describedby`
- ✅ **Conteúdo descritivo**: Não deve conter ações interativas
- ✅ **Delay adequado**: 400ms evita ativação acidental
- ✅ **Dismiss fácil**: Fecha ao mover mouse ou pressionar Esc

### Exemplo Acessível

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Editar documento"
      >
        <Icons.Edit className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent role="tooltip">
      <p>Editar documento (Ctrl+E)</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Boas Práticas

### ✅ Correto

```tsx
{/* Texto curto e descritivo */}
<TooltipContent>
  <p>Adicionar novo item</p>
</TooltipContent>

{/* Em ícones sem label visível */}
<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon" aria-label="Configurações">
      <Icons.Settings className="h-4 w-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent><p>Configurações</p></TooltipContent>
</Tooltip>

{/* Informação complementar */}
<Tooltip>
  <TooltipTrigger asChild>
    <Icons.Info className="h-4 w-4 cursor-help" />
  </TooltipTrigger>
  <TooltipContent>
    <p>Esta informação é opcional</p>
  </TooltipContent>
</Tooltip>
```

### ❌ Incorreto

```tsx
{/* Conteúdo interativo (usar Popover) */}
<TooltipContent>
  <Button>Clique aqui</Button>
</TooltipContent>

{/* Texto muito longo (usar Dialog) */}
<TooltipContent>
  <p>Lorem ipsum dolor sit amet consectetur adipiscing elit...</p>
</TooltipContent>

{/* Informação crítica (deve estar sempre visível) */}
<Tooltip>
  <TooltipTrigger><span>Campo obrigatório</span></TooltipTrigger>
  <TooltipContent><p>AVISO: Este campo é obrigatório</p></TooltipContent>
</Tooltip>
```

## Tooltip vs Popover

Use **Tooltip** quando:
- Texto curto e descritivo (1-2 linhas)
- Informação complementar não-crítica
- Hover/focus apenas (sem clique)
- Sem elementos interativos dentro

Use **Popover** quando:
- Conteúdo mais complexo
- Elementos interativos (botões, links)
- Precisa permanecer aberto após click
- Formulários ou listas

## Links

- [Storybook - Tooltip Stories](../../../../apps/storybook/stories/components/Tooltip.stories.tsx)
- [Código Fonte](./Tooltip.tsx)
- [Testes](./Tooltip.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos e comparação com Popover

### v0.1.1
- ✨ Lançamento inicial
- 🎯 4 posições (top, bottom, left, right)
- 🎯 3 alinhamentos (start, center, end)
- ⏱️ Delay configurável
- ⌨️ Suporte a teclado
- 🎬 Animações suaves
