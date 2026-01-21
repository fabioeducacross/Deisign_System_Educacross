# Feature Specification: Design System v2.0 - Usability Improvements

**Branch**: `001-ds-v2-melhorias` | **Priority**: P0 - Critical | **Status**: Planned  
**Related**: [plan.md](./plan.md) | [tasks.md](./tasks.md) | [GAPS-ANALYSIS.md](./GAPS-ANALYSIS.md)

---

## 1. Overview

### 1.1 Problem Statement

O Design System Educacross (`@fabioeducacross/ui@0.1.1`) foi publicado com sucesso no GitHub Packages, mas apresenta **4 problemas críticos** que impedem adoção completa:

1. **🔴 Logo Component Bug (CRÍTICO)**: O componente `<Logo>` não renderiza quando o pacote é instalado via npm em projetos externos. Causa: `import logoEducacross from "../../assets/images/logo-educacross.svg"` usa path relativo que quebra em `node_modules/`.

2. **🟡 Falta de Discovery Programático**: Não existe forma para desenvolvedores ou agentes IA descobrirem programaticamente quais componentes, ícones ou tokens estão disponíveis. Impossível gerar código automaticamente.

3. **🟡 Documentação Incompleta**: Apenas 2/28 componentes (Button, Sidebar) possuem README individual. Desenvolvedores precisam abrir Storybook para entender uso básico.

4. **🟢 Barreira para IA**: Agentes IA (Copilot, Claude, ChatGPT) não conseguem inferir capacidades do Design System sem documentação estruturada machine-readable.

### 1.2 Solution

Implementar **5 melhorias fundamentais** sem breaking changes na API:

1. **Logo Fix**: Converter componente para SVG inline (elimina dependência de assets externos)
2. **Manifest JSON**: Gerar `dist/manifest.json` com metadados de 28 componentes (props, variants, categories)
3. **Tokens JSON**: Extrair `dist/tokens.json` com 50+ design tokens de `styles.css`
4. **Metadata Exports**: Criar `metadata.ts` com exports TypeScript (`componentList`, `iconIndex`)
5. **Documentation Complete**: Gerar 28 READMEs individuais + AI Guide específico

**Abordagem Técnica**:
- Inline SVG via React component (mantém API idêntica)
- Scripts AST-based para geração automática de JSONs
- JSON Schema validation para garantir integridade
- CI checks para validar sincronização docs ↔ código

### 1.3 Scope

**In Scope (v0.2.0):**
- ✅ Correção do Logo (CRÍTICO - bloqueia produção)
- ✅ Infraestrutura de metadata (manifest.json, tokens.json, metadata.ts)
- ✅ 28 READMEs completos (um por componente)
- ✅ AI Guide (docs/AI-GUIDE.md + ForAI.mdx)
- ✅ Migration guide v0.1.x → v0.2.0
- ✅ Scripts de geração + validação automática
- ✅ CI gates para docs sincronizadas
- ✅ Limpeza de escopo (remover 19 MDX de business logic)

**Out of Scope (v0.2.0):**
- ❌ Novos componentes
- ❌ Breaking changes na API existente
- ❌ React 19 migration (mantém suporte React 18+)
- ❌ Animações avançadas
- ❌ Visual regression tests (Chromatic)
- ❌ Figma Tokens sync automatizado

**Explicitly Removed**:
- ❌ Documentação de jornadas de negócio (business-rules/, journeys/, use-cases/, features/)
- Razão: Design System documenta **apenas UI components**, não regras de negócio

---

## 2. User Scenarios

### US-1: Developer installs package and Logo renders

**Como** desenvolvedor externo usando o Design System,  
**Quero** que o componente `<Logo>` renderize após `npm install @fabioeducacross/ui`,  
**Para que** eu possa usar o Design System em projetos de produção.

**Acceptance Criteria:**
- **Given**: Pacote `@fabioeducacross/ui@0.2.0` instalado via npm
- **When**: Importo `import { Logo } from "@fabioeducacross/ui"`
- **And**: Renderizo `<Logo size="default" />`
- **Then**: Logo da Educacross aparece corretamente na página
- **And**: Não há erro 404 de asset (logo-educacross.svg)
- **And**: Funciona em SSR (Next.js), SSG (Gatsby), e CSR (Vite/CRA)
- **And**: API mantém compatibilidade 100% com v0.1.x (props: `size`, `className`)

**Edge Cases:**
- Logo em dark mode → usa `currentColor` para adaptar
- Logo em bundle size crítico → SVG inline < 15KB
- Logo sem internet → funciona offline (embedded no bundle)

---

### US-2: AI agent discovers components programmatically

**Como** agente de IA (GitHub Copilot, Claude Code, ChatGPT),  
**Quero** ler `manifest.json` para descobrir componentes disponíveis,  
**Para que** eu possa gerar código válido do Design System automaticamente.

**Acceptance Criteria:**
- **Given**: Arquivo `dist/manifest.json` publicado no pacote npm
- **When**: Parseio o JSON via `fetch` ou `fs.readFile`
- **Then**: Vejo lista completa de 28 componentes com:
  - Nome do componente
  - Categoria (form | layout | feedback | data)
  - Props disponíveis (nome, tipo, default, required)
  - Variants válidos (ex: Button → default, secondary, destructive, outline, ghost, link)
  - Sizes válidos (ex: sm, default, lg, icon)
  - Exemplos de código
- **And**: Manifest valida contra JSON Schema publicado
- **And**: Metadata inclui 407 ícones (287 Feather + 120 custom) com categorias

**Edge Cases:**
- Component sem Props interface → manifest marca `props: {}`
- Component sem variants CVA → manifesta marca `variants: null`
- Manifest desatualizado → CI quebra e bloqueia merge

---

### US-3: Developer reads component documentation

**Como** desenvolvedor aprendendo o Design System,  
**Quero** README individual por componente em cada pasta,  
**Para que** eu aprenda a usar sem precisar abrir Storybook.

**Acceptance Criteria:**
- **Given**: Navegando em `node_modules/@fabioeducacross/ui/src/components/`
- **When**: Abro qualquer pasta de componente (ex: `Button/`)
- **Then**: Encontro arquivo `README.md` com 6 seções:
  1. **Instalação**: `npm install @fabioeducacross/ui`
  2. **Uso básico**: Código exemplo funcional
  3. **Props**: Tabela com nome, tipo, default, descrição
  4. **Variantes**: Exemplos de cada variant/size
  5. **Acessibilidade**: WCAG compliance, keyboard nav
  6. **Links**: Storybook story, source code
- **And**: API Reference no Storybook (`API.mdx`) documenta 28/28 componentes
- **And**: Cada README segue template padronizado

**Edge Cases:**
- Component sem variants → seção "Variantes" omitida
- Component composition (ex: Dialog.Root) → README explica pattern

---

### US-4: Developer validates tree-shaking works

**Como** desenvolvedor preocupado com bundle size,  
**Quero** importar apenas `Button` e verificar que `Dialog`, `Table` não estão no bundle,  
**Para que** eu mantenha aplicação performática.

**Acceptance Criteria:**
- **Given**: Projeto Vite limpo com apenas `import { Button } from "@fabioeducacross/ui"`
- **When**: Rodo `vite build` com bundle analyzer
- **Then**: Bundle final < 50KB gzip
- **And**: `Dialog.tsx`, `Table.tsx` não aparecem no bundle
- **And**: Apenas `Button.tsx`, `utils/cn.ts`, estilos base são incluídos

**Validation Method:**
```bash
mkdir /tmp/test-treeshake && cd /tmp/test-treeshake
npm init -y && npm install @fabioeducacross/ui@0.2.0 vite
echo "import { Button } from '@fabioeducacross/ui'; console.log(Button);" > index.js
npx vite build --mode production
# Verificar dist/index.*.js < 50KB gzip
```

---

### US-5: AI agent uses AI Guide to generate code

**Como** agente IA,  
**Quero** guia específico (`AI-GUIDE.md`) com patterns e validation rules,  
**Para que** eu gere código idiomático do Design System.

**Acceptance Criteria:**
- **Given**: Arquivo `packages/ui/docs/AI-GUIDE.md` existe
- **When**: Leio o guia
- **Then**: Vejo seções:
  - **Quick Reference**: Comandos para descobrir componentes (`componentList`)
  - **Manifest Usage**: Como parsear `manifest.json`
  - **Composition Patterns**: Exemplos de composição (ex: FormField = Label + Input + Alert)
  - **Token Usage**: Como aplicar design tokens (`bg-primary`, `text-lg`)
  - **Common Mistakes**: Anti-patterns a evitar
  - **Validation Rules**: Como validar props antes de gerar
- **And**: ForAI.mdx no Storybook replica conteúdo para desenvolvedores

---

## 3. Functional Requirements

### FR-1: Logo Component Fix (CRITICAL)

| ID | Requisito | Acceptance Criteria | Priority |
|----|-----------|---------------------|----------|
| **FR-1.1** | Converter Logo para SVG inline | `Logo.tsx` contém `<svg>...</svg>` diretamente, sem `import svg` | 🔴 P0 |
| **FR-1.2** | Manter API idêntica | Props `size`, `className`, `...props` funcionam identicamente a v0.1.x | 🔴 P0 |
| **FR-1.3** | Preservar acessibilidade | SVG tem `role="img"` e `aria-label="Educacross"` | 🔴 P0 |
| **FR-1.4** | Suportar customização | `currentColor` permite adaptar cor via `className="text-primary"` | 🟡 P1 |
| **FR-1.5** | Manter tamanhos consistentes | Sizes `sm`, `default`, `lg` mantêm proporções visuais | 🟡 P1 |

**Technical Details:**
- Extrair viewBox do SVG original (`packages/ui/src/assets/images/logo-educacross.svg`)
- Inline paths dentro de componente React
- CSS classes aplicadas via `cn()` utility
- Bundle size increase < 15KB (aceitável vs ganho de reliability)

---

### FR-2: Metadata Infrastructure

| ID | Requisito | Acceptance Criteria | Priority |
|----|-----------|---------------------|----------|
| **FR-2.1** | Gerar manifest.json | Script `generate-manifest.ts` cria `dist/manifest.json` com 28 componentes | 🟡 P1 |
| **FR-2.2** | Incluir props no manifest | Cada componente lista props: nome, type, default, required | 🟡 P1 |
| **FR-2.3** | Incluir variants/sizes | Manifest extrai variants CVA de cada componente | 🟡 P1 |
| **FR-2.4** | Categorizar componentes | Cada componente tem category: `form` \| `layout` \| `feedback` \| `data` | 🟡 P1 |
| **FR-2.5** | Gerar tokens.json | Script `generate-tokens.ts` extrai 50+ tokens de `styles.css` | 🟡 P1 |
| **FR-2.6** | Converter HSL → Hex | tokens.json converte cores HSL para Hex (ex: `hsl(221.2 83.2% 53.3%)` → `#2563EB`) | 🟢 P2 |
| **FR-2.7** | Criar metadata.ts exports | TypeScript exports: `componentList`, `iconIndex`, `metadata` | 🟡 P1 |
| **FR-2.8** | Validar via JSON Schema | Scripts validam output contra `manifest.schema.json` e `tokens.schema.json` | 🟡 P1 |

**Manifest.json Structure:**
```json
{
  "$schema": "https://educacross.com.br/schemas/ds-manifest-v1.json",
  "name": "@fabioeducacross/ui",
  "version": "0.2.0",
  "components": {
    "Button": {
      "category": "form",
      "props": { "variant": {...}, "size": {...} },
      "variants": ["default", "secondary", "destructive", "outline", "ghost", "link"],
      "sizes": ["sm", "default", "lg", "icon"]
    }
  },
  "icons": { "feather": {...}, "custom": {...} },
  "tokens": { "colors": {...}, "spacing": {...} }
}
```

**Category Definitions:**
- `form`: Button, Input, Label, Checkbox, Radio, Select
- `layout`: Card, Accordion, Tabs, Header, Sidebar
- `feedback`: Alert, Toast, Dialog, Tooltip, Popover
- `data`: Table, Badge, Avatar, Skeleton, Pagination

---

### FR-3: Documentation Complete

| ID | Requisito | Acceptance Criteria | Priority |
|----|-----------|---------------------|----------|
| **FR-3.1** | Criar 28 READMEs | Cada pasta `src/components/*/` tem `README.md` | 🟡 P1 |
| **FR-3.2** | Seguir template padrão | READMEs têm 6 seções: Instalação, Uso, Props, Variantes, A11y, Links | 🟡 P1 |
| **FR-3.3** | Props tables completas | Cada README lista todas props com tipo, default, descrição | 🟡 P1 |
| **FR-3.4** | Exemplos executáveis | Código de exemplo no README roda sem modificação | 🟡 P1 |
| **FR-3.5** | Atualizar API.mdx | Storybook `API.mdx` documenta 28/28 componentes (atualmente 15/28) | 🟢 P2 |

**README Template Structure:**
```markdown
# [ComponentName]

[Descrição breve]

## 📦 Instalação

```bash
npm install @fabioeducacross/ui
```

## 🚀 Uso

```tsx
import { ComponentName } from "@fabioeducacross/ui";

export function Example() {
  return <ComponentName variant="default">Content</ComponentName>;
}
```

## 📋 Props

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| variant | enum | "default" | Visual variant |

## 🎨 Variantes

[Exemplos de cada variant/size]

## ♿ Acessibilidade

- WCAG 2.1 AA compliant
- Keyboard navigable

## 🔗 Links

- [Storybook](link)
- [Source Code](link)
```

---

### FR-4: AI Readiness

| ID | Requisito | Acceptance Criteria | Priority |
|----|-----------|---------------------|----------|
| **FR-4.1** | Criar AI-GUIDE.md | Arquivo `packages/ui/docs/AI-GUIDE.md` existe com 5 seções | 🟢 P2 |
| **FR-4.2** | Quick Reference section | Guia mostra como usar `componentList` e `iconIndex` | 🟢 P2 |
| **FR-4.3** | Composition Patterns | Exemplos de composição válida (ex: FormField) | 🟢 P2 |
| **FR-4.4** | Common Mistakes | Lista anti-patterns (ex: hard-coded colors, wrong variants) | 🟢 P2 |
| **FR-4.5** | ForAI.mdx no Storybook | Story `getting-started/ForAI.mdx` replica conteúdo | 🟢 P2 |

---

### FR-5: Scope Cleanup

| ID | Requisito | Acceptance Criteria | Priority |
|----|-----------|---------------------|----------|
| **FR-5.1** | Remover business-rules/ | Deletar pasta `apps/storybook/stories/business-rules/` (4 arquivos) | 🟡 P1 |
| **FR-5.2** | Remover journeys/ | Deletar pasta `apps/storybook/stories/journeys/` (3 arquivos) | 🟡 P1 |
| **FR-5.3** | Remover use-cases/ | Deletar pasta `apps/storybook/stories/use-cases/` (2 arquivos) | 🟡 P1 |
| **FR-5.4** | Remover features/ | Deletar pasta `apps/storybook/stories/features/` (10 arquivos) | 🟡 P1 |
| **FR-5.5** | Revisar examples/ | Aplicar regra: imports apenas de `@educacross/ui` → MANTER; imports de lógica → REMOVER | 🟡 P1 |

**Objective Rule:**
```
IF (imports apenas de '@educacross/ui') THEN KEEP
ELSE IF (imports de business logic ou APIs) THEN DELETE
```

---

## 4. Non-Functional Requirements

### NFR-1: Performance

| ID | Requisito | Target | Validation Method |
|----|-----------|--------|-------------------|
| **NFR-1.1** | Bundle size total | < 150KB gzip | `gzip -c dist/index.mjs \| wc -c` |
| **NFR-1.2** | Tree-shaking | Button import < 50KB gzip | Test project com apenas Button |
| **NFR-1.3** | Logo inline overhead | < 15KB addition | Comparar bundle antes/depois |
| **NFR-1.4** | Build time | < 30s em CI | GitHub Actions timer |

---

### NFR-2: Zero Breaking Changes

| ID | Requisito | Validation |
|----|-----------|------------|
| **NFR-2.1** | API externa idêntica | Todas props de v0.1.x funcionam em v0.2.0 |
| **NFR-2.2** | Migration guide confirma | `MIGRATION-v2.md` declara "zero breaking changes" |
| **NFR-2.3** | Testes backward compat | Testes v0.1.x rodam sem modificação em v0.2.0 |

---

### NFR-3: Code Quality

| ID | Requisito | Target | Tool |
|----|-----------|--------|------|
| **NFR-3.1** | Line coverage | > 80% em `src/components/**/*.tsx` | Vitest `--coverage` |
| **NFR-3.2** | Branch coverage | > 70% em componentes críticos (Button, Input, Logo) | Vitest `--coverage.branches` |
| **NFR-3.3** | TypeScript strict | Zero erros em `pnpm typecheck` | tsc --noEmit |
| **NFR-3.4** | Lint clean | Zero erros/warnings em `pnpm lint` | ESLint + Prettier |

**Coverage Config** (`vitest.config.ts`):
```typescript
coverage: {
  provider: 'v8',
  include: ['src/components/**/*.tsx'],
  exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
  lines: 80,
  branches: 70,
  functions: 75,
  statements: 80
}
```

---

### NFR-4: Documentation Quality

| ID | Requisito | Validation |
|----|-----------|------------|
| **NFR-4.1** | 100% component coverage | 28/28 componentes com README |
| **NFR-4.2** | CI validation | Script `validate-docs.ts` verifica README existe para cada componente |
| **NFR-4.3** | Manifest sync | CI quebra se `componentList` ≠ componentes em manifest.json |

---

### NFR-5: AI Compatibility

| ID | Requisito | Validation |
|----|-----------|------------|
| **NFR-5.1** | manifest.json válido | Valida contra JSON Schema sem erros |
| **NFR-5.2** | Parsing test | Script TypeScript consegue parsear e usar metadata |
| **NFR-5.3** | Human + Machine readable | Markdown para devs + JSON para IAs |

---

## 5. Edge Cases

| Case | Scenario | Handling |
|------|----------|----------|
| **EC-1** | Logo SVG > 10KB | Aceitável se < 15KB; otimizar com SVGO se > 15KB |
| **EC-2** | AST parser crashes | Fallback: commit `manifest.template.json` manual; CI issue aberto |
| **EC-3** | Component sem Props interface | Manifest marca `props: {}` (valid) |
| **EC-4** | Component sem CVA variants | Manifest marca `variants: null` (valid) |
| **EC-5** | Dark mode Logo color | Usar `currentColor` para adaptar automaticamente |
| **EC-6** | Logo em SSR (Next.js) | SVG inline funciona nativamente (sem hydration issues) |
| **EC-7** | Tree-shaking falha | Investigar tsup config; adicionar `sideEffects: false` em package.json |
| **EC-8** | Manifest desatualizado | CI script detecta e quebra pipeline |
| **EC-9** | README incompleto | Template + CI validation garantem 6 seções obrigatórias |
| **EC-10** | Token HSL → Hex conversion falha | Manter valor original HSL; log warning |

---

## 6. Technical Decisions

| Decisão | Escolha | Alternativa Rejeitada | Razão |
|---------|---------|----------------------|-------|
| **Logo Strategy** | SVG inline component | Keep external SVG + fix bundler config | Inline é mais robusto; funciona em 100% casos (SSR/SSG/CSR); zero dependência de build tools |
| **Manifest Generation** | AST parsing via TypeScript compiler API | Manual JSON maintenance | AST garante sincronização; manual desatualiza rapidamente |
| **Token Extraction** | Parse styles.css com regex | Use Tailwind config as source | styles.css é source of truth; Tailwind config deriva dela |
| **Documentation Format** | Markdown + JSON (dual format) | Single JSON format | Devs precisam Markdown readable; IAs precisam JSON parseable; Single format insuficiente |
| **Category Taxonomy** | 4 categories (form/layout/feedback/data) | Granular 10+ categories | Simples é melhor; fácil classificar novos componentes |
| **Rollback Strategy** | Keep v0.1.1 tag + hotfix branch | Unpublish v0.2.0 if fails | Unpublish é drástico; preferir forward fixes |

---

## 7. Dependencies

### 7.1 Runtime Dependencies (Unchanged)

Sem novas dependências runtime. Mantém:
- `react`: ^18.2.0 || ^19.0.0 (peer)
- `@radix-ui/react-*`: Primitivos
- `class-variance-authority`: Variantes CVA
- `clsx` + `tailwind-merge`: Utils

### 7.2 Development Dependencies (New)

| Package | Version | Usage |
|---------|---------|-------|
| `typescript` | ^5.7.2 | AST parsing para manifest generation |
| `@typescript-eslint/parser` | ^8.20.0 | Parse .tsx files |
| `ajv` | ^8.12.0 | JSON Schema validation |
| `color-convert` | ^2.0.1 | HSL → Hex conversion |
| `tsx` | ^4.19.2 | Run TypeScript scripts |

---

## 8. Milestones

| Milestone | Descrição | Tasks | Status |
|-----------|-----------|-------|--------|
| **M0** | Pre-Flight Check | T001-T003 (logo inventory, bundle baseline, approvals) | 🔲 Pending |
| **M1** | Scope Cleanup | T004-T006 (delete business docs, review examples) | 🔲 Pending |
| **M2** | Logo Fix (CRITICAL) | T007-T009 (convert to inline, tests, docs) | 🔲 Pending |
| **M3** | Metadata Infrastructure | T010-T017 (metadata.ts, scripts, schemas, tests, CI) | 🔲 Pending |
| **M4** | Documentation Complete | T018-T022 (28 READMEs, API.mdx) | 🔲 Pending |
| **M5** | AI Readiness | T023-T025 (AI-GUIDE, ForAI.mdx, Migration) | 🔲 Pending |
| **M6** | Publish v0.2.0 | T026-T030 (version bump, tests, publish, validate, rollback plan) | 🔲 Pending |

**Timeline**: 10-16 dias (com parallelização otimizada)

---

## 9. Success Metrics

### Quantitative

| Metric | Target | Validation |
|--------|--------|------------|
| Logo works externally | 100% success rate | Test in 3 external projects (Next.js, Vite, CRA) |
| READMEs complete | 28/28 componentes | `ls src/components/*/README.md \| wc -l` → 28 |
| manifest.json complete | 28/28 componentes | Parse JSON, count `Object.keys(manifest.components)` |
| tokens.json complete | 50+ tokens | Count tokens across colors/spacing/typography |
| Line coverage | > 80% | Vitest coverage report |
| Bundle size | < 150KB gzip | Measure dist/index.mjs gzipped |
| Tree-shaking | Button < 50KB | Test project validates |

### Qualitative

- [ ] Desenvolvedores encontram componentes rapidamente (via manifest ou README)
- [ ] Agentes IA geram código válido do DS (testado com Copilot/Claude)
- [ ] Storybook serve como fonte única de verdade
- [ ] Zero regressions em projetos consumidores (validate em 2-3 projetos internos)

---

## 10. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Logo inline aumenta bundle** | Médio | Médio | Medir antes/depois; < 15KB aceitável (0.15% do bundle típico 10MB app) |
| **Breaking change não detectado** | Baixo | Alto | Testes backward compatibility; validate em projetos reais antes de publicar |
| **AST parser falha em CI** | Médio | Médio | Fallback: commit manifest.json manual; CI issue aberto automaticamente |
| **Documentação desatualiza** | Alto | Médio | CI script valida sincronização; PR bloqueado se desatualizado |
| **Tree-shaking não funciona** | Baixo | Alto | Adicionar `sideEffects: false` em package.json; test antes de release |
| **Rollback necessário** | Baixo | Alto | Manter v0.1.1 disponível; hotfix branch preparado; rollback < 15min |

---

## 11. Rollout Plan

### Phase 1: Hotfix MVP (2-3 dias)

**Scope**: Logo fix apenas (Sprints -1, 0, 1)  
**Release**: `v0.1.2` (hotfix)  
**Target**: Desbloquear uso em produção IMEDIATAMENTE

### Phase 2: Soft Launch (Semana 1)

**Scope**: Logo + Metadata (Sprints 2)  
**Release**: `v0.2.0-beta.1`  
**Validation**: Testar em 2-3 projetos internos; coletar feedback

### Phase 3: Documentation Push (Semana 2)

**Scope**: 28 READMEs + AI Guide (Sprints 3-4)  
**Release**: `v0.2.0-rc.1`  
**Validation**: Testar AI code generation; refinar guias

### Phase 4: Full Release (Semana 3)

**Scope**: Tudo (Sprint 5)  
**Release**: `v0.2.0` stable  
**Communication**: Announce em canais internos; migration guide publicado

---

## 12. Acceptance Checklist (Definition of Done)

Esta feature está DONE quando:

- [ ] **Constitution Check**: Princípios I-V validados (Spec-First ✅, Test-First, A11y-First, Tokens-First, Docs-First)
- [ ] **Logo Fix**: `<Logo>` renderiza em 3 projetos externos (Next.js, Vite, CRA)
- [ ] **Metadata**: `manifest.json` e `tokens.json` gerados e validados
- [ ] **Documentation**: 28/28 READMEs completos + API.mdx atualizado
- [ ] **AI Readiness**: AI-GUIDE.md + ForAI.mdx criados
- [ ] **Tests**: Coverage > 80% line, > 70% branch em críticos
- [ ] **CI**: Pipeline verde (lint, typecheck, build, tests)
- [ ] **Performance**: Bundle < 150KB gzip, tree-shaking validado
- [ ] **Backward Compat**: v0.1.x code roda sem mudanças em v0.2.0
- [ ] **Published**: `v0.2.0` em GitHub Packages
- [ ] **Validated**: Testado externamente sem issues
- [ ] **Rollback Ready**: Hotfix branch preparado, tempo < 15min

---

## 13. Open Questions

| Question | Status | Decision Date | Notes |
|----------|--------|---------------|-------|
| Logo tem variante white? | 🔴 TBD | Pre-Sprint -1 | Task T001 resolve |
| Bundle analyzer tool? | 🟡 PROPOSED | - | Usar `vite-bundle-visualizer` |
| Publicar JSON Schema em GitHub Pages? | 🟢 OPTIONAL | - | Nice-to-have, não bloqueante |
| Chromatic para visual regression? | 🟢 FUTURE | v0.3.0 | Out of scope v0.2.0 |

---

**Version**: 1.0.0 | **Created**: 2026-01-20 | **Status**: Ready for Implementation  
**Approved by**: [Pending stakeholder approval - Task T003]
