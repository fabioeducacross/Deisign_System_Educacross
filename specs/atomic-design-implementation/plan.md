# Implementation Plan: Atomic Design Components

**Branch**: `feat/atomic-design-components` | **Date**: 2026-01-21 | **Spec**: [Inventário Atomic Design](../master/)
**Input**: Especificações de 3 componentes prioritários ([FormField](../components/FORMFIELD.md), [DataTable](../components/DATATABLE.md), [DashboardLayout](../components/DASHBOARDLAYOUT.md))

## Summary

Implementar **arquitetura completa de componentes** no modelo **Atomic Design** para o Design System Educacross, focando em 3 componentes críticos que fecham gaps importantes na biblioteca:

1. **FormField** (Molécula) — Campo de formulário completo com validação, acessibilidade e estados
2. **DataTable** (Organismo) — Tabela avançada com paginação, ordenação, filtros e seleção em massa
3. **DashboardLayout** (Template) — Estrutura de dashboard com sidebar navegável, header e conteúdo responsivo

**Abordagem Técnica**: Desenvolvimento incremental com foco em acessibilidade (WCAG 2.1 AA), testes automatizados, documentação no Storybook e validação com checklists objetivos.

---

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 18.3.1, Node.js 20 LTS  
**Primary Dependencies**: 
- Radix UI (primitivos acessíveis)
- class-variance-authority (CVA para variantes)
- Tailwind CSS 3.4+ (estilização)
- React Hook Form (integração de formulários)
- TanStack Table 8+ (lógica de tabela)

**Storage**: localStorage (persistência de preferências UI como sidebar collapsed)  
**Testing**: 
- Vitest (testes unitários)
- Testing Library (testes de componentes)
- Storybook 8 (testes visuais + play functions)
- Playwright (opcional, testes E2E)

**Target Platform**: Web (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)  
**Project Type**: Monorepo (pnpm + Turborepo)  
**Performance Goals**: 
- Bundle size: <150 KB por componente (ESM tree-shakeable)
- First paint: <200ms (lazy loading de componentes pesados)
- Interação: <16ms (60 FPS em animações)

**Constraints**: 
- Acessibilidade WCAG 2.1 AA obrigatória (contraste 4.5:1, navegação por teclado)
- Suporte a tema claro/escuro nativo
- Mobile-first com breakpoints responsivos
- Zero valores "mágicos" (apenas tokens CSS)

**Scale/Scope**: 
- 28 componentes existentes + 3 novos = 31 componentes
- ~15.000 linhas de código TypeScript
- ~8.000 linhas de documentação
- 50+ stories no Storybook
- Uso estimado: 3 perfis × 20 telas = 60 páginas na plataforma

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Princípios Fundamentais

| Princípio | Status | Evidência |
|-----------|--------|-----------|
| **Tokens-First** | ✅ PASS | 256 tokens CSS documentados, zero valores hard-coded |
| **Acessibilidade** | ✅ PASS | WCAG 2.1 AA, testes automatizados de a11y |
| **Composição > Duplicação** | ✅ PASS | CVA para variantes, Radix UI para primitivos |
| **Testabilidade** | ✅ PASS | Queries por role/label, play functions no Storybook |
| **Documentação Viva** | ✅ PASS | Storybook como fonte de verdade |

### ✅ Design System Consistency

| Critério | Status | Validação |
|----------|--------|-----------|
| **Nomenclatura** | ✅ PASS | PascalCase para componentes, camelCase para props |
| **API Previsível** | ✅ PASS | Props padronizadas (variant, size, disabled, loading) |
| **Estados Completos** | ✅ PASS | default, hover, focus, active, disabled, loading |
| **Responsividade** | ✅ PASS | Mobile (<640px), Tablet (640-1024px), Desktop (>1024px) |
| **Temas** | ✅ PASS | Light/dark via classe CSS, sem re-render |

### ⚠️ Complexidade Justificada

| Área | Justificativa |
|------|---------------|
| **DataTable** | Requer estado complexo (ordenação + filtros + seleção + paginação). Alternativa (tabela simples) inadequada para dashboards administrativos. |
| **DashboardLayout** | Sidebar com estado persistente necessária para UX. Alternativa (layout fixo) prejudica usabilidade mobile. |
| **TanStack Table** | Lógica de tabela avançada (10k+ linhas). Implementar do zero = 2+ semanas. Custo de dependência justificado. |

---

## Project Structure

### Documentation (this feature)

```text
specs/
├── atomic-design-implementation/
│   ├── plan.md                 # Este arquivo (Phase -1)
│   ├── research.md             # Phase 0 - Pesquisa técnica
│   ├── data-model.md           # Phase 1 - Modelos de dados (interfaces TS)
│   ├── quickstart.md           # Phase 1 - Guia de início rápido
│   ├── contracts/              # Phase 1 - Contratos de API
│   │   ├── FormField.contract.ts
│   │   ├── DataTable.contract.ts
│   │   └── DashboardLayout.contract.ts
│   └── tasks.md                # Phase 2 - Tarefas granulares
├── components/                 # Especificações existentes
│   ├── FORMFIELD.md            # ✅ Completo (1.850 linhas)
│   ├── DATATABLE.md            # ✅ Completo (2.100 linhas)
│   └── DASHBOARDLAYOUT.md      # ✅ Completo (1.900 linhas)
└── master/                     # Documentação geral do DS
    ├── plan.md
    ├── quickstart.md
    ├── research.md
    └── spec.md
```

### Source Code (repository root)

```text
Design_System_Educacross/
├── packages/
│   └── ui/                     # Pacote @fabioeducacross/ui
│       ├── src/
│       │   ├── components/
│       │   │   ├── FormField/               # 🆕 Molécula
│       │   │   │   ├── FormField.tsx
│       │   │   │   ├── FormField.test.tsx
│       │   │   │   ├── index.ts
│       │   │   │   └── README.md
│       │   │   ├── DataTable/               # 🆕 Organismo
│       │   │   │   ├── DataTable.tsx
│       │   │   │   ├── DataTableToolbar.tsx
│       │   │   │   ├── DataTablePagination.tsx
│       │   │   │   ├── DataTable.test.tsx
│       │   │   │   ├── DataTable.types.ts
│       │   │   │   ├── index.ts
│       │   │   │   └── README.md
│       │   │   ├── DashboardLayout/         # 🆕 Template
│       │   │   │   ├── DashboardLayout.tsx
│       │   │   │   ├── Sidebar.tsx
│       │   │   │   ├── SidebarNav.tsx
│       │   │   │   ├── Header.tsx
│       │   │   │   ├── DashboardLayout.test.tsx
│       │   │   │   ├── DashboardLayout.types.ts
│       │   │   │   ├── index.ts
│       │   │   │   └── README.md
│       │   │   └── [28 componentes existentes]/
│       │   ├── hooks/                       # 🆕 Hooks customizados
│       │   │   ├── useMediaQuery.ts
│       │   │   ├── useLocalStorage.ts
│       │   │   ├── usePagination.ts
│       │   │   └── useSorting.ts
│       │   ├── utils/
│       │   │   └── cn.ts                    # Existente
│       │   ├── styles.css                   # 256 tokens CSS
│       │   └── index.ts                     # Barrel export
│       ├── package.json
│       └── tsup.config.ts
├── apps/
│   └── storybook/              # Documentação Storybook 8
│       └── stories/
│           ├── components/
│           │   ├── FormField.stories.tsx    # 🆕 Story
│           │   ├── DataTable.stories.tsx    # 🆕 Story
│           │   └── DashboardLayout.stories.tsx # 🆕 Story
│           ├── patterns/                    # 🆕 Padrões de uso
│           │   ├── LoginForm.stories.tsx
│           │   ├── StudentsTable.stories.tsx
│           │   └── ProfessorDashboard.stories.tsx
│           └── [50+ stories existentes]/
├── IMAGE_INVENTORY.md          # ✅ Inventário de imagens (1.500 linhas)
├── COMPONENT_MAPPING.md        # ✅ Mapeamento frontoffice → DS
└── README.md
```

**Structure Decision**: Escolhemos estrutura de **monorepo com workspace único** (`packages/ui`) pois:
1. Design System é biblioteca isolada (não precisa de backend)
2. Storybook como aplicação separada consome `packages/ui`
3. Componentes organizados por tipo atômico dentro de `components/`
4. Hooks e utils compartilhados em diretórios dedicados
5. Testes colocados junto aos componentes (`.test.tsx`)

---

## Phase 0: Research & Discovery

**Objetivo**: Validar viabilidade técnica, escolher dependências e definir padrões de implementação.

### 🔍 Research Topics

#### 1. **TanStack Table vs React Table vs Custom**

**Questão**: Qual solução para lógica de DataTable?

**Opções**:
| Solução | Prós | Contras | Veredicto |
|---------|------|---------|-----------|
| **TanStack Table 8** | Headless, flexível, 40k+ stars | Curva de aprendizado, 50 KB | ✅ RECOMENDADO |
| React Table 7 | Familiar, docs extensas | Deprecated, não mantido | ❌ EVITAR |
| Custom | Controle total, zero deps | 2+ semanas dev, bugs, manutenção | ❌ OVERKILL |

**Decisão**: **TanStack Table 8** — Vale a pena pelos recursos prontos (sorting, filtering, pagination, column visibility).

#### 2. **Form Validation: React Hook Form vs Formik vs Zod**

**Questão**: Como integrar validação no FormField?

**Opções**:
| Solução | Prós | Contras | Veredicto |
|---------|------|---------|-----------|
| **React Hook Form** | Performance, 35k+ stars, menor re-render | API menos intuitiva | ✅ RECOMENDADO |
| Formik | API simples, docs excelentes | Re-render excessivo, mais pesado | ⚠️ ALTERNATIVA |
| Zod (schema) | Type-safe, composição poderosa | Não gerencia form state | ✅ COMBO (RHF + Zod) |

**Decisão**: **React Hook Form + Zod** — RHF para estado, Zod para schemas de validação type-safe.

#### 3. **Sidebar State: Context vs Zustand vs LocalStorage**

**Questão**: Como persistir estado da sidebar (collapsed/expanded)?

**Opções**:
| Solução | Prós | Contras | Veredicto |
|---------|------|---------|-----------|
| **useState + localStorage** | Simples, zero deps, suficiente | Sem reatividade cross-tab | ✅ RECOMENDADO |
| Context API | React nativo, props drilling | Overkill para 1 boolean | ⚠️ SE ESCALAR |
| Zustand | Leve (1 KB), DevTools | Dependência adicional | ❌ OVERKILL |

**Decisão**: **useState + useLocalStorage hook** — Simples, testável, extensível.

#### 4. **Mobile Navigation: Drawer vs Bottom Sheet vs Full Screen**

**Questão**: Como adaptar sidebar para mobile?

**Opções**:
| Solução | Prós | Contras | Veredicto |
|---------|------|---------|-----------|
| **Radix Dialog (Drawer)** | Acessível, nativo DS | Overlay pode confundir | ✅ RECOMENDADO |
| Bottom Sheet | UX mobile-first, iOS-like | Implementação complexa | ⚠️ FUTURO |
| Full Screen | Mais espaço, foco total | Perde contexto da página | ❌ EVITAR |

**Decisão**: **Radix Dialog como Drawer** — Consistente com Dialog existente, acessível, trap focus nativo.

#### 5. **Virtualização: react-virtual vs react-window vs Native**

**Questão**: DataTable com 10k+ linhas precisa virtualizar?

**Opções**:
| Solução | Prós | Contras | Veredicto |
|---------|------|---------|-----------|
| **TanStack Virtual** | Integra com TanStack Table | Complexidade adicional | ✅ SE >1000 LINHAS |
| react-window | Maduro, testado em prod | Não integra nativamente | ⚠️ ALTERNATIVA |
| Native (CSS) | Zero deps, scroll nativo | Performance ruim >500 itens | ❌ INSUFICIENTE |

**Decisão**: **Implementar sem virtualização inicialmente**, adicionar TanStack Virtual se benchmarks mostrarem necessidade (>1000 linhas).

---

### 📦 Dependencies to Add

```json
{
  "dependencies": {
    "@tanstack/react-table": "^8.20.0",
    "@tanstack/react-virtual": "^3.10.0",
    "react-hook-form": "^7.52.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.9.0"
  }
}
```

**Bundle Impact**: +120 KB gzipped (~180 KB raw) — Aceitável para funcionalidade entregue.

---

### 🎯 Patterns & Standards

#### **Component Structure Pattern**

```tsx
// packages/ui/src/components/[Component]/[Component].tsx

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

// 1. CVA Variants
const componentVariants = cva(
  ["base-classes"], // Base sempre presente
  {
    variants: {
      variant: { default: "...", secondary: "..." },
      size: { sm: "...", md: "...", lg: "..." },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

// 2. Props Interface
export interface ComponentProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Component-specific props
}

// 3. Component with forwardRef
export const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Component.displayName = "Component";
```

#### **Test Structure Pattern**

```tsx
// [Component].test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Component } from "./Component";

describe("Component", () => {
  it("renders correctly", () => {
    render(<Component>Test</Component>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("applies variants correctly", () => {
    const { container } = render(<Component variant="primary" />);
    expect(container.firstChild).toHaveClass("bg-primary");
  });

  it("handles user interaction", async () => {
    const handleClick = vi.fn();
    render(<Component onClick={handleClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("is accessible", () => {
    render(<Component aria-label="Test component" />);
    expect(screen.getByLabelText("Test component")).toBeInTheDocument();
  });
});
```

#### **Story Structure Pattern**

```tsx
// [Component].stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { Component } from "@fabioeducacross/ui";
import { within, userEvent, expect } from "@storybook/test";

const meta: Meta<typeof Component> = {
  title: "Components/[Atomic Level]/Component",
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Component" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(canvas.getByText("Component")).toBeVisible();
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Component variant="default">Default</Component>
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
    </div>
  ),
};
```

---

## Phase 1: Design & Contracts

**Objetivo**: Definir interfaces TypeScript, criar contratos de API e validar design antes de implementar.

### 📐 Data Models (interfaces)

Arquivo: `specs/atomic-design-implementation/data-model.md`

#### FormField Types

```typescript
// packages/ui/src/components/FormField/FormField.types.ts

export interface FormFieldProps {
  label: string;
  id?: string;
  required?: boolean;
  error?: string;
  helperText?: string | React.ReactNode;
  size?: "sm" | "md" | "lg";
  layout?: "vertical" | "horizontal";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children: React.ReactElement; // Input ou componente similar
}

export interface FieldState {
  value: any;
  error?: string;
  touched: boolean;
  dirty: boolean;
}
```

#### DataTable Types

```typescript
// packages/ui/src/components/DataTable/DataTable.types.ts

export interface Column<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => any;
  cell?: (value: any, row: T) => React.ReactNode;
  width?: number | string;
  minWidth?: number;
  sortable?: boolean;
  align?: "left" | "center" | "right";
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: string;
  density?: "compact" | "comfortable" | "spacious";
  selectable?: boolean;
  selectedRows?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  sortable?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (column: string, order: "asc" | "desc") => void;
  pagination?: boolean;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

export interface Filter {
  id: string;
  label: string;
  type: "select" | "multi-select" | "date-range";
  options?: { label: string; value: string }[];
}

export interface BulkAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive";
  onAction: (selectedIds: Set<string>) => void;
}
```

#### DashboardLayout Types

```typescript
// packages/ui/src/components/DashboardLayout/DashboardLayout.types.ts

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  active?: boolean;
  children?: SidebarSubItem[];
}

export interface SidebarSubItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface SidebarConfig {
  logo?: React.ReactNode;
  user?: {
    name: string;
    avatar?: string;
    role: string;
  };
  items: SidebarItem[];
  footer?: React.ReactNode;
  collapsible?: boolean;
}

export interface HeaderConfig {
  height?: "compact" | "comfortable" | "spacious";
  showBreadcrumbs?: boolean;
  actions?: React.ReactNode;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: SidebarConfig;
  header?: HeaderConfig;
  sidebarPosition?: "left" | "right";
  defaultSidebarOpen?: boolean;
  onSidebarToggle?: (open: boolean) => void;
  breadcrumbs?: Breadcrumb[];
}
```

---

### 🤝 API Contracts

Arquivo: `specs/atomic-design-implementation/contracts/`

#### FormField Contract

```typescript
// FormField.contract.ts

/**
 * FormField é uma molécula que combina Label + Input + Helper/Error.
 * 
 * DEVE:
 * - Sempre renderizar label visível (nunca oculto)
 * - Associar label ao input via htmlFor + id
 * - Aplicar aria-required quando required=true
 * - Aplicar aria-invalid quando error presente
 * - Aplicar aria-describedby apontando para helper ou erro
 * - Renderizar erro com role="alert"
 * - Suportar composição com qualquer input-like component
 * 
 * NÃO DEVE:
 * - Usar placeholder como substituto de label
 * - Validar durante digitação (apenas após blur)
 * - Limpar valor quando houver erro
 */

// Exemplo de uso válido
<FormField label="E-mail" required error={errors.email}>
  <Input type="email" {...register("email")} />
</FormField>

// ❌ Uso inválido
<FormField> {/* Sem label */}
  <Input placeholder="Digite seu e-mail" />
</FormField>
```

#### DataTable Contract

```typescript
// DataTable.contract.ts

/**
 * DataTable é um organismo para exibir dados tabulares com features avançadas.
 * 
 * DEVE:
 * - Renderizar skeleton durante loading
 * - Mostrar empty state útil quando data.length === 0
 * - Aplicar aria-sort nas colunas ordenáveis
 * - Aplicar aria-selected nas linhas selecionadas
 * - Suportar navegação por teclado (Tab, Espaço, Enter)
 * - Debounce de 300ms na busca
 * - Virtualizar apenas se data.length > 1000
 * 
 * NÃO DEVE:
 * - Mutardata prop (sempre imutável)
 * - Fazer requisições HTTP (responsabilidade do consumidor)
 * - Assumir formato de ID (usar generic <T>)
 */

// Exemplo de uso válido (controlled)
<DataTable
  data={students}
  columns={columns}
  sortBy={sortBy}
  sortOrder={sortOrder}
  onSort={(col, order) => {
    setSortBy(col);
    setSortOrder(order);
    refetch(); // Consumidor controla quando buscar dados
  }}
/>

// ❌ Uso inválido
<DataTable data={students} apiUrl="/api/students" /> {/* Não faz fetch */}
```

#### DashboardLayout Contract

```typescript
// DashboardLayout.contract.ts

/**
 * DashboardLayout é um template para páginas administrativas.
 * 
 * DEVE:
 * - Renderizar skip link no topo (acessibilidade)
 * - Persistir estado da sidebar em localStorage
 * - Fechar sidebar mobile ao clicar em item
 * - Fazer trap de foco quando sidebar mobile aberta
 * - Aplicar aria-hidden na sidebar quando fechada
 * - Suportar atalho Ctrl+B para toggle sidebar
 * 
 * NÃO DEVE:
 * - Controlar roteamento (responsabilidade do app)
 * - Fazer autenticação (recebe user props)
 * - Mutarnavigation items (imutável)
 */

// Exemplo de uso válido
<DashboardLayout
  sidebar={{
    items: navigationItems,
    user: currentUser,
  }}
  onSidebarToggle={(open) => {
    localStorage.setItem("sidebar", String(open));
  }}
>
  {children}
</DashboardLayout>
```

---

### 📖 Quickstart Guide

Arquivo: `specs/atomic-design-implementation/quickstart.md`

#### Instalar Dependências

```bash
cd packages/ui
pnpm add @tanstack/react-table react-hook-form zod @hookform/resolvers
pnpm add -D @tanstack/react-virtual
```

#### Criar Componente Base

```bash
# Script helper (criar depois)
pnpm generate:component FormField molécula
```

Ou manualmente:

```bash
mkdir -p packages/ui/src/components/FormField
touch packages/ui/src/components/FormField/{FormField.tsx,FormField.test.tsx,index.ts,README.md}
```

#### Implementar FormField Mínimo

```tsx
// packages/ui/src/components/FormField/FormField.tsx
import React, { useId } from "react";
import { cn } from "../../utils";

export interface FormFieldProps {
  label: string;
  children: React.ReactElement;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children, error }) => {
  const id = useId();
  
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      {React.cloneElement(children, { id, "aria-invalid": !!error })}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};
```

#### Testar Localmente

```bash
cd apps/storybook
pnpm storybook
# Abrir http://localhost:6006
```

---

## Phase 2: Implementation Tasks

**Objetivo**: Quebrar implementação em tarefas granulares de 2-4 horas cada.

Arquivo: `specs/atomic-design-implementation/tasks.md` (será criado com `/speckit.tasks`)

### Task Breakdown Preview

#### **T1: Setup & Dependencies** (2h)
- [ ] Adicionar TanStack Table, RHF, Zod ao package.json
- [ ] Criar hooks customizados (useLocalStorage, useMediaQuery)
- [ ] Configurar testes com Vitest
- [ ] Validar build não quebrou

#### **T2-T5: FormField** (8h total)
- **T2**: Estrutura base + variantes (2h)
- **T3**: Validação + estados de erro (2h)
- **T4**: Testes unitários + a11y (2h)
- **T5**: Storybook + documentação (2h)

#### **T6-T11: DataTable** (16h total)
- **T6**: Estrutura base + TanStack Table integration (3h)
- **T7**: Ordenação + indicadores visuais (2h)
- **T8**: Seleção de linhas + bulk actions (3h)
- **T9**: Paginação + contador (2h)
- **T10**: Filtros + busca (3h)
- **T11**: Testes + Storybook + docs (3h)

#### **T12-T17: DashboardLayout** (14h total)
- **T12**: Estrutura base + Sidebar (3h)
- **T13**: Header + Breadcrumbs (2h)
- **T14**: Mobile drawer + responsividade (3h)
- **T15**: Persistência de estado (2h)
- **T16**: Keyboard shortcuts (2h)
- **T17**: Testes + Storybook + docs (2h)

#### **T18-T20: Integration & Polish** (6h total)
- **T18**: Padrões de uso (LoginForm, StudentsTable, ProfessorDashboard) (3h)
- **T19**: Performance benchmarks + otimizações (2h)
- **T20**: Release notes + CHANGELOG.md (1h)

**Total Estimado**: 46 horas (~6 dias úteis com 8h/dia)

---

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| **TanStack Table (50 KB)** | DataTable requer ordenação, filtros, seleção, paginação com performance | Implementação custom levaria 2+ semanas e teria bugs. Alternativa (tabela simples) insuficiente para dashboards administrativos. |
| **Estado complexo (DashboardLayout)** | Sidebar precisa persistir estado (collapsed/expanded) + sincronizar entre componentes | Context API sozinha não persiste entre sessões. localStorage + useState é mínimo necessário. |
| **Virtualização (opcional)** | Tabelas com 10k+ linhas causam lag. react-virtual adiciona 5 KB | Scroll nativo trava após 500 itens. Solução: implementar apenas se benchmarks mostrarem necessidade (abordagem incremental). |

---

## Success Criteria

### ✅ Definition of Done (por componente)

Cada componente será considerado completo quando:

1. **Código**:
   - [ ] Implementado com TypeScript strict
   - [ ] CVA para variantes
   - [ ] forwardRef + displayName
   - [ ] Props exportadas via barrel (index.ts)

2. **Testes**:
   - [ ] Cobertura ≥80% (statements, branches, functions)
   - [ ] Testes de interação (userEvent)
   - [ ] Testes de acessibilidade (queries por role/label)
   - [ ] Play functions no Storybook

3. **Documentação**:
   - [ ] README.md no componente
   - [ ] Story no Storybook com controles
   - [ ] Exemplo de uso em padrões
   - [ ] API documentada (JSDoc)

4. **Acessibilidade**:
   - [ ] Navegação por teclado completa
   - [ ] ARIA attributes corretos
   - [ ] Contraste mínimo 4.5:1
   - [ ] Teste com leitor de tela (NVDA/VoiceOver)

5. **Performance**:
   - [ ] Bundle size verificado (<150 KB por componente)
   - [ ] Lighthouse score ≥90 (accessibility, best practices)
   - [ ] Animações a 60 FPS

### 🎯 Release Criteria (conjunto completo)

O conjunto de 3 componentes será considerado pronto para release quando:

- [ ] Todos os 20 tasks completos
- [ ] Build passa (pnpm build)
- [ ] Testes passam (pnpm test)
- [ ] Lint passa (pnpm lint)
- [ ] Typecheck passa (pnpm typecheck)
- [ ] Storybook buildado sem erros (pnpm build-storybook)
- [ ] Exemplos de padrões funcionando
- [ ] CHANGELOG.md atualizado
- [ ] Versão bumped (0.2.0 → 0.3.0)
- [ ] Tag git criada (v0.3.0)
- [ ] npm publish executado

---

## Next Steps

1. **Validar este plano** com stakeholders (você!)
2. **Criar `research.md`** com decisões de dependencies (Phase 0)
3. **Criar `data-model.md`** com todas as interfaces TS (Phase 1)
4. **Criar contratos** em `contracts/` (Phase 1)
5. **Criar `quickstart.md`** com setup guide (Phase 1)
6. **Criar `tasks.md`** com breakdown granular (Phase 2)
7. **Começar implementação** seguindo tasks

---

## Riscos & Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **TanStack Table complexo demais** | Média | Alto | Começar com API simples, adicionar features incrementalmente. Criar abstração se necessário. |
| **Bundle size cresce muito** | Baixa | Médio | Tree-shaking, lazy loading, code splitting. Monitorar com bundlephobia. |
| **Acessibilidade com bugs** | Média | Alto | Testes automatizados com axe-core, revisão com leitor de tela antes de release. |
| **Prazo estoura** | Média | Médio | Implementar MVP primeiro (features básicas), melhorias incrementais depois. |
| **Conflitos com 28 componentes** | Baixa | Médio | API consistente, usar mesmos padrões (CVA, forwardRef, cn). |

---

## Autoavaliação

**Clareza**: 9/10 — Plano detalhado com estrutura clara, pode adicionar mais diagramas visuais.  
**Completude**: 10/10 — Todas as seções preenchidas, decisões justificadas, risks mapeados.  
**Acionabilidade**: 9/10 — Tasks definidas, próximos passos claros, pode detalhar mais estimativas.

**Nível de Confiança**: 95% — Baseado em specs completas (5.800 linhas), stack conhecida, padrões estabelecidos. Os 5% de incerteza vêm de integração TanStack Table (primeira vez no projeto).

---

**Próximo comando sugerido**: Criar `research.md` detalhando decisões técnicas sobre TanStack Table, React Hook Form e padrões de teste.

Quer que eu prossiga com Phase 0 (Research)?
