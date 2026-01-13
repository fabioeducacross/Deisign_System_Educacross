# 📦 Instalação do Educacross Design System

Guia completo de instalação para desenvolvedores e agentes de IA sobre como usar o Design System via GitHub.

## 📍 Repositório

🔗 **GitHub:** https://github.com/fabioeducacross/Deisign_System_Educacross

## 🎯 Instalação via GitHub

O Design System pode ser instalado diretamente do GitHub sem necessidade de publicação no npm.

### Para React (Recomendado)

```bash
# Instalar via pnpm
pnpm add github:fabioeducacross/Deisign_System_Educacross#master

# Ou via npm
npm install github:fabioeducacross/Deisign_System_Educacross#master

# Ou via yarn
yarn add github:fabioeducacross/Deisign_System_Educacross#master
```

---

## ⚛️ Uso em Projetos React

### 1. Instalar Dependências

```bash
pnpm add github:fabioeducacross/Deisign_System_Educacross#master
pnpm add react react-dom tailwindcss postcss autoprefixer
```

### 2. Configurar Tailwind

Crie ou atualize `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'
import { educacrossPreset } from '@educacross/ui/tailwind-preset'

const config: Config = {
  presets: [educacrossPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // IMPORTANTE: Incluir componentes do DS
    './node_modules/@educacross/ui/dist/**/*.{js,mjs}',
  ],
}

export default config
```

### 3. Importar Estilos

**Next.js App Router:**
```tsx
// app/layout.tsx
import '@educacross/ui/styles.css'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
```

**Next.js Pages Router:**
```tsx
// pages/_app.tsx
import '@educacross/ui/styles.css'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

**Vite/React:**
```tsx
// main.tsx
import '@educacross/ui/styles.css'
import './index.css'
```

### 4. Usar Componentes

```tsx
import { Button, Input, Label, Card } from '@educacross/ui'

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      
      <form className="space-y-4">
        <div>
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" type="email" placeholder="seu@email.com" />
        </div>
        
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </Card>
  )
}
```

### 5. Variantes de Botões (Design Figma)

```tsx
import { Button } from '@educacross/ui'

function App() {
  return (
    <div className="space-y-4">
      {/* Botões do Design System Figma */}
      <Button variant="default">Primário</Button>
      <Button variant="secondary">Secundário (outline roxo)</Button>
      <Button variant="attention">Atenção (amarelo)</Button>
      <Button variant="negative">Negativo (outline)</Button>
      
      {/* Variantes utilitárias */}
      <Button variant="destructive">Deletar</Button>
      <Button variant="success">Confirmar</Button>
      <Button variant="outline">Cancelar</Button>
      <Button variant="ghost">Menu</Button>
      
      {/* Com ícones */}
      <Button>
        <DownloadIcon />
        Exportar
      </Button>
    </div>
  )
}
```

---

## 🎨 Uso em Projetos Vue

Vue não pode usar componentes React diretamente, mas pode usar **tokens CSS e Tailwind preset**.

### 1. Instalar Dependências

```bash
pnpm add github:fabioeducacross/Deisign_System_Educacross#master
pnpm add -D tailwindcss postcss autoprefixer
```

### 2. Configurar Tailwind

```javascript
// tailwind.config.js
import { educacrossPreset } from '@educacross/ui/tailwind-preset'

export default {
  presets: [educacrossPreset],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
}
```

### 3. Importar Estilos

```typescript
// main.ts
import { createApp } from 'vue'
import '@educacross/ui/styles.css' // ← Tokens CSS + Montserrat
import './style.css' // Seu CSS com @tailwind directives

import App from './App.vue'

createApp(App).mount('#app')
```

```css
/* style.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Criar Componentes Vue com Tokens

```vue
<!-- components/Button.vue -->
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'secondary' | 'attention' | 'negative' | 'destructive'
  size?: 'sm' | 'default' | 'lg'
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  loading: false,
  disabled: false
})

const buttonClasses = computed(() => {
  const base = [
    'inline-flex items-center justify-center',
    'gap-[var(--gap-2)]',
    'rounded-[var(--radius-md)]',
    'text-sm font-medium',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50'
  ]
  
  const variants = {
    default: 'bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)]',
    secondary: 'border-2 border-[var(--color-primary-500)] bg-transparent text-[var(--color-primary-500)] hover:bg-[var(--color-primary-8)]',
    attention: 'bg-[var(--color-warning-500)] text-[var(--text-primary)] hover:bg-[var(--color-warning-600)]',
    negative: 'border-2 border-[var(--color-primary-500)] bg-transparent text-[var(--color-primary-500)]',
    destructive: 'bg-[var(--color-error-500)] text-white hover:bg-[var(--color-error-600)]'
  }
  
  const sizes = {
    sm: 'h-9 px-3',
    default: 'h-10 px-4 py-2',
    lg: 'h-11 px-8'
  }
  
  return [
    ...base,
    variants[props.variant],
    sizes[props.size]
  ].join(' ')
})
</script>

<template>
  <button 
    :class="buttonClasses"
    :disabled="disabled || loading"
  >
    <svg v-if="loading" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
    <slot />
  </button>
</template>
```

### 5. Usar no App

```vue
<template>
  <div class="min-h-screen bg-background text-foreground p-8">
    <div class="max-w-2xl mx-auto space-y-6">
      <h1 class="text-4xl font-bold">Educacross Vue App</h1>
      
      <div class="flex gap-4">
        <Button variant="default">Primário</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="attention">Atenção</Button>
      </div>
      
      <input 
        type="text" 
        placeholder="Digite algo..."
        class="w-full px-4 py-2 border border-input rounded-md bg-background
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './components/Button.vue'
</script>
```

---

## 🌐 Uso em HTML/CSS/JavaScript Vanilla

Para projetos sem framework, use apenas tokens CSS e Tailwind.

### 1. Instalar via CDN ou Build Local

**Opção A: Usar o Tailwind CDN (desenvolvimento rápido)**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Educacross App</title>
  
  <!-- Google Fonts - Montserrat -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Tokens CSS do Design System -->
  <link rel="stylesheet" href="./node_modules/@educacross/ui/dist/styles.css">
  
  <style>
    /* Aplicar fonte globalmente */
    body {
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  </style>
</head>
<body class="bg-background text-foreground">
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-6">Educacross Design System</h1>
    
    <!-- Botões usando tokens -->
    <div class="flex gap-4 mb-6">
      <button class="bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)] px-4 py-2 rounded-[var(--radius-md)] transition-colors">
        Botão Primário
      </button>
      
      <button class="border-2 border-[var(--color-primary-500)] text-[var(--color-primary-500)] hover:bg-[var(--color-primary-8)] px-4 py-2 rounded-[var(--radius-md)] transition-colors">
        Botão Secundário
      </button>
      
      <button class="bg-[var(--color-warning-500)] text-[var(--text-primary)] hover:bg-[var(--color-warning-600)] px-4 py-2 rounded-[var(--radius-md)] transition-colors">
        Botão Atenção
      </button>
    </div>
    
    <!-- Input -->
    <div class="max-w-md">
      <label class="block text-sm font-medium mb-2" for="email">Email</label>
      <input 
        type="email" 
        id="email"
        placeholder="seu@email.com"
        class="w-full px-4 py-2 border border-input rounded-md bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  </div>
</body>
</html>
```

**Opção B: Build com Tailwind CLI**

```bash
# Instalar Tailwind
npm install -D tailwindcss

# Criar config
npx tailwindcss init
```

```javascript
// tailwind.config.js
import { educacrossPreset } from '@educacross/ui/tailwind-preset'

export default {
  presets: [educacrossPreset],
  content: ['./src/**/*.{html,js}'],
}
```

```css
/* src/styles.css */
@import '@educacross/ui/styles.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

```bash
# Build
npx tailwindcss -i ./src/styles.css -o ./dist/output.css --watch
```

---

## 🎨 Tokens CSS Disponíveis

Todos os tokens do Figma estão disponíveis como CSS custom properties:

### Cores

```css
/* Primária (Roxo Educacross) */
--color-primary-100 até --color-primary-900
--color-primary-8, --color-primary-16, --color-primary-24 (opacidades)

/* Semânticas */
--color-success-500, --color-warning-500, --color-error-500, --color-info-500
--color-secondary-500, --color-gray-500

/* Uso via classes Tailwind */
bg-primary, text-primary-foreground, border-primary
```

### Espaçamento

```css
/* Padding */
--padding-1: 4px até --padding-16: 64px

/* Gap */
--gap-1: 4px até --gap-16: 64px

/* Uso via Tailwind */
p-4, gap-2, m-8
```

### Tipografia

```css
/* Fonte */
--font-sans: 'Montserrat', -apple-system, ...

/* Uso via Tailwind */
font-sans, text-base, font-bold
```

### Border Radius

```css
--radius-xs: 2px
--radius-sm: 4px
--radius-md: 6px (padrão)
--radius-lg: 8px
--radius-xl: 10px
--radius-round: 500px

/* Uso via Tailwind */
rounded-md, rounded-lg
```

---

## 🔄 Atualização

Para atualizar para a versão mais recente:

```bash
# Reinstalar
pnpm add github:fabioeducacross/Deisign_System_Educacross#master --force

# Ou com versão específica (tag/branch)
pnpm add github:fabioeducacross/Deisign_System_Educacross#v0.1.0
```

---

## 📚 Referências

- **Repositório:** https://github.com/fabioeducacross/Deisign_System_Educacross
- **Storybook Local:** `pnpm storybook` → http://localhost:6006
- **Componentes:** 21+ componentes incluindo Button, Input, Card, Dialog, Toast
- **Ícones:** 113 ícones customizados em 19 categorias via `<CustomIcon />`

---

## 🆘 Troubleshooting

### Estilos não aparecem

- ✅ Certifique-se de importar `@educacross/ui/styles.css`
- ✅ Verifique se o Tailwind content inclui `./node_modules/@educacross/ui/dist/**/*.{js,mjs}`

### Fonte não carrega

- ✅ O arquivo `styles.css` já importa Montserrat do Google Fonts
- ✅ Nenhuma configuração adicional é necessária

### Tipos TypeScript

- ✅ Instale `@types/react` e `@types/react-dom`
- ✅ O pacote já inclui tipos próprios em `dist/index.d.ts`

### Dark mode não funciona

- ✅ Adicione classe `dark` ao elemento `<html>` ou `<body>`
- ✅ Ou use o componente `<ThemeSwitcher />` do DS

---

## 🤖 Instruções para Agentes de IA

Ao usar este Design System, siga estas diretrizes:

1. **Sempre instale via GitHub:** `pnpm add github:fabioeducacross/Deisign_System_Educacross#master`

2. **Configure Tailwind com o preset:** Importe `educacrossPreset` do pacote

3. **Importe estilos antes de qualquer CSS:** `import '@educacross/ui/styles.css'`

4. **Use tokens CSS ou classes Tailwind:** Nunca valores hard-coded

5. **Para Vue:** Recrie componentes usando os mesmos tokens CSS

6. **Variantes de botão Figma:**
   - `default` = primário roxo
   - `secondary` = outline roxo
   - `attention` = amarelo
   - `negative` = outline neutro

7. **Tipografia:** Montserrat é a fonte padrão, carregada automaticamente

8. **Componentes disponíveis:** Button, Input, Label, Card, Dialog, Toast, Alert, Badge, Checkbox, Radio, Select, Tabs, Table, Pagination, Skeleton, Avatar, CustomIcon e mais

