# Header Component

Componente de cabeçalho da aplicação com logo, menu hamburger e área de perfil do usuário.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Header } from "@fabioeducacross/ui";

export default function App() {
  return (
    <Header
      userName="Afonso Silva"
      userRole="Gestor de Redes"
      avatarSrc="/avatar.jpg"
      onMenuClick={() => console.log("Menu aberto")}
      onProfileClick={() => console.log("Perfil clicado")}
    />
  );
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `userName` | `string` | - | Nome do usuário exibido |
| `userRole` | `string` | - | Cargo/role do usuário |
| `avatarSrc` | `string` | - | URL da imagem do avatar |
| `onMenuClick` | `() => void` | - | Callback ao clicar no menu hamburger |
| `onProfileClick` | `() => void` | - | Callback ao clicar no perfil |
| `shadow` | `boolean` | `true` | Se o header tem sombra inferior |
| `className` | `string` | - | Classes CSS adicionais |

## Anatomia

O Header é composto por 3 áreas principais:

```
┌─────────────────────────────────────────────────────┐
│ [Menu] [Logo]               [User Info] [Avatar]   │
└─────────────────────────────────────────────────────┘
```

1. **Left**: Menu hamburger + Logo Educacross
2. **Center**: Espaço flexível (pode ser usado para título/busca)
3. **Right**: Nome + Role do usuário + Avatar clicável

## Exemplos de Uso

### Header Básico

```tsx
<Header
  userName="Maria Costa"
  userRole="Professora"
  onMenuClick={() => setSidebarOpen(true)}
/>
```

### Header com Avatar Personalizado

```tsx
<Header
  userName="João Santos"
  userRole="Coordenador"
  avatarSrc="https://example.com/avatar.jpg"
  onMenuClick={() => toggleSidebar()}
  onProfileClick={() => navigate("/perfil")}
/>
```

### Header sem Sombra

```tsx
<Header
  userName="Ana Lima"
  userRole="Aluna"
  shadow={false}
  onMenuClick={() => console.log("Menu")}
/>
```

### Header com Estado de Sidebar

```tsx
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header
        userName="Carlos Pereira"
        userRole="Gestor"
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onProfileClick={() => console.log("Ver perfil")}
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
```

### Header com Dropdown de Perfil

```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@fabioeducacross/ui";

function HeaderWithDropdown() {
  return (
    <Header
      userName="Eduarda Rocha"
      userRole="Gestora de Redes"
      avatarSrc="/avatar.jpg"
      onMenuClick={() => toggleSidebar()}
      onProfileClick={undefined} // Removido para usar dropdown
      className="relative"
    >
      {/* Adicionar dropdown customizado */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
          <DropdownMenuItem>Configurações</DropdownMenuItem>
          <DropdownMenuItem>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Header>
  );
}
```

### Header com Busca Integrada

```tsx
function HeaderWithSearch() {
  return (
    <Header
      userName="Fernando Dias"
      userRole="Professor"
      onMenuClick={() => console.log("Menu")}
      className="gap-4"
    >
      {/* Área central customizada */}
      <div className="flex-1 max-w-md mx-auto">
        <Input
          placeholder="Buscar cursos, alunos..."
          leftIcon={<Icons.Search />}
        />
      </div>
    </Header>
  );
}
```

### Header com Notificações

```tsx
function HeaderWithNotifications() {
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <Header
      userName="Gabriela Souza"
      userRole="Coordenadora"
      onMenuClick={() => console.log("Menu")}
    >
      <Button variant="ghost" size="icon" className="relative">
        <Icons.Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>
    </Header>
  );
}
```

## Composição com Sidebar

O Header trabalha em conjunto com o Sidebar:

```tsx
function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header
        userName="Henrique Alves"
        userRole="Gestor de Redes"
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## Acessibilidade

O componente Header segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Landmark semântico**: Usa `<header>` nativo
- ✅ **Navegação por teclado**: Menu e avatar são botões focáveis
- ✅ **Foco visível**: Anel de foco com `focus-visible:ring-2`
- ✅ **Labels descritivos**: Botão de menu com "Abrir menu" acessível
- ✅ **Contraste**: Todos os elementos seguem contraste mínimo 4.5:1
- ✅ **Avatar fallback**: Ícone Educacross quando sem imagem

### Exemplo Acessível Completo

```tsx
<header
  role="banner"
  aria-label="Cabeçalho principal da aplicação"
>
  <Header
    userName="Isabela Martins"
    userRole="Professora"
    avatarSrc="/avatar.jpg"
    onMenuClick={() => setSidebarOpen(true)}
    onProfileClick={() => navigate("/perfil")}
  />
</header>

{/* Para leitores de tela, adicionar contexto */}
<nav aria-label="Menu principal" hidden={!sidebarOpen}>
  <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
</nav>
```

## Responsividade

O Header é responsivo por padrão:

- **Mobile (< 640px)**: Logo reduzido, nome/role ocultos
- **Tablet (640px - 1024px)**: Logo + nome visível, role oculto
- **Desktop (> 1024px)**: Todos elementos visíveis

```tsx
{/* Controle manual de visibilidade */}
<Header
  userName="Juliana Ferreira"
  userRole="Gestora"
  className="[&_.user-name]:hidden md:[&_.user-name]:block [&_.user-role]:hidden lg:[&_.user-role]:block"
/>
```

## Customização

### Altura Customizada

```tsx
<Header
  userName="Kevin Lima"
  userRole="Coordenador"
  className="h-20" // Altura padrão é h-16
/>
```

### Fundo Customizado

```tsx
<Header
  userName="Laura Mendes"
  userRole="Professora"
  className="bg-primary text-primary-foreground"
/>
```

### Sem Logo (Apenas Menu)

```tsx
<Header
  userName="Marcos Oliveira"
  userRole="Gestor"
  onMenuClick={() => console.log("Menu")}
  className="[&_.logo]:hidden"
/>
```

## Links

- [Storybook - Header Stories](../../../../apps/storybook/stories/components/Header.stories.tsx)
- [Código Fonte](./Header.tsx)
- [Testes](./Header.test.tsx)
- [Componente Relacionado: Sidebar](../Sidebar/README.md)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos de composição com Sidebar e customizações

### v0.1.1
- ✨ Lançamento inicial
- 🎨 Avatar com fallback de ícone Educacross
- 🔧 Props de callback para menu e perfil
