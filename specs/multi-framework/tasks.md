# Tasks: Design System Multi-Framework

**Input**: [plan.md](./plan.md) Multi-Framework  
**Generated**: 2026-01-23  
**Total Tasks**: 30 | **Estimated Time**: 178-238h

---

## Format: `- [ ] [ID] [P?] Description with file path`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- Caminhos exatos incluídos nas descrições

## Path Conventions

- **Tokens**: `packages/tokens/src/`
- **React**: `packages/ui/src/components/` (existente)
- **Vue 2**: `packages/ui-vue2/src/components/`
- **Vue 3**: `packages/ui-vue3/src/components/`
- **Storybooks**: `apps/storybook*/stories/`

---

## FASE 1: Fundação (30h / 1-2 semanas)

**Goal**: Infraestrutura multi-framework com tokens compartilhados e 3 Storybooks rodando  
**Checkpoint**: `pnpm storybook:all` mostra menu unificado com React, Vue 2, Vue 3

### 1.1 Design Tokens (4h)

- [ ] T001 Criar estrutura packages/tokens com package.json e tsconfig
- [ ] T002 Extrair cores de packages/ui/src/styles.css para packages/tokens/src/colors.json
- [ ] T003 [P] Extrair spacing de styles.css para packages/tokens/src/spacing.json
- [ ] T004 [P] Extrair typography de styles.css para packages/tokens/src/typography.json
- [ ] T005 [P] Extrair radius de styles.css para packages/tokens/src/radius.json
- [ ] T006 Criar packages/tokens/src/index.ts com exports + tipos TypeScript
- [ ] T007 Configurar build (tsup) para gerar dist/colors.json + dist/index.js
- [ ] T008 Atualizar packages/ui/tailwind-preset.ts para importar de @educacross/tokens

**Checkpoint 1.1**: ✅ `pnpm --filter @educacross/tokens build` gera JSON + types

### 1.2 Pacote Vue 2 (8h)

- [ ] T009 Criar packages/ui-vue2 com package.json (vue@2.7, bootstrap@5.3)
- [ ] T010 Criar vite.config.ts para build de biblioteca Vue 2
- [ ] T011 Criar packages/ui-vue2/src/styles/_tokens.scss importando @educacross/tokens
- [ ] T012 Criar packages/ui-vue2/src/styles/bootstrap-custom.scss com overrides Bootstrap
- [ ] T013 Criar packages/ui-vue2/src/index.js com exports vazios (preparação)
- [ ] T014 Configurar tsconfig.json e scripts de build/dev
- [ ] T015 Testar build: pnpm --filter @educacross/ui-vue2 build

**Checkpoint 1.2**: ✅ Pacote Vue 2 builda sem erros

### 1.3 Pacote Vue 3 (6h)

- [ ] T016 Criar packages/ui-vue3 com package.json (vue@3.4, typescript)
- [ ] T017 Criar vite.config.ts para build de biblioteca Vue 3 + TypeScript
- [ ] T018 Criar packages/ui-vue3/src/styles/tokens.css com CSS custom properties
- [ ] T019 Criar script para converter tokens JSON → CSS vars
- [ ] T020 Criar packages/ui-vue3/src/index.ts com exports vazios (preparação)
- [ ] T021 Configurar tsconfig.json, vitest.config.ts e scripts
- [ ] T022 Testar build: pnpm --filter @educacross/ui-vue3 build

**Checkpoint 1.3**: ✅ Pacote Vue 3 builda sem erros

### 1.4 Storybook Vue 2 (6h)

- [ ] T023 Criar apps/storybook-vue2 com npx storybook@latest init
- [ ] T024 Configurar .storybook/main.ts para @storybook/vue3-vite (Vue 2.7 compatível)
- [ ] T025 Atualizar package.json com porta 6007 no script dev
- [ ] T026 Adicionar dependência @educacross/ui-vue2 e bootstrap
- [ ] T027 Criar .storybook/preview.ts importando Bootstrap CSS
- [ ] T028 Criar story de exemplo apps/storybook-vue2/stories/Introduction.mdx
- [ ] T029 Testar: pnpm --filter storybook-vue2 dev → localhost:6007

**Checkpoint 1.4**: ✅ Storybook Vue 2 roda em 6007

### 1.5 Storybook Vue 3 (4h)

- [ ] T030 Criar apps/storybook-vue3 com npx storybook@latest init
- [ ] T031 Configurar .storybook/main.ts para @storybook/vue3-vite
- [ ] T032 Atualizar package.json com porta 6008 no script dev
- [ ] T033 Adicionar dependência @educacross/ui-vue3
- [ ] T034 Criar .storybook/preview.ts importando tokens.css
- [ ] T035 Criar story de exemplo apps/storybook-vue3/stories/Introduction.mdx
- [ ] T036 Testar: pnpm --filter storybook-vue3 dev → localhost:6008

**Checkpoint 1.5**: ✅ Storybook Vue 3 roda em 6008

### 1.6 Storybook Composition (2h)

- [ ] T037 Adicionar refs em apps/storybook/.storybook/main.ts para Vue2 e Vue3
- [ ] T038 Configurar títulos: 'Vue 2 + Bootstrap' e 'Vue 3'
- [ ] T039 Configurar expanded: false para ambos refs
- [ ] T040 Adicionar script storybook:all no package.json root para rodar 3 em paralelo
- [ ] T041 Testar composition: pnpm storybook:all → acessar 6006 mostra menu com 3 frameworks

**Checkpoint FASE 1**: ✅ Desenvolvedor acessa localhost:6006 e vê menu com React, Vue 2, Vue 3

---

## FASE 2: Componentes Core P1 (28h / 2-3 semanas)

**Goal**: Button, Input, Label funcionando nos 3 frameworks com mesma API  
**Checkpoint**: 3 componentes × 3 frameworks = 9 implementações + 9 stories

### 2.1 Button Multi-Framework (12h)

**Vue 2 (6h)**:
- [ ] T042 Criar packages/ui-vue2/src/components/Button/EdButton.vue
- [ ] T043 Implementar props: variant, size, disabled, loading
- [ ] T044 Estilos Bootstrap + tokens SCSS
- [ ] T045 [P] Criar packages/ui-vue2/src/components/Button/index.js com export
- [ ] T046 [P] Atualizar packages/ui-vue2/src/index.js exportando EdButton
- [ ] T047 Criar apps/storybook-vue2/stories/components/EdButton.stories.js
- [ ] T048 Story com 5 variantes: primary, secondary, outline, destructive, ghost
- [ ] T049 [P] Criar testes packages/ui-vue2/src/components/Button/EdButton.spec.js

**Vue 3 (6h)**:
- [ ] T050 Criar packages/ui-vue3/src/components/Button/EdButton.vue
- [ ] T051 Implementar com <script setup lang="ts"> e defineProps
- [ ] T052 Estilos com CSS custom properties dos tokens
- [ ] T053 [P] Criar packages/ui-vue3/src/components/Button/index.ts com export
- [ ] T054 [P] Atualizar packages/ui-vue3/src/index.ts exportando EdButton
- [ ] T055 Criar apps/storybook-vue3/stories/components/EdButton.stories.ts
- [ ] T056 Story com 5 variantes + controls
- [ ] T057 [P] Criar testes packages/ui-vue3/src/components/Button/EdButton.spec.ts

**Checkpoint 2.1**: 
```bash
pnpm storybook:all
# Navegar entre React/Vue2/Vue3 → Button renderiza igual
```

### 2.2 Input Multi-Framework (10h)

**Vue 2 (5h)**:
- [ ] T058 Criar packages/ui-vue2/src/components/Input/EdInput.vue
- [ ] T059 Implementar props: type, placeholder, disabled, error
- [ ] T060 Estilos Bootstrap form-control + estados
- [ ] T061 [P] Exports em index.js e src/index.js
- [ ] T062 Criar apps/storybook-vue2/stories/components/EdInput.stories.js
- [ ] T063 [P] Testes EdInput.spec.js

**Vue 3 (5h)**:
- [ ] T064 Criar packages/ui-vue3/src/components/Input/EdInput.vue
- [ ] T065 Implementar com TypeScript + v-model suporte
- [ ] T066 Estilos customizados com tokens
- [ ] T067 [P] Exports em index.ts e src/index.ts
- [ ] T068 Criar apps/storybook-vue3/stories/components/EdInput.stories.ts
- [ ] T069 [P] Testes EdInput.spec.ts

**Checkpoint 2.2**: Input funciona com v-model nos 2 frameworks Vue

### 2.3 Label Multi-Framework (6h)

**Vue 2 (3h)**:
- [ ] T070 Criar packages/ui-vue2/src/components/Label/EdLabel.vue
- [ ] T071 Implementar props: for, required
- [ ] T072 Estilos Bootstrap + indicador obrigatório
- [ ] T073 [P] Exports e story apps/storybook-vue2/stories/components/EdLabel.stories.js

**Vue 3 (3h)**:
- [ ] T074 Criar packages/ui-vue3/src/components/Label/EdLabel.vue
- [ ] T075 Implementar com TypeScript
- [ ] T076 Estilos com tokens
- [ ] T077 [P] Exports e story apps/storybook-vue3/stories/components/EdLabel.stories.ts

**Checkpoint FASE 2**: 
```bash
# Testar formulário completo em cada framework
Vue 2: <ed-label><ed-input><ed-button>
Vue 3: <ed-label><ed-input><ed-button>
React: <Label><Input><Button>
```

---

## FASE 3: Componentes Restantes (120-180h / 4-8 semanas)

**Goal**: Todos os 21 componentes nos 3 frameworks  
**Checkpoint**: 21 × 3 = 63 implementações completas

### 3.1 Componentes P2 - Forms (36h)

**Checkbox (12h)**:
- [ ] T078 Implementar Checkbox Vue 2 (6h)
- [ ] T079 Implementar Checkbox Vue 3 (6h)

**Radio (12h)**:
- [ ] T080 Implementar Radio/RadioGroup Vue 2 (6h)
- [ ] T081 Implementar Radio/RadioGroup Vue 3 (6h)

**Select (12h)**:
- [ ] T082 Implementar Select Vue 2 (6h)
- [ ] T083 Implementar Select Vue 3 (6h)

### 3.2 Componentes P2 - Display (36h)

**Card (12h)**:
- [ ] T084 Implementar Card + CardHeader + CardContent Vue 2 (6h)
- [ ] T085 Implementar Card + CardHeader + CardContent Vue 3 (6h)

**Badge (8h)**:
- [ ] T086 Implementar Badge Vue 2 (4h)
- [ ] T087 Implementar Badge Vue 3 (4h)

**Avatar (8h)**:
- [ ] T088 Implementar Avatar + AvatarImage + AvatarFallback Vue 2 (4h)
- [ ] T089 Implementar Avatar + AvatarImage + AvatarFallback Vue 3 (4h)

**Skeleton (8h)**:
- [ ] T090 Implementar Skeleton Vue 2 (4h)
- [ ] T091 Implementar Skeleton Vue 3 (4h)

### 3.3 Componentes P2 - Feedback (24h)

**Alert (8h)**:
- [ ] T092 Implementar Alert Vue 2 (4h)
- [ ] T093 Implementar Alert Vue 3 (4h)

**Toast (16h)**:
- [ ] T094 Implementar Toast + Toaster Vue 2 com teleport (8h)
- [ ] T095 Implementar Toast + Toaster Vue 3 com Teleport (8h)

### 3.4 Componentes P2 - Overlay (48h)

**Dialog/Modal (16h)**:
- [ ] T096 Implementar Dialog Vue 2 com portal (8h)
- [ ] T097 Implementar Dialog Vue 3 com Teleport (8h)

**Popover (12h)**:
- [ ] T098 Implementar Popover Vue 2 (6h)
- [ ] T099 Implementar Popover Vue 3 (6h)

**Tooltip (12h)**:
- [ ] T100 Implementar Tooltip Vue 2 (6h)
- [ ] T101 Implementar Tooltip Vue 3 (6h)

**DropdownMenu (8h)**:
- [ ] T102 Implementar DropdownMenu Vue 2 (4h)
- [ ] T103 Implementar DropdownMenu Vue 3 (4h)

### 3.5 Componentes P2 - Navigation (24h)

**Tabs (12h)**:
- [ ] T104 Implementar Tabs + TabsList + TabsTrigger + TabsContent Vue 2 (6h)
- [ ] T105 Implementar Tabs Vue 3 (6h)

**Accordion (12h)**:
- [ ] T106 Implementar Accordion + AccordionItem Vue 2 (6h)
- [ ] T107 Implementar Accordion Vue 3 (6h)

### 3.6 Componentes Organisms (24h)

**Table (12h)**:
- [ ] T108 Implementar Table + TableHeader + TableBody + TableRow + TableCell Vue 2 (6h)
- [ ] T109 Implementar Table Vue 3 (6h)

**Pagination (12h)**:
- [ ] T110 Implementar Pagination Vue 2 (6h)
- [ ] T111 Implementar Pagination Vue 3 (6h)

**Checkpoint FASE 3**: Todos os 21 componentes React funcionam em Vue 2 e Vue 3

---

## FASE 4: Documentação e CI/CD (12h)

### 4.1 Documentação Multi-Framework (6h)

- [ ] T112 Criar specs/multi-framework/README.md com guia de instalação 3 frameworks
- [ ] T113 Criar apps/storybook/stories/guides/MultiFramework.mdx com exemplos
- [ ] T114 Atualizar USAGE.md com seções Vue 2 e Vue 3
- [ ] T115 Criar migration guides: React → Vue 2, React → Vue 3
- [ ] T116 Atualizar README.md root com badges NPM dos 3 pacotes

### 4.2 CI/CD Multi-Framework (6h)

- [ ] T117 Criar .github/workflows/ci-vue2.yml
- [ ] T118 Criar .github/workflows/ci-vue3.yml
- [ ] T119 Atualizar .github/workflows/ci.yml para rodar 3 jobs em paralelo
- [ ] T120 Configurar Chromatic para 3 Storybooks separados
- [ ] T121 Adicionar scripts de publish para @educacross/ui-vue2 e ui-vue3
- [ ] T122 Testar pipeline completo: commit → CI → 3 builds → 3 publishes

**Checkpoint FASE 4**: CI passa para os 3 frameworks, Chromatic captura 3 × N stories

---

## Dependencies & Execution Order

```
FASE 1 (T001-T041) ─────────────────────────────────────────┐
    │ BLOQUEANTE: Infraestrutura deve estar pronta         │
    ▼                                                        │
FASE 2 (T042-T077) ◄─────────────────────────────────────────┘
    │ Core P1: Pode rodar em paralelo Vue 2 e Vue 3
    ▼
FASE 3 (T078-T111) ─────► Incremental, 1-2 componentes/semana
    │
    ▼
FASE 4 (T112-T122) ─────► Documentação e CI após componentes
```

---

## Tracking Progress

### Por Pacote

| Pacote | Componentes | Status | Progresso |
|--------|-------------|--------|-----------|
| @educacross/tokens | 1 | ⏸️ | 0% (0/8 tasks) |
| @fabioeducacross/ui (React) | 21 | ✅ | 100% (existente) |
| @educacross/ui-vue2 | 21 | ⏸️ | 0% (0/60 tasks) |
| @educacross/ui-vue3 | 21 | ⏸️ | 0% (0/54 tasks) |
| **Total** | **64** | **25%** | **21/84 implementações** |

### Por Fase

| Fase | Tasks | Horas | Status | Progresso |
|------|-------|-------|--------|-----------|
| **Fase 1: Fundação** | T001-T041 | 30h | ⏸️ | 0/41 |
| **Fase 2: Core P1** | T042-T077 | 28h | ⏸️ | 0/36 |
| **Fase 3: Componentes** | T078-T111 | 120-180h | ⏸️ | 0/34 |
| **Fase 4: Docs + CI** | T112-T122 | 12h | ⏸️ | 0/11 |
| **Total** | **122 tasks** | **190-250h** | **0%** | **0/122** |

---

## Validation Checklist

### ✅ Fase 1 Complete When:
- [ ] `pnpm --filter @educacross/tokens build` → dist/colors.json exists
- [ ] `pnpm --filter @educacross/ui-vue2 build` → dist/index.js exists
- [ ] `pnpm --filter @educacross/ui-vue3 build` → dist/index.mjs exists
- [ ] `pnpm storybook` → localhost:6006 (React)
- [ ] `pnpm storybook:vue2` → localhost:6007 (Vue 2)
- [ ] `pnpm storybook:vue3` → localhost:6008 (Vue 3)
- [ ] `pnpm storybook:all` → Menu mostra 3 frameworks

### ✅ Fase 2 Complete When:
- [ ] Button funciona nos 3 frameworks com mesma API
- [ ] Input aceita v-model em Vue 2 e Vue 3
- [ ] Label mostra indicador obrigatório consistente
- [ ] Stories dos 3 componentes aparecem nos 3 Storybooks
- [ ] Testes unitários passam: `pnpm test`

### ✅ Fase 3 Complete When:
- [ ] 21 componentes × 3 frameworks = 63 implementações
- [ ] Todos os testes passam em todos os pacotes
- [ ] Build de todos os pacotes sem erros
- [ ] Chromatic captura stories dos 3 Storybooks

### ✅ Fase 4 Complete When:
- [ ] Documentação completa com exemplos multi-framework
- [ ] CI passa para os 3 pacotes
- [ ] 4 pacotes publicados no NPM/GitHub Packages
- [ ] README atualizado com badges e links

---

## Common Patterns

### Criando Componente Vue 2
```bash
# 1. Estrutura
mkdir -p packages/ui-vue2/src/components/NomeComponente
touch packages/ui-vue2/src/components/NomeComponente/EdNomeComponente.vue
touch packages/ui-vue2/src/components/NomeComponente/index.js
touch packages/ui-vue2/src/components/NomeComponente/EdNomeComponente.spec.js

# 2. Implementar componente (6h)
# 3. Adicionar export em src/index.js
# 4. Criar story em apps/storybook-vue2/stories/components/
# 5. Testar: pnpm --filter @educacross/ui-vue2 build
```

### Criando Componente Vue 3
```bash
# 1. Estrutura
mkdir -p packages/ui-vue3/src/components/NomeComponente
touch packages/ui-vue3/src/components/NomeComponente/EdNomeComponente.vue
touch packages/ui-vue3/src/components/NomeComponente/index.ts
touch packages/ui-vue3/src/components/NomeComponente/EdNomeComponente.spec.ts

# 2. Implementar componente com <script setup lang="ts"> (6h)
# 3. Adicionar export em src/index.ts
# 4. Criar story em apps/storybook-vue3/stories/components/
# 5. Testar: pnpm --filter @educacross/ui-vue3 build
```

---

## Next Immediate Actions

1. **Confirmar escopo**: MVP (Fase 1+2) ou Full (todas as fases)?
2. **Confirmar prioridade**: Vue 2 ou Vue 3 primeiro em Fase 2?
3. **Executar T001**: Criar packages/tokens/
4. **Definir timeline**: Quantas horas/semana disponíveis?

Status: ⏸️ **Aguardando confirmação para iniciar Fase 1**
