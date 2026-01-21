# Implementation Plan: Design System v2.0 - Melhorias de Usabilidade e Correções

**Branch**: `001-ds-v2-melhorias` | **Date**: 2026-01-20 | **Spec**: `specs/001-ds-v2-melhorias/`  
**Priority**: 🔴 **HIGH** (Logo bug bloqueia uso do DS em produção)

## Summary

Implementar melhorias críticas no Design System Educacross para torná-lo completamente utilizável por desenvolvedores e agentes de IA, incluindo:

1. **[CRÍTICO]** Correção do bug do componente `<Logo>` que não carrega em projetos externos
2. **[P0]** Criação de manifesto machine-readable de componentes, ícones e tokens
3. **[P1]** Documentação completa por componente (28 READMEs)
4. **[P1]** Exports programáticos para descoberta de componentes/assets
5. **[P2]** Guia específico para uso por agentes de IA

**Abordagem Técnica**:
- Converter Logo para SVG inline (elimina problema de asset resolution)
- Gerar arquivos JSON estruturados (`manifest.json`, `tokens.json`)
- Criar metadata exports TypeScript para discovery programático
- Documentação em múltiplos formatos (Markdown humano + JSON máquina)

## Technical Context

**Language/Version**: TypeScript 5.7.2 / React 18.3.1  
**Primary Dependencies**: 
- Tailwind CSS 3.4.17 (design tokens)
- Radix UI (primitivos acessíveis)
- tsup 8.3.5 (bundler CJS/ESM)
- Storybook 10.1.11 (documentação)

**Storage**: File-based (dist/, manifests JSON)  
**Testing**: Vitest + Testing Library (coverage >80% alvo)  
**Target Platform**: 
- NPM Package (GitHub Packages)
- Browser (ESM/CJS bundles)
- Storybook deployed (GitHub Pages)

**Project Type**: NPM Library (monorepo pnpm)  
**Performance Goals**: 
- Bundle size <150KB gzip
- Tree-shakeable (import apenas usado)
- Zero runtime dependencies críticas

**Constraints**: 
- Compatibilidade React 18+
- Tailwind CSS 3.4+
- Node.js 18+ LTS
- Publicação via GitHub Packages

**Scale/Scope**: 
- 28 componentes React
- 287 ícones Feather + 100+ custom
- 50+ design tokens
- 20+ stories Storybook

## Constitution Check

### ✅ Passes
- ✅ Mantém arquitetura monorepo existente
- ✅ Não adiciona complexidade desnecessária
- ✅ Solução simples (inline SVG) para problema crítico
- ✅ Documentação como fonte única de verdade

### ⚠️ Justifications Needed
| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Multiple output formats (JSON + TS + MD) | Desenvolvedores precisam Markdown; IAs precisam JSON; runtime precisa TS exports | Single format insuficiente - diferentes consumers |
| Auto-generation scripts | 28 componentes × 3 arquivos = 84 docs manuais = erro prone | Manter manualmente é inviável e desatualiza |

## Project Structure

### Documentation (this feature)

```text
specs/001-ds-v2-melhorias/
├── plan.md              # Este arquivo
└── tasks.md             # Breakdown de tarefas (gerado após aprovação)
```

### Source Code (repository root)

```text
Design_System_Educacross/
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Logo/
│       │   │   │   ├── Logo.tsx           # [MODIFICAR] Converter para SVG inline
│       │   │   │   ├── Logo.test.tsx      # [CRIAR] Testes do novo formato
│       │   │   │   └── README.md          # [CRIAR] Documentação completa
│       │   │   ├── Button/
│       │   │   │   └── README.md          # [ATUALIZAR] Expandir documentação
│       │   │   └── [... 26 outros]/
│       │   │       └── README.md          # [CRIAR] Um para cada
│       │   ├── metadata.ts                # [CRIAR] Exports programáticos
│       │   ├── icons-index.ts             # [CRIAR] Índice completo de ícones
│       │   └── index.ts                   # [ATUALIZAR] Adicionar exports
│       ├── dist/
│       │   ├── manifest.json              # [GERAR] Manifesto completo
│       │   └── tokens.json                # [GERAR] Design tokens estruturados
│       ├── scripts/
│       │   ├── generate-manifest.ts       # [CRIAR] Auto-geração manifesto
│       │   ├── generate-tokens.ts         # [CRIAR] Extração de tokens
│       │   └── validate-docs.ts           # [CRIAR] CI check docs atualizadas
│       └── docs/
│           ├── AI-GUIDE.md                # [CRIAR] Guia para agentes IA
│           └── MIGRATION-v2.md            # [CRIAR] Guia de migração
├── apps/
│   └── storybook/
│       └── stories/
│           ├── components/                # Stories dos 28 componentes
│           ├── foundations/               # Cores, tipografia, ícones, spacing
│           └── getting-started/
│               ├── API.mdx                # [ATUALIZAR] Completar 28 componentes
│               └── ForAI.mdx              # [CRIAR] Documentação específica IA
└── docs/
    └── ISSUE-LOGO-DS.md                   # [RESOLVER] Implementar Opção 1

Nota: NÃO incluir documentação de jornadas, regras de negócio ou use-cases.
      Foco exclusivo: componentes React, ícones, tokens e API.
```

**Structure Decision**: Monorepo existente mantido. Adições focadas em:
1. `packages/ui/src/` → Código-fonte e metadata
2. `packages/ui/dist/` → Artifacts gerados (JSONs)
3. `packages/ui/docs/` → Documentação técnica
4. `packages/ui/scripts/` → Automação de geração

## Phase 0: Research & Analysis

### 0.1 Auditoria Completa do Estado Atual ✅ CONCLUÍDO

**Realizado**: Análise do repositório identificou:
- 28 componentes implementados
- Apenas 2 com README individual
- Logo usa `import svg` que quebra em node_modules
- Falta manifesto machine-readable
- API Reference incompleta (15/28)

### 0.2 Análise de Dependências

**Verificar**:
- [ ] Tamanho atual do bundle (baseline)
- [ ] Coverage de testes atual
- [ ] Breaking changes potenciais
- [ ] Impacto em projetos consumidores existentes

**Ferramentas**:
```bash
pnpm build && du -sh packages/ui/dist/
pnpm test:coverage
```

### 0.3 Benchmark de Alternativas

**Logo Bug - Validar Opção 1 (Inline SVG)**:
- [ ] Testar conversão SVG → TSX component
- [ ] Medir impacto no bundle size
- [ ] Verificar compatibilidade SSR/SSG
- [ ] Validar customização via props

**Manifesto - Formato JSON vs YAML vs TS**:
- JSON: ✅ Universal, parseable por qualquer linguagem
- YAML: ❌ Requer parser, menos comum em browsers
- TS: ❌ Requer compilação, não universal

**Decisão**: JSON para interchange, TS exports para runtime

## Phase 1: Design & Contracts

### 1.1 Logo Component Redesign

**Current (Broken)**:
```tsx
// src/components/Logo/Logo.tsx
import logoEducacross from "../../assets/images/logo-educacross.svg";

export const Logo = ({ size, className, ...props }) => (
  <img src={logoEducacross} alt="Educacross" className={...} {...props} />
);
```

**New (Inline SVG)**:
```tsx
// src/components/Logo/Logo.tsx
export const Logo = ({ size = "default", className, ...props }) => {
  const sizes = {
    sm: "h-5 w-auto",
    default: "h-7 w-auto",
    lg: "h-9 w-auto"
  };
  
  return (
    <svg
      className={cn(sizes[size], className)}
      viewBox="0 0 [width] [height]"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Educacross"
      {...props}
    >
      {/* SVG paths do logo atual */}
      <path d="..." />
    </svg>
  );
};
```

**Benefits**:
- ✅ Zero asset resolution issues
- ✅ Props `className` aplica cor via `currentColor`
- ✅ Acessibilidade com `role` e `aria-label`
- ✅ Works em SSR/SSG/CSR

**Breaking Change**: ❌ Nenhum (API externa idêntica)

### 1.2 Manifest Schema

**`packages/ui/dist/manifest.json`**:
```json
{
  "$schema": "https://educacross.com.br/schemas/ds-manifest-v1.json",
  "name": "@fabioeducacross/ui",
  "version": "0.2.0",
  "updated": "2026-01-20T14:30:00Z",
  "repository": "https://github.com/fabioeducacross/Design_System_Educacross",
  "storybook": "https://fabioeducacross.github.io/Design_System_Educacross/",
  
  "components": {
    "Button": {
      "category": "form",
      "description": "Botão clicável com variantes semânticas",
      "props": {
        "variant": {
          "type": "enum",
          "values": ["default", "secondary", "destructive", "outline", "ghost", "link"],
          "default": "default",
          "required": false
        },
        "size": {
          "type": "enum",
          "values": ["sm", "default", "lg", "icon"],
          "default": "default",
          "required": false
        },
        "asChild": {
          "type": "boolean",
          "default": false,
          "required": false
        }
      },
      "accessibility": "WCAG 2.1 AA",
      "storybook": "components/Button",
      "source": "src/components/Button/Button.tsx",
      "examples": [
        "<Button variant=\"default\">Click me</Button>",
        "<Button variant=\"destructive\" size=\"lg\">Delete</Button>"
      ]
    }
    // ... 27 outros componentes
  },
  
  "icons": {
    "feather": {
      "count": 287,
      "categories": ["arrows", "actions", "alerts", "users", "interface"],
      "list": ["Check", "X", "AlertCircle", "..."]
    },
    "custom": {
      "count": 120,
      "categories": [
        "conhecimento", "acao", "menu", "interface", 
        "metricas", "gamificacao", "disciplinas"
      ],
      "list": ["liga-corujinhas-enabled", "math-enabled", "..."]
    }
  },
  
  "tokens": {
    "colors": {
      "primary": {
        "value": "hsl(221.2 83.2% 53.3%)",
        "cssVar": "--primary",
        "hex": "#2563EB",
        "usage": "Cor principal da marca Educacross"
      }
      // ... outros tokens
    },
    "spacing": {
      "xs": "0.5rem",
      "sm": "0.75rem",
      // ...
    },
    "typography": {
      "fontFamily": {
        "sans": ["Inter", "system-ui", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"]
      }
    }
  },
  
  "stats": {
    "totalComponents": 28,
    "totalIcons": 407,
    "totalTokens": 50,
    "bundleSize": "142KB",
    "treeshakeable": true
  }
}
```

### 1.3 Metadata Exports

**`packages/ui/src/metadata.ts`**:
```typescript
import type { IconName } from './components/Icon';
import type { IconCategory } from './components/CustomIcon';
import { iconNames, iconCategories } from './components/Icon';
import { customIcons } from './components/CustomIcon';

/**
 * Lista de todos os componentes disponíveis no Design System.
 * Útil para descoberta programática e validação.
 */
export const componentList = [
  'Accordion',
  'Alert',
  'Avatar',
  'AvatarIcon',
  'Badge',
  'Button',
  'Card',
  'Checkbox',
  'CustomIcon',
  'Dialog',
  'DropdownMenu',
  'Header',
  'Icon',
  'Input',
  'Label',
  'Logo',
  'Pagination',
  'Popover',
  'Radio',
  'Select',
  'Sidebar',
  'Skeleton',
  'Table',
  'Tabs',
  'ThemeSwitcher',
  'Toast',
  'Tooltip',
] as const;

export type ComponentName = typeof componentList[number];

/**
 * Índice completo de ícones disponíveis.
 */
export const iconIndex = {
  feather: {
    names: iconNames,
    categories: iconCategories,
    count: iconNames.length,
  },
  custom: {
    names: Object.values(customIcons).flat(),
    categories: Object.keys(customIcons) as IconCategory[],
    count: Object.values(customIcons).flat().length,
  },
} as const;

/**
 * Metadados do pacote.
 */
export const metadata = {
  name: '@fabioeducacross/ui',
  version: '0.2.0', // Atualizado via script
  components: componentList,
  icons: iconIndex,
  repository: 'https://github.com/fabioeducacross/Design_System_Educacross',
  storybook: 'https://fabioeducacross.github.io/Design_System_Educacross/',
} as const;
```

### 1.4 README Template

**Template para cada componente**:
```markdown
# [ComponentName]

[Descrição breve em 1-2 linhas]

## 📦 Instalação

```bash
npm install @fabioeducacross/ui
```

## 🚀 Uso Básico

```tsx
import { [ComponentName] } from '@fabioeducacross/ui';
import '@fabioeducacross/ui/styles.css';

export default function Example() {
  return (
    <[ComponentName] [prop]="[value]">
      [children]
    </[ComponentName]>
  );
}
```

## 📋 Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `[prop1]` | `[type]` | `[default]` | ✅/❌ | [descrição] |

## 🎨 Variantes

[Se aplicável - listar variantes com exemplos visuais]

## ♿ Acessibilidade

- ✅ [Feature 1]
- ✅ [Feature 2]
- ✅ WCAG 2.1 AA compliant

## 📖 Exemplos

### [Caso de Uso 1]
```tsx
[código]
```

### [Caso de Uso 2]
```tsx
[código]
```

## 🔗 Links

- [Storybook →](https://fabioeducacross.github.io/Design_System_Educacross/?path=/docs/components-[component])
- [Código Fonte →](https://github.com/fabioeducacross/Design_System_Educacross/tree/master/packages/ui/src/components/[ComponentName])

## 📝 Notas

[Informações adicionais, limitações conhecidas, etc]
```

### 1.5 AI Guide Structure

**`packages/ui/docs/AI-GUIDE.md`**:
```markdown
# 🤖 AI Agent Guide: Educacross Design System

Guia otimizado para agentes de IA consumirem e gerarem código usando o Design System.

## Quick Reference

### Discovery Programático

```typescript
import { metadata, componentList, iconIndex } from '@fabioeducacross/ui';

// Listar todos componentes
console.log(metadata.components); // Array<string>

// Descobrir ícones
console.log(iconIndex.feather.names); // Array<IconName>
console.log(iconIndex.custom.names); // Array<string>
```

### Manifest JSON

```bashsition Patterns

### [Pattern 1: Form Field Composition]
**Components**: Label + Input
**Use**: 
```tsx
<div className="space-y-2">
  <Label htmlFor="email" required>Email</Label>
  <Input id="email" type="email" error={hasError} />
  {error && <p className="text-sm text-destructive">{error}</p>}
</div>
```

### [Pattern 2: Card with Header]
**Components**: Card + Badge
**Use**:
```tsx
<Card>
  <div className="flex items-center justify-between p-4">
    <h3 className="text-lg font-semibold">Title</h3>
    <Badge variant="success">Active</Badge>
  </div>
</Card>
```

Nota: Padrões focam em COMPOSIÇÃO de componentes do DS, não em lógica de negócio.se**:
```tsx
<Button variant="default" size="lg" onClick={handleSubmit}>
  Submit Form
</Button>
```

## Token Usage

```typescript
// Cores
className="bg-primary text-primary-foreground"

// Espaçamento
className="space-y-4 p-6"

// Tipografia
className="text-lg font-semibold"
```

## Common Mistakes

❌ **Errado**:
```tsx
<Button color="blue">Click</Button> // Prop não existe
```

✅ **Correto**:
```tsx
<Button variant="default">Click</Button> // Usa variant
```

## Validation Rules

Antes de gerar código, validar:
- [Component Discovery

```typescript
// Descobrir todos componentes disponíveis
import { componentList } from '@fabioeducacross/ui';
console.log(componentList); // ['Accordion', 'Alert', ...]

// Descobrir ícones
import { iconIndex } from '@fabioeducacross/ui';
console.log(iconIndex.feather.names); // ['Check', 'X', ...]
console.log(iconIndex.custom.names); // ['math-enabled', ...]
```
- [ ] Classes Tailwind usam tokens do preset

## Examples Repository

[Links para exemplos reais em projetos Educacross]
```

## Phase 2: Implementation Tasks

### Sprint -1: Pre-Flight Check (0.5 dia) 🔍

**Objetivo**: Coletar informações necessárias antes de iniciar implementação

#### Task -1.1: Localizar e Documentar Logos
- [ ] Encontrar arquivo `logo-educacross.svg` em `packages/ui/src/assets/images/`
- [ ] Verificar se existe `logo-educacross-white.svg` ou outras variantes
- [ ] Anotar dimensões exatas (viewBox) de cada SVG
- [ ] Verificar onde cada variante é usada (Header, outros?)
- [ ] Decisão: qual(is) converter para inline

**Comandos**:
```bash
Get-ChildItem -Path packages/ui/src/assets/ -Filter "*logo*" -Recurse
Select-String -Path "packages/ui/src/assets/images/logo-educacross.svg" -Pattern "viewBox"
```

**Output**: `specs/001-ds-v2-melhorias/LOGO-INVENTORY.md`

#### Task -1.2: Medir Bundle Size Baseline
- [ ] Build atual: `cd packages/ui && pnpm build`
- [ ] Medir tamanhos de dist/index.js e dist/index.mjs
- [ ] Documentar em tabela

**Comandos**:
```bash
cd packages/ui
pnpm build
Get-Item dist/index.* | Select-Object Name, @{N='Size(KB)';E={[math]::Round($_.Length/1KB,2)}}
```

**Baseline Esperado**:
| Métrica | Valor Atual (v0.1.1) | Meta (v0.2.0) | Status |
|---------|----------------------|---------------|--------|
| index.js (uncompressed) | ? KB | < 500KB | ⏳ |
| index.mjs (gzip estimate) | ? KB | < 150KB | ⏳ |

**Output**: `specs/001-ds-v2-melhorias/BUNDLE-BASELINE.md`

#### Task -1.3: Stakeholder Alignment
- [ ] **Tech Lead**: Revisar abordagem técnica (inline SVG, scripts AST)
- [ ] **Design**: Validar que conversão SVG mantém fidelidade visual
- [ ] **DevEx**: Feedback sobre manifest.json (compartilhar schema draft)
- [ ] **Security**: Quick check (inline SVG não introduz XSS)

**Comunicação**: Slack update com resumo do plano e timeline

**Output**: Aprovações documentadas

---

### Sprint 0: Limpeza de Escopo (0.5 dia) 🧹

**Objetivo**: Remover documentação fora do escopo de Design System (jornadas, regras de negócio, use cases, features)

#### Task 0.1: Remover Pastas de Documentação Não-DS
- [ ] **Deletar** `apps/storybook/stories/business-rules/` (4 arquivos)
  - Authentication.mdx
  - Overview.mdx
  - Validation.mdx
  - Permissions.mdx
- [ ] **Deletar** `apps/storybook/stories/journeys/` (3 arquivos)
  - TeacherJourney.mdx
  - StudentJourney.mdx
  - OnboardingFlow.mdx
- [ ] **Deletar** `apps/storybook/stories/use-cases/` (2 arquivos)
  - Overview.mdx
  - LoginUseCase.mdx
- [ ] **Deletar** `apps/storybook/stories/features/` (10 arquivos)
  - Missoes-*.mdx (todas)

**Total**: 19 arquivos removidos

#### Task 0.2: Revisar Pasta `examples/` com Regra Objetiva

**Regra de Decisão**:
```
SE arquivo tem:
  - Import de lógica de negócio (auth, permissions, API) → REMOVER
  - Import APENAS de @educacross/ui → MANTER
  - Props hardcoded/mock → MANTER
  - Props de backend/state management → REMOVER
```

**Procedimento**:
- [ ] Listar todos arquivos em `apps/storybook/stories/examples/`
- [ ] Para cada arquivo: verificar imports e classificar
- [ ] Preencher tabela de decisão:

| Arquivo | Imports | Tem Lógica? | Decisão | Justificativa |
|---------|---------|-------------|---------|---------------|
| MenuProfessor.stories.tsx | Button, Sidebar, Icon | ❌ | MANTER | Composição pura |
| MenuCoordenador.stories.tsx | Button, Sidebar, Icon | ❌ | MANTER | Composição pura |
| MenuAdministrador.stories.tsx | Button, Sidebar, Icon | ❌ | MANTER | Composição pura |
| [outros...] | ? | ? | ? | ? |

**Output**: `specs/001-ds-v2-melhorias/EXAMPLES-REVIEW.md`

#### Task 0.3: Atualizar Navegação do Storybook
- [ ] Verificar se `.storybook/main.ts` tem stories configuradas
- [ ] Remover referências às pastas deletadas
- [ ] Rebuild Storybook para validar

**Justificativa**: Design System deve documentar apenas:
- ✅ Componentes React (atoms, molecules)
- ✅ Ícones e assets visuais
- ✅ Tokens de design
- ✅ Padrões de composição de UI
- ❌ Jornadas de usuário (pertence a docs de produto)
- ❌ Regras de negócio (pertence a backend/domínio)
- ❌ Use cases (pertence a docs de produto)
- ❌ Features (pertence a roadmap de produto)

**Output**: Storybook focado exclusivamente em componentes de UI

---

### Sprint 1: Critical Bug Fix (1-2 dias)

#### Task 1.1: Converter Logo para SVG Inline 🔴 CRÍTICO
- [ ] Extrair SVG do arquivo `logo-educacross.svg`
- [ ] Converter para componente TSX inline
- [ ] Manter API de props idêntica
- [ ] Adicionar suporte a `currentColor` para customização
- [ ] Testar em projeto externo via npm link

**Acceptance Criteria**:
- Logo renderiza corretamente quando instalado via npm
- Props `size` e `className` funcionam
- Header component funciona (depende de Logo)
- Sem breaking changes na API

#### Task 1.2: Testes do Novo Logo
- [ ] Unit test: renderização
- [ ] Unit test: props size/className
- [ ] Integration test: dentro do Header
- [ ] Visual regression test no Storybook

#### Task 1.3: Documentação Logo
- [ ] Criar `packages/ui/src/components/Logo/README.md`
- [ ] Atualizar story do Storybook
- [ ] Adicionar nota de migração (nenhuma action necessária)

**Output**: Logo funcional + testes + docs

---

### Sprint 2: Infraestrutura de Metadata (2-3 dias)

#### Task 2.1: Criar metadata.ts
- [ ] Implementar exports de `componentList`
- [ ] Implementar exports de `iconIndex`
- [ ] Criar type `ComponentName`
- [ ] Exportar em `packages/ui/src/index.ts`

#### Task 2.2: Script de Geração de Manifest (com Validação)
- [ ] `scripts/generate-manifest.ts`
- [ ] Ler todos componentes de `src/components/` via filesystem
- [ ] Para cada componente:
  - [ ] Parsear .tsx com TypeScript AST
  - [ ] Extrair interface Props
  - [ ] Extrair JSDoc comments
  - [ ] Extrair variants do CVA (se aplicável)
- [ ] Gerar objeto JSON
- [ ] **Validar output contra schema** (Task 2.4)
- [ ] Integrar no build: `pnpm build`

**Fallback**: Se script falhar, commit manifest.json manual e investiga depois

#### Task 2.3: Script de Extração de Tokens
- [ ] `scripts/generate-tokens.ts`
- [ ] Parsear `src/styles.css` (CSS variables)
- [ ] Converter HSL → Hex
- [ ] Gerar `dist/tokens.json`
- [ ] Integrar no build

#### Task 2.4: JSON Schemas
- [ ] Criar `packages/ui/schemas/manifest.schema.json`
- [ ] Criar `packages/ui/schemas/tokens.schema.json`
- [ ] Instalar `ajv` (JSON Schema validator)
- [ ] Scripts validam output contra schema
- [ ] Copiar schemas para dist/ no build
- [ ] Publicar em GitHub Pages (opcional)

**Schema URL**: `$schema: "https://educacross.github.io/Design_System_Educacross/schemas/manifest-v1.json"`

#### Task 2.5: Testes dos Scripts de Geração
- [ ] `scripts/__tests__/generate-manifest.test.ts`
  - Test: gera manifest com todos 28 componentes
  - Test: detecta props obrigatórias
  - Test: falha gracefully se componente inválido
- [ ] `scripts/__tests__/generate-tokens.test.ts`
  - Test: extrai todas CSS variables
  - Test: converte HSL → Hex corretamente
  - Test: agrupa por categoria

**Critério**: `pnpm test:scripts` passa 100%

#### Task 2.6: Testes de Integração
- [ ] `packages/ui/src/__tests__/manifest.test.ts`
  - Test: manifest contém todos de componentList
  - Test: cada componente tem props válidas
  - Test: categories são válidas
- [ ] Script E2E de instalação:
  - Criar projeto teste temporário
  - `npm install ../packages/ui/dist`
  - Importar Logo e renderizar
  - Importar metadata e validar

**Critério**: E2E passa sem erros

#### Task 2.7: Validação CI
- [ ] `scripts/validate-docs.ts`
- [ ] Verificar README existe para cada componente
- [ ] Verificar manifest.json sincronizado
- [ ] Adicionar step no GitHub Actions

**Output**: `manifest.json`, `tokens.json`, schemas, scripts validados

---

### Sprint 3: Documentação Completa (3-5 dias)

#### Task 3.1: READMEs dos Componentes (Batch 1: Forms)
- [ ] Button/README.md ✅ (já existe, expandir)
- [ ] Input/README.md
- [ ] Label/README.md
- [ ] Checkbox/README.md
- [ ] Radio/README.md
- [ ] Select/README.md

#### Task 3.2: READMEs dos Componentes (Batch 2: Layout)
- [ ] Header/README.md
- [ ] Sidebar/README.md
- [ ] Card/README.md
- [ ] Accordion/README.md
- [ ] Tabs/README.md

#### Task 3.3: READMEs dos Componentes (Batch 3: Feedback)
- [ ] Alert/README.md
- [ ] Dialog/README.md
- [ ] Toast/README.md
- [ ] Tooltip/README.md
- [ ] Popover/README.md

#### Task 3.4: READMEs dos Componentes (Batch 4: Data/Misc)
- [ ] Table/README.md
- [ ] Pagination/README.md
- [ ] Badge/README.md
- [ ] Avatar/README.md
- [ ] AvatarIcon/README.md
- [ ] Skeleton/README.md
- [ ] Logo/README.md ✅ (Task 1.3)
- [ ] Icon/README.md
- [ ] CustomIcon/README.md
- [ ] ThemeSwitcher/README.md
- [ ] DropdownMenu/README.md

#### Task 3.5: API Reference Completa
- [ ] Atualizar `apps/storybook/stories/getting-started/API.mdx`
- [ ] Adicionar 13 componentes faltantes
- [ ] Validar props tables contra manifest.json

**Output**: 28 READMEs + API Reference completa

---

### Sprint 4: AI Readiness (1-2 dias)

#### Task 4.1: AI Guide
- [ ] Criar `packages/ui/docs/AI-GUIDE.md`
- [ ] Seção: Discovery programático
- [ ] Seção: Component patterns
- [ ] Seção: Common mistakes
- [ ] Seção: Validation rules

#### Task 4.2: ForAI.mdx no Storybook
- [ ] Criar story `getting-started/ForAI.mdx`
- [ ] Link para AI-GUIDE.md
- [ ] Exemplos de uso do manifest.json
- [ ] Code snippets para parsing

#### Task 4.3: Migration Guide
- [ ] Criar `packages/ui/docs/MIGRATION-v2.md`
- [ ] Documentar mudança do Logo (zero breaking)
- [ ] Novos exports disponíveis
- [ ] Como usar manifest.json

**Output**: Documentação IA + Migration guide

---

### Sprint 5: Publicação e Validação (1 dia)

#### Task 5.1: Bump Version
- [ ] Atualizar para `0.2.0` em `package.json`
- [ ] Atualizar em `metadata.ts`
- [ ] Criar tag `v0.2.0`

#### Task 5.2: Build e Testes Finais
- [ ] `pnpm build` gera manifest.json e tokens.json
- [ ] `pnpm test` passa 100%
- [ ] `pnpm lint` sem erros
- [ ] `pnpm typecheck` sem erros

#### Task 5.3: Publicar
- [ ] `npm publish` para GitHub Packages
- [ ] Push tag `v0.2.0`
- [ ] Deploy Storybook atualizado

#### Task 5.4: Validação Externa
- [ ] Instalar `@fabioeducacross/ui@0.2.0` em projeto teste
- [ ] Validar Logo renderiza
- [ ] Validar `import { metadata }` funciona
- [ ] Validar manifest.json acessível
- [ ] **Validar tree-shaking**: build com apenas Button deve gerar < 50KB

**Tree-Shaking Test**:
```bash
mkdir /tmp/test-treeshake && cd /tmp/test-treeshake
npm init -y && npm install @fabioeducacross/ui@0.2.0
echo "import { Button } from '@fabioeducacross/ui';" > index.js
npx vite build
# Verificar que bundle não contém Dialog, Table, etc
```

#### Task 5.5: Preparar Rollback Plan
- [ ] Garantir v0.1.1 ainda acessível
- [ ] Criar branch `hotfix/revert-logo-inline` (sem merge)
- [ ] Documentar comandos de rollback em `ROLLBACK.md`

**Rollback Commands** (se necessário):
```bash
# 1. Unpublish (CUIDADO: irreversível)
npm unpublish @fabioeducacross/ui@0.2.0 --force

# 2. Deletar tag
git push origin :refs/tags/v0.2.0

# 3. Publicar hotfix
git checkout hotfix/revert-logo-inline
npm version patch  # v0.1.2
npm publish
```

**Critério**: Tempo de rollback < 15 minutos

**Output**: `v0.2.0` publicado, validado e com plano de contingência

## Success Metrics

### Quantitativos
- [ ] Logo funciona em 100% dos casos (testado em projeto externo)
- [ ] 28/28 componentes com README
- [ ] manifest.json com 100% dos componentes
- [ ] tokens.json com 50+ tokens
- [ ] **Line coverage >80% em `src/components/**/*.tsx`** (excluindo .test e .stories)
- [ ] **Branch coverage >70% em componentes críticos** (Button, Input, Logo)
- [ ] **Bundle size < 150KB gzip** (medido via bundlephobia ou build analysis)
- [ ] **Tree-shaking validado**: `import { Button }` gera bundle < 50KB

**Configuração Coverage** (`vitest.config.ts`):
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

### Qualitativos
- [ ] Desenvolvedores encontram componentes rapidamente
- [ ] Agentes IA conseguem gerar código válido
- [ ] Storybook serve como fonte única de verdade
- [ ] Zero regressions em projetos consumidores

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Logo inline aumenta bundle | Médio | Medir antes/depois; < 5KB aceitável |
| Breaking change não detectado | Alto | Testes em projetos reais antes de publicar |
| Scripts de geração falham em CI | Médio | Fallback para manifests committed |
| Documentação desatualiza | Baixo | CI check valida sincronização |

## Rollout Plan

### Fase 1: Hotfix (Imediato)
- Publicar `v0.1.2` apenas com Logo fix
- Notificar projetos dependentes

### Fase 2: Soft Launch (Semana 1)
- Publicar `v0.2.0-beta.1` com metadata
- Testar em 2-3 projetos internos
- Coletar feedback

### Fase 3: Full Release (Semana 2)
- Publicar `v0.2.0` estável
- Anunciar em canais internos
- Atualizar projetos gradualmente

### Fase 4: Documentation Push (Semana 3-4)
- Completar 28 READMEs
- AI Guide refinado com exemplos reais
- Workshop interno de uso do DS

## Aprovações Necessárias

- [ ] **Tech Lead**: Abordagem técnica (inline SVG)
- [ ] **Design**: Conversão SVG mantém fidelidade visual
- [ ] **DevEx**: Experiência de uso melhorada
- [ ] **Security**: Nenhuma vulnerabilidade introduzida

## Next Steps After Completion

1. **v0.3.0**: React 19 support
2. **v0.4.0**: Figma Tokens sync automatizado
3. **v1.0.0**: API stable, commitment de retrocompatibilidade

---

**Estimativa Total**: 10-16 dias (com correções de gaps)
**Priority Tracks**: 
- 🔍 Sprint -1 (Pre-Flight): CRÍTICO, coleta requisitos
- 🧹 Sprint 0 (Limpeza): PREPARAÇÃO, clarifica escopo
- 🔴 Sprint 1 (Logo): CRÍTICO, bloqueia produção
- 🟡 Sprints 2-3: HIGH, melhora DX significativamente (com validação robusta)
- 🟢 Sprints 4-5: MEDIUM, nice-to-have mas valioso

**Arquivos a Remover**: 19 arquivos MDX (business-rules, journeys, use-cases, features)

**Alteração vs Plano Original**: +1.5 dias para validação e testes robustos (gaps críticos resolvidos)

**Referência**: Ver análise completa de gaps em `GAPS-ANALYSIS.md`
