# Quickstart: @educacross/ui

Guia rápido para começar a usar o Design System Educacross.

## Instalação

```bash
# Com pnpm (recomendado)
pnpm add @educacross/ui

# Com npm
npm install @educacross/ui

# Com yarn
yarn add @educacross/ui
```

## Peer Dependencies

O pacote requer React 18+:

```bash
pnpm add react react-dom
```

## Configuração

### 1. Configurar Tailwind CSS

Crie ou atualize seu `tailwind.config.js`:

```js
import educacrossPreset from "@educacross/ui/tailwind-preset";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [educacrossPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Incluir componentes do Design System
    "./node_modules/@educacross/ui/dist/**/*.{js,mjs}",
  ],
};
```

### 2. Importar Estilos

No seu arquivo de entrada (ex: `main.tsx`, `layout.tsx`, `globals.css`):

```tsx
import "@educacross/ui/styles.css";
```

Ou no CSS:

```css
@import "@educacross/ui/styles.css";
```

### 3. Usar Componentes

```tsx
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent } from "@educacross/ui";

function LoginForm() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="seu@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full">Entrar</Button>
      </CardContent>
    </Card>
  );
}
```

## Componentes Disponíveis

### Core (P1)
- `Button` - Botão com variantes (default, secondary, destructive, outline, ghost, link)
- `Input` - Campo de entrada de texto
- `Label` - Rótulo para formulários

### Data Display (P2)
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Badge` - Labels de status
- `Avatar`, `AvatarImage`, `AvatarFallback`
- `Checkbox`
- `RadioGroup`, `RadioGroupItem`
- `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`
- `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`
- `Alert`, `AlertTitle`, `AlertDescription`
- `ToastProvider`, `Toast`, `ToastTitle`, `ToastDescription`, `useToast`

### Advanced (P3)
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
- `Tooltip`, `TooltipProvider`, `TooltipTrigger`, `TooltipContent`
- `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`
- `Popover`, `PopoverTrigger`, `PopoverContent`
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`
- `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`
- `Skeleton`, `SkeletonText`, `SkeletonCircle`, `SkeletonCard`

### Icons
- `Icon` - Wrapper para Feather Icons com variantes
- Todos os ícones Feather também são exportados diretamente

## Exemplos de Uso

### Button com Ícone

```tsx
import { Button, Icon } from "@educacross/ui";

<Button>
  <Icon name="Plus" className="mr-2" size="sm" />
  Adicionar Item
</Button>

<Button variant="destructive">
  <Icon name="Trash2" className="mr-2" size="sm" />
  Excluir
</Button>
```

### Dialog (Modal)

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from "@educacross/ui";

<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmar ação</DialogTitle>
      <DialogDescription>
        Você tem certeza que deseja continuar?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancelar</Button>
      <Button>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Toast (Notificação)

```tsx
import { ToastProvider, useToast, Button } from "@educacross/ui";

function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );
}

function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: "Sucesso!",
          description: "Operação realizada com sucesso.",
          variant: "success",
        })
      }
    >
      Mostrar Toast
    </Button>
  );
}
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@educacross/ui";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Aba 1</TabsTrigger>
    <TabsTrigger value="tab2">Aba 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Conteúdo da aba 1</TabsContent>
  <TabsContent value="tab2">Conteúdo da aba 2</TabsContent>
</Tabs>
```

## Dark Mode

O Design System suporta dark mode automaticamente. Adicione a classe `.dark` ao elemento `<html>` ou `<body>`:

```tsx
// Exemplo com Next.js
<html className={isDark ? "dark" : ""}>
  {/* ... */}
</html>
```

Todos os tokens de cor se adaptam automaticamente.

## TypeScript

O pacote inclui tipos completos. Todas as props são tipadas:

```tsx
import type { ButtonProps, InputProps } from "@educacross/ui";

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Links

- [Storybook](http://localhost:6006) - Documentação interativa
- [GitHub](https://github.com/fabioeducacross/Deisign_System_Educacross) - Código fonte

---

**Versão**: 0.1.0 | **Última atualização**: 2026-01-05
