# Gap Analysis & Corrections - Design System v2.0

**Date**: 2026-01-20  
**Reviewer**: AI Analysis  
**Status**: 🔴 CRITICAL GAPS FOUND

## Executive Summary

Análise identificou **12 gaps** no plano original:
- 🔴 **3 CRÍTICOS** → Podem causar falha de implementação
- 🟡 **6 IMPORTANTES** → Podem causar atrasos ou bugs
- 🟢 **3 MENORES** → Melhorias de qualidade

---

## 🔴 GAPS CRÍTICOS (Bloqueantes)

### GAP-1: SVG Original Não Localizado

**Problema**: Task 1.1 pede "extrair SVG do arquivo logo-educacross.svg" mas não especifica localização ou variantes.

**Impacto**: Implementação pode usar logo errado ou ignorar variantes necessárias.

**Correção Necessária**:

```yaml
## Sprint -1: Pre-Flight Check (0.5 dia)

### Task -1.1: Localizar e Documentar Logos
- [ ] Encontrar arquivo `logo-educacross.svg` em `packages/ui/src/assets/images/`
- [ ] Verificar se existe `logo-educacross-white.svg`
- [ ] Anotar dimensões exatas (viewBox="0 0 X Y")
- [ ] Verificar se Header usa variante específica
- [ ] Decidir: inline de 1 variante ou ambas?

**Critério de Aceitação**:
- Documento com:
  - Path exato do(s) arquivo(s)
  - viewBox de cada variante
  - Uso atual (onde cada variante é usada)
  - Decisão: qual(is) converter para inline

**Output**: `specs/001-ds-v2-melhorias/LOGO-INVENTORY.md`
```

**Comandos para executar agora**:
```bash
# Localizar todos logos
Get-ChildItem -Path packages/ui/src/assets/images/ -Filter "logo*" -Recurse

# Ver dimensões do SVG
Select-String -Path "packages/ui/src/assets/images/logo-educacross.svg" -Pattern "viewBox"
```

---

### GAP-2: Scripts Sem Validação

**Problema**: Tasks 2.2 e 2.3 criam scripts que geram JSON mas sem validação de output.

**Impacto**: Manifest pode ter componentes faltando, props erradas, ou crash silencioso.

**Correção Necessária**:

```yaml
### Task 2.2: Script de Geração de Manifest (ATUALIZADO)

#### Subtask 2.2.1: Implementar Gerador
- [ ] `scripts/generate-manifest.ts`
- [ ] Ler todos componentes de `src/components/` via filesystem
- [ ] Para cada componente:
  - [ ] Parsear arquivo .tsx com typescript AST
  - [ ] Extrair interface Props (se existir)
  - [ ] Extrair JSDoc comments
  - [ ] Extrair variants do CVA (se aplicável)
- [ ] Gerar objeto JSON conforme schema

#### Subtask 2.2.2: Criar JSON Schema
- [ ] `packages/ui/schemas/manifest.schema.json`
- [ ] Definir estrutura esperada:
  - components: object (required)
  - icons: object (required)
  - tokens: object (required)
  - stats: object (required)
- [ ] Publicar schema em GitHub Pages

#### Subtask 2.2.3: Validação Automática
- [ ] Instalar `ajv` (JSON Schema validator)
- [ ] Script valida output contra schema
- [ ] Falha se: componente sem props, prop sem type, category inválida

**Critério de Aceitação**:
- `pnpm generate:manifest` cria manifest.json válido
- Se componente novo adicionado e script rodar, manifest atualiza
- CI quebra se manifest.json inválido

**Fallback**: Se script falhar, commit manifest.json manualmente e investiga depois.
```

**Adicionar Task 2.5**:
```yaml
### Task 2.5: Testes dos Scripts de Geração

- [ ] `scripts/__tests__/generate-manifest.test.ts`
  - [ ] Test: gera manifest com todos 28 componentes
  - [ ] Test: detecta props obrigatórias
  - [ ] Test: falha gracefully se componente sem export
- [ ] `scripts/__tests__/generate-tokens.test.ts`
  - [ ] Test: extrai todas CSS variables
  - [ ] Test: converte HSL → Hex corretamente
  - [ ] Test: agrupa por categoria (colors, spacing, typography)

**Critério de Aceitação**: `pnpm test:scripts` passa 100%
```

---

### GAP-3: Definição Vaga de "Patterns"

**Problema**: Task 0.2 pede revisar `examples/` mas sem critério objetivo.

**Impacto**: Inconsistência na limpeza; possível remoção de content válido ou manutenção de lixo.

**Correção Necessária**:

```yaml
### Task 0.2: Revisar Pasta `examples/` (EXPANDIDO)

**Regra Objetiva**:
```
SE arquivo tem:
  - import de lógica de negócio (autenticação, permissões, API calls) → REMOVER
  - import apenas de componentes @educacross/ui → MANTER
  - Props hardcoded fictícios (dados mock) → MANTER
  - Props vindos de backend/state → REMOVER
```

**Procedimento**:
1. [ ] Listar todos arquivos em `apps/storybook/stories/examples/`
2. [ ] Para cada arquivo:
   - [ ] Ler imports
   - [ ] Classificar: PURE_UI | BUSINESS_LOGIC
   - [ ] Documentar decisão em tabela abaixo

**Tabela de Decisão**:
| Arquivo | Imports | Contém Lógica? | Decisão | Justificativa |
|---------|---------|----------------|---------|---------------|
| MenuProfessor.stories.tsx | Button, Sidebar, Icon | ❌ | **MANTER** | Apenas composição de UI |
| MenuCoordenador.stories.tsx | Button, Sidebar, Icon | ❌ | **MANTER** | Apenas composição de UI |
| MenuAdministrador.stories.tsx | Button, Sidebar, Icon | ❌ | **MANTER** | Apenas composição de UI |

**Critério de Aceitação**:
- Tabela preenchida com todos arquivos
- 0 arquivos com lógica de negócio restantes
- Examples serve para demonstrar COMPOSIÇÕES complexas de UI

**Output**: Tabela commitada em `specs/001-ds-v2-melhorias/EXAMPLES-REVIEW.md`
```

---

## 🟡 GAPS IMPORTANTES (Podem Causar Atrasos)

### GAP-4: Sem Rollback Strategy

**Problema**: Se v0.2.0 quebrar produção, não há plano de reverter rapidamente.

**Correção**:

```yaml
### Task 5.5: Preparar Rollback Plan

**Antes de Publicar v0.2.0**:
- [ ] Garantir v0.1.1 ainda acessível no npm
- [ ] Criar branch `hotfix/revert-logo-inline` (sem merge)
- [ ] Documentar comandos de emergência

**Se Rollback Necessário**:
```bash
# 1. Unpublish versão problemática (CUIDADO: irreversível)
npm unpublish @fabioeducacross/ui@0.2.0 --force

# 2. Deletar tag
git push origin :refs/tags/v0.2.0
git tag -d v0.2.0

# 3. Publicar hotfix (se v0.1.1 tem outro bug)
git checkout hotfix/revert-logo-inline
npm version patch  # v0.1.2
npm publish
git push origin hotfix/revert-logo-inline --tags

# 4. Notificar stakeholders
# - Slack: #design-system-updates
# - Email: dev@educacross.com.br
# - GitHub: Criar issue explicando problema
```

**Critério de Aceitação**:
- Documento `ROLLBACK.md` commitado
- Branch hotfix criada
- Tempo de rollback < 15 minutos
```

---

### GAP-5: Comunicação com Stakeholders Ausente

**Problema**: "Aprovações Necessárias" listadas mas sem processo.

**Correção**:

```yaml
## Sprint -1: Stakeholder Alignment (ADICIONAR)

### Task -1.2: Apresentar Plano e Obter Go-Ahead

**Antes de Iniciar Implementação**:
- [ ] **Tech Lead** (fabio@educacross): Revisar abordagem técnica
  - Inline SVG vs alternativas
  - Scripts de geração (AST parsing)
  - Timing: 30min, async via Slack OK
- [ ] **Design** (design@educacross): Validar conversão SVG
  - Mostrar preview do logo inline
  - Confirmar fidelidade visual
  - Timing: 15min, pode ser assíncrono
- [ ] **DevEx** (devs internos): Feedback sobre manifest.json
  - Compartilhar schema draft
  - Coletar sugestões de melhorias
  - Timing: Survey 5min
- [ ] **Security** (sec@educacross): Quick check
  - Inline SVG não introduz XSS
  - Scripts de geração não executam código arbitrário
  - Timing: 10min, pode ser email

**Comunicação Durante Sprints**:
- Sprint 0 completo → Slack update
- Sprint 1 completo → Demo do logo funcionando
- Sprint 2-3 → Weekly status
- Antes de publicar → Email para todos projetos consumidores

**Template de Comunicação**:
```markdown
# 📦 Design System v0.2.0 Coming Soon

**O que muda**:
- 🐛 FIX: Logo agora funciona via npm install
- ✨ NEW: manifest.json para discovery de componentes
- ✨ NEW: Exports `componentList` e `iconIndex`

**Ação necessária**: NENHUMA (zero breaking changes)

**Data de lançamento**: [DATA]
**Documentação**: [LINK]
```

**Critério de Aceitação**:
- ✅ de todos stakeholders documentado
- Comunicação enviada antes de cada marco
```

---

### GAP-6: Testing Strategy Incompleta

**Problema**: Apenas Logo tem testes planejados.

**Correção**:

```yaml
### Task 2.6: Testes de Integração de Metadata (ADICIONAR)

#### 2.6.1: Testes do manifest.json
```typescript
// packages/ui/src/__tests__/manifest.test.ts
import manifest from '../dist/manifest.json';
import { componentList } from '../metadata';

test('manifest contém todos componentes de componentList', () => {
  componentList.forEach(comp => {
    expect(manifest.components[comp]).toBeDefined();
  });
});

test('cada componente tem props válidas', () => {
  Object.values(manifest.components).forEach(comp => {
    expect(comp.props).toBeDefined();
    expect(comp.category).toMatch(/form|layout|feedback|data/);
  });
});
```

#### 2.6.2: Teste E2E de Instalação
```yaml
- [ ] Criar projeto teste temporário
- [ ] `npm init -y && npm install ../packages/ui/dist`
- [ ] Importar Logo e renderizar
- [ ] Importar metadata e validar
- [ ] Deletar projeto teste

**Critério de Aceitação**: Script `scripts/test-install.sh` executa E2E completo
```

---

### GAP-7: Versionamento de JSON Schema

**Problema**: manifest.json referencia schema que não existe.

**Correção**:

```yaml
### Task 2.4: Publicar JSON Schemas (ADICIONAR APÓS 2.3)

- [ ] Criar `packages/ui/schemas/manifest.schema.json`
- [ ] Criar `packages/ui/schemas/tokens.schema.json`
- [ ] Adicionar ao build: copiar schemas para dist/
- [ ] Publicar em GitHub Pages:
  - URL: `https://educacross.github.io/Design_System_Educacross/schemas/manifest-v1.json`
  - Setup: adicionar `schemas/` ao deploy do Storybook

**Schema Manifest (Draft)**:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://educacross.github.io/.../manifest-v1.json",
  "title": "Educacross Design System Manifest",
  "type": "object",
  "required": ["name", "version", "components", "icons", "tokens"],
  "properties": {
    "name": { "type": "string", "pattern": "^@[^/]+/[^/]+$" },
    "version": { "type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$" },
    "components": {
      "type": "object",
      "patternProperties": {
        "^[A-Z]": {
          "type": "object",
          "required": ["category", "props"],
          "properties": {
            "category": { "enum": ["form", "layout", "feedback", "data"] }
          }
        }
      }
    }
  }
}
```

**Critério de Aceitação**: 
- Schema acessível via HTTPS
- VSCode valida manifest.json automaticamente
```

---

### GAP-8: Bundle Size Baseline Ausente

**Problema**: Meta "< 150KB" sem comparação atual.

**Correção**:

```yaml
### Task -1.3: Medir Bundle Size Baseline (ADICIONAR AO SPRINT -1)

```bash
# Medir bundle atual
cd packages/ui
pnpm build
ls -lh dist/index.js dist/index.mjs

# Usar bundlephobia
npx bundlephobia @fabioeducacross/ui@0.1.1
```

**Documentar**:
| Métrica | Valor Atual (v0.1.1) | Meta (v0.2.0) | Status |
|---------|----------------------|---------------|--------|
| index.js (uncompressed) | [???] KB | < 500KB | ⏳ |
| index.js (gzip) | [???] KB | < 150KB | ⏳ |
| Tree-shakeable? | [???] | ✅ | ⏳ |

**Salvar em**: `specs/001-ds-v2-melhorias/BUNDLE-BASELINE.md`

**Critério de Aceitação**: Baseline documentado antes de qualquer mudança
```

---

### GAP-9: Coverage Mal Definida

**Problema**: ">80% coverage" ambíguo.

**Correção**:

```yaml
## Success Metrics (ATUALIZADO)

### Quantitativos
- [ ] Logo funciona em 100% dos casos
- [ ] 28/28 componentes com README
- [ ] manifest.json com 100% dos componentes
- [ ] tokens.json com 50+ tokens
- [ ] **Line coverage >80% em `src/components/**/*.tsx`** (não incluir scripts/)
- [ ] **Branch coverage >70% em componentes críticos** (Button, Input, Logo)
- [ ] **Bundle size < 150KB gzip** (medido via bundlephobia)
- [ ] **Tree-shaking validado**: import { Button } gera bundle < 50KB

**Configuração vitest.config.ts**:
```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/components/**/*.tsx'],
      exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
      lines: 80,
      branches: 70,
      functions: 75,
      statements: 80
    }
  }
});
```
```

---

## 🟢 GAPS MENORES (Melhorias)

### GAP-10: Migration Guide Sem Outline

**Correção**:

```yaml
### Task 4.3: Migration Guide (EXPANDIDO)

**Criar**: `packages/ui/docs/MIGRATION-v2.md`

**Estrutura**:

# Migration Guide: v0.1.x → v0.2.0

## TL;DR

**Zero breaking changes!** Apenas adiciona features.

## ✅ Nenhuma Ação Necessária

Se seu projeto usa v0.1.x, pode atualizar para v0.2.0 sem modificar código:

```bash
npm install @fabioeducacross/ui@0.2.0
```

## 🎉 Novos Features

### 1. Logo Funciona via NPM Install

**Antes (v0.1.x)**: Logo não aparecia em node_modules.  
**Depois (v0.2.0)**: Logo renderiza corretamente.

**Você precisa fazer**: NADA (API idêntica)

### 2. Discovery Programático

**Novo em v0.2.0**:
```typescript
import { componentList, iconIndex, metadata } from '@fabioeducacross/ui';
```

**Use para**: Gerar código dinamicamente, validar imports, listar componentes.

### 3. Manifest JSON

**Novo arquivo**: `node_modules/@fabioeducacross/ui/dist/manifest.json`

**Use para**: Ferramentas de build, IDEs, agentes IA.

## 🐛 Bugs Corrigidos

- Logo não carregava em projetos externos (#ISSUE-LOGO-DS)

## 📚 Documentação Atualizada

- 28 componentes agora têm README individual
- API Reference completa
- AI Agent Guide adicionado

## ❓ FAQ

**P: Meu projeto quebrou após atualizar**  
R: Isso não deveria acontecer. Abra issue: [LINK]

**P: Como usar manifest.json?**  
R: Veja ForAI.mdx no Storybook
```

---

### GAP-11: React 19 Não Explicado

**Correção**:

```yaml
## Technical Context (ADICIONAR NOTA)

**Constraints**: 
- Compatibilidade React 18+
- Tailwind CSS 3.4+
- Node.js 18+ LTS
- Publicação via GitHub Packages

**Nota sobre React 19**:
- peerDependencies aceita React 18 OU 19
- PRs Dependabot para React 19 foram **fechados intencionalmente**
- Decisão: manter React 18 como principal até v1.0.0
- React 19 funciona (sem tipos específicos novos)
```

---

### GAP-12: Tree-Shaking Não Validado

**Correção**:

```yaml
### Task 5.2b: Validar Tree-Shaking (ADICIONAR)

```bash
# Criar projeto teste
mkdir /tmp/test-treeshake
cd /tmp/test-treeshake
npm init -y
npm install @fabioeducacross/ui@0.2.0

# Criar app minimal
cat > index.js << 'EOF'
import { Button } from '@fabioeducacross/ui';
console.log(Button);
EOF

# Build com webpack/vite
npx vite build

# Analisar bundle
npx webpack-bundle-analyzer dist/stats.json
```

**Critério de Aceitação**:
- Bundle contém apenas Button + dependências diretas
- Não inclui Dialog, Table ou outros não importados
- Size < 50KB para single component

**Se falhar**: Investigar tsup config (verificar se `splitting: true`)
```

---

## 📝 Plano de Ação

### Prioridade de Correção

**Implementar AGORA (antes de começar Sprint 0)**:
1. ✅ GAP-1: Localizar logos
2. ✅ GAP-3: Definir regra de examples/
3. ✅ GAP-8: Medir bundle baseline

**Implementar DURANTE Sprints**:
- Sprint -1: GAP-5 (stakeholder alignment)
- Sprint 1: (sem gaps críticos)
- Sprint 2: GAP-2, GAP-6, GAP-7 (validação de scripts)
- Sprint 5: GAP-4, GAP-12 (rollback + tree-shaking)

**Implementar se houver tempo**:
- GAP-9, GAP-10, GAP-11 (clarificações)

### Comandos Imediatos

Execute agora para resolver GAP-1 e GAP-8:

```bash
# GAP-1: Localizar logos
Get-ChildItem -Path packages/ui/src/assets/ -Filter "*logo*" -Recurse | Select-Object FullName, Length

# GAP-8: Bundle baseline
cd packages/ui
pnpm build
Get-Item dist/index.* | Select-Object Name, @{N='Size(KB)';E={[math]::Round($_.Length/1KB,2)}}

# Commit findings
New-Item -Path specs/001-ds-v2-melhorias/ -Name "PRE-FLIGHT.md" -ItemType File
```

---

## Impacto Estimado

| Gap | Tempo Extra | Risco se Ignorado |
|-----|-------------|-------------------|
| GAP-1 | +0.5 dia | 🔴 Sprint 1 falha completamente |
| GAP-2 | +1 dia | 🔴 Manifest incompleto/inválido |
| GAP-3 | +0.5 dia | 🟡 Limpeza inconsistente |
| GAP-4 | +0.5 dia | 🟡 Rollback lento (horas vs minutos) |
| GAP-5 | +1 dia | 🟡 Atrasos por falta de alignment |
| GAP-6 | +1 dia | 🟡 Bugs em produção |
| Outros | +1 dia | 🟢 Qualidade subótima |
| **TOTAL** | **+5.5 dias** | 🔴 **High risk of failure** |

**Nova Estimativa**: 8.5-13.5 dias → **14-19 dias** (com correções)

---

## Aprovação Necessária

- [ ] **Tech Lead**: Aprovar tempo adicional (+5.5 dias)
- [ ] **Product**: Ajustar deadline ou priorizar apenas Sprint 0-1
- [ ] **Team**: Concordar com processo expandido

**Alternativa**: Fazer v0.1.2 (hotfix Logo apenas) e adiar metadata para v0.3.0.
