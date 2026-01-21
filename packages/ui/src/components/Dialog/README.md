# Dialog Component

Componente de diálogo modal para exibir conteúdo sobreposto que requer interação do usuário.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@fabioeducacross/ui";

export default function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Abrir Diálogo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Título do Diálogo</DialogTitle>
          <DialogDescription>
            Descrição ou contexto adicional sobre o diálogo.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          Conteúdo principal do diálogo.
        </div>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Props

### Dialog

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | `boolean` | - | Estado aberto (controlado) |
| `defaultOpen` | `boolean` | `false` | Estado inicial (não controlado) |
| `onOpenChange` | `(open: boolean) => void` | - | Callback ao mudar estado |
| `modal` | `boolean` | `true` | Se bloqueia interação com fundo |

### DialogTrigger

| Prop | Tipo | Descrição |
|------|------|-----------|
| `asChild` | `boolean` | Passa props para filho ao invés de criar botão |

### DialogContent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `size` | `"sm" \| "default" \| "lg" \| "xl" \| "full"` | `"default"` | Tamanho do diálogo |
| `className` | `string` | - | Classes CSS adicionais |
| `onEscapeKeyDown` | `(event: KeyboardEvent) => void` | - | Callback ao pressionar Escape |
| `onInteractOutside` | `(event: Event) => void` | - | Callback ao clicar fora |

### DialogHeader / DialogFooter

| Prop | Tipo | Descrição |
|------|------|-----------|
| `className` | `string` | Classes CSS adicionais |

### DialogTitle

| Prop | Tipo | Descrição |
|------|------|-----------|
| `className` | `string` | Classes CSS adicionais |

### DialogDescription

| Prop | Tipo | Descrição |
|------|------|-----------|
| `className` | `string` | Classes CSS adicionais |

## Tamanhos

### Small (sm)

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Diálogo Pequeno</Button>
  </DialogTrigger>
  <DialogContent size="sm">
    <DialogHeader>
      <DialogTitle>Confirmação Rápida</DialogTitle>
    </DialogHeader>
    <p>Tem certeza?</p>
    <DialogFooter>
      <Button>Sim</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Default (default)

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Diálogo Padrão</Button>
  </DialogTrigger>
  <DialogContent size="default">
    <DialogHeader>
      <DialogTitle>Formulário de Cadastro</DialogTitle>
    </DialogHeader>
    {/* Conteúdo padrão (max-w-lg) */}
  </DialogContent>
</Dialog>
```

### Large (lg)

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Diálogo Grande</Button>
  </DialogTrigger>
  <DialogContent size="lg">
    <DialogHeader>
      <DialogTitle>Detalhes Completos</DialogTitle>
    </DialogHeader>
    {/* Conteúdo amplo (max-w-2xl) */}
  </DialogContent>
</Dialog>
```

### Extra Large (xl)

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Diálogo XL</Button>
  </DialogTrigger>
  <DialogContent size="xl">
    <DialogHeader>
      <DialogTitle>Editor Avançado</DialogTitle>
    </DialogHeader>
    {/* Conteúdo muito amplo (max-w-4xl) */}
  </DialogContent>
</Dialog>
```

### Full Screen

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Tela Cheia</Button>
  </DialogTrigger>
  <DialogContent size="full">
    <DialogHeader>
      <DialogTitle>Visualização em Tela Cheia</DialogTitle>
    </DialogHeader>
    {/* Ocupa quase toda a tela */}
  </DialogContent>
</Dialog>
```

## Exemplos de Uso

### Dialog de Confirmação

```tsx
function DeleteConfirmDialog({ itemName, onConfirm }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Excluir</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir "{itemName}"? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Dialog com Formulário

```tsx
function CreateUserDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Criar usuário:", formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Novo Usuário</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Criar Novo Usuário</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para criar um novo usuário.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" required>Nome completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" required>E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Usuário</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

### Dialog com Tabs

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Configurações</Button>
  </DialogTrigger>
  <DialogContent size="lg">
    <DialogHeader>
      <DialogTitle>Configurações</DialogTitle>
    </DialogHeader>
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">Geral</TabsTrigger>
        <TabsTrigger value="security">Segurança</TabsTrigger>
        <TabsTrigger value="notifications">Notificações</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <div className="space-y-4">
          <div>
            <Label>Nome de usuário</Label>
            <Input placeholder="seu_usuario" />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="security">
        <div className="space-y-4">
          <div>
            <Label>Nova senha</Label>
            <Input type="password" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
    <DialogFooter>
      <Button>Salvar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Dialog com Loading State

```tsx
function SaveDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula API
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Salvar Alterações</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Salvar Alterações</DialogTitle>
          <DialogDescription>
            Suas alterações serão salvas permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} loading={loading} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Dialog Scrollável

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Termos de Uso</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Termos de Uso</DialogTitle>
      <DialogDescription>
        Leia atentamente nossos termos antes de continuar.
      </DialogDescription>
    </DialogHeader>
    <div className="max-h-[400px] overflow-y-auto space-y-4 py-4">
      <p>Lorem ipsum dolor sit amet...</p>
      <p>Consectetur adipiscing elit...</p>
      {/* Muito conteúdo */}
    </div>
    <DialogFooter>
      <Button variant="outline">Recusar</Button>
      <Button>Aceitar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Dialog Aninhado (Nested)

```tsx
function NestedDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Abrir Principal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Diálogo Principal</DialogTitle>
        </DialogHeader>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Abrir Secundário</Button>
          </DialogTrigger>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Diálogo Secundário</DialogTitle>
            </DialogHeader>
            <p>Conteúdo do diálogo aninhado.</p>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
```

### Dialog sem Botão de Fechar

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Ação Crítica</Button>
  </DialogTrigger>
  <DialogContent
    onEscapeKeyDown={(e) => e.preventDefault()}
    onInteractOutside={(e) => e.preventDefault()}
    hideCloseButton
  >
    <DialogHeader>
      <DialogTitle>Ação Requer Confirmação</DialogTitle>
      <DialogDescription>
        Você deve escolher uma das opções abaixo.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Opção 1</Button>
      <Button>Opção 2</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Acessibilidade

O componente Dialog segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Focus trap**: Foco fica contido no diálogo enquanto aberto
- ✅ **Escape para fechar**: Pressionar `Esc` fecha o diálogo
- ✅ **ARIA completo**: `role="dialog"`, `aria-labelledby`, `aria-describedby`
- ✅ **Foco inicial**: Automaticamente foca no primeiro elemento focável
- ✅ **Backdrop**: Overlay escurece fundo e bloqueia interação
- ✅ **Restaura foco**: Retorna foco ao trigger ao fechar

### Exemplo Acessível Completo

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button aria-haspopup="dialog">Editar Perfil</Button>
  </DialogTrigger>
  <DialogContent
    role="dialog"
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
  >
    <DialogHeader>
      <DialogTitle id="dialog-title">Editar Perfil</DialogTitle>
      <DialogDescription id="dialog-description">
        Atualize suas informações de perfil abaixo.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4 py-4">
      <div>
        <Label htmlFor="profile-name">Nome</Label>
        <Input id="profile-name" autoFocus />
      </div>
    </div>
    <DialogFooter>
      <Button variant="outline">Cancelar</Button>
      <Button>Salvar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Boas Práticas

### ✅ Correto

```tsx
{/* Título e descrição claros */}
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Excluir Conta</DialogTitle>
      <DialogDescription>
        Esta ação é permanente e não pode ser desfeita.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

{/* Ações no footer com hierarquia visual */}
<DialogFooter>
  <Button variant="outline">Cancelar</Button>
  <Button variant="destructive">Excluir</Button>
</DialogFooter>
```

### ❌ Incorreto

```tsx
{/* Sem título (inacessível) */}
<Dialog>
  <DialogContent>
    <p>Conteúdo sem contexto</p>
  </DialogContent>
</Dialog>

{/* Muitos diálogos aninhados (confuso) */}
<Dialog>
  <Dialog>
    <Dialog>...</Dialog>
  </Dialog>
</Dialog>
```

## Links

- [Storybook - Dialog Stories](../../../../apps/storybook/stories/components/Dialog.stories.tsx)
- [Código Fonte](./Dialog.tsx)
- [Testes](./Dialog.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos (formulário, confirmação, loading, tabs)

### v0.1.1
- ✨ Lançamento inicial
- 🎨 5 tamanhos (sm, default, lg, xl, full)
- ♿ Focus trap e escape key
- 🎬 Animações de entrada/saída
- 🔧 Controlado e não controlado
