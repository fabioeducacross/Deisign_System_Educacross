# Guia de Migração: Storybook 8.6.15 → 10.x

## ⚠️ Pré-requisitos

- [ ] Todos os componentes finalizados e estilizados
- [ ] Todos os testes Playwright funcionando
- [ ] Commit/backup do estado atual
- [ ] Tempo estimado: 2-3 horas

## 📋 Checklist de Migração

### 1. Preparação (15 min)

- [ ] Criar branch: `git checkout -b feat/storybook-v10`
- [ ] Commitar todas as mudanças pendentes
- [ ] Documentar versão atual: `pnpm list storybook`
- [ ] Fazer backup do `package.json` e `pnpm-lock.yaml`

### 2. Limpeza Completa (5 min)

```bash
# Parar Storybook
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Limpar caches
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force apps/storybook/node_modules/.cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force apps/storybook/.storybook-cache -ErrorAction SilentlyContinue
Remove-Item -Force pnpm-lock.yaml -ErrorAction SilentlyContinue
```

### 3. Atualização de Dependências (20 min)

#### 3.1 Atualizar package.json manualmente

Em `apps/storybook/package.json`, atualizar TODAS as dependências do Storybook:

```json
{
  "devDependencies": {
    "@storybook/addon-a11y": "^10.1.11",
    "@storybook/addon-actions": "^10.1.11",
    "@storybook/addon-docs": "^10.1.11",
    "@storybook/addon-essentials": "^10.1.11",
    "@storybook/addon-interactions": "^10.1.11",
    "@storybook/addon-links": "^10.1.11",
    "@storybook/addon-themes": "^10.1.11",
    "@storybook/addon-viewport": "^10.1.11",
    "@storybook/blocks": "^10.1.11",
    "@storybook/react": "^10.1.11",
    "@storybook/react-vite": "^10.1.11",
    "storybook": "^10.1.11"
  }
}
```

**⚠️ REMOVER:**
- `@storybook/test` - não existe na v10
- `@storybook/manager-api` - removido na v10
- `@storybook/theming` - pode ser opcional

#### 3.2 Instalar dependências

```bash
cd apps/storybook
pnpm install
```

### 4. Ajustes de Código (30 min)

#### 4.1 Substituir imports de @storybook/test

**Antes (v8):**
```typescript
import { expect, userEvent, within } from "@storybook/test";
```

**Depois (v10):**
```typescript
import { expect, userEvent, within } from "@storybook/test-runner";
// OU usar @testing-library/react diretamente
import { expect } from "@storybook/jest";
import { userEvent } from "@storybook/testing-library";
import { within } from "@storybook/testing-library";
```

**Ação:** Buscar e substituir em todas as stories:
```bash
grep -r "@storybook/test" apps/storybook/stories/
```

#### 4.2 Verificar configuração (.storybook/main.ts)

Atualizar se necessário:

```typescript
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "@storybook/addon-viewport",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
```

#### 4.3 Atualizar preview.ts se necessário

Verificar imports e configurações no `.storybook/preview.ts`

### 5. Teste Inicial (15 min)

```bash
cd ../../
pnpm storybook
```

**Verificar:**
- [ ] Storybook inicia sem erros
- [ ] Página inicial carrega
- [ ] Navegação entre stories funciona
- [ ] Temas claro/escuro funcionam

### 6. Testes de Componentes (45 min)

Testar cada categoria:

#### Stories de Componentes
- [ ] Button - todas variantes
- [ ] Input - focus, error states
- [ ] Checkbox - checked/unchecked
- [ ] Radio - seleção
- [ ] Badge - todas cores
- [ ] Dialog - abrir/fechar, testes Playwright
- [ ] Table - sorting, pagination
- [ ] Outros componentes

#### Testes Playwright
- [ ] Executar testes na aba Interactions
- [ ] Verificar se todos os steps passam
- [ ] Corrigir testes quebrados se necessário

### 7. Performance (10 min)

**Comparar com v8:**
- [ ] Tempo de startup
- [ ] Tempo de rebuild (HMR)
- [ ] Uso de memória

**Expectativa:** 2-3x mais rápido

### 8. Build de Produção (10 min)

```bash
pnpm build:storybook
```

- [ ] Build completa sem erros
- [ ] Verificar saída em `storybook-static/`
- [ ] Testar build local: `npx http-server storybook-static`

### 9. Documentação (10 min)

- [ ] Atualizar README.md com versão do Storybook
- [ ] Documentar breaking changes encontrados
- [ ] Atualizar CHANGELOG.md

### 10. Finalização (10 min)

```bash
# Commit
git add .
git commit -m "chore: migrate to Storybook 10.1.11"

# Criar PR
git push origin feat/storybook-v10
```

## 🐛 Troubleshooting

### Erro: "No matching export"

**Causa:** Imports incompatíveis entre v8 e v10

**Solução:**
1. Verificar documentação oficial: https://storybook.js.org/docs/api
2. Atualizar imports conforme nova API
3. Remover pacotes descontinuados

### Erro: Cache corrompido

```bash
Remove-Item -Recurse -Force node_modules/.cache
Remove-Item -Recurse -Force .storybook-cache
pnpm install
```

### Erro: Playwright tests falhando

1. Verificar se `@storybook/addon-interactions` está instalado
2. Atualizar imports de test utilities
3. Revisar sintaxe dos testes (pode ter mudado)

### Performance pior que v8

1. Limpar todos os caches
2. Verificar configuração do Vite
3. Revisar addons desnecessários

## 📚 Recursos

- [Storybook 10 Release Notes](https://storybook.js.org/blog/storybook-10-0/)
- [Migration Guide Official](https://storybook.js.org/docs/migration-guide)
- [Breaking Changes](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md)

## 🎯 Critérios de Sucesso

✅ Todos os componentes renderizam corretamente
✅ Todos os testes Playwright passam
✅ Performance igual ou melhor que v8
✅ Build de produção funciona
✅ Zero erros no console
✅ Documentação atualizada

## 🔄 Rollback

Se algo der errado:

```bash
git checkout master
Remove-Item -Recurse -Force node_modules
pnpm install
pnpm storybook
```

---

**Status:** Aguardando migração  
**Versão Atual:** 8.6.15  
**Versão Alvo:** 10.1.11  
**Data Planejada:** TBD
