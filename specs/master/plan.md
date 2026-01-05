# Implementation Plan: Design System Educacross v1.0

**Branch**: `master` | **Date**: 2026-01-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/master/spec.md`

## Summary

Design System completo para Educacross com 21 componentes React + TypeScript, construído sobre Tailwind CSS e Radix UI. Infraestrutura de monorepo com pnpm + Turborepo, documentação via Storybook 8, e iconografia via Feather Icons. Próximos passos focam em testes, CI/CD e publicação NPM.

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 18.3.1  
**Primary Dependencies**: Radix UI, Tailwind CSS 3.4, class-variance-authority 0.7.1, react-feather 2.0.10  
**Storage**: N/A (biblioteca de componentes)  
**Testing**: Vitest + React Testing Library (pendente configuração)  
**Target Platform**: Web (browsers modernos)  
**Project Type**: Monorepo (pnpm workspaces)  
**Performance Goals**: Bundle < 100KB gzip, tree-shakeable  
**Constraints**: WCAG 2.1 AA, zero a11y violations  
**Scale/Scope**: 21 componentes, uso interno Educacross

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| **I. Spec-First** | ✅ PASS | spec.md criado com user scenarios e acceptance criteria |
| **II. Test-First** | ⚠️ PARTIAL | Stories com autodocs existem, play functions pendentes, Vitest não configurado |
| **III. A11y-First** | ✅ PASS | Radix UI primitives, keyboard navigation, addon-a11y instalado |
| **IV. Tokens-First** | ✅ PASS | CSS custom properties, Tailwind preset, sem magic values |
| **V. Docs-First** | ✅ PASS | Storybook stories para todos os 21 componentes |

### Gate Violations & Justification

| Violation | Why Acceptable | Resolution Plan |
|-----------|---------------|-----------------|
| Test-First parcial | MVP focou em componentes e docs primeiro | M6: Configurar Vitest, adicionar play functions |
| Unit tests ausentes | Componentes são wrappers de Radix (lógica mínima) | Adicionar testes para lógica customizada |

## Project Structure

### Documentation (this feature)

```text
specs/master/
├── spec.md              # Feature specification ✅
├── plan.md              # This file ✅
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
packages/
└── ui/                           # @educacross/ui publishable package
    ├── src/
    │   ├── components/           # 21 components
    │   │   ├── Accordion/
    │   │   ├── Alert/
    │   │   ├── Avatar/
    │   │   ├── Badge/
    │   │   ├── Button/
    │   │   ├── Card/
    │   │   ├── Checkbox/
    │   │   ├── Dialog/
    │   │   ├── DropdownMenu/
    │   │   ├── Icon/
    │   │   ├── Input/
    │   │   ├── Label/
    │   │   ├── Pagination/
    │   │   ├── Popover/
    │   │   ├── Radio/
    │   │   ├── Select/
    │   │   ├── Skeleton/
    │   │   ├── Table/
    │   │   ├── Tabs/
    │   │   ├── Toast/
    │   │   ├── Tooltip/
    │   │   └── index.ts          # Barrel exports
    │   ├── lib/
    │   │   └── utils.ts          # cn() utility
    │   ├── styles.css            # CSS custom properties (tokens)
    │   ├── tailwind-preset.ts    # Tailwind config preset
    │   └── index.ts              # Public exports
    ├── dist/                     # Build output
    ├── package.json
    ├── tsconfig.json
    └── tsup.config.ts

apps/
└── storybook/                    # Documentation app
    ├── .storybook/
    │   ├── main.ts
    │   └── preview.ts
    └── stories/
        ├── components/           # Component stories (21 files)
        └── foundations/          # Token documentation

.github/
└── workflows/                    # CI pipelines (pending)
```

**Structure Decision**: Monorepo com pnpm workspaces, seguindo padrão shadcn/ui. Componentes em `packages/ui`, documentação em `apps/storybook`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Test-First parcial | Priorização de componentes para MVP | Testes serão adicionados em M6 |

---

## Phase 0: Research Summary

### R-1: Stack Validation

| Technology | Decision | Rationale |
|------------|----------|-----------|
| React 18 | ✅ Confirmed | Concurrent features, hooks, wide adoption |
| TypeScript 5.x | ✅ Confirmed | Strict mode, decorators, template literals |
| Tailwind CSS 3.4 | ✅ Confirmed | JIT, arbitrary values, @apply |
| Radix UI | ✅ Confirmed | Accessibility, headless, composable |
| CVA | ✅ Confirmed | Type-safe variants, composable |
| tsup | ✅ Confirmed | ESM+CJS+DTS, fast builds |
| pnpm | ✅ Confirmed | Fast, disk efficient, workspaces |
| Turborepo | ✅ Confirmed | Build caching, parallel tasks |
| Storybook 8 | ✅ Confirmed | React 18 support, MDX 3, Vite |
| Feather Icons | ✅ Confirmed | 286 icons, SVG, React bindings |

### R-2: Testing Strategy

| Layer | Tool | Purpose |
|-------|------|---------|
| Unit | Vitest | Component logic, utilities |
| Integration | Testing Library | Component behavior |
| Interaction | Storybook play | User flows |
| Accessibility | addon-a11y | WCAG compliance |
| Visual | Chromatic (future) | Regression detection |

### R-3: CI/CD Strategy

| Stage | Tool | Trigger |
|-------|------|---------|
| Lint | ESLint + Prettier | PR, push |
| TypeCheck | tsc --noEmit | PR, push |
| Build | turbo build | PR, push |
| Test | vitest run | PR, push |
| Storybook | storybook build | PR |
| Publish | npm publish | tag release |

---

## Phase 1: Design Artifacts

### 1.1 Component API Contracts

Todos os componentes seguem padrão consistente:

```typescript
// Padrão de Props
interface ComponentProps {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  disabled?: boolean;
  asChild?: boolean;  // Radix Slot pattern
  className?: string;
  children?: React.ReactNode;
}

// Padrão de Export
export { Component, componentVariants, type ComponentProps };
```

### 1.2 Token Structure

```css
/* packages/ui/src/styles.css */
:root {
  /* Colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* Radii */
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

### 1.3 Build Outputs

| Output | Format | Size | Purpose |
|--------|--------|------|---------|
| index.mjs | ESM | ~84KB | Modern bundlers |
| index.js | CJS | ~90KB | Node.js, legacy |
| index.d.ts | DTS | ~40KB | TypeScript |
| styles.css | CSS | ~2KB | Token variables |
| tailwind-preset.mjs | ESM | ~3KB | Tailwind config |

---

## Phase 2: Implementation Roadmap

### Completed Milestones

| Phase | Deliverable | Status |
|-------|-------------|--------|
| M1 | Monorepo + Build | ✅ Complete |
| M2 | P1 Components (3) | ✅ Complete |
| M3 | P2 Components (8) | ✅ Complete |
| M4 | P3 Components (8) | ✅ Complete |
| M5 | Iconografia | ✅ Complete |

### Pending Milestones

| Phase | Deliverable | Priority | Est. Effort |
|-------|-------------|----------|-------------|
| M6 | Testes Unitários (Vitest) | P1 | 4-6h |
| M7 | CI/CD (GitHub Actions) | P1 | 2-4h |
| M8 | Publicação NPM | P2 | 1-2h |
| M9 | Play Functions (Storybook) | P2 | 4-6h |
| M10 | Visual Regression (Chromatic) | P3 | 2-4h |

---

## Quickstart

### Instalação

```bash
pnpm add @educacross/ui
```

### Configuração Tailwind

```js
// tailwind.config.js
import educacrossPreset from "@educacross/ui/tailwind-preset";

export default {
  presets: [educacrossPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@educacross/ui/dist/**/*.{js,mjs}",
  ],
};
```

### Uso de Componentes

```tsx
import { Button, Input, Card, Icon } from "@educacross/ui";
import "@educacross/ui/styles.css";

function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Email" />
        <Button className="w-full">
          <Icon name="LogIn" className="mr-2" />
          Entrar
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

**Generated**: 2026-01-05 | **Plan Version**: 1.0
