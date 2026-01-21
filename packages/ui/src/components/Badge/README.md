# Badge Component

Componente de etiqueta para categorização e estados visuais.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Badge } from "@fabioeducacross/ui";

export default function MyBadge() {
  return <Badge>Novo</Badge>;
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline" \| "success" \| "warning" \| "info" \| "softPrimary" \| "softSecondary" \| "softDestructive" \| "softSuccess" \| "softWarning" \| "softInfo"` | `"default"` | Estilo visual do badge |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` | Tamanho do badge |
| `className` | `string` | - | Classes CSS adicionais |

## Variantes

### Variantes Sólidas

```tsx
<div className="flex gap-2">
  <Badge variant="default">Primário (#6E63E8)</Badge>
  <Badge variant="secondary">Secundário (#82868B)</Badge>
  <Badge variant="destructive">Erro (#EA5455)</Badge>
  <Badge variant="success">Sucesso (#28C76F)</Badge>
  <Badge variant="warning">Aviso (#FF9F43)</Badge>
  <Badge variant="info">Info (#00CFE8)</Badge>
  <Badge variant="outline">Outline</Badge>
</div>
```

### Variantes Soft (Fundo Claro)

```tsx
<div className="flex gap-2">
  <Badge variant="softPrimary">Soft Primário</Badge>
  <Badge variant="softSecondary">Soft Secundário</Badge>
  <Badge variant="softDestructive">Soft Erro</Badge>
  <Badge variant="softSuccess">Soft Sucesso</Badge>
  <Badge variant="softWarning">Soft Aviso</Badge>
  <Badge variant="softInfo">Soft Info</Badge>
</div>
```

## Tamanhos

```tsx
<div className="flex items-center gap-2">
  <Badge size="sm">Pequeno (10px)</Badge>
  <Badge size="default">Padrão (12px)</Badge>
  <Badge size="lg">Grande (14px)</Badge>
</div>
```

## Exemplos de Uso

### Badge com Ícone

```tsx
<Badge>
  <Icons.CheckCircle className="mr-1 h-3 w-3" />
  Ativo
</Badge>
```

### Badge de Status

```tsx
function StatusBadge({ status }: { status: string }) {
  const variants = {
    active: "success",
    pending: "warning",
    inactive: "secondary",
    error: "destructive",
  };

  return (
    <Badge variant={variants[status]}>
      {status === "active" && "Ativo"}
      {status === "pending" && "Pendente"}
      {status === "inactive" && "Inativo"}
      {status === "error" && "Erro"}
    </Badge>
  );
}
```

### Badge com Contador

```tsx
<Button variant="ghost" className="relative">
  <Icons.Bell className="h-5 w-5" />
  <Badge
    variant="destructive"
    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
  >
    3
  </Badge>
</Button>
```

### Badge em Tabela

```tsx
<Table>
  <TableBody>
    <TableRow>
      <TableCell>João Silva</TableCell>
      <TableCell>
        <Badge variant="success">Ativo</Badge>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Maria Costa</TableCell>
      <TableCell>
        <Badge variant="secondary">Inativo</Badge>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Badge Removível (Tag)

```tsx
function RemovableBadge({ label, onRemove }) {
  return (
    <Badge variant="secondary" className="gap-1">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 hover:text-destructive"
      >
        <Icons.X className="h-3 w-3" />
      </button>
    </Badge>
  );
}
```

### Badge de Categoria

```tsx
<Card>
  <CardHeader>
    <div className="flex items-start justify-between">
      <CardTitle>Artigo sobre React</CardTitle>
      <div className="flex gap-1">
        <Badge variant="softPrimary" size="sm">React</Badge>
        <Badge variant="softInfo" size="sm">Tutorial</Badge>
      </div>
    </div>
  </CardHeader>
  <CardContent>Conteúdo do artigo...</CardContent>
</Card>
```

### Badge Clicável (Link)

```tsx
<Badge
  variant="outline"
  className="cursor-pointer hover:bg-accent"
  onClick={() => navigate("/categoria/tech")}
>
  Tecnologia
</Badge>
```

### Badge com Tooltip

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Badge variant="warning">
        <Icons.AlertTriangle className="mr-1 h-3 w-3" />
        Atenção
      </Badge>
    </TooltipTrigger>
    <TooltipContent>
      <p>Este item requer aprovação</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Casos de Uso Comuns

### Status de Pedido

```tsx
function OrderStatus({ status }) {
  const statusConfig = {
    pending: { variant: "warning", label: "Aguardando" },
    processing: { variant: "info", label: "Processando" },
    shipped: { variant: "default", label: "Enviado" },
    delivered: { variant: "success", label: "Entregue" },
    cancelled: { variant: "destructive", label: "Cancelado" },
  };

  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
```

### Níveis de Prioridade

```tsx
function PriorityBadge({ priority }) {
  const priorities = {
    low: { variant: "softSecondary", label: "Baixa" },
    medium: { variant: "softWarning", label: "Média" },
    high: { variant: "softDestructive", label: "Alta" },
    urgent: { variant: "destructive", label: "Urgente" },
  };

  const config = priorities[priority];

  return (
    <Badge variant={config.variant} size="sm">
      {config.label}
    </Badge>
  );
}
```

### Tags Múltiplas

```tsx
function TagList({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="outline" size="sm">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
```

## Acessibilidade

O componente Badge segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Contraste**: Todas as variantes seguem contraste mínimo 4.5:1
- ✅ **Semântica**: Use ARIA quando necessário
- ✅ **Foco visível**: Badges clicáveis têm foco com `focus:ring-2`
- ✅ **Cores não exclusivas**: Sempre combine cor com texto/ícone

### Exemplo Acessível

```tsx
<Badge
  variant="destructive"
  role="status"
  aria-label="Status: Erro crítico"
>
  <Icons.AlertCircle className="mr-1 h-3 w-3" aria-hidden="true" />
  Erro
</Badge>
```

## Boas Práticas

### ✅ Correto

```tsx
// Usar variante apropriada para o contexto
<Badge variant="success">Aprovado</Badge>
<Badge variant="destructive">Rejeitado</Badge>

// Combinar cor com texto ou ícone
<Badge variant="warning">
  <Icons.AlertTriangle className="mr-1 h-3 w-3" />
  Atenção
</Badge>

// Tamanho apropriado para o contexto
<Badge size="sm">Tag</Badge> // Em listas densas
<Badge size="default">Status</Badge> // Uso geral
```

### ❌ Incorreto

```tsx
// Depender apenas de cor (inacessível)
<Badge variant="destructive" /> // Vazio, sem texto

// Texto muito longo (trunca visualmente)
<Badge>Este é um texto muito longo para um badge</Badge>

// Misturar muitas variantes (confuso)
<div>
  <Badge variant="success">A</Badge>
  <Badge variant="destructive">B</Badge>
  <Badge variant="warning">C</Badge>
  <Badge variant="info">D</Badge>
</div>
```

## Links

- [Storybook - Badge Stories](../../../../apps/storybook/stories/components/Badge.stories.tsx)
- [Código Fonte](./Badge.tsx)
- [Testes](./Badge.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos e casos de uso

### v0.1.1
- ✨ Lançamento inicial
- 🎨 13 variantes (7 sólidas + 6 soft + outline)
- 📏 3 tamanhos (sm, default, lg)
- 🌈 Cores do Design System (#6E63E8, #EA5455, #28C76F, #FF9F43, #00CFE8)
