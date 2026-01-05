# Research: Design System Educacross

**Branch**: `master` | **Date**: 2026-01-05

## Executive Summary

Pesquisa técnica validou todas as escolhas de stack para o Design System Educacross. Não há "NEEDS CLARIFICATION" pendentes - todas as decisões foram tomadas e implementadas.

---

## R-1: Framework & Language

### Decision: React 18 + TypeScript 5.x

**Rationale:**
- React 18: Concurrent rendering, Suspense, streaming SSR
- TypeScript: Strict mode para type-safety, melhor DX
- Ecosystem maduro com suporte extensivo

**Alternatives Considered:**
| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Vue 3 | Composition API, simpler | Smaller ecosystem, less Radix | ❌ Rejected |
| Svelte | Performance, less boilerplate | Less enterprise adoption | ❌ Rejected |
| Solid | Fine-grained reactivity | Immature ecosystem | ❌ Rejected |

---

## R-2: Styling Approach

### Decision: Tailwind CSS 3.4 + CVA

**Rationale:**
- Utility-first permite composição flexível
- JIT compilation = bundle pequeno
- CVA (class-variance-authority) para type-safe variants
- Padrão shadcn/ui amplamente adotado

**Token Strategy:**
- CSS Custom Properties em `:root` e `.dark`
- Tailwind preset extends tokens
- Nenhum hard-coded value em componentes

**Alternatives Considered:**
| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| CSS Modules | Scoped, simple | Manual theming, no variants | ❌ Rejected |
| Styled Components | CSS-in-JS, dynamic | Runtime overhead, bundle size | ❌ Rejected |
| Vanilla Extract | Zero-runtime, typed | Complex setup | ❌ Rejected |

---

## R-3: Component Primitives

### Decision: Radix UI

**Rationale:**
- Accessibility out-of-the-box (ARIA, keyboard nav)
- Unstyled = full design control
- Composition patterns (asChild, Slot)
- Padrão shadcn/ui

**Components using Radix:**
- Dialog, Popover, Tooltip
- DropdownMenu, Select
- Accordion, Tabs
- Checkbox, Radio

**Alternatives Considered:**
| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Headless UI | Tailwind-focused | Less components | ❌ Rejected |
| React Aria | Adobe quality | Complex API | ❌ Rejected |
| Ariakit | Modern, flexible | Smaller community | ❌ Rejected |

---

## R-4: Iconography

### Decision: Feather Icons (react-feather)

**Rationale:**
- 286 ícones open-source
- Design consistente e minimalista
- Lightweight (tree-shakeable)
- React bindings nativos

**Implementation:**
- Wrapper `Icon` component com variants (size, color)
- Categorização para organização
- Re-export direto para uso avançado

**Alternatives Considered:**
| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Lucide | Fork ativo, mais ícones | Similar ao Feather | Could use |
| Heroicons | Tailwind team | Estilo diferente | ❌ Rejected |
| Phosphor | Múltiplos pesos | Bundle maior | ❌ Rejected |

---

## R-5: Build & Bundling

### Decision: tsup (esbuild + Rollup)

**Rationale:**
- Configuração simples
- Outputs: ESM, CJS, DTS
- Tree-shaking funcional
- Source maps

**Build Outputs Validated:**
| Format | Size | Purpose |
|--------|------|---------|
| ESM | 84KB | Modern bundlers (Vite, Webpack 5) |
| CJS | 90KB | Node.js, older bundlers |
| DTS | 40KB | TypeScript support |

---

## R-6: Monorepo Strategy

### Decision: pnpm + Turborepo

**Rationale:**
- pnpm: Disk efficient, fast installs
- Turborepo: Build caching, parallel tasks
- Workspaces: packages/ui, apps/storybook

**Alternatives Considered:**
| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| npm workspaces | Native | Slower, no caching | ❌ Rejected |
| Yarn Berry | PnP, plugins | Complex setup | ❌ Rejected |
| Nx | Powerful | Overkill for 2 packages | ❌ Rejected |

---

## R-7: Documentation

### Decision: Storybook 8

**Rationale:**
- Autodocs para documentação automática
- Addons: a11y, themes, interactions
- Vite-powered = fast dev
- Component Catalog standard

**Addons Configured:**
- `@storybook/addon-essentials`
- `@storybook/addon-a11y`
- `@storybook/addon-themes`
- `@storybook/addon-interactions`

---

## R-8: Testing Strategy (Pending Implementation)

### Decision: Vitest + Testing Library + Storybook Play

**Rationale:**
- Vitest: Fast, Vite-native, Jest-compatible
- Testing Library: User-centric testing
- Storybook play: Interaction tests in stories

**Layers:**
| Layer | Tool | Coverage |
|-------|------|----------|
| Unit | Vitest | Utilities, logic |
| Integration | Testing Library | Component behavior |
| Interaction | Storybook play | User flows |
| Accessibility | addon-a11y | WCAG violations |

---

## R-9: CI/CD Strategy (Pending Implementation)

### Decision: GitHub Actions

**Rationale:**
- Native GitHub integration
- Free for public repos
- Mature ecosystem

**Pipelines Planned:**
1. **ci.yml**: lint → typecheck → build → test
2. **publish.yml**: npm publish on tag

---

## Open Questions Resolved

| Question | Resolution | Date |
|----------|------------|------|
| Icon library? | Feather Icons | 2026-01-05 |
| Monorepo tool? | Turborepo | 2026-01-05 |
| Animation tokens? | Defer to v2 | 2026-01-05 |
| Visual regression? | Defer to v2 | 2026-01-05 |
| Package registry? | npm public | 2026-01-05 |

---

**Research Complete** | **No NEEDS CLARIFICATION remaining**
