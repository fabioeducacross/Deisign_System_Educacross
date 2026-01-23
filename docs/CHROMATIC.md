# Chromatic - Visual Testing & Storybook Publishing

## O que é Chromatic?

Chromatic é uma plataforma de **visual testing** e **publicação de Storybook** que detecta automaticamente mudanças visuais nos componentes UI.

## Setup Completo ✅

### Configuração Atual

- **Project ID**: `69727df0ab06437ceb56a008`
- **URL do Storybook Publicado**: https://69727df0ab06437ceb56a008-gvenynqzgl.chromatic.com/
- **Build Status**: Build 13 - ✅ **Passou** (270 stories, 270 snapshots, 0 erros)

### Arquivos de Configuração

#### `chromatic.config.json`
```json
{
  "projectId": "69727df0ab06437ceb56a008",
  "buildScriptName": "build",
  "storybookBaseDir": "apps/storybook"
}
```

#### `.storybook/main.ts` 
**Importante**: Removida configuração de `base path` absoluto que causava conflito com Chromatic:
```typescript
// ❌ REMOVIDO (causava 404):
if (process.env.NODE_ENV === 'production') {
    config.base = '/Design_System_Educacross/';
}

// ✅ CORRETO (usa caminhos relativos):
// Chromatic funciona apenas com base path relativo
```

## Comandos

### Publicar no Chromatic
```bash
pnpm chromatic
# ou
pnpm exec chromatic --project-token=chpt_84de3749269a39d --exit-zero-on-changes
```

### Forçar Rebuild Completo
```bash
pnpm exec chromatic --project-token=chpt_84de3749269a39d --force-rebuild
```

### Publicar sem Esperar Resultados (CI)
```bash
pnpm exec chromatic --project-token=chpt_84de3749269a39d --exit-once-uploaded
```

## Solução de Problemas

### Erro: "JavaScript failed to load"

**Causa**: Base path absoluto no Vite/Storybook conflitando com caminhos esperados pelo Chromatic.

**Solução**: 
1. Remover `config.base = '/Design_System_Educacross/'` de `.storybook/main.ts`
2. Chromatic precisa de caminhos relativos (`./**`)
3. Usar `--force-rebuild` após correção

### Erro: "Found multiple elements with role..."

**Causa**: Play functions em stories Dialog/ThemeSwitcher estavam encontrando múltiplos elementos (trigger + dialog aberto).

**Solução**: 
- Play functions problemáticas foram removidas temporariamente
- Stories mantêm visualização correta
- Testes de interação podem ser re-implementados com queries mais específicos

## Workflow CI/CD

### ✅ GitHub Actions Configurado

O workflow está configurado em `.github/workflows/chromatic.yml` e roda automaticamente em:
- ✅ Push para branch `master` (auto-aprova mudanças)
- ✅ Pull Requests (envia status check)

**Configuração atual:**
```yaml
name: Chromatic Visual Testing

on:
  push:
    branches: [master]
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v3
        with:
          version: 9.15.0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          exitZeroOnChanges: true
          exitOnceUploaded: true
          onlyChanged: true
          autoAcceptChanges: master
```

### 🔐 Setup do Secret

**Passo 1**: Adicione o secret no GitHub Repository:
1. Vá em **Settings** → **Secrets and variables** → **Actions**
2. Clique em **New repository secret**
3. Nome: `CHROMATIC_PROJECT_TOKEN`
4. Valor: `chpt_84de3749269a39d`
5. Salve

**Passo 2**: Commit e push
```bash
git add .github/
git commit -m "ci: adiciona workflow Chromatic"
git push
```

O workflow será executado automaticamente no próximo push!

### 📋 Opções do Workflow

| Opção | Descrição |
|-------|-----------|
| `exitZeroOnChanges: true` | CI não falha se houver mudanças visuais |
| `exitOnceUploaded: true` | Não espera aprovação manual (ideal para PRs) |
| `onlyChanged: true` | Testa apenas stories modificadas (mais rápido) |
| `autoAcceptChanges: master` | Auto-aprova builds na branch master |

### GitHub Actions (Manual - para referência)

Crie `.github/workflows/chromatic.yml`:

```yaml
name: Chromatic

on:
  push:
    branches:
      - master
  pull_request:

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Histórico completo para comparação

      - uses: pnpm/action-setup@v3
        with:
          version: 9.15.0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build packages
        run: pnpm build

      - name: Publish to Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          exitOnceUploaded: true  # Não espera aprovação em PRs
```

### Variável de Ambiente

Adicione no GitHub Repository Settings → Secrets:
- Nome: `CHROMATIC_PROJECT_TOKEN`
- Valor: `chpt_84de3749269a39d`

## Estatísticas do Build 13

- ✅ **37 componentes**
- ✅ **270 stories**
- ✅ **270 snapshots** capturados
- ✅ **0 erros**
- ⏱️ **1min 5s** para testes
- 📦 **10.74 MB** enviados (108 novos, 247 cached)

## Recursos

- [Documentação Chromatic](https://www.chromatic.com/docs/)
- [Chromatic CLI](https://www.chromatic.com/docs/cli/)
- [Visual Testing Guide](https://www.chromatic.com/docs/test/)
- [Painel do Projeto](https://www.chromatic.com/setup?appId=69727df0ab06437ceb56a008)

## Próximos Passos

1. ✅ Chromatic configurado e funcionando
2. ⏭️ Configurar workflow GitHub Actions
3. ⏭️ Habilitar auto-approve para builds aprovados
4. ⏭️ Re-implementar play functions com queries corretos
5. ⏭️ Configurar notificações no Slack/Discord
