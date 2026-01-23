# GitHub Secrets - Setup

Este projeto usa secrets para gerenciar credenciais de forma segura.

## Secrets Necessários

### CHROMATIC_PROJECT_TOKEN

**Valor**: `chpt_84de3749269a39d`

**Como adicionar no GitHub:**

1. Vá para o repositório no GitHub
2. Clique em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Nome: `CHROMATIC_PROJECT_TOKEN`
5. Value: `chpt_84de3749269a39d`
6. Clique em **Add secret**

## Verificação

Após adicionar o secret, o workflow `.github/workflows/chromatic.yml` será executado automaticamente em:
- ✅ Push para branch `master`
- ✅ Pull Requests (abertos, sincronizados, reabertos)

## Comportamento do Workflow

| Evento | Comportamento |
|--------|---------------|
| **Push para master** | Publica e auto-aprova mudanças visuais |
| **Pull Request** | Publica e envia status check (não bloqueia merge) |
| **Builds sem mudanças** | Aprovado automaticamente |

## Testando Localmente

Se quiser testar sem CI:

```bash
pnpm chromatic
```

## Segurança

⚠️ **IMPORTANTE**: 
- Nunca commite tokens diretamente no código
- Use apenas GitHub Secrets para CI/CD
- O token local em `package.json` é apenas para desenvolvimento
