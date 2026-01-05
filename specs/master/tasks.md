# Tasks: Design System Educacross v1.0

**Input**: Design documents from `/specs/master/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**Tests**: Testes unitários são parte do escopo (M6).

**Organization**: Tasks organizadas por milestone pendente (M6, M7, M8).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[Story]**: Qual user story/milestone esta tarefa pertence
- Caminhos exatos incluídos nas descrições

## Path Conventions

- **Monorepo**: `packages/ui/`, `apps/storybook/`
- **Testes**: `packages/ui/src/**/*.test.tsx`
- **CI/CD**: `.github/workflows/`

---

## Phase 1: Setup (Configuração de Testes)

**Purpose**: Configurar infraestrutura de testes Vitest

- [X] T001 Instalar dependências de teste: vitest, @testing-library/react, @testing-library/jest-dom, jsdom, @testing-library/user-event em packages/ui/package.json
- [X] T002 Criar arquivo de configuração packages/ui/vitest.config.ts com React plugin e jsdom environment
- [X] T003 [P] Criar arquivo de setup packages/ui/src/test/setup.ts com imports de jest-dom matchers
- [X] T004 [P] Adicionar scripts "test", "test:watch", "test:coverage" em packages/ui/package.json
- [X] T005 Adicionar script "test" no turbo.json para rodar testes no pipeline

---

## Phase 2: Foundational (Testes Base)

**Purpose**: Testes para utilitários e estrutura base

**⚠️ CRITICAL**: Garantir que a infraestrutura de testes funciona antes de testar componentes

- [X] T006 [M6] Criar teste para função cn() em packages/ui/src/lib/utils.test.ts
- [X] T007 [M6] Validar que vitest roda com `pnpm test` na raiz do projeto
- [X] T008 [M6] Configurar coverage threshold mínimo (80% para utilitários)

**Checkpoint**: Infraestrutura de testes funcionando - testes de componentes podem começar

---

## Phase 3: User Story 1 - Componentes Core (Priority: P1) 🎯 MVP

**Goal**: Testes para Button, Input, Label (componentes mais usados)

**Independent Test**: `pnpm test -- --testPathPattern="Button|Input|Label"`

### Tests for User Story 1

- [X] T009 [P] [US1] Criar testes completos para Button (renderização, variantes, interações, disabled) em packages/ui/src/components/Button/Button.test.tsx
- [X] T010 [P] [US1] Criar testes completos para Input (renderização, estados, onChange, focus) em packages/ui/src/components/Input/Input.test.tsx
- [X] T011 [P] [US1] Criar teste para Label renderização e htmlFor em packages/ui/src/components/Label/Label.test.tsx

**Checkpoint**: Componentes P1 têm cobertura de testes básica

---

## Phase 4: User Story 2 - Componentes Feedback (Priority: P2)

**Goal**: Testes para Alert, Toast, Dialog (componentes de feedback)

**Independent Test**: `pnpm test -- --testPathPattern="Alert|Toast|Dialog"`

### Tests for User Story 2

- [X] T012 [P] [US2] Criar teste para Alert variantes e ícones em packages/ui/src/components/Alert/Alert.test.tsx
- [X] T013 [P] [US2] Criar testes completos para Toast (context, hook useToast, renderização, dismiss) em packages/ui/src/components/Toast/Toast.test.tsx
- [X] T014 [P] [US2] Criar testes para Dialog (abertura/fechamento, Escape, focus trap) em packages/ui/src/components/Dialog/Dialog.test.tsx

**Checkpoint**: Componentes de feedback têm cobertura de testes

---

## Phase 5: User Story 3 - Componentes Form (Priority: P2)

**Goal**: Testes para Checkbox, Radio, Select (componentes de formulário)

**Independent Test**: `pnpm test -- --testPathPattern="Checkbox|Radio|Select"`

### Tests for User Story 3

- [X] T015 [P] [US3] Criar teste para Checkbox checked/unchecked em packages/ui/src/components/Checkbox/Checkbox.test.tsx
- [X] T016 [P] [US3] Criar teste para Radio selection em packages/ui/src/components/Radio/Radio.test.tsx
- [X] T017 [P] [US3] Criar teste para Select abertura e seleção em packages/ui/src/components/Select/Select.test.tsx

**Checkpoint**: Componentes de formulário têm cobertura de testes

---

## Phase 6: User Story 4 - CI/CD (Priority: P1)

**Goal**: Configurar GitHub Actions para lint, typecheck, build, test

**Independent Test**: Push para branch e verificar Actions

### Implementation for CI/CD

- [X] T018 [P] [M7] Criar workflow .github/workflows/ci.yml com jobs: lint, typecheck, build, test
- [X] T019 [P] [M7] Configurar cache de pnpm e turbo no workflow CI
- [X] T020 [P] [M7] Adicionar job para build do Storybook no workflow CI
- [X] T021 [M7] Criar workflow .github/workflows/publish.yml para npm publish on tag
- [ ] T022 [M7] Configurar branch protection rules no GitHub (require CI pass)

**Checkpoint**: CI/CD funcionando - PRs são validados automaticamente

---

## Phase 7: User Story 5 - Publicação NPM (Priority: P2)

**Goal**: Preparar e publicar pacote @educacross/ui no npm

**Independent Test**: `npm pack` local e verificar conteúdo

### Implementation for NPM Publish

- [X] T023 [M8] Atualizar packages/ui/package.json com publishConfig, repository, keywords
- [X] T024 [M8] Criar arquivo packages/ui/README.md com documentação de uso
- [X] T025 [M8] Adicionar script "prepublishOnly" com build + typecheck
- [ ] T026 [M8] Configurar NPM_TOKEN como secret no GitHub
- [ ] T027 [M8] Criar primeiro release tag (v0.1.0) e validar publicação

**Checkpoint**: Pacote publicado e instalável via npm

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Melhorias que afetam múltiplas áreas

### Testes de Componentes Restantes (G2)

- [ ] T028 [P] Criar teste para Card em packages/ui/src/components/Card/Card.test.tsx
- [ ] T029 [P] Criar teste para Badge em packages/ui/src/components/Badge/Badge.test.tsx
- [ ] T030 [P] Criar teste para Avatar em packages/ui/src/components/Avatar/Avatar.test.tsx
- [ ] T031 [P] Criar teste para Icon em packages/ui/src/components/Icon/Icon.test.tsx
- [ ] T032 [P] Criar teste para Tabs em packages/ui/src/components/Tabs/Tabs.test.tsx
- [ ] T033 [P] Criar teste para Accordion em packages/ui/src/components/Accordion/Accordion.test.tsx

### Play Functions (M9) - Constitution Compliance

- [ ] T034 [P] Adicionar play function no Button.stories.tsx (click interaction)
- [ ] T035 [P] Adicionar play function no Dialog.stories.tsx (open/close/escape)
- [ ] T036 [P] Adicionar play function no Toast.stories.tsx (trigger/dismiss)
- [ ] T037 [P] Adicionar play function no Select.stories.tsx (open/select option)

### Documentação e Manutenção

- [ ] T038 [P] Documentar processo de contribuição em CONTRIBUTING.md
- [ ] T039 [P] Atualizar CHANGELOG.md com todas as features
- [ ] T040 Rodar validação do quickstart.md em projeto limpo
- [ ] T041 [P] Configurar Dependabot para atualizações de segurança

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────────────────────────────────────────────────────────┐
                                                                              │
Phase 2 (Foundational) ◄─────────────────────────────────────────────────────┘
       │
       ▼
┌──────┴──────────────────────────────────────────────────────────────────────┐
│                        Parallel User Stories                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Phase 3     │  │ Phase 4     │  │ Phase 5     │  │ Phase 6     │         │
│  │ US1: Core   │  │ US2: Feed.  │  │ US3: Form   │  │ US4: CI/CD  │         │
│  │ T009-T011   │  │ T012-T014   │  │ T015-T017   │  │ T018-T022   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                            Phase 7 (NPM Publish) ─► T023-T027
                                      │
                                      ▼
                            Phase 8 (Polish) ─► T028-T041
```

### User Story Dependencies

- **US1 (Core Tests)**: Depende de Phase 2 - Pode rodar em paralelo com US2, US3, US4
- **US2 (Feedback Tests)**: Depende de Phase 2 - Pode rodar em paralelo
- **US3 (Form Tests)**: Depende de Phase 2 - Pode rodar em paralelo
- **US4 (CI/CD)**: Depende de Phase 2 - Pode rodar em paralelo com testes
- **US5 (NPM Publish)**: Depende de CI/CD (US4) estar funcionando

### Within Each User Story

- Testes podem rodar em paralelo (arquivos diferentes)
- Cada teste valida comportamento específico

### Parallel Opportunities

```bash
# Todas as tarefas de setup [P] podem rodar em paralelo:
T003, T004

# Todos os testes de componentes [P] podem rodar em paralelo:
T009, T010, T011, T012, T013, T014, T015, T016, T017

# Todas as tarefas de CI [P] podem rodar em paralelo:
T018, T019, T020

# Todos os testes de polish [P] podem rodar em paralelo:
T028, T029, T030, T031, T032, T033

# Todas as play functions [P] podem rodar em paralelo:
T034, T035, T036, T037
```

---

## Implementation Strategy

### MVP First (Phase 1-3 + Phase 6)

1. Complete Phase 1: Setup de testes
2. Complete Phase 2: Testes base (cn())
3. Complete Phase 3: Testes componentes core (Button, Input, Label)
4. Complete Phase 6: CI/CD básico
5. **STOP and VALIDATE**: Testes passam, CI funciona
6. Deploy/demo se pronto

### Incremental Delivery

1. Setup + Foundational → Infraestrutura pronta
2. Add US1 (Core Tests) → Validar → ✅ Componentes core testados
3. Add US4 (CI/CD) → Validar → ✅ PRs validados automaticamente
4. Add US2+US3 (More Tests) → Validar → ✅ Cobertura ampliada
5. Add US5 (NPM Publish) → Validar → ✅ Pacote público
6. Add Phase 8 (Play Functions) → ✅ Constitution compliance

### Estimated Time

| Phase | Tasks | Effort |
|-------|-------|--------|
| Phase 1 (Setup) | T001-T005 | 1h |
| Phase 2 (Foundational) | T006-T008 | 30min |
| Phase 3 (US1 Core) | T009-T011 | 1.5h |
| Phase 4 (US2 Feedback) | T012-T014 | 1.5h |
| Phase 5 (US3 Form) | T015-T017 | 1h |
| Phase 6 (CI/CD) | T018-T022 | 2h |
| Phase 7 (NPM) | T023-T027 | 1h |
| Phase 8 (Polish) | T028-T041 | 3h |
| **Total** | **41 tasks** | **~11.5h** |

---

## Notes

- [P] tasks = arquivos diferentes, sem dependências
- [Story] label mapeia tarefa para milestone específico
- Cada fase pode ser completada e testada independentemente
- Fazer commit após cada tarefa ou grupo lógico
- Parar em qualquer checkpoint para validar
- Evitar: tarefas vagas, conflitos de arquivo, dependências cruzadas

---

**Generated**: 2026-01-05 | **Tasks Version**: 1.0
