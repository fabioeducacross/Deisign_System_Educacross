# Changelog - Configuração GitHub Package

## v0.1.0 (2026-01-16)

### ✨ Novidades

- **Distribuição via GitHub**: Design System agora pode ser instalado diretamente via GitHub com versionamento semântico
- **Build System**: Arquivos dist/ são commitados e mantidos no repositório
- **CI/CD**: GitHub Actions configurado para automatizar builds e releases
- **Documentação**: Guias atualizados com instruções de instalação via GitHub

### 📦 Instalação

```bash
# Versão específica (recomendado)
pnpm add github:fabioeducacross/Design_System_Educacross#v0.1.0

# Branch master (desenvolvimento)
pnpm add github:fabioeducacross/Design_System_Educacross#master
```

### 🛠️ Configuração Técnica

#### Arquivos Modificados

- **packages/ui/.gitignore**: Criado para permitir commit de dist/
- **.github/workflows/publish.yml**: Atualizado para commitar dist/ e criar releases
- **README.md**: Atualizado com instruções de instalação via tags
- **USAGE.md**: Guia completo com exemplos de instalação versionada
- **apps/storybook/stories/getting-started/**: Docs atualizados com tags

#### Arquivos Adicionados

- **packages/ui/dist/**: 147 arquivos buildados (CJS, ESM, DTS, CSS, assets)
- **docs/DS-GITHUB-SETUP-REPORT.md**: Report técnico completo da configuração

### ✅ Checklist de Validação

- [x] dist/ commitado no repositório
- [x] package.json com exports configurado
- [x] GitHub Actions atualizado
- [x] Documentação atualizada
- [x] Tag v0.1.0 criada e pushada
- [ ] Instalação testada em projeto externo

### 📝 Próximos Passos

1. Testar instalação em projeto consumidor (Ambiente-de-prototipação-EDUCACROSS-V3)
2. Validar imports e configuração Tailwind
3. Verificar se GitHub Actions executa corretamente no próximo push de tag
4. Considerar publicação no npm registry

### 🔗 Links

- **GitHub Release**: https://github.com/fabioeducacross/Design_System_Educacross/releases/tag/v0.1.0
- **Storybook**: https://fabioeducacross.github.io/Design_System_Educacross/
- **Report Técnico**: [DS-GITHUB-SETUP-REPORT.md](./DS-GITHUB-SETUP-REPORT.md)

---

**Commit**: a13b1ad  
**Branch**: master  
**Tag**: v0.1.0  
**Data**: 16 de janeiro de 2026
