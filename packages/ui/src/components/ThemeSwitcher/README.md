# ThemeSwitcher Component

Componente para alternar entre temas claro, escuro e automático (sistema).

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { ThemeProvider, ThemeSwitcher, useTheme } from "@fabioeducacross/ui";

// 1. Envolver aplicação com ThemeProvider
export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <MyApp />
    </ThemeProvider>
  );
}

// 2. Usar ThemeSwitcher em qualquer lugar
function Header() {
  return (
    <header>
      <h1>Meu App</h1>
      <ThemeSwitcher />
    </header>
  );
}
```

## Props

### ThemeProvider

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `defaultTheme` | `"light" \| "dark" \| "system"` | `"system"` | Tema inicial |
| `children` | `ReactNode` | - | Conteúdo da aplicação |

### ThemeSwitcher

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `"button" \| "dropdown" \| "toggle"` | `"button"` | Estilo do switcher |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Tamanho do botão |
| `showLabel` | `boolean` | `false` | Exibir label "Tema" |
| `className` | `string` | - | Classes CSS adicionais |

### useTheme Hook

```tsx
const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
```

| Retorno | Tipo | Descrição |
|---------|------|-----------|
| `theme` | `"light" \| "dark" \| "system"` | Tema selecionado pelo usuário |
| `resolvedTheme` | `"light" \| "dark"` | Tema efetivo (resolve "system") |
| `setTheme` | `(theme) => void` | Define o tema |
| `toggleTheme` | `() => void` | Alterna entre light/dark |

## Variantes

### Button (Padrão)

```tsx
<ThemeSwitcher variant="button" />
// Botão simples que alterna entre light/dark
```

### Dropdown (Com System)

```tsx
<ThemeSwitcher variant="dropdown" />
// DropdownMenu com 3 opções: Light, Dark, System
```

### Toggle (Compacto)

```tsx
<ThemeSwitcher variant="toggle" />
// Toggle switch minimalista
```

## Exemplos de Uso

### Header com Theme Switcher

```tsx
function AppHeader() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost">Sobre</Button>
          <Button variant="ghost">Contato</Button>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
```

### Dropdown com Label

```tsx
<ThemeSwitcher variant="dropdown" showLabel />
// Exibe "Tema: Light" / "Tema: Dark" / "Tema: System"
```

### Toggle Personalizado com useTheme

```tsx
function CustomThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Alternar tema"
    >
      {theme === "light" ? (
        <Icons.Moon className="h-5 w-5" />
      ) : (
        <Icons.Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
```

### Dropdown nas Configurações

```tsx
function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aparência</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Tema</Label>
          <ThemeSwitcher variant="dropdown" />
        </div>
        
        <p className="text-sm text-muted-foreground">
          Tema atual: <strong>{theme}</strong>
        </p>
      </CardContent>
    </Card>
  );
}
```

### Preview de Temas

```tsx
function ThemePreview() {
  const { setTheme } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card
        className="cursor-pointer hover:border-primary"
        onClick={() => setTheme("light")}
      >
        <CardContent className="p-4">
          <div className="bg-white border rounded-md h-20 mb-2" />
          <p className="text-sm text-center">Light</p>
        </CardContent>
      </Card>
      
      <Card
        className="cursor-pointer hover:border-primary"
        onClick={() => setTheme("dark")}
      >
        <CardContent className="p-4">
          <div className="bg-gray-900 border rounded-md h-20 mb-2" />
          <p className="text-sm text-center">Dark</p>
        </CardContent>
      </Card>
      
      <Card
        className="cursor-pointer hover:border-primary"
        onClick={() => setTheme("system")}
      >
        <CardContent className="p-4">
          <div className="bg-gradient-to-r from-white to-gray-900 border rounded-md h-20 mb-2" />
          <p className="text-sm text-center">System</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Theme-aware Component

```tsx
function StatusIndicator() {
  const { resolvedTheme } = useTheme();

  return (
    <Badge variant={resolvedTheme === "dark" ? "softPrimary" : "default"}>
      {resolvedTheme === "dark" ? "Modo Noturno" : "Modo Diurno"}
    </Badge>
  );
}
```

### Animação de Transição

```tsx
// Adicionar ao CSS global
<style>{`
  * {
    transition: background-color 0.2s ease, color 0.2s ease;
  }
`}</style>

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <style>{/* CSS acima */}</style>
      <MyApp />
    </ThemeProvider>
  );
}
```

## Persistência

O tema é salvo automaticamente em `localStorage` com a chave `educacross-theme`:

```tsx
// Leitura automática ao carregar
// Gravação automática ao mudar tema com setTheme()

// Você pode acessar manualmente:
const savedTheme = localStorage.getItem("educacross-theme");
// "light" | "dark" | "system"
```

## SSR (Next.js, Remix)

Para evitar flash de conteúdo não estilizado (FOUC), adicione script no `<head>`:

```tsx
// app/layout.tsx (Next.js App Router)
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('educacross-theme') || 'system';
                const resolvedTheme = theme === 'system'
                  ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                  : theme;
                document.documentElement.classList.add(resolvedTheme);
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Casos de Uso Comuns

### Tema por Rota

```tsx
function AdminLayout() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark"); // Admin sempre dark
  }, []);

  return <AdminContent />;
}
```

### Tema por Preferência do Usuário (API)

```tsx
function UserPreferences() {
  const { setTheme } = useTheme();
  const { data: user } = useQuery("user", fetchUser);

  useEffect(() => {
    if (user?.preferences?.theme) {
      setTheme(user.preferences.theme);
    }
  }, [user]);

  return <Settings />;
}
```

## Acessibilidade

O componente ThemeSwitcher segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **aria-label**: Botão com label descritivo "Alternar tema"
- ✅ **Foco visível**: `focus:ring-2` no botão
- ✅ **Navegação por teclado**: Space/Enter para alternar
- ✅ **Ícone + texto**: Dropdown mostra ícone E texto (não apenas ícone)

### Exemplo Acessível

```tsx
<ThemeSwitcher
  variant="button"
  aria-label="Alternar entre tema claro e escuro"
/>
```

## Boas Práticas

### ✅ Correto

```tsx
// Usar ThemeProvider no topo da aplicação
<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>

// Usar "system" como padrão (respeita preferência do usuário)
<ThemeProvider defaultTheme="system">

// Testar ambos os temas durante desenvolvimento
const { setTheme } = useTheme();
setTheme("dark"); // Testar dark mode
```

### ❌ Incorreto

```tsx
// Forçar tema sem considerar preferência do usuário
<ThemeProvider defaultTheme="light"> {/* Sem opção de mudar */}

// Usar useTheme fora do ThemeProvider (erro)
function Component() {
  const { theme } = useTheme(); // ❌ Erro!
}

// Múltiplos ThemeProviders (conflito)
<ThemeProvider>
  <ThemeProvider> {/* ❌ Aninhado */}
```

## Links

- [Storybook - ThemeSwitcher Stories](../../../../apps/storybook/stories/components/ThemeSwitcher.stories.tsx)
- [Código Fonte](./ThemeSwitcher.tsx)
- [Testes](./ThemeSwitcher.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos (SSR, persistência, custom toggles)

### v0.1.1
- ✨ Lançamento inicial
- 🎨 3 variantes (button, dropdown, toggle)
- 🔧 Hook useTheme com theme, resolvedTheme, setTheme, toggleTheme
- 💾 Persistência automática em localStorage
- 🌐 Suporte a preferência do sistema (prefers-color-scheme)
- ⚡ Sistema de tema baseado em classe `.dark` no root
- ♿ ARIA labels e navegação por teclado
