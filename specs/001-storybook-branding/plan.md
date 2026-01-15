# Implementation Plan: Customização Visual Profissional do Storybook

**Branch**: `001-storybook-branding` | **Date**: 15/01/2026 | **Spec**: Identidade Visual Educacross
**Input**: Design System atual + Tokens CSS + Brand Guidelines da Educacross

## Summary

Transformar o Storybook em uma documentação visual profissional que reflita a identidade da marca Educacross, aplicando tokens CSS consistentes, customizando tema dark/light, criando página inicial branded, e implementando componentes de navegação e apresentação premium.

**Abordagem Técnica**: Customização completa do tema via Storybook Theming API + componentes MDX customizados + CSS tokens para consistência visual.

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 18.3.1, Storybook 8.6.15  
**Primary Dependencies**: @storybook/theming, @storybook/addon-themes, Tailwind CSS 3.4+, Montserrat font  
**Storage**: N/A (documentação estática)  
**Testing**: Visual regression (Playwright), A11y tests (@storybook/addon-a11y)  
**Target Platform**: Web (GitHub Pages deployment)  
**Project Type**: Web documentation (monorepo com apps/storybook)  
**Performance Goals**: 
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse Score > 90 (Performance, Accessibility, Best Practices)

**Constraints**: 
- Manter compatibilidade com deploy GitHub Pages
- Preservar todos tokens CSS existentes
- Garantir acessibilidade WCAG 2.1 AA
- Suportar dark mode nativo

**Scale/Scope**: 
- 14 arquivos MDX (jornadas, features, use cases, missões)
- 20+ componentes documentados
- 4 seções principais (Fundamentos, Componentes, Padrões, Jornadas)

## Constitution Check

✅ **Passes All Gates**:
- Single project structure (monorepo válido)
- Usa tokens CSS existentes (sem hard-coded values)
- TypeScript strict mode ativo
- Acessibilidade validada via @storybook/addon-a11y
- Componentização segue atomic design principles

## Project Structure

### Documentation (this feature)

```text
specs/001-storybook-branding/
├── plan.md              # Este arquivo
├── research.md          # Análise de UX patterns em Design Systems
├── design-tokens.md     # Mapeamento completo de tokens visuais
├── quickstart.md        # Guia de implementação rápida
├── contracts/
│   ├── theme-contract.ts       # Interface do tema Educacross
│   └── component-variants.ts   # Variantes visuais dos componentes
└── tasks.md             # Breakdown de implementação (criado por /speckit.tasks)
```

### Source Code (repository root)

```text
apps/storybook/
├── .storybook/
│   ├── main.ts                    # ✅ Já existe - adicionar addons
│   ├── preview.ts                 # ✅ Já existe - customizar decorators
│   ├── manager.ts                 # ✅ Já existe - aplicar tema
│   ├── theme.ts                   # 🔄 Refatorar - tema Educacross premium
│   └── educacross-theme.ts        # ✨ NOVO - tema dark customizado
│
├── public/
│   ├── logo-educacross.svg        # ✅ Já existe
│   ├── logo-educacross-dark.svg   # ✨ NOVO - logo para dark mode
│   ├── favicon.ico                # ✨ NOVO - favicon Educacross
│   └── og-image.png               # ✨ NOVO - Open Graph meta image
│
├── src/
│   ├── styles.css                 # ✅ Já existe - importar no Storybook
│   └── components/
│       ├── MermaidDiagram.tsx     # ✅ Já existe - estilizado
│       ├── Callout.tsx            # ✅ Já existe - estilizado
│       ├── Section.tsx            # ✅ Já existe - estilizado
│       ├── DiagramGrid.tsx        # ✅ Já existe - estilizado
│       ├── BrandHeader.tsx        # ✨ NOVO - cabeçalho branded
│       ├── FeatureCard.tsx        # ✨ NOVO - cards de feature
│       ├── ColorPalette.tsx       # ✨ NOVO - showcase de cores
│       └── TokenShowcase.tsx      # ✨ NOVO - visualizador de tokens
│
└── stories/
    ├── Introduction.mdx           # 🔄 Refatorar - página inicial premium
    ├── foundations/
    │   ├── Colors.stories.tsx     # 🔄 Melhorar - paleta interativa
    │   ├── Typography.stories.tsx # 🔄 Melhorar - hierarquia visual
    │   ├── Spacing.stories.tsx    # 🔄 Melhorar - grid de espaçamento
    │   └── Icons.stories.tsx      # 🔄 Melhorar - catálogo de ícones
    │
    ├── components/               # ✅ 20+ componentes já documentados
    ├── patterns/                 # ✅ Padrões já documentados
    └── journeys/                 # ✅ Jornadas já documentadas

packages/ui/
└── src/
    └── styles.css                # ✅ Tokens CSS - fonte de verdade
```

**Structure Decision**: Mantém monorepo atual (packages/ui + apps/storybook). Novos componentes visuais ficam em `apps/storybook/src/components` pois são específicos da documentação, não do design system publicável.

## Phase 0: Research & Discovery

### 0.1 Benchmark de Design Systems Premium

**Objetivo**: Identificar padrões visuais de documentações profissionais

**Referências a analisar**:
1. **Monday Vibe Design System** ⭐ (PRINCIPAL) - navegação limpa, sidebar moderna, código inline
   - URL: https://vibe.monday.com/
   - Destaques: Sidebar com ícones coloridos, hero section minimalista, componentes com preview ao vivo
2. **Material Design 3** (Google) - navegação, hierarquia
3. **Polaris** (Shopify) - página inicial, cards de feature
4. **Carbon Design** (IBM) - dark mode, tokens showcase
5. **Atlassian Design System** - jornadas, padrões
6. **Primer** (GitHub) - componentes, código

**Deliverables**:
- `research.md` com screenshots e análise comparativa
- Lista de 10-15 patterns visuais para implementar
- Decisões de UX (navegação, busca, filtros)

**Padrões do Monday Vibe a incorporar**:
1. **Sidebar com ícones coloridos** - cada categoria tem cor própria (azul, verde, roxo)
2. **Hero section minimalista** - fundo gradiente sutil, título grande, CTA destacado
3. **Component preview cards** - código + preview lado a lado
4. **Status badges** - "New", "Updated", "Deprecated" em componentes
5. **Interactive playground** - Controles de props na mesma página
6. **Code snippets com syntax highlight** - Dark theme com Prism.js
7. **Navigation breadcrumbs** - Caminho claro (Home > Components > Button)
8. **Quick actions bar** - Copy code, Open in CodeSandbox, View source

### 0.2 Auditoria Visual Atual

**Gaps identificados**:
- ❌ Tema padrão do Storybook (genérico, sem identidade)
- ❌ Página inicial básica (sem hero section, sem CTAs)
- ❌ Cards de componentes sem preview visual
- ❌ Sidebar sem categorização clara
- ❌ Falta de showcase de tokens (cores, espaçamento, tipografia)
- ❌ Sem dark mode otimizado
- ❌ Sem branding consistente (logo, cores, tipografia)

**Oportunidades**:
- ✅ Tokens CSS já definidos e completos
- ✅ Componentes base criados (Callout, Section, DiagramGrid)
- ✅ Estrutura de documentação organizada
- ✅ A11y addon já configurado

### 0.3 Mapeamento de Tokens Visuais

**Tokens a aplicar no tema Storybook**:

```typescript
// Cores da marca Educacross
brandPrimary: '#7367F0'      // --color-primary-500
brandSecondary: '#808390'    // --color-secondary-500
brandSuccess: '#28C76F'      // --color-success-500
brandWarning: '#FF9F43'      // --color-warning-500
brandError: '#FF4B50'        // --color-error-500
brandInfo: '#00BAD1'         // --color-info-500

// Tipografia
fontBase: 'Montserrat, sans-serif'
fontHeading: 'Montserrat, sans-serif'
fontCode: 'JetBrains Mono, Consolas, monospace'

// Espaçamento (já em CSS vars)
padding: var(--padding-4) até var(--padding-25)
gap: var(--gap-2) até var(--gap-16)

// Raios de borda
borderRadius: var(--radius-sm) até var(--radius-xl)
```

## Phase 1: Design & Architecture

### 1.1 Theme Configuration (Light + Dark)

**Arquivo**: `.storybook/theme.ts` (refatorar) + `.storybook/educacross-theme.ts` (novo)

**Light Theme**:
```typescript
{
  base: 'light',
  
  // Branding
  brandTitle: 'Educacross Design System',
  brandUrl: 'https://educacross.com.br',
  brandImage: '/logo-educacross.svg',
  brandTarget: '_blank',
  
  // UI Colors
  appBg: '#FFFFFF',
  appContentBg: '#F5F5F7',           // --color-gray-100
  appBorderColor: '#E1E1E8',         // --color-gray-300
  appBorderRadius: 12,
  
  // Typography
  fontBase: 'Montserrat, sans-serif',
  fontCode: 'JetBrains Mono, monospace',
  
  // Text
  textColor: '#1F2937',              // Texto principal
  textInverseColor: '#FFFFFF',
  textMutedColor: '#6B7280',         // Texto secundário
  
  // Toolbar
  barTextColor: '#4B5563',
  barHoverColor: '#7367F0',          // Primary hover
  barSelectedColor: '#7367F0',       // Primary
  barBg: '#FFFFFF',
  
  // Buttons
  buttonBg: '#7367F0',               // Primary
  buttonBorder: '#7367F0',
  colorPrimary: '#7367F0',
  colorSecondary: '#00BAD1',         // Info
  
  // Form
  inputBg: '#FFFFFF',
  inputBorder: '#D1D5DB',
  inputTextColor: '#1F2937',
  inputBorderRadius: 8,
}
```

**Dark Theme**:
```typescript
{
  base: 'dark',
  brandImage: '/logo-educacross-dark.svg',  // Logo adaptado
  
  appBg: '#0F172A',                  // Slate 900
  appContentBg: '#1E293B',           // Slate 800
  appBorderColor: '#334155',         // Slate 700
  
  textColor: '#F1F5F9',              // Slate 100
  textMutedColor: '#94A3B8',         // Slate 400
  
  barBg: '#1E293B',
  barTextColor: '#CBD5E1',
  barSelectedColor: '#8F85F3',       // Primary-400 (mais claro)
  
  inputBg: '#1E293B',
  inputBorder: '#475569',
}
```

### 1.2 Custom Components Architecture

**BrandHeader.tsx** - Hero section da página inicial
```typescript
interface BrandHeaderProps {
  title: string;
  subtitle: string;
  version?: string;
  cta?: { label: string; href: string };
  features?: string[];
}

// Renderiza hero com gradiente primary, CTA destacado, badges de features
```

**FeatureCard.tsx** - Cards de destaque
```typescript
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  variant?: 'primary' | 'secondary' | 'success';
}

// Card com hover elevation, ícone colorido, link opcional
```

**ColorPalette.tsx** - Showcase de cores
```typescript
interface ColorPaletteProps {
  colors: Record<string, { value: string; token: string }>;
  copyable?: boolean;
}

// Grid de cores com tokens, valores hex, copy to clipboard
```

**TokenShowcase.tsx** - Visualizador de design tokens
```typescript
interface TokenShowcaseProps {
  category: 'spacing' | 'radius' | 'typography';
  tokens: Record<string, string>;
}

// Lista tokens com preview visual, valores CSS, aplicação
```

### 1.3 Navigation & Information Architecture

**Sidebar Structure** (inspirado em Monday Vibe):
```
🏠 Introdução                          [Cor: Primary #7367F0]
  └─ Bem-vindo
  └─ Começando
  └─ Princípios de Design

📐 Fundamentos                         [Cor: Info #00BAD1]
  ├─ 🎨 Cores
  ├─ ✍️ Tipografia
  ├─ 📏 Espaçamento
  └─ 🎯 Ícones

🧩 Componentes                         [Cor: Success #28C76F]
  ├─ Formulários
  │  ├─ Input
  │  ├─ Button
  │  ├─ Checkbox
  │  ├─ Radio
  │  └─ Select
  ├─ Navegação
  │  ├─ Tabs
  │  ├─ Pagination
  │  └─ Dropdown
  ├─ Feedback
  │  ├─ Alert
  │  ├─ Toast
  │  └─ Dialog
  └─ Data Display
     ├─ Table
     ├─ Card
     ├─ Badge
     └─ Avatar

🎨 Padrões                             [Cor: Warning #FF9F43]
  └─ FormField

🗺️ Jornadas                           [Cor: Secondary #808390]
  ├─ Aluno
  │  └─ Matrícula
  └─ Professor

🚀 Funcionalidades                     [Cor: Error #FF4B50]
  └─ Missões
```

### 1.4 Página Inicial Premium (Introduction.mdx)

**Estrutura**:
```mdx
<BrandHeader
  title="Educacross Design System"
  subtitle="Sistema de design unificado para produtos educacionais"
  version="v1.0.0"
  cta={{ label: "Ver Componentes", href: "#componentes" }}
  features={[
    "20+ Componentes",
    "Design Tokens",
    "Dark Mode",
    "A11y First"
  ]}
/>

## 🎯 Por que usar este Design System?

<DiagramGrid columns={3} gap="normal">
  <FeatureCard
    icon={<Shield />}
    title="Acessível por Padrão"
    description="Todos componentes seguem WCAG 2.1 AA"
    variant="success"
  />
  <FeatureCard
    icon={<Palette />}
    title="Design Tokens"
    description="Consistência visual com tokens CSS"
    variant="primary"
  />
  <FeatureCard
    icon={<Code />}
    title="Pronto para Produção"
    description="Testado, documentado e versionado"
    variant="secondary"
  />
</DiagramGrid>

## 🚀 Começando

<Callout type="tip" title="Instalação Rápida">
  ```bash
  npm install @educacross/ui
  ```
</Callout>

## 📊 Métricas de Qualidade

| Métrica | Valor |
|---------|-------|
| Componentes | 20+ |
| Cobertura A11y | 100% |
| Lighthouse Score | 95+ |
| Tamanho Bundle | < 50KB |
```

## Phase 2: Implementation Breakdown

### Task 2.1: Refatorar Theme Configuration
**Effort**: 2h | **Priority**: P0 (blocker)

**Steps**:
1. Criar `.storybook/educacross-theme.ts` com dark theme
2. Atualizar `.storybook/theme.ts` com tokens CSS
3. Configurar `manager.ts` para usar ambos temas
4. Testar toggle dark/light no Storybook UI

**Acceptance Criteria**:
- ✅ Tema light aplica cores Educacross
- ✅ Tema dark mantém legibilidade (contraste WCAG AA)
- ✅ Logo adapta no dark mode
- ✅ Toolbar usa cores primary corretas

---

### Task 2.2: Criar Componentes de Branding
**Effort**: 4h | **Priority**: P0

**Componentes**:
1. `BrandHeader.tsx` - Hero section
2. `FeatureCard.tsx` - Cards de destaque
3. `ColorPalette.tsx` - Showcase de cores
4. `TokenShowcase.tsx` - Visualizador de tokens

**Acceptance Criteria**:
- ✅ Todos componentes usam tokens CSS
- ✅ Props tipadas com TypeScript
- ✅ Hover states com elevation
- ✅ Responsive (mobile-first)
- ✅ Dark mode compatível

---

### Task 2.3: Redesenhar Página Inicial
**Effort**: 3h | **Priority**: P1

**Steps**:
1. Refatorar `Introduction.mdx` com BrandHeader
2. Adicionar grid de FeatureCards
3. Criar seção "Por que usar"
4. Adicionar quickstart section
5. Incluir métricas de qualidade

**Acceptance Criteria**:
- ✅ Hero visualmente impactante
- ✅ CTAs claros (Ver Componentes, GitHub)
- ✅ Features destacados (3-4 cards)
- ✅ Code snippet de instalação
- ✅ Links para próximos passos

---

### Task 2.4: Melhorar Foundations Stories
**Effort**: 4h | **Priority**: P1

**Files**:
- `Colors.stories.tsx` - adicionar ColorPalette interativa
- `Typography.stories.tsx` - hierarquia visual clara
- `Spacing.stories.tsx` - TokenShowcase com preview
- `Icons.stories.tsx` - grid com busca

**Acceptance Criteria**:
- ✅ Cores mostram token + hex + copy button
- ✅ Tipografia demonstra escala completa
- ✅ Espaçamento tem preview visual (boxes)
- ✅ Ícones em grid responsivo com nomes

---

### Task 2.5: Assets de Marca
**Effort**: 1h | **Priority**: P2

**Assets necessários**:
1. `logo-educacross-dark.svg` - logo para dark mode
2. `favicon.ico` - ícone do site (32x32)
3. `og-image.png` - Open Graph (1200x630)
4. `apple-touch-icon.png` - iOS (180x180)

**Acceptance Criteria**:
- ✅ Logo dark tem contraste adequado
- ✅ Favicon visível em todas resoluções
- ✅ OG image aparece em social shares
- ✅ Todos assets otimizados (<50KB cada)

---

### Task 2.6: Custom Sidebar & Navigation
**Effort**: 2h | **Priority**: P2

**Customizações**:
1. Sidebar com ícones por categoria
2. Badges "Novo" ou "Beta" em componentes
3. Search bar estilizado
4. Footer com links (GitHub, Docs, Figma)

**Implementation**:
```typescript
// .storybook/manager.ts
addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
    renderLabel: ({ name, type }) => (
      type === 'story' 
        ? `${getIcon(name)} ${name}` 
        : name
    ),
  },
});
```

---

### Task 2.7: Performance & Optimization
**Effort**: 2h | **Priority**: P2

**Optimizations**:
1. Lazy load MDX pages
2. Otimizar imagens (WebP, lazy loading)
3. Code splitting de componentes grandes
4. Preload fonts (Montserrat)

**Acceptance Criteria**:
- ✅ FCP < 1.5s
- ✅ TTI < 3s
- ✅ Lighthouse Performance > 90
- ✅ Bundle size < 500KB (gzipped)

---

### Task 2.8: A11y Validation & Testing
**Effort**: 2h | **Priority**: P0

**Tests**:
1. Axe-core scan em todos componentes
2. Keyboard navigation completa
3. Screen reader testing (NVDA/VoiceOver)
4. Color contrast validation (all themes)

**Tools**:
- @storybook/addon-a11y (já instalado)
- @axe-core/playwright (adicionar)
- Pa11y CI

**Acceptance Criteria**:
- ✅ 0 critical A11y issues
- ✅ Todas páginas navegáveis por teclado
- ✅ Contraste WCAG AA em light/dark
- ✅ Screen reader anuncia corretamente

---

## Phase 3: Testing & Validation

### 3.1 Visual Regression Tests

**Tool**: Playwright + Snapshot Testing

```typescript
// tests/visual/storybook.spec.ts
test('Homepage hero section', async ({ page }) => {
  await page.goto('http://localhost:6006/?path=/docs/introduction--docs');
  await expect(page.locator('[data-testid="brand-header"]'))
    .toHaveScreenshot('homepage-hero.png');
});

test('Dark mode theme', async ({ page }) => {
  await page.goto('http://localhost:6006');
  await page.click('[title="Change theme"]');
  await expect(page).toHaveScreenshot('dark-mode.png');
});
```

### 3.2 Cross-Browser Testing

**Browsers**: Chrome, Firefox, Safari, Edge  
**Viewports**: Mobile (375px), Tablet (768px), Desktop (1280px)

**Critical Paths**:
1. Homepage load
2. Component navigation
3. Code copy functionality
4. Theme toggle
5. Search

### 3.3 Performance Benchmarking

**Metrics**:
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3s
- Cumulative Layout Shift (CLS): < 0.1

**Tools**: Lighthouse CI, WebPageTest

---

## Phase 4: Deployment & Monitoring

### 4.1 GitHub Actions CI/CD

**Pipeline**:
```yaml
name: Deploy Storybook
on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test:visual  # Playwright snapshots
      - run: pnpm test:a11y    # Axe scans
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./apps/storybook/storybook-static
```

### 4.2 Monitoring & Analytics

**Métricas a rastrear**:
- Page views por seção
- Bounce rate na homepage
- Search queries mais comuns
- Componentes mais visitados
- Tempo médio na página

**Tool**: Google Analytics 4 (opcional, com consentimento)

---

## Success Criteria

### ✅ Must Have (P0)
- [x] Tema light/dark com cores Educacross aplicadas
- [x] Logo e favicon da marca
- [x] Página inicial com hero section branded
- [x] Sidebar com navegação clara e ícones
- [x] ColorPalette showcase interativa
- [x] Todos componentes passam A11y audit
- [x] Lighthouse Score > 90

### 🎯 Should Have (P1)
- [ ] FeatureCards na homepage
- [ ] TokenShowcase em Foundations
- [ ] Search bar customizado
- [ ] Code copy com feedback visual
- [ ] Visual regression tests (Playwright)
- [ ] Cross-browser validation

### 💎 Nice to Have (P2)
- [ ] Animações de entrada suaves (fade-in)
- [ ] Dark mode toggle com transição
- [ ] Footer com links sociais
- [ ] Badges "Novo" em componentes recentes
- [ ] Analytics (page views, clicks)
- [ ] Versioning dropdown (v1.0, v2.0)

---

## Risk Mitigation

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Breaking changes no Storybook 8 | Baixa | Alto | Pinnar versões exatas, testar upgrades em branch |
| Performance degradation | Média | Médio | Lazy load, code splitting, Lighthouse CI gate |
| A11y regressions | Média | Alto | Axe-core em CI, manual testing regular |
| Dark mode contrast issues | Alta | Médio | Usar ferramentas de contrast checker, testar manualmente |
| Assets muito pesados | Baixa | Médio | Otimizar com ImageOptim, usar WebP, lazy load |

---

## Timeline Estimate

**Total**: ~20-25 horas de desenvolvimento

| Phase | Effort | Duration |
|-------|--------|----------|
| **Phase 0**: Research | 4h | 1 dia |
| **Phase 1**: Design | 3h | 0.5 dia |
| **Phase 2**: Implementation | 18h | 3 dias |
| **Phase 3**: Testing | 4h | 1 dia |
| **Phase 4**: Deployment | 1h | 0.5 dia |
| **TOTAL** | **30h** | **~1 semana** |

**Sprint Planning**: 
- Sprint 1 (2 dias): Tasks 2.1, 2.2, 2.3 (theme + componentes + homepage)
- Sprint 2 (2 dias): Tasks 2.4, 2.5, 2.6 (foundations + assets + navigation)
- Sprint 3 (1 dia): Tasks 2.7, 2.8, 3.x (performance + testes)

---

## Next Steps

1. **Aprovar este plano** - Review com equipe de design/produto
2. **Criar branch** - `git checkout -b 001-storybook-branding`
3. **Executar `/speckit.tasks`** - Gerar breakdown detalhado de tasks
4. **Iniciar Phase 0** - Research de referências visuais
5. **Design review** - Validar mockups antes de implementar
6. **Iterar em sprints** - 2-3 dias por sprint com demos

---

**Responsável**: Design System Team  
**Stakeholders**: Produto, Engenharia, Design  
**Review Date**: 22/01/2026
