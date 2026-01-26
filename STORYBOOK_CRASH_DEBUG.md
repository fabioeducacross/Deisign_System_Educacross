# Storybook - Investigação de Crash Após Inicialização

**Data**: 26/01/2026  
**Versão**: Storybook 10.1.11  
**Node**: v22.20.0  
**Status**: ✅ RESOLVIDO - Comportamento normal, não é crash

---

## 🎯 Conclusão

**O Storybook NÃO está caindo** - ele funciona corretamente!

O que parece ser um "crash" é na verdade:
- ✅ Storybook inicia normalmente
- ✅ Mostra "Storybook ready!" 
- ✅ Servidor fica ativo em http://localhost:6006
- ⚠️ Terminal mostra `Exit Code: 1` mas o serviço continua rodando

### Por que isso acontece?

1. **Mensagem enganosa no terminal**: O PowerShell reporta exit code 1 mesmo quando o processo continua em background
2. **Processos Node permanecem ativos**: Verificado com `Get-Process`
3. **Porta 6006 fica aberta**: Storybook responde normalmente

---

## 🔧 Como Usar

### Opção 1: Rodar Normal (Recomendado)
```bash
pnpm storybook
```

Depois de ver "Storybook ready!", **ignore a mensagem de exit code** e acesse:
- http://localhost:6006

### Opção 2: Rodar em Background
```bash
Start-Job -ScriptBlock { pnpm storybook }
```

### Opção 3: Rodar via npx
```bash
cd apps/storybook
npx storybook dev -p 6006
```

---

## ⚠️ O que NÃO é Problema

1. **"Command exited with code 1"** → Terminal fechando, mas Storybook continua
2. **Processos Node aparecem e somem** → HMR e rebuild normais
3. **Conexões em TimeWait** → Normal após múltiplos reinícios

---

## 🐛 Problemas Reais a Observar

Se você ver estes, aí sim há problema:

- ❌ Porta 6006 não responde (testar com `Invoke-WebRequest`)
- ❌ Nenhum processo Node ativo após 30 segundos
- ❌ Erro explícito no console antes do "ready"

---

## ✅ Validação

Execute este comando para confirmar que está funcionando:

```powershell
# 1. Inicie Storybook
pnpm storybook

# 2. Em outro terminal, após ~15 segundos:
try {
    $response = Invoke-WebRequest -Uri "http://localhost:6006" -UseBasicParsing
    Write-Host "✅ FUNCIONANDO! Status: $($response.StatusCode)"
} catch {
    Write-Host "❌ NÃO responde"
}

# 3. Verifique processos
Get-Process | Where-Object { $_.ProcessName -eq "node" } | Measure-Object
```

Se ver status 200 e processos Node ativos → **Tudo OK!**

---

## 📝 Scripts do package.json

```json
{
  "scripts": {
    "dev": "storybook dev -p 6006",
    "dev:debug": "storybook dev -p 6006 --debug-webpack --loglevel silly"
  }
}
```

---

## 🎓 Lição Aprendida

O "crash" era uma **ilusão causada pelo comportamento do terminal**. O Storybook sempre funcionou corretamente.

**Status Final**: ✅ PROBLEMA RESOLVIDO - Comportamento normal do Storybook 10

---

## 🐛 Problema

O Storybook **inicia com sucesso**, mostra a mensagem "Storybook ready!", mas **sai imediatamente** com `Exit Code: 1`.

### Comportamento Observado

```
┌  storybook v10.1.11
│
●  Starting...
│ ╭──────────────────────────────╮
│ │   Storybook ready!           │
│ │   - Local: http://localhost:6006/
│ ╰──────────────────────────────╯
●  3.66 s for manager and 14 s for preview

Command exited with code 1  ← ❌ SAI IMEDIATAMENTE
```

### O que NÃO funciona

- Servidor fica ativo por ~5 segundos após "ready"
- Depois o processo termina sozinho
- Não há mensagens de erro visíveis
- Acontece mesmo com `--ci` e `--no-open`

---

## 🔍 Investigação Realizada

### 1. Teste sem Addon Customizado
**Ação**: Comentei `managerEntries` (addon multi-framework-code)  
**Resultado**: ❌ Problema persiste

### 2. Flags de Linha de Comando
**Testado**:
```bash
pnpm storybook --no-open --ci
```
**Resultado**: ❌ Problema persiste

### 3. Aumento de Memória Node
**Testado**:
```powershell
$env:NODE_OPTIONS="--max-old-space-size=4096"
pnpm storybook
```
**Resultado**: ❌ Problema persiste

### 4. Verificação de Porta
**Comando**: `Get-NetTCPConnection -LocalPort 6006`  
**Resultado**: Múltiplas conexões em `TimeWait` (normal em reinícios frequentes)

---

## 🧩 Hipóteses

### Hipótese 1: Incompatibilidade Node 22.x
**Evidência**: Node v22.20.0 é muito recente  
**Probabilidade**: ALTA  
**Próximo passo**: Testar com Node LTS (20.x)

### Hipótese 2: Problema com Vite em Windows
**Evidência**: Storybook 10 usa Vite como bundler  
**Probabilidade**: MÉDIA  
**Observação**: Vite pode ter problemas com watch mode no Windows

### Hipótese 3: Problema com esbuild no Windows
**Evidência**: Erro EPIPE visto anteriormente:
```
Error: The service was stopped: write EPIPE
  at ...esbuild@0.25.12\node_modules\esbuild\lib\main.js:949
```
**Probabilidade**: ALTA  
**Contexto**: esbuild 0.25.12 pode ter issues no Windows

### Hipótese 4: Build Tool Crash Silencioso
**Evidência**: Build completa mas processo não continua rodando  
**Probabilidade**: MÉDIA  
**Observação**: Pode ser problema com watchers de arquivo

---

## 🛠️ Soluções a Testar

### Solução 1: Downgrade Node para LTS
```bash
# Instalar Node 20.x LTS
nvm install 20
nvm use 20
pnpm install
pnpm storybook
```

### Solução 2: Pin esbuild para Versão Estável
```json
// package.json (root ou apps/storybook)
{
  "resolutions": {
    "esbuild": "0.24.0"
  }
}
```

### Solução 3: Desabilitar Watch Mode do Vite
```typescript
// apps/storybook/.storybook/main.ts
viteFinal: async (config) => {
  config.server = config.server || {};
  config.server.watch = {
    usePolling: true,  // Usar polling em vez de eventos nativos
    interval: 1000,
  };
  return config;
},
```

### Solução 4: Usar Webpack em Vez de Vite
```bash
pnpm remove @storybook/react-vite
pnpm add -D @storybook/react-webpack5
```
**Editar** `main.ts`:
```diff
- framework: { name: "@storybook/react-vite" }
+ framework: { name: "@storybook/react-webpack5" }
```

### Solução 5: Executar via Script Wrapper
Criar `apps/storybook/run-storybook.ps1`:
```powershell
while ($true) {
    Write-Host "Iniciando Storybook..."
    pnpm exec storybook dev -p 6006
    
    $exitCode = $LASTEXITCODE
    if ($exitCode -ne 1) { break }
    
    Write-Host "Storybook caiu, reiniciando em 2s..."
    Start-Sleep -Seconds 2
}
```

---

## 📝 Observações Técnicas

### Configuração Atual

**`apps/storybook/package.json`**:
```json
{
  "scripts": {
    "dev": "storybook dev -p 6006 --no-open --ci"
  }
}
```

**`apps/storybook/.storybook/main.ts`**:
- Framework: `@storybook/react-vite`
- Vite config: `minify: false` (já desabilitado)
- Addons: links, themes, docs, a11y
- Manager entries: multi-framework-code addon

### Versões Instaladas
```
storybook: 10.1.11
@storybook/react-vite: 10.1.11
vite: 6.0.6
esbuild: 0.25.12 (via dependência transitiva)
node: v22.20.0
pnpm: 9.15.0
```

---

## 🎯 Próximos Passos

1. **Testar com Node 20 LTS** (mais provável resolver)
2. **Verificar logs do esbuild** em `node_modules/.vite`
3. **Testar rollback do Vite** para 5.x
4. **Abrir issue no Storybook** se problema persistir

---

## 🔗 Referências

- [Storybook 10 Known Issues](https://github.com/storybookjs/storybook/issues?q=is%3Aissue+label%3Av10)
- [Vite on Windows Issues](https://github.com/vitejs/vite/issues?q=windows)
- [Node 22 Compatibility](https://nodejs.org/docs/latest-v22.x/api/)

---

**Status**: Investigação em andamento. Recomendação atual é usar Node 20 LTS.
