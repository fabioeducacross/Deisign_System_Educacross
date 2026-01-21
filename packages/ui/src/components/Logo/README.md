# Logo Component

Componente da logo Educacross como SVG inline vetorizado e escalável.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Logo } from "@fabioeducacross/ui";

export default function Header() {
  return (
    <header className="flex items-center gap-4 p-4">
      <Logo />
      <h1>Educacross</h1>
    </header>
  );
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Tamanho da logo (altura) |
| `className` | `string` | - | Classes CSS adicionais |
| `...props` | `React.SVGAttributes<SVGSVGElement>` | - | Atributos SVG nativos |

## Variantes

### Tamanho Small (`size="sm"`)
Logo pequena para contextos compactos (altura: 1.25rem / 20px).

```tsx
<Logo size="sm" />
```

### Tamanho Default (`size="default"`)
Logo padrão para uso geral (altura: 1.75rem / 28px).

```tsx
<Logo size="default" />
{/* ou simplesmente */}
<Logo />
```

### Tamanho Large (`size="lg"`)
Logo grande para destaque (altura: 2.25rem / 36px).

```tsx
<Logo size="lg" />
```

## Exemplos de Uso

### Logo em Header Responsivo

```tsx
export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Logo className="sm:hidden" size="sm" />
      <Logo className="hidden sm:block" size="default" />
      <nav>{/* ... */}</nav>
    </header>
  );
}
```

### Logo com Link

```tsx
import Link from "next/link";
import { Logo } from "@fabioeducacross/ui";

export function BrandLink() {
  return (
    <Link href="/" className="inline-flex items-center">
      <Logo size="lg" />
    </Link>
  );
}
```

### Logo Centralizada

```tsx
export function SplashScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Logo size="lg" className="animate-pulse" />
    </div>
  );
}
```

### Logo com Classes Customizadas

```tsx
<Logo 
  size="default" 
  className="opacity-80 hover:opacity-100 transition-opacity" 
/>
```

## Acessibilidade

O componente Logo segue as diretrizes **WCAG 2.1 nível AA** para acessibilidade:

- ✅ **`role="img"`**: Identifica o SVG como imagem para tecnologias assistivas
- ✅ **`aria-label="Educacross"`**: Fornece rótulo descritivo para leitores de tela
- ✅ **`focusable="false"`**: Remove do fluxo de navegação por teclado (elemento decorativo)
- ✅ **SVG Inline**: Renderiza corretamente em todos ambientes (incluindo após `npm install`)

### Compatibilidade com Leitores de Tela

- **NVDA** (Windows): ✅ Anuncia "Educacross, imagem"
- **JAWS** (Windows): ✅ Anuncia "Educacross gráfico"
- **VoiceOver** (macOS/iOS): ✅ Anuncia "Educacross, imagem"

## Detalhes Técnicos

### SVG Inline vs Importação Externa

A partir da v0.2.0, o Logo utiliza SVG inline (vetores embedados no componente) em vez de importação externa. Isso garante:

1. **Renderização confiável** após instalação via npm/pnpm
2. **Zero requests HTTP** (SVG já está no bundle JS)
3. **Escalabilidade perfeita** em qualquer tamanho
4. **Controle via CSS** (dimensões, opacity, transitions)

### Impacto no Bundle

- **Tamanho do SVG inline**: ~7 KB gzipped
- **Impacto total**: +4.9% no bundle ESM (142.7 KB → 149.7 KB gzipped)
- **Limite do projeto**: 150 KB gzipped ✅

### ViewBox e Proporções

O Logo mantém proporções originais com **ViewBox="0 0 200 28"** (aspect ratio ~7:1). A largura ajusta automaticamente (`w-auto`) para preservar proporções em todos os tamanhos.

## Links

- [Storybook - Logo Stories](../../stories/components/Logo.stories.tsx)
- [Código Fonte](./Logo.tsx)
- [Testes](./Logo.test.tsx)
- [Design System v0.2.0](../../../README.md)

## Changelog

### v0.2.0 (Janeiro 2025)
- ✨ **[BREAKING]** Convertido de `<img>` para `<svg>` inline
- ✨ Adicionado `aria-label="Educacross"` para acessibilidade
- ✨ Adicionado `focusable="false"` para navegação por teclado
- 🐛 **[FIX]** Corrigido bug de renderização após `npm install`
- ♿ Melhorias de acessibilidade (WCAG 2.1 AA)
- 📦 Impacto no bundle: +7 KB (~4.9% aumento)

### v0.1.1 (Dezembro 2024)
- 🎨 Logo com importação externa de SVG
- ⚠️ Bug conhecido: não renderiza em projetos externos
