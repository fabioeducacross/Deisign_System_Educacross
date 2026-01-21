# Examples Review - Design System v2.0

**Task**: T005  
**Date**: 2026-01-20  
**Status**: ✅ COMPLETE

---

## Objective Rule Applied

```
IF (imports APENAS de '@educacross/ui') THEN KEEP
ELSE IF (imports de business logic ou APIs) THEN DELETE
```

---

## Files Reviewed

| File | Imports From | Decision | Rationale |
|------|--------------|----------|-----------|
| **MenuProfessor.tsx** | `@educacross/ui` (Sidebar, SidebarItem, SidebarSubItem) | ✅ **KEEP** | Pure UI composition |
| **MenuProfessor.stories.tsx** | `@storybook/react-vite`, `./MenuProfessor` | ✅ **KEEP** | Story file |
| **MenuCoordenador.tsx** | `@educacross/ui` (Sidebar, SidebarItem, SidebarSubItem) | ✅ **KEEP** | Pure UI composition |
| **MenuCoordenador.stories.tsx** | `@storybook/react-vite`, `./MenuCoordenador` | ✅ **KEEP** | Story file |
| **MenuAdministrador.tsx** | `@educacross/ui` (Sidebar, SidebarItem, SidebarSubItem) | ✅ **KEEP** | Pure UI composition |
| **MenuAdministrador.stories.tsx** | `@storybook/react-vite`, `./MenuAdministrador` | ✅ **KEEP** | Story file |
| **Introducao.mdx** | N/A | ✅ **KEEP** | Examples overview |

**Total Files**: 7  
**Kept**: 7  
**Deleted**: 0

---

## Analysis

### ✅ KEEP - All Files

**Reason**: Todos arquivos em `examples/` demonstram **composição válida de componentes do Design System**.

**Evidence**:
```tsx
// MenuProfessor.tsx
import { Sidebar, SidebarItem, SidebarSubItem } from "@educacross/ui";

// MenuCoordenador.tsx
import { Sidebar, SidebarItem, SidebarSubItem } from "@educacross/ui";

// MenuAdministrador.tsx
import { Sidebar, SidebarItem, SidebarSubItem } from "@educacross/ui";
```

**No Business Logic Detected**:
- ❌ Nenhum import de APIs (`/api/`, `axios`, `fetch`)
- ❌ Nenhum import de lógica de negócio (`/lib/auth`, `/services/`)
- ❌ Nenhum import de state management global (`zustand`, `redux`)
- ✅ Apenas imports de React e `@educacross/ui`

---

## Purpose of Examples

### MenuProfessor

Demonstra **composição de Sidebar** para perfil de Professor:
- ✅ Mostra uso de `<Sidebar>`, `<SidebarItem>`, `<SidebarSubItem>`
- ✅ Exemplo de navegação hierárquica
- ✅ Estados de item ativo/inativo
- ✅ Ícones + texto

**Value for Design System**: Documenta **pattern de uso** do componente Sidebar.

### MenuCoordenador

Demonstra **composição de Sidebar** para perfil de Coordenador:
- ✅ Variação de estrutura de menu
- ✅ Mais submenus que Professor
- ✅ Exemplo de diferentes níveis de hierarquia

**Value for Design System**: Documenta **variação** do pattern Sidebar.

### MenuAdministrador

Demonstra **composição de Sidebar** para perfil de Administrador:
- ✅ Menu mais complexo (mais opções)
- ✅ Exemplo de menu full-featured

**Value for Design System**: Documenta **caso avançado** do pattern Sidebar.

---

## Recommendations

### ✅ Keep All Examples

**Justification**:
1. **Pure UI Composition**: Zero lógica de negócio, apenas demonstração de componentes
2. **Educational Value**: Desenvolvedores veem **como compor Sidebar** corretamente
3. **Pattern Documentation**: Complementa documentação do componente Sidebar
4. **Multiple Use Cases**: Mostra diferentes perfis (Professor, Coordenador, Admin)

### 🔄 Potential Improvements (Future)

1. **Renomear para patterns/**: Mover de `examples/` para `patterns/MenuSidebar.stories.tsx`
   - Rationale: "Examples" é vago; "Patterns" é mais específico
   
2. **Consolidar em um arquivo**: Criar `patterns/SidebarPatterns.stories.tsx` com:
   - Story: "Teacher Menu"
   - Story: "Coordinator Menu"
   - Story: "Administrator Menu"
   - Rationale: Reduz arquivos de 7 para 2 (componente + story)

3. **Adicionar mais patterns**:
   - `patterns/FormFieldPattern.stories.tsx` (Label + Input + Alert)
   - `patterns/CardPattern.stories.tsx` (Card + Avatar + Badge)
   - `patterns/DialogPattern.stories.tsx` (Dialog + Button + Alert)

---

## Decision Matrix

| Criteria | MenuProfessor | MenuCoordenador | MenuAdministrador | Introducao.mdx |
|----------|---------------|-----------------|-------------------|----------------|
| **Imports apenas @educacross/ui** | ✅ Yes | ✅ Yes | ✅ Yes | N/A |
| **Business logic** | ❌ No | ❌ No | ❌ No | ❌ No |
| **Educational value** | ✅ High | ✅ High | ✅ High | ✅ Medium |
| **Pattern documentation** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Overview |
| **Decision** | ✅ **KEEP** | ✅ **KEEP** | ✅ **KEEP** | ✅ **KEEP** |

---

## Comparison: Business Logic (Deleted) vs Examples (Kept)

### ❌ Deleted (19 files)

**business-rules/** (4 files):
- `Authentication.mdx` → Documentava **regras de autenticação** (business logic)
- `Validation.mdx` → Documentava **regras de validação** (business logic)
- `Permissions.mdx` → Documentava **controle de acesso** (business logic)
- `Overview.mdx` → Overview de regras (business logic)

**journeys/** (3 files):
- `TeacherJourney.mdx` → Jornada do usuário Professor (UX, não componentes)
- `StudentJourney.mdx` → Jornada do usuário Aluno (UX, não componentes)
- `OnboardingFlow.mdx` → Fluxo de onboarding (processo de negócio)

**use-cases/** (2 files):
- `LoginUseCase.mdx` → Caso de uso de login (regra de negócio)
- `Overview.mdx` → Overview de use cases (regra de negócio)

**features/** (10 files):
- `Missoes-*.mdx` → Features do produto (não Design System)

**Rationale for Deletion**: Documentam **regras de negócio, processos e features do produto**, não componentes UI reutilizáveis.

### ✅ Kept (7 files)

**examples/** (7 files):
- `MenuProfessor.*` → Composição de Sidebar (componente DS)
- `MenuCoordenador.*` → Composição de Sidebar (componente DS)
- `MenuAdministrador.*` → Composição de Sidebar (componente DS)
- `Introducao.mdx` → Overview de patterns (Design System)

**Rationale for Keeping**: Documentam **patterns de composição** de componentes do Design System.

---

## Final Structure

```
apps/storybook/stories/
├── components/          ✅ (28 component stories)
├── examples/            ✅ (7 files - KEPT)
│   ├── Introducao.mdx
│   ├── MenuProfessor.tsx
│   ├── MenuProfessor.stories.tsx
│   ├── MenuCoordenador.tsx
│   ├── MenuCoordenador.stories.tsx
│   ├── MenuAdministrador.tsx
│   └── MenuAdministrador.stories.tsx
├── foundations/         ✅ (colors, typography, icons, spacing)
├── getting-started/     ✅ (quickstart, API reference)
├── guidelines/          ✅ (accessibility, states)
├── patterns/            ✅ (FormField pattern)
└── Introduction.mdx     ✅
```

**Removed**:
- ❌ `business-rules/` (4 files)
- ❌ `journeys/` (3 files)
- ❌ `use-cases/` (2 files)
- ❌ `features/` (10 files)

**Total Removed**: 19 files  
**Total Kept**: All DS-related files

---

## Next Steps

1. **✅ T005 COMPLETE** - Examples reviewed and kept
2. **➡️ T006** - Update Storybook navigation (remove deleted folders from main.ts)
3. **Future** - Consider consolidating examples into patterns/

---

**Status**: ✅ REVIEW COMPLETE  
**Decision**: **KEEP ALL** examples/ files (pure UI composition)  
**Blocker**: Nenhum - pode prosseguir para T006
