# DropdownMenu Component

Componente de menu suspenso para ações e opções contextuais.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@fabioeducacross/ui";

export default function MyDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Abrir Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Configurações</DropdownMenuItem>
        <DropdownMenuItem>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Props

### DropdownMenu

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | `boolean` | - | Estado controlado do menu |
| `defaultOpen` | `boolean` | `false` | Estado inicial não controlado |
| `onOpenChange` | `(open: boolean) => void` | - | Callback ao abrir/fechar |

### DropdownMenuContent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Posição relativa ao trigger |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alinhamento no eixo cruzado |
| `sideOffset` | `number` | `4` | Distância do trigger (px) |
| `className` | `string` | - | Classes CSS adicionais |

### DropdownMenuItem

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `disabled` | `boolean` | `false` | Desabilita a interação |
| `onSelect` | `() => void` | - | Callback ao selecionar item |
| `className` | `string` | - | Classes CSS adicionais |

## Exemplos de Uso

### Menu com Ícones

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      <Icons.MoreVertical className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <Icons.User className="mr-2 h-4 w-4" />
      Perfil
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Icons.Settings className="mr-2 h-4 w-4" />
      Configurações
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Icons.LogOut className="mr-2 h-4 w-4" />
      Sair
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Menu com Atalhos de Teclado

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>Editar</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <span>Copiar</span>
      <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <span>Colar</span>
      <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <span>Desfazer</span>
      <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Menu com Checkbox e Radio

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>Exibir</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Colunas Visíveis</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked={showName} onCheckedChange={setShowName}>
      Nome
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked={showEmail} onCheckedChange={setShowEmail}>
      Email
    </DropdownMenuCheckboxItem>
    
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Ordenar Por</DropdownMenuLabel>
    <DropdownMenuSeparator />
    
    <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
      <DropdownMenuRadioItem value="name">Nome</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="date">Data</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

### Submenu Aninhado

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>Mais Opções</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Abrir</DropdownMenuItem>
    <DropdownMenuItem>Editar</DropdownMenuItem>
    
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Compartilhar</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Email</DropdownMenuItem>
        <DropdownMenuItem>Link</DropdownMenuItem>
        <DropdownMenuItem>Redes Sociais</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Menu de Ações em Tabela

```tsx
<Table>
  <TableBody>
    <TableRow>
      <TableCell>João Silva</TableCell>
      <TableCell>joao@email.com</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icons.MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(user.id)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDuplicate(user.id)}>
              Duplicar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => handleDelete(user.id)}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Menu Controlado

```tsx
function ControlledDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>Menu Controlado</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => {
          console.log("Ação executada");
          setOpen(false); // Fechar manualmente
        }}>
          Ação Personalizada
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Menu com Avatar

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="João" />
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-56">
    <DropdownMenuLabel>
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium">João Silva</p>
        <p className="text-xs text-muted-foreground">joao@email.com</p>
      </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Perfil</DropdownMenuItem>
    <DropdownMenuItem>Configurações</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Sair</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Casos de Uso Comuns

### Menu de Contexto (Clique Direito)

```tsx
function ContextMenuExample() {
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        // Abrir dropdown menu na posição do cursor
      }}
    >
      Clique com botão direito aqui
    </div>
  );
}
```

### Menu com Confirmação

```tsx
function DeleteMenuItem({ onConfirm }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <DropdownMenuItem
        className="text-destructive"
        onSelect={(e) => {
          e.preventDefault();
          setShowConfirm(true);
        }}
      >
        Excluir
      </DropdownMenuItem>
      
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

## Acessibilidade

O componente DropdownMenu segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Navegação por teclado**: Space/Enter abre, Esc fecha, setas navegam
- ✅ **ARIA**: `role="menu"`, `aria-expanded`, `aria-haspopup`
- ✅ **Foco automático**: Primeiro item recebe foco ao abrir
- ✅ **Foco circular**: Seta para baixo no último item volta ao primeiro
- ✅ **Escape fecha**: Tecla Escape fecha o menu
- ✅ **Clique fora**: Fechar ao clicar fora do menu

### Exemplo Acessível

```tsx
<DropdownMenu>
  <DropdownMenuTrigger aria-label="Abrir menu de opções">
    <Icons.MoreVertical className="h-4 w-4" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <Icons.Edit className="mr-2 h-4 w-4" aria-hidden="true" />
      <span>Editar</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Boas Práticas

### ✅ Correto

```tsx
// Usar asChild para triggers customizados
<DropdownMenuTrigger asChild>
  <Button variant="ghost">Menu</Button>
</DropdownMenuTrigger>

// Separar grupos de ações relacionadas
<DropdownMenuSeparator />

// Ações destrutivas no final
<DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
```

### ❌ Incorreto

```tsx
// Muitos níveis de submenu (confuso)
<DropdownMenuSub> {/* 4+ níveis aninhados */}

// Itens sem ícones misturados com itens com ícones (inconsistente)
<DropdownMenuItem>Ação 1</DropdownMenuItem>
<DropdownMenuItem>
  <Icons.X className="mr-2 h-4 w-4" />
  Ação 2
</DropdownMenuItem>

// Texto muito longo (trunca visualmente)
<DropdownMenuItem>
  Este é um texto muito longo que não cabe no menu
</DropdownMenuItem>
```

## Links

- [Storybook - DropdownMenu Stories](../../../../apps/storybook/stories/components/DropdownMenu.stories.tsx)
- [Código Fonte](./DropdownMenu.tsx)
- [Testes](./DropdownMenu.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos (submenu, checkbox, radio, tabelas)

### v0.1.1
- ✨ Lançamento inicial
- ⌨️ Navegação por teclado completa (Space, Enter, Esc, setas)
- 🎨 Animações de entrada/saída
- 🔧 Componentes: Menu, Trigger, Content, Item, Label, Separator, Shortcut
- 📦 Sub-componentes: Sub, SubTrigger, SubContent
- ☑️ Variantes: CheckboxItem, RadioGroup, RadioItem
- ♿ ARIA completo (role="menu", aria-expanded, focus management)
