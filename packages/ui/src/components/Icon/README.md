# Icon Component

Componente wrapper para biblioteca Feather Icons com variantes de tamanho e cor.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Icon } from "@fabioeducacross/ui";

export default function MyIcon() {
  return <Icon name="Check" />;
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `name` | `IconName` | - | Nome do ícone Feather (ex: "Check", "X", "Heart") |
| `size` | `"xs" \| "sm" \| "default" \| "md" \| "lg" \| "xl" \| "2xl"` | `"default"` | Tamanho do ícone |
| `variant` | `"default" \| "muted" \| "primary" \| "secondary" \| "destructive" \| "success" \| "warning"` | `"default"` | Cor do ícone |
| `pixelSize` | `number` | - | Tamanho customizado em pixels (sobrescreve `size`) |
| `strokeWidth` | `number` | `2` | Espessura do traço |
| `className` | `string` | - | Classes CSS adicionais |

## Tamanhos

```tsx
<div className="flex items-end gap-2">
  <Icon name="Heart" size="xs" />      {/* 12px (h-3) */}
  <Icon name="Heart" size="sm" />      {/* 16px (h-4) */}
  <Icon name="Heart" size="default" /> {/* 20px (h-5) */}
  <Icon name="Heart" size="md" />      {/* 24px (h-6) */}
  <Icon name="Heart" size="lg" />      {/* 32px (h-8) */}
  <Icon name="Heart" size="xl" />      {/* 40px (h-10) */}
  <Icon name="Heart" size="2xl" />     {/* 48px (h-12) */}
</div>
```

## Variantes de Cor

```tsx
<div className="flex gap-2">
  <Icon name="AlertCircle" variant="default" />     {/* text-current */}
  <Icon name="AlertCircle" variant="muted" />       {/* text-muted-foreground */}
  <Icon name="AlertCircle" variant="primary" />     {/* text-primary (#6E63E8) */}
  <Icon name="AlertCircle" variant="secondary" />   {/* text-secondary */}
  <Icon name="AlertCircle" variant="destructive" /> {/* text-destructive (#EA5455) */}
  <Icon name="AlertCircle" variant="success" />     {/* text-success (#28C76F) */}
  <Icon name="AlertCircle" variant="warning" />     {/* text-warning (#FF9F43) */}
</div>
```

## Ícones Disponíveis

O componente usa **180+ ícones** da biblioteca [Feather Icons](https://feathericons.com/):

```tsx
// Alguns exemplos populares:
<Icon name="Activity" />
<Icon name="AlertCircle" />
<Icon name="AlertTriangle" />
<Icon name="Archive" />
<Icon name="ArrowDown" />
<Icon name="ArrowLeft" />
<Icon name="ArrowRight" />
<Icon name="ArrowUp" />
<Icon name="Bell" />
<Icon name="Bookmark" />
<Icon name="Calendar" />
<Icon name="Camera" />
<Icon name="Check" />
<Icon name="CheckCircle" />
<Icon name="ChevronDown" />
<Icon name="ChevronLeft" />
<Icon name="ChevronRight" />
<Icon name="ChevronUp" />
<Icon name="Clock" />
<Icon name="Cloud" />
<Icon name="Copy" />
<Icon name="Download" />
<Icon name="Edit" />
<Icon name="Eye" />
<Icon name="EyeOff" />
<Icon name="File" />
<Icon name="FileText" />
<Icon name="Filter" />
<Icon name="Heart" />
<Icon name="Home" />
<Icon name="Image" />
<Icon name="Info" />
<Icon name="Lock" />
<Icon name="LogIn" />
<Icon name="LogOut" />
<Icon name="Mail" />
<Icon name="Map" />
<Icon name="MapPin" />
<Icon name="Menu" />
<Icon name="MessageCircle" />
<Icon name="MessageSquare" />
<Icon name="MoreHorizontal" />
<Icon name="MoreVertical" />
<Icon name="Paperclip" />
<Icon name="Phone" />
<Icon name="Plus" />
<Icon name="PlusCircle" />
<Icon name="Save" />
<Icon name="Search" />
<Icon name="Send" />
<Icon name="Settings" />
<Icon name="Share" />
<Icon name="Star" />
<Icon name="Trash" />
<Icon name="TrendingDown" />
<Icon name="TrendingUp" />
<Icon name="Upload" />
<Icon name="User" />
<Icon name="UserCheck" />
<Icon name="UserPlus" />
<Icon name="Users" />
<Icon name="X" />
<Icon name="XCircle" />
<Icon name="Zap" />
```

**Lista completa**: Veja [Feather Icons](https://feathericons.com/) ou importe `iconNames`:

```tsx
import { iconNames } from "@fabioeducacross/ui";
console.log(iconNames); // Array com todos os nomes
```

## Exemplos de Uso

### Ícone em Botão

```tsx
<Button>
  <Icon name="Download" size="sm" className="mr-2" />
  Baixar
</Button>
```

### Ícone com Tooltip

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button className="p-2 hover:bg-accent rounded-md">
        <Icon name="Info" size="sm" variant="muted" />
      </button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Mais informações</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Ícone de Status

```tsx
function StatusIcon({ status }: { status: "success" | "error" | "warning" }) {
  const config = {
    success: { name: "CheckCircle", variant: "success" },
    error: { name: "XCircle", variant: "destructive" },
    warning: { name: "AlertTriangle", variant: "warning" },
  };

  const { name, variant } = config[status];

  return <Icon name={name} variant={variant} />;
}
```

### Ícone Animado (Spin)

```tsx
<Icon
  name="RefreshCw"
  className="animate-spin"
/>
```

### Ícone com Badge

```tsx
<div className="relative inline-block">
  <Icon name="Bell" size="lg" />
  <Badge
    variant="destructive"
    className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
  >
    3
  </Badge>
</div>
```

### Lista com Ícones

```tsx
<ul className="space-y-2">
  <li className="flex items-center gap-2">
    <Icon name="Check" variant="success" size="sm" />
    <span>Tarefa concluída</span>
  </li>
  <li className="flex items-center gap-2">
    <Icon name="Clock" variant="warning" size="sm" />
    <span>Pendente</span>
  </li>
  <li className="flex items-center gap-2">
    <Icon name="X" variant="destructive" size="sm" />
    <span>Cancelada</span>
  </li>
</ul>
```

### Input com Ícone

```tsx
<div className="relative">
  <Icon
    name="Search"
    size="sm"
    variant="muted"
    className="absolute left-3 top-1/2 -translate-y-1/2"
  />
  <Input className="pl-10" placeholder="Buscar..." />
</div>
```

### Card com Ícone

```tsx
<Card>
  <CardHeader>
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-md bg-primary/10">
        <Icon name="TrendingUp" variant="primary" size="md" />
      </div>
      <div>
        <CardTitle>Crescimento</CardTitle>
        <p className="text-sm text-muted-foreground">+23% este mês</p>
      </div>
    </div>
  </CardHeader>
</Card>
```

### Tab com Ícone

```tsx
<Tabs defaultValue="home">
  <TabsList>
    <TabsTrigger value="home">
      <Icon name="Home" size="sm" className="mr-2" />
      Início
    </TabsTrigger>
    <TabsTrigger value="settings">
      <Icon name="Settings" size="sm" className="mr-2" />
      Configurações
    </TabsTrigger>
  </TabsList>
</Tabs>
```

## Casos de Uso Comuns

### Menu de Navegação

```tsx
function Navigation() {
  const menuItems = [
    { name: "Dashboard", icon: "Home" },
    { name: "Usuários", icon: "Users" },
    { name: "Relatórios", icon: "FileText" },
    { name: "Configurações", icon: "Settings" },
  ];

  return (
    <nav className="space-y-1">
      {menuItems.map((item) => (
        <a
          key={item.name}
          href={`/${item.name.toLowerCase()}`}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent"
        >
          <Icon name={item.icon} size="sm" />
          <span>{item.name}</span>
        </a>
      ))}
    </nav>
  );
}
```

### Feature Grid

```tsx
function Features() {
  const features = [
    { icon: "Zap", title: "Rápido", description: "Performance otimizada" },
    { icon: "Shield", title: "Seguro", description: "Criptografia end-to-end" },
    { icon: "Smartphone", title: "Responsivo", description: "Funciona em qualquer dispositivo" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {features.map((feature) => (
        <Card key={feature.title}>
          <CardContent className="pt-6 text-center">
            <Icon
              name={feature.icon}
              size="xl"
              variant="primary"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

## Acessibilidade

O componente Icon segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **aria-hidden**: Ícones decorativos devem ter `aria-hidden="true"`
- ✅ **aria-label**: Ícones funcionais (botões) precisam de label descritivo
- ✅ **Texto alternativo**: Sempre combine ícone com texto quando possível

### Exemplo Acessível

```tsx
// Ícone decorativo (com texto visível)
<Button>
  <Icon name="Download" size="sm" className="mr-2" aria-hidden="true" />
  Baixar
</Button>

// Ícone funcional (sem texto visível)
<Button variant="ghost" size="icon" aria-label="Fechar">
  <Icon name="X" />
</Button>
```

## Boas Práticas

### ✅ Correto

```tsx
// Usar tamanho apropriado para contexto
<Icon name="Check" size="sm" /> // Em texto inline
<Icon name="Heart" size="lg" /> // Em cards grandes

// Combinar com texto sempre que possível
<Button>
  <Icon name="Save" className="mr-2" />
  Salvar
</Button>

// aria-hidden para ícones decorativos
<Icon name="Star" aria-hidden="true" />
```

### ❌ Incorreto

```tsx
// Ícone sem texto E sem aria-label (inacessível)
<Button>
  <Icon name="X" />
</Button>

// Usar muitos tamanhos diferentes (inconsistente)
<Icon name="Check" pixelSize={23} />
<Icon name="X" pixelSize={19} />

// Cor hard-coded (não segue Design System)
<Icon name="Heart" className="text-red-500" />
// Use variant="destructive" em vez disso
```

## Links

- [Storybook - Icon Stories](../../../../apps/storybook/stories/foundations/Icons.stories.tsx)
- [Código Fonte](./Icon.tsx)
- [Testes](./Icon.test.tsx)
- [Feather Icons (Biblioteca)](https://feathericons.com/)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos (menu, features, status)

### v0.1.1
- ✨ Lançamento inicial
- 🎨 7 tamanhos (xs: 12px → 2xl: 48px)
- 🌈 7 variantes de cor (default, muted, primary, secondary, destructive, success, warning)
- 📦 180+ ícones da biblioteca Feather Icons
- 🔧 Props: pixelSize (custom), strokeWidth (espessura)
- ♿ Suporte a aria-hidden e aria-label
- 📋 Export `iconNames` para listar todos os ícones disponíveis
